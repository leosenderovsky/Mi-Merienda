# Diccionario de Campos Editables

Este documento lista todos los campos editables del archivo `src/data/brand.json` definidos en `src/data/brand.schema.json`.

| Ruta | Título | Descripción | Widget | Asset | Ejemplo |
|---|---|---|---|---|---|
| `schemaVersion` | versión del esquema | Valor numérico. | `number` |  |  |
| `site` | identificador del sitio | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `brand.name` | Marca: nombre | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Mi Merienda |
| `brand.tagline` | Marca: frase de la marca | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Horneando momentos felices desde 2009 |
| `brand.subtagline` | Marca: subfrase | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Panadería & Pastelería Artesanal de Barrio |
| `brand.logoUrl` | Marca: archivo del logo | Ruta pública de la imagen (carpeta public/assets). | `image` |  |  |
| `brand.favicon32Url` | Marca: favicon | Ruta pública de la imagen (carpeta public/assets). | `image` |  |  |
| `brand.appleTouchIconUrl` | Marca: ícono Apple | Ruta pública de la imagen (carpeta public/assets). | `image` |  |  |
| `brand.badgeHeroKicker` | Marca: sello del hero | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Tradición y cariño de barrio |
| `brand.faviconCrop.left` | Recorte del favicon: izquierda | Valor numérico. | `number` |  |  |
| `brand.faviconCrop.top` | Recorte del favicon: arriba | Valor numérico. | `number` |  |  |
| `brand.faviconCrop.width` | Recorte del favicon: ancho | Valor numérico. | `number` |  |  |
| `brand.faviconCrop.height` | Recorte del favicon: alto | Valor numérico. | `number` |  |  |
| `typography.displayFont` | Tipografías: fuente de títulos | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `typography.bodyFont` | Tipografías: fuente de texto | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `typography.stylesheetUrl` | Tipografías: hoja de fuentes | Dirección web completa (https://…). | `url` |  |  |
| `theme.primary` | Colores: color principal | Color en formato #RRGGBB. | `color` |  |  |
| `theme.primaryContainer` | Colores: contenedor principal | Color en formato #RRGGBB. | `color` |  |  |
| `theme.primaryFixed` | Colores: principal claro | Color en formato #RRGGBB. | `color` |  |  |
| `theme.onPrimaryContainer` | Colores: texto sobre contenedor principal | Color en formato #RRGGBB. | `color` |  |  |
| `theme.secondary` | Colores: color secundario | Color en formato #RRGGBB. | `color` |  |  |
| `theme.secondaryContainer` | Colores: contenedor secundario | Color en formato #RRGGBB. | `color` |  |  |
| `theme.secondaryFixed` | Colores: secundario claro | Color en formato #RRGGBB. | `color` |  |  |
| `theme.onSecondaryFixed` | Colores: texto sobre secundario claro | Color en formato #RRGGBB. | `color` |  |  |
| `theme.onSecondaryContainer` | Colores: texto sobre contenedor secundario | Color en formato #RRGGBB. | `color` |  |  |
| `theme.secondaryEmphasis` | Colores: secundario de énfasis | Color en formato #RRGGBB. | `color` |  |  |
| `theme.surface` | Colores: fondo de página | Color en formato #RRGGBB. | `color` |  |  |
| `theme.surfaceContainer` | Colores: contenedor | Color en formato #RRGGBB. | `color` |  |  |
| `theme.surfaceContainerLow` | Colores: contenedor bajo | Color en formato #RRGGBB. | `color` |  |  |
| `theme.surfaceContainerHigh` | Colores: contenedor alto | Color en formato #RRGGBB. | `color` |  |  |
| `theme.surfaceContainerHighest` | Colores: contenedor máximo | Color en formato #RRGGBB. | `color` |  |  |
| `theme.onSurface` | Colores: texto principal | Color en formato #RRGGBB. | `color` |  |  |
| `theme.onSurfaceVariant` | Colores: texto secundario | Color en formato #RRGGBB. | `color` |  |  |
| `theme.outline` | Colores: borde | Color en formato #RRGGBB. | `color` |  |  |
| `theme.outlineVariant` | Colores: borde suave | Color en formato #RRGGBB. | `color` |  |  |
| `theme.tertiary` | Colores: color terciario | Color en formato #RRGGBB. | `color` |  |  |
| `theme.tertiaryContainer` | Colores: contenedor terciario | Color en formato #RRGGBB. | `color` |  |  |
| `theme.tertiaryFixed` | Colores: terciario claro | Color en formato #RRGGBB. | `color` |  |  |
| `theme.onTertiaryFixed` | Colores: texto sobre terciario claro | Color en formato #RRGGBB. | `color` |  |  |
| `theme.tertiaryMuted` | Colores: terciario apagado | Color en formato #RRGGBB. | `color` |  |  |
| `theme.error` | Colores: error | Color en formato #RRGGBB. | `color` |  |  |
| `theme.errorContainer` | Colores: contenedor de error | Color en formato #RRGGBB. | `color` |  |  |
| `contact.whatsappNumber` | Contacto: número de WhatsApp (solo dígitos) | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `contact.whatsappDisplay` | Contacto: whatsApp visible | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | +54 9 11 4521-8890 |
| `contact.phonePlaceholder` | Contacto: ayuda del campo teléfono | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | +54 9 11 ... |
| `contact.customerNamePlaceholder` | Contacto: ayuda del campo nombre | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Ej: Valeria Gómez |
| `contact.addressPlaceholder` | Contacto: ayuda del campo dirección | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Calle y altura (ej: Thames 1840) |
| `contact.addressDetailPlaceholder` | Contacto: ayuda del campo piso/depto | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Piso / Depto / Timbre (ej: 4to B) |
| `contact.instagramHandle` | Contacto: usuario de Instagram | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | @mimerienda.panaderia |
| `contact.instagramUrl` | Contacto: enlace de Instagram | Dirección web completa (https://…). | `url` |  |  |
| `contact.address` | Contacto: dirección | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Av. San Martín 2840, Barrio Norte |
| `contact.city` | Contacto: ciudad | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Buenos Aires |
| `contact.scheduleWeekday` | Contacto: horario de atención | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Martes a Domingo: 07:30 a 20:00 hs |
| `contact.scheduleNote` | Contacto: nota de horarios | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Lunes cerrado por descanso de horno |
| `contact.closedWeekdays` | Contacto: días cerrados (0 = domingo … 6 = sábado) | Lista editable. | `list` |  |  |
| `delivery.pickup.title` | Retiro en el local: título | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Retiro en el local |
| `delivery.pickup.price` | Retiro en el local: precio | Valor numérico. | `number` |  |  |
| `delivery.pickup.label` | Retiro en el local: etiqueta | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Gratis |
| `delivery.pickup.description` | Retiro en el local: descripción | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Av. San Martín 2840 • Horario a convenir |
| `delivery.delivery.title` | Envío a domicilio: título | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Envío en el barrio |
| `delivery.delivery.price` | Envío a domicilio: precio | Valor numérico. | `number` |  |  |
| `delivery.delivery.label` | Envío a domicilio: etiqueta | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | +$1.500 |
| `delivery.delivery.description` | Envío a domicilio: descripción | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Reparto seguro en bicicleta y auto térmico |
| `delivery.timeSlots` | Entrega: franjas horarias | Lista editable. | `list` |  |  |
| `delivery.leadNoticeCake` | Entrega: aviso de anticipación para tortas | Texto editable. Dejalo vacío para ocultar el elemento. | `textarea` |  | Tu pedido incluye productos del día y una torta artesanal por encargo que requiere 48 hs de anticipación. |
| `hero.kicker` | Hero: sobretítulo | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Tradición y cariño de barrio |
| `hero.title` | Hero: título | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | El sabor del barrio, horneado con amor cada mañana |
| `hero.description` | Hero: descripción | Texto editable. Dejalo vacío para ocultar el elemento. | `textarea` |  | Panadería y pastelería artesanal. Productos frescos del día y pedidos especiales por encargo para tus momentos dulces. |
| `hero.ctaPrimary` | Hero: botón principal | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Ver catálogo del día |
| `hero.ctaSecondary` | Hero: botón secundario | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Atención por WhatsApp |
| `hero.badges[].text` | Sellos del hero: texto | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Hornadas cada 2 hs |
| `hero.badges[].icon` | Sellos del hero: ícono | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | local_fire_department |
| `hero.badges[].style` | Sellos del hero: estilo | Texto editable. Dejalo vacío para ocultar el elemento. | `icon` |  | secondary |
| `hero.heroImage` | Hero: imagen del hero | Ruta pública de la imagen (carpeta public/assets). | `image` |  |  |
| `hero.imageAlt` | Hero: texto alternativo de la imagen | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Panes artesanos y medialunas recién horneadas |
| `orderSteps[].step` | Pasos para pedir: paso | Valor numérico. | `number` |  |  |
| `orderSteps[].title` | Pasos para pedir: título | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Elegí tus favoritos |
| `orderSteps[].description` | Pasos para pedir: descripción | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Seleccioná facturas del día o programá tortas con anticipación de 48hs. |
| `disclaimer.footerNote` | Leyenda del pie: nota del pie | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Hecho con masa madre, harina orgánica y dedicación artesanal. |
| `disclaimer.demoBadge` | Leyenda de demostración | Texto base de prototipo. El sitio lo completa con el nombre del servicio (no se edita en brand.json). | `textarea` |  | Marca, productos y precios de ejemplo — prototipo de demostración |
| `demo.showPrototypeBanner` | Demostración: mostrar aviso de prototipo | Activa o desactiva este elemento. | `boolean` |  |  |
| `demo.prefillCheckout` | Demostración: precargar datos del checkout | Activa o desactiva este elemento. | `boolean` |  |  |
| `demo.checkoutDefaults.name` | Demostración: nombre | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `demo.checkoutDefaults.address` | Demostración: dirección | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `demo.checkoutDefaults.addressDetail` | Demostración: piso / depto | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `demo.checkoutDefaults.notes` | Demostración: notas | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `storage.cartKey` | Almacenamiento: clave del carrito en el navegador | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `seo.titleSuffix` | SEO y redes: sufijo del título | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Panadería & Pastelería |
| `seo.description` | SEO y redes: descripción | Texto editable. Dejalo vacío para ocultar el elemento. | `textarea` |  | Panadería y pastelería artesanal Mi Merienda. Productos frescos del día y pedidos especiales por encargo. |
| `seo.socialImage` | SEO y redes: imagen para redes | Ruta pública de la imagen (carpeta public/assets). | `image` |  |  |
| `ui.catalog.emptyCategory` | Catálogo: mensaje de categoría vacía | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.viewAll` | Catálogo: botón ver todos | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.title` | Catálogo: título | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.countLabel` | Catálogo: contador de variedades | Texto con variables que el sitio reemplaza solo: {count}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.toast.viewBasket` | Avisos emergentes: enlace para ver la canasta | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.toast.removed` | Avisos emergentes: aviso al quitar un producto | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.toast.cleared` | Avisos emergentes: aviso al vaciar la canasta | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.toast.added` | Avisos emergentes: aviso al agregar | Texto con variables que el sitio reemplaza solo: {product}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.bottomNav.catalog` | Barra inferior (celular): catálogo | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.bottomNav.cakes` | Barra inferior (celular): tortas | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.bottomNav.basket` | Barra inferior (celular): canasta | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.bottomNav.contact` | Barra inferior (celular): contacto | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.units.order` | Unidades: encargo | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.units.dozen` | Unidades: docena | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.units.kilo` | Unidades: 1 kilo | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.units.halfKilo` | Unidades: medio kilo | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.units.perDozen` | Unidades: por docena | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.units.perKilo` | Unidades: por kilo | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.units.perHalfKilo` | Unidades: por medio kilo | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.units.unitTemplate` | Unidades: plantilla de unidad | Texto con variables que el sitio reemplaza solo: {unit}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.title` | Canasta: título | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.subtitleEmpty` | Canasta: subtítulo vacío | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.clearTitle` | Canasta: ayuda de vaciar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.clear` | Canasta: botón vaciar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.closeLabel` | Canasta: etiqueta accesible de cerrar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.emptyTitle` | Canasta: título vacío | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.emptyDescription` | Canasta: descripción vacía | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `textarea` |  |  |
| `ui.cart.emptyButton` | Canasta: botón vacío | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.leadNoticeTitle` | Canasta: título del aviso de anticipación | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.decreaseLabel` | Canasta: etiqueta accesible de restar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.increaseLabel` | Canasta: etiqueta accesible de sumar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.subtotal` | Canasta: subtotal | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.shipping` | Canasta: envío | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.shippingNote` | Canasta: nota de envío | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.total` | Canasta: total | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.totalNote` | Canasta: nota del total | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.paymentNoteStart` | Canasta: aviso de pago (inicio) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.paymentNoteEmphasis` | Canasta: aviso de pago (destacado) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.paymentNoteEnd` | Canasta: aviso de pago (final) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.continue` | Canasta: botón continuar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.keepShopping` | Canasta: botón seguir comprando | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.candleSummary` | Canasta: resumen de velita y bengalita | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.subtitleFilled` | Canasta: subtítulo con productos | Texto con variables que el sitio reemplaza solo: {count}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.removeLabel` | Canasta: etiqueta accesible de eliminar | Texto con variables que el sitio reemplaza solo: {name}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.errors.name` | Errores del pedido: nombre | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.errors.phone` | Errores del pedido: teléfono | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.errors.address` | Errores del pedido: dirección | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.backLabel` | Pedido: etiqueta accesible de volver | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.title` | Pedido: título | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.step` | Pedido: paso | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.stepTitle` | Pedido: título del paso | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.stepSubtitle` | Pedido: subtítulo del paso | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.summaryHide` | Pedido: ocultar detalle | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.summaryShow` | Pedido: ver detalle | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.deliveryLine` | Pedido: línea de envío | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.total` | Pedido: total | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.sectionContact` | Pedido: sección de contacto | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.nameLabel` | Pedido: campo nombre | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.phoneLabel` | Pedido: campo teléfono | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.phoneHelp` | Pedido: ayuda del teléfono | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.sectionDelivery` | Pedido: sección de entrega | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.sectionDate` | Pedido: sección de fecha | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.dateLabel` | Pedido: campo día | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.timeSlotLabel` | Pedido: campo franja horaria | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.sectionNotes` | Pedido: sección de aclaraciones | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.notesPlaceholder` | Pedido: ayuda del campo aclaraciones | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.previewTitle` | Pedido: título de la vista previa | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.previewBadge` | Pedido: sello de la vista previa | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.confirm` | Pedido: botón confirmar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.confirmNote` | Pedido: nota bajo el botón | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.titleBadge` | Pedido: sello del título | Texto con variables que el sitio reemplaza solo: {name}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.itemsCount` | Pedido: cantidad de productos | Texto con variables que el sitio reemplaza solo: {count}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.leadTime` | Pedido: aviso de anticipación | Texto con variables que el sitio reemplaza solo: {hours}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cartBar.label` | Barra de canasta: etiqueta | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cartBar.itemSingular` | Barra de canasta: ítem (singular) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cartBar.itemPlural` | Barra de canasta: ítems (plural) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cartBar.view` | Barra de canasta: botón ver carrito | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.footer.hoursTitle` | Pie de página: título de horarios | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.footer.addressTitle` | Pie de página: título de dirección | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.footer.socialTitle` | Pie de página: título de redes | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.footer.socialNote` | Pie de página: nota de redes | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.footer.title` | Pie de página: título | Texto con variables que el sitio reemplaza solo: {name}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.header.whatsappLabel` | Encabezado: etiqueta accesible de WhatsApp | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.header.whatsappTitle` | Encabezado: ayuda de WhatsApp | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.header.cartTitle` | Encabezado: ayuda del carrito | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.header.navProducts` | Encabezado: enlace productos | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.header.navCakes` | Encabezado: enlace tortas | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.header.navHowToOrder` | Encabezado: enlace cómo pedir | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.header.navContact` | Encabezado: enlace contacto | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.header.cartLabel` | Encabezado: etiqueta accesible del carrito | Texto con variables que el sitio reemplaza solo: {count}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productCard.specialOrder` | Tarjeta de producto: encargo especial | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productCard.customize` | Tarjeta de producto: botón personalizar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productCard.added` | Tarjeta de producto: aviso al agregar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productCard.add` | Tarjeta de producto: botón agregar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productCard.priceLabel` | Tarjeta de producto: etiqueta de precio | Texto con variables que el sitio reemplaza solo: {unit}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.dedicationDefault` | Ficha de producto: dedicatoria por defecto | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.backLabel` | Ficha de producto: etiqueta accesible de volver | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.title` | Ficha de producto: título | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.whatsappLabel` | Ficha de producto: etiqueta accesible de WhatsApp | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.favoriteBadge` | Ficha de producto: sello de favorito | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.bakedToday` | Ficha de producto: horneado en el día | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.bakedOnDemand` | Ficha de producto: horneado a pedido | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.freshStock` | Ficha de producto: stock fresco | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.freshness` | Ficha de producto: garantía de frescura | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.sectionSize` | Ficha de producto: sección de tamaño | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.required` | Ficha de producto: obligatorio | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.included` | Ficha de producto: incluido | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.sectionCustom` | Ficha de producto: sección de personalización | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.optional` | Ficha de producto: opcional | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.dedicationPlaceholder` | Ficha de producto: ayuda del campo dedicatoria | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.candlePackTitle` | Ficha de producto: pack de velita (título) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.candlePackNote` | Ficha de producto: pack de velita (nota) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.sectionDate` | Ficha de producto: sección de fecha | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.nearestSlot` | Ficha de producto: turno más cercano | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.quantity` | Ficha de producto: cantidad | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.quantityNote` | Ficha de producto: nota de cantidad | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.decreaseLabel` | Ficha de producto: etiqueta accesible de restar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.increaseLabel` | Ficha de producto: etiqueta accesible de sumar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.addToOrder` | Ficha de producto: botón agregar al pedido | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.askWhatsapp` | Ficha de producto: botón consultar por WhatsApp | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.titleBadge` | Ficha de producto: sello del título | Texto con variables que el sitio reemplaza solo: {name}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.leadBadge` | Ficha de producto: sello de anticipación | Texto con variables que el sitio reemplaza solo: {hours}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.basePrice` | Ficha de producto: precio base | Texto con variables que el sitio reemplaza solo: {price}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.nearestSlotValue` | Ficha de producto: turno más cercano (valor) | Texto con variables que el sitio reemplaza solo: {date}, {slot}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsapp.addressPending` | Mensajes de WhatsApp: dirección a confirmar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsapp.customerFallback` | Mensajes de WhatsApp: cliente sin nombre | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsapp.notSpecified` | Mensajes de WhatsApp: no especificado | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsapp.consult` | Mensajes de WhatsApp: consulta general | Texto con variables que el sitio reemplaza solo: {name}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsapp.availability` | Mensajes de WhatsApp: consulta de disponibilidad | Texto con variables que el sitio reemplaza solo: {name}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsapp.cakeInquiry` | Mensajes de WhatsApp: consulta por una torta | Texto con variables que el sitio reemplaza solo: {name}, {product}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsapp.orderTitle` | Mensajes de WhatsApp: título del pedido | Texto con variables que el sitio reemplaza solo: {name}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsapp.customerLine` | Mensajes de WhatsApp: línea del cliente | Texto con variables que el sitio reemplaza solo: {customer}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsapp.phoneLine` | Mensajes de WhatsApp: línea del teléfono | Texto con variables que el sitio reemplaza solo: {phone}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsapp.modeLine` | Mensajes de WhatsApp: línea de modalidad | Texto con variables que el sitio reemplaza solo: {mode}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsapp.deliveryMode` | Mensajes de WhatsApp: modalidad envío | Texto con variables que el sitio reemplaza solo: {address}, {details}, {date}, {slot}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsapp.pickupMode` | Mensajes de WhatsApp: modalidad retiro | Texto con variables que el sitio reemplaza solo: {date}, {slot}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsapp.itemLine` | Mensajes de WhatsApp: línea de producto | Texto con variables que el sitio reemplaza solo: {quantity}, {name}, {options}, {price}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsapp.deliveryLine` | Mensajes de WhatsApp: línea de envío | Texto con variables que el sitio reemplaza solo: {price}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsapp.noteLine` | Mensajes de WhatsApp: línea de nota | Texto con variables que el sitio reemplaza solo: {note}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsapp.totalLine` | Mensajes de WhatsApp: línea del total | Texto con variables que el sitio reemplaza solo: {total}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `howToOrder.title` | Cómo pedir: título | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | ¿Cómo hacer tu pedido? |
| `howToOrder.subtitle` | Cómo pedir: subtítulo | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Simple, rápido y con la cercanía que nos caracteriza desde hace 15 años. |
| `extras.candlePackPrice` | Extras: precio del pack de velita y bengalita | Valor numérico. | `number` |  |  |
