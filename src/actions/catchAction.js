const PokemonRecordModel = require("../schema/pokemonRecord");
const PokemonClaimsModel = require("../schema/pokemonClaims");
const differenceInMinutes = require("date-fns/differenceInMinutes");
const { timeToCatch } = require("../../config");

const catchAction = async (message, guess, db, settings) => {
  try {
    console.log(`Attempt to catch ${guess}`);
    const PokemonRecord = await PokemonRecordModel(db);
    const PokemonClaims = await PokemonClaimsModel(db);

    const latest = await PokemonRecord.find({ serverId: settings.serverId })
      .sort({ _id: -1 })
      .limit(1)
      .lean();

    const record = latest[0];
    const difference = differenceInMinutes(new Date(), record.createdAt);
    if (difference <= timeToCatch) {
      if (record.name.toLowerCase() === guess.toLowerCase()) {
        const claim = new PokemonClaims({
          serverId: settings.serverId,
          pokemonId: record.pokemonId,
          apiId: record.apiId,
          name: record.name,
          image: record.image,
          userId: message.author.id,
        });

        await claim.save();

        message.react("✅");
        message.reply(`Gotcha! ${record.name} was caught!`);

        message.client.channels.fetch(settings.channelId).then((channel) => {
          channel.messages.fetch(record.messageId).then((message) => {
            message.react("🚫");
          });
        });
      } else {
        message.react("❌");
        message.reply("Oh no! The Pokémon broke free!");
      }
    } else {
      message.react("❌");
      message.reply("Their doesn't seem to be Pokémon around");
    }
  } catch (e) {
    console.error(e);
  }
};

module.exports = catchAction;
