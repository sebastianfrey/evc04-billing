import { ChargingInfo } from "../../models/chargingCore";
import { calculatePrice } from "../../support/chargingCalcUtils";
import {
  formatDate,
  formatEnergy,
  formatPrice,
} from "../../support/chargingFormatUtils";
import { Table } from "../table/Table";
import { TableBody } from "../table/TableBody";
import { TableCell } from "../table/TableCell";
import { TableHeader } from "../table/TableHeader";
import { TableRow } from "../table/TableRow";

export interface InvoiceTableProps {
  chargingInfo: ChargingInfo;
}

export function InvoiceTable(props: InvoiceTableProps) {
  const { chargingInfo } = props;

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
    <Table>
      <TableHeader>
        <TableCell style={{ width: 30 }}>Nr.</TableCell>
        <TableCell style={{ flexGrow: 2 }}>Datum</TableCell>
        <TableCell style={{ width: 60, textAlign: "right" }}>Menge</TableCell>
        <TableCell style={{ width: 60, textAlign: "right" }}>Einheit</TableCell>
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
                {formatDate(session.startTime)}
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
  );
}
