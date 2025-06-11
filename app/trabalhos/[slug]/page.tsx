import { ImageModal } from "@/app/components/Portfolio/ImagemModal";
import { notFound } from "next/navigation";

type Trabalho = {
  titulo: string;
  imagens: {
    url: string;
    alt: string;
  }[];
};

const API_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

async function getTrabalho(slug: string): Promise<Trabalho> {
  const url = `${API_BASE_URL}/api/trabalhos?filters[slug][$eq]=${slug}&populate=*`;
  const res = await fetch(url);

  if (!res.ok) notFound();

  const response = await res.json();

  if (!response.data || response.data.length === 0) notFound();

  const trabalho = response.data[0];
  const imagens = (trabalho.images || []).map(
    (img: { url: string; alternativeText: any }) => ({
      url: img.url.startsWith("http") ? img.url : `${API_BASE_URL}${img.url}`,
      alt: img.alternativeText || `Imagem de ${trabalho.title}`,
    })
  );

  return {
    titulo: trabalho.title || trabalho.titulo,
    imagens,
  };
}

// Esta é a sintaxe correta para páginas dinâmicas no Next.js 13+
export default async function Page({ params }: { params: { slug: string } }) {
  const trabalho = await getTrabalho(params.slug);

  return (
    <>
      <div className="hidden">
        <h1>{trabalho.titulo}</h1>
      </div>
      <ImageModal images={trabalho.imagens} />
    </>
  );
}

// Geração estática de páginas (opcional)
export async function generateStaticParams() {
  return []; // Retorne um array vazio ou seus slugs pré-definidos
}
