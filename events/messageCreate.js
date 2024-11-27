const { Events } = require('discord.js')

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        if(message.author.bot) return;
        const prefix = message.client.prefix;

        if (message.content.startsWith(prefix)) {
            const args = message.content.slice(prefix.length).split(" ")
            const command = message.client.commands.get(args.shift().toLowerCase())
            if (!command) return;
            await command.execute(message, args)
        }
    }
}