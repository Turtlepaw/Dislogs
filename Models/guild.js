const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    events: [String], //Map<event, event>
    guildId: String,
    channelId: String
})

const Model = module.exports = mongoose.model(`guild`, schema)

module.exports.defualts = {
    events: new Map(),
    channelId: null,
    //GuildId required
}