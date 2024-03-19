const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with pong!'),
    async execute(interaction) {
        await interaction.reply(`Pong! My ping is ${Math.abs(Date.now() - interaction.createdTimestamp)}ms.`);
        console.log(`Command: Ping, User: ${interaction.user.username}, User ID: ${interaction.user.id}, Channel: ${interaction.channel.name}, Channel ID: ${interaction.channel.id}`);
    },
};