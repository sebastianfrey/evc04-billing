import csv from "papaparse";
import { ChargingSession, ChargingSessionSchema } from "../models/chargingCore";

export function parseSessions(data: string) {
  return new Promise<ChargingSession[]>((resolve, reject) => {
    const results = csv.parse<any>(data, {
      delimiter: ',',
      escapeChar: '"',
      header: true,
      skipEmptyLines: true,
    });
    if (results.errors?.length > 0) {
      console.error(results);
      reject(new Error("CSV Error"));
    }
    resolve(
      results.data.map((session) => {
        for (const key of Object.keys(session)) {
          const sanitizedKey = key
            .replace(/\(in kWh\)/gi, "")
            .replace(/\s/g, "_")
            .toLowerCase();
          session[sanitizedKey] = session[key];
          delete session[key];
        }
        return ChargingSessionSchema.parse(session);
      })
    );
  });
}
