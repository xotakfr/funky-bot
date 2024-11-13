const responseObj = require("../../responses.json")

module.exports = {
    data: {
        name: "8ball",
        description: "Let the mighty 8ball answer all your questions."
    },
    async execute(message, args) {
        const cmd = this.data.name
        const responses = responseObj[cmd]

        const count = Object.keys(responses).length + 1;

        const answer = `${Math.floor(Math.random() * Math.floor(count))}`;

        message.reply(`:8ball: - "${args.join(" ")}" : ${responses[answer]}`)

    }
}