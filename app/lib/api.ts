import { PortfolioItem } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
// lib/api.ts (versão atualizada)
export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  const res = await fetch(`${API_BASE_URL}/api/trabalhos?populate=*`);
  console.log("Requisição para:", `${API_BASE_URL}/api/trabalhos?populate=*`);
  const data = await res.json();
  console.log("Dados recebidos:", data);
  if (!data.data) return [];

  return data.data.map((item: any) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    description: item.description,
    category: item.category || "Sem categoria",
    thumbnail: {
      url: `${API_BASE_URL}${item.thumbnail?.url}` || "",
      alt: item.thumbnail?.alternativeText || "",
    },
    images:
      item.images?.map(
        (img: any) => (
          console.log("mapImages: ", `${API_BASE_URL}${img.url}`),
          {
            url: `${API_BASE_URL}${img.url}` || "",
            alt: img.alternativeText || "",
          }
        )
      ) || [],
    client: item.client,
    date: item.date,
    location: item.location,
    equipment: item.equipment,
  }));
}
