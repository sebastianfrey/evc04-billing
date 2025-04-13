import { format } from "date-fns";

export function formatDate(date: Date) {
  return format(date, "dd.MM.yyyy");
}

export function formatEnergy(energy: number) {
  return energy.toFixed(2);
}

export function formatPrice(price: number, unit = '€') {
  return `${(Math.round(price * 100 ) / 100).toFixed(2)} ${unit}`
}

export function calculatePrice(units: number, pricePerUnit: number) {
  return (units * pricePerUnit) / 100
}