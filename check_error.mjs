import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('pageerror', error => {
    console.log('PAGE_ERROR:', error.message);
  });
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('CONSOLE_ERROR:', msg.text());
    }
  });

  try {
    await page.goto('http://localhost:3005', { waitUntil: 'networkidle0' });
    console.log("Successfully loaded the page.");
  } catch (err) {
    console.log("Failed to load:", err);
  }

  await browser.close();
})();
