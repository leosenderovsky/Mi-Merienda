import React from 'react';
import { brandConfig } from '../brand.config';
import { CakeSlice } from 'lucide-react';

export const HowToOrder: React.FC = () => {
  return (
    <section id="como-pedir" className="max-w-4xl mx-auto px-4 py-4 scroll-mt-28">
      <div className="bg-[#f7f3ed] rounded-2xl p-5 sm:p-6 flex flex-col gap-3 shadow-[0_4px_16px_-2px_rgba(92,56,42,0.04)] border border-[#e6e2dc]">
        
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-[#fdbe50] text-[#714d00] flex items-center justify-center shrink-0">
            <CakeSlice className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg sm:text-xl text-[#422316] font-bold">
            ¿Cómo hacer tu pedido?
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-[#514440] leading-relaxed">
          Simple, rápido y con la cercanía que nos caracteriza desde hace 15 años.
        </p>

        <div className="flex flex-col gap-3 mt-2">
          {brandConfig.orderSteps.map((step) => (
            <div
              key={step.step}
              className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#ffffff] border border-[#f1ede7] shadow-xs"
            >
              <div className="w-7 h-7 rounded-full bg-[#5c382a] text-[#ffdbce] font-serif text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">
                {step.step}
              </div>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-bold text-[#422316]">
                  {step.title}
                </span>
                <span className="text-xs text-[#514440] leading-relaxed mt-0.5">
                  {step.description}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
