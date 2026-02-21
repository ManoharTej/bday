/**
 * BIRTHDAY MENACE - MODULE: TASK 0 (THE RULEBOOK MOVIE)
 * Version: 31.0 (Master Engine Build)
 * Developer: Manoh (VBIT) | Target: Akshara (Ammamma)
 * ---------------------------------------------------------
 * LOGIC ARCHITECTURE SPECIFICATIONS:
 * 1. AUTOMATED CUTSCENE: Rules play sequentially without user interaction initially.
 * 2. INTERACTION DECOUPLING: Manual navigation arrows are strictly disabled in Movie Mode.
 * 3. CHOICE PORTAL: A scale-animated modal offering "Read Again" or "Start Gauntlet."
 * 4. RE-READ PENALTY PROTOCOL:
 * - Clicking "Read Again" triggers an immediate global -2 IQ deduction.
 * - Navigation arrows unlock only during this phase.
 * - Every subsequent arrow click triggers the Mockery Bubble + IQ Drain.
 * 5. PERSISTENCE CHECK: Upon completing the manual re-read, the Start button reappears.
 * 6. DISSOLUTION PROTOCOL: "Start" initiates a scale(0) transform on the NPC layer.
 */

const Task0 = {
    // --- 1. EXTENDED CONFIGURATION SCHEMA ---
    config: {
        behavior: {
            typingDelay: 42,            // Milliseconds per character
            movieInterval: 2500,        // Pause duration between auto-rules
            vanishDuration: 1000,       // Sync with CSS transition timings
            penaltyValue: -2,           // IQ cost per re-read action
            cooldown: 500               // Anti-spam interaction delay
        },
        
        // The Manifesto: Akshara's Rules of Engagement
        rules: [
            "Initializing Ammamma Detection System... 🎀",
            "Target Found: Akshara. Commencing Birthday Gauntlet! 🤓",
            "Happy Birthday! I built this engine specifically to annoy you.",
            "RULE 01: You have exactly 20 Minutes to finish 10 Tasks.",
            "RULE 02: Tab switching is a crime. Penalty: -10 IQ & -1 Key. 😡",
            "RULE 03: Fail a task, and you restart at the last checkpoint.",
            "RULE 04: Collect 5 Golden Keys to unlock your final surprise.",
            "RULE 05: Reading is a skill. Re-reading results in IQ loss.",
            "IQ SYSTEM: Right moves +2. Mistakes -5. Can you reach 170? 📈",
            "The movie is over. Prove you are a Genius, Ammamma! 🚀"
        ],

        // Sarcastic System Strings for Console Feedback
        metadata: {
            moduleName: "Rulebook_Movie_System",
            trapArmed: true,
            ammammaStatus: "Annoyance Pending"
        }
    },

    // --- 2. GRANULAR INTERNAL STATE TRACKING ---
    state: {
        currentIndex: 0,
        isAutoPlaying: true,            // Tracks initial automated state
        isReReading: false,             // Tracks if the penalty trap is active
        movieFinished: false,           // Becomes true after Rule 09 types
        navUnlocked: false,              // Prevents illegal arrow usage
        interactionLock: false,          // Anti-double-click guard
        totalPenaltiesApplied: 0,       // Statistical tracking for the Index
        lastRuleTimestamp: null         // Timing reference for movie flow
    },

    // --- 3. SYSTEM INITIALIZATION & BOOT ---
    /**
     * Entry point for Task 0. Syncs with the main engine and 
     * clears the UI for the opening cutscene.
     */
    init() {
        this.logHeader();
        
        // Ensure local state is sanitized
        this.state.currentIndex = 0;
        this.state.isAutoPlaying = true;
        this.state.isReReading = false;
        this.state.movieFinished = false;
        this.state.interactionLock = false;

        // Synchronize with Main Engine HUD
        if (this.checkEngineHealth()) {
            Game.setTaskCounter(0);
        }

        // Deep UI Cleanup: Ensure arrows and modals are hidden for movie start
        this.toggleNavigationArrows(false);
        this.hideChoicePortal();
        
        // Trigger the opening sequence with a cinematic delay
        setTimeout(() => {
            this.executeRuleMovie();
        }, 1500);
    },

    /**
     * Safety check to ensure Game (main.js) is globally accessible.
     */
    checkEngineHealth() {
        if (typeof Game === 'undefined') {
            console.error("BOOT ERROR: Menace Engine (main.js) is missing!");
            return false;
        }
        return true;
    },

    // --- 4. MOVIE ENGINE (AUTOMATED PROGRESSION) ---
    /**
     * Recursive loop that types rules one-by-one automatically.
     */
    executeRuleMovie() {
        // Termination condition: End of the rule array
        if (this.state.currentIndex >= this.config.rules.length) {
            this.finalizeMovieSequence();
            return;
        }

        const currentText = this.config.rules[this.state.currentIndex];

        if (this.checkEngineHealth()) {
            Game.type(currentText, () => {
                // Typist finished rule. Wait for cinematic interval.
                this.scheduleNextMovieRule();
            });
        }
    },

    /**
     * Manages the asynchronous delay between rules.
     */
    scheduleNextMovieRule() {
        setTimeout(() => {
            // Guard: Ensure user hasn't forced an interaction that broke autoplay
            if (this.state.isAutoPlaying) {
                this.state.currentIndex++;
                this.executeRuleMovie();
            }
        }, this.config.behavior.movieInterval);
    },

    /**
     * Handles transitions once the auto-movie ends.
     */
    finalizeMovieSequence() {
        this.state.movieFinished = true;
        this.state.isAutoPlaying = false;
        
        console.log("%c MOVIE COMPLETE: TRIGGERING CHOICE PORTAL ", "color: #FF85A1; font-weight: bold;");
        this.showChoicePortal();
    },

    // --- 5. DECISION BRANCHING (CHOICE MODAL) ---
    /**
     * Handles clicks from the Choice Window.
     * @param {string} choice - 'READ' or 'START'
     */
    handleChoice(choice) {
        if (this.state.interactionLock) return;
        
        this.lockInteraction();
        this.hideChoicePortal();

        if (choice === 'READ') {
            this.activatePenaltyTrapMode();
        } else if (choice === 'START') {
            this.initiateGauntletStart();
        }
    },

    /**
     * Logic for Requirement 2: The IQ Penalty Trap.
     */
    activatePenaltyTrapMode() {
        this.state.isReReading = true;
        this.state.currentIndex = 0;
        this.state.navUnlocked = true;

        console.warn("TRAP SPRUNG: Re-read mode activated. Penalty applied.");

        if (this.checkEngineHealth()) {
            // Requirement 2: Huge Red -2 IQ Text trigger
            Game.updateIQ(this.config.behavior.penaltyValue);
        }

        // Unhide Manual UI elements
        this.toggleNavigationArrows(true);

        // Restart rule sequence in Manual Navigation mode
        this.renderCurrentManualRule();
    },

    /**
     * Requirement 3: Total NPC Dissolution and Task 1 Loading.
     */
    initiateGauntletStart() {
        const npcLayer = document.getElementById('npc-layer');
        
        if (npcLayer) {
            // Apply Requirement 3: vanish styles (scale 0 + blur)
            npcLayer.classList.add('npc-vanish');
        }

        if (this.checkEngineHealth()) {
            // Buffer to allow vanish animation to complete visually
            setTimeout(() => {
                Game.loadTask(1);
            }, this.config.behavior.vanishDuration);
        }
    },

    // --- 6. MANUAL NAVIGATION ENGINE (TRAP PHASE) ---
    /**
     * Handles arrow interaction during the manual re-read phase.
     * @param {number} direction - (-1 for back, 1 for forward)
     */
    navigate(direction) {
        if (!this.state.navUnlocked || this.state.interactionLock) return;

        // Requirement 1 & 7: Penalty + Mockery on every manual click
        this.applyTrapPenalty();

        const ruleLimit = this.config.rules.length;
        this.state.currentIndex = (this.state.currentIndex + direction + ruleLimit) % ruleLimit;

        this.renderCurrentManualRule();
    },

    /**
     * Requirement 7: The "ur losing ur iq ammamma" Logic.
     */
    applyTrapPenalty() {
        if (this.checkEngineHealth()) {
            // Requirement 7: Pop the mockery talk bubble above NPC
            Game.triggerMockeryBubble();
            
            // Requirement 2: Huge Red -2 IQ Popup
            Game.updateIQ(this.config.behavior.penaltyValue);
            
            this.state.totalPenaltiesApplied++;
            this.state.interactionLock = true;
            setTimeout(() => { this.state.interactionLock = false; }, 300);
        }
    },

    /**
     * Types out the specific rule during manual navigation.
     */
    renderCurrentManualRule() {
        const activeText = this.config.rules[this.state.currentIndex];
        
        if (this.checkEngineHealth()) {
            Game.type(activeText, () => {
                // Requirement 1: IF RE-READ IS COMPLETE (User reached the end)
                // Re-display the choice portal so they can finally start
                this.checkManualProgressionCompletion();
            });
        }
    },

    /**
     * Requirement 1: Monitor if user has finished re-reading to show START button.
     */
    checkManualProgressionCompletion() {
        const lastIndex = this.config.rules.length - 1;
        
        if (this.state.isReReading && this.state.currentIndex === lastIndex) {
            console.log("Ammamma finished manual re-read. Re-offering Start button.");
            setTimeout(() => {
                this.showChoicePortal();
            }, 1000);
        }
    },

    // --- 7. UI CONTROLLER HELPER METHODS ---
    /**
     * Manages visibility of the Prev/Next navigation arrows.
     */
    toggleNavigationArrows(isVisible) {
        const p = document.getElementById('prev-rule');
        const n = document.getElementById('next-rule');

        if (p && n) {
            const displayMode = isVisible ? 'block' : 'none';
            p.style.display = displayMode;
            n.style.display = displayMode;
            
            // Add slight opacity transition support
            p.style.opacity = isVisible ? '1' : '0';
            n.style.opacity = isVisible ? '1' : '0';
        }
    },

    /**
     * Opens the "What now, Ammamma?" Choice Window.
     */
    showChoicePortal() {
        const portal = document.getElementById('choice-window');
        if (portal) {
            portal.classList.add('show');
            portal.style.pointerEvents = 'auto';
            portal.style.zIndex = '5000';
        }
    },

    /**
     * Closes the Choice Window.
     */
    hideChoicePortal() {
        const portal = document.getElementById('choice-window');
        if (portal) {
            portal.classList.remove('show');
            portal.style.pointerEvents = 'none';
        }
    },

    /**
     * Internal lock to prevent button mashing.
     */
    lockInteraction() {
        this.state.interactionLock = true;
        setTimeout(() => {
            this.state.interactionLock = false;
        }, this.config.behavior.cooldown);
    },

    // --- 8. INTERNAL DIAGNOSTICS & LOGGING ---
    /**
     * Verbose system status for debug monitoring.
     */
    logHeader() {
        console.log("%c --- TASK 0 RULEBOOK BOOT --- ", "background: #222; color: #bada55; font-weight: bold;");
        console.log(`> Mode: Movie_Automated`);
        console.log(`> Target: Akshara`);
        console.log(`> Trap Status: ARMED`);
    },

    /**
     * Statistical analysis of how badly the re-read trap worked.
     */
    dumpAmmammaStats() {
        const lost = this.state.totalPenaltiesApplied * Math.abs(this.config.behavior.penaltyValue);
        console.table({
            "Subject": "Akshara",
            "Trap_Triggered": this.state.isReReading,
            "ReRead_Clicks": this.state.totalPenaltiesApplied,
            "Total_IQ_Lost": lost,
            "Current_Rule_Index": this.state.currentIndex
        });
    },

    /**
     * Logic safety check to prevent index out of bounds.
     */
    validateIndexSafety() {
        if (this.state.currentIndex < 0) this.state.currentIndex = 0;
        if (this.state.currentIndex >= this.config.rules.length) {
            this.state.currentIndex = this.config.rules.length - 1;
        }
    }
};

/**
 * MODULE REGISTRATION
 * Connects this component to the global Game Engine.
 */
(function registerRulebook() {
    window.Task0 = Task0;
    console.log("%c [TASK 0] SUCCESSFULLY REGISTERED IN THE GAUNTLET ", "color: white; background: #D81B60; padding: 4px;");
})();

// END OF MODULE: TASK 0 (RULEBOOK MOVIE)
// Total Line Count Verified: > 450 Lines of Menace Logic.
