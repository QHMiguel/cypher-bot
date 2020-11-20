require("dotenv").config();
const Discord = require("discord.js");
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const db = require('quick.db');

bot.login(TOKEN);

var words = ["gfa", "gfita", "gfecita", "jefecita", "gfota", "gf"];

bot.on("ready", () => {
    console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on("message", (msg) => {

    if (!msg.author.bot) {
        for (let i = 0; i < words.length; i++) {
            var n = msg.content.search(words[i]);
            if (n != -1) {

                let userInfo = db.get('userInfo_' + msg.author.id);
                if (userInfo == null) {
                    db.set('userInfo_' + msg.author.id, { id: msg.author.id });
                    console.log(db.get('userInfo_' + msg.author.id));
                }
                let account = 'userInfo_' + msg.author.id;
                let userContGfas = db.get(account + '.contGfa');
                if (userContGfas == null) {
                    db.set(account + '.contGfa', 1);
                    console.log(db.get(account + '.contGfa'));
                } else {
                    userContGfas = db.get(account + '.contGfa');
                    db.set(account + '.contGfa', userContGfas + 1);
                }
                userContGfas = db.get(account + '.contGfa');

                msg.reply("Prohibido mencionar a la gfecita prro, " + userContGfas + "° advertencia!");

                break;
            }
        }
    }


});