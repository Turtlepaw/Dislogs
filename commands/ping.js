const { CommandInteraction, Client } = require("discord.js");
const jsh = require("discordjsh");
const Embed = require("../Embed");

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
            .addField(`**Bot Ping:**`, `\`${client.ws.ping}ms\``)
            .addField(`**Guilds/Servers:**`, `\`${client.guilds.cache.size} guilds\``)
            .addField(`**Uptime:**`, `\`${client.uptime}\``)
            .build()
        });
    }
}