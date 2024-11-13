const { Client } = require("undici")
const responseObj = require("../../responses.json")

module.exports = {
    data: {
        name: "cat",
        description: "Shows a random cat (a real one)."
    },
    async execute(message, args) {
        const cmd = this.data.name;
        const responses = responseObj[cmd];

        const client = new Client("https://api.thecatapi.com")

        const { statusCode, body } = await client.request({
            path: "/v1/images/search",
            method: "GET"
        })

        if (statusCode == 200) {
            const data = await body.json()
            const image = data[0].url
            await message.reply(image)
        } else {
            await message.reply(responses.FAILED)
        }
    }
}