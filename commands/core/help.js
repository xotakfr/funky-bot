const { EmbedBuilder } = require('discord.js')

module.exports = {
    data: {
        name: "help",
        description: "Shows an overview of all available commands.",
        args: "[command]"
    },
    async execute(message, args) {
        if (args.length !== 0) {
            const command = message.client.commands.get(args[0]);
            if (command) {
                let data = command.data
                let msg = "```Command overview : " + data.name + "```"
                + "\n" + data.description
                + "\n\n"
                + "Usage: `" + message.client.prefix + data.name + " " + data.args + "`";
                /*
                const embed = new EmbedBuilder()
                    .setTitle(command.data.name)
                    .setDescription(command.data.description)
                    .addFields({name: "Usage", value: command.data.args})
                    .setColor("#00ff00")
                message.reply({ embeds: [embed] });
                 */
                message.reply(msg);
            } else {
                message.reply("Command not found.");
            }
        } else {
            let helpOverview =
                "```List of all commands```"
                + "\nUse `" + message.client.prefix + "help [command]` to view further details for a specific command, e.g. `" + message.client.prefix + "help ping`.";
            let commands = message.client.commands;

            commands.forEach(command => {
                helpOverview += "\n`" + command.data.name + "`";
            });

            message.reply(helpOverview);
        }

    }
}