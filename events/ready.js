const { ActivityType, Events, Client } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        client.user.setPresence({ activities: [{ name: 'Coding', type: ActivityType.Streaming, url: 'https://www.twitch.tv/emmakitakasaki' }], status: 'dnd' });
        console.log(`${client.user.tag} is up and running`);
    },
};