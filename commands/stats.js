const { CommandInteraction, Client } = require("discord.js");
const jsh = require("discordjsh");
const Embed = require("../Embed");
const { Emojis } = require("../EmojiAPI");

module.exports = {
    data: new jsh.commandBuilder()
    .setName("stats")
    .setDescription(`Get stats and ping of the bot.`),
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client){
        await interaction.reply({
            ephemeral: true,
            embeds: new Embed()
            .addField(`**${Emojis.stem_1} Bot Ping:**`, `\`${client.ws.ping}ms\``)
            .addField(`**${Emojis.stem_1} Guilds/Servers:**`, `\`${client.guilds.cache.size} guilds\``)
            .addField(`**${Emojis.reply_1} Uptime:**`, `\`${client.uptime}\``)
            .build()
        });
    }
}