const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");
const wiki = require("wikipedia");

// Setting Wikipedia module language as Uzbek
(async () => await wiki.setLang("uz"))();

// initialize env variables
require("dotenv").config();

const BOT_TOKEN = process.env.BOT_TOKEN;
// create a telegram bot app
const bot = new Telegraf(BOT_TOKEN);

const descFunc = (ctx) =>
  ctx.replyWithHTML(
    "Hello! I am <b>Currency Exchanger Telegram bot</b> powered by Javlon Nomozov with telegraf module.\ncommnds:\n/usd_uzs - dollar kursini bilish uchun\n/eur_uzs - Yevro kursini bilish uchun"
  );
// /start, /help commands' logic
// bot.command(["start", "help"], descFunc);

// @COMMMAND  /usd_uzs
// @DESC      USD to UZS exchange
bot.command(["usd_uzs"], (ctx) => {
  const usdUzsUrl =
    "https://v6.exchangerate-api.com/v6/a8f130afe395d732e4ce754d/pair/USD/UZS";
  (async () => {
    const response = await fetch(usdUzsUrl);
    const usdUzd = (await response.json()).conversion_rate;
    ctx.replyWithHTML(`1.00 Do'llar\n${usdUzd} So'm`);
  })();
});

// @COMMMAND  /eur_uzs
// @DESC      USD to UZS exchange
bot.command(["eur_uzs"], (ctx) => {
  const usdUzsUrl =
    "https://v6.exchangerate-api.com/v6/a8f130afe395d732e4ce754d/pair/EUR/UZS";
  (async () => {
    const response = await fetch(usdUzsUrl);
    const usdUzd = (await response.json()).conversion_rate;
    ctx.replyWithHTML(`1.00 Yevro\n${usdUzd} So'm`);
  })();
});

// description part
bot.on(message("text"), descFunc);

bot.launch();
