const cheerio = require("cheerio");
const request = require("request");

function getdata() {
  request("https://www.buzzfeed.com/", (error, response, html) => {
    if (!error && response.statusCode === 200) {
      const $ = cheerio.load(html);

      let item = [];

      let items = $("article").each((i, el) => {
        let title = $(el).find("h2").text().replace(/\s\s+/g, "");
        let description = $(el)
          .find(".js-card__description")
          .text()
          .replace(/\s\s+/g, "");
        let image = $(el).find("img").attr("src");
        let link = $(el).find("a").attr("href");

        item.push({
          title: title,
          description: description,
          image: image,
          link: link,
        });
      });
      return item;
    }
  });
}
console.log(getdata());
module.exports = getdata;
