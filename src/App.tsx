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
  const {
    selectedProductForDetail,
    setSelectedProductForDetail,
    toast,
    setIsCartOpen,
  } = useCart();

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.categoría === selectedCategory);

  const handleNavigateTortas = () => {
    setSelectedCategory(specialCategoryId);
    const el = document.getElementById('catalogo');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-brand-surface text-brand-on-surface flex flex-col font-sans selection:bg-brand-secondary-fixed selection:text-brand-primary">
      {brandConfig.demo.showPrototypeBanner && <PrototypeBanner />}
      {/* Fixed Sticky Header */}
      <Header
        onNavigateTortas={handleNavigateTortas}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-32 pb-20 sm:pt-36">
        
        {/* Hero Banner */}
        <Hero />

        {/* Dynamic Category Filters */}
        <CategoryFilters
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          productsList={products}
        />

        {/* Product Cards Grid */}
        <section className="max-w-6xl mx-auto px-4 py-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-brand-surface-container-low rounded-3xl border border-dashed border-brand-outline-variant max-w-lg mx-auto">
              <ShoppingBag className="w-12 h-12 text-brand-outline mx-auto mb-3 opacity-60" />
              <Txt as="p" className="text-brand-on-surface-variant font-medium text-base mb-4" value={brandConfig.ui.catalog.emptyCategory} />
              <Txt as="button"
                onClick={() => setSelectedCategory('all')}
                className="px-5 py-2.5 rounded-full bg-brand-primary text-white text-sm font-semibold hover:bg-brand-primary-hover transition-colors shadow-sm cursor-pointer" value={brandConfig.ui.catalog.viewAll} />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpenDetail={setSelectedProductForDetail}
                />
              ))}
            </div>
          )}
        </section>

        {/* How To Order Steps */}
        <HowToOrder />

      </main>

      {/* Persistent Footer */}
      <Footer />

      {/* Mobile Bottom Navigation */}
      <BottomNav
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Sticky Bottom Cart Bar for fast checkout */}
      <FloatingCartBar />

      {/* Interactive Overlays */}
      <CartDrawer />
      <CheckoutModal />
      {selectedProductForDetail && (
        <ProductDetailModal
          product={selectedProductForDetail}
          onClose={() => setSelectedProductForDetail(null)}
        />
      )}

      {/* Floating Feedback Notification */}
      {toast && (
        <div className="fixed bottom-20 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full bg-brand-tertiary-container text-white shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-200">
          <CheckCircle2 className="w-5 h-5 text-brand-tertiary-fixed shrink-0" />
          <span className="text-xs sm:text-sm font-medium">{toast}</span>
        </div>
      )}

    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MainShop />
    </CartProvider>
  );
}
