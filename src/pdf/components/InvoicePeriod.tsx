import { Text, View } from "@react-pdf/renderer";
import { ChargingInfo } from "../../models/chargingCore";
import { formatInvoicePeriod } from "../../support/chargingFormatUtils";

export interface InvoicePeriodProps {
  chargingInfo: ChargingInfo;
}

export function InvoicePeriod(props: InvoicePeriodProps) {
  const { chargingInfo } = props;

  const invoiceMonth = chargingInfo.invoiceMonth;
  return (
    <View style={{ fontSize: 12, display: "flex", flexDirection: "row", marginBottom: 20, marginTop: 10 }}>
      <Text style={{ fontWeight: "bold", width: 150 }}>Abrechnungszeitraum:</Text>
      <Text>{formatInvoicePeriod(invoiceMonth)}</Text>
    </View>
  );
}
