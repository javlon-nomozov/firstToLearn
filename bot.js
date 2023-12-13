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

// /start, /help commands' logic
bot.command(["start", "help"], (ctx) =>
  ctx.replyWithHTML(
    "Hello! I am <b>Echo Telegram bot</b> powered by Javlon Nomozov with telegraf module."
  )
);

// Wikipedia bot
bot.on(message("text"), async (ctx) => {
  const inputText = ctx.message.text;
  try {
    let page;
    await (async () => {
      try {
        page = await wiki.page(inputText);
        console.log({ page });
      } catch (error) {
        const searchResults = await wiki.search(inputText);
        return ctx.reply(
          "Qaysi maqolani olmoqchisiz:\n".concat(
            searchResults.results.map((el) => el.title).join(",\n")
          )
        );
      }
    })();
    if (page) {
      console.log({ pdf: await page.pdf() });
      let content = await page.content();
      if (content.length > 4000) {
        content = content.slice(0, 4000) + "...";
      }
      await ctx.reply(content);
      // sending content as pdf file
      await ctx.replyWithDocument(await page.pdf(), {
        caption: "Pdf formatda to'liq holda ko'rishingiz mumkin",
      });
    }
  } catch (error) {
    console.log(error);
    console.log("Bunday maqola mavjud emas");
  }
});

bot.launch();
