import { Client, IntentsBitField } from "discord.js";
import { logger as log } from "./utils/loggerInstance";
import { sendSugerence, setSugerenceChannel } from "./commands/sugerences";

import "dotenv/config";

const client = new Client({
  // Bot instance
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});
client.on("ready", (c) => {
  log.info(`${c.user.username} is ready`);
});

let sugerenceChannelID = "";

client.on("messageCreate", (msg) => {
  if (msg.content.startsWith("-setSugerenceChannel")) {
    let hasPermission = msg.member?.permissions.has("Administrator");
    sugerenceChannelID = setSugerenceChannel(msg, hasPermission || false);
  } else if (msg.content.startsWith("-sugerencia")) {
    sendSugerence(msg, sugerenceChannelID);
  }
});

client.login(process.env.BOT_TOKEN);
