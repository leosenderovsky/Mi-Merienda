import React from 'react';
import { brandConfig } from '../brand.config';
import { Store, Clock, MapPin, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="contacto" className="max-w-4xl mx-auto px-4 pt-6 pb-24 sm:pb-12 text-[#514440] scroll-mt-28">
      <div className="bg-[#f1ede7] rounded-3xl p-6 sm:p-8 flex flex-col gap-6 border border-[#e6e2dc]">
        
        {/* Brand Lockup */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#ebe8e2] flex items-center justify-center text-[#422316] shadow-xs">
            <Store className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg sm:text-xl font-bold text-[#422316]">
              Panadería {brandConfig.brand.name}
            </span>
            <span className="text-xs text-[#7e5700] font-semibold">
              {brandConfig.brand.tagline}
            </span>
          </div>
        </div>

        {/* Contact & Hours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {/* Horarios */}
          <div className="flex items-start gap-3 p-3 rounded-xl bg-[#ffffff]/60 border border-[#e6e2dc]/60">
            <Clock className="w-4 h-4 text-[#422316] shrink-0 mt-0.5" />
            <div className="flex flex-col text-xs">
              <span className="font-bold text-[#422316]">Horarios de Atención</span>
              <span className="text-[#514440] mt-0.5">{brandConfig.contact.scheduleWeekday}</span>
              <span className="text-[11px] text-[#83746f] mt-0.5">{brandConfig.contact.scheduleNote}</span>
            </div>
          </div>

          {/* Local */}
          <div className="flex items-start gap-3 p-3 rounded-xl bg-[#ffffff]/60 border border-[#e6e2dc]/60">
            <MapPin className="w-4 h-4 text-[#422316] shrink-0 mt-0.5" />
            <div className="flex flex-col text-xs">
              <span className="font-bold text-[#422316]">Local Barrial</span>
              <span className="text-[#514440] mt-0.5">{brandConfig.contact.address}</span>
              <span className="text-[11px] text-[#83746f] mt-0.5">{brandConfig.contact.city}</span>
            </div>
          </div>

          {/* Redes */}
          <a
            href={brandConfig.contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 p-3 rounded-xl bg-[#ffffff]/60 hover:bg-[#ffffff] border border-[#e6e2dc]/60 transition-colors group cursor-pointer"
          >
            <Instagram className="w-4 h-4 text-[#422316] group-hover:text-[#7e5700] shrink-0 mt-0.5" />
            <div className="flex flex-col text-xs">
              <span className="font-bold text-[#422316] group-hover:text-[#7e5700]">
                Comunidad &amp; Redes
              </span>
              <span className="text-[#514440] mt-0.5">{brandConfig.contact.instagramHandle}</span>
              <span className="text-[11px] text-[#83746f] mt-0.5">Seguinos para ver los horneados</span>
            </div>
          </a>
        </div>

        {/* Requisito obligatorio: Leyenda discreta */}
        <div className="p-4 rounded-xl bg-[#e6e2dc]/60 text-center flex flex-col gap-1 border border-[#d5c3bd]/40">
          <p className="text-[11px] sm:text-xs text-[#514440] font-medium">
            {brandConfig.disclaimer.demoBadge}
          </p>
          <p className="text-[10px] sm:text-[11px] text-[#83746f]">
            {brandConfig.disclaimer.footerNote}
          </p>
        </div>

      </div>
    </footer>
  );
};
