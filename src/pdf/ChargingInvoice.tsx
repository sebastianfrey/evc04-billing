import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { ChargingInfo } from "../models/chargingCore";
import {
  getMonthAndYear
} from "../support/chargingFormatUtils";
import { AddressInfo } from "./components/AddressInfo";
import { ElectricityPriceInfo } from "./components/ElectricityPriceInfo";
import { InvoiceInfo } from "./components/InvoiceInfo";
import { InvoicePeriod } from "./components/InvoicePeriod";
import { InvoiceTable } from "./components/InvoiceTable";

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
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

export interface ChargingInvoiceProps {
  chargingInfo: ChargingInfo;
}

// Create Document Component
export const ChargingInvoice = (props: ChargingInvoiceProps) => {
  const { chargingInfo } = props;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={{ fontSize: 14, marginBottom: 20 }}>
            Ladekostenabrechnung {getMonthAndYear(chargingInfo.invoiceMonth)}
          </Text>
          <AddressInfo charingInfo={chargingInfo} />
          <ElectricityPriceInfo chargingInfo={chargingInfo} />
          <InvoiceInfo />
          <InvoicePeriod chargingInfo={chargingInfo} />
          <InvoiceTable chargingInfo={chargingInfo} />
        </View>
        <View style={styles.pageNumber} fixed>
          <Text
            style={{ marginBottom: 5 }}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
          />
          <Text>
            Wallbox: {chargingInfo.wallbox.name} |{" "}
            Hersteller: {chargingInfo.wallbox.manufacturer} |{" "}
            Typ: {chargingInfo.wallbox.typeName}
          </Text>
        </View>
      </Page>
    </Document>
  );
};
