import React from 'react';
import {
  Activity,
  AlertTriangle,
  Bot,
  Cpu,
  Database,
  Flame,
  Play,
  Pause,
  RotateCcw,
  Sliders,
  Sparkles,
  DollarSign,
  Zap,
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  simDay: number;
  setSimDay: (day: number) => void;
  resetSim: () => void;
  resetAllToDefaults: () => void;
  alertCount: number;
  rodFloatingDetected: boolean;
  onOpenAiAdvisor?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isPlaying,
  setIsPlaying,
  simDay,
  resetSim,
  resetAllToDefaults,
  rodFloatingDetected,
  onOpenAiAdvisor,
}) => {
  const tabs = [
    { id: 'TWIN', label: '3D Digital Twin', icon: Cpu },
    { id: 'DYNAMO', label: 'Dynamometer & SRP', icon: Activity },
    { id: 'CSS', label: 'CSS Thermal Optimizer', icon: Flame },
    { id: 'SANDBOX', label: 'What-If Lab', icon: Sliders },
    { id: 'ECONOMIC', label: 'Economic ROI', icon: DollarSign },
    { id: 'DATASET', label: 'Data Center', icon: Database },
  ];

  return (
    <header className="glass-panel" style={{ borderRadius: '0 0 16px 16px', padding: '12px 24px', marginBottom: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        {/* Title & Field Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              background: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
              padding: '10px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(56, 189, 248, 0.4)',
            }}
          >
            <Zap size={24} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', background: 'linear-gradient(90deg, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                WELLORA AI
              </h1>
              <span className="badge badge-cyan">DUAL OPTIMIZER</span>
              <span className="badge badge-emerald" title="Application state is saved continuously to persistent storage">AUTO-PERSISTED</span>
              {rodFloatingDetected && (
                <span className="badge badge-rose">
                  <AlertTriangle size={12} /> ROD FLOATING DETECTED
                </span>
              )}
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Well-to-Surface Optimization System • Jodhpur Sandstone Heavy Crude (17.5° API)
            </p>
          </div>
        </div>

        {/* Navigation Tabs (Desktop) */}
        <nav className="desktop-tabs" style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(15, 23, 42, 0.6)', padding: '4px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '0.85rem',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  background: isActive ? 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)' : 'transparent',
                  color: isActive ? '#fff' : 'var(--text-muted)',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 4px 12px rgba(2, 132, 199, 0.3)' : 'none',
                }}
              >
                <Icon size={16} color={isActive ? '#fff' : 'var(--text-muted)'} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Live Simulation Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {onOpenAiAdvisor && (
            <button
              onClick={onOpenAiAdvisor}
              className="btn-primary"
              style={{
                background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                padding: '8px 14px',
                fontSize: '0.85rem',
                gap: '8px',
                boxShadow: '0 0 15px rgba(56, 189, 248, 0.4)',
              }}
            >
              <Bot size={18} />
              <span>AI Advisor</span>
              <Sparkles size={12} color="var(--primary-cyan)" />
            </button>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(15, 23, 42, 0.6)', padding: '6px 14px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>CYCLE DAY:</span>
            <span className="font-mono glow-text-cyan" style={{ fontSize: '1rem', fontWeight: 700 }}>
              {simDay} / 60
            </span>
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="btn-primary"
            style={{ padding: '8px 14px', fontSize: '0.85rem' }}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            {isPlaying ? 'PAUSE' : 'LIVE TICK'}
          </button>

          <button
            onClick={resetSim}
            className="btn-secondary"
            style={{ padding: '8px 12px' }}
            title="Reset Simulation to Day 1"
          >
            <RotateCcw size={16} />
          </button>

          <button
            onClick={resetAllToDefaults}
            className="btn-secondary"
            style={{ padding: '6px 10px', fontSize: '0.75rem', color: 'var(--text-muted)' }}
            title="Clear persistent storage & reset all parameters to default"
          >
            Reset Defaults
          </button>
        </div>
      </div>
    </header>
  );
};
