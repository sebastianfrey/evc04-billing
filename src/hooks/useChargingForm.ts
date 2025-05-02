import { useForm } from "@tanstack/react-form";
import { ChargingInfo } from "../models/chargingCore";

const today = new Date();

const defaultValues: ChargingInfo = {
  invoiceMonth: today,
  rfid: '',
  address: {
    name: "Sebastian Frey",
    street: "Wöllingerstraße",
    houseNumber: "26",
    zipCode: "85643",
    city: "Steinhöring",
  },
  wallbox: {
    name: "E.ON Drive vBox smart view",
    manufacturer: "Vestel",
    typeName: "EVC04-E11-WDM-S",
  },
  electricity: {
    grossPrice: 35.55,
    netPrice: 29.87,
  },
  allSessions: null,
  allRfids: null,
  sessions: [],
};

export function useChargingForm() {
  const form = useForm({
    defaultValues,
  });

  return form;
}

export type ChargingFormApi = ReturnType<typeof useChargingForm>;
