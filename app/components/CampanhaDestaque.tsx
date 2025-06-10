import Image from "next/image";

interface TextChild {
  type: string;
  text: string;
}

interface ParagraphBlock {
  type: string;
  children: TextChild[];
}

interface Campanha {
  id: number;
  titulo: string;
  descricao: ParagraphBlock[];
  imagem?: {
    url: string;
    alternativeText?: string;
  };
}

export default function CampanhaDestaque({
  campanha,
}: {
  campanha: Campanha | null;
}) {
  // Verificação profunda antes de renderizar
  if (!campanha?.titulo) {
    return null;
  }

  return (
    <section className="bg-gradient-to-r from-pink-100 to-purple-100 p-6 rounded-lg mb-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4 text-cyan-600">
            {campanha.titulo}
          </h2>
          <div className="prose  text-cyan-600">
            {campanha.descricao?.map((block: ParagraphBlock, index: number) => (
              <p key={index}>
                {block.children?.map((child: TextChild, i: number) => (
                  <span key={i}>{child.text}</span>
                ))}
              </p>
            ))}
          </div>
        </div>

        {campanha.imagem?.url && (
          <div className="flex-1">
            <div className="relative aspect-video">
              <Image
                src={campanha.imagem.url}
                alt={campanha.imagem.alternativeText || campanha.titulo}
                fill
                className="object-cover rounded-lg"
                unoptimized={process.env.NODE_ENV === "development"}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
