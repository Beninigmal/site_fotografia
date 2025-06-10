// app/sobre/page.tsx
import { getSobreMimContent } from "../lib/sobre"; // Corrija o caminho conforme necessário
import Image from "next/image";

export default async function SobrePage() {
  const sobreData = await getSobreMimContent();

  if (!sobreData) {
    return (
      <div className="min-h-[calc(100vh-350px)] bg-gray-50 flex items-center justify-center">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Conteúdo não encontrado</h1>
          <p className="text-lg">
            O conteúdo da página "Sobre Mim" não está disponível no momento.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-350px)] bg-gray-50">
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Foto de perfil com fallback */}
          <div className="relative aspect-square rounded-lg overflow-hidden shadow-xl bg-gray-200">
            {sobreData.foto_perfil.url ? (
              <Image
                src={sobreData.foto_perfil.url}
                alt={"sobreData.foto_perfil.alternativeText"}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                Sem imagem
              </div>
            )}
          </div>

          {/* Biografia */}
          <div>
            <h1 className="text-4xl font-bold mb-6 text-gray-800">Sobre Mim</h1>
            <div
              className="prose prose-lg max-w-none text-gray-600"
              dangerouslySetInnerHTML={{ __html: sobreData.biografia }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
