const SettingsItemModel = require("../schema/Settings");

const setChannelAction = async (channelTag, serverId, db, message) => {
  try {
    const SettingsItem = await SettingsItemModel(db);
    const channelId = channelTag.replace("<#", "").replace(">", "");
    console.log(`Setting channel id of ${channelId} for server ${serverId}`);

    // save to db
    let item = await SettingsItem.findOne({ serverId: serverId });
    if (!item) {
      item = new SettingsItem({ serverId: serverId });
    }
    item.channelId = channelId;
    await item.save();
    await message.react("✅");
  } catch (e) {
    console.error(e);
  }
};

module.exports = setChannelAction;
