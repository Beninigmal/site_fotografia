// lib/sobre.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

interface SobreMimData {
  id: number;
  biografia: string;
  foto_perfil: {
    url: string;
    alternativeText?: string;
  };
}

export async function getSobreMimContent(): Promise<SobreMimData | null> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/sobre-mims?populate=foto_perfil` // ← Corrigido aqui
    );

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const { data } = await response.json();

    if (!data) return null;

    // Verificação segura da estrutura dos dados

    const fotoData = data[0].foto_perfil[0];

    return {
      id: data.id,
      biografia: data[0].biografia[0].children[0].text,
      foto_perfil: {
        url: fotoData?.url
          ? `${API_BASE_URL}${fotoData.url}`
          : "/placeholder-profile.jpg", // Fallback
        alternativeText: fotoData?.alternativeText || "Foto de perfil",
      },
    };
  } catch (error) {
    console.error("Erro ao buscar conteúdo do Sobre Mim:", error);
    return null;
  }
}
