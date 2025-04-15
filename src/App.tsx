import "./index.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeflex/primeflex.css";
import sample from "./data/sample.sessions.json";

import ReactDOM from "react-dom/client";
import { PDFViewer } from "@react-pdf/renderer";
import { ChargingBill } from "./components/ChargingBill";
import { ChargingSession, ChargingSessionSchema } from "./models/chargingCore";
import { PrimeReactProvider } from "primereact/api";
import { ChargingForm } from "./components/ChargingForm";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { useChargingForm } from "./hooks/useChargingForm";

const sessions = sample.sessions.map((session) => ({
  ...session,
  startTime: new Date(session.startTime),
  stopTime: new Date(session.stopTime),
})) as ChargingSession[];

export function App() {
  const chargingForm = useChargingForm();

  return (
    <PrimeReactProvider>
      <Splitter style={{ height: "100%", width: "100%" }}>
        <SplitterPanel className="flex align-items-center justify-content-center">
          <ChargingForm form={chargingForm} />
        </SplitterPanel>
        <SplitterPanel className="flex align-items-center justify-content-center">
          <chargingForm.Subscribe
            children={(state) => (
              <PDFViewer width="100%" height="100%" style={{ border: 0 }} key={JSON.stringify(state.values)}>
                <ChargingBill chargingInfo={state.values} />
              </PDFViewer>
            )}
          ></chargingForm.Subscribe>
        </SplitterPanel>
      </Splitter>
    </PrimeReactProvider>
  );
}
