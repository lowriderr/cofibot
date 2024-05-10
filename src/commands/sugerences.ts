import { Message } from "discord.js";
import { embedErrorMessage, embedMessage } from "../utils/embedMessages.js";

export const setSugerenceChannel = (msg: Message, hasPermission: boolean) => {
  let channelID = "";
  if (!hasPermission) {
    const embedError = embedErrorMessage({
      name: "Error",
      value: "No tienes permisos para ejecutar este comando",
    });
    msg.reply({ embeds: [embedError] });
  } else {
    const channelIDRegex = /<#(\d+)>/;
    const matches = msg.content.match(channelIDRegex);
    if (matches && matches.length > 1) {
      channelID = matches[1];
      msg.reply("Ok");
    } else {
      const embedError = embedErrorMessage({
        name: "Error",
        value: "No se encontró el canal solicitado.",
      });
      msg.reply({ embeds: [embedError] });
    }
  }
  return channelID;
};

export const sendSugerence = (msg: any, sugerenceChannelID: string) => {
  if (sugerenceChannelID === "") {
    // No channel error handling
    const embedError = embedErrorMessage(
      {
        name: "Error enviando sugerencia",
        value: "No se fijó ningun canal para enviar sugerencias",
      },
      {
        name: "Intenta lo siguiente",
        value:
          "Fija un canal para sugerencias usando el comando -setSugerenceChannel",
      }
    );

    msg.reply({ embeds: [embedError] });
  } else {
    const sugerence = msg.content.slice("-sugerencia".length).trim();
    if (msg.guild) {
      const sugerenceChannel = msg.guild.channels.cache.get(sugerenceChannelID);

      const embed = embedMessage(
        "Nueva sugerencia!",
        new Date(),
        { name: "De", value: msg.author.globalName },
        { name: "Sugerencia", value: sugerence }
      );

      if (!sugerenceChannel) return;
      sugerenceChannel
        .send({ embeds: [embed] })
        .then((sugerenceSended: any) => {
          sugerenceSended.react("👍");
          sugerenceSended.react("👎");
        });
    }
  }
};
