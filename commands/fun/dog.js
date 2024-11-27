const { Client } = require("undici")
const responseObj = require("../../responses.json")

module.exports = {
    data: {
        name: "dog",
        description: "Shows a random dog",
        args: "None"
    },
    async execute(message, args) {
        const cmd = this.data.name;
        const responses = responseObj[cmd];

        const client = new Client("https://dog.ceo")

        const { statusCode, body } = await client.request({
            path: "/api/breeds/image/random",
            method: "GET"
        })

        if (statusCode == 200) {
            const data = await body.json()
            const image = data.message
            await message.reply(image)
        } else {
            await message.reply(responses.FAILED)
        }
    }
}