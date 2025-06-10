// lib/types.ts
export type PortfolioItem = {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  thumbnail: {
    url: string;
    alt: string;
  };
  images: {
    url: string;
    alt: string;
  }[];
  client?: string;
  date?: string;
  location?: string;
  equipment?: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
};
