const PokemonRecordModel = require("../schema/pokemonRecord");
const { AttachmentBuilder, EmbedBuilder } = require("discord.js");
const pokemonTemplate = require("../templates/pokemon");
const { default: axios } = require("axios");
const { apiLink } = require("../../config");

const sendMessageAction = async (settings, db, message) => {
  try {
    const channelId = settings.channelId || message.channelId;
    const channelWantSend = message.guild.channels.cache.get(channelId);

    const data = await axios.get(`${apiLink}randomPokemon`);
    const pokemon = data.data;

    const embed = new EmbedBuilder()
      .setColor("Red")
      .setTitle("A wild pokémon has appeared!")
      .setDescription(pokemonTemplate)
      .setImage(pokemon.image);

    const a = await channelWantSend.send({ embeds: [embed] });

    const PokemonRecord = await PokemonRecordModel(db);
    const record = new PokemonRecord({
      serverId: message.guildId,
      messageId: a.id,
      pokemonId: pokemon._id,
      apiId: pokemon.apiId,
      name: pokemon.name,
      image: pokemon.image,
    });

    await record.save();
  } catch (e) {
    console.error(e);
  }
};

module.exports = sendMessageAction;

/**
 * 
 * 
 *   channelId: '1012048720587673613',
  guildId: '1012048720084353084',
 */

// react to specific message
//   message.client.channels.fetch("channelID").then(channel => {
//     channel.messages.fetch("messageID").then(message => {
//         message.react("emoji");
//     }
// }
