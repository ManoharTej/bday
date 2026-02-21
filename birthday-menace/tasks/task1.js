import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

/**
 * PROJECT: BIRTHDAY MENACE - TASK 01: THE MONKEY TRANSFORMATION
 * Version: 75.0 (Ultimate Gauntlet Build)
 * Developer: Manoh (VBIT) | Target: Akshara
 * Logic: Sliding Puzzle -> Seamless Merge -> Monkey Transition -> SVG Reward
 */

// --- 🎨 1. ADVANCED VECTOR ENGINE (SVG DRIVEN) ---
const SVG_DATA = {
  // A high-detail stylized Monkey Arm reaching for the stage
  Hand: () => (
    <svg width="450" height="700" viewBox="0 0 450 700" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="furGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#5D4037" />
          <stop offset="100%" stopColor="#3E2723" />
        </linearGradient>
      </defs>
      <path 
        d="M420 700C420 700 440 500 360 400C280 300 190 350 130 300C70 250 40 200 30 120" 
        stroke="url(#furGradient)" strokeWidth="85" strokeLinecap="round"
      />
      <circle cx="30" cy="120" r="55" fill="#5D4037" />
      {/* Finger Detail */}
      <rect x="5" y="60" width="30" height="100" rx="15" fill="#3E2723" transform="rotate(-38 5 60)"/>
      <rect x="45" y="50" width="30" height="110" rx="15" fill="#3E2723" transform="rotate(-18 45 50)"/>
      <rect x="85" y="70" width="30" height="80" rx="15" fill="#3E2723" transform="rotate(5 85 70)"/>
    </svg>
  ),
  // The interactive Golden Banana with internal glow
  Banana: () => (
    <svg width="150" height="130" viewBox="0 0 150 130" fill="none" xmlns="http://www.w3.org/2000/svg">
      <filter id="bananaGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <path 
        d="M20 70C20 70 45 25 90 25C135 25 135 70 135 70C135 70 135 115 90 115C45 115 20 70 20 70Z" 
        fill="#FFD700" filter="url(#bananaGlow)"
      />
      <path d="M20 70C20 70 55 45 95 45" stroke="#DAA520" strokeWidth="7" strokeLinecap="round"/>
      <path d="M125 65L138 70L125 75" fill="#4B3621"/>
    </svg>
  )
};

// --- 💅 2. DYNAMIC DESIGN SYSTEM ---
const TaskGlobalStyle = createGlobalStyle`
  body { background: #FFD1DC !important; cursor: default; }
`;

const MainContainer = styled.div`
  position: fixed; inset: 0; width: 100vw; height: 100vh;
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; z-index: 50; overflow: hidden;
`;

const TopHUD = styled(motion.div)`
  position: fixed; top: 100px; display: flex; gap: 25px; z-index: 150;
`;

const HUDCard = styled.div`
  background: rgba(255, 255, 255, 0.95); padding: 12px 35px; border-radius: 60px;
  border: 5px solid #D81B60; font-weight: 900; color: #D81B60;
  box-shadow: 0 15px 30px rgba(0,0,0,0.1); font-size: 1.2rem;
`;

const BoardFrame = styled(motion.div)`
  display: grid; grid-template-columns: repeat(3, 115px); grid-template-rows: repeat(3, 115px);
  gap: 12px; padding: 25px; background: white; border-radius: 40px;
  border: 12px solid #D81B60; box-shadow: 0 60px 150px rgba(0,0,0,0.5);
  position: relative;
`;

const GridTile = styled(motion.div)`
  width: 115px; height: 115px; border-radius: 16px; cursor: pointer;
  background-image: url(${props => props.image}); background-size: 345px 345px;
  background-position: ${props => props.pos}; position: relative;
  
  &::before {
    content: '${props => props.num}'; position: absolute; top: 10px; left: 10px;
    background: rgba(216, 27, 96, 0.95); color: white; width: 28px; height: 28px;
    border-radius: 50%; display: ${props => (props.showNum ? 'flex' : 'none')};
    align-items: center; justify-content: center; font-size: 0.9rem; font-weight: 900;
    border: 2px solid white; box-shadow: 0 3px 6px rgba(0,0,0,0.2);
  }
`;

const NPCOverlay = styled(motion.div)`
  position: fixed; bottom: 0; 
  ${props => (props.align === 'left' ? 'left: 40px;' : 'right: 40px;')}
  z-index: 700; display: flex; flex-direction: column; align-items: center;
`;

const Dialogue = styled(motion.div)`
  background: white; padding: 22px 35px; border-radius: 30px;
  border: 6px solid #D81B60; font-weight: 800; color: #D81B60;
  margin-bottom: 25px; max-width: 300px; text-align: center;
  position: relative; box-shadow: 0 15px 40px rgba(216, 27, 96, 0.2);
  font-size: 1.1rem;

  &::after {
    content: ''; position: absolute; bottom: -24px; left: 50%;
    transform: translateX(-50%); border-width: 24px 24px 0;
    border-style: solid; border-color: #D81B60 transparent;
  }
`;

