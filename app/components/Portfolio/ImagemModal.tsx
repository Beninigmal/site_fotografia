// components/Portfolio/ImagemModal.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type ImageModalProps = {
  images: {
    url: string;
    alt: string;
  }[];
  // onClose: () => void;
};

export const ImageModal = ({ images }: ImageModalProps) => {
  const router = useRouter();
  const handleClose = () => {
    window.history.back(); // Volta sem causar novo render
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-50 text-white bg-black/50 rounded-full p-2 hover:bg-black/80"
        >
          ✕
        </button>

        <div className="space-y-4">
          {images.map((image, idx) => (
            <div key={idx} className="relative w-full h-auto">
              <Image
                src={image.url}
                alt={image.alt}
                width={1200}
                height={800}
                className="object-contain w-full h-full"
              />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
