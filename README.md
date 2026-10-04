# Mi Merienda

Catálogo web adaptable para panaderías, pastelerías y comercios de barrio.

## Adaptar a un cliente

- Editá `src/brand.config.ts` para la marca, tema, tipografías, contacto, horarios, entrega y SEO.
- Para un cliente real, desactivá `demo.showPrototypeBanner` en ese mismo archivo.
- Reemplazá los archivos correspondientes en `public/assets/` y generá los iconos con `npm run make:icons`.
- Actualizá el catálogo y sus precios en `src/products.ts`.

## Variables de entorno

- `VITE_SITE_URL`: URL canónica pública. Si no está definida, se toma `DEPLOY_PRIME_URL` (previews de Netlify) y luego `URL`; sin ninguna, se usan rutas relativas.
- `VITE_DEMO_BRAND_NAME` y `VITE_DEMO_BRAND_URL`: personalizan el banner de demostración.
- `APP_URL`: URL del servicio inyectada por AI Studio, si aplica.

## Validación

```sh
npm run make:icons
npm run check:images
npm run lint
npm run build
```
