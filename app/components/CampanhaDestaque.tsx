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
  if (!campanha?.titulo) {
    return null;
  }

  return (
    <section className="bg-gradient-to-r from-gray-800 via-purple-700 to-pink-500 p-0 md:p-6 rounded-lg mb-8">
      <div className="w-full flex flex-col md:flex-row items-center">
        {campanha.imagem?.url && (
          <div className="w-full relative">
            <div className="relative w-full h-[350px] md:h-[450px] overflow-hidden md:rounded-lg">
              <Image
                src={campanha.imagem.url}
                alt={campanha.imagem.alternativeText || campanha.titulo}
                fill
                className="object-cover object-top md:rounded-lg"
                unoptimized={process.env.NODE_ENV === "development"}
              />
            </div>

            <div className="absolute inset-0 flex flex-col justify-end items-center text-center p-6 pb-8 md:p-8 md:pb-12 z-10 bg-black bg-opacity-40 md:rounded-lg">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 text-white drop-shadow-lg">
                {campanha.titulo}
              </h1>
              <div className="text-lg sm:text-xl lg:text-2xl text-white drop-shadow-lg max-w-md md:max-w-lg lg:max-w-2xl">
                {campanha.descricao?.map(
                  (block: ParagraphBlock, index: number) => (
                    <p key={index} className="mb-2 last:mb-0">
                      {block.children?.map((child: TextChild, i: number) => (
                        <span key={i}>{child.text}</span>
                      ))}
                    </p>
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
