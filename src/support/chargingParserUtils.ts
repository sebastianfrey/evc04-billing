import csv from "papaparse";
import {
  ChargingRfid,
  ChargingRfidSchema,
  ChargingSession,
  ChargingSessionSchema,
} from "../models/chargingCore";

export function parseSessions(data: string) {
  return new Promise<{
    allSessions: ChargingSession[];
    allRfids: ChargingRfid[];
  }>((resolve, reject) => {
    const results = csv.parse<any>(data, {
      delimiter: ",",
      escapeChar: '"',
      header: true,
      skipEmptyLines: true,
    });
    if (results.errors?.length > 0) {
      console.error(results);
      reject(new Error("CSV Error"));
    }

    const rfids = new Set<string>();

    const allSessions = results.data.map((session) => {
      for (const key of Object.keys(session)) {
        const sanitizedKey = key
          .replace(/\(in kWh\)/gi, "")
          .replace(/\s/g, "_")
          .toLowerCase();
        session[sanitizedKey] = session[key];
        delete session[key];
      }
      const parsedSession = ChargingSessionSchema.parse(session);
      rfids.add(parsedSession.cardId);
      return parsedSession;
    })
    .filter((session) => session.totalEnergy > 1);

    const allRfids = Array.from(rfids).map((rfid) => {
      return ChargingRfidSchema.parse({
        value: rfid,
        label: rfid,
      });
    });

    resolve({ allSessions, allRfids });
  });
}
