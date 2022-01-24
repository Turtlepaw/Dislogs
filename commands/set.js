const { CommandInteraction, Client } = require("discord.js");
const jsh = require("discordjsh");

module.exports = {
    devOnly: true,
    data: new jsh.commandBuilder()
    .setName("set")
    .setDescription(`Set a setting in your server!`)
    .addSubcommand(s => {
        return s.setName(`events`)
        .setDescription(`Update what you want in your log channel.`)
    }),
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client){
        await interaction.reply({
            ephemeral: true,
            content: `Testttt`
        });
    }
}