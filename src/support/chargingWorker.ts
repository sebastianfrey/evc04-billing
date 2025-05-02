
import ChargingWorker from "../workers/ChargingWorker.js?worker";
import * as Comlink from "comlink";
import type { ChargingWorkerApi } from "../workers/ChargingWorker";

export const chargingWorker = Comlink.wrap<ChargingWorkerApi>(new ChargingWorker());
