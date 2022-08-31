require("dotenv").config();

module.exports = {
  prefix: "$p",
  dbName: "pokemonBot",
  apiLink: process.env.API_LINK,
  timeToCatch: 5,
  chanceToAppear: 7,
};
