const { CommandInteraction, Client, MessageSelectMenu, MessageActionRow, Message, SelectMenuInteraction } = require("discord.js");
const jsh = require("discordjsh");
const Embed = require("../Embed");
const { Emojis } = require("../EmojiAPI");
const guild = require("../Models/guild");

module.exports = {
    data: new jsh.commandBuilder()
    .setName("set")
    .setDescription(`Set a setting in your server!`)
    .addSubcommand(s => {
        return s.setName(`events`)
        .setDescription(`Set what you want in your log channel.`)
    })
    .addSubcommand(s => {
        return s.setName(`channel`)
        .setDescription(`Set what channel to send all the events in.`)
        .addChannelOption(o => o.setName("channel").setDescription(`The channel.`).setRequired(true))
    }),
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client){
        const subcommand = interaction.options.getSubcommand();

        function create(l, v, d){
            return {
                label: l,
                value: v,
                description: d
            };
        }

        if(subcommand == "events"){
            const select = new MessageSelectMenu()
            .setCustomId(`events_menu`)
            .setPlaceholder(`Select some events`)
            .setOptions([
                create(`All`, `ALL`, `All events`),
                create(`Members`, `MEMBER`, `Update avatar, username, or tag`),
                create(`Channels`, `CHANNEL`, `Channel description, name, or other edits`),
                create(`Server`, `GUILD`, `Server avatar, name, or other updates`),
                create(`Messages`, `MESSAGE`, `Message edit or delete`),
                create(`Moderation`, `MOD`, `Server ban, kick, or timeout`),
                create(`Roles`, `ROLE`, `Role delete, update, or create`),
                create(`Emojis`, `EMOJI`, `Emoji add, update, or delete`),
                create(`Invites`, `INVITE`, `Invite create, remove, or used`)
            ])
            .setMaxValues(8);

            const rows = [new MessageActionRow().addComponents(select)];

            /**
             * @type {Message}
             */
            const interactionReply = await interaction.reply({
                embeds: new Embed()
                .setTitle(`Log events`)
                .setDescription(`These are the events that will be sent to the log channel.`)
                .build(),
                components: rows,
                fetchReply: true
            });

            /**
             * @type {SelectMenuInteraction}
             */
            const i = await interactionReply.awaitMessageComponent({
                filter: i=>i.user.id===interaction.user.id&&i.customId=="events_menu"
            });

            //Do stuff
            //Map<event, event>
            let hasInGuild = await guild.findOne({
                guildId: interaction.guild.id
            });

            if(!hasInGuild) {
                hasInGuild = await new guild(Object.assign(guild.defualts, {
                    guildId: interaction.guild.id
                })).save().catch(console.log);
            }

            hasInGuild.events = i.values
            hasInGuild.save().catch(console.log);

            select.setDisabled();

            await i.update({
                components: [
                    {
                        type: 1,
                        components: [
                            select
                        ]
                    }
                ],
                embeds: new Embed()
                .setDescription(`The guild settings have been edited.`)
                .setTitle(`${Emojis.checkmark_d_m.show} Edited guild settings`)
                .build()
            });
        } else if(subcommand == "channel"){
            const channel = interaction.options.getChannel("channel");

            let hasInGuild = await guild.findOne({
                guildId: interaction.guild.id
            });

            if(!hasInGuild) {
                hasInGuild = await new guild(Object.assign(guild.defualts, {
                    guildId: interaction.guild.id,
                })).save().catch(console.log);
            }

            hasInGuild.channelId = channel.id;
            hasInGuild.save().catch(console.log);

            await interaction.reply({
                embeds: new Embed()
                .setDescription(`The guild settings have been edited.`)
                .setTitle(`${Emojis.checkmark_d_m.show} Edited guild settings`)
                .build()
            });
        }
    }
}