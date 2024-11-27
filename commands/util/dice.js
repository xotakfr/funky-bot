module.exports = {
    data: {
        name: "dice",
        description: "Roll up to 100 dices (provides random numbers).",
        args: "[max] [amount]"
    },
    async execute(message, args) {
        let max = parseInt(args[0], 10) + 1;
        let amount = parseInt(args[1], 10);
        let total = 0;

        if(!max || max <= 1 || max > 1001) max = 7;
        if(!amount || amount <= 0 || amount > 100) amount = 1;

        let msg = `Rolling ${amount} d${max - 1}. Results:\n\`\`\``;

        for(let i = 0; i < amount; i++) {
            let num = 0;
            while(num == 0) num = Math.floor(Math.random() * Math.floor(max));
            msg += num + ", ";
            total += num;
        }

        msg += `total: ${total}\`\`\``;

        message.reply(msg);
    }
}