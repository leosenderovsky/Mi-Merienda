import React from 'react';
import { useCart } from '../context/CartContext';
import { brandConfig, formatCurrency } from '../brand.config';
import {
  ShoppingBasket,
  Trash2,
  X,
  Info,
  Truck,
  CreditCard,
  ArrowRight,
  Store,
  Plus,
  Minus
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    items,
    totalItems,
    subtotal,
    hasLeadTimeItems,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  if (!isCartOpen) return null;

  const handleProceedToDelivery = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const getUnitBadge = (item: typeof items[0]) => {
    if (item.product.requiresLeadTime) return 'Encargo';
    if (item.product.unidad === 'docena') return 'Docena';
    if (item.product.unidad === 'kilo') return '1 Kilo';
    if (item.product.unidad === '500 grs') return '500 grs';
    return item.product.unidad;
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-md h-full bg-[#fdf9f3] flex flex-col shadow-2xl animate-in slide-in-from-right duration-300 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-[#fdf9f3] border-b border-[#f1ede7] flex items-center justify-between shrink-0">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <ShoppingBasket className="w-5 h-5 text-[#7e5700]" />
              <h2 className="font-serif text-xl sm:text-2xl text-[#422316] font-bold">
                Tu canasta de delicias
              </h2>
            </div>
            <p className="text-xs text-[#514440]">
              {totalItems > 0
                ? `${totalItems} delicias horneadas preparadas con amor`
                : 'Sin productos seleccionados aún'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {totalItems > 0 && (
              <button
                onClick={clearCart}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#f1ede7] text-[#514440] hover:bg-[#ebe8e2] text-xs font-semibold transition-all active:scale-95 cursor-pointer"
                title="Vaciar canasta"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Vaciar</span>
              </button>
            )}

            <button
              onClick={() => setIsCartOpen(false)}
              className="w-9 h-9 rounded-full bg-[#f1ede7] text-[#422316] flex items-center justify-center hover:bg-[#ebe8e2] active:scale-95 transition-all cursor-pointer"
              aria-label="Cerrar canasta"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Drawer Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center space-y-3 bg-[#ffffff] rounded-2xl border border-[#f1ede7]">
              <div className="w-16 h-16 rounded-full bg-[#f1ede7] flex items-center justify-center text-[#83746f]">
                <ShoppingBasket className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#422316]">
                Tu canasta está vacía
              </h3>
              <p className="text-xs text-[#514440] max-w-xs leading-relaxed">
                ¡Pasá por el catálogo y descubrí los panes recién horneados, facturas caseras y tortas por encargo!
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-2 px-5 py-2.5 rounded-full bg-[#422316] text-white text-xs font-semibold hover:bg-[#5c382a] active:scale-95 transition-all cursor-pointer shadow-sm"
              >
                Explorar catálogo
              </button>
            </div>
          ) : (
            <>
              {/* Fresh bake lead notice (if encargo cakes are in cart) */}
              {hasLeadTimeItems && (
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#ffdead]/50 text-[#281900] shadow-sm relative overflow-hidden border border-[#ffdead]">
                  <div className="w-8 h-8 rounded-full bg-[#fabc4d]/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Info className="w-4 h-4 text-[#7e5700]" />
                  </div>
                  <div className="flex flex-col gap-0.5 text-xs leading-relaxed">
                    <span className="font-bold text-[#281900]">
                      Aviso de horneado fresco
                    </span>
                    <p className="text-[#604100]">
                      {brandConfig.delivery.leadNoticeCake}
                    </p>
                  </div>
                </div>
              )}

              {/* Items List */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="relative flex gap-3 p-3.5 rounded-2xl bg-[#ffffff] shadow-[0_4px_16px_-2px_rgba(92,56,42,0.06)] border border-[#f1ede7] transition-all"
                  >
                    {/* Item Image with Unit Badge */}
                    <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-[#f1ede7] relative">
                      <img
                        src={item.product.imagen}
                        alt={item.product.nombre}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded-full bg-[#ffdead] text-[#281900] text-[9px] font-bold shadow-xs">
                        {getUnitBadge(item)}
                      </span>
                    </div>

                    {/* Item Body */}
                    <div className="flex flex-col justify-between flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <div className="flex flex-col min-w-0 pr-1">
                          <h4 className="font-serif text-sm sm:text-base font-bold text-[#422316] leading-tight truncate">
                            {item.product.nombre}
                          </h4>
                          {item.optionSummary && (
                            <p className="text-xs text-[#514440] line-clamp-1 mt-0.5">
                              {item.optionSummary}
                            </p>
                          )}
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#83746f] hover:text-[#ba1a1a] transition-colors p-1 -mr-1 -mt-1 cursor-pointer"
                          aria-label={`Eliminar ${item.product.nombre}`}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Price and Stepper */}
                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#f7f3ed]">
                        <span className="font-serif text-base font-bold text-[#422316]">
                          {formatCurrency(item.totalPrice)}
                        </span>

                        <div className="flex items-center gap-2 bg-[#f1ede7] px-2 py-1 rounded-full border border-[#e6e2dc]">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-6 h-6 rounded-full bg-[#ffffff] text-[#422316] flex items-center justify-center font-bold text-xs shadow-xs active:scale-90 transition-transform cursor-pointer"
                            aria-label="Restar 1"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-[#422316] w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-6 h-6 rounded-full bg-[#ffffff] text-[#422316] flex items-center justify-center font-bold text-xs shadow-xs active:scale-90 transition-transform cursor-pointer"
                            aria-label="Sumar 1"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cost Breakdown Card */}
              <div className="flex flex-col p-4 rounded-2xl bg-[#f7f3ed] border border-[#e6e2dc] shadow-sm space-y-2.5">
                <div className="flex items-center justify-between text-xs text-[#514440]">
                  <span>Subtotal de productos</span>
                  <span className="font-bold text-sm text-[#422316]">
                    {formatCurrency(subtotal)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-[#514440]">
                  <div className="flex items-center gap-1.5">
                    <span>Envío / Retiro</span>
                    <Truck className="w-3.5 h-3.5 text-[#83746f]" />
                  </div>
                  <span className="font-semibold text-[#7e5700]">
                    A convenir en siguiente paso
                  </span>
                </div>

                <div className="h-px w-full bg-[#d5c3bd]/50 my-1" />

                <div className="flex items-baseline justify-between pt-0.5">
                  <div className="flex flex-col">
                    <span className="font-serif text-base text-[#422316] font-bold">
                      Total estimado
                    </span>
                    <span className="text-[10px] text-[#83746f]">
                      Sin recargos adicionales
                    </span>
                  </div>
                  <span className="font-serif text-2xl text-[#422316] font-bold">
                    {formatCurrency(subtotal)}
                  </span>
                </div>
              </div>

              {/* Neighborhood Direct Assurance Card */}
              <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-[#f1ede7] text-[#514440] border border-[#e6e2dc] text-xs leading-relaxed">
                <CreditCard className="w-4 h-4 text-[#5c382a] shrink-0 mt-0.5" />
                <p>
                  Los pedidos se abonan al retirar en el mostrador o por{' '}
                  <strong className="font-semibold text-[#422316]">
                    transferencia bancaria directa
                  </strong>{' '}
                  al confirmar los detalles por WhatsApp. Cero comisiones de plataforma.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Drawer Sticky Footer with CTAs */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 bg-[#fdf9f3] border-t border-[#f1ede7] flex flex-col space-y-2 shrink-0">
            <button
              onClick={handleProceedToDelivery}
              className="w-full py-3.5 px-6 rounded-2xl bg-[#422316] hover:bg-[#5c382a] text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-[0_10px_24px_-4px_rgba(92,56,42,0.22)] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Continuar a datos de entrega</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsCartOpen(false)}
              className="w-full py-2.5 px-4 text-xs font-semibold text-[#422316] hover:bg-[#f1ede7] rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Store className="w-4 h-4" />
              <span>Seguir sumando delicias del catálogo</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
