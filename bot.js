const translate = require("translation-google");

// const translate = require("translation-google");
const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");
const { filterMap } = require("./utils/array");

Array.prototype.filterMap = filterMap;
const wiki = require("wikipedia");

// Setting Wikipedia module language as Uzbek
(async () => await wiki.setLang("uz"))();

// initialize env variables
require("dotenv").config();

const DICTIONARY_API = process.env.DICTIONARY_API;
const BOT_TOKEN = process.env.BOT_TOKEN;
// create a telegram bot app
const bot = new Telegraf(BOT_TOKEN);

// /start, /help commands' logic
bot.command(["start", "help"], (ctx) => {
  ctx.replyWithHTML(
    "Hello! I am <b>Dictionary Telegram bot</b> powered by Javlon Nomozov with telegraf module."
  );
});

// Dictionary part
bot.on(message("text"), async (ctx) => {
  let definitions = [];
  const audios = [];

  const word = ctx.message.text;
  const fullLink = `${DICTIONARY_API}${word}`;
  const response = await fetch(fullLink);
  const jsonData = await response.json();
  if (!jsonData.title) {
    jsonData[0].phonetics.forEach((element) => {
      if (element.audio) audios.push(element.audio);
    });
    definitions = jsonData
      .filterMap((el) => el.meanings)
      .flat(1)
      .filterMap((el) => el.definitions)
      .flat(1)
      .filterMap((el) => el.definition)
      .flat(1);
    let content = definitions.join("\n👉");
    if (content.length > 4000) {
      content = content.slice(0, 4000) + "...";
    }
    await ctx.reply(content);
    for (let i = 0; i < audios.length; i++) {
      const el = audios[i];
      await ctx.replyWithAudio(el);
    }
  } else {
    console.log({ word });

    let res = await translate(word, { to: "uz" });
    const detectedLang = res.from.language.iso;
    if (detectedLang == "uz") {
      res = await translate(word, { to: "en" });
    }

    ctx.reply(res.text);
  }
});

bot.launch();
