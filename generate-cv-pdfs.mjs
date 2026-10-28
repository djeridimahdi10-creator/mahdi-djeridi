import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CV_CONFIGS = [
  {
    htmlFile: 'public/cv-fullstack-en.html',
    pdfFile: 'Mahdi_Djeridi_FullStack_Developer_CV.pdf',
    previewFile: 'public/preview-fullstack-en.png',
  },
  {
    htmlFile: 'public/cv-devops-en.html',
    pdfFile: 'Mahdi_Djeridi_DevOps_Engineer_CV.pdf',
    previewFile: 'public/preview-devops-en.png',
  },
  {
    htmlFile: 'public/cv-fullstack-fr.html',
    pdfFile: 'Mahdi_Djeridi_CV_Developpeur_FullStack_FR.pdf',
    previewFile: 'public/preview-fullstack-fr.png',
  },
  {
    htmlFile: 'public/cv-devops-fr.html',
    pdfFile: 'Mahdi_Djeridi_CV_Ingenieur_DevOps_FR.pdf',
    previewFile: 'public/preview-devops-fr.png',
  },
];

async function generateAllPDFs() {
  console.log('🚀 Launching Chromium for PDF generation...');
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1200, height: 1750 },
    deviceScaleFactor: 2,
  });

  const profilePhotoPath = path.resolve('public/profile.jpg');
  const photoBuffer = fs.readFileSync(profilePhotoPath);
  const photoBase64 = photoBuffer.toString('base64');
  const photoDataUri = `data:image/jpeg;base64,${photoBase64}`;

  for (const config of CV_CONFIGS) {
    const htmlPath = path.resolve(config.htmlFile);
    let htmlContent = fs.readFileSync(htmlPath, 'utf-8');
    htmlContent = htmlContent.replace(/src="profile\.jpg"/g, `src="${photoDataUri}"`);

    await page.setContent(htmlContent, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '0px', bottom: '0px', left: '0px', right: '0px' },
      preferCSSPageSize: true,
    });

    const rootPdfPath = path.resolve(config.pdfFile);
    const publicPdfPath = path.resolve('public', config.pdfFile);

    fs.writeFileSync(rootPdfPath, pdfBuffer);
    fs.writeFileSync(publicPdfPath, pdfBuffer);
    console.log(`✅ Generated PDF: ${config.pdfFile}`);

    // Take screenshot of first page
    const firstPage = await page.$('.cv-page');
    if (firstPage && config.previewFile) {
      const previewPath = path.resolve(config.previewFile);
      await firstPage.screenshot({ path: previewPath });
      console.log(`📸 Saved preview screenshot: ${config.previewFile}`);
    }
  }

  // Also update default legacy pdfs with French Full-Stack CV as primary default
  const defaultFrenchFullStackPdf = fs.readFileSync(path.resolve('Mahdi_Djeridi_CV_Developpeur_FullStack_FR.pdf'));
  fs.writeFileSync(path.resolve('djeridi-mahdi-cv.pdf'), defaultFrenchFullStackPdf);
  fs.writeFileSync(path.resolve('public/djeridi-mahdi-cv.pdf'), defaultFrenchFullStackPdf);

  // Update legacy djeridi-mahdi-cv.html with French version
  const frenchHtml = fs.readFileSync(path.resolve('public/cv-fullstack-fr.html'), 'utf-8');
  fs.writeFileSync(path.resolve('public/djeridi-mahdi-cv.html'), frenchHtml);

  // Update default previews with French CV preview
  if (fs.existsSync('public/preview-fullstack-fr.png')) {
    const frPreview = fs.readFileSync('public/preview-fullstack-fr.png');
    fs.writeFileSync('public/djeridi-mahdi-cv-preview.png', frPreview);
    fs.writeFileSync('public/cv_preview.png', frPreview);
  }

  console.log('✅ Updated default legacy files (djeridi-mahdi-cv.pdf, .html, previews) with French Full-Stack CV');

  await browser.close();
  console.log('🎉 All PDFs and previews generated successfully!');
}

generateAllPDFs().catch(console.error);

