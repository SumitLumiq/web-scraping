console.log("hello!!!");
const puppeteer = require("puppeteer");
const fs = require("fs");

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.traversymedia.com");

  //   await page.screenshot({ path: "example.png", fullPage: true });
  //   await page.pdf({ path: "example.pdf", format: "A4" });

  //   const html = await page.content();
  //   console.log(html);

  //   const title = await page.evaluate(() => {
  //     return document.title;
  //   });
  //   console.log(title);

  //   const text = await page.evaluate(() => {
  //     return document.body.innerText;
  //   });
  //   console.log(text);

  //   const links = await page.evaluate(() =>
  //     Array.from(document.querySelectorAll("a"), (e) => e.href)
  //   );
  //   console.log(links);

  //   const courses = await page.evaluate(() =>
  //     Array.from(document.querySelectorAll("#cscourses .card"), (e) => ({
  //       title: e.querySelector(".card-body h3").innerText,
  //       level: e.querySelector(".card-body .level").innerText,
  //       img: e.querySelector("img").src,
  //       link: e.querySelector(".card-footer a").href,
  //     }))
  //   );
  //   console.log(courses);

  const courses = await page.$$eval("#cscourses .card", (elements) =>
    elements.map((e) => ({
      title: e.querySelector(".card-body h3").innerText,
      level: e.querySelector(".card-body .level").innerText,
      img: e.querySelector("img").src,
      link: e.querySelector(".card-footer a").href,
    }))
  );
  console.log(courses);

  fs.writeFile("courses.json", JSON.stringify(courses), (err) => {
    if (err) throw err;
    console.log("File Saved");
  });

  await browser.close();
}
run();
