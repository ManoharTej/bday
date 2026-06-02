const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Ensure Playwright is installed
try {
    require.resolve('playwright');
} catch (e) {
    console.log('Playwright not found, installing locally...');
    execSync('npm install playwright --no-save', { stdio: 'inherit', cwd: __dirname });
}

const { chromium } = require('playwright');

const SCREENSHOTS_DIR = path.join(__dirname, 'screenshots');
if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

function getFilePath(filename) {
    return 'file:///' + path.join(__dirname, 'birthday-menace', filename).replace(/\\/g, '/');
}

async function capture() {
    console.log('Starting screenshot capture...');
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        permissions: ['microphone', 'camera'],
        viewport: { width: 1280, height: 800 }
    });
    const page = await context.newPage();

    // 00. Loading Screen
    console.log('Capturing Landing/Loading Screen...');
    await page.goto(getFilePath('index.html'));
    await page.waitForTimeout(1000);
    // Click page to start movie
    await page.click('body');
    await page.waitForTimeout(1000);
    // Force choice modal to show immediately
    await page.evaluate(() => {
        document.getElementById('modal-choice').classList.add('modal-show');
    });
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '00_landing.png') });

    // 01. Task 1 - Slide Puzzle Rules
    console.log('Capturing Task 1 Rules...');
    await page.goto(getFilePath('task1.html'));
    await page.waitForTimeout(1000);
    await page.evaluate(() => {
        document.getElementById('modal-greeting').classList.remove('modal-active');
        document.getElementById('modal-rules').classList.add('modal-active');
    });
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '01_task1_rules.png') });

    // Task 1 - Slide Puzzle Board
    console.log('Capturing Task 1 Puzzle...');
    await page.evaluate(() => {
        Game.commenceGame();
    });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '01_task1_board.png') });

    // Task 1 - Victory
    console.log('Capturing Task 1 Victory...');
    await page.evaluate(() => {
        Game.state.isSolved = true;
        Game.initVictoryReveal();
    });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '01_task1_victory.png') });

    // Task 1 - Reward Scratch Card
    console.log('Capturing Task 1 Scratch Card...');
    await page.evaluate(() => {
        Game.spawnReward();
        Game.openScratchCard();
        const canvas = document.getElementById('scratch-canvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath(); ctx.arc(100, 100, 80, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.arc(200, 150, 80, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.arc(300, 100, 80, 0, Math.PI * 2); ctx.fill();
        }
    });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '01_task1_scratch.png') });

    // 02. Task 2 - Click Pattern
    console.log('Capturing Task 2 Click Pattern...');
    await page.goto(getFilePath('task2.html'));
    await page.waitForTimeout(1000);
    await page.evaluate(() => {
        Game.showRules();
        Game.commenceTask();
    });
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '02_task2_board.png') });

    // 03. Task 3 - Truth or Dare Options
    console.log('Capturing Task 3 Truth or Dare Selection...');
    await page.goto(getFilePath('task3.html'));
    await page.waitForTimeout(1000);
    await page.evaluate(() => {
        Game.showRules();
        Game.startTask();
    });
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '03_task3_options.png') });

    // Task 3 - Recording Interface
    console.log('Capturing Task 3 Recording...');
    await page.evaluate(() => {
        Game.prepSpyChallenge('truth');
    });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '03_task3_recording.png') });

    // 04. Task 4 - Glitchy Catch
    console.log('Capturing Task 4 Glitchy Catch...');
    await page.goto(getFilePath('task4.html'));
    await page.waitForTimeout(1000);
    await page.evaluate(() => {
        Game.startTask();
    });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '04_task4_play.png') });

    // 05. Task 5 - Sacrifice Grid
    console.log('Capturing Task 5 Surprise Boxes...');
    await page.goto(getFilePath('task5.html'));
    await page.waitForTimeout(1000);
    await page.evaluate(() => {
        Game.sacrificeAndStart();
    });
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '05_task5_grid.png') });

    // 06. Task 6 - Coconut shell shuffle
    console.log('Capturing Task 6 Coconut Gamble...');
    await page.goto(getFilePath('task6.html'));
    await page.waitForTimeout(1000);
    await page.evaluate(() => {
        Game.startHidingSequence();
    });
    await page.waitForTimeout(2000); // Wait for shuffle animations
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '06_task6_play.png') });

    // 07. Task 7 - Inverted Highway driving
    console.log('Capturing Task 7 Neon Highway...');
    await page.goto(getFilePath('task7.html'));
    await page.waitForTimeout(1000);
    await page.evaluate(() => {
        Control.begin();
    });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '07_task7_play.png') });

    // 08. Task 8 - Pop-Up Firewall
    console.log('Capturing Task 8 Popup Firewall...');
    await page.goto(getFilePath('task8.html'));
    await page.waitForTimeout(1000);
    await page.evaluate(() => {
        Game.start();
        Game.spawnPopup();
    });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '08_task8_firewall.png') });

    // 09. Task 9 - Brainwash Quiz terminal
    console.log('Capturing Task 9 Brainwash Quiz...');
    await page.goto(getFilePath('task9.html'));
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '09_task9_quiz.png') });

    // 10. Task 10 - Grand Finale box
    console.log('Capturing Task 10 Grand Finale Box...');
    await page.goto(getFilePath('task10.html'));
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '10_task10_box.png') });

    // Task 10 - Birthday Cake
    console.log('Capturing Task 10 Birthday Cake...');
    await page.evaluate(() => {
        Engine.openSurprise();
    });
    await page.waitForTimeout(3000); // Wait for glitch cinematic
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '10_task10_cake.png') });

    // Task 10 - Final Photo Card
    console.log('Capturing Task 10 Postcard...');
    await page.evaluate(() => {
        Engine.takeShot = function() {
            const video = document.getElementById('video-preview');
            const out = document.getElementById('canvas-output');
            const ctx = out.getContext('2d');
            
            out.width = 640;
            out.height = 480;
            ctx.fillStyle = '#FFF0F5'; // LavenderBlush background
            ctx.fillRect(0, 0, out.width, out.height);
            
            // Draw a cute birthday frame border
            ctx.strokeStyle = '#D81B60';
            ctx.lineWidth = 15;
            ctx.strokeRect(0, 0, out.width, out.height);
            
            // Draw text
            ctx.font = 'bold 36px Quicksand, sans-serif';
            ctx.fillStyle = '#D81B60';
            ctx.textAlign = 'center';
            ctx.fillText('🎂 HAPPY BIRTHDAY! 🎂', out.width / 2, 200);
            
            ctx.font = '28px Quicksand, sans-serif';
            ctx.fillStyle = '#333';
            ctx.fillText('Akshara is officially a monkey 🐒', out.width / 2, 260);
            
            document.getElementById('final-reveal-screen').style.display = 'flex';
            document.getElementById('bottom-ui').style.display = 'none';
        };
        Engine.takeShot();
    });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '10_task10_postcard.png') });

    // 11. Gifts - Treasure Chest
    console.log('Capturing Gifts Page - Chest...');
    await page.goto(getFilePath('gifts.html'));
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '11_gifts_chest.png') });

    // Gifts - Letter
    console.log('Capturing Gifts Page - Letter...');
    await page.evaluate(() => {
        App.state.keys = 5;
        App.openChest();
    });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '11_gifts_letter.png') });

    // Gifts - Friend Wishes
    console.log('Capturing Gifts Page - Friend Wishes...');
    await page.evaluate(() => {
        App.startFriends();
    });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '11_gifts_wishes.png') });

    // Gifts - Braces Twist
    console.log('Capturing Gifts Page - Braces Twist...');
    await page.evaluate(() => {
        App.sendTelegram('BOOK');
    });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '11_gifts_braces.png') });

    await browser.close();
    console.log('Capture finished successfully!');
}

capture().catch(err => {
    console.error('Error during capture:', err);
    process.exit(1);
});
