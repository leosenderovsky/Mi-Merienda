import React from 'react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../brand.config';
import { ProductCategory } from '../products';
import { Store, Cake, ShoppingBag, PhoneCall } from 'lucide-react';

interface BottomNavProps {
  onSelectCategory: (category: 'all' | ProductCategory) => void;
  selectedCategory: 'all' | ProductCategory;
}

export const BottomNav: React.FC<BottomNavProps> = ({ onSelectCategory, selectedCategory }) => {
  const { subtotal, totalItems, setIsCartOpen } = useCart();

  const handleNavCatalog = () => {
    onSelectCategory('all');
    const el = document.getElementById('catalogo');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavTortas = () => {
    onSelectCategory('tortas');
    const el = document.getElementById('catalogo');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavContact = () => {
    const el = document.getElementById('contacto');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed bottom-0 w-full z-40 pb-safe bg-[#fdf9f3]/95 backdrop-blur-xl border-t border-[#f1ede7] shadow-[0_-4px_20px_rgba(92,56,42,0.08)] sm:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        
        {/* Catálogo Tab */}
        <button
          onClick={handleNavCatalog}
          className={`flex flex-col items-center justify-center gap-0.5 min-w-[56px] min-h-[44px] transition-colors cursor-pointer ${
            selectedCategory === 'all'
              ? 'text-[#422316] font-bold'
              : 'text-[#514440] hover:text-[#422316]'
          }`}
        >
          <Store className="w-5 h-5" />
          <span className="text-[11px]">Catálogo</span>
        </button>

        {/* Tortas Tab */}
        <button
          onClick={handleNavTortas}
          className={`flex flex-col items-center justify-center gap-0.5 min-w-[56px] min-h-[44px] transition-colors cursor-pointer ${
            selectedCategory === 'tortas'
              ? 'text-[#422316] font-bold'
              : 'text-[#514440] hover:text-[#422316]'
          }`}
        >
          <Cake className="w-5 h-5" />
          <span className="text-[11px]">Tortas</span>
        </button>

        {/* Carrito Tab (with Total or Badge) */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center gap-0.5 min-w-[64px] min-h-[44px] transition-colors text-[#422316] font-bold relative cursor-pointer"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-[#422316]" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2 px-1 min-w-[16px] h-4 rounded-full bg-[#fdbe50] text-[#714d00] text-[9px] font-bold flex items-center justify-center shadow-xs">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[11px]">
            {totalItems > 0 ? formatCurrency(subtotal) : 'Canasta'}
          </span>
        </button>

        {/* Contacto Tab */}
        <button
          onClick={handleNavContact}
          className="flex flex-col items-center justify-center gap-0.5 min-w-[56px] min-h-[44px] text-[#514440] hover:text-[#422316] transition-colors cursor-pointer"
        >
          <PhoneCall className="w-5 h-5" />
          <span className="text-[11px]">Contacto</span>
        </button>

      </div>
    </nav>
  );
};
