import CampanhaDestaque from "./components/CampanhaDestaque";
import { PortfolioCarousel } from "./components/Galeria/PortFolioCarousel";
import { PromoHeader } from "./components/PromoHeader";

import { getPortfolioItems } from "./lib/api";
import { getCampanhaAtiva } from "./lib/campanha";

// app/(home)/page.tsx
export default async function Home() {
  const initialWorks = await getPortfolioItems();
  const campanhaAtiva = await getCampanhaAtiva();

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <PromoHeader />
        <CampanhaDestaque campanha={campanhaAtiva} />
        <PortfolioCarousel items={initialWorks} />
      </main>

      {/* Rodapé agora ficará fixo na parte inferior */}
    </div>
  );
}
