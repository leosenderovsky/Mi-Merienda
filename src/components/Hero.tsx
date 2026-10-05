import React from 'react';
import { brandConfig } from '../brand.config';
import { getProductImageDimensions } from '../products';
import { CheckCircle2, ArrowDown, Headphones } from 'lucide-react';

export const Hero: React.FC = () => {
  const heroImageDimensions = getProductImageDimensions(brandConfig.hero.heroImage);

  const handleWhatsAppContact = () => {
    const msg = encodeURIComponent(
      `¡Hola ${brandConfig.brand.name}! Me gustaría consultar sobre la disponibilidad de los productos de hoy.`
    );
    window.open(`https://wa.me/${brandConfig.contact.whatsappNumber}?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalogo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-2 pb-6 px-4 max-w-4xl mx-auto">
      <div className="relative overflow-hidden rounded-2xl bg-brand-surface-container shadow-[0_6px_24px_-4px_rgba(92,56,42,0.08)] flex flex-col border border-brand-surface-container-highest">
        {/* Visual Banner Media */}
        <div className="w-full h-56 sm:h-72 relative overflow-hidden bg-brand-primary-container">
          <img
            src={brandConfig.hero.heroImage}
            alt="Panes artesanos y medialunas recién horneadas"
            width={heroImageDimensions?.width}
            height={heroImageDimensions?.height}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
          />
          {/* Measured Scrim for Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-brand-primary/50 to-black/20" />

          {/* Floating Pill Badges */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-wrap gap-2 z-10">
            {brandConfig.hero.badges.map(badge => (
              <span
                key={badge.text}
                className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md ${
                  badge.style === 'secondary'
                    ? 'bg-brand-secondary-container text-brand-on-secondary-container'
                    : 'bg-brand-tertiary-container text-white'
                }`}
              >
                <span className="material-symbols-outlined text-[16px] leading-none" aria-hidden="true">
                  {badge.icon}
                </span>
                {badge.text}
              </span>
            ))}
          </div>
        </div>

        {/* Hero Narrative Body */}
        <div className="p-5 sm:p-7 bg-brand-surface-container-low flex flex-col gap-3">
          <div className="flex items-center gap-1.5 text-brand-secondary">
            <CheckCircle2 className="w-4 h-4 text-brand-secondary" />
            <span className="text-xs font-bold uppercase tracking-wider">
              {brandConfig.hero.kicker}
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-brand-primary font-bold leading-tight text-balance">
            {brandConfig.hero.title}
          </h1>

          <p className="text-sm sm:text-base text-brand-on-surface-variant leading-relaxed max-w-2xl">
            {brandConfig.hero.description}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={scrollToCatalog}
              className="px-5 py-2.5 rounded-full bg-brand-primary text-white text-sm sm:text-base font-semibold flex items-center gap-2 hover:bg-brand-primary-container active:scale-95 transition-all shadow-md cursor-pointer"
            >
              <span>{brandConfig.hero.ctaPrimary}</span>
              <ArrowDown className="w-4 h-4" />
            </button>

            <button
              onClick={handleWhatsAppContact}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-brand-surface-container text-brand-on-surface-variant hover:bg-brand-surface-container-high text-xs sm:text-sm font-semibold transition-all active:scale-95 border border-brand-outline-variant/50 cursor-pointer"
            >
              <Headphones className="w-4 h-4 text-brand-tertiary-container" />
              <span>{brandConfig.hero.ctaSecondary}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
