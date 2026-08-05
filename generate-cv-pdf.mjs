import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function generatePDFAndPNG() {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1200, height: 1600 },
    deviceScaleFactor: 2
  });

  const htmlPath = path.resolve('public/djeridi-mahdi-cv.html');
  const profilePhotoPath = path.resolve('public/profile.jpg');

  // Read HTML and fix the profile photo path to absolute so it renders in PDF
  let htmlContent = fs.readFileSync(htmlPath, 'utf-8');
  const absolutePhotoUrl = `file:///${profilePhotoPath.replace(/\\/g, '/')}`;
  htmlContent = htmlContent.replace(/src="profile\.jpg"/, `src="${absolutePhotoUrl}"`);

  await page.setContent(htmlContent, { waitUntil: 'networkidle' });

  // Generate PDF files
  const pdfPathRoot = path.resolve('djeridi-mahdi-cv.pdf');
  const pdfPathPublic = path.resolve('public/djeridi-mahdi-cv.pdf');

  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: '0px', bottom: '0px', left: '0px', right: '0px' }
  });

  fs.writeFileSync(pdfPathRoot, pdfBuffer);
  fs.writeFileSync(pdfPathPublic, pdfBuffer);

  console.log('PDFs generated successfully:\n-', pdfPathRoot, '\n-', pdfPathPublic);

  // Generate PNG screenshot of the .cv-page element
  const element = await page.$('.cv-page');
  if (element) {
    const pngPath = path.resolve('public/djeridi-mahdi-cv-preview.png');
    const pngPathLegacy = path.resolve('public/cv_preview.png');
    await element.screenshot({ path: pngPath });
    await element.screenshot({ path: pngPathLegacy });
    console.log('PNG Screenshots saved successfully');
  }

  await browser.close();
}

generatePDFAndPNG().catch(console.error);
