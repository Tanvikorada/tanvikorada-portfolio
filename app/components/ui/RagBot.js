'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RagBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm Tanvi's AI Assistant. Ask me anything about her projects, skills, or experience!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] })
      });

      if (!response.ok) {
        throw new Error('API Error');
      }

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
              } catch (e) {
                // Ignore parse errors for incomplete chunks
              }
            }
          }
        }
      }
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'assistant', content: "I'm currently running in offline mode because my API keys aren't configured. But I can tell you Tanvi is a brilliant full-stack AI engineer open to new opportunities! Drop her an email to learn more." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .rag-bot-btn {
          position: fixed;
          bottom: 32px;
          right: 32px;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, #111, #333);
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255,255,255,0.1);
          cursor: pointer;
          z-index: 9999;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .rag-bot-btn:hover {
          transform: scale(1.05) translateY(-4px);
        }
        .rag-bot-window {
          position: fixed;
          bottom: 110px;
          right: 32px;
          width: 380px;
          max-width: calc(100vw - 32px);
          height: 500px;
          max-height: calc(100vh - 140px);
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
          display: flex;
          flex-direction: column;
          z-index: 9998;
          overflow: hidden;
        }
        :global(.dark) .rag-bot-window {
          background: rgba(20, 20, 20, 0.95);
          border: 1px solid rgba(255,255,255,0.1);
        }
        .rag-bot-header {
          padding: 20px;
          border-bottom: 1px solid rgba(0,0,0,0.05);
          display: flex;
          align-items: center;
          gap: 12px;
        }
        :global(.dark) .rag-bot-header {
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .rag-bot-messages {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .rag-msg {
          max-width: 85%;
          padding: 12px 16px;
          border-radius: 16px;
          font-size: 14px;
          line-height: 1.5;
        }
        .rag-msg.user {
          align-self: flex-end;
          background: #111;
          color: #fff;
          border-bottom-right-radius: 4px;
        }
        .rag-msg.assistant {
          align-self: flex-start;
          background: rgba(0,0,0,0.05);
          color: var(--text-heading);
          border-bottom-left-radius: 4px;
        }
        :global(.dark) .rag-msg.user {
          background: #fff;
          color: #000;
        }
        :global(.dark) .rag-msg.assistant {
          background: rgba(255,255,255,0.1);
        }
        .rag-bot-input {
          padding: 16px;
          border-top: 1px solid rgba(0,0,0,0.05);
          display: flex;
          gap: 8px;
        }
        :global(.dark) .rag-bot-input {
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .rag-bot-input input {
          flex: 1;
          padding: 12px 16px;
          border-radius: 100px;
          border: 1px solid rgba(0,0,0,0.1);
          background: rgba(0,0,0,0.02);
          color: var(--text-heading);
          font-family: var(--font-sans);
          outline: none;
        }
        :global(.dark) .rag-bot-input input {
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.05);
        }
        .rag-bot-input button {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: none;
          background: #111;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }
        :global(.dark) .rag-bot-input button {
          background: #fff;
          color: #000;
        }
        .rag-bot-input button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>

      {/* Floating Action Button */}
      <motion.button
        className="rag-bot-btn"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="rag-bot-window"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="rag-bot-header">
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 10px #22c55e' }} />
              <div>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: 'var(--text-heading)' }}>Tanvi's AI</h3>
                <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)' }}>Intelligent RAG Assistant</p>
              </div>
            </div>

            <div className="rag-bot-messages">
              {messages.map((msg, i) => (
                <div key={i} className={`rag-msg ${msg.role}`}>
                  {msg.content}
                </div>
              ))}
              {isLoading && (
                <div className="rag-msg assistant">
                  <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                    Thinking...
                  </motion.div>
                </div>
              )}
              <div ref={endOfMessagesRef} />
            </div>

            <form className="rag-bot-input" onSubmit={sendMessage}>
              <input
                type="text"
                placeholder="Ask about her skills, projects..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
              />
              <button type="submit" disabled={!input.trim() || isLoading}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
