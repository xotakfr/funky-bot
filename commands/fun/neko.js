const { Client } = require("undici")
const responseObj = require("../../responses.json")

module.exports = {
    data: {
        name: "neko",
        description: "Shows a random catgirl.",
        args: "None"
    },
    async execute(message, args) {
        const cmd = this.data.name;
        const responses = responseObj[cmd];

        const client = new Client("https://nekos.life")

        const { statusCode, body } = await client.request({
            path: "/api/v2/img/neko",
            method: "GET"
        })

        if (statusCode == 200) {
            const data = await body.json()
            const image = data.url
            await message.reply(image)
        } else {
            await message.reply(responses.FAILED)
        }
    }
}