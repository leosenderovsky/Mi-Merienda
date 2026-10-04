import React from 'react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../brand.config';
import { ShoppingBag, ChevronRight } from 'lucide-react';

export const FloatingCartBar: React.FC = () => {
  const { totalItems, subtotal, isCartOpen, isCheckoutOpen, setIsCartOpen } = useCart();

  if (totalItems === 0 || isCartOpen || isCheckoutOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-20 left-0 right-0 z-30 px-4 max-w-md mx-auto pointer-events-none animate-in slide-in-from-bottom-4 duration-300">
      <div className="pointer-events-auto w-full bg-brand-primary text-white rounded-2xl p-3.5 sm:p-4 flex items-center justify-between shadow-[0_12px_28px_-4px_rgba(66,35,22,0.4)] border border-brand-primary-container/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-primary-container text-brand-primary-fixed flex items-center justify-center shrink-0">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-brand-primary-fixed uppercase tracking-wider font-bold">
              Tu pedido actual
            </span>
            <span className="font-serif text-sm sm:text-base font-bold text-white leading-tight">
              {totalItems} {totalItems === 1 ? 'ítem' : 'ítems'} • {formatCurrency(subtotal)}
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsCartOpen(true)}
          className="px-4 py-2 rounded-full bg-brand-secondary-container hover:bg-brand-secondary-container text-brand-on-secondary-container font-bold text-xs sm:text-sm flex items-center gap-1 shadow-sm active:scale-95 transition-all cursor-pointer"
        >
          <span>Ver Carrito</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
