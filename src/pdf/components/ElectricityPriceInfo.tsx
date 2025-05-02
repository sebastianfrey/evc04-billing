import { ChargingInfo } from "../../models/chargingCore";
import { formatPrice } from "../../support/chargingFormatUtils";
import { Table } from "../table/Table";
import { TableBody } from "../table/TableBody";
import { TableCell } from "../table/TableCell";
import { TableRow } from "../table/TableRow";

export interface ElectricityPriceInfoProps {
  chargingInfo: ChargingInfo;
}

export function ElectricityPriceInfo(props: ElectricityPriceInfoProps) {
  const { chargingInfo } = props;

  const netPrice = chargingInfo.electricity.netPrice;
  const grossPrice = chargingInfo.electricity.grossPrice;

  return (
    <Table style={{ marginBottom: 20 }}>
      <TableBody>
        <TableRow>
          <TableCell style={{ width: 350 }}></TableCell>
          <TableCell style={{ fontWeight: "bold" }}>Strompreis</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ width: 350 }}></TableCell>
          <TableCell style={{ width: 100 }}>Netto</TableCell>
          <TableCell>{formatPrice(netPrice, "ct/kWh")}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ width: 350 }}></TableCell>
          <TableCell style={{ width: 100 }}>Brutto</TableCell>
          <TableCell>{formatPrice(grossPrice, "ct/kWh")}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
