const { EmbedBuilder } = require('discord.js')

module.exports = {
    data: {
        name: "ping",
        description: "Replies with stats about bot latency!"
    },
    async execute(message, args) {
        const wsPing = message.client.ws.ping
        const sent = await message.reply({ content: 'Pinging...', fetchReply: true });
        const roundtripPing = sent.createdTimestamp - message.createdTimestamp


        sent.edit(`Pong! Latency is ${roundtripPing}ms. API Latency is ${wsPing}ms`)
    }
}