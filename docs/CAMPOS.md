# Diccionario de Campos Editables

Este documento lista todos los campos editables del sitio definidos en sus esquemas JSON correspondientes.

## Marca y Configuración General (brand.json)

Definido en `src/data/brand.schema.json` (origen de datos: `src/data/brand.json`).

| Ruta | Título | Descripción | Widget | Asset | Ejemplo |
|---|---|---|---|---|---|
| `schemaVersion` | versión del esquema | Valor numérico. | `number` |  |  |
| `site` | identificador del sitio | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `brand.name` | Nombre de marca | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Mi Merienda |
| `brand.tagline` | Lema o frase principal | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Horneando momentos felices desde 2009 |
| `brand.subtagline` | Subtítulo de la marca | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Panadería & Pastelería Artesanal de Barrio |
| `brand.logoUrl` | Logotipo principal | Ruta pública de la imagen (carpeta public/assets). | `image` | path: /assets/logo/logo.png, maxKB: 120KB |  |
| `brand.favicon32Url` | Favicon del sitio | Ruta pública de la imagen (carpeta public/assets). | `image` | path: /assets/logo/favicon-32x32.png, maxKB: 120KB |  |
| `brand.appleTouchIconUrl` | Ícono para pantalla de inicio de Apple | Ruta pública de la imagen (carpeta public/assets). | `image` | path: /assets/logo/apple-touch-icon.png, minWidth: 180px, maxKB: 120KB |  |
| `brand.badgeHeroKicker` | Etiqueta destacada en portada | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Tradición y cariño de barrio |
| `brand.faviconCrop.left` | Margen izquierdo de recorte | Valor numérico. | `number` |  |  |
| `brand.faviconCrop.top` | Margen superior de recorte | Valor numérico. | `number` |  |  |
| `brand.faviconCrop.width` | Ancho del recorte | Valor numérico. | `number` |  |  |
| `brand.faviconCrop.height` | Alto del recorte | Valor numérico. | `number` |  |  |
| `typography.displayFont` | Tipografía de títulos | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `typography.bodyFont` | Tipografía de texto general | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `typography.stylesheetUrl` | Enlace a tipografías web | Dirección web completa (https://…). | `url` |  |  |
| `theme.primary` | Color principal (Colores) | Color en formato #RRGGBB. | `color` |  |  |
| `theme.primaryContainer` | Contenedor principal (Colores) | Color en formato #RRGGBB. | `color` |  |  |
| `theme.primaryFixed` | Principal claro (Colores) | Color en formato #RRGGBB. | `color` |  |  |
| `theme.onPrimaryContainer` | Texto sobre contenedor principal (Colores) | Color en formato #RRGGBB. | `color` |  |  |
| `theme.secondary` | Color secundario (Colores) | Color en formato #RRGGBB. | `color` |  |  |
| `theme.secondaryContainer` | Contenedor secundario (Colores) | Color en formato #RRGGBB. | `color` |  |  |
| `theme.secondaryFixed` | Secundario claro (Colores) | Color en formato #RRGGBB. | `color` |  |  |
| `theme.onSecondaryFixed` | Texto sobre secundario claro (Colores) | Color en formato #RRGGBB. | `color` |  |  |
| `theme.onSecondaryContainer` | Texto sobre contenedor secundario (Colores) | Color en formato #RRGGBB. | `color` |  |  |
| `theme.secondaryEmphasis` | Secundario de énfasis (Colores) | Color en formato #RRGGBB. | `color` |  |  |
| `theme.surface` | Fondo de página (Colores) | Color en formato #RRGGBB. | `color` |  |  |
| `theme.surfaceContainer` | Contenedor (Colores) | Color en formato #RRGGBB. | `color` |  |  |
| `theme.surfaceContainerLow` | Contenedor bajo (Colores) | Color en formato #RRGGBB. | `color` |  |  |
| `theme.surfaceContainerHigh` | Contenedor alto (Colores) | Color en formato #RRGGBB. | `color` |  |  |
| `theme.surfaceContainerHighest` | Contenedor máximo (Colores) | Color en formato #RRGGBB. | `color` |  |  |
| `theme.onSurface` | Texto principal (Colores) | Color en formato #RRGGBB. | `color` |  |  |
| `theme.onSurfaceVariant` | Texto secundario (Colores) | Color en formato #RRGGBB. | `color` |  |  |
| `theme.outline` | Borde (Colores) | Color en formato #RRGGBB. | `color` |  |  |
| `theme.outlineVariant` | Borde suave (Colores) | Color en formato #RRGGBB. | `color` |  |  |
| `theme.tertiary` | Color terciario (Colores) | Color en formato #RRGGBB. | `color` |  |  |
| `theme.tertiaryContainer` | Contenedor terciario (Colores) | Color en formato #RRGGBB. | `color` |  |  |
| `theme.tertiaryFixed` | Terciario claro (Colores) | Color en formato #RRGGBB. | `color` |  |  |
| `theme.onTertiaryFixed` | Texto sobre terciario claro (Colores) | Color en formato #RRGGBB. | `color` |  |  |
| `theme.tertiaryMuted` | Terciario apagado (Colores) | Color en formato #RRGGBB. | `color` |  |  |
| `theme.error` | Error (Colores) | Color en formato #RRGGBB. | `color` |  |  |
| `theme.errorContainer` | Contenedor de error (Colores) | Color en formato #RRGGBB. | `color` |  |  |
| `contact.whatsappNumber` | Número de WhatsApp (solo dígitos) (Contacto) | Texto editable. Dejalo vacío para ocultar el elemento. | `whatsapp` |  |  |
| `contact.whatsappDisplay` | WhatsApp visible (Contacto) | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | +54 9 11 4521-8890 |
| `contact.phonePlaceholder` | Ayuda del campo teléfono (Contacto) | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | +54 9 11 ... |
| `contact.customerNamePlaceholder` | Ayuda del campo nombre (Contacto) | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Ej: Valeria Gómez |
| `contact.addressPlaceholder` | Ayuda del campo dirección (Contacto) | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Calle y altura (ej: Thames 1840) |
| `contact.addressDetailPlaceholder` | Ayuda del campo piso/depto (Contacto) | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Piso / Depto / Timbre (ej: 4to B) |
| `contact.instagramHandle` | Nombre de usuario de Instagram | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | @mimerienda.panaderia |
| `contact.instagramUrl` | Enlace de Instagram (Contacto) | Dirección web completa (https://…). | `url` |  |  |
| `contact.address` | Dirección (Contacto) | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Av. San Martín 2840, Barrio Norte |
| `contact.city` | Ciudad y provincia | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Buenos Aires |
| `contact.scheduleWeekday` | Horario de atención (Contacto) | Texto editable. Dejalo vacío para ocultar el elemento. | `hours-list` |  | Martes a Domingo: 07:30 a 20:00 hs |
| `contact.scheduleNote` | Nota de horarios (Contacto) | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Lunes cerrado por descanso de horno |
| `contact.closedWeekdays` | Días cerrados (0 = domingo … 6 = sábado) (Contacto) | Lista editable. | `list` |  |  |
| `delivery.pickup.title` | Título de retiro en el local | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Retiro en el local |
| `delivery.pickup.price` | Precio de retiro en el local | Valor numérico. | `number` |  |  |
| `delivery.pickup.description` | Descripción de retiro en el local | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Av. San Martín 2840 • Horario a convenir |
| `delivery.delivery.title` | Título de envío a domicilio | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Envío en el barrio |
| `delivery.delivery.price` | Precio de envío a domicilio | Valor numérico. | `number` |  |  |
| `delivery.delivery.description` | Descripción de envío a domicilio | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Reparto seguro en bicicleta y auto térmico |
| `delivery.timeSlots` | Turnos disponibles para entrega o retiro | Lista editable. | `list` |  |  |
| `delivery.leadNoticeCake` | Mensaje sobre tiempo de anticipación para tortas | Texto editable. Dejalo vacío para ocultar el elemento. | `textarea` |  | Tu pedido incluye productos del día y una torta artesanal por encargo que requiere 48 hs de anticipación. |
| `hero.kicker` | Sobretítulo (Hero) | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Tradición y cariño de barrio |
| `hero.title` | Título de hero | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | El sabor del barrio, horneado con amor cada mañana |
| `hero.description` | Descripción de hero | Texto editable. Dejalo vacío para ocultar el elemento. | `textarea` |  | Panadería y pastelería artesanal. Productos frescos del día y pedidos especiales por encargo para tus momentos dulces. |
| `hero.ctaPrimary` | Botón de llamada a la acción principal | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Ver catálogo del día |
| `hero.ctaSecondary` | Botón secundario para contacto | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Atención por WhatsApp |
| `hero.badges[].text` | Texto visible | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Hornadas cada 2 hs |
| `hero.badges[].icon` | Ícono de sellos del hero | Texto editable. Dejalo vacío para ocultar el elemento. | `icon` |  | local_fire_department |
| `hero.badges[].style` | Estilo visual | Texto editable. Dejalo vacío para ocultar el elemento. | `icon` |  | secondary |
| `hero.heroImage` | Imagen del hero (Hero) | Ruta pública de la imagen (carpeta public/assets). | `image` | path: /assets/hero/hero-1.jpg, maxKB: 350KB |  |
| `hero.imageAlt` | Texto alternativo accesible de la imagen | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Panes artesanos y medialunas recién horneadas |
| `orderSteps[].step` | Paso (Pasos para pedir) | Valor numérico. | `number` |  |  |
| `orderSteps[].title` | Título de pasos para pedir | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Elegí tus favoritos |
| `orderSteps[].description` | Descripción de pasos para pedir | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Seleccioná facturas del día o programá tortas con anticipación de 48hs. |
| `disclaimer.footerNote` | Nota del pie (Leyenda del pie) | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Hecho con masa madre, harina orgánica y dedicación artesanal. |
| `disclaimer.demoBadge` | Leyenda de demostración | Texto base de prototipo. El sitio lo completa con el nombre del servicio (no se edita en brand.json). | `textarea` |  | Marca, productos y precios de ejemplo — prototipo de demostración |
| `demo.showPrototypeBanner` | Mostrar aviso de prototipo (Demostración) | Activa o desactiva este elemento. | `boolean` |  |  |
| `demo.prefillCheckout` | Precargar datos del checkout (Demostración) | Activa o desactiva este elemento. | `boolean` |  |  |
| `demo.checkoutDefaults.name` | Nombre de demostración | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `demo.checkoutDefaults.address` | Dirección (Demostración) | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `demo.checkoutDefaults.addressDetail` | Piso / depto (Demostración) | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `demo.checkoutDefaults.notes` | Notas (Demostración) | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `storage.cartKey` | Clave del carrito en el navegador (Almacenamiento) | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `seo.titleSuffix` | Sufijo del título (SEO y redes) | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Panadería & Pastelería |
| `seo.description` | Descripción de seo y redes | Texto editable. Dejalo vacío para ocultar el elemento. | `textarea` |  | Panadería y pastelería artesanal Mi Merienda. Productos frescos del día y pedidos especiales por encargo. |
| `seo.socialImage` | Imagen para redes (SEO y redes) | Ruta pública de la imagen (carpeta public/assets). | `image` | path: /assets/misc/og-image.jpg, minWidth: 1200px, maxKB: 200KB |  |
| `ui.catalog.emptyCategory` | Mensaje de categoría vacía (Catálogo) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.viewAll` | Botón ver todos (Catálogo) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.title` | Título de catálogo | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.countLabel` | Contador de variedades (Catálogo) | Rótulo con la cantidad de variedades. {count}: cantidad de productos en el catálogo. | `text` |  |  |
| `ui.catalog.allCategoryLabel` | Rótulo de todas las categorías (Catálogo) | Texto mostrado en la opción para ver todas las categorías. | `text` |  | Todos |
| `ui.toast.viewBasket` | Enlace para ver la canasta (Avisos emergentes) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.toast.removed` | Aviso al quitar un producto (Avisos emergentes) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.toast.cleared` | Aviso al vaciar la canasta (Avisos emergentes) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.toast.added` | Aviso al agregar (Avisos emergentes) | Mensaje emergente al agregar a la canasta. {product}: nombre del producto sumado. | `text` |  |  |
| `ui.bottomNav.catalog` | Catálogo (Barra inferior (celular)) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.bottomNav.cakes` | Tortas (Barra inferior (celular)) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  | Tortas |
| `ui.bottomNav.basket` | Canasta (Barra inferior (celular)) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.bottomNav.contact` | Contacto (Barra inferior (celular)) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.units.order` | Encargo (Unidades) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  | Encargo |
| `ui.units.unitTemplate` | Plantilla de unidad (Unidades) | Plantilla de formato para unidades de venta no listadas. {unit}: nombre de la unidad. | `text` |  |  |
| `ui.cart.title` | Título de canasta | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  | Tu canasta de delicias |
| `ui.cart.subtitleEmpty` | Subtítulo vacío (Canasta) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.clearTitle` | Ayuda de vaciar (Canasta) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.clear` | Botón vaciar (Canasta) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.closeLabel` | Etiqueta accesible de cerrar (Canasta) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.emptyTitle` | Título vacío (Canasta) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.emptyDescription` | Descripción vacía (Canasta) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `textarea` |  | ¡Pasá por el catálogo y descubrí los panes recién horneados, facturas caseras y tortas por encargo! |
| `ui.cart.emptyButton` | Botón vacío (Canasta) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.leadNoticeTitle` | Título del aviso de anticipación (Canasta) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.decreaseLabel` | Etiqueta accesible de restar (Canasta) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.increaseLabel` | Etiqueta accesible de sumar (Canasta) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.subtotal` | Subtotal (Canasta) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.shipping` | Envío (Canasta) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.shippingNote` | Nota de envío (Canasta) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.total` | Total (Canasta) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.totalNote` | Nota del total (Canasta) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.paymentNoteStart` | Aviso de pago (inicio) (Canasta) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.paymentNoteEmphasis` | Aviso de pago (destacado) (Canasta) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.paymentNoteEnd` | Aviso de pago (final) (Canasta) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.continue` | Botón continuar (Canasta) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.keepShopping` | Botón seguir comprando (Canasta) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.candleSummary` | Resumen de velita y bengalita (Canasta) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  | Con Velita + Bengalita |
| `ui.cart.subtitleFilled` | Subtítulo con productos (Canasta) | Subtítulo de la canasta con productos. {count}: cantidad de delicias seleccionadas. | `text` |  | {count} delicias horneadas preparadas con amor |
| `ui.cart.removeLabel` | Etiqueta accesible de eliminar (Canasta) | Texto accesible para quitar un producto. {name}: nombre del producto. | `text` |  |  |
| `ui.checkout.errors.name` | Nombre de errores del pedido | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.errors.phone` | Teléfono (Errores del pedido) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.errors.address` | Dirección (Errores del pedido) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.backLabel` | Etiqueta accesible de volver (Pedido) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.title` | Título de pedido | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.step` | Paso (Pedido) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.stepTitle` | Título del paso (Pedido) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.stepSubtitle` | Subtítulo del paso (Pedido) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.summaryHide` | Ocultar detalle (Pedido) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.summaryShow` | Ver detalle (Pedido) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.total` | Total (Pedido) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.sectionContact` | Sección de contacto (Pedido) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.nameLabel` | Campo nombre (Pedido) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.phoneLabel` | Campo teléfono (Pedido) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.phoneHelp` | Ejemplo para el campo de teléfono | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.sectionDelivery` | Sección de entrega (Pedido) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.sectionDate` | Sección de fecha (Pedido) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.dateLabel` | Campo día (Pedido) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.timeSlotLabel` | Campo franja horaria (Pedido) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.sectionNotes` | Sección de aclaraciones (Pedido) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.notesPlaceholder` | Ayuda del campo aclaraciones (Pedido) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  | Escribí notas sobre la dedicatoria o indicaciones... |
| `ui.checkout.previewTitle` | Título de la vista previa (Pedido) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.previewBadge` | Sello de la vista previa (Pedido) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.confirm` | Botón confirmar (Pedido) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.confirmNote` | Nota bajo el botón (Pedido) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.titleBadge` | Sello del título (Pedido) | Insignia decorativa del formulario. {name}: nombre de la marca. | `text` |  |  |
| `ui.checkout.itemsCount` | Cantidad de productos (Pedido) | Resumen de cantidad de artículos. {count}: cantidad total de delicias. | `text` |  | {count} delicias |
| `ui.checkout.leadTime` | Aviso de anticipación (Pedido) | Aviso de tiempo previo requerido en checkout. {hours}: horas de anticipación. | `text` |  |  |
| `ui.cartBar.label` | Etiqueta de barra de canasta | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cartBar.itemSingular` | Ítem (singular) (Barra de canasta) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cartBar.itemPlural` | Ítems (plural) (Barra de canasta) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cartBar.view` | Botón ver carrito (Barra de canasta) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.footer.hoursTitle` | Título de horarios (Pie de página) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.footer.addressTitle` | Título de dirección (Pie de página) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.footer.socialTitle` | Título de redes (Pie de página) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.footer.socialNote` | Nota de redes (Pie de página) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.footer.title` | Título de pie de página | Título principal del pie de página. {name}: nombre de la marca. | `text` |  |  |
| `ui.header.whatsappLabel` | Etiqueta accesible de WhatsApp (Encabezado) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.header.whatsappTitle` | Ayuda de WhatsApp (Encabezado) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.header.cartTitle` | Ayuda del carrito (Encabezado) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  | Ver canasta de delicias |
| `ui.header.navProducts` | Enlace productos (Encabezado) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.header.navCakes` | Enlace tortas (Encabezado) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  | Tortas por encargo |
| `ui.header.navHowToOrder` | Enlace cómo pedir (Encabezado) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.header.navContact` | Enlace contacto (Encabezado) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.header.cartLabel` | Etiqueta accesible del carrito (Encabezado) | Texto accesible del botón del carrito. {count}: cantidad de ítems. | `text` |  |  |
| `ui.productCard.specialOrder` | Encargo especial (Tarjeta de producto) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productCard.customize` | Botón personalizar (Tarjeta de producto) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productCard.added` | Aviso al agregar (Tarjeta de producto) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productCard.add` | Botón agregar (Tarjeta de producto) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productCard.priceLabel` | Etiqueta de precio (Tarjeta de producto) | Rótulo que acompaña al precio unitario. {unit}: unidad de medida del producto. | `text` |  |  |
| `ui.productDetail.dedicationDefault` | Dedicatoria por defecto (Ficha de producto) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  | ¡Feliz Cumple Mamá! |
| `ui.productDetail.backLabel` | Etiqueta accesible de volver (Ficha de producto) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.title` | Título de ficha de producto | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.whatsappLabel` | Etiqueta accesible de WhatsApp (Ficha de producto) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.favoriteBadge` | Sello de favorito (Ficha de producto) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.bakedToday` | Horneado en el día (Ficha de producto) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.bakedOnDemand` | Horneado a pedido (Ficha de producto) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.freshStock` | Stock fresco (Ficha de producto) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.freshness` | Garantía de frescura (Ficha de producto) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.sectionSize` | Sección de tamaño (Ficha de producto) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.required` | Obligatorio (Ficha de producto) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.included` | Incluido (Ficha de producto) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.sectionCustom` | Sección de personalización (Ficha de producto) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.optional` | Opcional (Ficha de producto) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.dedicationPlaceholder` | Ayuda del campo dedicatoria (Ficha de producto) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  | Ej: ¡Feliz Cumple Mamá! |
| `ui.productDetail.candlePackTitle` | Pack de velita (título) (Ficha de producto) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  | Pack Velita dorada + Bengalita artesanal |
| `ui.productDetail.candlePackNote` | Pack de velita (nota) (Ficha de producto) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  | Lista para encender y festejar |
| `ui.productDetail.sectionDate` | Sección de fecha (Ficha de producto) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.nearestSlot` | Turno más cercano (Ficha de producto) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.quantity` | Cantidad (Ficha de producto) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.quantityNote` | Nota de cantidad (Ficha de producto) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.decreaseLabel` | Etiqueta accesible de restar (Ficha de producto) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.increaseLabel` | Etiqueta accesible de sumar (Ficha de producto) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.addToOrder` | Botón agregar al pedido (Ficha de producto) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.askWhatsapp` | Botón consultar por WhatsApp (Ficha de producto) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.titleBadge` | Sello del título (Ficha de producto) | Insignia sobre el título en la ficha del producto. {name}: nombre de la marca. | `text` |  |  |
| `ui.productDetail.leadBadge` | Sello de anticipación (Ficha de producto) | Insignia de anticipación necesaria. {hours}: horas de anticipación requeridas. | `text` |  |  |
| `ui.productDetail.basePrice` | Precio base (Ficha de producto) | Rótulo del precio inicial sin agregados. {price}: precio base formateado. | `text` |  |  |
| `ui.productDetail.nearestSlotValue` | Turno más cercano (valor) (Ficha de producto) | Fecha y turno de entrega más cercano. {date}: día disponible, {slot}: franja horaria. | `text` |  |  |
| `ui.whatsapp.addressPending` | Dirección a confirmar (Mensajes de WhatsApp) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsapp.customerFallback` | Cliente sin nombre (Mensajes de WhatsApp) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsapp.notSpecified` | No especificado (Mensajes de WhatsApp) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsapp.consult` | Consulta general (Mensajes de WhatsApp) | Mensaje inicial de consulta por WhatsApp. {name}: nombre de la marca. | `text` |  |  |
| `ui.whatsapp.availability` | Consulta de disponibilidad (Mensajes de WhatsApp) | Consulta de disponibilidad horaria por WhatsApp. {name}: nombre de la marca. | `text` |  |  |
| `ui.whatsapp.cakeInquiry` | Consulta por una torta (Mensajes de WhatsApp) | Consulta sobre pedidos de tortas o encargos. {name}: nombre de la marca, {product}: nombre del producto. | `text` |  | ¡Hola {name}! Tengo una consulta sobre {product} por encargo. |
| `ui.whatsapp.orderTitle` | Título del pedido (Mensajes de WhatsApp) | Encabezado del pedido por WhatsApp. {name}: nombre de la marca. | `text` |  |  |
| `ui.whatsapp.customerLine` | Línea del cliente (Mensajes de WhatsApp) | Línea con nombre del cliente. {customer}: nombre y apellido. | `text` |  |  |
| `ui.whatsapp.phoneLine` | Línea del teléfono (Mensajes de WhatsApp) | Línea con teléfono de contacto. {phone}: número de WhatsApp. | `text` |  |  |
| `ui.whatsapp.modeLine` | Línea de modalidad (Mensajes de WhatsApp) | Línea con modalidad de entrega. {mode}: retiro o envío. | `text` |  |  |
| `ui.whatsapp.deliveryMode` | Modalidad envío (Mensajes de WhatsApp) | Detalle de envío a domicilio. {address}: dirección, {details}: piso/depto, {date}: día programado, {slot}: turno. | `text` |  |  |
| `ui.whatsapp.pickupMode` | Modalidad retiro (Mensajes de WhatsApp) | Detalle de retiro en mostrador. {date}: día programado, {slot}: turno. | `text` |  |  |
| `ui.whatsapp.itemLine` | Línea de producto (Mensajes de WhatsApp) | Línea de ítem del pedido. {quantity}: cantidad, {name}: nombre, {options}: opciones elegidas, {price}: subtotal. | `text` |  |  |
| `ui.whatsapp.deliveryLine` | Línea de envío (Mensajes de WhatsApp) | Línea de costo de envío. {price}: importe de envío. | `text` |  |  |
| `ui.whatsapp.noteLine` | Línea de nota (Mensajes de WhatsApp) | Línea de aclaraciones y notas especiales. {note}: notas o dedicatoria. | `text` |  |  |
| `ui.whatsapp.totalLine` | Línea del total (Mensajes de WhatsApp) | Línea de monto total estimado. {total}: total a abonar. | `text` |  |  |
| `ui.delivery.freeLabel` | Etiqueta de envío gratis | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Gratis |
| `howToOrder.title` | Título de cómo pedir | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | ¿Cómo hacer tu pedido? |
| `howToOrder.subtitle` | Subtítulo de cómo pedir | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Simple, rápido y con la cercanía que nos caracteriza desde hace 15 años. |
| `extras.candlePackPrice` | Precio del pack de velita y bengalita (Extras) | Valor numérico. | `number` |  |  |

## Catálogo de Productos y Categorías (catalog.json)

Definido en `src/data/catalog.schema.json` (origen de datos: `src/data/catalog.json`).

| Ruta | Título | Descripción | Widget | Asset | Ejemplo |
|---|---|---|---|---|---|
| `schemaVersion` | Versión del esquema | Versión de la estructura de datos del catálogo. | `number` |  |  |
| `categories[].id` | Identificador de categoría | Identificador único en minúsculas y separado por guiones. | `text` |  |  |
| `categories[].label` | Nombre visible de categoría | Texto mostrado en los botones y filtros del catálogo. | `text` |  |  |
| `units[].id` | Identificador de unidad | Clave que coincide con la unidad asignada a los productos (ej: docena, kilo, 500 grs). | `text` |  |  |
| `units[].cartLabel` | Rótulo en el carrito | Texto mostrado junto a la cantidad dentro de la canasta. | `text` |  |  |
| `units[].priceLabel` | Rótulo de precio en la tarjeta | Texto que acompaña al precio en la lista de productos (ej: Por docena). | `text` |  |  |
| `products[].id` | Identificador del producto | Identificador único en minúsculas y separado por guiones. | `text` |  |  |
| `products[].name` | Nombre del producto | Título principal visible en la tarjeta y en la ficha. | `text` |  |  |
| `products[].category` | Categoría asignada | Debe coincidir con el identificador de una categoría existente. | `select` |  |  |
| `products[].price` | Precio base | Monto en pesos argentinos sin recargos por opciones adicionales. | `number` |  |  |
| `products[].unit` | Unidad de venta | Unidad de medida asociada al producto (ej: unidad, docena, kilo, 500 grs). | `text` |  |  |
| `products[].images` | Imágenes del producto | Fotografías del producto. | `list` |  | path: /assets/products/{id}.jpg, minWidth: 1200px, ratio: 4:3, maxKB: 250KB |
| `products[].description` | Descripción del producto | Detalle sobre ingredientes, preparación o porciones. | `textarea` |  |  |
| `products[].badge` | Etiqueta destacada | Texto breve opcional mostrado sobre la imagen (ej: Recién salidas). | `text` |  |  |
| `products[].requiresLeadTime` | Requiere anticipación | Indica si el producto se elabora por encargo y precisa tiempo previo. | `boolean` |  |  |
| `products[].leadTimeHours` | Horas de anticipación | Cantidad mínima de horas requeridas para programar la entrega. | `number` |  |  |
| `products[].options[].id` | Identificador de opción | Clave única dentro de las opciones del producto. | `text` |  |  |
| `products[].options[].title` | Título visible de la opción | Encabezado mostrado al comprador. | `text` |  |  |
| `products[].options[].required` | Opción obligatoria | Si es obligatoria antes de agregar a la canasta. | `boolean` |  |  |
| `products[].options[].type` | Tipo de control | Formato de selección visual. | `select` |  |  |
| `products[].options[].choices[].id` | Identificador de la elección | Clave técnica de la variante. | `text` |  |  |
| `products[].options[].choices[].name` | Nombre de la elección | Texto mostrado al usuario. | `text` |  |  |
| `products[].options[].choices[].description` | Aclaración adicional | Detalle breve complementario. | `text` |  |  |
| `products[].options[].choices[].extraPrice` | Costo adicional | Importe en pesos que se suma al precio base (0 si no suma). | `number` |  |  |
| `products[].options[].choices[].isDefault` | Seleccionada por defecto | Indica si debe aparecer marcada inicialmente. | `boolean` |  |  |
| `products[].options[].placeholder` | Texto de ejemplo | Sugerencia mostrada en campos de texto libre. | `text` |  |  |
| `products[].options[].maxLength` | Longitud máxima | Cantidad tope de caracteres en campos de texto. | `number` |  |  |
| `products[].options[].extraPrice` | Costo adicional de opción directa | Recargo aplicable a opciones tipo checkbox sin opciones anidadas. | `number` |  |  |

