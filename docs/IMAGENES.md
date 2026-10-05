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
