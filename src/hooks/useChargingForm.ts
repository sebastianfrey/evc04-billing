import { useForm } from "@tanstack/react-form";
import { ChargingInfo } from "../models/chargingCore";
import { FilterMatchMode } from "primereact/api";

const defaultValues: ChargingInfo = {
  title: 'Ladevorgänge vom 01.04.2024 - 30.04.2024',
  address: {
    name: 'Sebastian Frey',
    street: 'Wöllingerstraße',
    houseNumber: '26',
    zipCode: '85643',
    city: 'Steinhöring',
  },
  wallbox: {
    name: "E.ON Drive vBox smart view",
    manufacturer: "Vestel",
    typeName: "EVC04-E11-WDM-S",
  },
  electricity: {
    grossPrice: 0.31,
    netPrice: 0.26,
  },
  allSessions: null,
  sessions: [],
  filters: {
    cardId: { value: null, matchMode: FilterMatchMode.CONTAINS },
    startTime: { value: null, matchMode: FilterMatchMode.DATE_AFTER },
    stopTime: { value: null, matchMode: FilterMatchMode.DATE_BEFORE },
  },
};

export function useChargingForm() {
  const form = useForm({
    defaultValues,
  });

  return form;
}

export type UseChargingForm = ReturnType<typeof useChargingForm>;
