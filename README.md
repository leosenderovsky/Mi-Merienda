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
- `src/data/brand.json`: **todos los datos y textos editables** (identidad, tema, entrega, SEO y textos de la interfaz).
- `src/data/brand.schema.json`: esquema con etiquetas en español, tipos y reglas; `docs/CAMPOS.md` es la tabla de campos generada.
- `src/brand.config.ts`: envoltorio que importa `brand.json` y exporta `brandConfig` (no se edita).
- `src/components/Txt.tsx`: muestra un texto editable y no dibuja nada si está vacío.
- `src/data/catalog.json`: categorías, unidades, productos y opciones editables.
- `src/data/catalog.schema.json`: contrato del catálogo para el editor web.
- `src/catalog.ts`: envoltorio tipado que conserva los exports usados por la interfaz.
- `src/generated/`: datos generados para las dimensiones de las imágenes.
- `public/assets/`: logo, iconos, imágenes del hero, catálogo y vista previa social.
- `scripts/`: generación y controles de imágenes, logo e iconos.
- `docs/`: documentación de recursos gráficos; consultá `docs/IMAGENES.md`.

## Adaptar para un cliente

Hacé los cambios en este orden:

1. Editá `src/data/brand.json` (la tabla completa está en `docs/CAMPOS.md`). Cada bloque controla:
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
   - `howToOrder`, `extras` y `ui`: títulos, botones, avisos, mensajes de WhatsApp y precio del pack de velita.
2. Los tokens de `theme` se inyectan como variables CSS desde `src/main.tsx`; ahí también se asignan las dos familias tipográficas.
3. Actualizá `src/data/catalog.json`: cada producto tiene identificador, nombre, categoría, precio, unidad, imágenes, descripción y, opcionalmente, `badge`, `requiresLeadTime`, `leadTimeHours` y `options`. Las opciones admiten `radio`, `checkbox` y `text`; las alternativas y los extras de precio se expresan con `extraPrice`.
4. Las categorías, unidades y el destino destacado se derivan del JSON. No hace falta modificar TypeScript al agregar, quitar o renombrar una categoría o unidad.
5. Reemplazá las imágenes que correspondan en `public/assets/` y regenerá los recursos derivados con los comandos de imágenes.

### Fechas de entrega

`src/lib/availableDates.ts` (usado por `CheckoutModal.tsx` y por la ficha de producto) toma el mayor `leadTimeHours` entre los productos de la canasta que requieren anticipación. Redondea esas horas hacia arriba a días, suma el resultado a la fecha de hoy y muestra hasta diez fechas candidatas, excluyendo los días indicados en `contact.closedWeekdays`. Los turnos salen de `delivery.timeSlots`.

### Todos los textos son editables (y quitables)

Ningún texto visible está escrito en el código: todo sale de `src/data/brand.json`, incluidos botones, títulos, avisos, etiquetas de accesibilidad y los mensajes de WhatsApp.

- **Cambiar un texto:** editá su valor (por ejemplo `ui.footer.addressTitle` de "Local Barrial" a "Dónde estamos").
- **Quitar un elemento:** dejá su texto **vacío** (`""`); el elemento no se dibuja.
- **Textos con variables:** `{name}`, `{count}`, `{hours}`, `{price}`, etc. se reemplazan solos; el esquema indica cuáles admite cada texto y `check:config` falla si usás una desconocida.
- Los nombres, descripciones, categorías, unidades y opciones de productos están en `src/data/catalog.json` (también datos editables).

Si agregás un componente, sus textos van a `brand.json` y a `brand.schema.json`; `npm run check:texts` lo verifica.

## Datos, validación y pruebas

| Comando | Para qué sirve |
| --- | --- |
| `npm run generate:types` | Genera `src/generated/brand.types.ts` desde el esquema (corre solo en `dev` y `build`; el archivo se commitea). |
| `npm run check:config` | Valida `brand.json` contra el esquema, imágenes, URLs, colores, WhatsApp y variables de texto. |
| `npm run check:config:strict` | Además exige reemplazar los datos de ejemplo y rechaza los textos de `prototype-markers.json`. **Falla en el prototipo, a propósito.** |
| `npm run check:texts` | Falla si algún texto visible está escrito en el código en vez de salir de `brand.json`. |
| `npm run check:coupling` | Falla si una categoría o unidad del catálogo queda escrita como literal en el código. |
| `npm run check:render` | Renderiza la aplicación sin navegador y falla ante cualquier excepción. |
| `npm run images:optimize` | Optimiza JPG de productos y del hero conservando dimensiones y originales en `.image-originals/`. |
| `npm run docs:fields` | Regenera `docs/CAMPOS.md`. |

