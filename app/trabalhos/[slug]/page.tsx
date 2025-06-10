import { ImageModal } from "@/app/components/Portfolio/ImagemModal";
import { notFound } from "next/navigation";

type Trabalho = {
  titulo: string;
  imagens: {
    url: string;
    alt: string;
  }[];
};

const API_BASE_URL = process.env.STRAPI_API_URL || "http://localhost:1337";

async function getTrabalho(slug: string): Promise<Trabalho> {
  // URL correta para Strapi v3
  const url = `${API_BASE_URL}/api/trabalhos?filters[slug][$eq]=${slug}&populate=*`;
  console.log("Fetching:", url);

  const res = await fetch(url);

  if (!res.ok) {
    console.error("Erro na resposta:", res.status, await res.text());
    throw new Error("Falha ao buscar dados");
  }

  const response = await res.json();
  console.log("Resposta completa:", JSON.stringify(response, null, 2));

  // Verificação para Strapi v3 - formato { data: [], meta: {} }
  if (!response.data || !Array.isArray(response.data)) {
    console.error("Formato inesperado:", typeof response);
    throw new Error("Formato de resposta inesperado");
  }

  if (response.data.length === 0) {
    console.warn("Nenhum trabalho encontrado para slug:", slug);
    notFound();
  }

  const trabalho = response.data[0];
  if (!trabalho) notFound();

  // Transformação segura das imagens para Strapi v3
  const imagens = (trabalho.images || []).map(
    (img: { url: string; alternativeText: any }) => ({
      url: img.url.startsWith("http") ? img.url : `${API_BASE_URL}${img.url}`,
      alt:
        img.alternativeText ||
        `Imagem de ${trabalho.title}` ||
        "Imagem sem descrição",
    })
  );

  return {
    titulo: trabalho.title || trabalho.titulo,
    imagens,
  };
}

export default async function DetalheTrabalho({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const trabalho = await getTrabalho(params.slug);
    console.log("Trabalho transformado:", trabalho);

    return (
      <>
        <div className="hidden">
          <h1>{trabalho.titulo}</h1>
        </div>

        <ImageModal images={trabalho.imagens} />
      </>
    );
  } catch (error) {
    console.error("Erro ao carregar trabalho:", error);
    notFound();
  }
}
