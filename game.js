const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 750;

// --- LOCALIZATION SYSTEM ---
let g_lang = 'en'; // 'en' or 'tr'
let g_musicEnabled = true;
let g_soundsEnabled = true;
let g_musicVolume = 0.5;
let g_soundsVolume = 0.5;
const translations = {
    en: {
        score: "Score:",
        highScore: "High Score:",
        pause: "PAUSE (P)",
        resume: "RESUME (P)",
        weapon: "Weapon:",
        gems: "Gems",
        bombs: "BOMBS:",
        pressB: "(Press B)",
        powerup: "POWERUP:",
        wave: "WAVE",
        warning: "WARNING: MOTHERSHIP",
        startTitle: "Space Shooter",
        startInstr: "WASD/Arrows to move. X to shoot. Space: Shield. Shift: Dash.",
        startBtn: "Start New Game",
        continueBtn: "Continue Saved Game",
        gameOver: "Game Over",
        restartBtn: "Start New Game",
        continueWave: "Continue from Wave",
        shopTitle: "Hangar / Shop",
        shopCredits: "Credits:",
        shopResume: "Resume Mission",
        itemHpName: "Hull Integrity",
        itemHpDesc: "Increase Max HP",
        itemSpeedName: "Overclock",
        itemSpeedDesc: "Increase Move Speed",
        itemRepairName: "Nano-Repair",
        itemRepairDesc: "Restore 1 HP",
        itemBombsName: "Bomb Capacity",
        itemBombsDesc: "More Max Bombs",
        itemPlasmaName: "Plasma Cannon",
        itemPlasmaDesc: "Slow but high damage",
        itemExplosiveName: "Explosive Rounds",
        itemExplosiveDesc: "Area damage on hit",
        itemLaserName: "Laser Beam",
        itemLaserDesc: "Fast & precise",
        cost: "Cost:",
        pausedText: "PAUSED",
        resumeHint: "Press P or ESC to Resume",
        waveComplete: "WAVE COMPLETED",
        returningToHangar: "RETURNING TO HANGAR...",
        shipSelectTitle: "SELECT YOUR SHIP",
        shipBalanced: "Balanced Cruiser",
        shipSpeed: "Light Interceptor",
        shipHeavy: "Heavy Dreadnought",
        victoryTitle: "GALACTIC VICTORY",
        victoryText: "You have defeated the Mothership and saved the galaxy!",
        playAgain: "Play Again",
        empReady: "EMP: READY",
        shieldReady: "SHIELD: READY",
        dashReady: "DASH: READY",
        pressE: "(Press E)",
        pressSpace: "(Press Space)",
        pressShift: "(Shift: Dash)",
        solarActivity: "WARNING: SOLAR ACTIVITY",
        meteorShower: "WARNING: METEOR SHOWER",
        gravityAnomaly: "WARNING: GRAVITY ANOMALY",
        combo: "COMBO"
    },
    tr: {
        score: "Skor:",
        highScore: "En Yüksek:",
        pause: "DURAKLAT (P)",
        resume: "DEVAM ET (P)",
        weapon: "Silah:",
        gems: "Mücevher",
        bombs: "BOMBA:",
        pressB: "(B'ye Bas)",
        powerup: "GÜÇLENDİRME:",
        wave: "DALGA",
        warning: "UYARI: ANA GEMİ",
        startTitle: "Uzay Savaşçısı",
        startInstr: "WASD/Oklar: Hareket. X: Ateş. Boşluk: Kalkan. Shift: Atılma.",
        startBtn: "Yeni Oyun Başlat",
        continueBtn: "Kayıtlı Oyuna Devam Et",
        gameOver: "Oyun Bitti",
        restartBtn: "Yeni Oyun Başlat",
        continueWave: "Dalga'dan Devam Et",
        shopTitle: "Hangarlar / Market",
        shopCredits: "Kredi:",
        shopResume: "Görevi Sürdür",
        itemHpName: "Gövde Direnci",
        itemHpDesc: "Max HP'yi artırır",
        itemSpeedName: "Hız Aşırtma",
        itemSpeedDesc: "Hızı artırır",
        itemRepairName: "Nano-Tamir",
        itemRepairDesc: "1 HP Yeniler",
        itemBombsName: "Bomba Kapasitesi",
        itemBombsDesc: "Max Bomba Sayısı",
        itemPlasmaName: "Plazma Topu",
        itemPlasmaDesc: "Yavaş ama yüksek hasar",
        itemExplosiveName: "Patlayıcı Mermi",
        itemExplosiveDesc: "Alan hasarı verir",
        itemLaserName: "Lazer Işını",
        itemLaserDesc: "Hızlı ve hassas",
        cost: "Maliyet:",
        pausedText: "DURAKLATILDI",
        resumeHint: "Devam etmek için P veya ESC'ye basın",
        waveComplete: "DALGA TAMAMLANDI",
        returningToHangar: "HANGARA DÖNÜLÜYOR...",
        shipSelectTitle: "GEMİNİ SEÇ",
        shipBalanced: "Dengeli Kruvazör",
        shipSpeed: "Hafif Önleyici",
        shipHeavy: "Ağır Zırhlı",
        victoryTitle: "GALAKTİK ZAFER",
        victoryText: "Ana Gemiyi yendin ve galaksiyi kurtardın!",
        playAgain: "Tekrar Oyna",
        empReady: "EMP: HAZIR",
        shieldReady: "KALKAN: HAZIR",
        dashReady: "ATILMA: HAZIR",
        pressE: "(E'ye Bas)",
        pressSpace: "(Boşluk: Kalkan)",
        pressShift: "(Shift: Atılma)",
        solarActivity: "UYARI: GÜNEŞ ETKİNLİĞİ",
        meteorShower: "UYARI: METEOR YAĞMURU",
        gravityAnomaly: "UYARI: YERÇEKİMİ ANOMALİSİ",
        combo: "KOMBO"
    }
};
// -----------------------------

// UI Elements
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('high-score');
const finalScoreElement = document.getElementById('final-score');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const hpBarFill = document.getElementById('hp-bar-fill');
const weaponLevelElement = document.getElementById('weapon-level');
const bossUI = document.getElementById('boss-ui');
const bossHpFill = document.getElementById('boss-hp-fill');
const bombCountElement = document.getElementById('bomb-count');
const comboUI = document.getElementById('combo-ui');
const comboText = document.getElementById('combo-text');
const waveUI = document.getElementById('wave-ui');
const waveText = document.getElementById('wave-text');
const gameContainer = document.getElementById('game-container');
const powerupStatusElement = document.getElementById('powerup-status');
const continueBtn = document.getElementById('continue-btn');
const continueGameoverBtn = document.getElementById('continue-gameover-btn');
const continueWaveNum = document.getElementById('continue-wave-num');
const gameoverWaveInfo = document.getElementById('gameover-wave-info');
const empStatusElement = document.getElementById('emp-status');
const shieldAbilityStatusElement = document.getElementById('shield-ability-status');
const dashStatusElement = document.getElementById('dash-status');
const shopScreen = document.getElementById('shop-screen');
let shopGemsCount = document.getElementById('shop-gems-count');
const closeShopBtn = document.getElementById('close-shop-btn');
const langToggleBtn = document.getElementById('lang-toggle-btn');
const langToggleBtnPause = document.getElementById('lang-toggle-btn-pause');
const victoryScreen = document.getElementById('victory-screen');
const victoryScoreElement = document.getElementById('victory-score');
const victoryRestartBtn = document.getElementById('victory-restart-btn');

function updateLanguageUI() {
    const t = translations[g_lang];
    document.documentElement.lang = g_lang; // Sync HTML lang for correct CSS casing (Turkish İ)

    // Start Screen
    const startTitle = document.querySelector('#start-screen h1');
    const startInstr = document.querySelector('#start-screen p');
    if (startTitle) startTitle.innerText = t.startTitle;
    if (startInstr) startInstr.innerText = t.startInstr;
    if (startBtn) startBtn.innerText = t.startBtn;
    if (continueBtn) continueBtn.innerText = t.continueBtn;

    // Game Over Screen
    const gameOverTitle = document.querySelector('#game-over-screen h1');
    if (gameOverTitle) gameOverTitle.innerText = t.gameOver;
    if (restartBtn) restartBtn.innerText = t.restartBtn;

    // Victory Screen
    const victoryTitle = document.querySelector('#victory-screen h1');
    const victoryText = document.querySelector('#victory-screen p:not([id])');
    if (victoryTitle) victoryTitle.innerText = t.victoryTitle;
    if (victoryText) victoryText.innerText = t.victoryText;
    if (victoryRestartBtn) victoryRestartBtn.innerText = t.playAgain;
    const continueGameOverBtn = document.getElementById('continue-gameover-btn');
    if (continueGameOverBtn) {
        continueGameOverBtn.innerHTML = `⚡ ${t.continueWave} <span id="continue-wave-num">${g_wave}</span>`;
    }

    // Ship Selection Screen
    const shipSelectTitle = document.getElementById('ship-select-title');
    if (shipSelectTitle) shipSelectTitle.innerText = t.shipSelectTitle;
    const shipOptions = document.querySelectorAll('.ship-option h2');
    if (shipOptions.length === 3) {
        shipOptions[0].innerText = t.shipBalanced;
        shipOptions[1].innerText = t.shipSpeed;
        shipOptions[2].innerText = t.shipHeavy;
    }

    // HUD
    // Note: Score and High Score are dynamic so we just update their labels if needed in update()
    // But let's handle the static parts here or in their update functions
    if (bombCountElement) {
        // We'll update this in the HUD update loop
    }
    const pauseBtn = document.getElementById('pause-btn-ui');
    if (pauseBtn) pauseBtn.innerText = window.isPausedGlobal ? t.resume : t.pause;

    // Shop
    const shopTitle = document.querySelector('#shop-screen h1');
    const shopCreditsLabel = document.getElementById('shop-credits-label');
    const shopGemsSuffix = document.getElementById('shop-gems-suffix');
    if (shopTitle) shopTitle.innerText = t.shopTitle;
    if (shopCreditsLabel) shopCreditsLabel.innerText = t.shopCredits;
    if (shopGemsSuffix) shopGemsSuffix.innerText = t.gems;

    // Shop Items
    const items = [
        { id: 'hp', name: t.itemHpName, desc: t.itemHpDesc },
        { id: 'speed', name: t.itemSpeedName, desc: t.itemSpeedDesc },
        { id: 'repair', name: t.itemRepairName, desc: t.itemRepairDesc },
        { id: 'bombs', name: t.itemBombsName, desc: t.itemBombsDesc },
        { id: 'plasma', name: t.itemPlasmaName, desc: t.itemPlasmaDesc },
        { id: 'explosive', name: t.itemExplosiveName, desc: t.itemExplosiveDesc },
        { id: 'laser', name: t.itemLaserName, desc: t.itemLaserDesc }
    ];
    items.forEach(item => {
        const div = document.getElementById(`shop-item-${item.id}`);
        if (div) {
            div.querySelector('h3').innerText = item.name;
            div.querySelector('p').innerText = item.desc;
            const b = div.querySelector('.buy-btn');
            b.innerHTML = `${t.cost} <span class="cost">${g_upgradeCosts[item.id]}</span>`;
        }
    });

    if (closeShopBtn) closeShopBtn.innerText = t.shopResume;

    // Toggle Button labels
    if (langToggleBtn) langToggleBtn.innerText = g_lang === 'en' ? 'TÜRKÇE' : 'ENGLISH';
    if (langToggleBtnPause) langToggleBtnPause.innerText = g_lang === 'en' ? 'TÜRKÇE' : 'ENGLISH';

    // Update weapon status UI for gem labels
    updatePlayerStatusUI();
}

window.toggleLanguage = function () {
    g_lang = g_lang === 'en' ? 'tr' : 'en';
    updateLanguageUI();
    saveGame(); // Save language preference
    playSound('powerup');
};

if (langToggleBtn) langToggleBtn.addEventListener('click', window.toggleLanguage);
if (langToggleBtnPause) langToggleBtnPause.addEventListener('click', window.toggleLanguage);

window.toggleMusic = function () {
    g_musicEnabled = !g_musicEnabled;
    saveGame();
    updateMusicUI();
    playSound('powerup');
    if (g_musicEnabled) {
        initAudio();
        // Force refresh music if state permits
        if (gameState === 'START') MusicManager.start('MENU');
        else if (g_isShopOpen) MusicManager.start('HANGAR');
        else if (boss) MusicManager.start('BOSS');
        else if (gameState === 'PLAYING') MusicManager.start('COMBAT');
    } else {
        MusicManager.stop();
    }
};

window.toggleSounds = function () {
    g_soundsEnabled = !g_soundsEnabled;
    saveGame();
    updateSoundsUI();
    playSound('powerup');
};

window.setMusicVolume = function (val) {
    g_musicVolume = parseFloat(val);
    saveGame();
    // Update all sliders
    document.querySelectorAll('.music-vol-slider').forEach(s => s.value = val);
    // Immediate volume update for currently playing music
    if (window.musicMasterGain) {
        window.musicMasterGain.gain.setTargetAtTime(g_musicVolume, audioCtx.currentTime, 0.05);
    }
};

window.setSoundsVolume = function (val) {
    g_soundsVolume = parseFloat(val);
    saveGame();
    // Update all sliders
    document.querySelectorAll('.sfx-vol-slider').forEach(s => s.value = val);
    // Play a small sound to preview
    if (frameCount % 60 === 0) playSound('shoot');
};

function updateMusicUI() {
    const btn = document.getElementById('music-toggle-btn');
    const btnStart = document.getElementById('music-toggle-btn-start');
    const icon = g_musicEnabled ? '🎵' : '🔇';
    if (btn) btn.innerText = icon;
    if (btnStart) btnStart.innerText = icon;
    document.querySelectorAll('.music-vol-slider').forEach(s => s.value = g_musicVolume);
}

function updateSoundsUI() {
    const btn = document.getElementById('sfx-toggle-btn');
    const btnStart = document.getElementById('sfx-toggle-btn-start');
    const icon = g_soundsEnabled ? '🔊' : '🔇';
    if (btn) btn.innerText = icon;
    if (btnStart) btnStart.innerText = icon;
    document.querySelectorAll('.sfx-vol-slider').forEach(s => s.value = g_soundsVolume);
}

function openShop() {
    g_isShopOpen = true;
    shopScreen.classList.remove('hidden');
    shopGemsCount.innerText = g_credits;
    // Update upgrade costs in UI if needed (dynamic later)
    playSound('powerup');
    MusicManager.start('HANGAR');
}

function closeShop() {
    g_isShopOpen = false;
    shopScreen.classList.add('hidden');
    // Start next wave
    startNextWaveReady();
    MusicManager.start('COMBAT');
}

if (closeShopBtn) {
    closeShopBtn.addEventListener('click', closeShop);
}

window.buyUpgrade = function (type) {
    const cost = g_upgradeCosts[type];
    if (g_credits >= cost) {
        g_credits -= cost;
        playSound('powerup');

        // Apply Upgrade
        if (type === 'hp') {
            player.maxHp += 1;
            player.hp += 1;
            g_upgradeCosts.hp = Math.ceil(g_upgradeCosts.hp * 1.5);
        } else if (type === 'speed') {
            player.speed += 0.5;
            g_upgradeCosts.speed = Math.ceil(g_upgradeCosts.speed * 1.5);
        } else if (type === 'repair') {
            if (player.hp < player.maxHp) {
                player.hp = Math.min(player.maxHp, player.hp + 1);
                g_upgradeCosts.repair += 2;
            } else {
                g_credits += cost;
                return;
            }
        } else if (type === 'bombs') {
            g_maxBombs += 1;
            g_bombs += 1;
            g_upgradeCosts.bombs = Math.ceil(g_upgradeCosts.bombs * 1.5);
        }

        // Update UI - Shop
        if (shopGemsCount) shopGemsCount.innerText = g_credits;
        updatePlayerStatusUI();

        // Update costs in shop buttons
        const btn = document.querySelector(`#shop-item-${type} .cost`);
        if (btn) btn.innerText = g_upgradeCosts[type];
        
        // Also update header gems display if exists
        const headerGems = document.getElementById('shop-gems-display');
        if (headerGems) headerGems.innerText = g_credits;
    } else {
        playSound('hit');
    }
};

window.buyWeapon = function (type) {
    const cost = g_upgradeCosts[type];
    if (g_credits >= cost) {
        // If already owned, don't buy again
        if (player.weaponType === type) {
            playSound('hit');
            return;
        }
        g_credits -= cost;
        player.weaponType = type;
        playSound('powerup');
        
        // Update UI
        if (shopGemsCount) shopGemsCount.innerText = g_credits;
        const headerGems = document.getElementById('shop-gems-display');
        if (headerGems) headerGems.innerText = g_credits;
        
        // Visual feedback
        createParticles(player.x + player.width/2, player.y + player.height/2, '#fff', 'explosion');
    } else {
        playSound('hit');
    }
};

// Audio Engine
let audioCtx;
let noiseBuffer;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        window.musicMasterGain = audioCtx.createGain();
        window.musicMasterGain.gain.setValueAtTime(g_musicVolume, audioCtx.currentTime);
        window.musicMasterGain.connect(audioCtx.destination);
        createNoiseBuffer();
        if (g_musicEnabled) MusicManager.start('MENU');
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();
}

function createNoiseBuffer() {
    const bufferSize = audioCtx.sampleRate * 2;
    noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
    }
}

