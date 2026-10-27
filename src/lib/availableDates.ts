import { brandConfig } from '../brand.config';

export interface AvailableDate {
  /** Valor ISO local (AAAA-MM-DD). */
  value: string;
  /** Texto corto para mostrar (por ejemplo, "Vie 30/10"). */
  label: string;
}

/**
 * Próximos 10 días en los que el local atiende, a partir del primer día posible según el
 * tiempo de anticipación (en horas) del pedido. Los días cerrados salen de contact.closedWeekdays.
 */
export const getAvailableDates = (leadTimeHours: number): AvailableDate[] => {
  const firstDate = new Date();
  firstDate.setHours(0, 0, 0, 0);
  firstDate.setDate(firstDate.getDate() + Math.ceil(leadTimeHours / 24));

  return Array.from({ length: 10 }, (_, index) => {
    const date = new Date(firstDate);
    date.setDate(firstDate.getDate() + index);
    return date;
  })
    .filter(date => !brandConfig.contact.closedWeekdays.includes(date.getDay()))
    .map(date => {
      const weekday = new Intl.DateTimeFormat('es-AR', { weekday: 'short' })
        .format(date)
        .replace('.', '');
      const label = `${weekday.charAt(0).toUpperCase()}${weekday.slice(1)} ${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}`;

      return {
        value: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`,
        label,
      };
    });
};
