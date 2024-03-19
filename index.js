const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');



const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.DirectMessageReactions
    ],
});
client.partials = ['CHANNEL']

client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const cmdFolders = fs.readdirSync(foldersPath)

for (const folder of cmdFolders) {
    const cmdPath = path.join(foldersPath, folder);
    const cmdFiles = fs.readdirSync(cmdPath).filter(file => file.endsWith('.js'));
    for (const file of cmdFiles) {
        const filePath = path.join(cmdPath, file)
        const command = require(filePath)

        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command)
        } else {
            console.log(`The command at ${filePath} is missing a required "data" or "execute" property.`);

        }
    }
}

const eventPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args))
    }
}


/*var request = require('request')
var options = {
    uri: `https://anilist.co/api/v2/oauth/token`,
    methods: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    json: {
        'grant type': 'authorization_code',
        'client_id': '16617',
        'client_secret': 'tFrPo8rrfxnaYsERTe9Wbij6VnKUvXIyCCRqvskW',
        'recirect_url':
    }
};*/


client.login(token)