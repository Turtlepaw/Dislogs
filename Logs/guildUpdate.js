const { Client, TextChannel, Guild } = require("discord.js");
const { Events } = require("discordjsh");
const Embed = require("../Embed");
const { Emojis } = require("../EmojiAPI");
const ID = require("./ID");

module.exports = {
    eventName: ID.GUILD,
    eventId: Events.guildUpdate,
    /**
     * Executes the event.
     * @param {Client} client 
     * @param {Function} fetchGuild
     * @param {Guild} oldGuild
     * @param {Guild} newGuild
     */
    async execute(oldGuild, newGuild, fetchGuild, checkEvent, client){
        const channel = await fetchGuild(newGuild);
        const Check = await checkEvent(newGuild);
        if(!Check) return;
        const baseEmbed = new Embed()
        .setThumbnail(newGuild.iconURL());
        const Emoji = channel.permissionsFor(channel.guild.me).has(`USE_EXTERNAL_EMOJIS`) ? Emojis.update_dc.show : "📝";

        if(oldGuild.iconURL() != newGuild.iconURL()){
            baseEmbed.setTitle(`${Emoji} Server Avatar Update`)
            .setDescription(`[Old Avatar](http://web.archive.org/web/${oldGuild.displayAvatarURL()}) -> [New Avatar](${newGuild.displayAvatarURL()})`)
        } else if(oldGuild.name != newGuild.name){
            baseEmbed.setTitle(`${Emoji} Server Name Update`)
            .setDescription(`${oldGuild.name} -> ${newGuild.name}`)
        }

        channel.send({
            embeds: baseEmbed.build()
        });
    }
}