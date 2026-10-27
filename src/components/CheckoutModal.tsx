import React, { useState } from 'react';
import { Txt } from './Txt';
import { useCart, DeliveryInfo } from '../context/CartContext';
import { getAvailableDates } from '../lib/availableDates';
import { brandConfig, formatCurrency, formatText } from '../brand.config';
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

const getLeadTimeHours = (items: ReturnType<typeof useCart>['items']) => items.reduce((maxHours, item) => (
  item.product.requiresLeadTime
    ? Math.max(maxHours, item.product.leadTimeHours || 0)
    : maxHours
), 0);

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
  const availableDates = getAvailableDates(getLeadTimeHours(items));
  const [nombre, setNombre] = useState(
    brandConfig.demo.prefillCheckout ? brandConfig.demo.checkoutDefaults.name : '',
  );
  const [telefono, setTelefono] = useState('');
  const [metodo, setMetodo] = useState<'pickup' | 'delivery'>('pickup');
  const [direccion, setDireccion] = useState(
    brandConfig.demo.prefillCheckout ? brandConfig.demo.checkoutDefaults.address : '',
  );
  const [direccionDetalle, setDireccionDetalle] = useState(
    brandConfig.demo.prefillCheckout ? brandConfig.demo.checkoutDefaults.addressDetail : '',
  );
  const [selectedDate, setSelectedDate] = useState(() => availableDates[0]?.value ?? '');
  const [franjaHoraria, setFranjaHoraria] = useState(brandConfig.delivery.timeSlots[0] ?? '');
  const [notas, setNotas] = useState(brandConfig.demo.prefillCheckout
    ? brandConfig.demo.checkoutDefaults.notes
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
      setErrorNotice(brandConfig.ui.checkout.errors.name);
      return;
    }
    if (telefono.replace(/\D/g, '').length < 8) {
      setErrorNotice(brandConfig.ui.checkout.errors.phone);
      return;
    }
    if (metodo === 'delivery' && !direccion.trim()) {
      setErrorNotice(brandConfig.ui.checkout.errors.address);
      return;
    }

    setErrorNotice(null);
    sendWhatsAppOrder(currentInfo);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg min-h-screen sm:min-h-0 sm:max-h-[94vh] sm:rounded-3xl bg-brand-surface shadow-2xl flex flex-col overflow-hidden my-auto">
        
        {/* Top Header */}
        <div className="sticky top-0 z-30 w-full bg-brand-surface/95 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-brand-surface-container">
          <button
            onClick={handleBackToCart}
            className="w-10 h-10 rounded-full bg-brand-surface-container text-brand-primary flex items-center justify-center hover:bg-brand-surface-container-high active:scale-95 transition-all cursor-pointer"
            aria-label={brandConfig.ui.checkout.backLabel}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center text-center">
            <Txt as="span" className="font-serif text-base font-bold text-brand-primary leading-tight" value={brandConfig.ui.checkout.title} />
            <Txt as="span" className="text-[11px] text-brand-secondary font-semibold" value={formatText(brandConfig.ui.checkout.titleBadge, { name: brandConfig.brand.name })} />
          </div>

          <div className="w-10 h-10 rounded-full bg-brand-tertiary-container text-white flex items-center justify-center shadow-sm">
            <MessageCircle className="w-5 h-5 text-brand-tertiary-fixed" />
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto pb-6 space-y-4">
          
          {/* Progress Tracker Banner */}
          <div className="px-4 py-3.5 bg-brand-surface-container-low border-b border-brand-surface-container-highest">
            <div className="flex items-center justify-between mb-1.5 text-xs">
              <Txt as="span" className="font-bold text-brand-primary" value={brandConfig.ui.checkout.step} />
              <Txt as="span" className="text-brand-outline" value={brandConfig.ui.checkout.stepTitle} />
            </div>
            <div className="w-full bg-brand-surface-container-highest h-2 rounded-full overflow-hidden">
              <div className="bg-brand-secondary-container h-full rounded-full transition-all duration-500 w-full" />
            </div>
            <Txt as="p" className="font-serif text-lg text-brand-primary font-semibold mt-2" value={brandConfig.ui.checkout.stepSubtitle} />
          </div>

          <div className="px-4 space-y-4">
            
            {/* Compact Order Summary Card */}
            <div className="bg-white rounded-2xl p-4 shadow-[0_4px_16px_-2px_rgba(92,56,42,0.06)] border border-brand-surface-container">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-brand-secondary-fixed flex items-center justify-center shrink-0 text-brand-on-secondary-fixed">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <Txt as="span" className="text-xs font-bold text-brand-primary" value={formatText(brandConfig.ui.checkout.itemsCount, { count: String(totalItems) })} />
                      <span className="w-1 h-1 rounded-full bg-brand-outline" />
                      <span className="text-xs font-bold text-brand-secondary">
                        {formatCurrency(subtotal)}
                      </span>
                    </div>
                    <p className="text-xs text-brand-on-surface-variant truncate mt-0.5">
                      {items.map(i => i.product.nombre).join(', ')}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsSummaryExpanded(!isSummaryExpanded)}
                  className="px-3 py-1.5 rounded-full bg-brand-surface-container text-brand-primary text-xs font-semibold flex items-center gap-1 hover:bg-brand-surface-container-high active:scale-95 transition-all cursor-pointer shrink-0"
                >
                  <span>{isSummaryExpanded ? brandConfig.ui.checkout.summaryHide : brandConfig.ui.checkout.summaryShow}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isSummaryExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Expandable items drawer */}
              {isSummaryExpanded && (
                <div className="mt-3 pt-3 border-t border-brand-surface-container-low flex flex-col gap-2 text-xs text-brand-on-surface-variant animate-in fade-in">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between items-center py-1">
                      <div className="flex flex-col pr-2">
                        <span className="font-semibold text-brand-primary">
                          {item.quantity}x {item.product.nombre}
                        </span>
                        {item.optionSummary && (
                          <span className="text-[11px] text-brand-outline">
                            {item.optionSummary}
                          </span>
                        )}
                      </div>
                      <span className="font-bold text-brand-primary shrink-0">
                        {formatCurrency(item.totalPrice)}
                      </span>
                    </div>
                  ))}

                  {metodo === 'delivery' && (
                    <div className="flex justify-between items-center py-1 text-brand-secondary">
                      <Txt as="span" className="font-semibold" value={brandConfig.ui.checkout.deliveryLine} />
                      <span className="font-bold">+{formatCurrency(deliveryCost)}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-2 mt-1 border-t border-brand-surface-container">
                    <Txt as="span" className="font-bold text-sm text-brand-primary" value={brandConfig.ui.checkout.total} />
                    <span className="font-serif text-lg text-brand-secondary font-bold">
                      {formatCurrency(grandTotal)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Error banner if validation fails */}
            {errorNotice && (
              <div className="p-3 rounded-xl bg-brand-error-container text-brand-error text-xs font-semibold flex items-center gap-2 border border-brand-error/20">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorNotice}</span>
              </div>
            )}

            {/* Section 1: Contact Info */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-brand-primary">
                <User className="w-4 h-4 text-brand-primary" />
                <Txt as="h3" className="font-serif text-base font-bold" value={brandConfig.ui.checkout.sectionContact} />
              </div>

              <div className="flex flex-col gap-1">
                <Txt as="label" htmlFor="client-name" className="text-xs font-semibold text-brand-on-surface-variant" value={brandConfig.ui.checkout.nameLabel} />
                <input
                  id="client-name"
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder={brandConfig.contact.customerNamePlaceholder}
                  className="h-11 px-3.5 rounded-xl bg-white text-brand-on-surface text-sm shadow-xs border border-brand-surface-container-highest focus:outline-none focus:ring-2 focus:ring-brand-primary-container"
                />
              </div>

              <div className="flex flex-col gap-1">
                <Txt as="label" htmlFor="client-phone" className="text-xs font-semibold text-brand-on-surface-variant" value={brandConfig.ui.checkout.phoneLabel} />
                <input
                  id="client-phone"
                  type="tel"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder={brandConfig.contact.phonePlaceholder}
                  className="h-11 px-3.5 rounded-xl bg-white text-brand-on-surface text-sm shadow-xs border border-brand-surface-container-highest focus:outline-none focus:ring-2 focus:ring-brand-primary-container"
                />
                <div className="flex items-center gap-1 text-[11px] text-brand-tertiary-container mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-tertiary-container" />
                  <Txt as="span" value={brandConfig.ui.checkout.phoneHelp} />
                </div>
              </div>
            </div>

            {/* Section 2: Delivery Method */}
            <div className="flex flex-col gap-2 pt-1">
              <div className="flex items-center gap-1.5 text-brand-primary">
                <Bike className="w-4 h-4 text-brand-primary" />
                <Txt as="h3" className="font-serif text-base font-bold" value={brandConfig.ui.checkout.sectionDelivery} />
              </div>

              {/* Option A: Pickup */}
              <label
                onClick={() => setMetodo('pickup')}
                className={`relative flex items-start gap-3 p-3.5 rounded-2xl cursor-pointer transition-all border ${
                  metodo === 'pickup'
                    ? 'bg-white border-brand-secondary-container shadow-sm ring-1 ring-brand-secondary-container'
                    : 'bg-white border-brand-surface-container-highest hover:bg-brand-surface-container-low'
                }`}
              >
                <input
                  type="radio"
                  name="delivery_choice"
                  checked={metodo === 'pickup'}
                  onChange={() => setMetodo('pickup')}
                  className="mt-1 accent-brand-primary w-4 h-4"
                />
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-brand-primary">
                      {brandConfig.delivery.pickup.title}
                    </span>
                    <span className="bg-brand-surface-container px-2 py-0.5 rounded-full text-[11px] font-bold text-brand-primary">
                      {brandConfig.delivery.pickup.label}
                    </span>
                  </div>
                  <p className="text-xs text-brand-on-surface-variant mt-0.5">
                    {brandConfig.delivery.pickup.description}
                  </p>
                </div>
              </label>

              {/* Option B: Delivery */}
              <label
                onClick={() => setMetodo('delivery')}
                className={`relative flex flex-col gap-2 p-3.5 rounded-2xl cursor-pointer transition-all border ${
                  metodo === 'delivery'
                    ? 'bg-white border-brand-secondary-container shadow-sm ring-1 ring-brand-secondary-container'
                    : 'bg-white border-brand-surface-container-highest hover:bg-brand-surface-container-low'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="delivery_choice"
                    checked={metodo === 'delivery'}
                    onChange={() => setMetodo('delivery')}
                    className="mt-1 accent-brand-primary w-4 h-4"
                  />
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-brand-primary">
                        {brandConfig.delivery.delivery.title}
                      </span>
                      <span className="bg-brand-secondary-fixed px-2 py-0.5 rounded-full text-[11px] font-bold text-brand-on-secondary-fixed">
                        {brandConfig.delivery.delivery.label}
                      </span>
                    </div>
                    <p className="text-xs text-brand-on-surface-variant mt-0.5">
                      {brandConfig.delivery.delivery.description}
                    </p>
                  </div>
                </div>

                {/* Sub-inputs if delivery is active */}
                {metodo === 'delivery' && (
                  <div className="mt-2 pt-2 border-t border-brand-surface-container flex flex-col gap-2 animate-in fade-in">
                    <input
                      type="text"
                      value={direccion}
                      onChange={(e) => setDireccion(e.target.value)}
                      placeholder={brandConfig.contact.addressPlaceholder}
                      className="h-10 px-3 rounded-xl bg-brand-surface-container-low text-brand-primary text-xs border border-brand-surface-container-highest focus:outline-none focus:ring-1 focus:ring-brand-primary-container"
                    />
                    <input
                      type="text"
                      value={direccionDetalle}
                      onChange={(e) => setDireccionDetalle(e.target.value)}
                      placeholder={brandConfig.contact.addressDetailPlaceholder}
                      className="h-10 px-3 rounded-xl bg-brand-surface-container-low text-brand-primary text-xs border border-brand-surface-container-highest focus:outline-none focus:ring-1 focus:ring-brand-primary-container"
                    />
                  </div>
                )}
              </label>
            </div>

            {/* Section 3: Date & Slot */}
            <div className="flex flex-col gap-2 pt-1">
              <div className="flex items-center gap-1.5 text-brand-primary">
                <Calendar className="w-4 h-4 text-brand-primary" />
                <Txt as="h3" className="font-serif text-base font-bold" value={brandConfig.ui.checkout.sectionDate} />
              </div>

              <div className="flex flex-col gap-1">
                <Txt as="label" htmlFor="pickup-date-select" className="text-xs font-semibold text-brand-on-surface-variant" value={brandConfig.ui.checkout.dateLabel} />
                <div className="relative">
                  <select
                    id="pickup-date-select"
                    value={fecha}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full h-11 px-3.5 pr-10 rounded-xl bg-white text-brand-on-surface text-xs sm:text-sm border border-brand-surface-container-highest shadow-xs outline-none appearance-none focus:ring-2 focus:ring-brand-primary-container"
                  >
                    {availableDates.map(date => (
                      <option key={date.value} value={date.value}>{date.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-brand-outline absolute right-3 top-3.5 pointer-events-none" />
                </div>
                {hasLeadTimeItems && (
                  <span className="text-[11px] text-brand-tertiary-container flex items-center gap-1 mt-0.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-brand-tertiary-container" />
                    {formatText(brandConfig.ui.checkout.leadTime, {
                      hours: String(Math.max(...items
                        .filter(item => item.product.requiresLeadTime)
                        .map(item => item.product.leadTimeHours || 0))),
                    })}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <Txt as="label" htmlFor="pickup-slot-select" className="text-xs font-semibold text-brand-on-surface-variant" value={brandConfig.ui.checkout.timeSlotLabel} />
                <div className="relative">
                  <select
                    id="pickup-slot-select"
                    value={franjaHoraria}
                    onChange={(e) => setFranjaHoraria(e.target.value)}
                    className="w-full h-11 px-3.5 pr-10 rounded-xl bg-white text-brand-on-surface text-xs sm:text-sm border border-brand-surface-container-highest shadow-xs outline-none appearance-none focus:ring-2 focus:ring-brand-primary-container"
                  >
                    {brandConfig.delivery.timeSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-brand-outline absolute right-3 top-3.5 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Section 4: Special Instructions */}
            <div className="flex flex-col gap-1 pt-1">
              <div className="flex items-center gap-1.5 text-brand-primary">
                <FileText className="w-4 h-4 text-brand-primary" />
                <Txt as="label" htmlFor="notes-textarea" className="font-serif text-base font-bold" value={brandConfig.ui.checkout.sectionNotes} />
              </div>
              <textarea
                id="notes-textarea"
                rows={2}
                value={notas}
                onChange={(e) => setNotas(e.target.value)}
                placeholder={brandConfig.ui.checkout.notesPlaceholder}
                className="w-full p-3 rounded-xl bg-white text-brand-on-surface text-xs sm:text-sm border border-brand-surface-container-highest shadow-xs outline-none resize-none focus:ring-2 focus:ring-brand-primary-container"
              />
            </div>

            {/* Section 5: Real-time Live WhatsApp Preview Bubble */}
            <div className="flex flex-col gap-1.5 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-brand-primary flex items-center gap-1">
                  <MessageCircle className="w-4 h-4 text-brand-tertiary-container" />{brandConfig.ui.checkout.previewTitle}</span>
                <Txt as="span" className="text-[11px] text-brand-outline" value={brandConfig.ui.checkout.previewBadge} />
              </div>

              <div className="p-4 rounded-2xl bg-brand-tertiary-fixed text-brand-on-tertiary-fixed shadow-md relative overflow-hidden font-sans text-xs leading-relaxed border border-brand-tertiary-muted">
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
                className="w-full h-14 bg-brand-tertiary-container hover:bg-brand-tertiary text-white rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-[0_10px_24px_-4px_rgba(45,70,55,0.3)] active:scale-95 transition-all cursor-pointer"
              >
                <Send className="w-5 h-5 text-brand-tertiary-fixed" />
                <Txt as="span" value={brandConfig.ui.checkout.confirm} />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-center px-4">
                <Lock className="w-3.5 h-3.5 text-brand-outline shrink-0" />
                <Txt as="p" className="text-[11px] text-brand-on-surface-variant" value={brandConfig.ui.checkout.confirmNote} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
