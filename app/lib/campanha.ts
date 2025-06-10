// app/lib/campanhas.ts
const API_BASE_URL = process.env.STRAPI_API_URL || "http://localhost:1337";

interface Campanha {
  id: number;
  titulo: string;
  descricao: any[];
  imagem?: {
    url: string;
    alternativeText?: string;
  };
}

// app/lib/campanhas.ts
export async function getCampanhaAtiva(): Promise<Campanha | null> {
  try {
    const now = new Date().toISOString().split("T")[0];
    const response = await fetch(
      `${API_BASE_URL}/api/campanhas?populate=imagem&filters[ativo][$eq]=true&filters[data_inicio][$lte]=${now}&filters[data_fim][$gte]=${now}`
    );

    const { data } = await response.json();

    if (!data || data.length === 0) return null;

    const campanha = data[0];
    console.log("Dados completos:", JSON.stringify(campanha, null, 2)); // Para debug

    // Transformação correta da imagem
    const imagem = campanha.imagem?.[0]?.url
      ? {
          url: `${API_BASE_URL}${campanha.imagem[0].url}`,
          alternativeText:
            campanha.imagem[0].alternativeText || campanha.titulo,
        }
      : undefined;

    return {
      id: campanha.id,
      titulo: campanha.titulo,
      descricao: campanha.descricao || [],
      imagem,
    };
  } catch (error) {
    console.error("Erro ao buscar campanha:", error);
    return null;
  }
}
