import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../catalog';
import { brandConfig, formatCurrency, formatText } from '../brand.config';

const cartStorageKey = brandConfig.storage.cartKey;

export interface SelectedOptionState {
  tamano?: {
    id: string;
    name: string;
    description?: string;
    extraPrice: number;
  };
  dedicatoria?: string;
  velita?: boolean;
  variedad?: {
    id: string;
    name: string;
    extraPrice: number;
  };
  corte?: {
    id: string;
    name: string;
    extraPrice: number;
  };
  [key: string]: any;
}

export interface CartItem {
  id: string; // único para diferenciar mismo producto con distintas opciones
  productId: string;
  product: Product;
  quantity: number;
  selectedOptions: SelectedOptionState;
  optionSummary: string;
  unitPrice: number;
  totalPrice: number;
}

export interface DeliveryInfo {
  nombre: string;
  telefono: string;
  metodo: 'pickup' | 'delivery';
  direccion?: string;
  direccionDetalle?: string;
  fecha: string;
  franjaHoraria: string;
  notas?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, options?: SelectedOptionState) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  hasLeadTimeItems: boolean;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  selectedProductForDetail: Product | null;
  setSelectedProductForDetail: (product: Product | null) => void;
  formatWhatsAppMessage: (info: DeliveryInfo) => string;
  sendWhatsAppOrder: (info: DeliveryInfo) => void;
  toast: string | null;
  showToast: (msg: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(cartStorageKey);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) return parsed;
        }
      } catch (e) {
        // Fallback silencioso
      }
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(cartStorageKey, JSON.stringify(items));
    } catch (e) {
      // ignore
    }
  }, [items]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(prev => (prev === msg ? null : prev));
    }, 3000);
  };

  const addToCart = (product: Product, quantity = 1, options: SelectedOptionState = {}) => {
    // Calcular precio unitario
    let extra = 0;
    const summaries: string[] = [];

    if (options.tamano) {
      extra += options.tamano.extraPrice;
      summaries.push(options.tamano.name.split('(')[0].trim());
    }
    if (options.variedad) {
      extra += options.variedad.extraPrice;
      summaries.push(options.variedad.name);
    }
    if (options.corte) {
      extra += options.corte.extraPrice;
      summaries.push(options.corte.name);
    }
    if (options.velita) {
      extra += brandConfig.extras.candlePackPrice;
      summaries.push(brandConfig.ui.cart.candleSummary);
    }
    if (options.dedicatoria && options.dedicatoria.trim()) {
      summaries.push(`"${options.dedicatoria.trim()}"`);
    }

    const unitPrice = product.precio + extra;
    const optionSummary = summaries.length > 0 ? summaries.join(' • ') : '';

    // Generar un id representativo según las opciones seleccionadas
    const optionKey = JSON.stringify(options);
    const cartItemId = `${product.id}-${encodeURIComponent(optionKey)}`;

    setItems(prevItems => {
      const existingIndex = prevItems.findIndex(item => item.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          totalPrice: newQty * updated[existingIndex].unitPrice,
        };
        return updated;
      }

      return [
        ...prevItems,
        {
          id: cartItemId,
          productId: product.id,
          product,
          quantity,
          selectedOptions: options,
          optionSummary,
          unitPrice,
          totalPrice: unitPrice * quantity,
        },
      ];
    });

    showToast(formatText(brandConfig.ui.toast.added, { product: product.nombre }));
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setItems(prevItems => {
      return prevItems
        .map(item => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            return {
              ...item,
              quantity: newQty,
              totalPrice: newQty * item.unitPrice,
            };
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setItems(prev => prev.filter(item => item.id !== cartItemId));
    showToast(brandConfig.ui.toast.removed);
  };

  const clearCart = () => {
    setItems([]);
    showToast(brandConfig.ui.toast.cleared);
  };

  const totalItems = items.reduce((acc, curr) => acc + curr.quantity, 0);
  const subtotal = items.reduce((acc, curr) => acc + curr.totalPrice, 0);

  const hasLeadTimeItems = items.some(item => item.product.requiresLeadTime);

  const formatWhatsAppMessage = (info: DeliveryInfo): string => {
    const isDelivery = info.metodo === 'delivery';
    const deliveryCost = isDelivery ? brandConfig.delivery.delivery.price : 0;
    const finalTotal = subtotal + deliveryCost;

    const w = brandConfig.ui.whatsapp;
    let modalityText = '';
    if (isDelivery) {
      const address = info.direccion?.trim() || w.addressPending;
      const details = info.direccionDetalle?.trim() ? ` [${info.direccionDetalle.trim()}]` : '';
      modalityText = formatText(w.deliveryMode, { address, details, date: info.fecha, slot: info.franjaHoraria });
    } else {
      modalityText = formatText(w.pickupMode, { date: info.fecha, slot: info.franjaHoraria });
    }

    const itemsLines = items
      .map(item => formatText(w.itemLine, {
        quantity: String(item.quantity),
        name: item.product.nombre,
        options: item.optionSummary ? ` (${item.optionSummary})` : '',
        price: formatCurrency(item.totalPrice),
      }))
      .join('\n');

    const deliveryLine = isDelivery
      ? `\n${formatText(w.deliveryLine, { price: formatCurrency(deliveryCost) })}`
      : '';

    const noteLine = info.notas && info.notas.trim()
      ? `\n${formatText(w.noteLine, { note: info.notas.trim() })}`
      : '';

    const separator = '-------------------------';
    return [
      formatText(w.orderTitle, { name: brandConfig.brand.name }),
      formatText(w.customerLine, { customer: info.nombre.trim() || w.customerFallback }),
      formatText(w.phoneLine, { phone: info.telefono.trim() || w.notSpecified }),
      formatText(w.modeLine, { mode: modalityText }),
      separator,
      `${itemsLines}${deliveryLine}`,
      separator,
      `${formatText(w.totalLine, { total: formatCurrency(finalTotal) })}${noteLine}`,
    ].join('\n');
  };

  const sendWhatsAppOrder = (info: DeliveryInfo) => {
    const message = formatWhatsAppMessage(info);
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${brandConfig.contact.whatsappNumber}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        hasLeadTimeItems,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        selectedProductForDetail,
        setSelectedProductForDetail,
        formatWhatsAppMessage,
        sendWhatsAppOrder,
        toast,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
