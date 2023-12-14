const dotenv = require("dotenv");
dotenv.config();

const { filterMap } = require("./utils/array");
Array.prototype.filterMap = filterMap;

const api = process.env.DICTIONARY_API;

let definitions = [];
const audios = [];

// const word = "hi";
// const word = "hello";
const word = "Salom Dunyo";
// const word = "book";

const fullLink = `${api}${word}`;
(async () => {
  const response = await fetch(fullLink);
  const jsonData = await response.json();
  console.log(jsonData);
  if (!jsonData.title) {
    jsonData[0].phonetics.forEach((element) => {
      if (element.audio) audios.push(element.audio);
    });
    console.log(
      "definitions",
      jsonData[0].meanings[0].definitions[0].definition
    );
    definitions = jsonData
      .filterMap((el) => el.meanings)
      .flat(1)
      .filterMap((el) => el.definitions)
      .flat(1)
      .filterMap((el) => el.definition)
      .flat(1);
    console.log({ audios });
    console.log({ definitions });
  } else {
    console.log("This word isn't Found");
    var translate = require("translation-google");

    let res = await translate(word, { to: "uz" });
    const detectedLang = res.from.language.iso;
    if (detectedLang == "uz") {
      res = await translate(word, { to: "en" });
    }    
    console.log({ ch: res.text });
  }
})();
