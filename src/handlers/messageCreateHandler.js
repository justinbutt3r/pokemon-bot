const { prefix, chanceToAppear } = require("../../config");
const catchAction = require("../actions/catchAction");
const helpAction = require("../actions/helpAction");
const sendMessageAction = require("../actions/sendMessageAction");
const setChannelAction = require("../actions/setChannelAction");
const SettingsItemModel = require("../schema/settings");

let settings = null;

const messageCreateHandler = async (message, db) => {
  try {
    const serverId = message.guildId;
    console.log("server id:", serverId);

    if (!settings) {
      const SettingsItem = SettingsItemModel(db);
      settings = await SettingsItem.findOne({ serverId: serverId });
    }

    console.log("message", message);

    console.log("received message");
    if (!message.content.startsWith(prefix)) {
      if (settings && settings.channelId !== message.channelId) {
        const chance = Math.random() * 100;
        if (chance <= chanceToAppear) {
          console.log("will send message");
          await sendMessageAction(settings, db, message);
        }
      } else {
        console.log("message in selected channel");
      }
      return;
    }
    console.log("Is a command");
    const list = message.content.split(" ");

    const command = list[1];
    const arguement = list[2];

    switch (command) {
      case "help":
        helpAction(message.author);
        break;
      case "setChannel":
        if (list.length != 3) throw new Error("Invalid command");
        await setChannelAction(arguement, serverId, db, message);
        break;
      case "catch":
        if (list.length != 3) throw new Error("Invalid command");
        await catchAction(message, arguement, db, settings);
        break;
      default:
        throw new Error("Unknown command");
        break;
    }
  } catch (e) {
    console.error(e);
  }
};

module.exports = messageCreateHandler;

//https://www.youtube.com/watch?v=90z7uX42fqI&ab_channel=WornOffKeys
