# Imágenes de productos

Cada producto debe usar una foto gastronómica en formato 4:3, de al menos
1600x1200 px, sin texto ni elementos de interfaz. El archivo debe conservar el
mismo nombre declarado en el catálogo del producto y ubicarse en
`public/assets/products/`.

Las dimensiones de todas las imágenes en `public/assets/` se generan
automáticamente en `src/generated/imageDimensions.json`. Al agregar o
reemplazar imágenes no hace falta modificar medidas a mano: `npm run dev` y
`npm run build` actualizan el archivo automáticamente. También podés generarlo
manualmente con `npm run generate:image-dimensions`.

Ejecutá `npm run check:images` para ver dimensiones, peso y advertencias por
baja resolución, duplicados, proporción incorrecta o archivos faltantes del
catálogo, además de advertir si las dimensiones generadas están desactualizadas.
Las advertencias no hacen fallar el comando. Para usarlo como control estricto
y obtener un código de salida distinto de cero ante advertencias, ejecutá
`npm run check:images:strict`.

Para actualizar los íconos de marca a partir de `public/assets/logo/logo.png`,
ejecutá `npm run make:icons`. `npm run check:icons` comprueba que los archivos
generados estén actualizados y que el ícono de Apple sea opaco y de 180x180.

`npm run logo:optimize` conserva una copia del original en `.image-originals/`
(no versionada) y optimiza el logo PNG para el encabezado, con un máximo de
800 px de ancho y 120 KB.

`npm run make:og` recorta el centro de `public/assets/hero/hero-1.jpg` para
generar `public/assets/misc/og-image.jpg` de 1200x630 y hasta 200 KB, usado en
la vista previa de enlaces.
