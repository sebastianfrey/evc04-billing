/* *****************************************************************************
 *
 * Copyright (c) 2025 by M.O.S.S. Computer Grafik Systeme GmbH
 *                        Hohenbrunner Weg 13
 *                        D-82024 Taufkirchen
 *                        http://www.moss.de
 *
 * Created: 13.04.2025
 * Author: sfrey
 *
 *******************************************************************************
 */

import z from "zod";

const DateFromStringPreprocessor = z.preprocess((arg) => {
  if (typeof arg === "string") {
    return new Date(arg);
  }
  throw new Error("Expected string");
}, z.date());

const NumberFromStringPreprocessor = z.preprocess(
  (arg) => Number(arg),
  z.number()
);

export const ChargingSessionSchema = z
  .object({
    sessionuuid: z.string(),
    authorization_card_id: z.string(),
    start_time: DateFromStringPreprocessor,
    stop_time: DateFromStringPreprocessor,
    total_time: z.string(),
    connector_id: z.string(),
    status: z.string(),
    initial_energy: NumberFromStringPreprocessor,
    last_energy: NumberFromStringPreprocessor,
    total_energy: NumberFromStringPreprocessor,
  })
  .transform((dto) => ({
    sessionId: dto.sessionuuid,
    cardId: dto.authorization_card_id,
    connectorId: dto.connector_id,
    startTime: dto.start_time,
    stopTime: dto.stop_time,
    status: dto.status,
    initialEnergy: dto.initial_energy,
    lastEnergy: dto.last_energy,
    totalEnergy: dto.total_energy,
  }));

export type ChargingSession = z.infer<typeof ChargingSessionSchema>;
