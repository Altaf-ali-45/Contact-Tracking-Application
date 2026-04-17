const path = require("path");
const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1400, height: 900 },
  });

  const htmlPath = path.resolve(__dirname, "project-documentation.html");
  const outputPath = path.resolve(
    __dirname,
    "..",
    "Contact-Management-Project-Documentation.pdf",
  );

  await page.goto(`file://${htmlPath.replace(/\\/g, "/")}`, {
    waitUntil: "networkidle",
  });
  await page.pdf({
    path: outputPath,
    format: "A4",
    printBackground: true,
    margin: { top: "10mm", right: "8mm", bottom: "10mm", left: "8mm" },
  });

  await browser.close();
  console.log(outputPath);
})();
