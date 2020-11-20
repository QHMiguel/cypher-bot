require("dotenv").config();
const Discord = require("discord.js");
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const db = require("quick.db");

bot.login(TOKEN);

var words = [
  "gfa",
  "gfita",
  "gfecita",
  "jefecita",
  "gfota",
  "gf",
  "gf4",
  "9fa",
  "9fe",
  "9fi",
  "9fo",
  "Gefa",
  "Gfa",
  "gefa"
];

bot.on("ready", () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on("message", msg => {
  if (!msg.author.bot) {
    for (let i = 0; i < words.length; i++) {
      let mensaje = msg.content.toLowerCase();
      console.log(mensaje);
      let n = mensaje.search(words[i]);
      if (n != -1) {
        let userInfo = db.get("userInfo_" + msg.author.id);
        if (userInfo == null) {
          db.set("userInfo_" + msg.author.id, { id: msg.author.id });
          console.log(db.get("userInfo_" + msg.author.id));
        }
        let account = "userInfo_" + msg.author.id;
        let userContGfas = db.get(account + ".contGfa");
        if (userContGfas == null) {
          db.set(account + ".contGfa", 1);
          console.log(db.get(account + ".contGfa"));
        } else {
          userContGfas = db.get(account + ".contGfa");
          db.set(account + ".contGfa", userContGfas + 1);
        }
        userContGfas = db.get(account + ".contGfa");
        if (userContGfas == 10) {
          msg.reply("La ptmr, no entiendes o khe >:v ");
        } else {
          msg.reply(
            "Prohibido mencionar a la gfecita prro, " +
              userContGfas +
              "° advertencia!"
          );
        }

        break;
      }
    }
  }
});
