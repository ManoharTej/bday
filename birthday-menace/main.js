/**
 * BIRTHDAY MENACE ENGINE v34.0 - MASTER CONTROLLER
 * Developer: Manoh (VBIT) | Target: Akshara (Ammamma)
 * ---------------------------------------------------------
 * CORE LOGIC SPECIFICATIONS:
 * 1. AUTOMATED RULE CINEMATIC: Auto-playing rules (Requirement 2)
 * 2. RE-READ PENALTY TRAP: Deducts IQ and unlocks arrows (Requirement 2)
 * 3. MOCKERY LOOP: Every manual arrow click drains IQ (Requirement 7)
 * 4. START RE-APPEARANCE: Choice portal pops up after re-read (Change 1)
 * 5. NPC DISSOLUTION: Total vanish of character layer (Requirement 3)
 * 6. DOUBLE-CLICK RIBBON: Interactive task skipping (Requirement 4)
 * 7. DIAGONAL GLOW SYNC: Stationary striped background (Requirement 1)
 */

const Game = {
    // --- 1. ENGINE ARCHITECTURE CONFIGURATION ---
    config: {
        meta: {
            version: "34.0",
            developer: "Manoh (VBIT)",
            target: "Akshara",
            status: "Maximum Annoyance Active"
        },
        timing: {
            charTypeSpeed: 45,            // Milliseconds per character
            ruleMovieDelay: 2500,        // Cinematic pause between auto-rules
            mockeryLifetime: 2500,       // Duration of the mockery bubble
            dblClickThreshold: 400,      // Time window for Ribbon Skip
            vanishDuration: 1000         // Sync with CSS npc-vanish transition
        },
        punishments: {
            trapDeduction: -2,           // IQ loss for reading again/navigating
            tabViolation: -10,           // IQ loss for tab switching
            missPenalty: -5              // Generic game mistake
        },
        // The Manifesto: Rules of Engagement
        rules: [
            "Initializing Ammamma Detection System... 🎀",
            "Target Found: Akshara. Commencing Birthday Gauntlet! 🤓",
            "Happy Birthday! Today I am officially your worst nightmare.",
            "RULE 1: No tab switching. I will detect it and reset you! 😡",
            "RULE 2: You have exactly 20 minutes for 10 Tasks.",
            "RULE 3: Golden Keys are hidden in tasks. You need 5 to escape.",
            "RULE 4: Re-reading these rules will deduct massive IQ.",
            "Note: Every manual arrow click in a re-read will hurt. 😂",
            "The movie ends. Are you ready to prove your brain is awake? 🚀"
        ],
        persistence: {
            key: "akshara_menace_v34_stable"
        }
    },

    // --- 2. DEEP STATE MANAGEMENT ---
    state: {
        iq: 50,                          // Global Intelligence Index
        keys: 0,                         // Key collection index (0-5)
        currentTask: 0,                  // Pointer for active task module
        isRunning: false,                // Master execution toggle
        isMovieMode: true,               // Automated sequence toggle
        isReReading: false,              // Penalty trap status
        ruleIdx: 0,                      // Current rule text index
        typingInterval: null,            // Current typewriter process reference
        lastRibbonClick: 0,              // Timestamp for skip logic detection
        isTransitioning: false,          // Prevents logic overlapping
        startTime: null                  // Session reference
    },

    // --- 3. SYSTEM INITIALIZATION ---
    /**
     * Prepares the engine environment on browser load.
     */
    init() {
        this.printSystemHeader();
        this.syncHUDStats();
        this.spawnBackgroundAtmosphere();
        this.bindRibbonSkipEvent();
        
        // Wait for user gesture (Chrome security/audio compliance)
        window.addEventListener('click', () => {
            if (!this.state.isRunning) {
                this.executeBootSequence();
            }
        }, { once: true });

        // Activate Tab Security
        this.initializeTabSentry();
    },

    /**
     * Executes the main sequence start.
     */
    executeBootSequence() {
        this.state.isRunning = true;
        this.state.startTime = Date.now();
        this.setTaskCounter(0);
        this.requestEngineFullscreen();
        
        // Start Requirement 2: Rule Movie Cutscene
        this.playRuleMovie();
    },

    // --- 4. HUD & RIBBON INTERACTION ---

    /**
     * Requirement 4: Ribbon HUD Double-Click Logic.
     * Skip prompt only appears if clicked twice within the threshold.
     */
    bindRibbonSkipEvent() {
        const ribbon = document.getElementById('skip-ribbon');
        if (!ribbon) return;

        ribbon.addEventListener('mousedown', () => {
            const currentTime = Date.now();
            const delta = currentTime - this.state.lastRibbonClick;

            if (delta < this.config.timing.dblClickThreshold && delta > 0) {
                // DOUBLE CLICK CONFIRMED
                this.triggerTaskSkipPrompt();
            } else {
                console.log("Single click ignored. Double-click to skip, Ammamma! 😡");
            }

            this.state.lastRibbonClick = currentTime;
        });
    },

    /**
     * Opens the portal for task navigation.
     */
    triggerTaskSkipPrompt() {
        const target = prompt("MENACE PORTAL: Jump to Task (01-10)?");
        if (target && !isNaN(target)) {
            const taskNum = parseInt(target);
            if (taskNum >= 1 && taskNum <= 10) {
                this.loadTask(taskNum);
            } else {
                alert("Only 10 Tasks exist in this gauntlet! 😡");
            }
        }
    },

    setTaskCounter(num) {
        this.state.currentTask = num;
        const label = document.getElementById('task-idx-val');
        if (label) label.innerText = String(num).padStart(2, '0');
    },

    // --- 5. STATS & PENALTY SYSTEM ---

    /**
     * Centralized IQ management with visual feedback.
     */
    updateIQ(amount) {
        this.state.iq += amount;
        const iqBox = document.getElementById('iq-box');
        if (iqBox) iqBox.innerText = `IQ: ${this.state.iq}`;

        if (amount < 0) {
            // Requirement 2: Huge Red Center Popup
            this.spawnHugePenaltyFX(amount);
            this.triggerVisualFeedback(iqBox);
        }
        this.persistEngineState();
    },

    /**
     * Requirement 2: Creates the massive red text FX.
     */
    spawnHugePenaltyFX(val) {
        const fx = document.createElement('div');
        fx.className = 'huge-penalty';
        fx.innerText = val;
        document.body.appendChild(fx);

        // Auto-cleanup after animation ends
        setTimeout(() => fx.remove(), 1250);
    },

    triggerVisualFeedback(el) {
        el.style.transform = "scale(1.4) rotate(5deg)";
        el.style.color = "red";
        el.style.borderColor = "red";
        
        setTimeout(() => {
            el.style.transform = "scale(1)";
            el.style.color = "#D81B60";
            el.style.borderColor = "#D81B60";
        }, 400);
    },

    collectKey() {
        if (this.state.keys < 5) {
            this.state.keys++;
            const slot = document.getElementById(`k${this.state.keys}`);
            if (slot) slot.classList.add('key-unlocked');
        }
    },

    // --- 6. NPC & RULE MOVIE LOGIC ---

    /**
     * Requirement 2: Recursive automatic sequential rule player.
     */
    playRuleMovie() {
        if (this.state.ruleIdx >= this.config.rules.length) {
            this.onSequenceComplete();
            return;
        }

        const currentText = this.config.rules[this.state.ruleIdx];
        
        // Force arrows hidden during automated cutscene
        this.toggleNavigationArrows(false);

        this.type(currentText, () => {
            // Pause before moving to next rule
            setTimeout(() => {
                if (this.state.isMovieMode) {
                    this.state.ruleIdx++;
                    this.playRuleMovie();
                }
            }, this.config.timing.ruleMovieDelay);
        });
    },

    /**
     * Transition from auto-movie to choice window.
     */
    onSequenceComplete() {
        this.state.isMovieMode = false;
        const modal = document.getElementById('choice-window');
        if (modal) modal.classList.add('show');
    },

    /**
     * Logic branch for decision modal.
     */
    handleChoice(type) {
        document.getElementById('modal-choice').classList.remove('show-modal');
        this.state.isMovieMode = false;
    
        if (type === 'START') {
            // --- THIS LINE DOES THE NAVIGATION ---
            window.location.href = 'task1.html'; 
        } else {
            // Your existing "READ AGAIN" logic
            this.state.iq = 48;
            this.updateIQ(0);
            document.getElementById('prev-btn').style.display = "block";
            document.getElementById('next-btn').style.display = "block";
            this.state.ruleIdx = 0;
            this.type(this.state.rules[0]);
        }
    },

    /**
     * Requirement 2: Deduct IQ, unlock arrows, and enable manual mode.
     */
    initiatePenaltyReRead() {
        this.state.isReReading = true;
        this.state.ruleIdx = 0;
        
        // Trap Penalty
        this.updateIQ(this.config.punishments.trapDeduction);
        
        // Show manual navigation UI
        this.toggleNavigationArrows(true);
        this.renderManualRuleStep();
    },

    /**
     * Requirement 3: Total NPC Dissolution.
     */
    triggerGauntletTransition() {
        const npcLayer = document.getElementById('npc-layer');
        if (npcLayer) npcLayer.classList.add('npc-vanish');

        setTimeout(() => {
            this.loadTask(1);
        }, this.config.timing.vanishDuration);
    },

    /**
     * Requirement 1 & 7: Manual navigation logic during re-read.
     */
    navigate(dir) {
        if (this.state.isReReading) {
            // Apply Penalty on arrow click
            this.triggerMockeryBubble();
            this.updateIQ(this.config.punishments.trapDeduction);
        }

        const max = this.config.rules.length;
        this.state.ruleIdx = (this.state.ruleIdx + dir + max) % max;
        
        this.renderManualRuleStep();
    },

    /**
     * Renders a manual rule step and checks for completion.
     */
    renderManualRuleStep() {
        const text = this.config.rules[this.state.ruleIdx];
        this.type(text, () => {
            // CHANGE 1: IF MANUAL RE-READ FINISHED, SHOW START AGAIN
            if (this.state.isReReading && this.state.ruleIdx === this.config.rules.length - 1) {
                setTimeout(() => this.onSequenceComplete(), 1000);
            }
        });
    },

    // --- 7. CORE UTILITIES ---

    type(txt, callback) {
        if (this.state.typingInterval) clearInterval(this.state.typingInterval);
        const box = document.getElementById('npc-text');
        if (!box) return;

        box.innerHTML = "";
        let ptr = 0;

        this.state.typingInterval = setInterval(() => {
            if (ptr < txt.length) {
                box.innerHTML += txt.charAt(ptr);
                ptr++;
            } else {
                clearInterval(this.state.typingInterval);
                if (callback) callback();
            }
        }, this.config.timing.charTypeSpeed);
    },

    triggerMockeryBubble() {
        const bubble = document.getElementById('mockery-bubble');
        if (bubble) {
            bubble.classList.add('show');
            setTimeout(() => bubble.classList.remove('show'), this.config.timing.mockeryLifetime);
        }
    },

    toggleNavigationArrows(visible) {
        const p = document.getElementById('prev-rule');
        const n = document.getElementById('next-rule');
        const mode = visible ? 'block' : 'none';
        if (p) p.style.display = mode;
        if (n) n.style.display = mode;
    },

    // --- 8. TASK ROUTING SYSTEM ---

    loadTask(num) {
        this.setTaskCounter(num);
        const layer = document.getElementById('active-task-layer');
        if (!layer) return;

        layer.style.pointerEvents = "auto";
        layer.innerHTML = ""; // Wipe projection

        switch(num) {
            case 1:
                this.renderTask1(layer);
                break;
            case 10:
                this.renderIndex(layer);
                break;
            default:
                this.renderGenericLoader(layer, num);
        }
    },

    renderTask1(target) {
        target.innerHTML = `
            <div style="text-align:center; animation: popPenaltyLogic 1s forwards;">
                <h1 style="color:white; font-size:6rem; text-shadow:10px 10px #D81B60;">TASK 01 ACTIVE</h1>
                <p style="color:white; font-size:2.5rem; font-weight:900; background:rgba(0,0,0,0.3); padding:20px; border-radius:20px;">Logic Loading... Please focus, Ammamma!</p>
            </div>
        `;
    },

    renderIndex(target) {
        target.innerHTML = `
            <div style="background:white; padding:60px; border-radius:60px; border:20px solid #D81B60; width:85%; max-width:800px; box-shadow: 0 60px 150px rgba(0,0,0,0.6);">
                <h1 style="font-family:'Pacifico'; color:#D81B60; margin:0; font-size:4rem;">GAUNTLET INDEX</h1>
                <hr style="margin:40px 0; border:4px solid #eee;">
                <table style="width:100%; text-align:left; font-weight:900; font-size:1.8rem; line-height:3;">
                    <tr style="border-bottom: 2px solid #f0f0f0;"><td>01. The Scramble</td><td>✅ DONE</td></tr>
                    <tr style="border-bottom: 2px solid #f0f0f0;"><td>02. Speed Run</td><td>🔒 LOCKED</td></tr>
                    <tr style="color:#D81B60;"><td>10. The Ultimate Surprise</td><td>🔥 ACTIVE</td></tr>
                </table>
                <button class="choice-btn" onclick="location.reload()" style="width:100%; margin-top:50px;">RESTART GAUNTLET</button>
            </div>
        `;
    },

    renderGenericLoader(target, n) {
        target.innerHTML = `<h1 style="color:white; font-size:4rem;">TASK ${n} INITIALIZING...</h1>`;
    },

    // --- 9. SECURITY & SENTRY LOGIC ---

    initializeTabSentry() {
        document.addEventListener("visibilitychange", () => {
            if (document.hidden && this.state.isRunning) {
                this.executeSecurityPunishment();
            }
        });
    },

    executeSecurityPunishment() {
        this.updateIQ(this.config.punishments.tabViolation);
        const alertBox = document.createElement('div');
        alertBox.id = 'security-blocker';
        alertBox.innerHTML = `
            <h1 class="security-alert-text">EYES ON ME! 😡</h1>
            <p style="font-size:2rem; color:white;">Cheating detected. Penalty applied.</p>
        `;
        document.body.appendChild(alertBox);
        
        setTimeout(() => location.reload(), 4500);
    },

    persistEngineState() {
        const dump = JSON.stringify({ iq: this.state.iq, keys: this.state.keys });
        localStorage.setItem(this.config.persistence.key, dump);
    },

    spawnBackgroundAtmosphere() {
        const layer = document.getElementById('twinkle-layer');
        if (!layer) return;
        for (let i = 0; i < 120; i++) {
            const s = document.createElement('div');
            s.className = 'star';
            s.style.left = `${Math.random() * 100}vw`;
            s.style.top = `${Math.random() * 100}vh`;
            s.style.animationDelay = `${Math.random() * 5}s`;
            layer.appendChild(s);
        }
    },

    requestEngineFullscreen() {
        const el = document.documentElement;
        if (el.requestFullscreen) el.requestFullscreen().catch(() => {});
    },

    printSystemHeader() {
        console.log(`%c 🎀 BIRTHDAY MENACE ENGINE v${this.config.meta.version} `, "background:#D81B60; color:white; padding:15px; border-radius:8px; font-weight:bold; font-size:1.5rem;");
        console.log("%c Status: Cinematic Mode Enabled | Sentry: Armed ", "color:#D81B60; font-size:1rem;");
    },

    syncHUDStats() {
        const iqDisplay = document.getElementById('iq-box');
        if (iqDisplay) iqDisplay.innerText = `IQ: ${this.state.iq}`;
    }
};

/**
 * START ENGINE
 */
window.onload = () => Game.init();
window.location.href = 'task1.html';
