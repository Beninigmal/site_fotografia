"use client"; // Adicione esta diretiva no topo do arquivo

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";

interface WorkItem {
  id: number;
  titulo: string;
  categoria: string | null;
  image: string;
}

export default function GaleriaTrabalhos({
  initialWorks,
}: {
  initialWorks: WorkItem[];
}) {
  const [activecategoria, setActivecategoria] = useState("All");
  const [works, setWorks] = useState(initialWorks);
  const [isLoading, setIsLoading] = useState(false);

  // Extrai categorias únicas
  const categories = useMemo(() => {
    const cats = new Set(works.map((work) => work.categoria));
    return ["All", ...(Array.from(cats).filter(Boolean) as string[])];
  }, [works]);

  // Filtra trabalhos por categoria
  const filteredWorks = useMemo(() => {
    return activecategoria === "All"
      ? works
      : works.filter((work) => work.categoria === activecategoria);
  }, [works, activecategoria]);

  // Debug: Verifica os dados recebidos
  useEffect(() => {
    console.log("Works data:", works);
  }, [works]);

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (works.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-600">Nenhum trabalho encontrado</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Filtros por categoria */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map((categoria) => (
          <button
            key={categoria}
            onClick={() => setActivecategoria(categoria)}
            className={`px-4 py-2 rounded-full transition-colors ${
              categoria === activecategoria
                ? "bg-purple-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {categoria}
          </button>
        ))}
      </div>

      {/* Grid de trabalhos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorks.map((work) => (
          // console.log("Work item:", work["descricao"][0].children[0].text),
          <div
            key={work.id}
            className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            {/* Imagem do trabalho */}
            <div className="aspect-square relative">
              <Image
                src={work?.image || "/placeholder.jpg"}
                alt={work?.titulo || "Trabalho sem título"}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            {/* Informações do trabalho */}
            <div className="p-4">
              <h3 className="font-semibold text-lg line-clamp-1">
                {work.titulo || "Sem título"}
              </h3>
              {work.categoria && (
                <p className="text-sm text-gray-600 mt-1">{work.categoria}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
