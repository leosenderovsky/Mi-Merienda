# Mi Merienda

Catálogo y landing para panaderías, pastelerías y comercios de barrio: reúne pedidos del día y encargos con anticipación, que se cierran directamente por WhatsApp.
Es un prototipo white-label para duplicar y adaptar a clientes reales.

**Stack:** React 19, TypeScript, Vite 8, Tailwind CSS 4 y Lucide React; integración de React y Tailwind mediante plugins de Vite.

## Cómo empezar

Necesitás Node.js y npm instalados.

```sh
npm install
npm run dev
```

El sitio queda disponible en `http://localhost:3000`.

```sh
npm run build
npm run preview
```

`npm run dev` y `npm run build` ejecutan sus respectivos hooks `predev` y `prebuild`, que corren `npm run generate:image-dimensions`. El generador actualiza `src/generated/imageDimensions.json` con las dimensiones de las imágenes en `public/assets/`. Ese JSON se versiona y se commitea; no lo borres ni lo ignores.

## Mapa del proyecto

- `src/`: aplicación React, estilos, configuración y datos.
- `src/components/`: componentes de catálogo, carrito, checkout y secciones de la landing.
- `src/context/CartContext.tsx`: estado de la canasta, persistencia local y armado del pedido para WhatsApp.
- `src/brand.config.ts`: identidad, contenido, tema, entrega y SEO editables.
- `src/products.ts`: categorías y catálogo del prototipo.
- `src/generated/`: datos generados para las dimensiones de las imágenes.
- `public/assets/`: logo, iconos, imágenes del hero, catálogo y vista previa social.
- `scripts/`: generación y controles de imágenes, logo e iconos.
- `docs/`: documentación de recursos gráficos; consultá `docs/IMAGENES.md`.

## Adaptar para un cliente

Hacé los cambios en este orden:

1. Editá `src/brand.config.ts`. Cada bloque controla:
   - `brand`: nombre, textos de marca, logo e iconos.
   - `typography`: nombres de tipografías y URL de la hoja de estilos.
   - `theme`: colores semánticos del sitio.
   - `contact`: WhatsApp, redes, dirección, ciudad, horarios, textos de campos y `closedWeekdays` (días de cierre).
   - `delivery`: retiro y envío (precios, rótulos y descripciones), turnos y aviso de anticipación.
   - `hero`: textos, botones, insignias e imagen principal.
   - `orderSteps`: pasos y explicaciones para hacer un pedido.
   - `disclaimer`: leyenda de demo y texto del pie.
   - `demo`: banner de prototipo, valores de checkout y si se precargan.
   - `storage`: clave de `localStorage` usada para guardar la canasta.
   - `seo`: sufijo del título, descripción y recurso de imagen social.
2. Los tokens de `theme` se inyectan como variables CSS desde `src/main.tsx`; ahí también se asignan las dos familias tipográficas.
3. Actualizá `src/products.ts`: cada producto tiene identificador, nombre, categoría, precio, unidad, imagen, descripción y, opcionalmente, `badge`, `requiresLeadTime`, `leadTimeHours` y `opciones`. Las opciones admiten `radio`, `checkbox` y `text`; las alternativas y los extras de precio se expresan con `extraPrice`.
4. Si cambia el rubro, ajustá la unión `ProductCategory` y la lista `CATEGORIES` en `src/products.ts`. Revisá también la navegación específica de “Tortas por encargo” en `src/App.tsx` y `src/components/Header.tsx`.
5. Reemplazá las imágenes que correspondan en `public/assets/` y regenerá los recursos derivados con los comandos de imágenes.

### Fechas de entrega

`src/components/CheckoutModal.tsx` toma el mayor `leadTimeHours` entre los productos de la canasta que requieren anticipación. Redondea esas horas hacia arriba a días, suma el resultado a la fecha de hoy y muestra hasta diez fechas candidatas, excluyendo los días indicados en `contact.closedWeekdays`. Los turnos salen de `delivery.timeSlots`.

## Imágenes y logo

| Archivo o carpeta | Uso | Medidas actuales / requisito |
| --- | --- | --- |
| `public/assets/products/` | Ocho fotos JPG declaradas en `src/products.ts`. | 1600 px de ancho; 1195 o 1200 px de alto. Formato 4:3. |
| `public/assets/hero/hero-1.jpg` | Imagen principal; origen del recorte social. | 2560 × 1440 px. |
| `public/assets/logo/logo.png` | Logo mostrado en el encabezado. | 800 × 827 px. |
| `public/assets/logo/logo.svg` | Fuente vectorial del logo para conservar y editar el original. | Vectorial; no depende de una resolución fija. |
| `public/assets/logo/favicon-32.png` | Favicon. | 32 × 32 px. |
| `public/assets/logo/apple-touch-icon.png` | Icono para dispositivos Apple. | 180 × 180 px, opaco. |
| `public/assets/misc/og-image.jpg` | Imagen para la vista previa de enlaces. | 1200 × 630 px; hasta 200 KB al generarla. |

