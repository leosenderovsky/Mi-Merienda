import React from 'react';
import { brandConfig } from '../brand.config';
import { Store, Clock, MapPin, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="contacto" className="max-w-4xl mx-auto px-4 pt-6 pb-24 sm:pb-12 text-brand-on-surface-variant scroll-mt-28">
      <div className="bg-brand-surface-container rounded-3xl p-6 sm:p-8 flex flex-col gap-6 border border-brand-surface-container-highest">
        
        {/* Brand Lockup */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-brand-surface-container-high flex items-center justify-center text-brand-primary shadow-xs">
            <Store className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg sm:text-xl font-bold text-brand-primary">
              Panadería {brandConfig.brand.name}
            </span>
            <span className="text-xs text-brand-secondary font-semibold">
              {brandConfig.brand.tagline}
            </span>
          </div>
        </div>

        {/* Contact & Hours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {/* Horarios */}
          <div className="flex items-start gap-3 p-3 rounded-xl bg-white/60 border border-brand-surface-container-highest/60">
            <Clock className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
            <div className="flex flex-col text-xs">
              <span className="font-bold text-brand-primary">Horarios de Atención</span>
              <span className="text-brand-on-surface-variant mt-0.5">{brandConfig.contact.scheduleWeekday}</span>
              <span className="text-[11px] text-brand-outline mt-0.5">{brandConfig.contact.scheduleNote}</span>
            </div>
          </div>

          {/* Local */}
          <div className="flex items-start gap-3 p-3 rounded-xl bg-white/60 border border-brand-surface-container-highest/60">
            <MapPin className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
            <div className="flex flex-col text-xs">
              <span className="font-bold text-brand-primary">Local Barrial</span>
              <span className="text-brand-on-surface-variant mt-0.5">{brandConfig.contact.address}</span>
              <span className="text-[11px] text-brand-outline mt-0.5">{brandConfig.contact.city}</span>
            </div>
          </div>

          {/* Redes */}
          <a
            href={brandConfig.contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 p-3 rounded-xl bg-white/60 hover:bg-white border border-brand-surface-container-highest/60 transition-colors group cursor-pointer"
          >
            <Instagram className="w-4 h-4 text-brand-primary group-hover:text-brand-secondary shrink-0 mt-0.5" />
            <div className="flex flex-col text-xs">
              <span className="font-bold text-brand-primary group-hover:text-brand-secondary">
                Comunidad &amp; Redes
              </span>
              <span className="text-brand-on-surface-variant mt-0.5">{brandConfig.contact.instagramHandle}</span>
              <span className="text-[11px] text-brand-outline mt-0.5">Seguinos para ver los horneados</span>
            </div>
          </a>
        </div>

        {/* Requisito obligatorio: Leyenda discreta */}
        <div className="p-4 rounded-xl bg-brand-surface-container-highest/60 text-center flex flex-col gap-1 border border-brand-outline-variant/40">
          <p className="text-[11px] sm:text-xs text-brand-on-surface-variant font-medium">
            {brandConfig.disclaimer.demoBadge}
          </p>
          <p className="text-[10px] sm:text-[11px] text-brand-outline">
            {brandConfig.disclaimer.footerNote}
          </p>
        </div>

      </div>
    </footer>
  );
};