function playSound(type) {
    if (!audioCtx || !g_soundsEnabled) return;
    const now = audioCtx.currentTime;

    if (type === 'shoot') {
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        osc.type = 'square';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(110, now + 0.1);
        gainNode.gain.setValueAtTime(0.05 * g_soundsVolume, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.start(now); osc.stop(now + 0.1);
    } else if (type === 'hit') {
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(50, now + 0.2);
        gainNode.gain.setValueAtTime(0.1 * g_soundsVolume, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now); osc.stop(now + 0.2);
    } else if (type === 'boss_hit') {
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        osc.type = 'square';
        osc.frequency.setValueAtTime(100, now);
        osc.frequency.exponentialRampToValueAtTime(30, now + 0.2);
        gainNode.gain.setValueAtTime(0.1 * g_soundsVolume, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now); osc.stop(now + 0.2);
    } else if (type === 'powerup') {
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.linearRampToValueAtTime(880, now + 0.2);
        gainNode.gain.setValueAtTime(0.1 * g_soundsVolume, now);
        gainNode.gain.linearRampToValueAtTime(0.001, now + 0.2);
        osc.start(now); osc.stop(now + 0.2);
    } else if (type === 'boss_spawn' || type === 'warning') {
        const osc = audioCtx.createOscillator();
        const osc2 = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        const gainNode2 = audioCtx.createGain();
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        osc2.connect(gainNode2);
        gainNode2.connect(audioCtx.destination);

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(55, now);
        osc.frequency.linearRampToValueAtTime(110, now + 0.5);
        osc.frequency.linearRampToValueAtTime(55, now + 1.5);
        gainNode.gain.setValueAtTime(0.15 * g_soundsVolume, now);
        gainNode.gain.linearRampToValueAtTime(0.001, now + 2.0);
        osc.start(now); osc.stop(now + 2.0);

        osc2.type = 'square';
        osc2.frequency.setValueAtTime(440, now);
        osc2.frequency.setValueAtTime(220, now + 0.25);
        osc2.frequency.setValueAtTime(440, now + 0.5);
        osc2.frequency.setValueAtTime(220, now + 0.75);
        osc2.frequency.setValueAtTime(440, now + 1.0);
        osc2.frequency.setValueAtTime(220, now + 1.25);
        gainNode2.gain.setValueAtTime(0.08 * g_soundsVolume, now);
        gainNode2.gain.linearRampToValueAtTime(0.001, now + 1.5);
        osc2.start(now); osc2.stop(now + 1.5);
    } else if (type === 'explosion' || type === 'asteroid_break') {
        if (!noiseBuffer) createNoiseBuffer();
        const mainSource = audioCtx.createBufferSource();
        mainSource.buffer = noiseBuffer;
        const filter = audioCtx.createBiquadFilter();
        const gainNode = audioCtx.createGain();

        mainSource.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        if (type === 'explosion') {
            // Cinematic Explosion Design

            // "Thick Bang and Rumble" Exploration (Kalın + Yayılan)

            // Layer 1: The Heavy Punch (Derin Tok Vuruş)
            // Triangle waves have a bit more harmonic thickness than sine at low frequencies
            const punch = audioCtx.createOscillator();
            const punchGain = audioCtx.createGain();
            punch.connect(punchGain);
            punchGain.connect(audioCtx.destination);
            punch.type = 'triangle';
            punch.frequency.setValueAtTime(120, now);
            punch.frequency.exponentialRampToValueAtTime(30, now + 0.3); // Hızlıca sub-basa iniyor
            punchGain.gain.setValueAtTime(1.0 * g_soundsVolume, now);
            punchGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
            punch.start(now); punch.stop(now + 0.3);

            // Layer 2: The "Bang" Focus (Yoğun, Boğuk Gürültü Darbesi)
            // Starts much lower (800Hz max) to prevent thinness, heavy low-pass filtering.
            const bang = audioCtx.createBufferSource();
            bang.buffer = noiseBuffer;
            const bangFilter = audioCtx.createBiquadFilter();
            const bangGain = audioCtx.createGain();
            bang.connect(bangFilter);
            bangFilter.connect(bangGain);
            bangGain.connect(audioCtx.destination);
            bangFilter.type = 'lowpass';
            bangFilter.frequency.setValueAtTime(800, now);
            bangFilter.frequency.exponentialRampToValueAtTime(50, now + 0.8);
            bangGain.gain.setValueAtTime(1.0 * g_soundsVolume, now);
            bangGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
            bang.start(now); bang.stop(now + 0.8);

            // Layer 3: The Propagating Rumble (Yayılan ve Çöken Gümbürtü)
            // Simulates the shockwave continuing outwards. Swells up slightly, then trails off completely in sub frequencies.
            const rumble = audioCtx.createBufferSource();
            rumble.buffer = noiseBuffer;
            const rumbleFilter = audioCtx.createBiquadFilter();
            const rumbleGain = audioCtx.createGain();
            rumble.connect(rumbleFilter);
            rumbleFilter.connect(rumbleGain);
            rumbleGain.connect(audioCtx.destination);
            rumbleFilter.type = 'lowpass';
            rumbleFilter.frequency.setValueAtTime(250, now);
            rumbleFilter.frequency.exponentialRampToValueAtTime(15, now + 2.5);
            rumbleGain.gain.setValueAtTime(0, now); // Fade in effect
            rumbleGain.gain.linearRampToValueAtTime(0.6 * g_soundsVolume, now + 0.1); // Swell
            rumbleGain.gain.exponentialRampToValueAtTime(0.001, now + 2.5); // Very long decay
            rumble.start(now); rumble.stop(now + 2.5);
        } else {
            // asteroid_break - deep, stony crumble
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(400, now);
            filter.frequency.exponentialRampToValueAtTime(40, now + 0.5);
            gainNode.gain.setValueAtTime(0.4 * g_soundsVolume, now);
            gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
            mainSource.start(now); mainSource.stop(now + 0.5);
        }
    } else if (type === 'boss_explosion') {
        if (!noiseBuffer) createNoiseBuffer();
        // Multi-stage epic explosion
        for (let i = 0; i < 3; i++) {
            const delay = i * 0.2;
            const source = audioCtx.createBufferSource();
            const filter = audioCtx.createBiquadFilter();
            const gain = audioCtx.createGain();
            source.buffer = noiseBuffer;
            source.connect(filter);
            filter.connect(gain);
            gain.connect(audioCtx.destination);

            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(1000, now + delay);
            filter.frequency.exponentialRampToValueAtTime(20, now + delay + 1.0);
            gain.gain.setValueAtTime(0.4 * g_soundsVolume, now + delay);
            gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 1.5);
            source.start(now + delay); source.stop(now + delay + 1.5);
        }
        // Sub-thump
        const thump = audioCtx.createOscillator();
        const thumpGain = audioCtx.createGain();
        thump.connect(thumpGain);
        thumpGain.connect(audioCtx.destination);
        thump.type = 'sine';
        thump.frequency.setValueAtTime(80, now);
        thump.frequency.exponentialRampToValueAtTime(20, now + 1.5);
        thumpGain.gain.setValueAtTime(0.5 * g_soundsVolume, now);
        thumpGain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
        thump.start(now); thump.stop(now + 1.5);
    } else if (type === 'bomb') {
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        osc.type = 'square';
        osc.frequency.setValueAtTime(100, now);
        osc.frequency.exponentialRampToValueAtTime(10, now + 1);
        gainNode.gain.setValueAtTime(0.3 * g_soundsVolume, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 1);
        osc.start(now); osc.stop(now + 1);
    } else if (type === 'combo') {
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        gainNode.gain.setValueAtTime(0.1 * g_soundsVolume, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.start(now); osc.stop(now + 0.1);
    }
}

const MusicManager = {
    interval: null,
    beat: 0,
    state: 'NONE',
    start(state) {
        if (this.state === state && this.interval) return;
        this.stop();
        this.state = state;
        // Tick every 200ms = 150 BPM (High energy)
        this.interval = setInterval(() => this.tick(), 200);
    },
    tick() {
        if (!g_musicEnabled || !audioCtx || audioCtx.state === 'suspended') return;
        if (!window.musicMasterGain) initAudio();

        const now = audioCtx.currentTime;
        this.beat = (this.beat + 1) % 16;

        const mainGain = window.musicMasterGain;

        const playNote = (freq, type = 'sine', decay = 0.2, vol = 0.05) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(mainGain); // Connect to music master gain, not audioCtx.destination
            osc.type = type;
            osc.frequency.setValueAtTime(freq, now);
            gain.gain.setValueAtTime(vol, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + decay);
            osc.start(now);
            osc.stop(now + decay);
        };

        const playPad = (freq, type = 'sine', decay = 1.0, vol = 0.02) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(mainGain);
            osc.type = type;
            osc.frequency.setValueAtTime(freq, now);
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(vol, now + 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, now + decay);
            osc.start(now);
            osc.stop(now + decay);
        };

        if (this.state === 'MENU') {
            // Ambient space vibe
            if (this.beat % 8 === 0) {
                playPad(110, 'sine', 2.0, 0.05);
                playPad(164.8, 'sine', 1.8, 0.03);
            }
            if (this.beat % 16 === 8) playPad(130.8, 'sine', 2.0, 0.04);
            if (this.beat % 4 === 2) playNote(440, 'triangle', 0.5, 0.01);
        } else if (this.state === 'COMBAT') {
            // High energy techno/trance feel
            const bass = [55, 55, 55, 55, 55, 55, 65, 48];
            playNote(bass[this.beat % 8], 'sawtooth', 0.15, 0.04);

            if (this.beat % 4 === 0) playNote(60, 'sine', 0.1, 0.1); // Kick
            if (this.beat % 8 === 4) playNote(800, 'triangle', 0.1, 0.02); // Snare/Hihat hint

            // Arpeggio
            const melody = [220, 261.6, 329.6, 440, 392, 329.6, 261.6, 196];
            if (this.beat % 2 === 0) playNote(melody[this.beat / 2 % 8], 'square', 0.1, 0.02);
        } else if (this.state === 'BOSS') {
            // Intense aggressive pulses
            playNote(40 + (Math.sin(this.beat) * 5), 'sawtooth', 0.2, 0.06);
            if (this.beat % 2 === 0) playNote(80, 'square', 0.1, 0.04);
            if (this.beat % 4 === 2) playNote(220 * (1 + Math.random() * 0.1), 'sawtooth', 0.1, 0.03);
            if (this.beat % 16 === 0) playPad(40, 'sawtooth', 3.0, 0.05);
        } else if (this.state === 'HANGAR') {
            // Smooth chillwave
            const chords = [220, 220, 261.6, 261.6, 196, 196, 220, 220];
            if (this.beat % 8 === 0) {
                playPad(chords[this.beat / 8], 'sine', 4.0, 0.06);
                playNote(chords[this.beat / 8] * 2, 'triangle', 2.0, 0.02);
            }
            const lead = [440, 0, 493.8, 523.2, 0, 440, 392, 0];
            if (lead[this.beat % 8] > 0) playNote(lead[this.beat % 8], 'sine', 0.8, 0.03);
        }
    },
    stop() {
        if (this.interval) clearInterval(this.interval);
        this.interval = null;
        this.state = 'NONE';
        this.beat = 0;
    }
};

const createSvgImg = (svgStr) => {
    const img = new Image();
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgStr);
    return img;
};

// Game State
let gameState = 'START'; // START, PLAYING, GAMEOVER
let score = 0;
let nextBossScore = 400; // Will be driven by waves now, but kept for boss logic reference
let boss = null;
let highScore = localStorage.getItem('spaceShooterHighScore') || 0;
highScoreElement.innerText = `High Score: ${highScore}`;
let frameCount = 0;

let g_bombs = 3;
let g_combo = 0;
let g_comboMultiplier = 1;
let g_wave = 1;
let g_enemiesToSpawn = 10;
let g_enemiesSpawnedThisWave = 0;
let g_waveActive = true;
let g_shakeTime = 0;

// Planets array
let planets = [];
const planetTypes = ['Mars', 'Saturn', 'Uranus', 'Moon'];
let muzzleFlashes = [];

// Planet SVG Assets
const imgMars = createSvgImg(`
<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <radialGradient id="marsGrad" cx="30%" cy="30%" r="70%">
            <stop offset="0%" style="stop-color:#ff9a8b" />
            <stop offset="50%" style="stop-color:#9b2c2c" />
            <stop offset="100%" style="stop-color:#4a0e0e" />
        </radialGradient>
        <filter id="marsGlow"><feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <radialGradient id="marsRim" cx="50%" cy="50%" r="50%">
            <stop offset="85%" style="stop-color:rgba(255,150,150,0)" />
            <stop offset="100%" style="stop-color:rgba(255,200,200,0.6)" />
        </radialGradient>
    </defs>
    <circle cx="100" cy="100" r="80" fill="url(#marsGrad)" filter="url(#marsGlow)"/>
    <!-- Surface Detail (Craters) -->
    <circle cx="70" cy="80" r="12" fill="rgba(0,0,0,0.15)"/>
    <circle cx="130" cy="120" r="18" fill="rgba(0,0,0,0.15)"/>
    <circle cx="100" cy="60" r="8" fill="rgba(0,0,0,0.1)"/>
    <!-- Rim Lighting -->
    <circle cx="100" cy="100" r="80" fill="url(#marsRim)"/>
</svg>`);

const imgSaturn = createSvgImg(`
<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <radialGradient id="saturnGrad" cx="30%" cy="30%" r="70%">
            <stop offset="0%" style="stop-color:#fef08a" />
            <stop offset="60%" style="stop-color:#b7791f" />
            <stop offset="100%" style="stop-color:#451a03" />
        </radialGradient>
        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:rgba(214,158,46,0)" />
            <stop offset="20%" style="stop-color:rgba(214,158,46,0.3)" />
            <stop offset="50%" style="stop-color:rgba(251,191,36,0.6)" />
            <stop offset="80%" style="stop-color:rgba(214,158,46,0.3)" />
            <stop offset="100%" style="stop-color:rgba(214,158,46,0)" />
        </linearGradient>
        <radialGradient id="saturnRim" cx="50%" cy="50%" r="50%">
            <stop offset="88%" style="stop-color:rgba(254,240,138,0)" />
            <stop offset="100%" style="stop-color:rgba(254,240,138,0.4)" />
        </radialGradient>
    </defs>
    <!-- Back part of rings -->
    <ellipse cx="200" cy="150" rx="170" ry="45" fill="none" stroke="url(#ringGrad)" stroke-width="25" transform="rotate(-15, 200, 150)" opacity="0.4"/>
    <!-- Planet body -->
    <circle cx="200" cy="150" r="70" fill="url(#saturnGrad)"/>
    <circle cx="200" cy="150" r="70" fill="url(#saturnRim)"/>
    <!-- Shadow on rings -->
    <ellipse cx="200" cy="150" rx="170" ry="45" fill="none" stroke="rgba(0,0,0,0.4)" stroke-width="25" transform="rotate(-15, 200, 150)" clip-path="inset(0 180px 0 0)"/>
    <!-- Front part of rings -->
    <ellipse cx="200" cy="150" rx="170" ry="45" fill="none" stroke="url(#ringGrad)" stroke-width="25" transform="rotate(-15, 200, 150)" clip-path="inset(150px 0 0 0)"/>
</svg>`);

const imgUranus = createSvgImg(`
<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <radialGradient id="uranusGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" style="stop-color:#e0fbff" />
            <stop offset="60%" style="stop-color:#4fd1c5" />
            <stop offset="100%" style="stop-color:#234e52" />
        </radialGradient>
        <filter id="uranusHaze"><feGaussianBlur stdDeviation="12" result="h"/><feMerge><feMergeNode in="h"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <circle cx="100" cy="100" r="80" fill="url(#uranusGrad)" filter="url(#uranusHaze)" opacity="0.9"/>
    <!-- Subtle vertical ring -->
    <ellipse cx="100" cy="100" rx="100" ry="8" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="2" transform="rotate(85, 100, 100)"/>
</svg>`);

const imgMoon = createSvgImg(`
<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <radialGradient id="moonGrad" cx="30%" cy="30%" r="70%">
            <stop offset="0%" style="stop-color:#ffffff" />
            <stop offset="40%" style="stop-color:#cbd5e0" />
            <stop offset="100%" style="stop-color:#2d3748" />
        </radialGradient>
        <filter id="moonGlow"><feGaussianBlur stdDeviation="15" result="g"/><feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <radialGradient id="moonRim" cx="50%" cy="50%" r="50%">
            <stop offset="80%" style="stop-color:rgba(255,255,255,0)" />
            <stop offset="100%" style="stop-color:rgba(255,255,255,0.8)" />
        </radialGradient>
    </defs>
    <circle cx="100" cy="100" r="80" fill="url(#moonGrad)" filter="url(#moonGlow)"/>
    <!-- Craters -->
    <circle cx="60" cy="70" r="10" fill="rgba(0,0,0,0.15)"/>
    <circle cx="110" cy="90" r="15" fill="rgba(0,0,0,0.1)"/>
    <circle cx="85" cy="130" r="8" fill="rgba(0,0,0,0.12)"/>
    <circle cx="140" cy="100" r="12" fill="rgba(0,0,0,0.1)"/>
    <!-- Moonlighting / Rim -->
    <circle cx="100" cy="100" r="80" fill="url(#moonRim)"/>
</svg>`);

function calculateEnemiesForWave(wave) {
    if (wave <= 15) {
        return 10 + Math.floor(wave * 2.5);
    } else {
        // Increased scaling after Wave 15
        const baseAt15 = 10 + Math.floor(15 * 2.5); // 47 enemies
        return baseAt15 + Math.floor((wave - 15) * 5); // 5 enemies per wave instead of 2.5
    }
}

// Assets
const bossImg = new Image(); bossImg.src = 'assets/boss_ship.png';

