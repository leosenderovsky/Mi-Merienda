import React, { useState, useEffect } from 'react';
import { Product } from '../products';
import { brandConfig, formatCurrency } from '../brand.config';
import { useCart, SelectedOptionState } from '../context/CartContext';
import {
  ArrowLeft,
  Star,
  Clock,
  Sparkles,
  ShieldCheck,
  CalendarCheck,
  Plus,
  Minus,
  ShoppingBag,
  MessageCircle,
  X
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  const { addToCart, setIsCartOpen } = useCart();
  const [quantity, setQuantity] = useState(1);

  // Estados de opciones seleccionadas
  const [selectedSize, setSelectedSize] = useState<any>(null);
  const [dedication, setDedication] = useState('¡Feliz Cumple Mamá!');
  const [hasSparkler, setHasSparkler] = useState(false);
  const [selectedVariedad, setSelectedVariedad] = useState<any>(null);
  const [selectedCorte, setSelectedCorte] = useState<any>(null);

  // Inicializar opciones al cambiar de producto
  useEffect(() => {
    setQuantity(1);
    if (product.opciones) {
      const sizeOpt = product.opciones.find(o => o.id === 'tamano');
      if (sizeOpt && sizeOpt.choices) {
        const def = sizeOpt.choices.find(c => c.isDefault) || sizeOpt.choices[0];
        setSelectedSize(def);
      } else {
        setSelectedSize(null);
      }

      const varOpt = product.opciones.find(o => o.id === 'variedad');
      if (varOpt && varOpt.choices) {
        const def = varOpt.choices.find(c => c.isDefault) || varOpt.choices[0];
        setSelectedVariedad(def);
      }

      const corteOpt = product.opciones.find(o => o.id === 'corte');
      if (corteOpt && corteOpt.choices) {
        const def = corteOpt.choices.find(c => c.isDefault) || corteOpt.choices[0];
        setSelectedCorte(def);
      }
    }
  }, [product]);

  // Cálculo en vivo del precio unitario y total
  const extraSize = selectedSize ? selectedSize.extraPrice : 0;
  const extraVariedad = selectedVariedad ? selectedVariedad.extraPrice : 0;
  const extraCorte = selectedCorte ? selectedCorte.extraPrice : 0;
  const extraSparkler = hasSparkler ? 1200 : 0;

  const unitPrice = product.precio + extraSize + extraVariedad + extraCorte + extraSparkler;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    const options: SelectedOptionState = {};
    if (selectedSize) options.tamano = selectedSize;
    if (selectedVariedad) options.variedad = selectedVariedad;
    if (selectedCorte) options.corte = selectedCorte;
    if (hasSparkler) options.velita = true;
    if (dedication.trim()) options.dedicatoria = dedication.trim();

    addToCart(product, quantity, options);
    onClose();
    setIsCartOpen(true);
  };

  const handleWhatsAppConsult = () => {
    const msg = encodeURIComponent(
      `¡Hola ${brandConfig.brand.name}! Tengo una consulta sobre ${product.nombre} por encargo.`
    );
    window.open(`https://wa.me/${brandConfig.contact.whatsappNumber}?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  const sizeOption = product.opciones?.find(o => o.id === 'tamano');
  const variedadOption = product.opciones?.find(o => o.id === 'variedad');
  const corteOption = product.opciones?.find(o => o.id === 'corte');
  const dedicationOption = product.opciones?.find(o => o.id === 'dedicatoria');
  const velitaOption = product.opciones?.find(o => o.id === 'velita');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg min-h-screen sm:min-h-0 sm:max-h-[92vh] sm:rounded-3xl bg-[#fdf9f3] shadow-2xl flex flex-col overflow-hidden my-auto">
        
        {/* Modal Top Floating Header */}
        <div className="sticky top-0 z-30 w-full bg-[#fdf9f3]/95 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-[#f1ede7]">
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[#f1ede7] text-[#422316] flex items-center justify-center hover:bg-[#ebe8e2] active:scale-95 transition-all cursor-pointer"
            aria-label="Volver al catálogo"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="flex flex-col items-center text-center">
            <span className="font-serif text-base font-bold text-[#422316] leading-tight">
              Detalle de Producto
            </span>
            <span className="text-[11px] text-[#7e5700] font-semibold">
              {brandConfig.brand.name} Artesanal
            </span>
          </div>

          <button
            onClick={handleWhatsAppConsult}
            className="w-10 h-10 rounded-full bg-[#2d4637] text-white flex items-center justify-center hover:bg-[#173022] active:scale-95 transition-all cursor-pointer shadow-sm"
            aria-label="Consultar por WhatsApp"
          >
            <MessageCircle className="w-5 h-5 text-[#cdead5]" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto pb-6 space-y-4">
          
          {/* Main Visual Banner */}
          <div className="relative w-full h-64 sm:h-72 bg-[#e6e2dc] overflow-hidden">
            <img
              src={product.imagen}
              alt={product.nombre}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#fdf9f3] via-transparent to-black/30" />

            {/* Top Badges */}
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffffff]/90 backdrop-blur-md text-[#422316] text-xs font-bold shadow-sm">
                <Star className="w-3.5 h-3.5 text-[#fdbe50] fill-[#fdbe50]" />
                Favorito artesanal
              </span>
            </div>

            {/* Bottom Anticipation Notice */}
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
              {product.requiresLeadTime ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ffdead] text-[#281900] text-xs font-bold shadow-sm">
                  <Clock className="w-3.5 h-3.5 text-[#7e5700]" />
                  {product.leadTimeHours || 48} hs de anticipación
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#cdead5] text-[#072013] text-xs font-bold shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  Horneado en el día
                </span>
              )}
              <span className="px-2.5 py-1 rounded-full bg-[#ffffff]/90 backdrop-blur-md text-[#514440] text-[11px] font-semibold">
                {product.requiresLeadTime ? 'Horneado a pedido' : 'Stock fresco'}
              </span>
            </div>
          </div>

          <div className="px-4 space-y-4 -mt-3 relative z-10">
            {/* Card 1: Main Title & Price */}
            <div className="bg-[#ffffff] rounded-2xl p-5 shadow-[0_4px_16px_-2px_rgba(92,56,42,0.06)] border border-[#f1ede7] space-y-2">
              <h2 className="font-serif text-2xl text-[#422316] font-bold leading-tight">
                {product.nombre}
              </h2>

              <div className="flex items-baseline gap-2.5 pt-1">
                <span className="font-serif text-2xl sm:text-3xl text-[#7e5700] font-bold">
                  {formatCurrency(unitPrice)}
                </span>
                {extraSize > 0 && (
                  <span className="text-xs text-[#83746f]">
                    Precio base: {formatCurrency(product.precio)}
                  </span>
                )}
              </div>

              <p className="text-sm text-[#514440] leading-relaxed pt-1">
                {product.descripción}
              </p>

              <div className="pt-2 flex items-center gap-2 text-[#173022] text-xs font-semibold bg-[#cdead5]/40 px-3.5 py-2.5 rounded-xl border border-[#cdead5]/60">
                <ShieldCheck className="w-4 h-4 text-[#2d4637] shrink-0" />
                <span>Garantía de frescura: se elabora la mañana de tu entrega</span>
              </div>
            </div>

            {/* Card 2: Size Selector (if product has sizes) */}
            {sizeOption && sizeOption.choices && (
              <div className="bg-[#ffffff] rounded-2xl p-5 shadow-[0_4px_16px_-2px_rgba(92,56,42,0.06)] border border-[#f1ede7] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-[#422316]">
                    1. Seleccionar tamaño
                  </span>
                  <span className="text-xs font-bold text-[#7e5700]">Obligatorio</span>
                </div>

                <div className="space-y-2">
                  {sizeOption.choices.map((choice) => {
                    const isSelected = selectedSize?.id === choice.id;
                    return (
                      <label
                        key={choice.id}
                        onClick={() => setSelectedSize(choice)}
                        className={`flex items-center justify-between p-3.5 rounded-xl cursor-pointer transition-all border ${
                          isSelected
                            ? 'bg-[#ffdead]/35 border-[#fabc4d] shadow-sm'
                            : 'bg-[#f7f3ed] border-transparent hover:bg-[#f1ede7]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="product_size"
                            checked={isSelected}
                            onChange={() => setSelectedSize(choice)}
                            className="w-4 h-4 accent-[#422316]"
                          />
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-[#422316]">
                              {choice.name}
                            </span>
                            {choice.description && (
                              <span className="text-xs text-[#514440]">
                                {choice.description}
                              </span>
                            )}
                          </div>
                        </div>

                        <span
                          className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                            choice.extraPrice === 0
                              ? 'bg-[#f1ede7] text-[#514440]'
                              : 'bg-[#fdbe50] text-[#714d00]'
                          }`}
                        >
                          {choice.extraPrice === 0 ? 'Incluido' : `+${formatCurrency(choice.extraPrice)}`}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Card 2B: Variety Selector (for medialunas / sandwiches) */}
            {variedadOption && variedadOption.choices && (
              <div className="bg-[#ffffff] rounded-2xl p-5 shadow-[0_4px_16px_-2px_rgba(92,56,42,0.06)] border border-[#f1ede7] space-y-3">
                <span className="font-semibold text-sm text-[#422316]">
                  {variedadOption.title}
                </span>

                <div className="space-y-2">
                  {variedadOption.choices.map((choice) => {
                    const isSelected = selectedVariedad?.id === choice.id;
                    return (
                      <label
                        key={choice.id}
                        onClick={() => setSelectedVariedad(choice)}
                        className={`flex items-center justify-between p-3.5 rounded-xl cursor-pointer transition-all border ${
                          isSelected
                            ? 'bg-[#ffdead]/35 border-[#fabc4d] shadow-sm'
                            : 'bg-[#f7f3ed] border-transparent hover:bg-[#f1ede7]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="product_variedad"
                            checked={isSelected}
                            onChange={() => setSelectedVariedad(choice)}
                            className="w-4 h-4 accent-[#422316]"
                          />
                          <span className="text-sm font-semibold text-[#422316]">
                            {choice.name}
                          </span>
                        </div>
                        {choice.extraPrice > 0 && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-[#fdbe50] text-[#714d00] font-bold">
                            +{formatCurrency(choice.extraPrice)}
                          </span>
                        )}
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Card 2C: Cut option (for breads) */}
            {corteOption && corteOption.choices && (
              <div className="bg-[#ffffff] rounded-2xl p-5 shadow-[0_4px_16px_-2px_rgba(92,56,42,0.06)] border border-[#f1ede7] space-y-3">
                <span className="font-semibold text-sm text-[#422316]">
                  {corteOption.title}
                </span>

                <div className="space-y-2">
                  {corteOption.choices.map((choice) => {
                    const isSelected = selectedCorte?.id === choice.id;
                    return (
                      <label
                        key={choice.id}
                        onClick={() => setSelectedCorte(choice)}
                        className={`flex items-center justify-between p-3.5 rounded-xl cursor-pointer transition-all border ${
                          isSelected
                            ? 'bg-[#ffdead]/35 border-[#fabc4d] shadow-sm'
                            : 'bg-[#f7f3ed] border-transparent hover:bg-[#f1ede7]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="product_corte"
                            checked={isSelected}
                            onChange={() => setSelectedCorte(choice)}
                            className="w-4 h-4 accent-[#422316]"
                          />
                          <span className="text-sm font-semibold text-[#422316]">
                            {choice.name}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Card 3: Personalization & Dedication (for cakes) */}
            {(dedicationOption || velitaOption) && (
              <div className="bg-[#ffffff] rounded-2xl p-5 shadow-[0_4px_16px_-2px_rgba(92,56,42,0.06)] border border-[#f1ede7] space-y-3">
                <span className="font-semibold text-sm text-[#422316]">
                  2. Personalización y celebración
                </span>

                {dedicationOption && (
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <label htmlFor="dedication-text" className="font-semibold text-[#514440]">
                        {dedicationOption.title}
                      </label>
                      <span className="text-[#83746f]">(Opcional)</span>
                    </div>

                    <div className="relative">
                      <input
                        id="dedication-text"
                        type="text"
                        maxLength={30}
                        value={dedication}
                        onChange={(e) => setDedication(e.target.value)}
                        placeholder="Ej: ¡Feliz Cumple Mamá!"
                        className="w-full h-12 px-3.5 pr-14 rounded-xl bg-[#f7f3ed] text-[#422316] text-sm focus:outline-none focus:ring-2 focus:ring-[#5c382a] border border-[#e6e2dc]"
                      />
                      <span className="absolute right-3 top-3.5 text-[11px] text-[#83746f]">
                        {dedication.length}/30
                      </span>
                    </div>
                  </div>
                )}

                {velitaOption && (
                  <label className="flex items-center justify-between p-3.5 rounded-xl bg-[#f7f3ed] hover:bg-[#f1ede7] cursor-pointer transition-all border border-[#e6e2dc]">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={hasSparkler}
                        onChange={(e) => setHasSparkler(e.target.checked)}
                        className="w-4 h-4 rounded accent-[#422316] cursor-pointer"
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-[#422316]">
                          Pack Velita dorada + Bengalita artesanal
                        </span>
                        <span className="text-xs text-[#514440]">
                          Lista para encender y festejar
                        </span>
                      </div>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-[#ffdead] text-[#281900] font-bold">
                      +$1.200
                    </span>
                  </label>
                )}
              </div>
            )}

            {/* Card 4: Estimated Lead Time */}
            {product.requiresLeadTime && (
              <div className="bg-[#ffffff] rounded-2xl p-5 shadow-[0_4px_16px_-2px_rgba(92,56,42,0.06)] border border-[#f1ede7] space-y-2">
                <span className="font-semibold text-sm text-[#422316]">
                  3. Fecha estimada de retiro o entrega
                </span>
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#f7f3ed] border border-[#e6e2dc]">
                  <div className="w-10 h-10 rounded-full bg-[#cdead5] flex items-center justify-center text-[#072013] shrink-0">
                    <CalendarCheck className="w-5 h-5 text-[#173022]" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] text-[#83746f] uppercase font-bold tracking-wider">
                      Turno más cercano disponible
                    </span>
                    <span className="text-sm font-bold text-[#422316]">
                      Viernes 28 de Octubre — Turno Tarde (16 a 19 hs)
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Card 5: Quantity Stepper */}
            <div className="bg-[#ffffff] rounded-2xl p-4 shadow-[0_4px_16px_-2px_rgba(92,56,42,0.06)] border border-[#f1ede7] flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-semibold text-sm text-[#422316]">Cantidad</span>
                <span className="text-xs text-[#83746f]">Unidades para esta fecha</span>
              </div>

              <div className="flex items-center gap-3 bg-[#f7f3ed] p-1.5 rounded-full border border-[#e6e2dc]">
                <button
                  type="button"
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="w-9 h-9 rounded-full bg-[#ffffff] text-[#422316] flex items-center justify-center font-bold shadow-sm active:scale-90 transition-transform cursor-pointer"
                  aria-label="Disminuir cantidad"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-6 text-center text-sm font-bold text-[#422316]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(prev => Math.min(20, prev + 1))}
                  className="w-9 h-9 rounded-full bg-[#422316] text-white flex items-center justify-center font-bold shadow-sm active:scale-90 transition-transform cursor-pointer"
                  aria-label="Aumentar cantidad"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Bottom Modal Actions */}
            <div className="pt-2 pb-4 space-y-3">
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full py-4 px-6 rounded-2xl bg-[#422316] hover:bg-[#5c382a] text-white font-semibold text-sm sm:text-base flex items-center justify-between shadow-[0_10px_24px_-4px_rgba(92,56,42,0.22)] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#ffdbce]" />
                  <span>Agregar al pedido</span>
                </span>
                <span className="font-bold text-base sm:text-lg">
                  {formatCurrency(totalPrice)}
                </span>
              </button>

              <button
                type="button"
                onClick={handleWhatsAppConsult}
                className="w-full py-3 px-4 rounded-2xl bg-[#cdead5]/50 hover:bg-[#cdead5]/80 text-[#173022] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer border border-[#cdead5]"
              >
                <MessageCircle className="w-4 h-4 text-[#2d4637]" />
                <span>Consultar dudas por WhatsApp antes de pedir</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
