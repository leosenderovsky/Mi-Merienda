/* Types generated from src/data/catalog.schema.json. Do not edit by hand. */

/**
 * Versión de la estructura de datos del catálogo.
 */
export type VersionDelEsquema = 1;
/**
 * Identificador único en minúsculas y separado por guiones.
 */
export type IdentificadorDeCategoria = string;
/**
 * Texto mostrado en los botones y filtros del catálogo.
 */
export type NombreVisibleDeCategoria = string;
/**
 * Lista de categorías para clasificar los productos del catálogo.
 */
export type CategoriasDeProductos = Categoria[];
/**
 * Clave que coincide con la unidad asignada a los productos (ej: docena, kilo, 500 grs).
 */
export type IdentificadorDeUnidad = string;
/**
 * Texto mostrado junto a la cantidad dentro de la canasta.
 */
export type RotuloEnElCarrito = string;
/**
 * Texto que acompaña al precio en la lista de productos (ej: Por docena).
 */
export type RotuloDePrecioEnLaTarjeta = string;
/**
 * Unidades de medida disponibles con sus rótulos para la tarjeta y el carrito.
 */
export type UnidadesDeVenta = UnidadDeMedida[];
/**
 * Identificador único en minúsculas y separado por guiones.
 */
export type IdentificadorDelProducto = string;
/**
 * Título principal visible en la tarjeta y en la ficha.
 */
export type NombreDelProducto = string;
/**
 * Debe coincidir con el identificador de una categoría existente.
 */
export type CategoriaAsignada = string;
/**
 * Monto en pesos argentinos sin recargos por opciones adicionales.
 */
export type PrecioBase = number;
/**
 * Unidad de medida asociada al producto (ej: unidad, docena, kilo, 500 grs).
 */
export type UnidadDeVenta = string;
/**
 * Ruta en public/assets/products.
 */
export type RutaDeImagen = string;
/**
 * Fotografías del producto.
 */
export type ImagenesDelProducto = RutaDeImagen[];
/**
 * Detalle sobre ingredientes, preparación o porciones.
 */
export type DescripcionDelProducto = string;
/**
 * Texto breve opcional mostrado sobre la imagen (ej: Recién salidas).
 */
export type EtiquetaDestacada = string;
/**
 * Indica si el producto se elabora por encargo y precisa tiempo previo.
 */
export type RequiereAnticipacion = boolean;
/**
 * Cantidad mínima de horas requeridas para programar la entrega.
 */
export type HorasDeAnticipacion = number;
/**
 * Clave única dentro de las opciones del producto.
 */
export type IdentificadorDeOpcion = string;
/**
 * Encabezado mostrado al comprador.
 */
export type TituloVisibleDeLaOpcion = string;
/**
 * Si es obligatoria antes de agregar a la canasta.
 */
export type OpcionObligatoria = boolean;
/**
 * Formato de selección visual.
 */
export type TipoDeControl = "radio" | "checkbox" | "text";
/**
 * Clave técnica de la variante.
 */
export type IdentificadorDeLaEleccion = string;
/**
 * Texto mostrado al usuario.
 */
export type NombreDeLaEleccion = string;
/**
 * Detalle breve complementario.
 */
export type AclaracionAdicional = string;
/**
 * Importe en pesos que se suma al precio base (0 si no suma).
 */
export type CostoAdicional = number;
/**
 * Indica si debe aparecer marcada inicialmente.
 */
export type SeleccionadaPorDefecto = boolean;
/**
 * Lista de alternativas para opciones de tipo radio o selección.
 */
export type EleccionesDisponibles = Eleccion[];
/**
 * Sugerencia mostrada en campos de texto libre.
 */
export type TextoDeEjemplo = string;
/**
 * Cantidad tope de caracteres en campos de texto.
 */
export type LongitudMaxima = number;
/**
 * Recargo aplicable a opciones tipo checkbox sin opciones anidadas.
 */
export type CostoAdicionalDeOpcionDirecta = number;
/**
 * Grupos de personalización disponibles para el cliente.
 */
export type OpcionesYVariantes = OpcionDeProducto[];
/**
 * Todos los productos ofrecidos en el catálogo.
 */
export type ListadoDeProductos = Producto[];

/**
 * Configuración del catálogo de productos, categorías y unidades de venta.
 */
export interface CatalogConfig {
  /**
   * Ruta al esquema JSON.
   */
  $schema?: string;
  schemaVersion: VersionDelEsquema;
  categories: CategoriasDeProductos;
  units: UnidadesDeVenta;
  products: ListadoDeProductos;
}
/**
 * Información de una categoría de producto.
 */
export interface Categoria {
  id: IdentificadorDeCategoria;
  label: NombreVisibleDeCategoria;
}
/**
 * Definición de rótulos para una unidad de producto.
 */
export interface UnidadDeMedida {
  id: IdentificadorDeUnidad;
  cartLabel: RotuloEnElCarrito;
  priceLabel: RotuloDePrecioEnLaTarjeta;
}
/**
 * Detalle de un producto individual.
 */
export interface Producto {
  id: IdentificadorDelProducto;
  name: NombreDelProducto;
  category: CategoriaAsignada;
  price: PrecioBase;
  unit: UnidadDeVenta;
  images: ImagenesDelProducto;
  description: DescripcionDelProducto;
  badge?: EtiquetaDestacada;
  requiresLeadTime?: RequiereAnticipacion;
  leadTimeHours?: HorasDeAnticipacion;
  options?: OpcionesYVariantes;
}
/**
 * Configuración de una variante u opción.
 */
export interface OpcionDeProducto {
  id: IdentificadorDeOpcion;
  title: TituloVisibleDeLaOpcion;
  required: OpcionObligatoria;
  type: TipoDeControl;
  choices?: EleccionesDisponibles;
  placeholder?: TextoDeEjemplo;
  maxLength?: LongitudMaxima;
  extraPrice?: CostoAdicionalDeOpcionDirecta;
}
/**
 * Detalle de una variante puntual.
 */
export interface Eleccion {
  id: IdentificadorDeLaEleccion;
  name: NombreDeLaEleccion;
  description?: AclaracionAdicional;
  extraPrice: CostoAdicional;
  isDefault?: SeleccionadaPorDefecto;
}
