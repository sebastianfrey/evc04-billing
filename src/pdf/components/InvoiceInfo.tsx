import { Text, View } from "@react-pdf/renderer";
import { formatDate } from "../../support/chargingFormatUtils";
import { Table } from "../table/Table";
import { TableBody } from "../table/TableBody";
import { TableRow } from "../table/TableRow";
import { TableCell } from "../table/TableCell";

const today = new Date();

export function InvoiceInfo() {
  return (
    <Table style={{ marginBottom: 20 }}>
      <TableBody>
        <TableRow>
          <TableCell style={{ width: 350 }}></TableCell>
          <TableCell style={{ width: 100, fontWeight: "bold" }}>
            Abgerufen am:
          </TableCell>
          <TableCell>{formatDate(today)}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
