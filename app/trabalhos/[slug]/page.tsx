import { ImageModal } from "@/app/components/Portfolio/ImagemModal";
import { notFound } from "next/navigation";

interface Trabalho {
  titulo: string;
  imagens: {
    url: string;
    alt: string;
  }[];
}

const API_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

async function getTrabalho(slug: string): Promise<Trabalho> {
  const res = await fetch(
    `${API_BASE_URL}/api/trabalhos?filters[slug][$eq]=${slug}&populate=*`
  );

  if (!res.ok) notFound();

  const data = await res.json();
  if (!data.data || data.data.length === 0) notFound();

  const trabalho = data.data[0];
  return {
    titulo: trabalho.title || trabalho.titulo || "Sem título",
    imagens: (trabalho.images || []).map((img: any) => ({
      url: img.url?.startsWith("http") ? img.url : `${API_BASE_URL}${img.url}`,
      alt: img.alternativeText || `Imagem do trabalho ${trabalho.title}`,
    })),
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const trabalho = await getTrabalho(params.slug);

  return (
    <div>
      <div className="hidden">
        <h1>{trabalho.titulo}</h1>
      </div>
      <ImageModal images={trabalho.imagens} />
    </div>
  );
}

export const dynamicParams = false; // Desativa geração dinâmica se não usar generateStaticParams
