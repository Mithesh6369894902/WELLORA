import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { DigitalTwinVisualizer } from './components/DigitalTwinVisualizer';
import { DynamometerCardView } from './components/DynamometerCardView';
import { CssOptimizationPanel } from './components/CssOptimizationPanel';
import { SrpTuningPanel } from './components/SrpTuningPanel';
import { WhatIfSandbox } from './components/WhatIfSandbox';
import { EconomicDashboard } from './components/EconomicDashboard';
import { DataCenterView } from './components/DataCenterView';
import { AiAdvisorBox } from './components/AiAdvisorBox';

import type { CSSParameters, ReservoirParameters, SRPParameters } from './types';
import { DEFAULT_CSS, DEFAULT_SRP, generateTelemetryForDay } from './services/physicsEngine';
import { solveIntegratedOptimization } from './services/optimizationSolver';
import { AlertTriangle, Bot, Sparkles, Cpu, Activity, Flame, Sliders, DollarSign, Database } from 'lucide-react';

import { loadSavedState, saveState, clearSavedState } from './utils/storage';

export function App() {
  const initialState = loadSavedState();
  const [activeTab, setActiveTab] = useState<string>(initialState.activeTab);
  const [simDay, setSimDay] = useState<number>(initialState.simDay);
  const [isPlaying, setIsPlaying] = useState<boolean>(initialState.isPlaying);
  const [isAiAdvisorOpen, setIsAiAdvisorOpen] = useState<boolean>(false);

  // Core Physical State
  const [res] = useState<ReservoirParameters>(initialState.res);
  const [css, setCss] = useState<CSSParameters>(initialState.css);
  const [srp, setSrp] = useState<SRPParameters>(initialState.srp);

  // Telemetry & AI Optimization Output
  const telemetry = generateTelemetryForDay(simDay, css, srp, res);
  const optimizationResult = solveIntegratedOptimization(css, srp, res);

  // Continuously persist state changes
  useEffect(() => {
    saveState({ activeTab, simDay, isPlaying, res, css, srp });
  }, [activeTab, simDay, isPlaying, res, css, srp]);

  // Simulation Ticker
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setSimDay((prev) => (prev >= 60 ? 1 : prev + 1));
    }, 2500); // Step every 2.5 seconds

    return () => clearInterval(interval);
  }, [isPlaying]);

  const resetSim = () => {
    setSimDay(1);
    setIsPlaying(false);
  };

  const resetAllToDefaults = () => {
    clearSavedState();
    setCss(DEFAULT_CSS);
    setSrp(DEFAULT_SRP);
    setSimDay(14);
    setIsPlaying(true);
    setActiveTab('TWIN');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', padding: '0 20px 40px 20px' }}>
        {/* Navigation Bar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          simDay={simDay}
          setSimDay={setSimDay}
          resetSim={resetSim}
          resetAllToDefaults={resetAllToDefaults}
          alertCount={telemetry.rodFloatingDetected ? 1 : 0}
          rodFloatingDetected={telemetry.rodFloatingDetected}
          onOpenAiAdvisor={() => setIsAiAdvisorOpen(true)}
        />

        {/* Global Active Alert Banner if Rod Floating detected */}
        {telemetry.rodFloatingDetected && (
          <div
            className="glass-panel"
            style={{
              marginBottom: '20px',
              padding: '14px 20px',
              borderColor: 'rgba(244, 63, 94, 0.6)',
              background: 'rgba(244, 63, 94, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <AlertTriangle size={20} color="var(--accent-rose)" />
              <div>
                <strong style={{ color: 'var(--accent-rose)', fontSize: '0.9rem' }}>
                  CRITICAL ALERT: Rod Floating & Viscous Drag Detected on Well #BW-07
                </strong>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-main)', marginTop: '2px' }}>
                  Crude viscosity at reservoir temperature cooling front ({telemetry.viscosity} cP) exceeds natural rod downstroke descent velocity at {telemetry.spm} SPM.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => setIsAiAdvisorOpen(true)}
                className="btn-secondary"
                style={{ padding: '6px 12px', fontSize: '0.8rem', gap: '6px' }}
              >
                <Bot size={14} /> Ask AI Advisor
              </button>
              <button
                onClick={() => {
                  setSrp({ ...srp, spm: 3.8 });
                  setActiveTab('DYNAMO');
                }}
                className="btn-primary"
                style={{ background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)', padding: '6px 14px', fontSize: '0.8rem' }}
              >
                Auto-Mitigate (Set 3.8 SPM)
              </button>
            </div>
          </div>
        )}

        {/* Tab Views */}
        <main>
          {activeTab === 'TWIN' && (
            <DigitalTwinVisualizer telemetry={telemetry} srp={srp} res={res} simDay={simDay} />
          )}

          {activeTab === 'DYNAMO' && (
            <DynamometerCardView telemetry={telemetry} srp={srp} />
          )}

          {activeTab === 'CSS' && (
            <CssOptimizationPanel
              css={css}
              setCss={setCss}
              res={res}
              telemetry={telemetry}
              optimizationResult={optimizationResult}
            />
          )}

          {activeTab === 'DYNAMO_TUNER' || activeTab === 'SRP' ? (
            <SrpTuningPanel
              srp={srp}
              setSrp={setSrp}
              telemetry={telemetry}
              optimizationResult={optimizationResult}
            />
          ) : null}

          {activeTab === 'SANDBOX' && (
            <WhatIfSandbox css={css} srp={srp} res={res} />
          )}

          {activeTab === 'ECONOMIC' && (
            <EconomicDashboard telemetry={telemetry} optimizationResult={optimizationResult} />
          )}

          {activeTab === 'DATASET' && (
            <DataCenterView />
          )}
        </main>
      </div>

      {/* Floating Bottom-Right Quick AI Advisor Button */}
      <button
        onClick={() => setIsAiAdvisorOpen(true)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
          color: '#ffffff',
          border: 'none',
          borderRadius: '50px',
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '0.9rem',
          fontWeight: 700,
          cursor: 'pointer',
          boxShadow: '0 8px 25px rgba(2, 132, 199, 0.5)',
          zIndex: 9000,
          transition: 'transform 0.2s ease, boxShadow 0.2s ease',
        }}
      >
        <Bot size={22} color="#ffffff" />
        <span>Ask AI Advisor</span>
        <Sparkles size={14} color="var(--primary-cyan)" />
      </button>

      {/* Mobile Bottom App Navigation Bar (Shown on Smartphones & Mobile Devices) */}
      <nav className="mobile-bottom-nav">
        <button onClick={() => setActiveTab('TWIN')} className={`mobile-nav-item ${activeTab === 'TWIN' ? 'active' : ''}`}>
          <Cpu size={18} />
          <span>3D Twin</span>
        </button>
        <button onClick={() => setActiveTab('DYNAMO')} className={`mobile-nav-item ${activeTab === 'DYNAMO' ? 'active' : ''}`}>
          <Activity size={18} />
          <span>Dynamo</span>
        </button>
        <button onClick={() => setActiveTab('CSS')} className={`mobile-nav-item ${activeTab === 'CSS' ? 'active' : ''}`}>
          <Flame size={18} />
          <span>CSS</span>
        </button>
        <button onClick={() => setActiveTab('SANDBOX')} className={`mobile-nav-item ${activeTab === 'SANDBOX' ? 'active' : ''}`}>
          <Sliders size={18} />
          <span>What-If</span>
        </button>
        <button onClick={() => setActiveTab('ECONOMIC')} className={`mobile-nav-item ${activeTab === 'ECONOMIC' ? 'active' : ''}`}>
          <DollarSign size={18} />
          <span>ROI</span>
        </button>
        <button onClick={() => setActiveTab('DATASET')} className={`mobile-nav-item ${activeTab === 'DATASET' ? 'active' : ''}`}>
          <Database size={18} />
          <span>Data</span>
        </button>
        <button onClick={() => setIsAiAdvisorOpen(true)} className="mobile-nav-item" style={{ color: 'var(--primary-cyan)' }}>
          <Bot size={18} />
          <span>AI Assistant</span>
        </button>
      </nav>

      {/* Interactive AI Advisor Modal */}
      <AiAdvisorBox
        isOpen={isAiAdvisorOpen}
        onClose={() => setIsAiAdvisorOpen(false)}
        telemetry={telemetry}
        css={css}
        srp={srp}
        res={res}
        onAutoMitigateRodFloating={() => {
          setSrp({ ...srp, spm: 3.8 });
          setActiveTab('DYNAMO');
          setIsAiAdvisorOpen(false);
        }}
      />
    </div>
  );
}

export default App;

