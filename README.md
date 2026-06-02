# 🎈 Birthday Menace — Akshara Edition 🎂

Welcome to the **Birthday Menace — Akshara Edition**! 🎁 This repository holds a custom-crafted, annoyingly fun web gauntlet designed to surprise Akshara (aka Ammamma) on her birthday, test her patience, make her admit to being a monkey, and eventually reveal her birthday wishes and gift choices!

This project was built purely for **happiness, laughter, and hands-on web development practice**! It's loaded with custom styles, animations, interactive Web APIs, and a cheeky monkey NPC who lives to lower her IQ points.

---

## 🌟 The Story & Experience

Instead of a boring birthday card, Akshara gets a security challenge. She has exactly **20 minutes** to complete **10 interactive tasks**. Success awards her **Golden Keys**, but tab-switching triggers the visibility sentry and resets her score with massive IQ penalties!

Let's walk through the gauntlet, page by page! 👇

---

## 🎮 The 10 Tasks (Visual Walkthrough)

### 🏠 Landing & Rules Cinematic
The game opens with an automatic typewriter rules intro. If she tries to skip reading the rules or clicks to re-read them, the engine immediately deducts 2 IQ points and mocks her.

<p align="center">
  <img src="screenshots/00_landing.png" width="600" alt="Landing Cinematic">
</p>

---

### 🧩 Task 01: Who is Monkey? (Slide Puzzle)
Akshara must solve a sliding puzzle of her own face to prove she is human!
* **Rule:** Correct moves add +2 IQ, wrong moves subtract -4 IQ.
* **Reward:** A golden banana that scratches away to reveal the first key.

<p align="center">
  <img src="screenshots/01_task1_rules.png" width="30%;" alt="Rules">
  <img src="screenshots/01_task1_board.png" width="30%;" alt="Puzzle">
</p>
<p align="center">
  <img src="screenshots/01_task1_victory.png" width="30%;" alt="Victory">
  <img src="screenshots/01_task1_scratch.png" width="30%;" alt="Scratch Card">
</p>

---

### 🟢 Task 02: Button Click Gauntlet
A 4-button chain game where she must press buttons in a specific sequence to turn them all green. Clicking the wrong button triggers a randomized insult from the monkey NPC!

<p align="center">
  <img src="screenshots/02_task2_board.png" width="600" alt="Button Chain">
</p>

---

### 🎤 Task 03: Truth or Dare Recording
Akshara must select either a Truth or a Dare.
* **Truth:** Recite an embarrassing confession.
* **Dare:** Perform a silly physical ritual.
* The browser utilizes the WebRTC media recorder to capture her voice/video stream and save it locally, while sending a backup directly to Manohar's Telegram!

<p align="center">
  <img src="screenshots/03_task3_options.png" width="45%;" alt="Selection UI">
  <img src="screenshots/03_task3_recording.png" width="45%;" alt="Recording">
</p>

---

### 🍌 Task 04: Glitchy Catch
A high-performance catch game where she must click on a fast-teleporting golden banana while dodging falling red bombs. Teleportation triggers every 25ms based on mouse proximity!

<p align="center">
  <img src="screenshots/04_task4_play.png" width="600" alt="Glitchy Catch">
</p>

---

### 🎁 Task 05: Mystery Box Sacrifice
Nine mystery boxes appear. Akshara must sacrifice one of her earned keys to open them, only to trigger a funny monkey jump scare and get another key stolen!

<p align="center">
  <img src="screenshots/05_task5_grid.png" width="600" alt="Sacrifice Grid">
</p>

---

### 🥥 Task 06: Coconut shell shuffle
A shell game where three coconuts shuffle. The twist? The game is 100% rigged. Even if she follows the key, clicking on the correct shell secretly shifts the key away instantly!

<p align="center">
  <img src="screenshots/06_task6_play.png" width="600" alt="Coconut Gamble">
</p>

---