Las dimensiones actuales salen de `src/generated/imageDimensions.json`. Para productos, `scripts/check-images.mjs` controla un ancho mínimo de 1200 px y una proporción cercana a 4:3; `docs/IMAGENES.md` recomienda fotos de 1600 × 1200 px, sin texto ni elementos de interfaz.

Comandos disponibles en `package.json`:

| Comando | Para qué sirve |
| --- | --- |
| `npm run generate:image-dimensions` | Regenera las dimensiones de imágenes en el JSON versionado. |
| `npm run check:images` | Informa dimensiones, peso, imágenes faltantes, duplicados y advertencias; las advertencias no fallan el comando. |
| `npm run check:images:strict` | Corre el mismo control y falla si hay advertencias. |
| `npm run make:icons` | Genera los iconos PNG desde `public/assets/logo/logo.png`. |
| `npm run check:icons` | Comprueba que los iconos correspondan al logo y que el de Apple sea opaco y mida 180 × 180 px. |
| `npm run logo:optimize` | Optimiza el PNG del logo, con tope de 800 px de ancho y 120 KB; conserva una copia en `.image-originals/`. |
| `npm run make:og` | Genera `public/assets/misc/og-image.jpg` desde la imagen del hero. |

## Variables de entorno

Partí de `.env.example`. No hace falta completar variables para levantar la app localmente.

| Variable | Uso |
| --- | --- |
| `VITE_SITE_URL` | URL pública para canonical y metadatos de imagen social. |
| `VITE_DEMO_BRAND_NAME` | Nombre que puede mostrarse en el banner de demo. |
| `VITE_DEMO_BRAND_URL` | Enlace del banner; solo se acepta si es HTTP o HTTPS. |

Para la URL del sitio, `vite.config.ts` resuelve en este orden: `VITE_SITE_URL` leído por `loadEnv` para el modo activo; `process.env.VITE_SITE_URL`; `process.env.DEPLOY_PRIME_URL`; `process.env.URL`; y, si ninguno tiene valor, usa rutas relativas. La URL resultante se usa para canonical y para hacer absoluta la URL de la imagen social.

## Modo demo

`src/components/PrototypeBanner.tsx` muestra el aviso controlado por `brandConfig.demo.showPrototypeBanner`. El nombre y el enlace opcionales vienen de las variables `VITE_DEMO_BRAND_NAME` y `VITE_DEMO_BRAND_URL` leídas en `src/demoBanner.config.ts`. `getDemoLegend()` arma la leyenda de prototipo que aparece en el pie.

`brandConfig.demo.prefillCheckout` controla si el checkout toma los valores de `checkoutDefaults`; está apagado por defecto. Antes de entregar, reemplazá todos los valores y contenidos de muestra. En particular, buscá en `src/brand.config.ts` los campos marcados **“DATOS DE EJEMPLO, reemplazar por cliente”**: WhatsApp, nombre visible de WhatsApp, dirección y ciudad, horarios, días de cierre y turnos de entrega. Revisá también textos, precios, catálogo, imágenes y valores de checkout.

Para mantener el código de demo pero ocultar el aviso, poné `showPrototypeBanner` en `false` y dejá `prefillCheckout` en `false`. Para retirarlo del todo, además quitá el componente, su import y la bandera según indica `src/demoBanner.config.ts`; revisá la leyenda `disclaimer.demoBadge` que consume `src/components/Footer.tsx`. No publiques el prototipo con datos de muestra.

## Despliegue en Netlify

El repositorio no incluye configuración propia de Netlify. En la configuración de build del sitio, usá:

- **Comando de build:** `npm run build`
- **Directorio de publicación:** `dist`
- **URL canónica:** definí `VITE_SITE_URL` con la URL pública del sitio si querés fijarla explícitamente.

Vite genera el contenido de publicación en `dist`; el hook `prebuild` actualiza primero las dimensiones de imágenes. No hace falta agregar un comando de verificación que no exista en el proyecto.

### Verificación antes de entregar

- [ ] Reemplazá marca, contacto, horarios y días cerrados en `src/brand.config.ts`.
- [ ] Reemplazá y revisá productos, precios, unidades, opciones e imágenes en `src/products.ts`.
- [ ] Revisá las categorías y la navegación si cambió el rubro.
- [ ] Ocultá o sacá el banner demo; confirmá que `prefillCheckout` esté apagado.
- [ ] Generá los recursos y ejecutá los controles:

```sh
npm run make:icons
npm run check:icons
npm run check:images:strict
npm run lint
npm run build
```

- [ ] Publicá `dist` y comprobá el sitio desplegado, los metadatos y el recorrido de pedido hasta WhatsApp.
