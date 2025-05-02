import { ChargingSession } from "../models/chargingCore";
import { startOfDay, endOfDay, lastDayOfMonth, startOfMonth, isAfter, isBefore } from "date-fns";

export function isWithinMonth(session: ChargingSession, month: Date) {
  const firstDay = startOfDay(startOfMonth(month));
  const lastDay = endOfDay(lastDayOfMonth(month));
  const isWithin = isAfter(session.startTime, firstDay) && isBefore(session.startTime, lastDay);
  return isWithin;
}

export function isRfidCard(session: ChargingSession, rfid: string) {
  return !rfid || session.cardId === rfid;
}