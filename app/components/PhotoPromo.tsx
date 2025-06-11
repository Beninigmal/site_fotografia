// components/PhotoPromo.tsx
"use client";

import { motion } from "framer-motion";

export function PhotoPromo() {
  return (
    <motion.div
      initial={{ rotate: -5 }}
      animate={{ rotate: 5 }}
      transition={{
        repeat: Infinity,
        repeatType: "reverse",
        duration: 3,
      }}
      className="w-64 h-80 bg-white p-4 shadow-xl mx-auto"
    >
      <div className="h-48 bg-gray-200 animate-pulse" />
      <div className="mt-4 text-center font-handwriting text-gray-800">
        <p>Promoção especial!</p>
        <p className="text-sm">Válida por tempo limitado</p>
      </div>
    </motion.div>
  );
}
