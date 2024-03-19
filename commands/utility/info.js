const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const moment = require('moment');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Get info about a user or the server.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('user')
                .setDescription('info about a user')
                .addUserOption(option =>
                option.setName('target')
                    .setDescription('Insert user to get info on')
                    .setRequired(true)
            ))
        .addSubcommand(subcommand =>
            subcommand
                .setName('server')
                .setDescription('Info about the server')
        ),

    async execute(interaction) {
        if (interaction.options.getSubcommand() === 'user') {
            const target = interaction.options.getUser('target');
            const userEmbed = new EmbedBuilder()
                .setColor(0xAD5EF2)
                .setTitle(`${target.displayName}'s info`)
                .setThumbnail(target.avatarURL({ extension: 'png' }))
                .addFields(
                    { name: 'Username', value: `${target.username}` },
                    { name: 'User ID ', value: `${target.id}` },
                    { name: 'Nickname', value: `${target.displayName}` },
                    { name: 'Avatar', value: `[View Avatar](${target.avatarURL({ extension: 'png', size: 512 })})` },
                    { name: 'Join Date', value: `${moment(target.joinedAt).format('M/D/YYYY hh:mm:ss')}` },
                    { name: 'Account Creation Date', value: `${moment(target.createdAt).format('M/D/YYYY hh:mm:ss')}` },
                )
                .setTimestamp()
                .setFooter({ text: `${interaction.user.username}` });

            await interaction.reply({ embeds: [userEmbed] });
            console.log(`Command: Info User, User: ${interaction.user.username}, User ID: ${interaction.user.id}, Target: ${target.username}, Target ID: ${target.id}, Channel: ${interaction.channel.name}, Channel ID: ${interaction.channel.id}`);
        } else if (interaction.options.getSubcommand() === 'server') {
            const serverEmbed = new EmbedBuilder()
                .setColor(0x8A2E2E)
                .setTitle(`${interaction.guild.name} info`)
                .setThumbnail(interaction.guild.iconURL({ extension: 'png' }))
                .addFields(
                    { name: 'Server ID', value: `${interaction.guild.id}` },
                    { name: 'Server Owner', value: `<@${interaction.guild.ownerId}>` },
                    { name: 'Server Creation Date', value: `${moment(interaction.guild.createdAt).format('M/D/YYYY hh:mm:ss')}` },
                    { name: 'Server Icon', value: `[View Icon](${interaction.guild.iconURL({ extension: 'png', size: 512 })})` },
                    { name: 'Member Count', value: `${interaction.guild.memberCount}` },
                )
                .setTimestamp()
                .setFooter({ text: `${interaction.user.username}` });

            await interaction.reply({ embeds: [serverEmbed] });
            console.log(`Command: Info Server, User: ${interaction.user.username}, User ID: ${interaction.user.id}, Channel: ${interaction.channel.name}, Channel ID: ${interaction.channel.id}`);
        }
    },
};