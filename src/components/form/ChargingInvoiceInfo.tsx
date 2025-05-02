import { InputText } from "primereact/inputtext";
import { ChargingFormApi } from "../../hooks/useChargingForm";
import { Fieldset } from "primereact/fieldset";
import { Box } from "../../layout/Box";
import { Calendar } from "primereact/calendar";
import { getMonthAndYear } from "../../support/chargingFormatUtils";
import { isRfidCard, isWithinMonth } from "../../support/chargingFilterUtils";
import { ChargingProtocolOverview } from "./ChargingProtocolOverview";
import { Dropdown } from "primereact/dropdown";

export interface ChargingInvoiceTitleProps {
  form: ChargingFormApi;
}

export function ChargingInvoiceInfo(props: ChargingInvoiceTitleProps) {
  const { form } = props;

  if (!form.state.values.allSessions) {
    return null;
  }

  return (
    <Fieldset legend="Allgemein">
      <Box className="flex flex-column gap-2">
        <form.Field
          name="invoiceMonth"
          children={(field) => (
            <div className="flex flex-column gap-2">
              <label htmlFor={field.name}>Abrechnungsmonat</label>
              <Calendar
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => {
                  const invoiceMonth = e.value;
                  field.handleChange(invoiceMonth);
                  const allSessions = field.form.state.values.allSessions;
                  const rfid = field.form.state.values.rfid;
                  if (allSessions && invoiceMonth) {
                    const filteredSessions = allSessions.filter((session) => {
                      return (
                        isWithinMonth(session, invoiceMonth) &&
                        isRfidCard(session, rfid)
                      );
                    });
                    field.form.setFieldValue("sessions", filteredSessions);
                  }
                }}
                view="month"
                dateFormat="mm/yy"
              />
            </div>
          )}
        />
        <form.Field
          name="rfid"
          children={(field) => (
            <div className="flex flex-column gap-2">
              <label htmlFor={field.name}>RFID-Karte</label>
              <Dropdown
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => {
                  const rfid = e.value;
                  field.handleChange(rfid);
                  const allSessions = field.form.state.values.allSessions;
                  const invoiceMonth = field.form.state.values.invoiceMonth;
                  if (allSessions && invoiceMonth) {
                    const filteredSessions = allSessions.filter((session) => {
                      return (
                        isWithinMonth(session, invoiceMonth) &&
                        isRfidCard(session, rfid)
                      );
                    });
                    field.form.setFieldValue("sessions", filteredSessions);
                  }
                }}
                options={
                  field.form.state.values.allRfids?.map((rfid) => rfid.value) ??
                  []
                }
                showClear
                placeholder="RFID-Karte"
              />
     {/*          <InputText
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => {
                  const rfid = e.target.value;
                  field.handleChange(rfid);
                  const allSessions = field.form.state.values.allSessions;
                  const invoiceMonth = field.form.state.values.invoiceMonth;
                  if (allSessions && invoiceMonth) {
                    const filteredSessions = allSessions.filter((session) => {
                      return (
                        isWithinMonth(session, invoiceMonth) &&
                        isRfidCard(session, rfid)
                      );
                    });
                    field.form.setFieldValue("sessions", filteredSessions);
                  }
                }}
              /> */}
            </div>
          )}
        />
        <ChargingProtocolOverview form={form} />
      </Box>
    </Fieldset>
  );
}