## Imágenes y logo

| Archivo o carpeta | Uso | Medidas actuales / requisito |
| --- | --- | --- |
| `public/assets/products/` | Fotos JPG declaradas en `src/data/catalog.json`. | 1600 px de ancho; 1195 o 1200 px de alto. Formato 4:3. |
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
| `VITE_DEMO_BRAND_NAME` | Sobrescritura opcional del nombre del banner; por defecto `Tienda ON!`. |
| `VITE_DEMO_BRAND_URL` | Reservada para un futuro enlace del banner; por defecto queda vacía. |

Para la URL del sitio, `vite.config.ts` resuelve en este orden: `VITE_SITE_URL` leído por `loadEnv` para el modo activo o por `process.env`; en contexto `production`, `process.env.URL`; en otros contextos, `process.env.DEPLOY_PRIME_URL`; como respaldo, `process.env.URL` y luego `process.env.DEPLOY_PRIME_URL`; y, si ninguno tiene valor, usa rutas relativas. La URL resultante se usa para canonical y para hacer absoluta la URL de la imagen social.

## Modo demo

`src/components/PrototypeBanner.tsx` muestra el aviso controlado por `brandConfig.demo.showPrototypeBanner`. Por defecto dice “prototipo de Tienda ON!” y no agrega enlace mientras `Tienda ON!` no tenga un sitio público. `getDemoLegend()` arma la leyenda de prototipo que aparece en el pie.

`brandConfig.demo.prefillCheckout` controla si el checkout toma los valores de `checkoutDefaults`; está apagado por defecto. Antes de entregar, reemplazá todos los valores y contenidos de muestra. Corré `npm run check:config:strict`: lista cada dato de ejemplo (WhatsApp, dirección, horarios, turnos, textos de marca) que falta reemplazar en `src/data/brand.json`. Revisá también textos, precios, catálogo, imágenes y valores de checkout.

Para mantener el código de demo pero ocultar el aviso, poné `showPrototypeBanner` en `false` y dejá `prefillCheckout` en `false`. Para retirarlo del todo, además quitá el componente, su import y la bandera según indica `src/demoBanner.config.ts`; revisá la leyenda `disclaimer.demoBadge` que consume `src/components/Footer.tsx`. No publiques el prototipo con datos de muestra.

## Despliegue en Netlify

El repositorio no incluye configuración propia de Netlify. En la configuración de build del sitio, usá:

- **Comando de build:** `npm run build`
- **Directorio de publicación:** `dist`
- **URL canónica:** definí `VITE_SITE_URL` con la URL pública del sitio si querés fijarla explícitamente.

Vite genera el contenido de publicación en `dist`; el hook `prebuild` actualiza primero las dimensiones de imágenes.

### Verificar un deploy

Cada build publica `build-info.json` en la raíz de `dist`, sin cache y con `X-Robots-Tag: noindex`. Ese archivo expone el commit, rama, contexto, fuente de URL y solo booleanos para las variables `VITE_SITE_URL`, `VITE_DEMO_BRAND_NAME` y `VITE_DEMO_BRAND_URL`. El HTML también incluye `<meta name="build-commit" content="...">` en el `<head>`.

Después de publicar, verificá el deploy con:

```sh
npm run verify:deploy -- https://<sitio>.netlify.app
```

El comando compara el commit publicado contra `origin/main`, revisa la fuente de URL usada por Netlify y comprueba con GET que `canonical` y `og:image` respondan 200.

### Verificación antes de entregar

- [ ] Reemplazá marca, contacto, horarios, días cerrados y textos en `src/data/brand.json` hasta que pase `npm run check:config:strict`.
- [ ] Reemplazá y revisá productos, precios, unidades, opciones e imágenes en `src/data/catalog.json`.
- [ ] Revisá las categorías y la navegación si cambió el rubro.
- [ ] Ocultá o sacá el banner demo; confirmá que `prefillCheckout` esté apagado.
- [ ] Generá los recursos y ejecutá los controles:

```sh
npm run make:icons
npm run check:icons
npm run check:images:strict
npm run lint
npm run check:texts
npm run check:render
npm run build
```

- [ ] Publicá `dist` y comprobá el sitio desplegado, los metadatos y el recorrido de pedido hasta WhatsApp.
