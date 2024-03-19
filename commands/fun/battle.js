const { SlashCommandBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('battle')
        .setDescription('Battle another member.')
        .addUserOption(option =>
            option.setName('target')
            .setDescription('Enter in a member to battle.')
            .setRequired(true)
        ),
    async execute(interaction) {
        await interaction.reply(`<@${target.user.id}>, <@${interaction.user.id}> is requesting a battle with you!`);

        console.log(`Command: Ping, User: ${interaction.user.username}, User ID: ${interaction.user.id}, Channel: ${interaction.channel.name}, Channel ID: ${interaction.channel.id}`);
    },
};