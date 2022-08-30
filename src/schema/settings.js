const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SettingsItemSchema = new Schema(
  {
    serverId: {
      type: String,
      required: [true, "Server id is required"],
    },
    channelId: {
      type: String,
    },
  },
  { timestamps: true }
);

const SettingsItem = (connection) => {
  return connection.model("SettingsItem", SettingsItemSchema);
};

module.exports = SettingsItem;