// Premium SVG Player Ship
const imgPlayerV2 = createSvgImg(`
<svg width="100" height="100" viewBox="-50 -50 100 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="hullGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#4fd1c5;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#2d3748;stop-opacity:1" />
        </linearGradient>
        <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
    </defs>
    <!-- Main Hull -->
    <path d="M 0,-45 L 15,-10 L 40,20 L 15,15 L 0,40 L -15,15 L -40,20 L -15,-10 Z" fill="url(#hullGrad)" stroke="#fff" stroke-width="1"/>
    <!-- Cockpit -->
    <ellipse cx="0" cy="-5" rx="8" ry="15" fill="#e6fffa" filter="url(#neonGlow)"/>
    <!-- Wings/Engines Details -->
    <path d="M -35,15 L -45,25 L -35,30 Z" fill="#4fd1c5"/>
    <path d="M 35,15 L 45,25 L 35,30 Z" fill="#4fd1c5"/>
    <!-- Engine Ports (Where smoke comes from) -->
    <rect x="-18" y="15" width="8" height="12" rx="2" fill="#1a202c" stroke="#0ff" stroke-width="1"/>
    <rect x="10" y="15" width="8" height="12" rx="2" fill="#1a202c" stroke="#0ff" stroke-width="1"/>
</svg>`);

// Debug accessibility & Reliability
window.isPausedGlobal = false;
window.getGameState = () => gameState;
window.getIsPaused = () => window.isPausedGlobal;
window.togglePauseManual = () => {
    console.log('Manual Toggle Clicked! GameState:', gameState);
    if (gameState === 'PLAYING') {
        window.isPausedGlobal = !window.isPausedGlobal;
        console.log('New Pause State:', window.isPausedGlobal);
        const btn = document.getElementById('pause-btn-ui');
        if (btn) btn.innerText = window.isPausedGlobal ? 'RESUME (P)' : 'PAUSE (P)';
    } else {
        console.log('Toggle ignored: Not in PLAYING state');
    }
};

