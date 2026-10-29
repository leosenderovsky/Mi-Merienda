import React from 'react';
import { brandConfig, formatText } from '../brand.config';
import { getProductImageDimensions } from '../catalog';
import { CheckCircle2, ArrowDown, Headphones } from 'lucide-react';

export const Hero: React.FC = () => {
  const heroImageDimensions = getProductImageDimensions(brandConfig.hero.heroImage);

  const handleWhatsAppContact = () => {
    const msg = encodeURIComponent(
      formatText(brandConfig.ui.whatsapp.availability, { name: brandConfig.brand.name })
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
            alt={brandConfig.hero.imageAlt}
            width={heroImageDimensions?.width}
            height={heroImageDimensions?.height}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="inline-block px-3 py-1 rounded-full bg-brand-secondary-fixed/90 backdrop-blur-md text-brand-on-secondary-fixed text-xs font-semibold mb-2 shadow-xs">
              {brandConfig.hero.kicker}
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold leading-tight drop-shadow-sm max-w-xl">
              {brandConfig.hero.title}
            </h1>
          </div>
        </div>

        {/* Narrative & Quick Call To Actions */}
        <div className="p-5 sm:p-7 flex flex-col justify-between space-y-4">
          <p className="text-sm sm:text-base text-brand-on-surface-variant max-w-2xl leading-relaxed">
            {brandConfig.hero.description}
          </p>

          {/* Value Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {brandConfig.hero.badges.map((badge, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-surface text-brand-primary text-xs font-semibold shadow-xs border border-brand-surface-container-high"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-secondary" />
                <span>{badge.text}</span>
              </div>
            ))}
          </div>

          {/* Interaction CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={scrollToCatalog}
              className="py-3 px-6 rounded-full bg-brand-primary text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-brand-primary-container active:scale-[0.98] transition-all shadow-[0_4px_16px_rgba(92,56,42,0.2)] cursor-pointer"
            >
              <span>{brandConfig.hero.ctaPrimary}</span>
              <ArrowDown className="w-4 h-4" />
            </button>
            <button
              onClick={handleWhatsAppContact}
              className="py-3 px-6 rounded-full bg-brand-surface-container text-brand-primary hover:bg-brand-surface-container-high active:scale-[0.98] font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer border border-brand-surface-container-highest"
            >
              <Headphones className="w-4 h-4 text-brand-secondary" />
              <span>{brandConfig.hero.ctaSecondary}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
