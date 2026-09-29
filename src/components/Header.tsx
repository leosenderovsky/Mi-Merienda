import React from 'react';
import { brandConfig, formatCurrency } from '../brand.config';
import { useCart } from '../context/CartContext';
import { MessageCircle, ShoppingBag } from 'lucide-react';

interface HeaderProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
  onNavigateTortas?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigateTortas }) => {
  const { totalItems, subtotal, setIsCartOpen } = useCart();

  const handleWhatsAppDirect = () => {
    const defaultMsg = encodeURIComponent(
      `¡Hola ${brandConfig.brand.name}! Quisiera hacerles una consulta sobre los productos del día.`
    );
    window.open(`https://wa.me/${brandConfig.contact.whatsappNumber}?text=${defaultMsg}`, '_blank', 'noopener,noreferrer');
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 w-full z-40 pt-safe bg-[#fdf9f3]/95 backdrop-blur-md shadow-[0_2px_12px_rgba(92,56,42,0.06)] border-b border-[#f1ede7]">
      <div className="max-w-4xl mx-auto px-4 pt-2.5 pb-2 flex flex-col items-center justify-center relative">
        {/* Brand Center */}
        <div className="flex flex-col items-center justify-center">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex flex-col items-center group transition-transform active:scale-95"
          >
            <img
              src={brandConfig.brand.logoUrl}
              alt={brandConfig.brand.name}
              className="h-14 sm:h-16 w-auto object-contain drop-shadow-sm"
              onError={(e) => {
                // Fallback elegante en caso de fallo de red
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <span className="font-serif text-lg sm:text-xl font-bold text-[#422316] tracking-tight -mt-1">
              {brandConfig.brand.name}
            </span>
          </a>
        </div>

        {/* Right Action Icons (WhatsApp directo & Carrito con Badge) */}
        <div className="absolute right-4 top-3 flex items-center gap-2">
          {/* WhatsApp Directo */}
          <button
            onClick={handleWhatsAppDirect}
            aria-label="WhatsApp directo"
            title="Consultar por WhatsApp"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#2d4637] text-white flex items-center justify-center transition-all hover:bg-[#173022] active:scale-95 shadow-[0_2px_8px_rgba(45,70,55,0.25)] cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 text-[#cdead5]" />
          </button>

          {/* Cart Bag */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label={`Ver carrito: ${totalItems} ítems`}
            title="Ver canasta de delicias"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#f1ede7] text-[#422316] flex items-center justify-center relative transition-all hover:bg-[#ebe8e2] active:scale-95 shadow-sm cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 rounded-full bg-[#fdbe50] text-[#714d00] text-[11px] font-bold flex items-center justify-center shadow-sm animate-in fade-in zoom-in-75">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Secondary Navigation Links */}
      <div className="max-w-4xl mx-auto px-4 pb-2.5 flex items-center gap-2 overflow-x-auto no-scrollbar justify-center">
        <button
          onClick={() => scrollToSection('catalogo')}
          className="shrink-0 px-3.5 py-1 rounded-full bg-[#422316] text-white text-xs sm:text-sm font-medium hover:bg-[#5c382a] transition-colors cursor-pointer shadow-sm"
        >
          Productos
        </button>
        <button
          onClick={onNavigateTortas ? onNavigateTortas : () => scrollToSection('catalogo')}
          className="shrink-0 px-3.5 py-1 rounded-full bg-[#f1ede7] text-[#514440] text-xs sm:text-sm font-medium hover:bg-[#ebe8e2] transition-colors cursor-pointer"
        >
          Tortas por encargo
        </button>
        <button
          onClick={() => scrollToSection('como-pedir')}
          className="shrink-0 px-3.5 py-1 rounded-full bg-[#f1ede7] text-[#514440] text-xs sm:text-sm font-medium hover:bg-[#ebe8e2] transition-colors cursor-pointer"
        >
          Cómo pedir
        </button>
        <button
          onClick={() => scrollToSection('contacto')}
          className="shrink-0 px-3.5 py-1 rounded-full bg-[#f1ede7] text-[#514440] text-xs sm:text-sm font-medium hover:bg-[#ebe8e2] transition-colors cursor-pointer"
        >
          Contacto
        </button>
      </div>
    </header>
  );
};
