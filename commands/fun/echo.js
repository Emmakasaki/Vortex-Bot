const { SlashCommandBuilder } = require('discord.js');
const { ChannelType } = require('../../node_modules/discord-api-types/v10');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('makes the bot say something')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('Input to echo')
                .setRequired(true)
        )
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Channel to echo to')
                .addChannelTypes(ChannelType.GuildText)
                
        ),
    async execute(interaction, client) {
        const input = interaction.options.getString('input');
        var channelSend = interaction.options.getChannel('channel')

        interaction.deferReply();
        interaction.deleteReply();
        if (channelSend === null) {
            channelSend = interaction.channel
        }
        await channelSend.send(input)
        console.log(`Command: Echo, User: ${interaction.user.username}, User ID: ${interaction.user.id}, User input: ${input}, Channel: ${channelSend.name}, Channel ID: ${channelSend.id}`);
        
    },
};