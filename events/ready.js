const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        console.log(`Awee! "${client.user.username}" has started for ${client.users.cache.size} users in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds ~`)
    },
};