window.toggleFullscreen = () => {
    if (!document.fullscreenElement) {
        gameContainer.requestFullscreen().catch(err => {
            console.error(`Error attempting to enable full-screen mode: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
};

// Epic SVG Assets for Enemies

const imgNormal = createSvgImg(`
<svg width="80" height="80" viewBox="-40 -40 80 80" xmlns="http://www.w3.org/2000/svg">
<defs>
<linearGradient id="bodyGrad" x1="0" y1="-40" x2="0" y2="40"><stop offset="0%" stop-color="#2d3748"/><stop offset="100%" stop-color="#1a202c"/></linearGradient>
<filter id="glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
</defs>
<path d="M 0,35 L -35,-15 L -20,-20 L 0,15 L 20,-20 L 35,-15 Z" fill="url(#bodyGrad)" stroke="#4fd1c5" stroke-width="1.5"/>
<path d="M 0,15 L -20,-20 L 0,-10 L 20,-20 Z" fill="#4a5568"/>
<circle cx="0" cy="5" r="5" fill="#e6fffa" filter="url(#glow)"/>
<path d="M -15,-20 L -15,-35 L -10,-25 M 15,-20 L 15,-35 L 10,-25" fill="#319795" filter="url(#glow)"/>
<polygon points="-5,-10 5,-10 3,0 -3,0" fill="#e2e8f0"/>
<line x1="-15" y1="5" x2="-25" y2="-5" stroke="#4fd1c5" stroke-width="1.5" filter="url(#glow)"/>
<line x1="15" y1="5" x2="25" y2="-5" stroke="#4fd1c5" stroke-width="1.5" filter="url(#glow)"/>
</svg>`);

const imgKamikaze = createSvgImg(`
<svg width="80" height="80" viewBox="-40 -40 80 80" xmlns="http://www.w3.org/2000/svg">
<defs>
<linearGradient id="kamiGrad" x1="0" y1="-40" x2="0" y2="40"><stop offset="0%" stop-color="#276749"/><stop offset="100%" stop-color="#1a202c"/></linearGradient>
<filter id="kamiGlow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
</defs>
<path d="M 0,35 L -25,-25 L -8,-20 L 0,-25 L 8,-20 L 25,-25 Z" fill="url(#kamiGrad)" stroke="#48bb78" stroke-width="2"/>
<path d="M 0,20 L -10,-15 L 10,-15 Z" fill="#22543d"/>
<circle cx="0" cy="5" r="4" fill="#9ae6b4" filter="url(#kamiGlow)"/>
<path d="M -15,-25 L 0,-40 L 15,-25 Z" fill="#48bb78" filter="url(#kamiGlow)"/>
<line x1="0" y1="-25" x2="0" y2="-10" stroke="#9ae6b4" stroke-width="3" filter="url(#kamiGlow)"/>
<line x1="-15" y1="-5" x2="-20" y2="10" stroke="#48bb78" stroke-width="2"/>
<line x1="15" y1="-5" x2="20" y2="10" stroke="#48bb78" stroke-width="2"/>
</svg>`);

const imgSine = createSvgImg(`
<svg width="80" height="80" viewBox="-40 -40 80 80" xmlns="http://www.w3.org/2000/svg">
<defs>
<linearGradient id="sineGrad" x1="0" y1="-40" x2="0" y2="40"><stop offset="0%" stop-color="#2b6cb0"/><stop offset="100%" stop-color="#1a202c"/></linearGradient>
<radialGradient id="sineGlow" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#fff"/><stop offset="40%" stop-color="#0bc5ea"/><stop offset="100%" stop-color="#000" stop-opacity="0"/></radialGradient>
</defs>
<path d="M 0,35 Q 40,20 30,-20 Q 20,-5 0,-25 Q -20,-5 -30,-20 Q -40,20 0,35 Z" fill="url(#sineGrad)" stroke="#0bc5ea" stroke-width="2"/>
<path d="M 0,20 Q 15,10 10,-10 Q 5,0 0,-15 Q -5,0 -10,-10 Q -15,10 0,20 Z" fill="#2c5282"/>
<circle cx="0" cy="5" r="10" fill="url(#sineGlow)"/>
<circle cx="0" cy="5" r="4" fill="#fff"/>
<path d="M -20,-5 Q -25,-15 -35,-5 M 20,-5 Q 25,-15 35,-5" stroke="#90cdf4" stroke-width="2" fill="none"/>
</svg>`);

const imgTank = createSvgImg(`
<svg width="80" height="80" viewBox="-40 -40 80 80" xmlns="http://www.w3.org/2000/svg">
<defs>
<linearGradient id="tankGrad" x1="-30" y1="0" x2="30" y2="0"><stop offset="0%" stop-color="#4a5568"/><stop offset="50%" stop-color="#718096"/><stop offset="100%" stop-color="#4a5568"/></linearGradient>
<filter id="tankGlow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
</defs>
<rect x="-28" y="-25" width="56" height="40" rx="4" fill="url(#tankGrad)" stroke="#1a202c" stroke-width="3"/>
<rect x="-38" y="-15" width="16" height="30" rx="3" fill="#2d3748" stroke="#dd6b20" stroke-width="2"/>
<rect x="22" y="-15" width="16" height="30" rx="3" fill="#2d3748" stroke="#dd6b20" stroke-width="2"/>
<path d="M -25,15 L 0,35 L 25,15 Z" fill="#2d3748" stroke="#ed8936" stroke-width="2.5"/>
<circle cx="-16" cy="-5" r="5" fill="#fbd38d" filter="url(#tankGlow)"/>
<circle cx="16" cy="-5" r="5" fill="#fbd38d" filter="url(#tankGlow)"/>
<rect x="-8" y="-20" width="16" height="30" fill="#c05621" filter="url(#tankGlow)"/>
<rect x="-4" y="-15" width="8" height="20" fill="#fbd38d"/>
<rect x="-18" y="-35" width="10" height="20" fill="#c05621"/>
<rect x="8" y="-35" width="10" height="20" fill="#c05621"/>
<path d="M -30,-5 L -35,5 M 30,-5 L 35,5" stroke="#fff" stroke-width="2"/>
</svg>`);

const imgSniper = createSvgImg(`
<svg width="80" height="80" viewBox="-40 -40 80 80" xmlns="http://www.w3.org/2000/svg">
<defs>
<linearGradient id="snipGrad" x1="0" y1="-40" x2="0" y2="40"><stop offset="0%" stop-color="#44337a"/><stop offset="100%" stop-color="#1a202c"/></linearGradient>
<filter id="snipGlow"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
</defs>
<path d="M 0,40 L -30,-20 L 0,-10 L 30,-20 Z" fill="url(#snipGrad)" stroke="#f0f" stroke-width="2"/>
<circle cx="0" cy="-15" r="5" fill="#f0f" filter="url(#snipGlow)"/>
<line x1="0" y1="-15" x2="0" y2="-35" stroke="#f0f" stroke-width="3" filter="url(#snipGlow)"/>
</svg>`);

const imgDiver = createSvgImg(`
<svg width="80" height="80" viewBox="-40 -40 80 80" xmlns="http://www.w3.org/2000/svg">
<defs>
<linearGradient id="divGrad" x1="0" y1="-40" x2="0" y2="40"><stop offset="0%" stop-color="#742a2a"/><stop offset="100%" stop-color="#1a202c"/></linearGradient>
<filter id="divGlow"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
</defs>
<path d="M 0,40 L -20,0 L -10,-40 L 0,-25 L 10,-40 L 20,0 Z" fill="url(#divGrad)" stroke="#f33" stroke-width="2.5"/>
<circle cx="0" cy="15" r="6" fill="#f33" filter="url(#divGlow)"/>
<path d="M -15,0 L -25,10 M 15,0 L 25,10" stroke="#f33" stroke-width="3" filter="url(#divGlow)"/>
</svg>`);

const imgAsteroid = createSvgImg(`
<svg width="100" height="100" viewBox="-50 -50 100 100" xmlns="http://www.w3.org/2000/svg">
<defs>
<radialGradient id="rockGrad" cx="40%" cy="40%" r="60%"><stop offset="0%" stop-color="#a0aec0"/><stop offset="100%" stop-color="#2d3748"/></radialGradient>
</defs>
<path d="M -30,-40 L 10,-45 L 45,-20 L 40,20 L 10,45 L -35,40 L -45,0 Z" fill="url(#rockGrad)" stroke="#4a5568" stroke-width="2"/>
<circle cx="-15" cy="-15" r="10" fill="rgba(0,0,0,0.2)"/>
<circle cx="15" cy="15" r="7" fill="rgba(0,0,0,0.2)"/>
<path d="M 20,-20 Q 25,-25 30,-15" stroke="rgba(255,255,255,0.1)" stroke-width="3" fill="none"/>
</svg>`);

const imgBoss1 = createSvgImg(`
<svg width="220" height="120" viewBox="-110 -60 220 120" xmlns="http://www.w3.org/2000/svg">
<defs>
<linearGradient id="b1h" x1="0" y1="-60" x2="0" y2="60"><stop offset="0%" stop-color="#2d3748"/><stop offset="100%" stop-color="#0d1117"/></linearGradient>
<linearGradient id="b1w" x1="-110" y1="0" x2="110" y2="0"><stop offset="0%" stop-color="#1a202c"/><stop offset="50%" stop-color="#4a5568"/><stop offset="100%" stop-color="#1a202c"/></linearGradient>
<filter id="b1g" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<filter id="b1gs"><feGaussianBlur stdDeviation="7"/></filter>
</defs>
<!-- Glow shadow -->
<ellipse cx="0" cy="10" rx="90" ry="30" fill="rgba(255,50,50,0.3)" filter="url(#b1gs)"/>
<!-- Main hull -->
<path d="M 0,50 L -90,10 L -110,-20 L -50,-40 L 0,-55 L 50,-40 L 110,-20 L 90,10 Z" fill="url(#b1h)" stroke="#c53030" stroke-width="3"/>
<!-- Center spine -->
<rect x="-12" y="-55" width="24" height="100" rx="5" fill="url(#b1w)" stroke="#742a2a" stroke-width="2"/>
<!-- Cockpit bridge -->
<rect x="-55" y="-15" width="110" height="25" rx="8" fill="#2d3748" stroke="#e53e3e" stroke-width="2"/>
<!-- Engines left -->
<rect x="-100" y="-10" width="20" height="15" rx="3" fill="#1a202c" stroke="#e53e3e" stroke-width="2"/>
<circle cx="-90" cy="0" r="5" fill="#fbd38d" filter="url(#b1g)"/>
<!-- Engines right -->
<rect x="80" y="-10" width="20" height="15" rx="3" fill="#1a202c" stroke="#e53e3e" stroke-width="2"/>
<circle cx="90" cy="0" r="5" fill="#fbd38d" filter="url(#b1g)"/>
<!-- Weapon turrets -->
<circle cx="-35" cy="10" r="8" fill="#e53e3e" filter="url(#b1g)"/>
<circle cx="35" cy="10" r="8" fill="#e53e3e" filter="url(#b1g)"/>
<!-- Forward cannons -->
<rect x="-5" y="45" width="10" height="20" rx="3" fill="#e53e3e" filter="url(#b1g)"/>
<!-- Wing accent stripes -->
<line x1="-50" y1="-35" x2="-90" y2="10" stroke="#fc8181" stroke-width="2" opacity="0.7"/>
<line x1="50" y1="-35" x2="90" y2="10" stroke="#fc8181" stroke-width="2" opacity="0.7"/>
</svg>`);

const imgBoss2 = createSvgImg(`
<svg width="240" height="140" viewBox="-120 -70 240 140" xmlns="http://www.w3.org/2000/svg">
<defs>
<linearGradient id="b2h" x1="0" y1="-70" x2="0" y2="70"><stop offset="0%" stop-color="#44337a"/><stop offset="100%" stop-color="#0d0d1a"/></linearGradient>
<radialGradient id="b2core" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#fff"/><stop offset="30%" stop-color="#e9d8fd"/><stop offset="100%" stop-color="#553c9a" stop-opacity="0"/></radialGradient>
<filter id="b2g" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<filter id="b2gs"><feGaussianBlur stdDeviation="10"/></filter>
</defs>
<!-- Glow shadow -->
<ellipse cx="0" cy="10" rx="100" ry="40" fill="rgba(150,50,255,0.3)" filter="url(#b2gs)"/>
<!-- Outer wings (bio-organic curved) -->
<path d="M 0,60 Q 100,50 110,-10 Q 120,-50 50,-65 Q 20,-40 0,-20 Q -20,-40 -50,-65 Q -120,-50 -110,-10 Q -100,50 0,60 Z" fill="url(#b2h)" stroke="#9f7aea" stroke-width="3"/>
<!-- Inner body -->
<path d="M 0,30 Q 40,20 40,-20 Q 20,-40 0,-50 Q -20,-40 -40,-20 Q -40,20 0,30 Z" fill="#2d1b69" stroke="#b794f4" stroke-width="2"/>
<!-- Central plasma core -->
<circle cx="0" cy="0" r="20" fill="url(#b2core)" filter="url(#b2g)"/>
<circle cx="0" cy="0" r="8" fill="#fff"/>
<!-- Wing glow orbs -->
<circle cx="-75" cy="5" r="10" fill="#b794f4" filter="url(#b2g)"/>
<circle cx="75" cy="5" r="10" fill="#b794f4" filter="url(#b2g)"/>
<circle cx="-50" cy="-40" r="7" fill="#d6bcfa" filter="url(#b2g)"/>
<circle cx="50" cy="-40" r="7" fill="#d6bcfa" filter="url(#b2g)"/>
<!-- Tentacle cannons -->
<path d="M 0,30 Q -20,50 -15,70" stroke="#9f7aea" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M 0,30 Q 20,50 15,70" stroke="#9f7aea" stroke-width="5" fill="none" stroke-linecap="round"/>
<circle cx="-15" cy="70" r="5" fill="#e9d8fd" filter="url(#b2g)"/>
<circle cx="15" cy="70" r="5" fill="#e9d8fd" filter="url(#b2g)"/>
</svg>`);

const imgBoss3 = createSvgImg(`
<svg width="260" height="150" viewBox="-130 -75 260 150" xmlns="http://www.w3.org/2000/svg">
<defs>
<linearGradient id="b3h" x1="0" y1="-75" x2="0" y2="75"><stop offset="0%" stop-color="#742a2a"/><stop offset="100%" stop-color="#0d0000"/></linearGradient>
<radialGradient id="b3core" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#fff"/><stop offset="25%" stop-color="#fed7d7"/><stop offset="60%" stop-color="#e53e3e"/><stop offset="100%" stop-color="#742a2a" stop-opacity="0"/></radialGradient>
<filter id="b3g" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="7" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<filter id="b3gs"><feGaussianBlur stdDeviation="12"/></filter>
</defs>
<!-- Massive glow backdrop -->
<ellipse cx="0" cy="5" rx="120" ry="50" fill="rgba(255,0,0,0.25)" filter="url(#b3gs)"/>
<!-- Outer jagged hull -->
<path d="M 0,65 L -40,30 L -80,45 L -100,10 L -130,-30 L -80,-50 L -100,-70 L -50,-55 L 0,-75 L 50,-55 L 100,-70 L 80,-50 L 130,-30 L 100,10 L 80,45 L 40,30 Z" fill="url(#b3h)" stroke="#e53e3e" stroke-width="4"/>
<!-- Inner reinforced hull -->
<path d="M 0,40 L -30,10 L -60,-10 L -40,-50 L 0,-60 L 40,-50 L 60,-10 L 30,10 Z" fill="#4a1919" stroke="#fc8181" stroke-width="2"/>
<!-- Massive plasma furnace -->
<circle cx="0" cy="-10" r="35" fill="url(#b3core)" filter="url(#b3g)"/>
<circle cx="0" cy="-10" r="15" fill="#fff"/>
<!-- Weapon pods -->
<circle cx="-80" cy="5" r="12" fill="#e53e3e" filter="url(#b3g)"/>
<rect x="-85" y="5" width="10" height="18" rx="2" fill="#9b2c2c"/>
<circle cx="80" cy="5" r="12" fill="#e53e3e" filter="url(#b3g)"/>
<rect x="75" y="5" width="10" height="18" rx="2" fill="#9b2c2c"/>
<!-- Side cannons -->
<rect x="-25" y="55" width="12" height="22" rx="3" fill="#e53e3e" filter="url(#b3g)"/>
<rect x="13" y="55" width="12" height="22" rx="3" fill="#e53e3e" filter="url(#b3g)"/>
<!-- Accent lines -->
<line x1="-100" y1="-30" x2="-50" y2="-10" stroke="#fc8181" stroke-width="3" opacity="0.8" filter="url(#b3g)"/>
<line x1="100" y1="-30" x2="50" y2="-10" stroke="#fc8181" stroke-width="3" opacity="0.8" filter="url(#b3g)"/>
</svg>`);

const imgMothership = createSvgImg(`
<svg width="400" height="200" viewBox="-200 -100 400 200" xmlns="http://www.w3.org/2000/svg">
<defs>
<linearGradient id="msh" x1="0" y1="-100" x2="0" y2="100"><stop offset="0%" stop-color="#4a1259"/><stop offset="100%" stop-color="#0b010d"/></linearGradient>
<radialGradient id="msc1" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#fff"/><stop offset="30%" stop-color="#fbb6ce"/><stop offset="100%" stop-color="#b83280" stop-opacity="0"/></radialGradient>
<filter id="msg" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="10" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<filter id="msgs"><feGaussianBlur stdDeviation="20"/></filter>
</defs>
<ellipse cx="0" cy="0" rx="180" ry="60" fill="rgba(213, 63, 140, 0.2)" filter="url(#msgs)"/>
<!-- Main Frame -->
<path d="M -180,20 L -200,-40 L -120,-80 L 0,-100 L 120,-80 L 200,-40 L 180,20 L 100,60 L -100,60 Z" fill="url(#msh)" stroke="#d53f8c" stroke-width="4"/>
<!-- Side Wings -->
<path d="M -180,0 L -240,40 L -200,60 L -150,40 Z" fill="#322659" stroke="#9f7aea" stroke-width="2"/>
<path d="M 180,0 L 240,40 L 200,60 L 150,40 Z" fill="#322659" stroke="#9f7aea" stroke-width="2"/>
<!-- Three Cores -->
<circle cx="0" cy="-20" r="45" fill="url(#msc1)" filter="url(#msg)"/>
<circle cx="-100" cy="0" r="25" fill="url(#msc1)" filter="url(#msg)"/>
<circle cx="100" cy="0" r="25" fill="url(#msc1)" filter="url(#msg)"/>
<!-- Forward Spires -->
<rect x="-10" y="60" width="20" height="40" fill="#4a1259" stroke="#d53f8c" stroke-width="2"/>
<path d="M -40,60 L -60,100 M 40,60 L 60,100" stroke="#d53f8c" stroke-width="5" stroke-linecap="round"/>
</svg>`);

// Game Objects
const player = {
    x: canvas.width / 2,
    y: canvas.height - 60,
    width: 45,
    height: 45,
    speed: 5,
    dx: 0,
    color: '#0ff',
    isDashing: false,
    dashTime: 0,
    dashCooldown: 0,
    hp: 5,
    maxHp: 5,
    shield: 0, // 0 to 1
    weaponLevel: 1,
    weaponType: 'normal', // normal, plasma, explosive, laser
    gemsCollected: 0,
    invulnerableTime: 0,
    activePowerup: null, // { type: 'SPREAD', timer: 300 }
    empCooldown: 0,
    shieldAbilityCooldown: 0,
    dashCooldown: 0
};
const EMP_COOLDOWN_MAX = 900; // 15 seconds at 60fps
const SHIELD_COOLDOWN_MAX = 900; // 15 seconds
const DASH_COOLDOWN_MAX = 180; // 3 seconds

// --- SHOP & UPGRADES STATE ---
let g_credits = 0; // The currency
let g_isShopOpen = false;
let g_upgradeCosts = {
    hp: 10,
    speed: 15,
    repair: 5,
    bombs: 20,
    plasma: 50,
    explosive: 75,
    laser: 100
};
const g_maxBombsBase = 3;
let g_maxBombs = 3;
// -----------------------------

let bullets = [];
let enemies = [];
let particles = [];
let stars = [];
let gems = [];
let empRings = [];
let hazardState = {
    type: 'NONE', // NONE, METEOR_SHOWER, SOLAR_FLARE
    timer: 0,
    duration: 0,
    flares: [] // For Solar Flares
};
let mines = [];

function updatePlayerStatusUI() {
    if (!hpBarFill) return;
    const hpRatio = Math.max(0, player.hp / player.maxHp) * 100;
    hpBarFill.style.width = `${hpRatio}%`;
    hpBarFill.style.backgroundColor = player.hp > 1 ? '#0f0' : '#f00';

    const t = translations[g_lang];
    let gemText = `(${player.gemsCollected}/${player.weaponLevel * 4} ${t.gems})`;
    if (player.weaponLevel >= 5) gemText = `(MAX)`;
    weaponLevelElement.innerHTML = `${t.weapon} Lvl ${player.weaponLevel} <span id="gem-progress" style="color:#ccc; font-size:12px;">${gemText}</span>`;

    if (bombCountElement) {
        bombCountElement.innerHTML = `${t.bombs} ${g_bombs} <span style="font-size:12px; color:#ccc;">${t.pressB}</span>`;
    }

    if (powerupStatusElement) {
        if (player.activePowerup) {
            powerupStatusElement.style.display = 'block';
            const timeLeft = Math.ceil(player.activePowerup.timer / 60);
            powerupStatusElement.innerText = `${t.powerup} ${player.activePowerup.type} (${timeLeft}s)`;
            powerupStatusElement.style.color = player.activePowerup.type === 'SHIELD' ? '#0af' : '#f0f';
        } else {
            powerupStatusElement.style.display = 'none';
        }
    }

    if (empStatusElement) {
        if (player.empCooldown <= 0) {
            empStatusElement.innerHTML = `${t.empReady} <span style="font-size:12px; color:#ccc;">${t.pressE}</span>`;
            empStatusElement.style.color = '#0af';
            empStatusElement.style.textShadow = '0 0 10px #0af';
        } else {
            const timeLeft = Math.ceil(player.empCooldown / 60);
            empStatusElement.innerHTML = `EMP: ${timeLeft}s`;
            empStatusElement.style.color = '#555';
            empStatusElement.style.textShadow = 'none';
        }
    }

    if (shieldAbilityStatusElement) {
        if (player.shieldAbilityCooldown <= 0) {
            shieldAbilityStatusElement.innerHTML = `${t.shieldReady} <span style="font-size:12px; color:#ccc;">${t.pressSpace}</span>`;
            shieldAbilityStatusElement.style.color = '#0df';
            shieldAbilityStatusElement.style.textShadow = '0 0 10px #0df';
        } else {
            const timeLeft = Math.ceil(player.shieldAbilityCooldown / 60);
            shieldAbilityStatusElement.innerHTML = `SHIELD: ${timeLeft}s`;
            shieldAbilityStatusElement.style.color = '#555';
            shieldAbilityStatusElement.style.textShadow = 'none';
        }
    }

    if (dashStatusElement) {
        if (player.dashCooldown <= 0) {
            dashStatusElement.innerHTML = `${t.dashReady} <span style="font-size:12px; color:#ccc;">${t.pressShift}</span>`;
            dashStatusElement.style.color = '#fff';
            dashStatusElement.style.textShadow = '0 0 10px #fff';
        } else {
            const timeLeft = Math.ceil(player.dashCooldown / 60);
            dashStatusElement.innerHTML = `DASH: ${timeLeft}s`;
            dashStatusElement.style.color = '#555';
            dashStatusElement.style.textShadow = 'none';
        }
    }
}

function updateBossUI() {
    if (!boss) {
        bossUI.style.display = 'none';
        return;
    }
    const t = translations[g_lang];
    document.getElementById('boss-name').innerText = t.warning.split(': ')[1] || 'MOTHERSHIP';
    bossUI.style.display = 'block';
    const hpRatio = Math.max(0, boss.hp / boss.maxHp) * 100;
    bossHpFill.style.width = `${hpRatio}%`;
}

function updateComboUI() {
    if (g_combo > 0 && g_comboMultiplier > 1) {
        comboUI.style.display = 'block';
        const t = translations[g_lang];
        comboText.innerText = `${t.combo} x${g_comboMultiplier}`;
    } else {
        comboUI.style.display = 'none';
        comboUI.style.transform = 'scale(1)';
    }
}

function triggerShake(frames, intensity = 1) {
    g_shakeTime = frames;
    gameContainer.classList.add('shake');
    
    if (intensity > 0.7) {
        gameContainer.classList.add('screen-flash');
        setTimeout(() => {
            gameContainer.classList.remove('screen-flash');
        }, 200);
    }
}

function showWaveUI(text, isWarning = false) {
    const t = translations[g_lang];
    let displayText = text;

    if (text.startsWith('WAVE')) {
        displayText = `${t.wave} ${text.split(' ')[1]}`;
    } else if (text === 'WARNING: MOTHERSHIP') {
        displayText = t.warning;
    }

    waveUI.style.opacity = '1';
    waveText.innerText = displayText;
    waveText.style.color = isWarning ? '#f00' : '#0ff';
    if (isWarning) playSound('warning');
    setTimeout(() => {
        waveUI.style.opacity = '0';
    }, 2000);
}

function useBomb() {
    if (g_bombs > 0 && gameState === 'PLAYING') {
        g_bombs--;
        playSound('bomb');
        triggerShake(40, 1);
        updatePlayerStatusUI();

        bullets = bullets.filter(b => !b.isEnemy);

        enemies.forEach(e => {
            score += 10 * g_comboMultiplier;
            createParticles(e.x + e.width / 2, e.y + e.height / 2, e.color);
        });
        enemies = [];
        updateScoreUI();

        if (boss) {
            boss.hp -= 30;
            updateBossUI();
        }
    }
}

function useEMP() {
    if (player.empCooldown <= 0 && gameState === 'PLAYING') {
        player.empCooldown = EMP_COOLDOWN_MAX;
        playSound('combo');
        triggerShake(20);

        // Destroy enemy bullets (but keep player bullets)
        bullets = bullets.filter(b => !b.isEnemy);

        // Stun enemies for 3 seconds
        enemies.forEach(e => {
            e.stunned = 180;
            createParticles(e.x + e.width / 2, e.y + e.height / 2, '#0af');
        });

        // Effect
        empRings.push({
            x: player.x + player.width / 2,
            y: player.y + player.height / 2,
            radius: 10,
            maxRadius: canvas.height * 1.5,
            life: 1.0
        });

        updatePlayerStatusUI();
    }
}

function useShield() {
    if (player.shieldAbilityCooldown <= 0 && gameState === 'PLAYING') {
        player.shieldAbilityCooldown = SHIELD_COOLDOWN_MAX;
        player.invulnerableTime = 180; // 3 seconds
        player.shield = 1.0; // Visual/Shield bubble
        playSound('powerup');
        createParticles(player.x + player.width / 2, player.y + player.height / 2, '#0df', 'explosion');
        updatePlayerStatusUI();
    }
}

function useDash() {
    if (player.dashCooldown <= 0 && gameState === 'PLAYING') {
        player.dashCooldown = DASH_COOLDOWN_MAX;
        player.isDashing = true;
        player.dashTime = 15; // 0.25s speed boost
        player.invulnerableTime = 15;

        playSound('powerup'); // Using powerup sound since it fits a boost
        createParticles(player.x + player.width / 2, player.y + player.height / 2, '#fff', 'exhaust');
        updatePlayerStatusUI();
    }
}

// Input
const keys = {
    Up: false,
    Down: false,
    Left: false,
    Right: false,
    Space: false,
    Shift: false,
    KeyX: false
};
let isPointerDown = false;
let pointerX = 0;
let pointerY = 0;
let lastClientX = 0;
let lastClientY = 0;

// Track general mouse/touch position at window level
window.addEventListener('pointermove', (e) => {
    lastClientX = e.clientX;
    lastClientY = e.clientY;
    // If not using mouse clicks to move, you could update pointerX/Y here
    // but doing it in the game loop is smoother.
});

function updatePointerPosition() {
    if (gameState !== 'PLAYING') return;

    const rect = canvas.getBoundingClientRect();
    // Using simple client coordinates - most robust across browsers
    pointerX = (lastClientX - rect.left) * (canvas.width / rect.width);
    pointerY = (lastClientY - rect.top) * (canvas.height / rect.height);
}


canvas.addEventListener('pointerdown', (e) => {
    isPointerDown = true;
    lastClientX = e.clientX;
    lastClientY = e.clientY;
    updatePointerPosition();
});

// Using window for move/up ensures we don't 'lose' the mouse if it moves fast
window.addEventListener('pointerup', () => {
    isPointerDown = false;
});

canvas.addEventListener('pointerleave', () => {
    // Optional: Keep isPointerDown true and let window handle pointerup
    // This allows dragging eyes-closed outside the canvas
});


// Prevent scrolling on touch devices over canvas
canvas.addEventListener('touchstart', (e) => { e.preventDefault(); }, { passive: false });
canvas.addEventListener('touchmove', (e) => { e.preventDefault(); }, { passive: false });

document.addEventListener('keydown', (e) => {
    // Pause toggle - checking code, key, and keyCode for maximum compatibility
    const isPauseKey = e.code === 'KeyP' || e.code === 'Escape' || e.key === 'p' || e.key === 'P' || e.key === 'Escape' || e.keyCode === 80 || e.keyCode === 27;

    if (isPauseKey) {
        console.log('Pause Key Detected:', e.code, e.key, e.keyCode);
        if (gameState === 'PLAYING') {
            window.togglePauseManual(); // Use the shared function
            return;
        }
    }

    if (window.isPausedGlobal) return;

    // Prevent default scrolling for game keys
    if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        e.preventDefault();
    }

    if (e.code === 'ArrowUp' || e.code === 'KeyW') keys.Up = true;
    if (e.code === 'ArrowDown' || e.code === 'KeyS') keys.Down = true;
    if (e.code === 'ArrowLeft' || e.code === 'KeyA') keys.Left = true;
    if (e.code === 'ArrowRight' || e.code === 'KeyD') keys.Right = true;
    if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
        if (!keys.Shift) useDash();
        keys.Shift = true;
    }
    if (e.code === 'KeyX') {
        keys.KeyX = true;
    }
    if (e.code === 'Space') {
        if (!keys.Space) useShield();
        keys.Space = true;
    }
    if (e.code === 'KeyB') {
        useBomb();
    }
    if (e.code === 'KeyE') {
        useEMP();
    }
});

document.addEventListener('keyup', (e) => {
    if (e.code === 'ArrowUp' || e.code === 'KeyW') keys.Up = false;
    if (e.code === 'ArrowDown' || e.code === 'KeyS') keys.Down = false;
    if (e.code === 'ArrowLeft' || e.code === 'KeyA') keys.Left = false;
    if (e.code === 'ArrowRight' || e.code === 'KeyD') keys.Right = false;
    if (e.code === 'Space') keys.Space = false;
    if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') keys.Shift = false;
    if (e.code === 'KeyX') keys.KeyX = false;
});

// Define functions first, then add listeners
window.openShipSelection = function () {
    console.log('Opening Ship Selection');
    startScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    const shipSelect = document.getElementById('ship-selection-screen');
    if (shipSelect) shipSelect.classList.remove('hidden');
};

window.selectShip = function (type) {
    console.log('Selecting Ship:', type);
    const shipSelect = document.getElementById('ship-selection-screen');
    if (shipSelect) shipSelect.classList.add('hidden');

    // Reset shop upgrades on a completely new game/ship
    g_credits = 0;
    g_upgradeCosts = { hp: 10, speed: 15, repair: 5, bombs: 20 };
    g_maxBombs = 3;
    g_bombs = 3;

    // Apply ship modifiers
    if (type === 'balanced') {
        player.maxHp = 5;
        player.speed = 5;
        player.weaponLevel = 1;
    } else if (type === 'speed') {
        player.maxHp = 3;
        player.speed = 7;
        player.weaponLevel = 1;
    } else if (type === 'heavy') {
        player.maxHp = 7;
        player.speed = 3.5;
        player.weaponLevel = 2; // Heavy starts with Level 2
    }

    player.hp = player.maxHp;
    updatePlayerStatusUI();
    startGame(false);
};

// Check if save data exists
try {
    const savedData = localStorage.getItem('spaceShooterSave');
    if (savedData) {
        continueBtn.style.display = 'inline-block';
    }
} catch (e) {
    console.warn('Failed to load save data:', e);
}

startBtn.addEventListener('click', window.openShipSelection);
continueBtn.addEventListener('click', () => startGame(true));
restartBtn.addEventListener('click', window.openShipSelection);
continueGameoverBtn.addEventListener('click', () => startGame(true));
if (victoryRestartBtn) victoryRestartBtn.addEventListener('click', () => {
    victoryScreen.classList.add('hidden');
    window.openShipSelection();
});


function updateScoreUI() {
    const t = translations[g_lang];
    scoreElement.innerText = `${t.score} ${score}`;
    highScoreElement.innerText = `${t.highScore} ${highScore}`;
}

function saveGame() {
    const data = {
        score: score,
        wave: g_wave,
        hp: player.hp,
        weaponLevel: player.weaponLevel,
        gemsCollected: player.gemsCollected,
        bombs: g_bombs,
        lang: g_lang,
        music: g_musicEnabled,
        sounds: g_soundsEnabled,
        musicVol: g_musicVolume,
        soundsVol: g_soundsVolume
    };
    localStorage.setItem('spaceShooterSave', JSON.stringify(data));
    // Update both continue buttons
    continueBtn.style.display = 'inline-block';
    continueWaveNum.textContent = g_wave;
}

function clearSave() {
    localStorage.removeItem('spaceShooterSave');
    continueBtn.style.display = 'none';
}

function initStars() {
    stars = [];
    for (let i = 0; i < 200; i++) {
        const isMeteor = Math.random() < 0.1;
        const layer = Math.random();
        let speed, size, color, alpha;
        
        if (layer < 0.6) {
            speed = Math.random() * 0.3 + 0.1;
            size = Math.random() * 1 + 0.5;
            color = 'rgba(255, 255, 255, 0.4)';
            alpha = 0.4;
        } else if (layer < 0.9) {
            speed = Math.random() * 0.8 + 0.4;
            size = Math.random() * 1.5 + 1;
            color = 'rgba(200, 220, 255, 0.7)';
            alpha = 0.7;
        } else {
            speed = Math.random() * 1.5 + 1;
            size = Math.random() * 2 + 1.5;
            color = isMeteor ? '#ff6b35' : 'rgba(255, 255, 255, 1)';
            alpha = 1;
        }
        
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: size,
            speed: isMeteor ? speed * 3 : speed,
            isMeteor: isMeteor,
            color: color,
            alpha: alpha,
            layer: layer,
            twinkle: Math.random() > 0.95
        });
    }
}

function updateStars() {
    stars.forEach(star => {
        star.y += star.speed;
        if (star.isMeteor) star.x += star.speed * 0.3;
        
        if (star.twinkle) {
            star.alpha = 0.3 + Math.abs(Math.sin(frameCount * 0.05 + star.x)) * 0.7;
        }
        
        if (star.y > canvas.height || star.x > canvas.width) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }
    });
}

// High-Quality Realistic Planet Assets
const hqImgMars = new Image(); hqImgMars.src = 'assets/planet_red.png?v=2';
const hqImgSaturn = new Image(); hqImgSaturn.src = 'assets/planet_yellow.png?v=2';
const hqImgUranus = new Image(); hqImgUranus.src = 'assets/planet_blue.png?v=2';

function spawnPlanet() {
    const hqTypes = ['Mars', 'Saturn', 'Uranus'];
    const type = hqTypes[Math.floor(Math.random() * hqTypes.length)];
    let size = 300 + Math.random() * 500; // Much larger for photorealistic detail

    planets.push({
        x: (Math.random() * canvas.width) - (size / 2),
        y: -size - 100,
        size: size,
        speed: 0.05 + Math.random() * 0.15, // Slower for majestic parallax
        type: type,
        img: type === 'Mars' ? hqImgMars : (type === 'Saturn' ? hqImgSaturn : hqImgUranus)
    });
}

function updatePlanets() {
    planets.forEach((p, index) => {
        p.y += p.speed;
        if (p.y > canvas.height + 200) {
            planets.splice(index, 1);
        }
    });

    // Occasional spawning
    if (frameCount % 1200 === 0 && planets.length < 1) { // roughly every 20 seconds, max 1 planet at a time
        spawnPlanet();
    }
}

function drawPlanets() {
    planets.forEach(p => {
        ctx.save();
        ctx.globalAlpha = 1.0; // Restored to full opacity since the backgound is gone
        if (p.img.complete) {
            ctx.drawImage(p.img, p.x, p.y, p.size, p.size); // The new image bounds are square
        }
        ctx.restore();
    });
}

function drawStars() {
    stars.forEach(star => {
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        if (star.isMeteor) {
            ctx.rect(star.x, star.y, star.size, star.size * 2);
        } else {
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        }
        ctx.fill();
        
        if (star.layer > 0.85 && !star.isMeteor) {
            ctx.globalAlpha = star.alpha * 0.3;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
            ctx.fill();
        }
    });
    ctx.globalAlpha = 1.0;
}

function startGame(loadSave = false) {
    // Butonların Space tuşu ile tekrar tetiklenmesini engelle
    if (document.activeElement) {
        document.activeElement.blur();
    }

    gameState = 'PLAYING';
    window.isPausedGlobal = false;
    const btn = document.getElementById('pause-btn-ui');
    if (btn) btn.innerText = 'PAUSE (P)';
    startScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');

    player.x = canvas.width / 2 - player.width / 2;
    player.y = canvas.height - 60;
    player.isDashing = false;
    player.dashTime = 0;
    player.dashCooldown = 0;
    player.invulnerableTime = 0;

    boss = null;
    g_combo = 0;
    g_comboMultiplier = 1;
    g_enemiesSpawnedThisWave = 0;
    g_waveActive = true;
    bullets = [];
    enemies = [];
    particles = [];
    gems = [];
    empRings = [];
    mines = [];
    planets = [];
    initAudio();
    initStars();

    // Re-check savedData dynamically to fix the bug where refreshed runs missed updates
    const currentSavedData = localStorage.getItem('spaceShooterSave');
    if (loadSave && currentSavedData) {
        const data = JSON.parse(currentSavedData);
        score = data.score;
        g_wave = data.wave;
        player.hp = data.hp;
        player.weaponLevel = data.weaponLevel;
        player.gemsCollected = data.gemsCollected;
        g_bombs = data.bombs;
        showWaveUI(`WAVE ${g_wave}`);
        g_enemiesToSpawn = 10 + Math.floor(g_wave * 2.5);
    } else {
        score = 0;
        player.hp = player.maxHp;
        player.weaponLevel = 1;
        player.gemsCollected = 0;
        g_bombs = 3;
        g_wave = 1;
        showWaveUI('WAVE 1');
        g_enemiesToSpawn = 12;
    }

    frameCount = 0;
    updateScoreUI();
    bombCountElement.innerHTML = `BOMBS: ${g_bombs} <span style="font-size:12px; color:#ccc;">(Press B)</span>`;

    updatePlayerStatusUI();
    updateBossUI();
    updateComboUI();
    MusicManager.start('COMBAT');
}

function gameOver() {
    gameState = 'GAMEOVER';
    triggerShake(20); // Final impact shake
    window.isPausedGlobal = false;
    MusicManager.start('MENU');

    if (score > highScore) {
        highScore = score;
        localStorage.setItem('spaceShooterHighScore', highScore);
        highScoreElement.innerText = `High Score: ${highScore}`;
    }

    // Show continue button on game over screen if a save exists
    const saveOnDeath = localStorage.getItem('spaceShooterSave');
    if (saveOnDeath) {
        const saveData = JSON.parse(saveOnDeath);
        continueWaveNum.textContent = saveData.wave;
        continueGameoverBtn.style.display = 'inline-block';
        gameoverWaveInfo.textContent = `You reached Wave ${g_wave} — Score: ${score}`;
    } else {
        continueGameoverBtn.style.display = 'none';
        gameoverWaveInfo.textContent = '';
    }

    gameOverScreen.classList.remove('hidden');
    finalScoreElement.innerText = `Score: ${score}`;
}

function victory() {
    gameState = 'VICTORY';
    window.isPausedGlobal = false;
    MusicManager.start('MENU');

    if (score > highScore) {
        highScore = score;
        localStorage.setItem('spaceShooterHighScore', highScore);
        highScoreElement.innerText = `High Score: ${highScore}`;
    }

    victoryScreen.classList.remove('hidden');
    victoryScoreElement.innerText = `Score: ${score}`;
}

function shoot() {
    playSound('shoot');
    const lvl = player.weaponLevel;
    const wType = player.weaponType;
    let bColor, bSpeed, bWidth, bHeight, bDamage, bIsExplosive = false;
    
    // Weapon type effects
    if (wType === 'plasma') {
        bColor = '#00ffff'; bSpeed = 5; bWidth = 12; bHeight = 12; bDamage = lvl * 2;
    } else if (wType === 'laser') {
        bColor = '#ffffff'; bSpeed = 18; bWidth = 3; bHeight = 35; bDamage = lvl;
    } else if (wType === 'explosive') {
        bColor = '#ff6600'; bSpeed = 8; bWidth = 8; bHeight = 8; bDamage = lvl + 1; bIsExplosive = true;
    } else {
        // Normal weapons based on level
        if (lvl >= 5) {
            bColor = '#ff0080'; bSpeed = 14; bWidth = 7; bHeight = 22; bDamage = 3;
        } else if (lvl === 4) {
            bColor = '#f0f'; bSpeed = 12; bWidth = 6; bHeight = 20; bDamage = 2;
        } else {
            bColor = '#ff0'; bSpeed = 7; bWidth = 4; bHeight = 15; bDamage = 1;
        }
    }

    const spawnBullet = (xOffset, yOffset, vx, isHoming = false) => {
        bullets.push({
            x: player.x + xOffset,
            y: player.y + yOffset,
            width: isHoming ? bWidth * 1.5 : bWidth,
            height: isHoming ? bHeight * 1.5 : bHeight,
            speed: isHoming ? bSpeed * 0.8 : bSpeed,
            color: isHoming ? '#fff' : bColor,
            hp: bDamage,
            vx: vx,
            vy: -1,
            isHoming: isHoming,
            isExplosive: bIsExplosive,
            weaponType: wType
        });

        // Muzzle Flash
        muzzleFlashes.push({
            x: player.x + xOffset + (isHoming ? bWidth * 1.5 : bWidth) / 2,
            y: player.y + yOffset,
            size: bWidth * (isHoming ? 4 : 3),
            life: 1.0,
            color: isHoming ? '#fff' : bColor
        });
    };

    if (player.activePowerup && player.activePowerup.type === 'SPREAD') {
        // OVERRIDE: 9-way Extreme Spread
        for (let i = 0; i < 9; i++) {
            spawnBullet(player.width / 2 - bWidth / 2, 0, (i - 4) * 2);
        }
        return;
    }

    if (player.activePowerup && player.activePowerup.type === 'LASER') {
        // OVERRIDE: Rapid Super Laser
        bColor = '#f0f'; bSpeed = 20; bWidth = 2; bHeight = 40; bDamage = 1;
        spawnBullet(player.width / 2 - bWidth / 2, -10, 0);
        return;
    }

    if (lvl === 1) {
        spawnBullet(player.width / 2 - bWidth / 2, 0, 0);
    } else if (lvl === 2) {
        spawnBullet(5, 0, 0);
        spawnBullet(player.width - 5 - bWidth, 0, 0);
    } else if (lvl === 3) {
        spawnBullet(player.width / 2 - bWidth / 2, -5, 0);
        spawnBullet(0, 10, -1);
        spawnBullet(player.width - bWidth, 10, 1);
    } else if (lvl === 4) {
        spawnBullet(player.width / 2 - bWidth / 2, -5, 0);
        spawnBullet(0, 10, -1);
        spawnBullet(player.width - bWidth, 10, 1);
        spawnBullet(-10, 20, -5, true);
        spawnBullet(player.width + 10 - bWidth, 20, 5, true);
    } else { // Level 5 — Max Devastation: 5-way spread + 2 homing
        spawnBullet(player.width / 2 - bWidth / 2, -5, 0);
        spawnBullet(0, 5, -1.5);
        spawnBullet(player.width - bWidth, 5, 1.5);
        spawnBullet(-8, 15, -3);
        spawnBullet(player.width + 8 - bWidth, 15, 3);
        spawnBullet(-14, 28, -6, true); // homing left
        spawnBullet(player.width + 14 - bWidth, 28, 6, true); // homing right
    }
}

function spawnBoss() {
    playSound('boss_spawn');
    MusicManager.start('BOSS');

    if (g_wave === 20) {
        // MOTHERSHIP FINAL BOSS
        boss = {
            x: canvas.width / 2 - 200,
            y: -250,
            width: 400,
            height: 120,
            hp: 3000,
            maxHp: 3000,
            speed: 1.5,
            direction: 1,
            color: '#ff00ff',
            phase: 'enter', // enter, fight, angry, desperation
            type: 'MOTHERSHIP',
            attackTimer: 0,
            childrenSpawned: 0
        };
    } else {
        const tier = Math.min(3, Math.floor((g_wave - 1) / 3) + 1); // Tier 1, 2, or 3 based on wave number
        boss = {
            x: canvas.width / 2 - 100,
            y: -100,
            width: 200,
            height: 60,
            hp: 100 + Math.floor(score / 500) * 50 + (tier * 100),
            maxHp: 100 + Math.floor(score / 500) * 50 + (tier * 100),
            speed: 2 + (tier * 0.5),
            direction: 1, // 1 right, -1 left
            color: '#f00',
            phase: 'enter', // enter, fight
            tier: tier,
            type: 'NORMAL_BOSS'
        };
    }
    updateBossUI();
}

function spawnEnemy() {
    const size = Math.random() * 20 + 20;
    const x = Math.random() * (canvas.width - size);
    let initialHp = Math.ceil(size / 10) + Math.floor(g_wave * 0.5);

    let type = 'NORMAL';
    const rand = Math.random();

    // Type selection logic based on wave
    if (g_wave >= 5 && rand < 0.15) {
        type = 'SNIPER';
    } else if (g_wave >= 3 && rand < 0.35) {
        type = 'DIVER'; // Enhanced Kamikaze
    } else if (g_wave >= 2 && rand < 0.55) {
        type = 'ASTEROID';
    } else if (g_wave >= 4 && rand > 0.8) {
        type = 'TANK';
    } else if (g_wave >= 6 && rand < 0.1) {
        type = 'BEAMER';
    } else if (g_wave >= 7 && rand < 0.2) {
        type = 'GHOST';
    } else if (g_wave >= 8 && rand < 0.3) {
        type = 'MINER';
    } else if (rand > 0.6) {
        type = 'SINE';
    }

    let eColor = `hsl(${Math.random() * 360}, 70%, 50%)`;
    let eHp = initialHp;
    let eSpeed = (Math.random() * 1.5 + 1) * (1 + (g_wave * 0.05));

    if (type === 'DIVER') {
        eColor = '#f33'; // Bright Red
        eSpeed *= 1.2;
    } else if (type === 'SNIPER') {
        eColor = '#f0f'; // Magenta
        eSpeed = 2;
    } else if (type === 'TANK') {
        eColor = '#888'; // Gray
        eHp *= 4;
        eSpeed *= 0.7;
    } else if (type === 'ASTEROID') {
        eColor = '#555'; // Dark Gray
        eHp *= 3;
        eSpeed *= 0.5;
    } else if (type === 'SINE') {
        eColor = '#0ff'; // Cyan
    } else if (type === 'BEAMER') {
        eColor = '#ffcf00'; // Golden/Yellow
        eHp *= 2;
        eSpeed = 1.5;
    } else if (type === 'GHOST') {
        eColor = 'rgba(255, 255, 255, 0.5)';
        eHp *= 0.8;
        eSpeed = 2.5;
    } else if (type === 'MINER') {
        eColor = '#ff6600'; // Orange
        eHp *= 3;
        eSpeed = 2;
    }

    let enemyData = {
        x: x,
        y: -size,
        width: type === 'ASTEROID' ? size * 1.5 : size,
        height: type === 'ASTEROID' ? size * 1.5 : size,
        speed: eSpeed,
        color: eColor,
        hp: eHp,
        maxHp: eHp,
        type: type,
        startX: x,
        state: 'DESCEND', // For Snipers/Divers/Beamers
        shootTimer: Math.random() * 180 + 60, // For Snipers
        targetY: Math.random() * 200 + 50, // For Snipers/Beamers
        stunned: 0
    };

    if (type === 'GHOST') {
        enemyData.alpha = 1.0;
        enemyData.fadeDir = -1;
    }

    if (type === 'MINER') {
        enemyData.dir = Math.random() > 0.5 ? 1 : -1;
        enemyData.mineTimer = 120;
    }

    if (type === 'BEAMER') {
        enemyData.state = 'MOVE';
        enemyData.beamTimer = 180; // 3 seconds cycle
    }

    enemies.push(enemyData);
    g_enemiesSpawnedThisWave++;
}

function createParticles(x, y, color, type = 'normal') {
    let count = 15;
    if (type === 'exhaust') count = 1;
    if (type === 'explosion') count = 35;
    if (type === 'boss_explosion') count = 100;
    if (type === 'spark') count = 8;

    for (let i = 0; i < count; i++) {
        const isExplosion = type === 'explosion' || type === 'boss_explosion';
        const isSpark = type === 'spark';

        particles.push({
            x: x,
            y: y,
            vx: type === 'exhaust' ? (Math.random() - 0.5) * 1 : (Math.random() - 0.5) * (isExplosion ? 8 : (isSpark ? 12 : 5)),
            vy: type === 'exhaust' ? Math.random() * 2 + 1 : (Math.random() - 0.5) * (isExplosion ? 8 : (isSpark ? 12 : 5)),
            size: Math.max(0.5, type === 'exhaust' ? Math.random() * 5 + 2 : (isExplosion ? Math.random() * 5 + 1 : (isSpark ? Math.random() * 2 : Math.random() * 3 + 1))),
            color: color,
            life: 1.0,
            decay: type === 'exhaust' ? 0.02 + Math.random() * 0.02 : (isExplosion ? 0.015 : (isSpark ? 0.08 : 0.02)),
            type: type
        });
    }
}

function update() {
    // Screen shake update (independent of game state so it stops at Game Over)
    if (g_shakeTime > 0) {
        g_shakeTime--;
        if (g_shakeTime <= 0) {
            gameContainer.classList.remove('shake');
        }
    }

    if (gameState !== 'PLAYING') return;

    // Player movement
    let currentSpeed = player.speed;
    if (player.isDashing) {
        currentSpeed = player.speed * 3;
        player.dashTime--;
        if (player.dashTime <= 0) player.isDashing = false;
        // Dash trail effect
        if (frameCount % 2 === 0) {
            createParticles(player.x + player.width / 2, player.y + player.height / 2, '#0ff');
        }
    }

    // Engine exhaust
    if (frameCount % 2 === 0) {
        createParticles(player.x + 10, player.y + player.height - 5, 'rgba(150, 150, 150, 0.4)', 'exhaust');
        createParticles(player.x + 10, player.y + player.height - 5, 'rgba(0, 255, 255, 0.6)', 'exhaust');
        createParticles(player.x + player.width - 10, player.y + player.height - 5, 'rgba(150, 150, 150, 0.4)', 'exhaust');
        createParticles(player.x + player.width - 10, player.y + player.height - 5, 'rgba(0, 255, 255, 0.6)', 'exhaust');
    }

    if (player.invulnerableTime > 0) {
        player.invulnerableTime--;
    }

    if (player.dashCooldown > 0) {
        player.dashCooldown--;
    }

    if (player.shieldAbilityCooldown > 0) {
        player.shieldAbilityCooldown--;
    }

    if (player.empCooldown > 0) {
        player.empCooldown--;
    }

    // Update EMP rings
    for (let i = empRings.length - 1; i >= 0; i--) {
        const ring = empRings[i];
        ring.radius += 20; // Fast expand
        ring.life -= 0.05; // Fade out
        if (ring.life <= 0 || ring.radius >= ring.maxRadius) {
            empRings.splice(i, 1);
        }
    }

    // Update Mines
    for (let i = mines.length - 1; i >= 0; i--) {
        const mine = mines[i];
        mine.y += mine.speed;

        // Proximity trigger
        const dist = Math.hypot(player.x + player.width / 2 - mine.x, player.y + player.height / 2 - mine.y);
        if (dist < 80) {
            createParticles(mine.x, mine.y, '#f00', 'explosion');
            playSound('explosion');
            triggerShake(10);

            if (dist < 45 && player.invulnerableTime <= 0) {
                player.hp--;
                player.invulnerableTime = 60;
                updatePlayerStatusUI();
                if (player.hp <= 0) gameOver();
            }
            mines.splice(i, 1);
            continue;
        }

        if (mine.y > canvas.height) {
            mines.splice(i, 1);
        }
    }

    // Environmental Hazards
    if (hazardState.type === 'NONE') {
        const hazardInterval = 1200; // Check every 20 seconds
        if (frameCount % hazardInterval === 0 && g_wave >= 2 && !boss) {
            const t = translations[g_lang];
            const rand = Math.random();
            if (rand < 0.33) {
                hazardState.type = 'METEORS';
                hazardState.duration = 600;
                showWaveUI(t.meteorShower, true);
                playSound('warning');
            } else if (rand < 0.66) {
                hazardState.type = 'SOLAR_FLARES';
                hazardState.duration = 480; // 8 seconds
                hazardState.timer = 0;
                hazardState.flares = [];
                showWaveUI(t.solarActivity, true);
                playSound('warning');
            } else if (g_wave >= 4) { // Only if wave is high enough for Black Hole
                hazardState.type = 'BLACK_HOLE';
                hazardState.duration = 600; // 10 seconds
                hazardState.x = canvas.width / 2;
                hazardState.y = 200;
                showWaveUI(t.gravityAnomaly, true);
                playSound('warning');
            }
        }
    } else if (hazardState.type === 'METEOR_SHOWER') {
        hazardState.duration--;
        if (hazardState.duration <= 0) {
            hazardState.type = 'NONE';
        } else if (frameCount % 15 === 0) {
            // Spawn a fast meteor
            const size = 20 + Math.random() * 20;
            const x = Math.random() * (canvas.width - size);
            enemies.push({
                x: x,
                y: -size,
                width: size,
                height: size,
                speed: 8 + Math.random() * 4,
                color: '#ff4500',
                hp: 1,
                maxHp: 1,
                type: 'METEOR',
                startX: x,
                stunned: 0
            });
        }
    } else if (hazardState.type === 'SOLAR_FLARE') {
        hazardState.duration--;
        if (hazardState.duration <= 0 && hazardState.flares.length === 0) {
            hazardState.type = 'NONE';
        }

        // Spawn a flare every 2 seconds during active duration
        if (hazardState.duration > 120 && frameCount % 120 === 0) {
            const isVertical = Math.random() > 0.5;
            hazardState.flares.push({
                isVertical: isVertical,
                pos: isVertical ? Math.random() * (canvas.width - 60) + 30 : Math.random() * (canvas.height - 60) + 30,
                warningTime: 90, // 1.5s warning
                activeTime: 60,  // 1s active
                width: 40,
                alpha: 0
            });
        }

        // Update active flares
        for (let i = hazardState.flares.length - 1; i >= 0; i--) {
            const flare = hazardState.flares[i];
            if (flare.warningTime > 0) {
                flare.warningTime--;
            } else if (flare.activeTime > 0) {
                flare.activeTime--;
                // Collision Detection
                let hit = false;
                if (flare.isVertical) {
                    if (player.x < flare.pos + flare.width / 2 && player.x + player.width > flare.pos - flare.width / 2) {
                        hit = true;
                    }
                } else {
                    if (player.y < flare.pos + flare.width / 2 && player.y + player.height > flare.pos - flare.width / 2) {
                        hit = true;
                    }
                }

                if (hit && player.invulnerableTime <= 0) {
                    player.hp--;
                    player.invulnerableTime = 60;
                    playSound('hit');
                    triggerShake(20);
                    updatePlayerStatusUI();
                    if (player.hp <= 0) gameOver();
                }
            } else {
                hazardState.flares.splice(i, 1);
            }
        }
    } else if (hazardState.type === 'BLACK_HOLE') {
        hazardState.duration--;
        if (hazardState.duration <= 0) {
            hazardState.type = 'NONE';
        }

        const pullX = hazardState.x;
        const pullY = hazardState.y;
        const strength = 0.5;

        // Pull player
        const dx = pullX - (player.x + player.width / 2);
        const dy = pullY - (player.y + player.height / 2);
        const dist = Math.hypot(dx, dy);
        if (dist > 50) {
            player.x += (dx / dist) * strength * 2.5;
            player.y += (dy / dist) * strength * 2.5;
        } else {
            // Damage if too close
            if (player.invulnerableTime <= 0) {
                player.hp--;
                player.invulnerableTime = 30;
                playSound('hit');
                triggerShake(10);
                updatePlayerStatusUI();
                if (player.hp <= 0) gameOver();
            }
        }

        // Pull enemies
        enemies.forEach(e => {
            const edx = pullX - (e.x + e.width / 2);
            const edy = pullY - (e.y + e.height / 2);
            const edist = Math.hypot(edx, edy);
            if (edist > 50) {
                e.x += (edx / edist) * strength;
                e.y += (edy / edist) * strength;
            }
        });

        // Pull gems
        gems.forEach(g => {
            const gdx = pullX - g.x;
            const gdy = pullY - g.y;
            const gdist = Math.hypot(gdx, gdy);
            if (gdist > 20) {
                g.x += (gdx / gdist) * strength * 1.5;
                g.y += (gdy / gdist) * strength * 1.5;
            }
        });
    }

    if (keys.Left && player.x > 0) {
        player.x -= currentSpeed;
    }
    if (keys.Right && player.x < canvas.width - player.width) {
        player.x += currentSpeed;
    }
    if (keys.Up && player.y > 0) {
        player.y -= currentSpeed;
    }
    // Limit down movement so player doesn't go completely off bottom
    if (keys.Down && player.y < canvas.height - player.height) {
        player.y += currentSpeed;
    }

    // Keyboard Fire (New: X key)
    if (keys.KeyX && frameCount % 10 === 0) {
        shoot();
    }

    // Pointer Input overrides - calculate once per frame if mouse is down
    if (isPointerDown) {
        updatePointerPosition();

        let targetX = pointerX - player.width / 2;
        let targetY = pointerY - player.height / 2;

        player.x = targetX;
        player.y = targetY;


        // Check bounds
        player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));
        player.y = Math.max(0, Math.min(canvas.height - player.height, player.y));

        // Auto Fire on holding touch/mouse 
        if (frameCount % 6 === 0) {
            shoot();
        }
    }

    // Update bullets
    bullets.forEach((bullet, index) => {
        if (!bullet.isEnemy && bullet.isHoming) {
            let target = null;
            let minDist = Infinity;
            if (boss) {
                target = boss;
                minDist = Math.hypot(boss.x + boss.width / 2 - bullet.x, boss.y + boss.height / 2 - bullet.y);
            }
            enemies.forEach(e => {
                let dist = Math.hypot(e.x + e.width / 2 - bullet.x, e.y + e.height / 2 - bullet.y);
                if (dist < minDist) { minDist = dist; target = e; }
            });

            if (target) {
                let tx = target.x + target.width / 2;
                let ty = target.y + target.height / 2;
                let dx = tx - bullet.x;
                let dy = ty - bullet.y;
                let dist = Math.hypot(dx, dy);
                bullet.vx = (dx / dist) * bullet.speed;
                bullet.vy = (dy / dist) * bullet.speed;

                // optional trail
                if (frameCount % 2 === 0) createParticles(bullet.x, bullet.y + bullet.height, '#fff');
            } else {
                // Keep moving straight if no target
                bullet.vy = -bullet.speed;
            }

            bullet.y += bullet.vy;
            if (bullet.vx) bullet.x += bullet.vx;

        } else {
            // Normal bullets
            bullet.y -= bullet.speed;
            if (bullet.vx) bullet.x += bullet.vx;
        }

        if (bullet.y + bullet.height < 0 || bullet.y > canvas.height || bullet.x < 0 || bullet.x > canvas.width) {
            bullets.splice(index, 1);
            return;
        }

        // enemy bullet collision with player
        if (bullet.isEnemy) {
            if (
                bullet.x < player.x + player.width &&
                bullet.x + bullet.width > player.x &&
                bullet.y < player.y + player.height &&
                bullet.y + bullet.height > player.y
            ) {
                if (player.invulnerableTime <= 0) {
                    if (player.shield > 0) {
                        player.shield = 0;
                        player.invulnerableTime = 30; // Shorter invuln for shield pop
                        playSound('hit');
                        createParticles(player.x + player.width / 2, player.y + player.height / 2, '#0af', 'explosion');
                        triggerShake(15);
                    } else {
                        player.hp--;
                        player.invulnerableTime = 60;
                        playSound('hit');
                        triggerShake(20);
                    }
                    updatePlayerStatusUI();
                }
                if (player.hp <= 0) gameOver();
                createParticles(player.x + player.width / 2, player.y + player.height / 2, player.color);
                bullets.splice(index, 1);
            }
        }
    });

    // Boss spawning logic is driven by waves now, but we can keep score logic if missed.
    // Instead we will handle wave/boss logic at the end of update()

    // Spawn regular enemies
    if (frameCount % Math.max(20, 60 - g_wave * 5) === 0 && !boss && g_enemiesSpawnedThisWave < g_enemiesToSpawn && g_waveActive) {
        spawnEnemy();
    }

    // Update Boss
    if (boss) {
        if (boss.phase === 'enter') {
            boss.y += boss.speed;
            const stopY = boss.type === 'MOTHERSHIP' ? 20 : 50;
            if (boss.y >= stopY) boss.phase = 'fight';
        } else {
            // HP-based phase transitions
            if (boss.hp <= boss.maxHp * 0.2 && boss.phase !== 'desperation') {
                boss.phase = 'desperation';
                boss.speed *= 1.2;
                triggerShake(30);
                playSound('warning');
            } else if (boss.hp <= boss.maxHp / 2 && boss.phase === 'fight') {
                boss.phase = 'angry';
                boss.color = '#fa0'; // Orange
                boss.speed *= 1.5;
                triggerShake(20);
                playSound('boss_spawn');
            }

            // Hover side to side
            boss.x += boss.speed * boss.direction;
            if (boss.x <= 0 || boss.x + boss.width >= canvas.width) {
                boss.direction *= -1;
            }

            if (boss.type === 'MOTHERSHIP') {
                // MOTHERSHIP UNIQUE ATTACKS
                boss.attackTimer++;
                const attackFreq = boss.phase === 'desperation' ? 90 : (boss.phase === 'angry' ? 120 : 180);

                if (boss.attackTimer % attackFreq === 0) {
                    const rand = Math.random();
                    if (rand < 0.33) {
                        // Attack 1: Mega Beam
                        for (let i = -1; i <= 1; i++) {
                            bullets.push({
                                x: boss.x + boss.width / 2 + i * 80,
                                y: boss.y + boss.height,
                                width: 30,
                                height: 60,
                                speed: -10,
                                color: '#f0f',
                                isEnemy: true,
                                hp: 1,
                                vx: 0
                            });
                        }
                        playSound('shoot');
                    } else if (rand < 0.66) {
                        // Attack 2: Drone Swarm
                        for (let i = 0; i < 4; i++) {
                            enemies.push({
                                x: boss.x + (i / 3) * boss.width,
                                y: boss.y + boss.height,
                                width: 25,
                                height: 25,
                                speed: 4,
                                color: '#0ff',
                                hp: 2,
                                maxHp: 2,
                                type: 'NORMAL',
                                stunned: 0
                            });
                        }
                    } else {
                        // Attack 3: Side Turrets (Spread)
                        for (let i = -2; i <= 2; i++) {
                            bullets.push({
                                x: boss.x + 20,
                                y: boss.y + boss.height - 20,
                                width: 15,
                                height: 15,
                                speed: -5,
                                color: '#f00',
                                isEnemy: true,
                                hp: 1,
                                vx: i * 2
                            });
                            bullets.push({
                                x: boss.x + boss.width - 20,
                                y: boss.y + boss.height - 20,
                                width: 15,
                                height: 15,
                                speed: -5,
                                color: '#f00',
                                isEnemy: true,
                                hp: 1,
                                vx: i * 2
                            });
                        }
                    }
                }

                // Passive fire
                if (frameCount % 30 === 0) {
                    bullets.push({
                        x: boss.x + boss.width / 2,
                        y: boss.y + boss.height,
                        width: 25,
                        height: 25,
                        speed: -7,
                        color: '#f00',
                        isEnemy: true,
                        hp: 1,
                        vx: 0
                    });
                }
            } else {
                // NORMAL BOSS ATTACKS
                const shootRate = boss.phase === 'angry' ? 25 : 45;
                if (frameCount % shootRate === 0) {
                    if (boss.phase === 'angry') {
                        bullets.push({ x: boss.x + boss.width / 2 - 10, y: boss.y + boss.height, width: 20, height: 20, speed: -8, color: '#f00', isEnemy: true, hp: 1, vx: -3 });
                        bullets.push({ x: boss.x + boss.width / 2 - 10, y: boss.y + boss.height, width: 20, height: 20, speed: -8, color: '#f00', isEnemy: true, hp: 1, vx: 0 });
                        bullets.push({ x: boss.x + boss.width / 2 - 10, y: boss.y + boss.height, width: 20, height: 20, speed: -8, color: '#f00', isEnemy: true, hp: 1, vx: 3 });
                    } else {
                        bullets.push({
                            x: boss.x + boss.width / 2 - 10,
                            y: boss.y + boss.height,
                            width: 20,
                            height: 20,
                            speed: -6, // down
                            color: '#f00',
                            isEnemy: true,
                            hp: 1,
                            vx: 0
                        });
                    }
                }
            }
        }

        // collision with player
        if (
            boss.x < player.x + player.width &&
            boss.x + boss.width > player.x &&
            boss.y < player.y + player.height &&
            boss.y + boss.height > player.y
        ) {
            if (player.invulnerableTime <= 0) {
                player.hp -= 2; // Boss deals 2 damage on touch
                player.invulnerableTime = 60;
                triggerShake(30);
                g_combo = 0;
                g_comboMultiplier = 1;
                updateComboUI();
                playSound('hit');
                updatePlayerStatusUI();
                if (player.hp <= 0) gameOver();
                createParticles(player.x + player.width / 2, player.y + player.height / 2, player.color);
            }
        }
    }

    // Update enemies
    enemies.forEach((enemy, eIndex) => {
        if (enemy.stunned > 0) {
            enemy.stunned--;
            // Sparkles while stunned
            if (frameCount % 10 === 0) {
                createParticles(enemy.x + Math.random() * enemy.width, enemy.y + Math.random() * enemy.height, '#0af', 'spark');
            }
        } else {
            if (enemy.type === 'DIVER') {
                if (enemy.state === 'DESCEND') {
                    enemy.y += enemy.speed;
                    // Move towards player X
                    if (player.x + player.width / 2 < enemy.x + enemy.width / 2) enemy.x -= enemy.speed * 0.5;
                    else enemy.x += enemy.speed * 0.5;

                    // Threshold to dive
                    if (player.y - enemy.y < 250) {
                        enemy.state = 'DIVE';
                        playSound('warning');
                    }
                } else {
                    // DIVE state
                    enemy.y += enemy.speed * 2.5;
                    // Pulse effect logic could be here (color change)
                }
            } else if (enemy.type === 'SNIPER') {
                if (enemy.state === 'DESCEND') {
                    enemy.y += enemy.speed;
                    if (enemy.y >= enemy.targetY) {
                        enemy.state = 'STATIONARY';
                    }
                } else {
                    // STATIONARY state - shoot at player
                    enemy.shootTimer--;
                    if (enemy.shootTimer <= 0) {
                        playSound('shoot');
                        // Aimed shot
                        const dx = (player.x + player.width / 2) - (enemy.x + enemy.width / 2);
                        const dy = (player.y + player.height / 2) - (enemy.y + enemy.height / 2);
                        const dist = Math.hypot(dx, dy);
                        const bSpeed = 6;

                        bullets.push({
                            x: enemy.x + enemy.width / 2,
                            y: enemy.y + enemy.height / 2,
                            width: 10,
                            height: 10,
                            speed: bSpeed,
                            color: '#f0f',
                            isEnemy: true,
                            hp: 1,
                            vx: (dx / dist) * bSpeed,
                            vy: (dy / dist) * bSpeed
                        });
                        enemy.shootTimer = 180; // Reset timer
                    }
                }
            } else if (enemy.type === 'SINE') {
                enemy.y += enemy.speed;
                enemy.x = enemy.startX + Math.sin(enemy.y / 30) * 80;
            } else if (enemy.type === 'METEOR') {
                enemy.y += enemy.speed;
                // Add flame particles
                if (frameCount % 2 === 0) {
                    createParticles(enemy.x + enemy.width / 2, enemy.y, '#ff4500', 'exhaust');
                }
            } else if (enemy.type === 'BEAMER') {
                if (enemy.state === 'MOVE' || enemy.state === 'DESCEND') {
                    enemy.y += enemy.speed;
                    if (enemy.y >= enemy.targetY) {
                        enemy.state = 'AIM';
                        enemy.beamTimer = 120; // 2s aim
                    }
                } else if (enemy.state === 'AIM') {
                    enemy.beamTimer--;
                    // Aim at player position at start of aim? Or continuous? Let's say it locks on during AIM.
                    enemy.targetX = player.x + player.width / 2;
                    enemy.targetY_Final = player.y + player.height / 2;
                    if (enemy.beamTimer <= 0) {
                        enemy.state = 'FIRE';
                        enemy.beamTimer = 60; // 1s fire
                        playSound('laser');
                    }
                } else if (enemy.state === 'FIRE') {
                    enemy.beamTimer--;
                    // Collision with laser beam
                    // For simplicity, laser is a line from enemy center to targetX/Y 
                    // Actually, let's make it a thick beam to bottom of screen for BEAMER.
                    if (player.x < enemy.x + enemy.width / 2 + 20 && player.x + player.width > enemy.x + enemy.width / 2 - 20) {
                        if (player.invulnerableTime <= 0) {
                            player.hp--;
                            player.invulnerableTime = 60;
                            playSound('hit');
                            triggerShake(15);
                            updatePlayerStatusUI();
                            if (player.hp <= 0) gameOver();
                        }
                    }
                    if (enemy.beamTimer <= 0) {
                        enemy.state = 'MOVE';
                        enemy.targetY = Math.min(canvas.height - 100, enemy.y + 100);
                        if (enemy.y > canvas.height * 0.7) enemy.y = -enemy.height; // Loop back or just die? Let's stay on screen.
                    }
                }
            } else if (enemy.type === 'GHOST') {
                enemy.y += enemy.speed;
                enemy.alpha += 0.01 * enemy.fadeDir;
                if (enemy.alpha <= 0.1) { enemy.alpha = 0.1; enemy.fadeDir = 1; }
                if (enemy.alpha >= 1.0) { enemy.alpha = 1.0; enemy.fadeDir = -1; }
            } else if (enemy.type === 'MINER') {
                enemy.x += enemy.speed * enemy.dir;
                enemy.y += enemy.speed * 0.2;
                if (enemy.x <= 0 || enemy.x + enemy.width >= canvas.width) enemy.dir *= -1;

                enemy.mineTimer--;
                if (enemy.mineTimer <= 0) {
                    mines.push({
                        x: enemy.x + enemy.width / 2,
                        y: enemy.y + enemy.height,
                        speed: 1,
                        size: 15,
                        color: '#f00'
                    });
                    enemy.mineTimer = 180;
                }
            } else {
                // NORMAL, TANK, ASTEROID, Fragment
                if (enemy.isFragment) {
                    enemy.x += (enemy.vx || 0);
                    enemy.y += (enemy.vy || 1) * enemy.speed;
                } else {
                    enemy.y += enemy.speed;
                }
            }

            // Screen bounds for fragments (can bounce or wrap, but let's just keep them within 100px of sides)
            if (enemy.isFragment) {
                if (enemy.x < 0 || enemy.x > canvas.width - enemy.width) {
                    enemy.vx *= -1;
                }
            }
        }

        // Check collision with player
        if (
            enemy.x < player.x + player.width &&
            enemy.x + enemy.width > player.x &&
            enemy.y < player.y + player.height &&
            enemy.y + enemy.height > player.y
        ) {
            if (player.invulnerableTime <= 0) {
                // Ghost invulnerability
                if (enemy.type === 'GHOST' && enemy.alpha < 0.4) {
                    // Do nothing, bullet passes through or ship passes through
                } else {
                    if (player.shield > 0) {
                        player.shield = 0;
                        player.invulnerableTime = 30; // Shorter invuln for shield pop
                        playSound('hit');
                        createParticles(player.x + player.width / 2, player.y + player.height / 2, '#0af', 'explosion');
                        triggerShake(15);
                    } else {
                        player.hp--;
                        player.invulnerableTime = 60;
                        playSound('hit');
                        triggerShake(20);
                    }
                    updatePlayerStatusUI();
                    createParticles(player.x + player.width / 2, player.y + player.height / 2, player.color);
                }

                enemies.splice(eIndex, 1);
                if (player.hp <= 0) gameOver();
                return;
            }
        }

        // Remove if off screen
        if (enemy.y > canvas.height) {
            enemies.splice(eIndex, 1);
            score -= 5; // Penalty for missing
            if (score < 0) score = 0;
            updateScoreUI();
            g_combo = 0;
            g_comboMultiplier = 1;
            updateComboUI();
        }
    });

    // Bullet Collisions
    bullets.forEach((bullet, bIndex) => {
        if (bullet.isEnemy) return;

        // Check Boss Hit
        if (boss &&
            bullet.x < boss.x + boss.width &&
            bullet.x + bullet.width > boss.x &&
            bullet.y < boss.y + boss.height &&
            bullet.y + bullet.height > boss.y
        ) {
            bullets.splice(bIndex, 1);
            boss.hp -= bullet.hp;
            playSound('boss_hit');
            updateBossUI();
            createParticles(bullet.x, bullet.y, '#fff');

            if (boss.hp <= 0 && !boss.isDying) {
                boss.isDying = true;
                boss.deathTimer = 120; // 2 seconds of cinematic explosions
                playSound('explosion'); // Initial blast
                triggerShake(45);
            }
        }
    });

    // Update Boss Dying Sequence
    if (boss && boss.isDying) {
        boss.deathTimer--;
        if (frameCount % 6 === 0) {
            const ex = boss.x + Math.random() * boss.width;
            const ey = boss.y + Math.random() * boss.height;
            createParticles(ex, ey, '#ff0', 'explosion');
            createParticles(ex, ey, '#f00', 'explosion');
            playSound('explosion'); // Rapid intermediate bursts
            triggerShake(10);
        }

        if (boss.deathTimer <= 0) {
            score += 500 * g_comboMultiplier;
            updateScoreUI();
            createParticles(boss.x + boss.width / 2, boss.y + boss.height / 2, '#f00', 'boss_explosion');
            createParticles(boss.x + boss.width / 2, boss.y + boss.height / 2, '#ff0', 'boss_explosion');
            createParticles(boss.x + boss.width / 2, boss.y + boss.height / 2, '#fff', 'explosion');
            triggerShake(80, 1);
            playSound('boss_explosion'); // Epic finale
            const isMothership = boss.type === 'MOTHERSHIP';
            boss = null;
            updateBossUI();
            g_waveActive = false;
            MusicManager.start('COMBAT');

            if (isMothership) {
                setTimeout(victory, 1000);
            } else {
                // Advance wave
                setTimeout(() => {
                    g_wave++;
                    saveGame();
                    const t = translations[g_lang];
                    showWaveUI(`${t.wave} ${g_wave}`);
                    setTimeout(() => {
                        g_enemiesToSpawn = calculateEnemiesForWave(g_wave);
                        g_enemiesSpawnedThisWave = 0;
                        g_waveActive = true;
                    }, 2000);
                }, 1500);
            }
        }
    }

    enemies.forEach((enemy, eIndex) => {
        bullets.forEach((bullet, bIndex) => {
            if (bullet.isEnemy) return;

            if (
                bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y
            ) {
                // Hit
                bullets.splice(bIndex, 1);
                
                // Explosive bullet area damage
                if (bullet.isExplosive) {
                    createParticles(bullet.x, bullet.y, '#ff6600', 'explosion');
                    triggerShake(8);
                    // Area damage to nearby enemies
                    enemies.forEach(nearby => {
                        if (nearby === enemy) return;
                        const dist = Math.hypot(nearby.x - enemy.x, nearby.y - enemy.y);
                        if (dist < 80) {
                            nearby.hp -= bullet.hp * 0.5;
                            createParticles(nearby.x + nearby.width/2, nearby.y + nearby.height/2, '#ff6600', 'spark');
                        }
                    });
                } else {
                    createParticles(bullet.x, bullet.y, '#fff', 'spark');
                }
                
                enemy.hp -= bullet.hp;

                if (enemy.hp <= 0) {
                    enemies.splice(eIndex, 1);
                    createParticles(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, enemy.color, 'explosion');
                    triggerShake(12);

                    // --- ASTEROID SPLITTING CORE ---
                    if (enemy.type === 'ASTEROID') {
                        playSound('asteroid_break'); // Deep, stony crumble
                        const fragments = 3;
                        for (let i = 0; i < fragments; i++) {
                            const fSize = enemy.width * 0.4;
                            const vx = (Math.random() - 0.5) * 4;
                            const vy = Math.random() * 2 + 1;

                            enemies.push({
                                x: enemy.x + enemy.width / 2 - fSize / 2,
                                y: enemy.y + enemy.height / 2 - fSize / 2,
                                width: fSize,
                                height: fSize,
                                speed: enemy.speed * 1.5,
                                vx: vx,
                                vy: vy,
                                color: '#777',
                                hp: Math.ceil(g_wave * 0.5) + 1,
                                maxHp: Math.ceil(g_wave * 0.5) + 1,
                                type: 'NORMAL', // Fragments behave as normal enemies
                                isFragment: true
                            });
                        }
                    } else {
                        playSound('explosion'); // Standard crunchy crunch
                    }
                    // ----------------------------

                    g_combo++;
                    if (g_combo % 5 === 0) playSound('combo');
                    g_comboMultiplier = Math.min(5, 1 + Math.floor(g_combo / 5));
                    updateComboUI();

                    score += 10 * g_comboMultiplier;
                    updateScoreUI();

                    // Balanced Drop Logic: 5% Laser, 5% Spread, 10% Shield, 10% Bomb, 10% Health (if needed), 20% Weapon
                    const gemRoll = Math.random();
                    if (gemRoll < 0.05) {
                        // Spread Power-up (Cyan)
                        gems.push({ x: enemy.x + enemy.width / 2, y: enemy.y + enemy.height / 2, size: 7, speed: 2.5, color: '#0ff', type: 'spread' });
                    } else if (gemRoll < 0.10) {
                        // Laser Power-up (Purple/Magenta)
                        gems.push({ x: enemy.x + enemy.width / 2, y: enemy.y + enemy.height / 2, size: 7, speed: 2.5, color: '#f0f', type: 'laser' });
                    } else if (gemRoll < 0.20) {
                        // Shield Gem (Blue Hexagon)
                        gems.push({ x: enemy.x + enemy.width / 2, y: enemy.y + enemy.height / 2, size: 8, speed: 2, color: '#0af', type: 'shield' });
                    } else if (gemRoll < 0.30) {
                        // Bomb Gem (Golden Sphere)
                        gems.push({ x: enemy.x + enemy.width / 2, y: enemy.y + enemy.height / 2, size: 8, speed: 2, color: '#ffd700', type: 'bomb' });
                    } else if (gemRoll < 0.40 && player.hp < player.maxHp) {
                        // Health Gem
                        gems.push({ x: enemy.x + enemy.width / 2, y: enemy.y + enemy.height / 2, size: 7, speed: 2, color: '#ff4757', type: 'health' });
                    } else if (gemRoll < 0.60) {
                        // Weapon Upgrade Gem
                        gems.push({ x: enemy.x + enemy.width / 2, y: enemy.y + enemy.height / 2, size: 6, speed: 2, color: '#fff', type: 'weapon' });
                    }
                }
            }
        });
    });


    // Update muzzle flashes
    for (let i = muzzleFlashes.length - 1; i >= 0; i--) {
        muzzleFlashes[i].life -= 0.15;
        if (muzzleFlashes[i].life <= 0) muzzleFlashes.splice(i, 1);
    }

    // Update gems
    gems.forEach((gem, index) => {
        gem.y += gem.speed;

        // Collision with player
        if (
            gem.x < player.x + player.width &&
            gem.x + gem.size > player.x &&
            gem.y < player.y + player.height &&
            gem.y + gem.size > player.y
        ) {
            score += 5; // Score for collecting any gem
            g_credits += 1; // Credits for the shop
            if (gem.type === 'health') {
                player.hp = Math.min(player.maxHp, player.hp + 1);
                playSound('powerup');
                createParticles(player.x + player.width / 2, player.y + player.height / 2, '#ff4757', 'explosion');
            } else if (gem.type === 'weapon') {
                player.gemsCollected++;
                if (player.gemsCollected >= player.weaponLevel * 4 && player.weaponLevel < 5) {
                    player.weaponLevel++;
                    player.gemsCollected = 0;
                    playSound('powerup');
                    createParticles(player.x + player.width / 2, player.y + player.height / 2, '#f0f', 'explosion');
                } else {
                    playSound('powerup');
                }
            } else if (gem.type === 'bomb') {
                g_bombs++;
                playSound('powerup');
                createParticles(player.x + player.width / 2, player.y + player.height / 2, '#ffd700', 'explosion');
            } else if (gem.type === 'shield') {
                player.shield = 1.0;
                playSound('powerup');
                createParticles(player.x + player.width / 2, player.y + player.height / 2, '#0af', 'explosion');
            } else if (gem.type === 'spread') {
                player.activePowerup = { type: 'SPREAD', timer: 600 };
                playSound('powerup');
                createParticles(player.x + player.width / 2, player.y + player.height / 2, '#0ff', 'explosion');
            } else if (gem.type === 'laser') {
                player.activePowerup = { type: 'LASER', timer: 600 };
                playSound('powerup');
                createParticles(player.x + player.width / 2, player.y + player.height / 2, '#f0f', 'explosion');
            }
            updatePlayerStatusUI();
            gems.splice(index, 1);
        } else if (gem.y > canvas.height) {
            gems.splice(index, 1);
        }
    });

    // Update powerups
    if (player.activePowerup) {
        player.activePowerup.timer--;
        if (player.activePowerup.timer <= 0) {
            player.activePowerup = null;
            updatePlayerStatusUI();
        }
    }

    updateScoreUI();

    // Update particles
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay || 0.02;
        
        if (p.size > 0) {
            p.size *= 0.98;
        }
        
        if (p.life <= 0 || p.size <= 0.1) particles.splice(i, 1);
    }

    frameCount++;

    // Check Wave progression
    if (g_waveActive && !boss && enemies.length === 0 && g_enemiesSpawnedThisWave >= g_enemiesToSpawn) {
        g_waveActive = false;

        const t = translations[g_lang];
        showWaveUI(t.waveComplete); // Show "DALGA TAMAMLANDI"

        setTimeout(() => {
            g_wave++;
            saveGame(); // SAVE THE GAME AT THE START OF NEW WAVE!
            openShop();
        }, 2000); // Wait 2sec (during/after UI show) before shop
    }
}

function startNextWaveReady() {
    const t = translations[g_lang];
    // Should we spawn a boss this wave? (e.g. Wave 3, 6, 9... and FINAL Wave 20)
    if (g_wave === 20 || g_wave % 3 === 0) {
        showWaveUI(t.warning, true);
        setTimeout(() => {
            spawnBoss();
            g_enemiesToSpawn = 1; // dummy value so normal enemies don't spawn
            g_enemiesSpawnedThisWave = 0;
            g_waveActive = true;
        }, 2000);
    } else {
        showWaveUI(`${t.wave} ${g_wave}`);
        setTimeout(() => {
            g_enemiesToSpawn = calculateEnemiesForWave(g_wave);
            g_enemiesSpawnedThisWave = 0;
            g_waveActive = true;
        }, 2000);
    }
}

function drawPlayer() {
    if (player.invulnerableTime > 0 && Math.floor(frameCount / 5) % 2 === 0) {
        return; // Blink effect
    }

    ctx.save();
    ctx.translate(player.x + player.width / 2, player.y + player.height / 2);

    // Core glow for the ship
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#0ff';

    if (imgPlayerV2.complete && imgPlayerV2.naturalWidth !== 0) {
        ctx.drawImage(imgPlayerV2, -player.width / 2 - 10, -player.height / 2 - 10, player.width + 20, player.height + 20);
    } else {
        ctx.fillStyle = player.color;
        // Draw a spaceship shape fallback
        ctx.beginPath();
        ctx.moveTo(0, -player.height / 2);
        ctx.lineTo(player.width / 2, player.height / 2);
        ctx.lineTo(0, player.height / 2 - 10);
        ctx.lineTo(-player.width / 2, player.height / 2);
        ctx.closePath();
        ctx.fill();
    }

    ctx.shadowBlur = 0;
    ctx.restore();

    // Draw Shield Bubble if active
    if (player.shield > 0) {
        ctx.save();
        ctx.translate(player.x + player.width / 2, player.y + player.height / 2);
        const pulse = 1 + Math.sin(frameCount * 0.1) * 0.05;
        const radius = (player.width + player.height) / 2 * 0.8 * pulse;

        const grad = ctx.createRadialGradient(0, 0, radius * 0.8, 0, 0, radius);
        grad.addColorStop(0, 'rgba(0, 160, 255, 0.1)');
        grad.addColorStop(0.8, 'rgba(0, 160, 255, 0.3)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0.6)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.fill();

        // Add some hexagonal pattern or lines to the shield
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.4)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const angle = Math.PI / 3 * i + frameCount * 0.02;
            ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
        }
        ctx.closePath();
        ctx.stroke();

        ctx.restore();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    updateStars();
    drawStars();

    updatePlanets();
    drawPlanets();

    if (gameState === 'PLAYING') {
        drawPlayer();

        // Draw EMP Rings
        empRings.forEach(ring => {
            ctx.save();
            ctx.beginPath();
            ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
            ctx.lineWidth = 15 * ring.life;
            ctx.strokeStyle = `rgba(0, 170, 255, ${ring.life})`;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(ring.x, ring.y, ring.radius * 0.9, 0, Math.PI * 2);
            ctx.lineWidth = 5 * ring.life;
            ctx.strokeStyle = `rgba(255, 255, 255, ${ring.life})`;
            ctx.stroke();
            ctx.restore();
        });

        // Draw Solar Flares
        if (hazardState.type === 'SOLAR_FLARE' || hazardState.flares.length > 0) {
            hazardState.flares.forEach(flare => {
                if (flare.warningTime > 0) {
                    // Draw Warning Line
                    ctx.save();
                    ctx.strokeStyle = `rgba(255, 100, 0, ${0.3 + Math.sin(frameCount * 0.2) * 0.2})`;
                    ctx.lineWidth = 2;
                    ctx.setLineDash([10, 5]);
                    ctx.beginPath();
                    if (flare.isVertical) {
                        ctx.moveTo(flare.pos, 0);
                        ctx.lineTo(flare.pos, canvas.height);
                    } else {
                        ctx.moveTo(0, flare.pos);
                        ctx.lineTo(canvas.width, flare.pos);
                    }
                    ctx.stroke();
                    ctx.restore();
                } else if (flare.activeTime > 0) {
                    // Draw Active Flare
                    ctx.save();
                    const grad = flare.isVertical ?
                        ctx.createLinearGradient(flare.pos - flare.width / 2, 0, flare.pos + flare.width / 2, 0) :
                        ctx.createLinearGradient(0, flare.pos - flare.width / 2, 0, flare.pos + flare.width / 2);

                    const flicker = Math.random() * 0.2 + 0.8;
                    grad.addColorStop(0, 'rgba(255, 50, 0, 0)');
                    grad.addColorStop(0.5, `rgba(255, 200, 0, ${0.8 * flicker})`);
                    grad.addColorStop(1, 'rgba(255, 50, 0, 0)');

                    ctx.fillStyle = grad;
                    ctx.shadowBlur = 30;
                    ctx.shadowColor = '#ff4500';

                    if (flare.isVertical) {
                        ctx.fillRect(flare.pos - flare.width / 2, 0, flare.width, canvas.height);
                    } else {
                        ctx.fillRect(0, flare.pos - flare.width / 2, canvas.width, flare.width);
                    }
                    ctx.restore();
                }
            });
        }

        // Draw Black Hole
        if (hazardState.type === 'BLACK_HOLE') {
            ctx.save();
            ctx.translate(hazardState.x, hazardState.y);

            // Outer swirling ring
            ctx.rotate(frameCount * 0.05);
            const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, 80);
            grad.addColorStop(0, '#000');
            grad.addColorStop(0.5, '#202');
            grad.addColorStop(0.8, '#50a');
            grad.addColorStop(1, 'rgba(80, 0, 160, 0)');

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(0, 0, 100, 0, Math.PI * 2);
            ctx.fill();

            // Core
            ctx.fillStyle = '#000';
            ctx.shadowBlur = 20;
            ctx.shadowColor = '#50a';
            ctx.beginPath();
            ctx.arc(0, 0, 40, 0, Math.PI * 2);
            ctx.fill();

            // Accretion disk particles (simulated)
            for (let i = 0; i < 8; i++) {
                ctx.rotate(Math.PI / 4);
                ctx.strokeStyle = `rgba(255, 255, 255, ${Math.random() * 0.5})`;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(0, 0, 45 + Math.random() * 30, 0, Math.PI * 0.5);
                ctx.stroke();
            }
            ctx.restore();
        }

        // Draw Boss
        if (boss) {
            // Draw Epic Boss Aura rings
            ctx.save();
            ctx.translate(boss.x + boss.width / 2, boss.y + boss.height / 2);

            // Outer Ring
            ctx.rotate(frameCount * 0.05);
            ctx.strokeStyle = boss.phase === 'angry' ? 'rgba(255, 100, 0, 0.5)' : 'rgba(255, 0, 0, 0.4)';
            ctx.lineWidth = 4;
            ctx.setLineDash([15, 10, 5, 10]);
            ctx.beginPath();
            ctx.arc(0, 0, boss.width * 0.6, 0, Math.PI * 2);
            ctx.stroke();

            // Inner Ring
            ctx.rotate(-frameCount * 0.08);
            ctx.strokeStyle = boss.phase === 'angry' ? 'rgba(255, 200, 0, 0.6)' : 'rgba(255, 50, 50, 0.6)';
            ctx.lineWidth = 2;
            ctx.setLineDash([30, 15]);
            ctx.beginPath();
            ctx.arc(0, 0, boss.width * 0.45, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();

            // Draw Boss Ship
            let activeBossImg = imgBoss1;
            let displayWidth = 200;
            let displayHeight = 100;

            if (boss.type === 'MOTHERSHIP') {
                activeBossImg = imgMothership;
                displayWidth = 400;
                displayHeight = 200;
            } else {
                if (boss.tier === 2) activeBossImg = imgBoss2;
                else if (boss.tier >= 3) activeBossImg = imgBoss3;
            }

            if (activeBossImg.complete && activeBossImg.naturalWidth !== 0) {
                ctx.save();
                ctx.translate(boss.x + boss.width / 2, boss.y + boss.height / 2);

                if (boss.phase === 'desperation') {
                    ctx.filter = `hue-rotate(${frameCount * 5}deg) drop-shadow(0 0 30px #f0f) saturate(3)`;
                } else if (boss.phase === 'angry') {
                    ctx.filter = 'hue-rotate(140deg) drop-shadow(0 0 20px #f00) saturate(2)'; // Make red orange/yellowish + glow
                } else {
                    ctx.filter = boss.type === 'MOTHERSHIP' ? 'drop-shadow(0 0 20px #f0f)' : 'drop-shadow(0 0 15px rgba(255,0,0,0.8))';
                }

                ctx.drawImage(activeBossImg, -displayWidth / 2, -displayHeight / 2, displayWidth, displayHeight);

                ctx.filter = 'none';
                ctx.restore();
            } else {
                ctx.fillStyle = boss.color;
                ctx.shadowBlur = 20;
                ctx.shadowColor = boss.color;
                ctx.fillRect(boss.x, boss.y, boss.width, boss.height);
                ctx.shadowBlur = 0;
            }
        }

        // Draw bullets
        bullets.forEach(bullet => {
            ctx.fillStyle = bullet.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = bullet.color;
            ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
            ctx.shadowBlur = 0;
        });

        // Draw Mines
        mines.forEach(mine => {
            ctx.save();
            ctx.translate(mine.x, mine.y);
            // Draw a red glowing sphere
            const pulse = 1 + Math.sin(frameCount * 0.1) * 0.2;
            const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, mine.size * pulse);
            grad.addColorStop(0, '#fff');
            grad.addColorStop(0.4, '#f00');
            grad.addColorStop(1, '#600');

            ctx.fillStyle = grad;
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#f00';
            ctx.beginPath();
            ctx.arc(0, 0, mine.size * pulse, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });

        // Draw enemies (Beautiful Vector Replacements)
        enemies.forEach(enemy => {
            if (enemy.type === 'GHOST') {
                ctx.save();
                ctx.globalAlpha = enemy.alpha;
            }

            // Draw Beamer Laser
            if (enemy.type === 'BEAMER') {
                if (enemy.state === 'AIM') {
                    ctx.save();
                    ctx.strokeStyle = 'rgba(255, 207, 0, 0.4)';
                    ctx.lineWidth = 1;
                    ctx.setLineDash([5, 5]);
                    ctx.beginPath();
                    ctx.moveTo(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2);
                    ctx.lineTo(enemy.x + enemy.width / 2, canvas.height); // Vertical beam for now as per logic
                    ctx.stroke();
                    ctx.restore();
                } else if (enemy.state === 'FIRE') {
                    ctx.save();
                    const grad = ctx.createLinearGradient(enemy.x + enemy.width / 2 - 20, 0, enemy.x + enemy.width / 2 + 20, 0);
                    grad.addColorStop(0, 'rgba(255, 207, 0, 0)');
                    grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.9)');
                    grad.addColorStop(1, 'rgba(255, 207, 0, 0)');

                    ctx.fillStyle = grad;
                    ctx.shadowBlur = 20;
                    ctx.shadowColor = '#ffcf00';
                    ctx.fillRect(enemy.x + enemy.width / 2 - 20, enemy.y + enemy.height / 2, 40, canvas.height);
                    ctx.restore();
                }
            }

            ctx.save();
            ctx.translate(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2);

            // Add dynamic tilt for Kamikaze/Sine based on x-movement
            let tilt = 0;
            if (enemy.type === 'DIVER') {
                if (player.x < enemy.x) tilt = -0.15;
                if (player.x > enemy.x) tilt = 0.15;
            } else if (enemy.type === 'SINE') {
                tilt = Math.cos(enemy.y / 30) * 0.2; // matches sine movement
            }
            ctx.rotate(tilt);

            ctx.shadowBlur = 15;
            ctx.shadowColor = enemy.color;

            let imgToDraw = imgNormal;
            if (enemy.type === 'DIVER') {
                imgToDraw = imgDiver;
                if (enemy.state === 'DIVE') {
                    // Fast pulsing red
                    ctx.shadowBlur = 25;
                    if (Math.floor(frameCount / 3) % 2 === 0) ctx.shadowColor = '#fff';
                }
            } else if (enemy.type === 'SNIPER') imgToDraw = imgSniper;
            else if (enemy.type === 'SINE') imgToDraw = imgSine;
            else if (enemy.type === 'TANK') imgToDraw = imgTank;
            else if (enemy.type === 'BEAMER') {
                imgToDraw = imgSniper; // Use sniper as base for Beamer
                ctx.filter = 'hue-rotate(60deg) saturate(2)'; // Yellowish
            } else if (enemy.type === 'GHOST') {
                imgToDraw = imgSine; // Use sine as base for Ghost
                ctx.filter = 'invert(1) opacity(0.7)'; // Transparent look
            } else if (enemy.type === 'MINER') {
                imgToDraw = imgTank; // Use tank as base for Miner
                ctx.filter = 'hue-rotate(30deg) brightness(1.2)';
            } else if (enemy.type === 'ASTEROID' || enemy.type === 'METEOR') {
                imgToDraw = imgAsteroid;
                ctx.rotate(enemy.y * 0.02); // Asteroids rotate slow
            }

            if (imgToDraw.complete && imgToDraw.naturalWidth !== 0) {
                ctx.drawImage(imgToDraw, -enemy.width * 0.7, -enemy.height * 0.7, enemy.width * 1.4, enemy.height * 1.4);
            }

            ctx.shadowBlur = 0;
            ctx.restore();

            if (enemy.type === 'GHOST') {
                ctx.restore(); // Restore alpha for HUD/Other elements
            }

            // Draw Health Bar
            const barWidth = 30;
            const barHeight = 4;
            const barX = enemy.x + (enemy.width - barWidth) / 2;
            const barY = enemy.y - 10;
            const hpRatio = enemy.hp / enemy.maxHp;

            ctx.fillStyle = 'red';
            ctx.fillRect(barX, barY, barWidth, barHeight);
            ctx.fillStyle = '#0f0';
            ctx.fillRect(barX, barY, barWidth * hpRatio, barHeight);
        });

        // Draw gems (Rotating Crystal / Health Heart)
        gems.forEach(gem => {
            ctx.save();
            ctx.translate(gem.x, gem.y);
            ctx.rotate(frameCount * 0.04);
            const scale = 1 + Math.sin(frameCount * 0.1) * 0.1;
            ctx.scale(scale, scale);

            ctx.shadowBlur = 15;
            ctx.shadowColor = gem.color;

            if (gem.type === 'health') {
                // Draw heart shape
                const s = gem.size * 1.4;
                ctx.fillStyle = gem.color;
                ctx.beginPath();
                ctx.moveTo(0, s * 0.3);
                ctx.bezierCurveTo(s * 0.6, -s * 0.6, s * 1.2, s * 0.1, 0, s);
                ctx.bezierCurveTo(-s * 1.2, s * 0.1, -s * 0.6, -s * 0.6, 0, s * 0.3);
                ctx.closePath();
                ctx.fill();

                // Inner shine
                ctx.fillStyle = 'rgba(255,255,255,0.5)';
                ctx.beginPath();
                ctx.ellipse(-s * 0.2, -s * 0.1, s * 0.25, s * 0.15, -0.5, 0, Math.PI * 2);
                ctx.fill();
            } else if (gem.type === 'shield') {
                // Draw Shield Gem (Blue Hexagon with 'S')
                ctx.shadowBlur = 15;
                ctx.shadowColor = '#0af';
                ctx.fillStyle = '#0af';
                const s = gem.size * 1.5;
                ctx.beginPath();
                for (let i = 0; i < 6; i++) {
                    const angle = (Math.PI / 3) * i;
                    ctx.lineTo(Math.cos(angle) * s, Math.sin(angle) * s);
                }
                ctx.closePath();
                ctx.fill();
                ctx.fillStyle = '#fff';
                ctx.font = `bold ${gem.size}px Arial`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('S', 0, 0);
            } else if (gem.type === 'spread' || gem.type === 'laser') {
                // Draw Powerup Gems (Square/Diamond with 'W' or 'L')
                const isSpread = gem.type === 'spread';
                ctx.shadowBlur = 15;
                ctx.shadowColor = gem.color;
                ctx.fillStyle = gem.color;
                const s = gem.size * 1.4;
                if (isSpread) {
                    ctx.fillRect(-s, -s, s * 2, s * 2);
                } else {
                    ctx.beginPath();
                    ctx.moveTo(0, -s);
                    ctx.lineTo(s, 0);
                    ctx.lineTo(0, s);
                    ctx.lineTo(-s, 0);
                    ctx.closePath();
                    ctx.fill();
                }
                ctx.fillStyle = '#000';
                ctx.font = `bold ${gem.size}px Arial`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(isSpread ? 'W' : 'L', 0, 0);
            } else if (gem.type === 'bomb') {
                // Draw Bomb Gem (Golden Sphere with 'B')
                ctx.shadowBlur = 20;
                ctx.shadowColor = '#ffd700';

                const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, gem.size * 1.5);
                grad.addColorStop(0, '#fff');
                grad.addColorStop(0.4, '#ffd700');
                grad.addColorStop(1, '#b8860b');
                ctx.fillStyle = grad;

                ctx.beginPath();
                ctx.arc(0, 0, gem.size * 1.5, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#000';
                ctx.font = `bold ${gem.size * 1.5}px Arial`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('B', 0, 0);
            } else {
                // Diamond / weapon gem
                ctx.beginPath();
                ctx.moveTo(0, -gem.size * 1.5);
                ctx.lineTo(gem.size, 0);
                ctx.lineTo(0, gem.size * 1.5);
                ctx.lineTo(-gem.size, 0);
                ctx.closePath();

                const grad = ctx.createLinearGradient(-gem.size, -gem.size, gem.size, gem.size);
                grad.addColorStop(0, '#fff');
                grad.addColorStop(0.5, '#0ff');
                grad.addColorStop(1, '#0055ff');
                ctx.fillStyle = grad;
                ctx.fill();
            }

            ctx.shadowBlur = 0;
            ctx.restore();
        });

        // Update particles
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life -= p.decay || 0.02;
            if (p.life <= 0) particles.splice(i, 1);
        }

        // Draw particles
        particles.forEach(p => {
            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.globalAlpha = 1.0;

        // Draw Muzzle Flashes
        muzzleFlashes.forEach(f => {
            ctx.save();
            ctx.globalAlpha = f.life;
            ctx.fillStyle = f.color;
            ctx.shadowBlur = f.size * 2;
            ctx.shadowColor = f.color;
            ctx.beginPath();
            ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });
    }

    // Pause Overlay
    if (window.isPausedGlobal) {
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset any translation/rotation
        ctx.globalAlpha = 1.0; // Ensure visible

        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#fff';
        ctx.font = 'italic bold 60px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Add a pulsing effect to "PAUSED" text
        const pulse = 1 + Math.sin(Date.now() * 0.005) * 0.05;
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.scale(pulse, pulse);

        const t = translations[g_lang];
        ctx.shadowBlur = 30;
        ctx.shadowColor = '#f00'; // Change glow to red for extra visibility
        ctx.fillText(t.pausedText, 0, 0);

        ctx.font = '24px Arial';
        ctx.shadowBlur = 0;
        ctx.fillText(t.resumeHint, 0, 70);
        ctx.restore();
    }
}

function loop() {
    if (!window.isPausedGlobal) {
        update();
    }
    draw();
    requestAnimationFrame(loop);
}

// Simplified Error Reporting to avoid DOM overhead
window.onerror = function (msg, url, line) {
    console.error('Game Error:', msg, 'at line', line);
    return false;
};

// Initial setup
try {
    const startupData = localStorage.getItem('spaceShooterSave');
    if (startupData) {
        const data = JSON.parse(startupData);
        if (data.lang) g_lang = data.lang;
        if (data.hasOwnProperty('music')) g_musicEnabled = data.music;
        if (data.hasOwnProperty('sounds')) g_soundsEnabled = data.sounds;
        if (data.hasOwnProperty('musicVol')) g_musicVolume = data.musicVol;
        if (data.hasOwnProperty('soundsVol')) g_soundsVolume = data.soundsVol;
    }
} catch (e) {
    console.warn('Failed to parse startup data:', e);
}

updateLanguageUI();
updateMusicUI();
updateSoundsUI();
updateScoreUI();

initStars();
loop();

