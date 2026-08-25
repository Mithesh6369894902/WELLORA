import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, X, Sparkles, Trash2, Zap, AlertTriangle } from 'lucide-react';
import type { RealTimeTelemetry, CSSParameters, SRPParameters, ReservoirParameters } from '../types';
import { generateAiAdvice, loadSavedChatHistory, saveChatHistory, type ChatMessage } from '../services/aiAdvisorService';

interface AiAdvisorBoxProps {
  isOpen: boolean;
  onClose: () => void;
  telemetry: RealTimeTelemetry;
  css: CSSParameters;
  srp: SRPParameters;
  res: ReservoirParameters;
  onAutoMitigateRodFloating?: () => void;
}

export const AiAdvisorBox: React.FC<AiAdvisorBoxProps> = ({
  isOpen,
  onClose,
  telemetry,
  css,
  srp,
  res,
  onAutoMitigateRodFloating,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = loadSavedChatHistory();
    if (saved.length > 0) return saved;
    return [
      {
        id: 'welcome_1',
        sender: 'ai',
        text: `👋 **Welcome to the Baghewala AI Assistant!**\n\nI am your friendly AI guide for this oilfield digital twin project. You can ask me anything about the well, explore application features, or define terms in simple, everyday language!\n\nHere are some popular questions you can ask:\n- 🧪 *"How does the What-If Lab work?"*\n- ⚡ *"How do I fix Rod Floating?"*\n- ⏱️ *"What is SPM or BHT?"*\n- 💰 *"How do we increase daily profit?"*\n\nClick a suggestion below or type any question!`,
        timestamp: Date.now(),
        category: 'GENERAL',
      },
    ];
  });

  const [inputQuery, setInputQuery] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Persist chat history
  useEffect(() => {
    saveChatHistory(messages);
  }, [messages]);

  if (!isOpen) return null;

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: Date.now(),
    };

    const aiAdvice = generateAiAdvice(query, telemetry, css, srp, res);
    const aiMsg: ChatMessage = {
      id: `ai_${Date.now() + 1}`,
      sender: 'ai',
      text: aiAdvice.response,
      timestamp: Date.now() + 1,
      category: aiAdvice.category,
    };

    setMessages((prev) => [...prev, userMsg, aiMsg]);
    if (!textToSend) setInputQuery('');
  };

  const handleClearHistory = () => {
    const defaultMsg: ChatMessage = {
      id: `welcome_${Date.now()}`,
      sender: 'ai',
      text: `Chat history cleared. How can I assist your engineering calculations today?`,
      timestamp: Date.now(),
      category: 'GENERAL',
    };
    setMessages([defaultMsg]);
  };

  const suggestionChips = [
    { label: '👋 Hello & Help', query: 'Hi, what can you do?' },
    { label: '🧪 How to use What-If Lab?', query: 'How to use What-If Lab?' },
    { label: '⏱️ What is SPM?', query: 'What is SPM?' },
    { label: '🌡️ What is BHT?', query: 'What is BHT?' },
    { label: '🔥 What is SOR?', query: 'What is SOR?' },
    { label: '🛢️ What is API Gravity?', query: 'What is API gravity?' },
    { label: '⚡ Fix Rod Floating', query: 'How do I fix Rod Floating?' },
    { label: '📊 How to download CSV Datasets?', query: 'How to download CSV datasets?' },
    { label: '⚙️ Custom Scenario Math', query: 'What if SPM is 4.2 and steam volume is 2400?' },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(6px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '750px',
          maxHeight: '88vh',
          height: '680px',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '16px',
          overflow: 'hidden',
          borderColor: 'rgba(56, 189, 248, 0.4)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div
          style={{
            padding: '16px 20px',
            background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.25) 0%, rgba(15, 23, 42, 0.8) 100%)',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                background: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
                padding: '8px',
                borderRadius: '10px',
                display: 'flex',
                boxShadow: '0 0 12px rgba(56, 189, 248, 0.5)',
              }}
            >
              <Bot size={22} color="#fff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 800 }}>WELLORA AI Copilot</h2>
                <span className="badge badge-cyan" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Sparkles size={10} /> Real-Time Advisor
                </span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Field Intelligence • Jodhpur Sandstone Heavy Crude (17.5° API)
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={handleClearHistory}
              className="btn-secondary"
              style={{ padding: '6px 10px', fontSize: '0.75rem' }}
              title="Clear chat history"
            >
              <Trash2 size={14} /> Clear
            </button>
            <button
              onClick={onClose}
              className="btn-secondary"
              style={{ padding: '6px 10px' }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Live Well Status Telemetry Strip */}
        <div
          style={{
            padding: '10px 20px',
            background: telemetry.rodFloatingDetected ? 'rgba(244, 63, 94, 0.15)' : 'rgba(15, 23, 42, 0.6)',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.75rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>BHT: </span>
              <strong className="font-mono glow-text-cyan">{telemetry.bottomHoleTemp}°C</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Viscosity: </span>
              <strong className="font-mono glow-text-amber">{telemetry.viscosity} cP</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>SPM: </span>
              <strong className="font-mono">{telemetry.spm} SPM</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Rod Risk: </span>
              <strong className={`font-mono ${telemetry.rodFloatingDetected ? 'glow-text-rose' : 'glow-text-emerald'}`}>
                {telemetry.rodFloatingRiskScore}%
              </strong>
            </div>
          </div>

          {telemetry.rodFloatingDetected && onAutoMitigateRodFloating && (
            <button
              onClick={onAutoMitigateRodFloating}
              className="btn-primary"
              style={{
                background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
                padding: '4px 10px',
                fontSize: '0.7rem',
                gap: '4px',
              }}
            >
              <AlertTriangle size={12} /> Auto-Mitigate (Set 3.8 SPM)
            </button>
          )}
        </div>

        {/* Messages Scroll Area */}
        <div
          style={{
            flex: 1,
            padding: '20px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              <div
                style={{
                  maxWidth: '85%',
                  padding: '12px 16px',
                  borderRadius: msg.sender === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background:
                    msg.sender === 'user'
                      ? 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)'
                      : 'rgba(30, 41, 59, 0.85)',
                  border: msg.sender === 'user' ? 'none' : '1px solid var(--border-subtle)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                }}
              >
                {msg.sender === 'ai' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px', fontSize: '0.7rem', color: 'var(--primary-cyan)', fontWeight: 700 }}>
                    <Zap size={12} /> AI ADVISOR RESPONSE
                  </div>
                )}

                <div
                  style={{
                    fontSize: '0.85rem',
                    lineHeight: '1.5',
                    whiteSpace: 'pre-wrap',
                    color: msg.sender === 'user' ? '#ffffff' : 'var(--text-main)',
                  }}
                >
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div
          style={{
            padding: '8px 16px',
            background: 'rgba(15, 23, 42, 0.5)',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            overflowX: 'auto',
          }}
        >
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', fontWeight: 600 }}>Ideas:</span>
          {suggestionChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(chip.query)}
              className="btn-secondary"
              style={{
                padding: '4px 10px',
                fontSize: '0.75rem',
                borderRadius: '20px',
                whiteSpace: 'nowrap',
                background: 'rgba(56, 189, 248, 0.1)',
                borderColor: 'rgba(56, 189, 248, 0.2)',
                color: 'var(--primary-cyan)',
              }}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Query Input Bar */}
        <div
          style={{
            padding: '14px 20px',
            background: 'rgba(15, 23, 42, 0.9)',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            placeholder="Ask AI for advice, ideas, solutions, or calculations..."
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: '10px',
              border: '1px solid var(--border-subtle)',
              background: 'rgba(30, 41, 59, 0.8)',
              color: '#ffffff',
              fontSize: '0.85rem',
              outline: 'none',
            }}
          />
          <button
            onClick={() => handleSendMessage()}
            className="btn-primary"
            style={{ padding: '10px 18px', gap: '6px', fontSize: '0.85rem' }}
          >
            <Send size={16} /> Send
          </button>
        </div>
      </div>
    </div>
  );
};
