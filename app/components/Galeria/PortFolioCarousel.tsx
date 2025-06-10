// components/Galeria/PortfolioCarousel.tsx
"use client";

import Slider from "react-slick";
import { WorkCard } from "./WorkCard";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PortfolioItem } from "@/app/lib/types";

export function PortfolioCarousel({ items }: { items: PortfolioItem[] }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(items.length, 3), // Mostra no máximo 3 itens
    slidesToScroll: 1,
    centerMode: false,
    focusOnSelect: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(items.length, 2),
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="slick-container px-4 py-8">
      <style jsx global>{`
        /* Estilos para os botões de navegação */
        .slick-prev,
        .slick-next {
          width: 40px;
          height: 40px;
          z-index: 10;
        }
        .slick-prev:before,
        .slick-next:before {
          color: #992be2; /* Cor cinza */
          font-size: 40px;
        }
        .slick-prev {
          left: -13px;
        }
        .slick-next {
          right: -12px;
        }

        /* Tamanho dos slides */
        .slick-slide > div {
          margin: 0 20px;
        }
      `}</style>
      <Slider {...settings}>
        {items.map(
          (item, index) => (
            console.log("Slider", item.images),
            (
              <div key={item.id} className="px-2">
                <WorkCard
                  id={item.id}
                  title={item.title}
                  category={item.category}
                  thumbnail={item.thumbnail.url}
                  images={item.images} // Passe todas as imagens
                  slug={item.slug}
                  index={index}
                  showGallery={true} // Ativa a exibição da galeria
                />
              </div>
            )
          )
        )}
      </Slider>
    </div>
  );
}
