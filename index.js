const puppeteer = require('puppeteer');
const Table = require('cli-table3');

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://magicpin.in/New-Delhi/Paharganj/Restaurant/Eatfit/store/61a193/delivery/');

  await page.waitForSelector('article.itemInfo p.itemName a');

  const items = await page.$$eval('article.itemInfo', (elements) => {
    return elements.map((element) => {
      const name = element.querySelector('p.itemName a').textContent.trim();
      const price = element.querySelector('p:nth-child(2) span').textContent.trim();

      return { name, price };
    });
  });

  const table = new Table({
    head: ['Item', 'Name', 'Price'],
  });

  items.forEach((item, index) => {
    table.push([index + 1, item.name, item.price]);
  });

  console.log(table.toString());

  await browser.close();
}

run();
