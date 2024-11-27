module.exports = {
    data: {
        name: "avatar",
        description: "Get the avatar of a user!",
        args: "[@user]"
    },
    async execute(message, args) {
        const user = message.mentions.users.first() || message.author;
        const avatar = user.avatarURL({ size: 1024 });

        if (!avatar) return message.reply({content: `Avatar of ${user.tag}`, files: [user.defaultAvatarURL] });

        message.reply({ content: `Avatar of ${user.tag}`, files: [avatar] });
    }
}