const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const writeStream = fs.createWriteStream("aeg.json");
const writeStream1 = fs.createWriteStream("allAeg.json");

const AEG_URL =
  "https://hristo.hr/kategorija-proizvoda/airsoft-replike/elektricne-airsoft-replike/";

let numOfPages = 48;
const allWeapons = [];

for (let i = 1; i < numOfPages; i++) {
  request(`${AEG_URL}/page/${i}/`, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      $(".product-grid-item").each((i, element) => {
        const title = $(element).find(".wd-entities-title > a").text();
        const url = $(element).find(".wd-entities-title > a")['0'].attribs.href;
        const priceEuro = $(element).find(".price_euro").text();
        const formattedPriceEuro = priceEuro.replace('~ €', '').replace(',','.');
        const isDiscounted = $(element).find("span.onsale").length > 0;
        const available = !!$(element).find('span.out-of-stock')

         allWeapons.push({ id: i, title, priceEuro: Number(formattedPriceEuro), isDiscounted, available, url });
         fs.writeFileSync("aeg.json", JSON.stringify(allWeapons));
      });
    }
  });
}
