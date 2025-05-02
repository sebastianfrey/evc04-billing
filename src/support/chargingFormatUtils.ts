import { format, lastDayOfMonth, startOfMonth } from "date-fns";

const dateTimeFormatter = new Intl.DateTimeFormat("de-DE", {
  month: 'long',
  year: 'numeric',
});

export function formatDate(date: Date) {
  return format(date, "dd.MM.yyyy");
}

export function formatInvoicePeriod(date: Date) {
  const fromDate = formatDate(startOfMonth(date));
  const toDate = formatDate(lastDayOfMonth(date));
  return `${fromDate} - ${toDate}`;
}

export function getMonthAndYear(date: Date) {
  return dateTimeFormatter.format(date);
}

export function formatEnergy(energy: number) {
  return energy.toFixed(2);
}

export function formatPrice(price: number, unit = '€') {
  return `${(Math.round(price * 100 ) / 100).toFixed(2)} ${unit}`
}
