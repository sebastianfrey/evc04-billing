import { Page, Document, StyleSheet, View, Text } from "@react-pdf/renderer";
import { ChargingInfo, ChargingSession } from "../models/chargingCore";
import { Table } from "./table/Table";
import { TableHeader } from "./table/TableHeader";
import { TableCell } from "./table/TableCell";
import { TableBody } from "./table/TableBody";
import { TableRow } from "./table/TableRow";
import { format } from "date-fns";
import { formatEnergy, formatPrice } from "../support/chargingFormatUtils";
import { calculatePrice } from "../support/chargingCalcUtils";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "white",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

export interface ChargingBillProps {
  chargingInfo: ChargingInfo;
}

// Create Document Component
export const ChargingBill = (props: ChargingBillProps) => {
  const { chargingInfo } = props;

  const title = chargingInfo.title;
  const address = chargingInfo.address;
  const sessions = chargingInfo.sessions;
  const netPrice = chargingInfo.electricity.netPrice;
  const grossPrice = chargingInfo.electricity.grossPrice;

  const totalEnergySum = sessions.reduce(
    (sum, session) => sum + session.totalEnergy,
    0
  );
  const netSum = calculatePrice(totalEnergySum, netPrice);
  const grossSum = calculatePrice(totalEnergySum, grossPrice);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={{ fontSize: 16, marginBottom: 20 }}>{title}</Text>
          <Table style={{ marginBottom: 20 }}>
            <TableBody>
              <TableRow>
                <TableCell style={{ width: 350 }}></TableCell>
                <TableCell style={{ width: 200, fontWeight: "bold" }}>
                  Adresse
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ width: 350 }}></TableCell>
                <TableCell>{address.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ width: 350 }}></TableCell>
                <TableCell>
                  {`${address.street} ${address.houseNumber}`}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ width: 350 }}></TableCell>
                <TableCell>{`${address.zipCode} ${address.city}`}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Table style={{ marginBottom: 20 }}>
            <TableBody>
              <TableRow>
                <TableCell style={{ width: 150, fontWeight: "bold" }}>
                  Wallbox
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ width: 150 }}>Name</TableCell>
                <TableCell style={{ width: 200 }}>
                  {chargingInfo.wallbox.name}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ width: 150 }}>Hersteller</TableCell>
                <TableCell style={{ width: 200 }}>
                  {chargingInfo.wallbox.manufacturer}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ width: 150 }}>Modellbezeichnung</TableCell>
                <TableCell style={{ width: 200 }}>
                  {chargingInfo.wallbox.typeName}
                </TableCell>
              </TableRow>
              <TableRow style={{ marginTop: 10 }}>
                <TableCell style={{ width: 150, fontWeight: "bold" }}>
                  Strompreis
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ width: 150 }}>Netto</TableCell>
                <TableCell>{formatPrice(netPrice, "€/kWh")}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ width: 150 }}>Brutto</TableCell>
                <TableCell>{formatPrice(grossPrice, "€/kWh")}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Table>
            <TableHeader>
              <TableCell style={{ width: 30 }}>Nr.</TableCell>
              <TableCell style={{ flexGrow: 2 }}>Datum</TableCell>
              <TableCell style={{ width: 60, textAlign: "right" }}>
                Menge
              </TableCell>
              <TableCell style={{ width: 60, textAlign: "right" }}>
                Einheit
              </TableCell>
              <TableCell style={{ width: 90, textAlign: "right" }}>
                Nettobetrag
              </TableCell>
              <TableCell style={{ width: 90, textAlign: "right" }}>
                Umsatzsteuer
              </TableCell>
              <TableCell style={{ width: 90, textAlign: "right" }}>
                Bruttobetrag
              </TableCell>
            </TableHeader>
            <TableBody>
              {sessions.map((session, index) => {
                const net = calculatePrice(session.totalEnergy, netPrice);
                const gross = calculatePrice(session.totalEnergy, grossPrice);
                return (
                  <TableRow key={session.sessionId}>
                    <TableCell style={{ width: 30 }}>{index + 1}</TableCell>
                    <TableCell style={{ flexGrow: 2 }}>
                      {format(session.startTime, "dd.MM.yyyy")}
                    </TableCell>
                    <TableCell style={{ width: 60, textAlign: "right" }}>
                      {formatEnergy(session.totalEnergy)}
                    </TableCell>
                    <TableCell style={{ width: 60, textAlign: "right" }}>
                      kWh
                    </TableCell>
                    <TableCell style={{ width: 90, textAlign: "right" }}>
                      {formatPrice(net)}
                    </TableCell>
                    <TableCell style={{ width: 90, textAlign: "right" }}>
                      {formatPrice(gross - net)}
                    </TableCell>
                    <TableCell style={{ width: 90, textAlign: "right" }}>
                      {formatPrice(gross)}
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow style={{ marginTop: 10, fontWeight: "bold" }}>
                <TableCell style={{ flexGrow: 1, textAlign: "right" }}>
                  Gesamt
                </TableCell>
                <TableCell style={{ width: 90, textAlign: "right" }}>
                  {formatPrice(netSum)}
                </TableCell>
                <TableCell style={{ width: 90, textAlign: "right" }}>
                  {formatPrice(grossSum - netSum)}
                </TableCell>
                <TableCell style={{ width: 90, textAlign: "right" }}>
                  {formatPrice(grossSum)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </View>
      </Page>
    </Document>
  );
};
