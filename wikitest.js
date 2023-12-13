const wiki = require("wikipedia");

(async () => await wiki.setLang("uz"))();

async () => {
  try {
    const searchResults = await wiki.search("Alisher Navoiy");

    console.log(searchResults.results.map((el) => el.title).join(",\n"));
    //Response of type @wikiSearchResult - contains results and optionally a suggestion
    // console.log(newUrl);
    //Returns the api url with language changed - use `languages()` method to see a list of available langs
  } catch (error) {
    console.log(error);
    //=> Typeof wikiError
  }
};

const inputText = "Alish";
(async () => {
  try {
    let page;
    if(!(await (async () => {
      try {
        page = await wiki.page(inputText);
        console.log({page});
      } catch (error) {
        const searchResults = await wiki.search(inputText);
        return console.log(
          "Qaysi maqolani olmoqchisiz:\n".concat(
            searchResults.results.map((el) => el.title).join(",\n")
          )
        );
      }
    })())){
        
    }
    if (!page){
        throw ''
    }
    console.log({ pdf: page });
    let content = await page.content();
    // sending content as pdf file
    // (await page.pdf(), {
    //   caption: "Pdf formatda to'liq holda ko'rishingiz mumkin",
    // });
    // content
    if (content.length > 4000) {
      content = content.slice(0, 4000) + "...";
    }
    console.log(content);
  } catch (error) {
    console.log(error);
    console.log("Bunday maqola mavjud emas");
  }
})();
