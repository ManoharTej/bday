# 🏛️ Birthday Menace — System Architecture

Welcome to the architectural layout of the **Birthday Menace — Akshara Edition**! 🐒🎈

To ensure maximum surprise, playfulness, and smooth gameplay, the project connects the user browser environment directly to external alert systems. Below is how everything flows together!

---

## 🎨 Visual System Blueprint

Here is the high-level representation of our fun system design:

![System Architecture Blueprint](architecture.png)

---

## 🔄 Dynamic Data Flow (Mermaid Source)

Here is the exact data flow diagram showing how Akshara's actions (playing, tab-switching, recording truths/dares, and choosing her gift) are captured and communicated:

```mermaid
graph TD
    %% Define Styles
    classDef default fill:#fff5f7,stroke:#ff69b4,stroke-width:2px,color:#d81b60;
    classDef actor fill:#ffe4e1,stroke:#d81b60,stroke-width:3px,font-weight:bold,color:#d81b60;
    classDef storage fill:#fffff0,stroke:#b8860b,stroke-width:2px,color:#b8860b;
    classDef ext fill:#f0f8ff,stroke:#1e90ff,stroke-width:2px,color:#1e90ff;

    %% Elements
    Akshara([Birthday Girl: Akshara]):::actor
    UI[Browser Interface: HTML/CSS]
    Engine[main.js Game Engine]
    Sentry[Tab Sentry Sentry]
    Audio[Web Audio Mic Analyser]
    Media[MediaRecorder API]
    LocalStorage[(Local Storage State)]:::storage
    TelegramAPI[Telegram Bot API]:::ext
    ManoharTelegram[Manohar's Telegram Chat]:::actor

    %% Connections
    Akshara -->|Plays game & inputs answers| UI
    UI -->|Events & gestures| Engine
    Engine -->|Visually updates| UI
    
    %% Security & State
    Engine -->|Triggers tab blur monitor| Sentry
    Sentry -->|Visibility change detected| Engine
    Engine -->|Saves IQ & keys| LocalStorage
    LocalStorage -->|Syncs stats on reload| Engine

    %% Inputs & APIs
    Akshara -->|Blowing on Mic| Audio
    Audio -->|Puff volume trigger| Engine
    Akshara -->|Truth & Dare speech/video| Media
    Media -->|Generates audio/video blobs| Engine
    Engine -->|Sends multipart/form-data| TelegramAPI
    TelegramAPI -->|Pushes messages & video files| ManoharTelegram

    %% Titles & Subgraphs
    subgraph Browser Frontend Environment
        UI
        Engine
        Sentry
        Audio
        Media
    end
```

---

## 🧬 Architectural Components

1. **The Game Client:** Built entirely with static web technologies (HTML5, Vanilla CSS3, Javascript ES6) to load instantly in any mobile or desktop browser without setting up a database or complex hosting.
2. **State & Recovery Manager:** Stores key status and current IQ points dynamically inside the browser's `localStorage` so that accidental refreshes do not ruin her progress.
3. **Tab Focus Sentry:** Monitors the browser window state and acts as a security system to prevent cheating or tab-switching, applying instant penalties.
4. **Media & Web Audio Analyzer:** Hooks into standard browser media capture APIs (camera, microphone, and canvas output) to make tasks interactive.
5. **Telegram Log Sync:** Communicates with a Telegram Bot to deliver her recording files and final choices straight to Manohar's chat.
