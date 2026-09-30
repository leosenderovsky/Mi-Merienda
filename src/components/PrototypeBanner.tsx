import React from 'react';
import { demoBannerConfig } from '../demoBanner.config';

export const PrototypeBanner: React.FC = () => {
  return (
    <>
      <style>{`
        #root > div:has(.prototype-banner) > header {
          top: 44px;
        }
        #root > div:has(.prototype-banner) > main {
          padding-top: calc(8rem + 44px);
        }
        @media (min-width: 640px) {
          #root > div:has(.prototype-banner) > main {
            padding-top: calc(9rem + 44px);
          }
        }
        @media (min-width: 768px) {
          #root > div:has(.prototype-banner) > header {
            top: 28px;
          }
          #root > div:has(.prototype-banner) > main {
            padding-top: calc(9rem + 28px);
          }
        }
        @media (max-width: 359px) {
          .prototype-banner {
            font-size: 9px;
            padding-left: 4px;
            padding-right: 4px;
          }
        }
      `}</style>
      <div className="prototype-banner fixed inset-x-0 top-0 z-[60] h-11 bg-amber-400 px-2 py-1.5 text-center text-[10px] leading-4 text-gray-900 md:h-7 md:whitespace-nowrap md:text-xs">
        Esta marca no existe. Este sitio es un prototipo de{' '}
        <a
          href={demoBannerConfig.link}
          className="font-semibold underline underline-offset-2"
        >
          {demoBannerConfig.companyName}
        </a>
        . Si querés un sitio como este para tu negocio, visitanos acá.
      </div>
    </>
  );
};