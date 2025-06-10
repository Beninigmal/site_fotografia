// components/Portfolio/ImagemModal.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

type ImageModalProps = {
  images: {
    url: string;
    alt: string;
  }[];
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

const imageSlideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

export const ImageModal = ({ images }: ImageModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 0: initial, 1: next, -1: prev
  const router = useRouter();
  const handleClose = () => {
    window.history.back();
  };

  const paginate = useCallback(
    (newDirection: number) => {
      if (!images || images.length <= 1) return;
      setDirection(newDirection);
      setCurrentIndex((prevIndex) => {
        let nextIndex = prevIndex + newDirection;
        if (nextIndex < 0) {
          nextIndex = images.length - 1;
        } else if (nextIndex >= images.length) {
          nextIndex = 0;
        }
        return nextIndex;
      });
    },
    [images]
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        paginate(1);
      } else if (e.key === "ArrowLeft") {
        paginate(-1);
      } else if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [paginate, handleClose]);

  if (!images || images.length === 0) {
    return null; // Retorna null se não houver imagens
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative max-w-4xl w-full h-full max-h-[90vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 md:top-4 md:right-4 z-[60] text-white bg-black/50 rounded-full p-2 hover:bg-black/80 text-2xl leading-none"
          aria-label="Fechar modal"
        >
          &times;
        </button>

        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={imageSlideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute w-full h-full"
            >
              <Image
                src={images[currentIndex].url}
                alt={images[currentIndex].alt}
                fill
                className="object-contain"
                priority={currentIndex === 0}
              />
            </motion.div>
          </AnimatePresence>

          {images.length > 1 && (
            <>
              <button
                onClick={() => paginate(-1)}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-[55] text-white bg-black/30 rounded-full p-2 md:p-3 hover:bg-black/60 text-2xl md:text-3xl"
                aria-label="Imagem anterior"
              >
                &#x276E;
              </button>
              <button
                onClick={() => paginate(1)}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-[55] text-white bg-black/30 rounded-full p-2 md:p-3 hover:bg-black/60 text-2xl md:text-3xl"
                aria-label="Próxima imagem"
              >
                &#x276F;
              </button>
            </>
          )}
        </div>

        {images.length > 1 && (
          <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 z-[55] text-white bg-black/50 px-3 py-1 rounded-full text-xs md:text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </motion.div>
    </div>
  );
};
