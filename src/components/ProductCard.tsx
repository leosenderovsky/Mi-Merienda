import React, { useState } from 'react';
import { Product } from '../products';
import { formatCurrency } from '../brand.config';
import { useCart } from '../context/CartContext';
import { Plus, Check, SlidersHorizontal, Clock, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOpenDetail: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetail }) => {
  const { addToCart } = useCart();
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);

  const isCustomizable = product.categoría === 'tortas' || (product.opciones && product.opciones.length > 1);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isCustomizable) {
      onOpenDetail(product);
      return;
    }

    // Default option if single option exists
    let defaultOptions = {};
    if (product.opciones && product.opciones.length > 0) {
      const opt = product.opciones[0];
      if (opt.choices && opt.choices.length > 0) {
        const defChoice = opt.choices.find(c => c.isDefault) || opt.choices[0];
        defaultOptions = { [opt.id]: defChoice };
      }
    }

    addToCart(product, 1, defaultOptions);
    setIsAddedFeedback(true);
    setTimeout(() => {
      setIsAddedFeedback(false);
    }, 1200);
  };

  const unitLabelText = () => {
    if (product.unidad === 'docena') return 'Por docena';
    if (product.unidad === 'kilo') return 'Por kilo';
    if (product.unidad === '500 grs') return 'Por 1/2 kilo';
    return product.unidad.startsWith('unidad') ? product.unidad : `Unidad (${product.unidad})`;
  };

  return (
    <article
      onClick={() => onOpenDetail(product)}
      className="group flex flex-col bg-[#ffffff] rounded-2xl shadow-[0_4px_16px_-2px_rgba(92,56,42,0.06)] hover:shadow-[0_8px_24px_-4px_rgba(92,56,42,0.12)] border border-[#f1ede7] overflow-hidden transition-all duration-300 cursor-pointer"
    >
      {/* Product Image Box */}
      <div className="relative w-full h-48 sm:h-52 bg-[#f1ede7] overflow-hidden">
        <img
          src={product.imagen}
          alt={product.nombre}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Top Badge (Recién salidas, 24h Fermentación, Salen calientes, etc.) */}
        {product.badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#fdf9f3]/95 backdrop-blur-md text-[#7e5700] text-xs font-bold shadow-sm flex items-center gap-1.5 border border-[#ebe8e2]">
            {product.requiresLeadTime ? (
              <Clock className="w-3.5 h-3.5 text-[#7e5700]" />
            ) : (
              <Sparkles className="w-3.5 h-3.5 text-[#fdbe50] fill-[#fdbe50]" />
            )}
            <span>{product.badge}</span>
          </span>
        )}

        {/* Bottom Unit Tag */}
        <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-[#ffffff]/90 backdrop-blur-md text-[#514440] text-[11px] font-bold shadow-sm border border-[#ebe8e2] capitalize">
          {unitLabelText()}
        </span>
      </div>

      {/* Product Details Content */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 gap-3">
        <div className="flex flex-col gap-1">
          <h3 className="font-serif text-lg sm:text-xl text-[#422316] font-semibold leading-snug group-hover:text-[#5c382a] transition-colors">
            {product.nombre}
          </h3>
          <p className="text-xs sm:text-sm text-[#514440] leading-relaxed line-clamp-2">
            {product.descripción}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="flex items-center justify-between pt-2 border-t border-[#f7f3ed]">
          <div className="flex flex-col">
            <span className="text-[10px] text-[#83746f] uppercase font-bold tracking-wider">
              {product.requiresLeadTime ? 'Encargo especial' : `Precio ${product.unidad}`}
            </span>
            <span className="font-serif text-xl sm:text-2xl text-[#422316] font-bold">
              {formatCurrency(product.precio)}
            </span>
          </div>

          {/* Action button */}
          {isCustomizable ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetail(product);
              }}
              className="px-4 py-2 rounded-full bg-[#2d4637] hover:bg-[#173022] text-[#ffffff] text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all active:scale-95 shadow-sm cursor-pointer"
            >
              <span>Personalizar y pedir</span>
              <SlidersHorizontal className="w-4 h-4 text-[#cdead5]" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleQuickAdd}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all active:scale-95 shadow-sm cursor-pointer ${
                isAddedFeedback
                  ? 'bg-[#2d4637] text-white'
                  : 'bg-[#422316] hover:bg-[#5c382a] text-white'
              }`}
            >
              {isAddedFeedback ? (
                <>
                  <Check className="w-4 h-4 text-[#cdead5]" />
                  <span>¡Sumado!</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Agregar</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
