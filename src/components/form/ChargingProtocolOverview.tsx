import { useField } from "@tanstack/react-form";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { ChargingSession } from "../../models/chargingCore";
import { formatDate } from "../../support/chargingFormatUtils";
import { ChargingFormApi } from "../../hooks/useChargingForm";
import { Box } from "../../layout/Box";

export interface ChargingProtocolOverviewProps {
  form: ChargingFormApi;
}

export function ChargingProtocolOverview({
  form,
}: ChargingProtocolOverviewProps) {
  const field = useField({ form, name: "sessions" });

  if (!field.form.state.values.allSessions) {
    return null;
  }

  return (
    <Box style={{ height: 500 }} className="flex gap-2 flex-column">
      <label>Ladeprotokoll</label>
      <DataTable
        value={field.form.state.values.sessions}
        tableStyle={{ minWidth: "100%" }}
        scrollable
        scrollHeight="flex"
        style={{ border: "1px solid #d1d5db", borderBottom: "none" }}
        dataKey="sessionId"
        onValueChange={(sessions) => {
          field.handleChange(sessions);
        }}
      >
        <Column field="cardId" header="RFID" />
        <Column
          field="startTime"
          header="Start"
          dataType="date"
          body={(session: ChargingSession) => formatDate(session.startTime)}
        />
        <Column
          field="stopTime"
          header="Ende"
          dataType="date"
          body={(session: ChargingSession) => formatDate(session.stopTime)}
        />
        <Column field="totalEnergy" header="Energie in kWh" />
      </DataTable>
    </Box>
  );
}
