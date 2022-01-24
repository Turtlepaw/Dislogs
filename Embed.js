const { MessageEmbed } = require("discord.js");
const { Color } = require("./config");

const Embed = module.exports = class Embed extends MessageEmbed {
    constructor(){
        super()
        
        this.setColorAuto()
    }

    setColorAuto(){
        this.color = Color
    }

    build() {
        return [this];
    }
};

// module.exports = (noBuild=false) => {
//     let embed = new Embed().setColor(Color);

//     if(!noBuild) embed = embed.build();

//     return embed;
// };