### 🛣️ Task 07: Neon Highway driving
Drive a car from point A to point B on a narrow neon highway.
* **The Catch:** Controls are inverted! Up goes down, left goes right.
* If she touches the neon fence, the car explodes in a blast animation!

<p align="center">
  <img src="screenshots/07_task7_play.png" width="600" alt="Neon Highway">
</p>

---

### 🪟 Task 08: Dodging Popup Firewall
Close 10 layers of retro Windows-style critical error messages. The Close "X" buttons dynamically dodge the mouse pointer, requiring quick reflex clicks!

<p align="center">
  <img src="screenshots/08_task8_firewall.png" width="600" alt="Popup Firewall">
</p>

---

### 🖥️ Task 09: Brainwash Quiz Terminal
A green-scanline quiz interface that forces Akshara to answer questions like *"What is your species?"* with *"Stinky Monkey"*. Picking the wrong answer triggers a red screen-flash and massive IQ deductions.

<p align="center">
  <img src="screenshots/09_task9_quiz.png" width="600" alt="Quiz Terminal">
</p>

---

### 🎂 Task 10: Grand Finale
The ultimate cake is revealed!
* **Blow out candles:** Akshara must physically puff/blow into her microphone. The Web Audio analyser captures the air pressure peak and extinguishes the candles.
* **Camera Capture:** The screen flashes, captures her webcam reaction, and places it inside a celebratory postcard decorated with funny hat and joker overlays!

<p align="center">
  <img src="screenshots/10_task10_box.png" width="30%;" alt="Final Box">
  <img src="screenshots/10_task10_cake.png" width="30%;" alt="Candle Cake">
  <img src="screenshots/10_task10_postcard.png" width="30%;" alt="Postcard Capture">
</p>

---

### 🎁 The Finale: Gift Selection & Twist!
Akshara enters the final stage. The monkey hand appears to gift her the final keys, letting her open the treasure chest.
1. She reads custom birthday wishes from friends: **Charana, Manohar, Saikiran, Tulasi, Lasya, Navya, Shailani, Sandya, and Nitish**.
2. She selects a gift (Book, stuffed toy, or ornament).
3. The choice is transmitted to Manohar's Telegram...
4. **THE TWIST:** The screen reveals she has ordered... **TEETH BRACES!** 🦷 (Non-refundable, you monkey!)

<p align="center">
  <img src="screenshots/11_gifts_chest.png" width="45%;" alt="Chest Screen">
  <img src="screenshots/11_gifts_letter.png" width="45%;" alt="Letter modal">
</p>
<p align="center">
  <img src="screenshots/11_gifts_wishes.png" width="45%;" alt="Friend Wishes">
  <img src="screenshots/11_gifts_braces.png" width="45%;" alt="Teeth Braces Acquired!">
</p>

---

## 🛠️ Technology Stack

1. **Frontend Core:** Vanilla HTML5, CSS3 transitions/keyframes, and ES6 Javascript.
2. **Web APIs used:**
   - **Web Audio API:** For real-time microphone volume peak detection.
   - **WebRTC (Media Stream / MediaRecorder):** For voice/video capture and synchronization.
   - **Canvas API:** For the scratch cards and image snapshot compositing.
   - **Page Visibility API:** Supporting the tab security sentry.
3. **External Integration:** HTTP POST requests to the Telegram Bot API.

---

## 🚀 How to Run Locally

Since this is a fully static project, you don't need any complex installation.
1. Clone the repository.
2. Run a simple static file server in the project directory, or double-click `index.html` to open it directly in your browser.
   - *Example using Python:* `python -m http.server 8000`
   - *Example using Node:* `npx serve`
3. Enjoy the game! (Ensure you allow Camera/Microphone permissions to experience Task 10 and the finale snapshot).

---

## 📄 License

This project is open-sourced under the fun and friendly **[LICENSE](LICENSE)** file. Keep smiling! 😄🎈
