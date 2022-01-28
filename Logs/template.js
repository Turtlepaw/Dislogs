const { Client, TextChannel } = require("discord.js");
const { Events } = require("discordjsh");
const { Emojis } = require("../EmojiAPI");
const ID = require("./ID");

module.exports = {
    eventName: "",
    eventId: "",
    notEvent: true,
    /**
     * Executes the event.
     * @param {Client} client 
     * @param {Function} fetchGuild
     * @param {Function} checkEvent
     * More args here
     */
    async execute(/*Event Args*//*,*/fetchGuild, checkEvent, client){
        //const channel;
        const Check = await checkEvent(guildId);
        if(!Check) return;
        const BaseEmbed = new Embed();
        const Emoji = channel.permissionsFor(channel.guild.me).has(`USE_EXTERNAL_EMOJIS`) ? Emojis.update_dc.show : "📝";

        //Execute Event
    }
}