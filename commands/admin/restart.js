const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('restart')
        .setDescription('Restarts the bot'),
    async execute(interaction) {

        if (interaction.user.id !== '1085203879303577600') {
            interaction.reply('Only the bot owner can use this command!')
        } else {
            await interaction.reply(`Restarting!`);
            const exec = require('child_process').exec
            exec('pkill -f -SIGHUP nodemon')
            
        }

        console.log(`Command: Restart, User: ${interaction.user.username}, User ID: ${interaction.user.id}, Channel: ${interaction.channel.name}, Channel ID: ${interaction.channel.id}`);
    },
};