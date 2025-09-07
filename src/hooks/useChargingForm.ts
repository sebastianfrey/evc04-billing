import { useForm } from "@tanstack/react-form";
import { ChargingInfo } from "../models/chargingCore";
import { getEnv } from "../support/envUtils";

const ENV_ADDRESS_NAME_KEY = 'VITE_APP_ADDRESS_NAME';
const ENV_ADDRESS_STREET_KEY = 'VITE_APP_ADDRESS_STREET';
const ENV_ADDRESS_HOUSE_NUMBER_KEY = 'VITE_APP_ADDRESS_HOUSE_NUMBER';
const ENV_ADDRESS_ZIP_CODE_KEY = 'VITE_APP_ADDRESS_ZIP_CODE';
const ENV_ADDRESS_CITY_KEY = 'VITE_APP_ADDRESS_CITY';

const ENV_ELECTRICITY_GROSS_PRICE = 'VITE_APP_ELECTRICITY_GROSS_PRICE';
const ENV_ELECTRICITY_NET_PRICE = 'VITE_APP_ELECTRICITY_NET_PRICE';

const today = new Date();

const defaultValues: ChargingInfo = {
  invoiceMonth: today,
  rfid: '',
  address: {
    name: getEnv({ key: ENV_ADDRESS_NAME_KEY, as: 'string', defaultValue: '' }),
    street: getEnv({ key: ENV_ADDRESS_STREET_KEY, as: 'string', defaultValue: '' }),
    houseNumber: getEnv({ key: ENV_ADDRESS_HOUSE_NUMBER_KEY, as: 'string', defaultValue: '' }),
    zipCode: getEnv({ key: ENV_ADDRESS_ZIP_CODE_KEY, as: 'string', defaultValue: '' }),
    city: getEnv({ key: ENV_ADDRESS_CITY_KEY, as: 'string', defaultValue: '' }),
  },
  wallbox: {
    name: "E.ON Drive vBox smart view",
    manufacturer: "Vestel",
    typeName: "EVC04-E11-WDM-S",
  },
  electricity: {
    grossPrice: getEnv({ key: ENV_ELECTRICITY_GROSS_PRICE, as: 'number', defaultValue: 0.0 }),
    netPrice: getEnv({ key: ENV_ELECTRICITY_NET_PRICE, as: 'number', defaultValue: 0.0 }),
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
