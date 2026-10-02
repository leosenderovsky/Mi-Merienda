import React from 'react';
import { demoBannerConfig, getValidDemoBannerLink } from '../demoBanner.config';

export const PrototypeBanner: React.FC = () => {
  const companyName = demoBannerConfig.companyName === '[EMPRESA]' ? '' : demoBannerConfig.companyName;
  const link = companyName ? getValidDemoBannerLink(demoBannerConfig.link) : null;

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
        {companyName ? (
          <>
            Esta marca no existe. Este sitio es un prototipo de{' '}
            {link ? (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline underline-offset-2"
              >
                {companyName}
              </a>
            ) : (
              <strong className="font-semibold">{companyName}</strong>
            )}
            .{link && ' Si querés un sitio como este para tu negocio, visitanos acá.'}
          </>
        ) : (
          <>Esta marca no existe. Este sitio es un prototipo de demostración de sitios web para comercios.</>
        )}
      </div>
    </>
  );
};