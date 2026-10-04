import React, { useState } from 'react';
import { useCart, DeliveryInfo } from '../context/CartContext';
import { brandConfig, formatCurrency } from '../brand.config';
import {
  ArrowLeft,
  ShoppingBag,
  ChevronDown,
  User,
  Phone,
  CheckCircle2,
  Store,
  Bike,
  Calendar,
  Clock,
  FileText,
  Send,
  Lock,
  MessageCircle,
  AlertCircle
} from 'lucide-react';

const getAvailableDates = (items: ReturnType<typeof useCart>['items']) => {
  const leadTimeHours = items.reduce((maxHours, item) => (
    item.product.requiresLeadTime
      ? Math.max(maxHours, item.product.leadTimeHours || 0)
      : maxHours
  ), 0);
  const firstDate = new Date();
  firstDate.setHours(0, 0, 0, 0);
  firstDate.setDate(firstDate.getDate() + Math.ceil(leadTimeHours / 24));

  return Array.from({ length: 10 }, (_, index) => {
    const date = new Date(firstDate);
    date.setDate(firstDate.getDate() + index);
    return date;
  })
    .filter(date => !brandConfig.contact.closedWeekdays.includes(date.getDay()))
    .map(date => {
      const weekday = new Intl.DateTimeFormat('es-AR', { weekday: 'short' })
        .format(date)
        .replace('.', '');
      const label = `${weekday.charAt(0).toUpperCase()}${weekday.slice(1)} ${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}`;

      return {
        value: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`,
        label,
      };
    });
};

export const CheckoutModal: React.FC = () => {
  const {
    items,
    totalItems,
    subtotal,
    hasLeadTimeItems,
    isCheckoutOpen,
    setIsCheckoutOpen,
    setIsCartOpen,
    formatWhatsAppMessage,
    sendWhatsAppOrder,
  } = useCart();

  // Form State
  const availableDates = getAvailableDates(items);
  const [nombre, setNombre] = useState(brandConfig.demo.prefillCheckout ? 'Valeria Gómez' : '');
  const [telefono, setTelefono] = useState('');
  const [metodo, setMetodo] = useState<'pickup' | 'delivery'>('pickup');
  const [direccion, setDireccion] = useState(brandConfig.demo.prefillCheckout ? 'Thames 1840' : '');
  const [direccionDetalle, setDireccionDetalle] = useState(brandConfig.demo.prefillCheckout ? '4to B' : '');
  const [selectedDate, setSelectedDate] = useState(() => availableDates[0]?.value ?? '');
  const [franjaHoraria, setFranjaHoraria] = useState(brandConfig.delivery.timeSlots[0] ?? '');
  const [notas, setNotas] = useState(brandConfig.demo.prefillCheckout
    ? 'Por favor avisarme cuando esté lista la torta para pasar a buscarla con tiempo. ¡Gracias!'
    : '');

  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  if (!isCheckoutOpen) return null;

  const deliveryCost = metodo === 'delivery' ? brandConfig.delivery.delivery.price : 0;
  const grandTotal = subtotal + deliveryCost;
  const fecha = availableDates.find(date => date.value === selectedDate)?.label
    ?? availableDates[0]?.label
    ?? '';

  const currentInfo: DeliveryInfo = {
    nombre,
    telefono,
    metodo,
    direccion,
    direccionDetalle,
    fecha,
    franjaHoraria,
    notas,
  };

  const previewMessage = formatWhatsAppMessage(currentInfo);

  const handleBackToCart = () => {
    setIsCheckoutOpen(false);
    setIsCartOpen(true);
  };

  const handleConfirmOrder = () => {
    if (!nombre.trim()) {
      setErrorNotice('Por favor completá tu nombre y apellido.');
      return;
    }
    if (telefono.replace(/\D/g, '').length < 8) {
      setErrorNotice('Por favor ingresá un número de WhatsApp válido (al menos 8 dígitos).');
      return;
    }
    if (metodo === 'delivery' && !direccion.trim()) {
      setErrorNotice('Por favor ingresá la dirección para el envío.');
      return;
    }

    setErrorNotice(null);
    sendWhatsAppOrder(currentInfo);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg min-h-screen sm:min-h-0 sm:max-h-[94vh] sm:rounded-3xl bg-[#fdf9f3] shadow-2xl flex flex-col overflow-hidden my-auto">
        
        {/* Top Header */}
        <div className="sticky top-0 z-30 w-full bg-[#fdf9f3]/95 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-[#f1ede7]">
          <button
            onClick={handleBackToCart}
            className="w-10 h-10 rounded-full bg-[#f1ede7] text-[#422316] flex items-center justify-center hover:bg-[#ebe8e2] active:scale-95 transition-all cursor-pointer"
            aria-label="Volver a la canasta"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center text-center">
            <span className="font-serif text-base font-bold text-[#422316] leading-tight">
              Confirmación De Pedido
            </span>
            <span className="text-[11px] text-[#7e5700] font-semibold">
              {brandConfig.brand.name} Artesanal
            </span>
          </div>

          <div className="w-10 h-10 rounded-full bg-[#2d4637] text-white flex items-center justify-center shadow-sm">
            <MessageCircle className="w-5 h-5 text-[#cdead5]" />
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto pb-6 space-y-4">
          
          {/* Progress Tracker Banner */}
          <div className="px-4 py-3.5 bg-[#f7f3ed] border-b border-[#e6e2dc]">
            <div className="flex items-center justify-between mb-1.5 text-xs">
              <span className="font-bold text-[#422316]">Paso 2 de 2</span>
              <span className="text-[#83746f]">Datos &amp; Cierre</span>
            </div>
            <div className="w-full bg-[#e6e2dc] h-2 rounded-full overflow-hidden">
              <div className="bg-[#fdbe50] h-full rounded-full transition-all duration-500 w-full" />
            </div>
            <p className="font-serif text-lg text-[#422316] font-semibold mt-2">
              Entrega &amp; Confirmación
            </p>
          </div>

          <div className="px-4 space-y-4">
            
            {/* Compact Order Summary Card */}
            <div className="bg-[#ffffff] rounded-2xl p-4 shadow-[0_4px_16px_-2px_rgba(92,56,42,0.06)] border border-[#f1ede7]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-[#ffdead] flex items-center justify-center shrink-0 text-[#281900]">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#422316]">
                        {totalItems} delicias
                      </span>
                      <span className="w-1 h-1 rounded-full bg-[#83746f]" />
                      <span className="text-xs font-bold text-[#7e5700]">
                        {formatCurrency(subtotal)}
                      </span>
                    </div>
                    <p className="text-xs text-[#514440] truncate mt-0.5">
                      {items.map(i => i.product.nombre).join(', ')}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsSummaryExpanded(!isSummaryExpanded)}
                  className="px-3 py-1.5 rounded-full bg-[#f1ede7] text-[#422316] text-xs font-semibold flex items-center gap-1 hover:bg-[#ebe8e2] active:scale-95 transition-all cursor-pointer shrink-0"
                >
                  <span>{isSummaryExpanded ? 'Ocultar' : 'Ver detalle'}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isSummaryExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Expandable items drawer */}
              {isSummaryExpanded && (
                <div className="mt-3 pt-3 border-t border-[#f7f3ed] flex flex-col gap-2 text-xs text-[#514440] animate-in fade-in">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between items-center py-1">
                      <div className="flex flex-col pr-2">
                        <span className="font-semibold text-[#422316]">
                          {item.quantity}x {item.product.nombre}
                        </span>
                        {item.optionSummary && (
                          <span className="text-[11px] text-[#83746f]">
                            {item.optionSummary}
                          </span>
                        )}
                      </div>
                      <span className="font-bold text-[#422316] shrink-0">
                        {formatCurrency(item.totalPrice)}
                      </span>
                    </div>
                  ))}

                  {metodo === 'delivery' && (
                    <div className="flex justify-between items-center py-1 text-[#7e5700]">
                      <span className="font-semibold">Envío en el barrio</span>
                      <span className="font-bold">+{formatCurrency(deliveryCost)}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-2 mt-1 border-t border-[#f1ede7]">
                    <span className="font-bold text-sm text-[#422316]">Total Estimado</span>
                    <span className="font-serif text-lg text-[#7e5700] font-bold">
                      {formatCurrency(grandTotal)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Error banner if validation fails */}
            {errorNotice && (
              <div className="p-3 rounded-xl bg-[#ffdad6] text-[#ba1a1a] text-xs font-semibold flex items-center gap-2 border border-[#ba1a1a]/20">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorNotice}</span>
              </div>
            )}

            {/* Section 1: Contact Info */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-[#422316]">
                <User className="w-4 h-4 text-[#422316]" />
                <h3 className="font-serif text-base font-bold">1. Datos de Contacto</h3>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="client-name" className="text-xs font-semibold text-[#514440]">
                  Nombre y Apellido
                </label>
                <input
                  id="client-name"
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej: Valeria Gómez"
                  className="h-11 px-3.5 rounded-xl bg-[#ffffff] text-[#1c1c18] text-sm shadow-xs border border-[#e6e2dc] focus:outline-none focus:ring-2 focus:ring-[#5c382a]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="client-phone" className="text-xs font-semibold text-[#514440]">
                  WhatsApp / Móvil
                </label>
                <input
                  id="client-phone"
                  type="tel"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder="+54 9 11 ..."
                  className="h-11 px-3.5 rounded-xl bg-[#ffffff] text-[#1c1c18] text-sm shadow-xs border border-[#e6e2dc] focus:outline-none focus:ring-2 focus:ring-[#5c382a]"
                />
                <div className="flex items-center gap-1 text-[11px] text-[#2d4637] mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2d4637]" />
                  <span>Te responderemos a este número para coordinar el pedido.</span>
                </div>
              </div>
            </div>

            {/* Section 2: Delivery Method */}
            <div className="flex flex-col gap-2 pt-1">
              <div className="flex items-center gap-1.5 text-[#422316]">
                <Bike className="w-4 h-4 text-[#422316]" />
                <h3 className="font-serif text-base font-bold">2. Método de Entrega</h3>
              </div>

              {/* Option A: Pickup */}
              <label
                onClick={() => setMetodo('pickup')}
                className={`relative flex items-start gap-3 p-3.5 rounded-2xl cursor-pointer transition-all border ${
                  metodo === 'pickup'
                    ? 'bg-[#ffffff] border-[#fabc4d] shadow-sm ring-1 ring-[#fabc4d]'
                    : 'bg-[#ffffff] border-[#e6e2dc] hover:bg-[#f7f3ed]'
                }`}
              >
                <input
                  type="radio"
                  name="delivery_choice"
                  checked={metodo === 'pickup'}
                  onChange={() => setMetodo('pickup')}
                  className="mt-1 accent-[#422316] w-4 h-4"
                />
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#422316]">
                      {brandConfig.delivery.pickup.title}
                    </span>
                    <span className="bg-[#f1ede7] px-2 py-0.5 rounded-full text-[11px] font-bold text-[#422316]">
                      {brandConfig.delivery.pickup.label}
                    </span>
                  </div>
                  <p className="text-xs text-[#514440] mt-0.5">
                    {brandConfig.delivery.pickup.description}
                  </p>
                </div>
              </label>

              {/* Option B: Delivery */}
              <label
                onClick={() => setMetodo('delivery')}
                className={`relative flex flex-col gap-2 p-3.5 rounded-2xl cursor-pointer transition-all border ${
                  metodo === 'delivery'
                    ? 'bg-[#ffffff] border-[#fabc4d] shadow-sm ring-1 ring-[#fabc4d]'
                    : 'bg-[#ffffff] border-[#e6e2dc] hover:bg-[#f7f3ed]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="delivery_choice"
                    checked={metodo === 'delivery'}
                    onChange={() => setMetodo('delivery')}
                    className="mt-1 accent-[#422316] w-4 h-4"
                  />
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#422316]">
                        {brandConfig.delivery.delivery.title}
                      </span>
                      <span className="bg-[#ffdead] px-2 py-0.5 rounded-full text-[11px] font-bold text-[#281900]">
                        {brandConfig.delivery.delivery.label}
                      </span>
                    </div>
                    <p className="text-xs text-[#514440] mt-0.5">
                      {brandConfig.delivery.delivery.description}
                    </p>
                  </div>
                </div>

                {/* Sub-inputs if delivery is active */}
                {metodo === 'delivery' && (
                  <div className="mt-2 pt-2 border-t border-[#f1ede7] flex flex-col gap-2 animate-in fade-in">
                    <input
                      type="text"
                      value={direccion}
                      onChange={(e) => setDireccion(e.target.value)}
                      placeholder="Calle y altura (ej: Thames 1840)"
                      className="h-10 px-3 rounded-xl bg-[#f7f3ed] text-[#422316] text-xs border border-[#e6e2dc] focus:outline-none focus:ring-1 focus:ring-[#5c382a]"
                    />
                    <input
                      type="text"
                      value={direccionDetalle}
                      onChange={(e) => setDireccionDetalle(e.target.value)}
                      placeholder="Piso / Depto / Timbre (ej: 4to B)"
                      className="h-10 px-3 rounded-xl bg-[#f7f3ed] text-[#422316] text-xs border border-[#e6e2dc] focus:outline-none focus:ring-1 focus:ring-[#5c382a]"
                    />
                  </div>
                )}
              </label>
            </div>

            {/* Section 3: Date & Slot */}
            <div className="flex flex-col gap-2 pt-1">
              <div className="flex items-center gap-1.5 text-[#422316]">
                <Calendar className="w-4 h-4 text-[#422316]" />
                <h3 className="font-serif text-base font-bold">3. Fecha y Franja Horaria</h3>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="pickup-date-select" className="text-xs font-semibold text-[#514440]">
                  Día programado
                </label>
                <div className="relative">
                  <select
                    id="pickup-date-select"
                    value={fecha}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full h-11 px-3.5 pr-10 rounded-xl bg-[#ffffff] text-[#1c1c18] text-xs sm:text-sm border border-[#e6e2dc] shadow-xs outline-none appearance-none focus:ring-2 focus:ring-[#5c382a]"
                  >
                    {availableDates.map(date => (
                      <option key={date.value} value={date.value}>{date.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#83746f] absolute right-3 top-3.5 pointer-events-none" />
                </div>
                {hasLeadTimeItems && (
                  <span className="text-[11px] text-[#2d4637] flex items-center gap-1 mt-0.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#2d4637]" />
                    Este pedido requiere {Math.max(...items
                      .filter(item => item.product.requiresLeadTime)
                      .map(item => item.product.leadTimeHours || 0))} hs de anticipación.
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="pickup-slot-select" className="text-xs font-semibold text-[#514440]">
                  Franja horaria estimada
                </label>
                <div className="relative">
                  <select
                    id="pickup-slot-select"
                    value={franjaHoraria}
                    onChange={(e) => setFranjaHoraria(e.target.value)}
                    className="w-full h-11 px-3.5 pr-10 rounded-xl bg-[#ffffff] text-[#1c1c18] text-xs sm:text-sm border border-[#e6e2dc] shadow-xs outline-none appearance-none focus:ring-2 focus:ring-[#5c382a]"
                  >
                    {brandConfig.delivery.timeSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#83746f] absolute right-3 top-3.5 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Section 4: Special Instructions */}
            <div className="flex flex-col gap-1 pt-1">
              <div className="flex items-center gap-1.5 text-[#422316]">
                <FileText className="w-4 h-4 text-[#422316]" />
                <label htmlFor="notes-textarea" className="font-serif text-base font-bold">
                  4. Aclaraciones especiales
                </label>
              </div>
              <textarea
                id="notes-textarea"
                rows={2}
                value={notas}
                onChange={(e) => setNotas(e.target.value)}
                placeholder="Escribí notas sobre la dedicatoria o indicaciones..."
                className="w-full p-3 rounded-xl bg-[#ffffff] text-[#1c1c18] text-xs sm:text-sm border border-[#e6e2dc] shadow-xs outline-none resize-none focus:ring-2 focus:ring-[#5c382a]"
              />
            </div>

            {/* Section 5: Real-time Live WhatsApp Preview Bubble */}
            <div className="flex flex-col gap-1.5 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#422316] flex items-center gap-1">
                  <MessageCircle className="w-4 h-4 text-[#2d4637]" />
                  Vista previa del mensaje
                </span>
                <span className="text-[11px] text-[#83746f]">Se enviará en directo</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#cdead5] text-[#072013] shadow-md relative overflow-hidden font-sans text-xs leading-relaxed border border-[#b1cdb9]">
                <div className="whitespace-pre-line relative z-10 font-mono text-[11px] sm:text-xs">
                  {previewMessage}
                </div>
              </div>
            </div>

            {/* Submit Action Area */}
            <div className="pt-2 pb-4 space-y-2.5">
              <button
                type="button"
                onClick={handleConfirmOrder}
                className="w-full h-14 bg-[#2d4637] hover:bg-[#173022] text-[#ffffff] rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-[0_10px_24px_-4px_rgba(45,70,55,0.3)] active:scale-95 transition-all cursor-pointer"
              >
                <Send className="w-5 h-5 text-[#cdead5]" />
                <span>Confirmar y enviar por WhatsApp</span>
              </button>

              <div className="flex items-center justify-center gap-1.5 text-center px-4">
                <Lock className="w-3.5 h-3.5 text-[#83746f] shrink-0" />
                <p className="text-[11px] text-[#514440]">
                  Al tocar el botón se abrirá WhatsApp con el mensaje listo. Sin tarjetas ni registros.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
