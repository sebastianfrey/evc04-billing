import { Fieldset } from "primereact/fieldset";
import { Box } from "../../layout/Box";
import { ChargingFormApi } from "../../hooks/useChargingForm";
import { InputText } from "primereact/inputtext";

export interface ChargingAddressProps {
  form: ChargingFormApi;
}

export function ChargingAddress(props: ChargingAddressProps) {
  const { form } = props;

  if (!form.state.values.allSessions) {
    return null;
  }

  return (
    <Fieldset legend="Adresse">
      <Box className="flex flex-column gap-2">
        <form.Field
          name="address.name"
          children={(field) => (
            <div className="flex flex-column gap-2">
              <label htmlFor={field.name}>Vollständiger Name</label>
              <InputText
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        />
        <Box className="flex flex-row gap-2">
          <form.Field
            name="address.street"
            children={(field) => (
              <div className="flex flex-column gap-2 flex-grow-1">
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
            name="address.houseNumber"
            children={(field) => (
              <div className="flex flex-column gap-2" style={{ width: 100 }}>
                <label htmlFor={field.name}>Hausnummer</label>
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
        <Box className="flex flex-row gap-2">
          <form.Field
            name="address.zipCode"
            children={(field) => (
              <div className="flex flex-column gap-2" style={{ width: 100 }}>
                <label htmlFor={field.name}>Postleitzahl</label>
                <InputText
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  style={{ width: 100 }}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          />
          <form.Field
            name="address.city"
            children={(field) => (
              <div className="flex flex-column gap-2 flex-grow-1">
                <label htmlFor={field.name}>Ort</label>
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
      </Box>
    </Fieldset>
  );
}
