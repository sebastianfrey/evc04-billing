import { Fieldset } from "primereact/fieldset";
import { ChargingFormApi } from "../../hooks/useChargingForm";
import { Box } from "../../layout/Box";
import { InputNumber } from "primereact/inputnumber";

export interface ChargingElectricityPricesProps {
  form: ChargingFormApi;
}

export function ChargingElectricityPrices(props: ChargingElectricityPricesProps) {
  const { form } = props;

  if (!form.state.values.allSessions) {
    return null;
  }

  return (
    <Fieldset legend="Strompreis">
      <Box className="flex flex-column gap-2">
        <form.Field
          name="electricity.netPrice"
          children={(field) => (
            <div className="flex flex-column gap-2 flex-grow-1">
              <label htmlFor={field.name}>Netto</label>
              <InputNumber
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.value ?? 0)}
                mode="decimal"
                suffix=" ct"
              />
            </div>
          )}
        />
        <form.Field
          name="electricity.grossPrice"
          children={(field) => (
            <div className="flex flex-column gap-2 flex-grow-1">
              <label htmlFor={field.name}>Brutto</label>
              <InputNumber
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.value ?? 0)}
                mode="decimal"
                suffix=" ct"
              />
            </div>
          )}
        />
      </Box>
    </Fieldset>
  );
}
