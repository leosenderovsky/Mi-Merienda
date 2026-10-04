# Imágenes de productos

Cada producto debe usar una foto gastronómica en formato 4:3, de al menos
1600x1200 px, sin texto ni elementos de interfaz. El archivo debe conservar el
mismo nombre declarado en el catálogo del producto y ubicarse en
`public/assets/products/`.

Ejecutá `npm run check:images` para ver dimensiones, peso y advertencias por
baja resolución, duplicados, proporción incorrecta o archivos faltantes del
catálogo. Las advertencias no hacen fallar el comando. Para usarlo como control
estricto y obtener un código de salida distinto de cero ante advertencias,
ejecutá `npm run check:images:strict`.
