const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PokemonClaimSchema = new Schema(
  {
    serverId: {
      type: String,
      required: [true, "Server id is required"],
    },
    userId: {
      type: String,
      required: [true, "user id is required"],
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
  },
  {
    timestamps: true,
  }
);

const PokemonClaim = (connection) => {
  return connection.model("PokemonClaim", PokemonClaimSchema);
};

module.exports = PokemonClaim;
