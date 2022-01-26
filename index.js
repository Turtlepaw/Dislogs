/*
    |———————————————————————————|
    |      @Turtlepaw           |
    |      Dislogs 2022         |
    |———————————————————————————|
*/
const mongoose = require("mongoose");
const Discord = require("discord.js");
const jsh = require("discordjsh");
const config = require("./config");
const guild = require('./Models/guild');
const {
    token,
    clientID,
    mongoDB
} = require("./config.json");
const { readdirSync } = require("fs");

//Mongo stuff
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connecting', () => {
    console.log(`[MONGO_DB]`, "Mongoose: Logging in!")
})

mongoose.connection.on('connected', () => {
    console.log(`[MONGO_DB]`, "Mongoose: Logged in!")
})

mongoose.connection.on('disconnecting', () => {
    console.log(`[MONGO_DB]`, "Mongoose: Logging out")
})

mongoose.connection.on('disconnected', () => {
    console.log(`[MONGO_DB]`, "Mongoose: Logged out")
})

mongoose.connection.on('error', error => {
    console.log(`[MONGO_DB_ERROR] ` + error)
});
//End

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

client.on("ready", async () => {
    setTimeout(async () => {
        await require("./EmojiAPI")(client);

        console.log(`[BUILDING_EMOJIS]`, `Emojis Ready`);
    }, 4000);
});

const Events = readdirSync(`./Logs`).filter(e => e.endsWith(".js"));

for(const Event of Events){
    const event = require(`./Logs/` + Event);

    if(event?.notEvent) continue;

    client.on(event.eventId, async function (...args) {
        await event.execute(...args, async function(guildDef){
            const Find = await guild.findOne({
                guildId: guildDef.id
            });

            return guildDef.channels.cache.get(Find.channelId);
        }, client);
    });
}