"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

export function PromoHeader() {
  const [currentPromo, setCurrentPromo] = useState(0);

  const promos = [
    {
      title: "Edição Profissional",
      description: "Transformamos suas fotos em obras de arte",
      cta: "Orçamento",
      bgClass: "bg-gray-800/90",
      image: "/images/polaroid.webp", // Caminho da imagem
      imagePosition: "right", // Posição da imagem
    },
    {
      title: "Sessão Premium",
      description: "Experiência fotográfica completa",
      cta: "Agendar",
      bgClass: "bg-rose-900/90",
      image: "/images/Camera.webp",
      imagePosition: "left",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % promos.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`relative h-260 overflow-hidden mt-5 py-5 ${promos[currentPromo].bgClass}`}
    >
      {/* Imagem de fundo */}
      <Image
        src={promos[currentPromo].image}
        alt={promos[currentPromo].title}
        fill
        className="object-cover absolute inset-0 z-0"
        quality={80}
      />

      {/* Overlay escuro para melhor legibilidade */}
      <div className="absolute inset-0 bg-black/40 z-1"></div>

      {/* Conteúdo */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPromo}
              initial={{
                opacity: 0,
                x: promos[currentPromo].imagePosition === "right" ? -50 : 50,
              }}
              animate={{ opacity: 1, x: 0 }}
              exit={{
                opacity: 0,
                x: promos[currentPromo].imagePosition === "right" ? 50 : -50,
              }}
              transition={{ duration: 0.7 }}
              className="text-white flex flex-col md:flex-row items-center justify-between gap-6"
            >
              <div
                className={`${
                  promos[currentPromo].imagePosition === "right"
                    ? "order-1"
                    : "order-2"
                } text-center md:text-left max-w-md`}
              >
                <h3 className="font-serif text-2xl font-bold mb-2">
                  {promos[currentPromo].title}
                </h3>
                <p className="text-lg opacity-90 mb-4">
                  {promos[currentPromo].description}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-white text-gray-800 rounded-full font-medium shadow-lg"
                >
                  {promos[currentPromo].cta}
                </motion.button>
              </div>

              {/* Moldura decorativa para a imagem (opcional) */}
              <div
                className={`${
                  promos[currentPromo].imagePosition === "right"
                    ? "order-2"
                    : "order-1"
                } relative w-64 h-64 hidden md:block`}
              >
                <div className="absolute inset-0 border-4 border-white/30 transform rotate-3 shadow-2xl overflow-hidden">
                  <Image
                    src={promos[currentPromo].image}
                    alt={promos[currentPromo].title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
