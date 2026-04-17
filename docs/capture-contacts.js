const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });

  await page.goto("http://localhost:5173/login", { waitUntil: "networkidle" });
  await page.fill('input[placeholder="Enter your username"]', "test");
  await page.fill('input[placeholder="Enter your password"]', "test123");
  await page.click('button:has-text("Sign In")');
  await page.waitForURL("**/contacts", { timeout: 10000 });
  await page.waitForTimeout(1200);

  await page.screenshot({
    path: "docs/images/contacts-page.png",
    fullPage: true,
  });
  await browser.close();
})();
