import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export const WhatsAppFloatButton = () => {
  // Número de telefone formatado (remova espaços, traços, etc.)
  const phoneNumber = "557181491950"; // Substitua pelo seu número
  const whatsappMessage =
    "Olá! Gostaria de mais informações sobre seu trabalho."; // Mensagem padrão opcional

  // Gera o link universal para WhatsApp (funciona em mobile e web)
  const getWhatsAppLink = () => {
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 transition-colors shadow-lg animate-bounce "
        aria-label="Contato via WhatsApp"
      >
        <FaWhatsapp className="text-white text-2xl" />
      </a>
    </div>
  );
};
