const {
    SlashCommandBuilder,
    EmbedBuilder,
    Client,
    InteractionType,
    InteractionResponseType,
} = require("discord.js");
const { UpdatePlayer } = require("../Modules/Database");
// [讀檔] -> [解析] -> [做事] -> [存檔] -> [回應]

module.exports = {
    data: new SlashCommandBuilder()
        .setName("update")
        .setDescription("updates a player's money")
        .addStringOption((option) => option.setName("id").setDescription("Player id"))
        .addStringOption((option) => option.setName("value").setDescription("Money Value")),

    async execute(client, interaction) {
        const PlayerId = interaction.options.getString("id") ?? "";
        const NewVal = interaction.options.getString("value") ?? "";
        const UpdateStatus = await UpdatePlayer(PlayerId, NewVal);
        if (PlayerId === "" || NewVal === "" || !Number(NewVal)) {
            return await interaction.reply("Missing arguments");
        }
        const Status = UpdateStatus ? "Successfully" : "Failed to";
        return await interaction.reply(`${Status} updated ${PlayerId}'s money to ${NewVal}`);
    },
};
