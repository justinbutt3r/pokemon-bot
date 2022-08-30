const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PokemonRecordSchema = new Schema(
  {
    serverId: {
      type: String,
      required: [true, "Server id is required"],
    },
    messageId: {
      type: String,
      required: [true, "message id is required"],
    },
    pokemonId: {
      type: String,
    },
    apiId: {
      type: Number,
    },
    image: {
      type: String,
    },
    name: {
      type: String,
    },
    claimed: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const PokemonRecord = (connection) => {
  return connection.model("PokemonRecord", PokemonRecordSchema);
};

module.exports = PokemonRecord;
