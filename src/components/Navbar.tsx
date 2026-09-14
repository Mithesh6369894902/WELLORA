import React, { useEffect, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  Bot,
  Cpu,
  Database,
  DollarSign,
  Flame,
  Globe,
  Pause,
  Play,
  Radio,
  RotateCcw,
  Sliders,
  Sparkles,
  Wifi,
  Zap,
} from 'lucide-react';
import type { WellProfile } from '../types';
import { FIELD_WELLS } from '../services/realtimeStreamEngine';

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
  selectedWellId: string;
  onSelectWell: (well: WellProfile) => void;
  samplingRateMs: number;
  setSamplingRateMs: (rate: number) => void;
  packetsReceived: number;
  commLatencyMs: number;
  onOpenAiAdvisor?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isPlaying,
  setIsPlaying,
  simDay,
  setSimDay,
  resetSim,
  alertCount,
  rodFloatingDetected,
  selectedWellId,
  onSelectWell,
  samplingRateMs,
  setSamplingRateMs,
  packetsReceived,
  commLatencyMs,
  onOpenAiAdvisor,
}) => {
  const [utcTime, setUtcTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().slice(17, 25) + ' UTC');
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const tabs = [
    { id: 'TWIN', label: '3D Digital Twin', icon: Cpu },
    { id: 'OSCILLO', label: 'Live Waveform', icon: Radio },
    { id: 'DYNAMO', label: 'Dynamometer', icon: Activity },
    { id: 'ALARMS', label: 'SCADA Alarms', icon: AlertTriangle, badge: alertCount > 0 ? alertCount : undefined },
    { id: 'CSS', label: 'CSS Optimizer', icon: Flame },
    { id: 'SANDBOX', label: 'What-If Lab', icon: Sliders },
    { id: 'ECONOMIC', label: 'ROI & OPEX', icon: DollarSign },
    { id: 'DATASET', label: 'Data Center', icon: Database },
  ];

  return (
    <header style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {/* Top SCADA Industrial Status Strip */}
      <div
        className="glass-panel"
        style={{
          borderRadius: '12px',
          padding: '6px 16px',
          background: 'rgba(6, 10, 18, 0.85)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '0.75rem',
          borderBottom: '1px solid rgba(0, 240, 255, 0.2)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary-cyan)' }}>
            <Globe size={13} />
            <strong className="font-mono">BAGHEWALA FIELD, RAJASTHAN</strong>
            <span style={{ color: 'var(--text-dim)' }}>[27°48'N 72°36'E]</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Wifi size={13} color="var(--accent-emerald)" />
            <span style={{ color: 'var(--text-muted)' }}>MQTT BROKER:</span>
            <span className="badge badge-emerald" style={{ padding: '2px 6px', fontSize: '0.65rem' }}>
              ONLINE ({commLatencyMs}ms)
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: 'var(--text-muted)' }}>RX PACKETS:</span>
            <span className="font-mono" style={{ color: '#fff' }}>
              {packetsReceived.toLocaleString()}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Sampling Rate Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: 'var(--text-muted)' }}>STREAM RATE:</span>
            <select
              value={samplingRateMs}
              onChange={(e) => setSamplingRateMs(Number(e.target.value))}
              style={{
                background: '#0f172a',
                color: 'var(--primary-cyan)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '6px',
                padding: '2px 8px',
                fontSize: '0.7rem',
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
              }}
            >
              <option value={100}>100 ms (Fast)</option>
              <option value={250}>250 ms (Normal)</option>
              <option value={500}>500 ms</option>
              <option value={1000}>1.0 sec</option>
              <option value={2000}>2.0 sec</option>
            </select>
          </div>

          {/* Real-time UTC clock */}
          <div className="font-mono glow-text-cyan" style={{ fontWeight: 700 }}>
            {utcTime}
          </div>
        </div>
      </div>

      {/* Main Navbar Bar */}
      <div
        className="glass-panel"
        style={{
          borderRadius: '16px',
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        {/* Brand & Multi-Well Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              background: 'linear-gradient(135deg, #ff7a00 0%, #ff5500 100%)',
              padding: '10px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 16px rgba(255, 122, 0, 0.45)',
            }}
          >
            <Zap size={22} color="#050608" />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  background: 'linear-gradient(90deg, #fff, #ffaa44)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                WELLORA
              </h1>
              <span className="badge badge-cyan">SCADA CORE</span>
              {rodFloatingDetected && (
                <span className="badge badge-rose">
                  <AlertTriangle size={12} /> CRITICAL
                </span>
              )}
            </div>

            {/* Well Selector Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>ACTIVE WELL:</span>
              <select
                value={selectedWellId}
                onChange={(e) => {
                  const target = FIELD_WELLS.find((w) => w.id === e.target.value);
                  if (target) onSelectWell(target);
                }}
                style={{
                  background: 'rgba(14, 16, 20, 0.9)',
                  color: '#fff',
                  border: '1px solid rgba(255, 122, 0, 0.4)',
                  borderRadius: '6px',
                  padding: '2px 8px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                {FIELD_WELLS.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.name} — {w.status} ({w.healthScore}% HP)
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Navigation Tabs (Desktop) */}
        <nav
          className="desktop-tabs"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: 'rgba(5, 6, 8, 0.8)',
            padding: '4px',
            borderRadius: '12px',
            border: '1px solid var(--border-subtle)',
          }}
        >
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
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '0.8rem',
                  fontWeight: isActive ? 800 : 500,
                  cursor: 'pointer',
                  background: isActive ? 'linear-gradient(135deg, #ff7a00 0%, #e65100 100%)' : 'transparent',
                  color: isActive ? '#050608' : 'var(--text-muted)',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 4px 14px rgba(255, 122, 0, 0.35)' : 'none',
                }}
              >
                <Icon size={15} color={isActive ? '#050608' : 'var(--text-muted)'} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    style={{
                      background: 'var(--accent-rose)',
                      color: '#fff',
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      padding: '1px 5px',
                      borderRadius: '10px',
                    }}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Advanced Real-Time Simulation & Cycle Days Timeline Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {/* Advanced Cycle Timeline Module */}
          <div
            className="glass-panel"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '6px 14px',
              borderRadius: '12px',
              background: 'rgba(6, 10, 18, 0.85)',
              border: '1px solid rgba(0, 240, 255, 0.3)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
            }}
          >
            {/* Live Stream Pulse Toggle Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              style={{
                background: isPlaying
                  ? 'linear-gradient(135deg, rgba(0, 255, 136, 0.2) 0%, rgba(16, 185, 129, 0.35) 100%)'
                  : 'linear-gradient(135deg, rgba(255, 184, 0, 0.2) 0%, rgba(245, 158, 11, 0.35) 100%)',
                color: isPlaying ? 'var(--accent-emerald)' : 'var(--accent-amber)',
                border: `1px solid ${isPlaying ? 'rgba(0, 255, 136, 0.5)' : 'rgba(255, 184, 0, 0.5)'}`,
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '0.75rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: isPlaying ? '0 0 12px rgba(0, 255, 136, 0.25)' : 'none',
              }}
              title={isPlaying ? 'Pause Continuous Real-Time Ticker' : 'Resume Continuous Real-Time Ticker'}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: isPlaying ? 'var(--accent-emerald)' : 'var(--accent-amber)',
                  boxShadow: isPlaying ? '0 0 8px var(--accent-emerald)' : 'none',
                  display: 'inline-block',
                  animation: isPlaying ? 'pulse-live 1.5s infinite' : 'none',
                }}
              />
              {isPlaying ? <Pause size={12} /> : <Play size={12} />}
              <span>{isPlaying ? 'STREAMING' : 'PAUSED'}</span>
            </button>

            {/* Vertical Separator */}
            <div style={{ width: '1px', height: '28px', background: 'rgba(255, 255, 255, 0.1)' }} />

            {/* Cycle Day Navigator & Phase Pill */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {/* Step Back Button */}
              <button
                onClick={() => setSimDay(Math.max(1, simDay - 1))}
                title="Previous Day (-1)"
                style={{
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid var(--border-subtle)',
                  color: simDay > 1 ? 'var(--primary-cyan)' : 'var(--text-dim)',
                  borderRadius: '6px',
                  padding: '4px 6px',
                  cursor: simDay > 1 ? 'pointer' : 'default',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '0.75rem',
                }}
                disabled={simDay <= 1}
              >
                ◀
              </button>

              {/* Day Display & Phase Readout */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '95px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)', fontWeight: 700 }}>DAY</span>
                  <span className="font-mono glow-text-cyan" style={{ fontSize: '1.1rem', fontWeight: 800 }}>
                    {simDay}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>/ 60</span>
                </div>

                {/* Sub-phase text */}
                <div style={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {simDay <= 3 ? (
                    <span style={{ color: 'var(--accent-rose)' }}>🔥 INJECTION</span>
                  ) : simDay <= 8 ? (
                    <span style={{ color: 'var(--accent-amber)' }}>⏳ SOAK PHASE</span>
                  ) : (
                    <span style={{ color: 'var(--accent-emerald)' }}>🛢️ PRODUCING</span>
                  )}
                </div>
              </div>

              {/* Step Forward Button */}
              <button
                onClick={() => setSimDay(Math.min(60, simDay + 1))}
                title="Next Day (+1)"
                style={{
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid var(--border-subtle)',
                  color: simDay < 60 ? 'var(--primary-cyan)' : 'var(--text-dim)',
                  borderRadius: '6px',
                  padding: '4px 6px',
                  cursor: simDay < 60 ? 'pointer' : 'default',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '0.75rem',
                }}
                disabled={simDay >= 60}
              >
                ▶
              </button>
            </div>

            {/* Interactive Timeline Progress Slider with Phase Markers */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', width: '130px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', color: 'var(--text-dim)', fontWeight: 600 }}>
                <span>D1</span>
                <span>D15</span>
                <span>D30</span>
                <span>D60</span>
              </div>
              <input
                type="range"
                min="1"
                max="60"
                value={simDay}
                onChange={(e) => setSimDay(Number(e.target.value))}
                style={{
                  width: '100%',
                  height: '5px',
                  cursor: 'pointer',
                  accentColor: 'var(--primary-cyan)',
                }}
                title={`Drag to scrub cycle timeline (Currently Day ${simDay})`}
              />
            </div>

            {/* Quick Phase Jump Preset Chips */}
            <div style={{ display: 'flex', gap: '4px' }}>
              <button
                onClick={() => setSimDay(1)}
                className={`tab-btn-mini ${simDay === 1 ? 'active-rose' : ''}`}
                style={{ padding: '3px 6px', fontSize: '0.65rem' }}
                title="Jump to Injection Peak (Day 1)"
              >
                D1
              </button>
              <button
                onClick={() => setSimDay(6)}
                className={`tab-btn-mini ${simDay === 6 ? 'active-amber' : ''}`}
                style={{ padding: '3px 6px', fontSize: '0.65rem' }}
                title="Jump to Post-Soak Peak (Day 6)"
              >
                D6
              </button>
              <button
                onClick={() => setSimDay(18)}
                className={`tab-btn-mini ${simDay === 18 ? 'active-cyan' : ''}`}
                style={{ padding: '3px 6px', fontSize: '0.65rem' }}
                title="Jump to Mid-Cycle Cooling (Day 18 - Rod Floating Anomaly)"
              >
                D18
              </button>
              <button
                onClick={() => setSimDay(45)}
                className={`tab-btn-mini ${simDay === 45 ? 'active-purple' : ''}`}
                style={{ padding: '3px 6px', fontSize: '0.65rem' }}
                title="Jump to Late Cycle (Day 45)"
              >
                D45
              </button>
            </div>

            {/* Reset Cycle Timeline Button */}
            <button
              onClick={resetSim}
              title="Reset Timeline to Day 1"
              style={{
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-muted)',
                borderRadius: '6px',
                padding: '5px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <RotateCcw size={13} />
            </button>
          </div>

          {/* AI Advisor Button */}
          <button
            onClick={onOpenAiAdvisor}
            className="btn-primary"
            style={{
              padding: '9px 16px',
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'linear-gradient(135deg, #0284c7 0%, #00f0ff 100%)',
              color: '#060a12',
              fontWeight: 800,
            }}
          >
            <Bot size={16} />
            <span>AI Copilot</span>
            <Sparkles size={12} />
          </button>
        </div>
      </div>
    </header>
  );
};
