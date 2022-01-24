/*
    |———————————————————————————|
    |      @Turtlepaw           |
    |      Dislogs 2022         |
    |———————————————————————————|
*/

const Discord = require("discord.js");
const jsh = require("discordjsh");
const config = require("./config");
const {
    token,
    clientID
} = require("./config.json");

const ClientBuilder = new jsh.Client({
    token,
    clientID,
    config: {
        color: config.Color
    },
    testGuildID: "842575277249921074"
})
.setCommandsDir();

const client = ClientBuilder.create({
    intents: [
        "GUILDS",
        "GUILD_BANS",
        "GUILD_EMOJIS_AND_STICKERS",
        "GUILD_INTEGRATIONS",
        "GUILD_INVITES",
        "GUILD_MEMBERS",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS",
        "GUILD_MESSAGE_TYPING",
        "GUILD_PRESENCES",
        "GUILD_SCHEDULED_EVENTS",
        "GUILD_VOICE_STATES",
        "GUILD_WEBHOOKS"
    ],
    partials: [
        "CHANNEL",
        "GUILD_MEMBER",
        "GUILD_SCHEDULED_EVENT",
        "MESSAGE",
        "REACTION",
        "USER"
    ]
});