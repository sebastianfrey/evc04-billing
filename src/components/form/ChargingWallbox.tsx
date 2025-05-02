import { InputText } from "primereact/inputtext";
import { ChargingFormApi } from "../../hooks/useChargingForm";
import { Box } from "../../layout/Box";
import { Fieldset } from "primereact/fieldset";

export interface ChargingWallboxProps {
  form: ChargingFormApi;
}

export function ChargingWallbox(props: ChargingWallboxProps) {
  const { form } = props;

  if (!form.state.values.allSessions) {
    return null;
  }

  return (
    <Fieldset legend="Wallbox">
      <Box className="flex flex-column gap-2">
        <form.Field
          name="wallbox.name"
          children={(field) => (
            <div className="flex flex-column gap-2">
              <label htmlFor={field.name}>Name</label>
              <InputText
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        />
        <form.Field
          name="wallbox.manufacturer"
          children={(field) => (
            <div className="flex flex-column gap-2">
              <label htmlFor={field.name}>Hersteller</label>
              <InputText
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        />
        <form.Field
          name="wallbox.typeName"
          children={(field) => (
            <div className="flex flex-column gap-2">
              <label htmlFor={field.name}>Modellbezeichnung</label>
              <InputText
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        />
      </Box>
    </Fieldset>
  );
}
