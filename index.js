const { Client, GatewayIntentBits } = require("discord.js");
const { dbName } = require("./config.js");
const messageCreateHandler = require("./src/handlers/messageCreateHandler.js");
const initClientDbConnection = require("./src/utils/dbUtil");

require("dotenv").config();

//274878041088
const connectionString = `${process.env.MONGOLINK}${dbName}${process.env.MONGOSETTINGS}`;

(async () => {
  try {
    const databaseConnection = initClientDbConnection(connectionString, dbName);

    const client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
      ],
    });

    client.login(process.env.BOT_TOKEN);

    client.on("ready", () => {
      console.log(`Logged in as ${client.user.tag}!`);
      client.user.setPresence({
        activities: [{ name: "$p help. Make sure to set channel." }],
        status: "online",
      });
    });

    client.on("messageCreate", (message) =>
      messageCreateHandler(message, databaseConnection)
    );
  } catch (error) {
    console.error(error);
  }
})();

//https://discord.com/api/oauth2/authorize?client_id=1012047361876443147&permissions=274878041088&scope=bot
