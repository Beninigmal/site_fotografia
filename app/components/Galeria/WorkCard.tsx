// components/Galeria/WorkCard.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

// components/Galeria/WorkCard.tsx
type WorkCardProps = {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  images?: {
    // Novo campo opcional
    url: string;
    alt: string;
  }[];
  slug: string;
  index: number;
  showGallery?: boolean; // Novo prop para controlar a exibição
};
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const API_BASE_URL = process.env.STRAPI_API_URL || "http://localhost:1337";

export function WorkCard({
  id,
  title,
  category,
  thumbnail,
  images = [], // Valor padrão
  slug,
  index,
  showGallery = false, // Padrão false
}: WorkCardProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={cardVariants}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
    >
      {/* Thumbnail principal */}
      <div className="relative aspect-[4/3]">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Overlay hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-end justify-center drop-shadow-md">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 10 }}
            transition={{ delay: index * 0.1 + 0.2 }}
            className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center p-4"
          >
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="text-sm">{category}</p>
          </motion.div>
        </div>
      </div>

      {/* Galeria de imagens (condicional) */}
      {showGallery && images.length > 0 && (
        <div className="grid grid-cols-3 gap-2 p-2 bg-gray-50 dark:bg-gray-800">
          {images.map((image, idx) => (
            <div key={idx} className="relative aspect-square">
              <Image
                src={`${API_BASE_URL}${image.url}`}
                alt={image.alt}
                fill
                className="object-cover rounded"
              />
            </div>
          ))}
        </div>
      )}

      <Link
        href={`/portfolio/${slug}`}
        className="absolute inset-0 z-10"
        aria-label={`Ver ${title}`}
      />
    </motion.div>
  );
}
