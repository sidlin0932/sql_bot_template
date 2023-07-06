const { SlashCommandBuilder, EmbedBuilder, Client, InteractionType } = require("discord.js");
const { SearchPlayer } = require("../Modules/Database");
// [讀檔] -> [解析] -> [做事] -> [存檔] -> [回應]

module.exports = {
    data: new SlashCommandBuilder()
        .setName("search")
        .setDescription("Searches for a player in the database")
        .addStringOption((option) => option.setName("id").setDescription("Player id")),

    async execute(client, interaction) {
        const PlayerId = interaction.options.getString("id") ?? "";
        if (PlayerId === "") {
            return await interaction.reply("Player id not provided");
        }
        const ReturnData = await SearchPlayer(PlayerId);
        if (!ReturnData){
            return await interaction.reply(`Failed to find player with id ${PlayerId}`);
        }
        let ReplyString = "";
        for (let i = 0; i < ReturnData.length; i++) {
            const { id, money } = ReturnData[i];
            ReplyString = `${ReplyString}${id}: ${money}\n`;
        }
        return await interaction.reply(ReplyString);
    },
};
