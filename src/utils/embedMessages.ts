import { Colors, EmbedBuilder } from "discord.js";

interface FieldsType {
  name: string;
  value: string;
}

export const embedErrorMessage = (...fields: FieldsType[]) => {
  const embedError = new EmbedBuilder()
    .setColor(Colors.Red)
    .setFields(...fields);

  return embedError;
};

export const embedMessage = (
  title: string,
  date: Date,
  ...fields: FieldsType[]
) => {
  const embedMessage = new EmbedBuilder()
    .setTitle(title)
    .setColor(Colors.Purple)
    .setFields(fields)
    .setTimestamp(date);
  return embedMessage;
};
