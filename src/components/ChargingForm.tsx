import classes from "./ChargingForm.module.css";
import { Box } from "../layout/Box";
import { ChargingFormApi } from "../hooks/useChargingForm";
import { ChargingAddress } from "./form/ChargingAddress";
import { ChargingElectricityPrices } from "./form/ChargingElectricityPrices";
import { ChargingWallbox } from "./form/ChargingWallbox";
import { ChargingInvoiceInfo } from "./form/ChargingInvoiceInfo";
import { ChargingProtocolUpload } from "./form/ChargingProtocolUpload";
import { getMonthAndYear } from "../support/chargingFormatUtils";

export interface ChargingFormProps {
  form: ChargingFormApi;
}

export function ChargingForm(props: ChargingFormProps) {
  const { form } = props;

  return (
    <form
      className={`${classes.root} ${classes.stack}`}
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <Box className={classes.stack}>
        <form.Subscribe
          children={() => (
            <>
              <h1>
                Ladekostenabrechnung{" "}
                {getMonthAndYear(form.state.values.invoiceMonth)}
              </h1>
              <ChargingProtocolUpload form={form} />
              <ChargingInvoiceInfo form={form} />
              <ChargingAddress form={form} />
              <ChargingElectricityPrices form={form} />
              <ChargingWallbox form={form} />
            </>
          )}
        ></form.Subscribe>
      </Box>
    </form>
  );
}
