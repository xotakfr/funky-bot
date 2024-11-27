module.exports = {
    data: {
        name: "icon",
        description: "Get the icon of a server!",
        args: "None"
    },
    async execute(message, args) {
        const icon = await message.guild.iconURL({ size: 1024 });

        if (!icon) return message.reply("This server does not have an icon.");

        message.reply({ content: `Icon of ${message.guild.name}`, files: [icon] });
    }
}