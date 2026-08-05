const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const artifactDir = "C:\\Users\\djeridi.mahdi\\.gemini\\antigravity-ide\\brain\\4a265a37-3454-44b0-a4ac-4707e0169987";
  console.log('Launching Playwright browser to test 7 Storytelling Chapters...');
  
  const browser = await chromium.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--ignore-gpu-blocklist',
      '--enable-gpu',
      '--use-gl=angle',
    ]
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  const consoleLogs = [];
  page.on('console', msg => consoleLogs.push(`[${msg.type()}] ${msg.text()}`));
  page.on('pageerror', err => consoleLogs.push(`[PAGE_ERROR] ${err.message}`));

  console.log('Navigating to http://localhost:3000/...');
  try {
    await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded', timeout: 15000 });
  } catch (e) {
    await page.goto('http://localhost:3001/', { waitUntil: 'domcontentloaded', timeout: 15000 });
  }
  
  await page.waitForTimeout(3000);

  // Chapter 1: Hero
  await page.screenshot({ path: path.join(artifactDir, 'ch1_hero.png') });
  console.log('Saved ch1_hero.png');

  // Chapter 2: About Me
  await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 1.1, behavior: 'smooth' }));
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(artifactDir, 'ch2_about.png') });
  console.log('Saved ch2_about.png');

  // Chapter 3: Tech Stack Architecture
  await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 2.2, behavior: 'smooth' }));
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(artifactDir, 'ch3_skills.png') });
  console.log('Saved ch3_skills.png');

  // Chapter 4: AI & Data Flow
  await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 3.3, behavior: 'smooth' }));
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(artifactDir, 'ch4_dataflow.png') });
  console.log('Saved ch4_dataflow.png');

  // Chapter 5: Featured Projects Showcase
  await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 4.4, behavior: 'smooth' }));
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(artifactDir, 'ch5_projects.png') });
  console.log('Saved ch5_projects.png');

  // Chapter 6: Timeline & Milestones
  await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 5.5, behavior: 'smooth' }));
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(artifactDir, 'ch6_timeline.png') });
  console.log('Saved ch6_timeline.png');

  // Chapter 7: Contact & Outro
  await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 6.6, behavior: 'smooth' }));
  await page.waitForTimeout(2500);
  await page.screenshot({ path: path.join(artifactDir, 'ch7_contact.png') });
  console.log('Saved ch7_contact.png');

  console.log('\n--- BROWSER CONSOLE LOGS ---');
  console.log(consoleLogs.length > 0 ? consoleLogs.join('\n') : 'No console errors!');

  await browser.close();
  console.log('7-CHAPTER STORYTELLING TEST COMPLETE!');
})();
