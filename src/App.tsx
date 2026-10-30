import React, { useState } from 'react';
import { Txt } from './components/Txt';
import { brandConfig } from './brand.config';
import { CartProvider, useCart } from './context/CartContext';
import { products, ProductCategory, specialCategoryId } from './catalog';
import { Header } from './components/Header';
// El banner DEMO se puede desactivar desde brand.config.ts.
import { PrototypeBanner } from './components/PrototypeBanner';
import { Hero } from './components/Hero';
import { CategoryFilters } from './components/CategoryFilters';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { FloatingCartBar } from './components/FloatingCartBar';
import { HowToOrder } from './components/HowToOrder';
import { Footer } from './components/Footer';
import { BottomNav } from './components/BottomNav';
import { CheckCircle2, ShoppingBag } from 'lucide-react';

function MainShop() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | ProductCategory>('all');
  const { selectedProductForDetail, setSelectedProductForDetail, toast, setIsCartOpen } = useCart();
  const filteredProducts = selectedCategory === 'all' ? products : products.filter(p => p.categoría === selectedCategory);
  const handleNavigateTortas = () => {
    setSelectedCategory(specialCategoryId);
    const el = document.getElementById('catalogo');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-brand-surface text-brand-on-surface flex flex-col font-sans selection:bg-brand-secondary-fixed selection:text-brand-primary">
      {brandConfig.demo.showPrototypeBanner && <PrototypeBanner />}
      <Header onNavigateTortas={handleNavigateTortas} />
      <main className="flex-1 w-full pt-32 pb-20 sm:pt-36">
        <Hero />
        <CategoryFilters selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} productsList={products} />
        <section className="max-w-4xl mx-auto px-4 py-2">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-brand-surface-container p-8">
              <Txt as="p" className="font-serif text-lg text-brand-primary" value={brandConfig.ui.catalog.emptyCategory} />
              <Txt as="button" onClick={() => setSelectedCategory('all')} className="mt-3 px-4 py-2 rounded-full bg-brand-primary text-white text-xs font-semibold" value={brandConfig.ui.catalog.viewAll} />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {filteredProducts.map(product => <ProductCard key={product.id} product={product} onOpenDetail={setSelectedProductForDetail} />)}
            </div>
          )}
        </section>
        <HowToOrder />
        <Footer />
      </main>
      <FloatingCartBar />
      <CartDrawer />
      <ProductDetailModal product={selectedProductForDetail} onClose={() => setSelectedProductForDetail(null)} />
      <CheckoutModal />
      <BottomNav selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
      {toast && (
        <div className="fixed bottom-24 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:w-auto z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="bg-brand-tertiary text-white px-4 py-3 rounded-2xl shadow-xl flex items-center justify-between gap-4 border border-brand-tertiary-container">
            <div className="flex items-center gap-2.5 min-w-0"><CheckCircle2 className="w-5 h-5 text-brand-tertiary-fixed shrink-0" /><span className="text-xs sm:text-sm font-medium truncate">{toast}</span></div>
            <button onClick={() => setIsCartOpen(true)} className="text-xs text-brand-tertiary-fixed font-bold hover:underline shrink-0 cursor-pointer flex items-center gap-1"><ShoppingBag className="w-3.5 h-3.5" /><Txt as="span" value={brandConfig.ui.toast.viewBasket} /></button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return <CartProvider><MainShop /></CartProvider>;
}
