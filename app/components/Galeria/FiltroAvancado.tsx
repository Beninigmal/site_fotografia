// components/Galeria/FiltroAvancado.tsx
"use client";

import { useState } from "react";
import { animated, useSpring } from "@react-spring/three";
import { motion } from "framer-motion";

type Category = {
  id: string;
  name: string;
  slug: string;
};

type FiltroAvancadoProps = {
  categories: Category[];
  activeCategory: string | null;
  onCategoryChange: (slug: string | null) => void;
};

export function FiltroAvancado({
  categories,
  activeCategory,
  onCategoryChange,
}: FiltroAvancadoProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  const handleFilter = (slug: string | null) => {
    onCategoryChange(slug === activeCategory ? null : slug);
  };

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleFilter(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
          !activeCategory
            ? "bg-cyan-600 text-white shadow-lg"
            : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
        }`}
      >
        Todos
      </motion.button>

      {categories.map((category) => {
        const isActive = activeCategory === category.slug;
        const isHovered = hovered === category.slug;

        return (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setHovered(category.slug)}
            onHoverEnd={() => setHovered(null)}
            onClick={() => handleFilter(category.slug)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all relative overflow-hidden ${
              isActive
                ? "bg-cyan-600 text-white shadow-lg"
                : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {isHovered && !isActive && (
              <motion.span
                className="absolute inset-0 bg-cyan-500 bg-opacity-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
            {category.name}
          </motion.button>
        );
      })}
    </div>
  );
}
