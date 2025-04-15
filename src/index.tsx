import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeflex/primeflex.css";
import "./index.css";

import ReactDOM from "react-dom/client";
import { App } from "./App";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLDivElement
);

root.render(<App />);
