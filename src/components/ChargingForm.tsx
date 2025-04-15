import classes from "./ChargingForm.module.css";
import { Fieldset } from "primereact/fieldset";
import { Box } from "../layout/Box";
import { UseChargingForm } from "../hooks/useChargingForm";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { FileUpload } from "primereact/fileupload";
import ChargingWorker from "../workers/ChargingWorker.js?worker";
import * as Comlink from "comlink";
import type { ChargingWorkerApi } from "../workers/ChargingWorker";
import { DataTable } from "primereact/datatable";
import { Column, ColumnFilterElementTemplateOptions } from "primereact/column";
import { ChargingSession } from "../models/chargingCore";
import { formatDate } from "../support/chargingFormatUtils";
import { Message } from "primereact/message";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Calendar } from "primereact/calendar";
import { useField } from "@tanstack/react-form";

const chargingWorker = Comlink.wrap<ChargingWorkerApi>(new ChargingWorker());

export interface ChargingFormProps {
  form: UseChargingForm;
}

export function ChargingFormTable({ form }: ChargingFormProps) {
  const field = useField({ form, name: "sessions" });

  const dateFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    return (
      <Calendar
        value={options.value}
        onChange={(e) => {
          options.filterApplyCallback(e.value, options.index);
        }}
        mask="99/99/9999"
        placeholder="mm.dd.yyyy"
      />
    );
  };

  if (!field.form.state.values.allSessions) {
    return null;
  }

  return (
    <DataTable
      value={field.form.state.values.allSessions}
      filters={field.form.state.values.filters}
      tableStyle={{ minWidth: "100%" }}
      filterDisplay="row"
      dataKey="sessionId"
      onValueChange={(sessions) => {
        field.handleChange(sessions);
      }}
      onFilter={(event) => {
        form.setFieldValue("filters", event.filters);
      }}
    >
      <Column
        field="cardId"
        header="RFID"
        filter
        showFilterMenu={false}
        filterField="cardId"
      ></Column>
      <Column
        field="startTime"
        header="Start"
        dataType="date"
        filter
        showFilterMenu={false}
        filterField="startTime"
        filterElement={dateFilterTemplate}
        body={(session: ChargingSession) => formatDate(session.startTime)}
      ></Column>
      <Column
        field="stopTime"
        header="Ende"
        dataType="date"
        filter
        showFilterMenu={false}
        filterField="stopTime"
        filterElement={dateFilterTemplate}
        body={(session: ChargingSession) => formatDate(session.stopTime)}
      ></Column>
      <Column field="totalEnergy" header="Energie in kWh"></Column>
    </DataTable>
  );
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
      <Accordion activeIndex={1}>
        <AccordionTab header="Allgemein">
          <Box className={classes.stack}>
            <form.Field
              name="title"
              children={(field) => (
                <div className="flex flex-column gap-2">
                  <label htmlFor={field.name}>Titel</label>
                  <InputText
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              )}
            />
            <Fieldset legend="Adresse">
              <Box className={classes.stack}>
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
                <Box className={`${classes.stack} flex-row`}>
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
                      <div
                        className="flex flex-column gap-2"
                        style={{ width: 100 }}
                      >
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
                <Box className={`${classes.stack} flex-row`}>
                  <form.Field
                    name="address.zipCode"
                    children={(field) => (
                      <div
                        className="flex flex-column gap-2"
                        style={{ width: 100 }}
                      >
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
            <Fieldset legend="Wallbox">
              <Box className={classes.stack}>
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
            <Fieldset legend="Wallbox">
              <Box className={classes.stack}>
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
            <Fieldset legend="Strompreis">
              <Box className={`${classes.stack} flex-row`}>
                <form.Field
                  name="electricity.netPrice"
                  children={(field) => (
                    <div className="flex flex-column gap-2 flex-grow-1">
                      <label htmlFor={field.name}>Netto</label>
                      <InputNumber
                        mode="currency"
                        currency="EUR"
                        locale="de-DE"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.value ?? 0)}
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
                        mode="currency"
                        currency="EUR"
                        locale="de-DE"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.value ?? 0)}
                      />
                    </div>
                  )}
                />
              </Box>
            </Fieldset>
          </Box>
        </AccordionTab>
        <AccordionTab header="Ladeprotokoll">
          <Box className={classes.stack}>
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
                        const sessions = await chargingWorker.parseSessions(
                          csv
                        );
                        field.form.setFieldValue("allSessions", sessions);
                        field.handleChange(sessions);
                      }}
                    />
                  )}
                  <ChargingFormTable form={form} />
                </div>
              )}
            />
          </Box>
        </AccordionTab>
      </Accordion>
    </form>
  );
}
