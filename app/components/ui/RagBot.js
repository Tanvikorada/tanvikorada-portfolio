'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

const BOT_SVG = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 8V4H8"/>
    <rect width="16" height="12" x="4" y="8" rx="2"/>
    <path d="M2 14h2"/>
    <path d="M20 14h2"/>
    <path d="M15 13v2"/>
    <path d="M9 13v2"/>
  </svg>
);

const QUICK_QUESTIONS = [
  "What is your tech stack?",
  "Tell me about AppCompiler",
  "Are you open to work?",
  "What's your CGPA?"
];


function InteractiveRobotButton({ isOpen, onClick }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse position to range [-1, 1] across the screen
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Spring physics for the eyes tracking the mouse
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Map normalized mouse to pixel movement for eyes
  const eyeLookX = useTransform(smoothX, [-1, 1], [-5, 5]);
  const eyeLookY = useTransform(smoothY, [-1, 1], [-5, 5]);

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        background: 'var(--text-heading)',
        color: 'var(--bg-true)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 10px 30px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,0.2)',
        cursor: 'pointer',
        zIndex: 9999,
        border: 'none',
        outline: 'none',
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div style={{ position: 'relative', width: '32px', height: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* Left Eye */}
        <motion.div
          animate={{
            height: isOpen ? '4px' : isHovered ? '20px' : '12px',
            width: isOpen ? '16px' : isHovered ? '8px' : '8px',
            borderRadius: isOpen ? '2px' : '4px',
            rotate: isOpen ? 15 : 0
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{
            background: 'var(--bg-solid)',
            x: eyeLookX,
            y: eyeLookY
          }}
        />

        {/* Right Eye */}
        <motion.div
          animate={{
            height: isOpen ? '4px' : isHovered ? '20px' : '12px',
            width: isOpen ? '16px' : isHovered ? '8px' : '8px',
            borderRadius: isOpen ? '2px' : '4px',
            rotate: isOpen ? -15 : 0
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{
            background: 'var(--bg-solid)',
            x: eyeLookX,
            y: eyeLookY
          }}
        />

      </div>
      
      {/* Floating Sparkle / Antenna Indicator */}
      <motion.div
        animate={{
          scale: isHovered ? 1 : 0,
          opacity: isHovered ? 1 : 0,
          y: isHovered ? -15 : 0,
          rotate: isHovered ? 45 : 0
        }}
        style={{
          position: 'absolute',
          top: '-8px',
          right: '4px',
          width: '12px',
          height: '12px',
          borderRadius: '2px',
          background: 'var(--primary)',
          boxShadow: '0 0 10px var(--primary)'
        }}
      />
    </motion.button>
  );
}


export default function RagBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hey human 👋 I’m Tanvi’s AI sidekick. What do you want to know about her?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async (textToSubmit) => {
    if (textToSubmit && textToSubmit.preventDefault) textToSubmit.preventDefault();
    const text = typeof textToSubmit === 'string' ? textToSubmit : input;
    if (!text.trim() || isLoading) return;

    const userMessage = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMessage]);
    if (text === input) setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] })
      });

      if (!response.ok) throw new Error('API Error');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      
      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');
          
          for (const line of lines) {
            if (line.startsWith('data: ') && line !== 'data: [DONE]') {
              try {
                const data = JSON.parse(line.slice(6));
                if (data.choices && data.choices[0].delta && data.choices[0].delta.content) {
                  const text = data.choices[0].delta.content;
                  setMessages((prev) => {
                    const newMessages = [...prev];
                    const lastMessage = newMessages[newMessages.length - 1];
                    lastMessage.content += text;
                    return newMessages;
                  });
                }
              } catch (e) {}
            }
          }
        }
      }
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'assistant', content: "Oops, my API connection is snoozing 😴. Drop Tanvi an email at tanvikorada@gmail.com!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .ai-chat-btn {
          position: fixed;
          bottom: 32px;
          right: 32px;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: var(--text-heading);
          color: var(--bg-true);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          cursor: pointer;
          z-index: 9999;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s;
        }
        .ai-chat-btn:hover {
          transform: scale(1.08) translateY(-4px);
        }
        .ai-window {
          position: fixed;
          bottom: 100px;
          right: 32px;
          width: 380px;
          max-width: calc(100vw - 32px);
          height: 550px;
          max-height: calc(100vh - 120px);
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.12);
          display: flex;
          flex-direction: column;
          z-index: 9998;
          overflow: hidden;
        }
        :global(.dark) .ai-window {
          background: rgba(20, 20, 20, 0.98);
          border: 1px solid rgba(255,255,255,0.08);
        }
        .ai-header {
          padding: 20px;
          border-bottom: 1px solid rgba(0,0,0,0.05);
          display: flex;
          align-items: center;
          gap: 12px;
        }
        :global(.dark) .ai-header {
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .ai-avatar {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: var(--text-heading);
          color: var(--bg-true);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ai-messages {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .ai-msg {
          max-width: 85%;
          display: flex;
          gap: 12px;
        }
        .ai-msg.user {
          align-self: flex-end;
          flex-direction: row-reverse;
        }
        .ai-bubble {
          padding: 12px 16px;
          border-radius: 16px;
          font-size: 14px;
          line-height: 1.5;
        }
        .ai-msg.assistant .ai-bubble {
          background: color-mix(in srgb, var(--text-heading) 5%, transparent);
          border-top-left-radius: 4px;
          color: var(--text-heading);
        }
        .ai-msg.user .ai-bubble {
          background: var(--text-heading);
          color: var(--bg-true);
          border-top-right-radius: 4px;
        }
        .quick-questions {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 8px;
        }
        .quick-q-btn {
          background: transparent;
          border: 1px solid var(--border);
          padding: 8px 12px;
          border-radius: 100px;
          font-size: 13px;
          color: var(--text-heading);
          cursor: pointer;
          text-align: left;
          transition: all 0.2s;
        }
        .quick-q-btn:hover {
          background: color-mix(in srgb, var(--text-heading) 5%, transparent);
          border-color: var(--text-muted);
        }
        .ai-input-area {
          padding: 16px;
          border-top: 1px solid rgba(0,0,0,0.05);
        }
        :global(.dark) .ai-input-area {
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .ai-input-wrapper {
          display: flex;
          background: color-mix(in srgb, var(--text-heading) 5%, transparent);
          border-radius: 100px;
          padding: 4px;
        }
        .ai-input {
          flex: 1;
          background: transparent;
          border: none;
          padding: 12px 16px;
          font-size: 14px;
          color: var(--text-heading);
          outline: none;
        }
        .ai-send {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--text-heading);
          color: var(--bg-true);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          margin: 2px;
          transition: opacity 0.2s;
        }
        .ai-send:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>

      <div className="ai-chat-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
        ) : (
          BOT_SVG
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="ai-window"
          >
            <div className="ai-header">
              <div className="ai-avatar">
                {BOT_SVG}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '15px' }}>Tanvi's AI</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Online & Ready</div>
              </div>
            </div>

            <div className="ai-messages">
              {messages.map((m, i) => (
                <div key={i} className={`ai-msg ${m.role}`}>
                  {m.role === 'assistant' && (
                    <div className="ai-avatar" style={{ width: '28px', height: '28px', flexShrink: 0, marginTop: '2px' }}>
                      {BOT_SVG}
                    </div>
                  )}
                  <div className="ai-bubble">
                    {m.content}
                    {m.role === 'assistant' && i === 0 && (
                      <div className="quick-questions">
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px', marginBottom: '4px' }}>Quick questions:</div>
                        {QUICK_QUESTIONS.map((q, idx) => (
                          <button key={idx} className="quick-q-btn" onClick={() => sendMessage(q)}>
                            {q}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="ai-msg assistant">
                  <div className="ai-avatar" style={{ width: '28px', height: '28px', flexShrink: 0 }}>
                    {BOT_SVG}
                  </div>
                  <div className="ai-bubble" style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} style={{ width: '6px', height: '6px', background: 'var(--text-muted)', borderRadius: '50%' }} />
                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} style={{ width: '6px', height: '6px', background: 'var(--text-muted)', borderRadius: '50%' }} />
                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} style={{ width: '6px', height: '6px', background: 'var(--text-muted)', borderRadius: '50%' }} />
                  </div>
                </div>
              )}
              <div ref={endOfMessagesRef} />
            </div>

            <form onSubmit={(e) => sendMessage(e)} className="ai-input-area">
              <div className="ai-input-wrapper">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="ai-input"
                  disabled={isLoading}
                />
                <button type="submit" disabled={!input.trim() || isLoading} className="ai-send">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

