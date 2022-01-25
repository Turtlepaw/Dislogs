const { CommandInteraction, Client } = require("discord.js");
const jsh = require("discordjsh");
const Embed = require("../Embed");
const { Emojis } = require("../EmojiAPI");
const { oneLineCommaListsAnd } = require("common-tags");
const guild = require("../Models/guild");

module.exports = {
    devOnly: true,
    data: new jsh.commandBuilder()
        .setName("view")
        .setDescription(`View your guilds settings.`),
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const Guild = await guild.findOne({
            guildId: interaction.guild.id
        });

        await interaction.reply({
            ephemeral: true,
            embeds: new Embed()
                .addField(`**${Emojis.stem_1.show} Log Channel:**`, `${Emojis.stem_1.show} ${Guild.channelId != null ? `<#${Guild.channelId}>` : `Not set`}`)
                .addField(`**${Emojis.stem_1.show} Events:**`, `${Emojis.stem_1.show} ` + "`" + ((Guild.events != null) || (guild.events.length >= 1) ? oneLineCommaListsAnd`${Guild.events}` : `Not set`) + "`")
                .addField(`**${Emojis.stem_1.show} Guild ID:**`, `${Emojis.reply_1.show} \`${Guild.guildId}\``)
                .build()
        });
    }
}