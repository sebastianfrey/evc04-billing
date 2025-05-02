import { ChargingInfo } from "../../models/chargingCore";
import { Table } from "../table/Table";
import { TableBody } from "../table/TableBody";
import { TableCell } from "../table/TableCell";
import { TableRow } from "../table/TableRow";

export interface AddressInfoProps {
  charingInfo: ChargingInfo;
}

export function AddressInfo(props: AddressInfoProps) {
  const { charingInfo } = props;

  const address = charingInfo.address;

  return (
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
          <TableCell>{`${address.street} ${address.houseNumber}`}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ width: 350 }}></TableCell>
          <TableCell>{`${address.zipCode} ${address.city}`}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