const RainIcon = styled(motion.div)`
  position: absolute; font-size: 4rem; z-index: 60; pointer-events: none;
`;

const HandPresenter = styled(motion.div)`
  position: absolute; bottom: -100px; right: -60px; z-index: 1200;
`;

const GoldTicket = styled(motion.div)`
  position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
  width: 580px; height: 320px; border-radius: 35px; z-index: 2500;
  background: linear-gradient(135deg, #FFD700 0%, #FFF8DC 50%, #DAA520 100%);
  border: 12px solid #8B4513; box-shadow: 0 0 250px rgba(255, 215, 0, 0.8);
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; padding: 50px; font-family: 'Pacifico', cursive;
`;

// --- 🧠 3. CORE LOGIC ENGINE ---
export default function Task1({ globalIQ, updateGlobalIQ, onTaskComplete }) {
  // --- A. INTERNAL STATE ---
  const [board, setBoard] = useState([1, 2, 3, 4, 5, 6, 7, 8, null]);
  const [phase, setPhase] = useState('playing'); // playing | merging | monkey | rain | ticket
  const [npc, setNpc] = useState({ visible: false, side: 'left', msg: '' });
  const [timer, setTimer] = useState(180); // 3 Minutes
  const [isProcessing, setIsProcessing] = useState(false);

  const ASSETS = {
    FACE: 'assets/images/akshara-face.png',
    MONKEY: 'assets/images/menace-monkey.png'
  };

  // --- B. INITIALIZATION & TIMER ---
  useEffect(() => {
    shuffleLogic();
    const gauntletTimer = setInterval(() => {
      setTimer(t => {
        if (t <= 1) {
          clearInterval(gauntletTimer);
          alert("Time's up Ammamma! Brain failure detected.");
          window.location.reload();
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(gauntletTimer);
  }, []);

  const shuffleLogic = () => {
    let current = [1, 2, 3, 4, 5, 6, 7, 8, null];
    // Perform 150 valid random moves to ensure solvability
    for (let i = 0; i < 150; i++) {
      const emptyIdx = current.indexOf(null);
      const possible = getNeighbors(emptyIdx);
      const move = possible[Math.floor(Math.random() * possible.length)];
      [current[emptyIdx], current[move]] = [current[move], current[emptyIdx]];
    }
    setBoard(current);
  };

  const getNeighbors = (idx) => {
    const n = [];
    if (idx % 3 > 0) n.push(idx - 1); // Left
    if (idx % 3 < 2) n.push(idx + 1); // Right
    if (idx > 2) n.push(idx - 3);     // Up
    if (idx < 6) n.push(idx + 3);     // Down
    return n;
  };

  // --- C. INTERACTION HANDLER ---
  const handleTileAction = (idx) => {
    if (phase !== 'playing' || isProcessing) return;

    const emptySpot = board.indexOf(null);
    const reachable = getNeighbors(idx);

    if (reachable.includes(emptySpot)) {
      // ✅ SUCCESSFUL MOVE
      const nextBoard = [...board];
      [nextBoard[emptySpot], nextBoard[idx]] = [nextBoard[idx], nextBoard[emptySpot]];
      setBoard(nextBoard);
      
      triggerNpcMockery('right', 'i iidnt knew u had brain');
      updateGlobalIQ(2);

      if (isPuzzleResolved(nextBoard)) {
        startTransformationSequence();
      }
    } else {
      // ❌ INVALID MOVE
      triggerNpcMockery('left', 'noob, cant evn solve small problem');
      updateGlobalIQ(-4);
    }
  };

  const triggerNpcMockery = (side, msg) => {
    setNpc({ visible: true, side, msg });
    // Keep it on screen for 2.5 seconds
    setTimeout(() => {
      setNpc(prev => ({ ...prev, visible: false }));
    }, 2500);
  };

  const isPuzzleResolved = (arr) => {
    const winState = [1, 2, 3, 4, 5, 6, 7, 8, null];
    return arr.every((val, i) => val === winState[i]);
  };

  // --- D. CINEMATIC FLOW ---
  const startTransformationSequence = () => {
    setIsProcessing(true);
    setPhase('merging');
    
    // Step 1: Piece Borders Vanish & Grid Merges (2s delay)
    setTimeout(() => {
      setPhase('monkey'); // Cross-fade to Monkey face
    }, 2000);

    // Step 2: Trigger Monkey Rain & Reward Hand (4.5s total delay)
    setTimeout(() => {
      setPhase('rain');
    }, 4500);
  };

  const getBG = (val) => {
    if (!val) return 'none';
    const x = ((val - 1) % 3) * -115;
    const y = Math.floor((val - 1) / 3) * -115;
    return `${x}px ${y}px`;
  };

  // --- 🎥 E. RENDER ENGINE ---
  return (
    <MainContainer>
      <TaskGlobalStyle />
      
      {/* 📊 HUD OVERLAY */}
      <TopHUD initial={{ y: -200 }} animate={{ y: 0 }} transition={{ type: 'spring' }}>
        <HUDCard>⏳ {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}</HUDCard>
        <HUDCard>🏆 GOAL: 150+ IQ</HUDCard>
      </TopHUD>

      {/* 🧩 THE GRID ENGINE */}
      <BoardFrame
        animate={phase !== 'playing' ? { gap: 0, padding: 0, border: '0px solid transparent' } : {}}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <AnimatePresence>
          {board.map((val, i) => (
            <GridTile
              key={i} 
              layout
              image={phase === 'playing' || phase === 'merging' ? ASSETS.FACE : ASSETS.MONKEY}
              pos={getBG(val || 9)}
              num={val}
              showNum={phase === 'playing' && val !== null}
              onClick={() => handleTileAction(i)}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              style={{ opacity: !val && phase === 'playing' ? 0 : 1 }}
            />
          ))}
        </AnimatePresence>
      </BoardFrame>

      {/* 🗣️ THE DUAL-SIDED NPC SYSTEM */}
      <AnimatePresence>
        {npc.visible && (
          <NPCOverlay
            align={npc.side}
            initial={{ y: 500, opacity: 0, scale: 0.5 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 500, opacity: 0, transition: { duration: 0.4 } }}
            transition={{ type: 'spring', damping: 18 }}
          >
            <Dialogue
              initial={{ scale: 0, rotate: npc.side === 'left' ? -10 : 10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2 }}
            >
              {npc.msg}
            </Dialogue>
            {/* High-Impact Character Emoji Placeholder */}
            <motion.div 
              style={{ fontSize: '14rem', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' }}
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
            >
              {npc.side === 'left' ? '🤡' : '🧐'}
            </motion.div>
          </NPCOverlay>
        )}
      </AnimatePresence>

      {/* 🐒 THE MONKEY RAIN & PRESENTATION */}
      {phase === 'rain' && (
        <>
          {/* Particle System: 25+ Monkeys Falling */}
          {[...Array(28)].map((_, i) => (
            <RainIcon
              key={i}
              initial={{ y: -200, x: Math.random() * window.innerWidth, rotate: 0 }}
              animate={{ y: window.innerHeight + 200, rotate: 720 }}
              transition={{ 
                duration: Math.random() * 3 + 4, 
                repeat: Infinity, 
                delay: Math.random() * 3 
              }}
            >
              🐒
            </RainIcon>
          ))}
          
          {/* SVG Monkey Hand Animation */}
          <HandPresenter
            initial={{ x: 600, rotate: 45 }}
            animate={{ x: 0, rotate: 0 }}
            transition={{ type: 'spring', damping: 15, stiffness: 70, delay: 1.5 }}
          >
            <SVG_DATA.Hand />
            {/* Interactive Golden Banana */}
            <motion.div
              style={{ position: 'absolute', top: '100px', left: '15px', cursor: 'pointer' }}
              whileHover={{ scale: 1.3, rotate: 15, filter: 'brightness(1.2)' }}
              whileTap={{ scale: 0.85 }}
              onClick={() => setPhase('ticket')}
            >
              <SVG_DATA.Banana />
            </motion.div>
          </HandPresenter>
        </>
      )}

      {/* 🎟️ THE ULTIMATE REWARD: GOLDEN TICKET */}
      <AnimatePresence>
        {phase === 'ticket' && (
          <GoldTicket
            as={motion.div}
            initial={{ scale: 0, y: 500, rotateY: 90 }}
            animate={{ scale: 1, y: 0, rotateY: 0 }}
            transition={{ type: 'spring', bounce: 0.55, duration: 1.2 }}
          >
            <motion.h1 
              style={{ color: '#8B4513', fontSize: '4rem', margin: 0, textShadow: '2px 2px 0px white' }}
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ repeat: Infinity, duration: 2.2 }}
            >
              GOLDEN TICKET
            </motion.h1>
            <p style={{ fontWeight: 900, color: '#5D4037', fontSize: '1.5rem', marginTop: '10px' }}>
              Human Status: PROVEN
            </p>
            <p style={{ color: '#666', fontStyle: 'italic', fontSize: '1.1rem' }}>
              Round 1 of 2 Complete. Final Key Awaits.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.15, background: '#D81B60', boxShadow: '0 15px 30px rgba(0,0,0,0.3)' }}
              whileTap={{ scale: 0.95 }}
              style={{ 
                marginTop: '40px', background: '#3E2723', color: 'white', 
                padding: '20px 60px', border: 'none', borderRadius: '60px',
                fontWeight: 900, cursor: 'pointer', fontSize: '1.3rem'
              }}
              onClick={onFinish}
            >
              PROCEED TO TASK 02
            </motion.button>
          </GoldTicket>
        )}
      </AnimatePresence>
    </MainContainer>
  );
}
