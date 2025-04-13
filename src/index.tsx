import "./index.css";
import ReactDOM from "react-dom/client";
import { PDFViewer } from "@react-pdf/renderer";
import { ChargingBill } from "./components/ChargingBill";
import { ChargingSession } from "./models/chargingCore";

const sessions: ChargingSession[] = [
  {
    sessionId: "de2be45a-1794-11f0-8bf2-ecbe5f33b899",
    cardId: "a",
    connectorId: "1",
    startTime: new Date("2025-04-12T09:54:19.000Z"),
    stopTime: new Date("2025-04-12T09:55:14.000Z"),
    status: "Stopped",
    initialEnergy: 0.03,
    lastEnergy: 0.15,
    totalEnergy: 0.12,
  },
  {
    sessionId: "1020acfc-1795-11f0-8bf2-ecbe5f33b899",
    cardId: "a",
    connectorId: "1",
    startTime: new Date("2025-04-12T09:55:43.000Z"),
    stopTime: new Date("2025-04-12T09:56:03.000Z"),
    status: "Stopped",
    initialEnergy: 0.16,
    lastEnergy: 0.18,
    totalEnergy: 0.02,
  },
  {
    sessionId: "2e81f890-1795-11f0-8bf2-ecbe5f33b899",
    cardId: "a",
    connectorId: "1",
    startTime: new Date("2025-04-12T09:56:34.000Z"),
    stopTime: new Date("2025-04-12T10:00:27.000Z"),
    status: "Stopped",
    initialEnergy: 0.18,
    lastEnergy: 0.87,
    totalEnergy: 0.69,
  },
  {
    sessionId: "717d1df4-1796-11f0-b288-ecbe5f33b899",
    cardId: "a",
    connectorId: "1",
    startTime: new Date("2025-04-12T10:05:36.000Z"),
    stopTime: new Date("2025-04-12T10:06:27.000Z"),
    status: "Stopped",
    initialEnergy: 0.87,
    lastEnergy: 0.99,
    totalEnergy: 0.12,
  },
  {
    sessionId: "9518630e-1796-11f0-b288-ecbe5f33b899",
    cardId: "a",
    connectorId: "1",
    startTime: new Date("2025-04-12T10:06:36.000Z"),
    stopTime: new Date("2025-04-12T10:06:48.000Z"),
    status: "Stopped",
    initialEnergy: 0.99,
    lastEnergy: 0.99,
    totalEnergy: 0,
  },
  {
    sessionId: "0da47740-1797-11f0-b288-ecbe5f33b899",
    cardId: "a",
    connectorId: "1",
    startTime: new Date("2025-04-12T10:09:58.000Z"),
    stopTime: new Date("2025-04-12T10:10:38.000Z"),
    status: "Stopped",
    initialEnergy: 0.99,
    lastEnergy: 1.08,
    totalEnergy: 0.09,
  },
  {
    sessionId: "a02b5f84-1797-11f0-b288-ecbe5f33b899",
    cardId: "a",
    connectorId: "1",
    startTime: new Date("2025-04-12T10:14:04.000Z"),
    stopTime: new Date("2025-04-12T10:14:24.000Z"),
    status: "Stopped",
    initialEnergy: 1.08,
    lastEnergy: 1.09,
    totalEnergy: 0.01,
  },
  {
    sessionId: "2d5c9dc8-1798-11f0-b288-ecbe5f33b899",
    cardId: "a",
    connectorId: "1",
    startTime: new Date("2025-04-12T10:18:01.000Z"),
    stopTime: new Date("2025-04-12T10:18:26.000Z"),
    status: "Stopped",
    initialEnergy: 1.1,
    lastEnergy: 1.14,
    totalEnergy: 0.04,
  },
  {
    sessionId: "265e18b6-1799-11f0-b288-ecbe5f33b899",
    cardId: "b",
    connectorId: "1",
    startTime: new Date("2025-04-12T10:24:58.000Z"),
    stopTime: new Date("2025-04-12T10:25:24.000Z"),
    status: "Stopped",
    initialEnergy: 1.14,
    lastEnergy: 1.18,
    totalEnergy: 0.04,
  },
  {
    sessionId: "3d9b101a-1799-11f0-b288-ecbe5f33b899",
    cardId: "c",
    connectorId: "1",
    startTime: new Date("2025-04-12T10:25:37.000Z"),
    stopTime: new Date("2025-04-12T12:29:23.000Z"),
    status: "Stopped",
    initialEnergy: 1.18,
    lastEnergy: 23.9,
    totalEnergy: 22.72,
  },
  {
    sessionId: "3d9b1015-1799-11f0-b288-ecbe5f33b899",
    cardId: "c",
    connectorId: "1",
    startTime: new Date("2025-05-12T13:25:37.000Z"),
    stopTime: new Date("2025-05-12T16:29:23.000Z"),
    status: "Stopped",
    initialEnergy: 1.18,
    lastEnergy: 35.9,
    totalEnergy: 33.55,
  },
];

const App = () => (
  <div style={{ width: 1000, height: "100%", margin: "auto" }}>
    <PDFViewer width="100%" height="100%" style={{ border: 0 }}>
      <ChargingBill sessions={sessions} netPrice={26.05} grossPrice={30.99} />
    </PDFViewer>
  </div>
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLDivElement
);

root.render(<App />);
