const { Client, TextChannel, GuildMember, Invite } = require("discord.js");
const { Events } = require("discordjsh");
const Embed = require("../Embed");
const { Emojis } = require("../EmojiAPI");
const ID = require("./ID");

module.exports = {
    eventName: ID.INVITE,
    eventId: Events.guildMemberRemove,
    /**
     * Executes the event.
     * @param {Client} client 
     * @param {Function} fetchGuild
     * @param {GuildMember} member
     * @param {Client} client
     */
    async execute(member, fetchGuild, checkEvent, client){
        const channel = await fetchGuild(member.guild);
        const Check = await checkEvent(member.guild);
        if(!Check) return;
        const BaseEmbed = new Embed();
        const Emoji = channel.permissionsFor(channel.guild.me).has(`USE_EXTERNAL_EMOJIS`) ? Emojis.member_invited_da.show : "📝";
        
        const baseEmbed = new Embed()
        .setTitle(`${Emoji} User Left`)
        .addField(`User:`, `${member.user} (${member.user.tag})`)
        .setFooter({
            text: member.id
        });

        channel.send({
            embeds: baseEmbed.build()
        });
    }
}