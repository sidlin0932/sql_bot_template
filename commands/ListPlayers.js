const { SlashCommandBuilder, EmbedBuilder, Client } = require("discord.js");
const { ListPlayers } = require("../Modules/Database");
// [讀檔] -> [解析] -> [做事] -> [存檔] -> [回應]

module.exports = {
    data: new SlashCommandBuilder()
        .setName("list")
        .setDescription("Lists all players in the database"),

    async execute(client, interaction) {
        const PlayerList = await ListPlayers();
        if (!PlayerList){
            return await interaction.reply("Error occured while fetching player list...Try again later!");
        }
        let ReplyString = "";
        for (let i = 0; i < PlayerList.length; i++) {
            const { id, money } = PlayerList[i];
            ReplyString = `${ReplyString}${id} | ${money}\n`;
        }
        await interaction.reply(ReplyString);
    },
};