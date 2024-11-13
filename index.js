// Import filesystem, discord.js and token
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
const { token, prefix } = require("./config.json")

// Create the client
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.MessageContent] });
client.prefix = prefix

/* ===================
Dynamic command import
==================== */

// Create commands collection
client.commands = new Collection();

// Get the path of the commands dir
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

// For each sub-folder of the commands folder
for (const folder of commandFolders) {
    // Get the path of the sub-folder
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    // For each file of the subfolder
    for (const file of commandFiles) {
        // Get the path of the file
        const filePath = path.join(commandsPath, file);
        // Import the command
        const command = require(filePath);
        // Set a new item in the Collection with the key as the command name and the value as the exported module
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            logger.warn(`The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

/* ==================
 Dynamic event import
================== */


// Get the path of the events folder
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

// For each event file
for (const file of eventFiles) {
    // Get the path of the file
    const filePath = path.join(eventsPath, file);
    // Import the event
    const event = require(filePath);
    // Execution
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

// Log in the bot
client.login(token);