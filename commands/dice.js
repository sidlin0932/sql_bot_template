const { SlashCommandBuilder, EmbedBuilder, Client } = require("discord.js");
const { AddPlayer, UpdatePlayer, SearchPlayer } = require("./../Modules/Database");
// [讀檔] -> [解析] -> [做事] -> [存檔] -> [回應]

module.exports = {
    data: new SlashCommandBuilder().setName("dice").setDescription("Earn money with dice!"),
    async execute(client, interaction) {
        const final = Math.floor(Math.random() * 6) + 1;
        const StarterValue = 500;
        let earnings = 0;
        if (final < 4) {
            earnings = final - 4;
        } else {
            earnings = final - 3;
        }
        const PlayerId = interaction.user.id;
        SearchPlayer(PlayerId)
        .then((Result) => {
            let FinalVal = 0;
            if (Result.length == 0){
                FinalVal = StarterValue + earnings;
                AddPlayer(PlayerId, FinalVal)
                .then((Success) => {
                    if (!Success){
                        console.error(`Failed to add ${PlayerId} to DB`);
                    }
                });
            } else {
                const {id, money} = Result[0];
                FinalVal = money + earnings;
                UpdatePlayer(PlayerId, FinalVal)
                .then((Success) => {
                    if (!Success){
                        console.error(`Failed to update ${PlayerId}`);
                    }
                });1    
            }
            const diceEmbed = new EmbedBuilder()
                    .setColor("#5865F2")
                    .setTitle(`🎲你得到了 ${final}`)
                    .setDescription(`結果：${earnings}元\n你現在有 ${FinalVal} 元!`);
            interaction.reply({ embeds: [diceEmbed] });
        });
    },
};
