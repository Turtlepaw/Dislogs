const { Client, TextChannel, GuildMember, Invite } = require("discord.js");
const { Events } = require("discordjsh");
const Embed = require("../Embed");
const { Emojis } = require("../EmojiAPI");
const ID = require("./ID");

module.exports = {
    eventName: ID.INVITE,
    eventId: "guildMemberAddWithInvite",
    /**
     * Executes the event.
     * @param {Client} client 
     * @param {Function} fetchGuild
     * @param {GuildMember} member
     * @param {Client} client
     * @param {Invite} invite
     */
    async execute(member, invite, fetchGuild, checkEvent, client){
        const channel = await fetchGuild(member.guild);
        const Check = await checkEvent(member.guild);
        if(!Check) return;
        const BaseEmbed = new Embed();
        const Emoji = channel.permissionsFor(channel.guild.me).has(`USE_EXTERNAL_EMOJIS`) ? Emojis.member_invited_da.show : "📝";
        
        const baseEmbed = new Embed()
        .setTitle(`${Emoji} User Invited`)
        .addField(`Inviter:`, `${invite.inviter}`)
        .addField(`Invited User:`, `${member.user}`)
        .setFooter({
            text: `Inviter: ${invite.inviterId} • Invited: ${member.id}`
        });

        channel.send({
            embeds: baseEmbed.build()
        });
    }
}