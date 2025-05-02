import fs from "fs";
import csv from "csv-parser";
import { ChargingInvoice } from "./pdf/ChargingInvoice";
import { renderToFile } from "@react-pdf/renderer";
import { ChargingSession, ChargingSessionSchema } from "./models/chargingCore";

function loadChargingSessions(filePath: string) {
  const results: ChargingSession[] = [];
  return new Promise<ChargingSession[]>((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(
        csv({
          mapHeaders: ({ header }) => {
            return header
              .replace(/\(in kWh\)/gi, "")
              .replace(/\s/g, "_")
              .toLowerCase();
          },
        })
      )
      .on("data", (data) => {
        if (Object.keys(data).length === 0) {
          return;
        }
        results.push(ChargingSessionSchema.parse(data));
      })
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

loadChargingSessions("./data/FullSessionLogs.csv").then((sessions) => {
  console.info(sessions);
  return renderToFile(
    <ChargingInvoice sessions={sessions} netPrice={26.05} grossPrice={30.99} />,
    `bill.pdf`
  );
});
