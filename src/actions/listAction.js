const PokemonClaimsModel = require("../schema/pokemonClaims");
const { EmbedBuilder } = require("discord.js");

const listAction = async (message, db, settings) => {
  try {
    const PokemonClaims = await PokemonClaimsModel(db);

    const channelId = settings.channelId || message.channelId;
    const channelWantSend = message.guild.channels.cache.get(channelId);

    const claimed = await PokemonClaims.find({
      serverId: message.guildId,
      userId: message.author.id,
    });

    const claimedList = claimed.map(
      (item) => `**${item.name}** #${item.apiId}`
    );

    const embed = new EmbedBuilder()
      .setColor("Red")
      .setTitle("Your pokémon!")
      .setDescription(claimedList.join("\n"));

    await channelWantSend.send({ embeds: [embed] });
  } catch (e) {
    console.error(e);
  }
};

module.exports = listAction;
