import * as z from "zod";

const NumberSchema = z
  .number()
  .or(z.string().transform((value) => Number(value)));
const StringSchema = z.string();

const schemaMap = {
  string: StringSchema,
  number: NumberSchema,
};

export function getEnv<K extends keyof typeof schemaMap>({
  key,
  as,
  defaultValue,
}: {
  key: string;
  as: K;
  defaultValue: z.infer<(typeof schemaMap)[K]>;
}) {
  const value = import.meta.env[key];

  if (typeof value === "undefined" || value === "" || value === null) {
    return defaultValue;
  }

  return schemaMap[as].parse(import.meta.env[key]);
}
