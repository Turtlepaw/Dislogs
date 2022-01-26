const { Client, GuildMember, TextChannel } = require("discord.js");
const { Events } = require("discordjsh");
const Embed = require("../Embed");
const { Emojis } = require("../EmojiAPI");
const ID = require("./ID");

module.exports = {
    eventName: ID.MEMBER,
    eventId: Events.guildMemberUpdate,
    /**
     * Executes the event.
     * @param {Client} client
     * @param {GuildMember} newMember
     * @param {GuildMember} oldMember
     * @param {Function} fetchGuild
     */
    async execute(oldMember, newMember, fetchGuild, client){
        const channel = await fetchGuild(newMember.guild);
        const BaseEmbed = new Embed()
        .setAuthor({
            name: newMember.user.tag,
            iconURL: newMember.displayAvatarURL(),
        })
        .setFooter({
            text: newMember.id
        });
        const Emoji = channel.permissionsFor(channel.guild.me).has(`USE_EXTERNAL_EMOJIS`) ? Emojis.update_dc.show : "📝";

        if(oldMember.displayAvatarURL() != newMember.displayAvatarURL()){
            BaseEmbed.setTitle(`${Emoji} Avatar Update`)
            .setDescription(`[Old Avatar](http://web.archive.org/web/${oldMember.displayAvatarURL()}) -> [New Avatar](${newMember.displayAvatarURL()})`)
        } else if(oldMember.user.username != newMember.user.username){
            BaseEmbed.setTitle(`${Emoji} Username Update`)
            .setDescription(`${oldMember.user.username} -> ${newMember.user.username}`)
        } else if(oldMember.user.tag != newMember.user.tag){
            BaseEmbed.setTitle(`${Emoji} Tag Update`)
            .setDescription(`\`#${oldMember.user.tag}\` -> \`${newMember.user.tag}\``)
        } else if(oldMember.nickname != newMember.nickname){
            BaseEmbed.setTitle(`${Emoji} Nickname Update`)
            .setDescription(`${oldMember.nickname} -> ${newMember.nickname}`)
        } else if(oldMember.roles.cache.equals(newMember.roles.cache)){
            const RolesRemoved = oldMember.roles.cache.filter(e => !newMember.roles.cache.has(e.id));
            const RolesAdded = newMember.roles.cache.filter(e => !oldMember.roles.cache.has(e.id));
            const type = RolesAdded.size >= 1 ? `ADD` : RolesRemoved.size >= 1 ? `REMOVE` : `ADD_AND_REMOVE`;
            const type2 = RolesAdded.size >= 1 ? `Added` : RolesRemoved.size >= 1 ? `Removed` : `Updated`

            BaseEmbed.setTitle(`${Emoji} Roles ${type2}`)
            .addField(`Roles Added`, `${RolesAdded.map(e => `${e} `)}`)
            .addField(`Roles Removed`, `${RolesRemoved.map(e => `${e} `)}`)
        }

        await channel.send({
            embeds: BaseEmbed.build()
        });
    }
}