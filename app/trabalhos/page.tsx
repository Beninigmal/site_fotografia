// app/portfolio/page.tsx

import { PortfolioCarousel } from "../components/Galeria/PortFolioCarousel";
import { getPortfolioItems } from "../lib/api";

export default async function PortfolioPage() {
  const items = await getPortfolioItems();

  return (
    <div className="bg-white dark:bg-gray-900 py-12">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Portfólio</h1>
        <PortfolioCarousel items={items} />
      </div>
    </div>
  );
}
