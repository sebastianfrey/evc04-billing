import { FileUpload } from "primereact/fileupload";
import { ChargingFormApi } from "../../hooks/useChargingForm";
import { Message } from "primereact/message";
import { chargingWorker } from "../../support/chargingWorker";
import { isRfidCard, isWithinMonth } from "../../support/chargingFilterUtils";

export interface ChargingProtocolUploadProps {
  form: ChargingFormApi;
}

export function ChargingProtocolUpload(props: ChargingProtocolUploadProps) {
  const { form } = props;

  return (
    <form.Field
      name="sessions"
      children={(field) => (
        <div className="flex flex-column gap-2">
          {!field.form.state.values.allSessions && (
            <FileUpload
              auto
              name={field.name}
              chooseLabel="Ladeprotokoll auswählen"
              cancelLabel="Abbrechen"
              uploadLabel="Hochladen"
              id={field.name}
              accept="text/csv"
              emptyTemplate={
                <Message
                  severity="info"
                  text="Ladeprotokoll hochladen"
                  style={{ width: "100%" }}
                />
              }
              customUpload
              uploadHandler={async (event) => {
                const file = event.files[0];
                const csv = await file.text();

                const { allSessions, allRfids } =
                  await chargingWorker.parseSessions(csv);

                field.form.setFieldValue("allSessions", allSessions);
                field.form.setFieldValue("allRfids", allRfids);

                const invoiceMonth = field.form.state.values.invoiceMonth;
                const rfid = field.form.state.values.rfid;

                const sessions = allSessions.filter((session) => {
                  return (
                    isWithinMonth(session, invoiceMonth) &&
                    isRfidCard(session, rfid)
                  );
                });
                field.handleChange(sessions);
              }}
            />
          )}
        </div>
      )}
    />
  );
}
