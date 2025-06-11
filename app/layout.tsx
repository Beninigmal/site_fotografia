import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Rodape } from "./components/Rodape";
import { WhatsAppFloatButton } from "./components/Contato/WhatsAppButton";
import Navbar from "./components/Navbar";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Liane Gomes Fotografia",
  description: "Transformando momentos em memórias eternas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`flex flex-col min-h-screen ${playfair.variable} font-sans`}
      >
        <>
          <Navbar />
          <main className="flex-grow pt-16">{children}</main>
          <Rodape />
          <WhatsAppFloatButton />
        </>
      </body>
    </html>
  );
}
