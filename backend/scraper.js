const puppeteer = require('puppeteer')

async function getProteinInfo(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url)

  const [el] = await page.$x(/html/body/table[4]);

  await browser.close()
}

export {getProteinInfo}