import { PortfolioItem } from "./types";

const API_BASE_URL = process.env.STRAPI_API_URL || "http://localhost:1337";
// lib/api.ts (versão atualizada)
export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  const res = await fetch(`${API_BASE_URL}/api/trabalhos?populate=*`);
  const data = await res.json();

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
      item.images?.map((img: any) => ({
        url: img.url,
        alt: img.alternativeText || "",
      })) || [],
    client: item.client,
    date: item.date,
    location: item.location,
    equipment: item.equipment,
  }));
}
