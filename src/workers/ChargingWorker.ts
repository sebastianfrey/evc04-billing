import * as Comlink from "comlink";

import { parseSessions } from "../support/chargingParserUtils";

const ChargingWorker = {
  parseSessions,
};

Comlink.expose(ChargingWorker);

export type ChargingWorkerApi = typeof ChargingWorker;
