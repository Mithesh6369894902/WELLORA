import { useEffect, useRef, useState } from 'react';
import { Navbar } from './components/Navbar';
import { DigitalTwinVisualizer } from './components/DigitalTwinVisualizer';
import { LiveOscilloscope } from './components/LiveOscilloscope';
import { DynamometerCardView } from './components/DynamometerCardView';
import { ScadaAlarmMatrix } from './components/ScadaAlarmMatrix';
import { CssOptimizationPanel } from './components/CssOptimizationPanel';
import { SrpTuningPanel } from './components/SrpTuningPanel';
import { WhatIfSandbox } from './components/WhatIfSandbox';
import { EconomicDashboard } from './components/EconomicDashboard';
import { DataCenterView } from './components/DataCenterView';
import { AiAdvisorBox } from './components/AiAdvisorBox';

import type {
  CSSParameters,
  OscilloscopeFrame,
  ReservoirParameters,
  ScadaAlarm,
  SRPParameters,
  WellProfile,
} from './types';
import { solveIntegratedOptimization } from './services/optimizationSolver';
import {
  FIELD_WELLS,
  generateRealtimeTelemetry,
  INITIAL_ALARMS,
  scadaAudio,
} from './services/realtimeStreamEngine';
import { Activity, AlertTriangle, Bot, Cpu, Database, DollarSign, Flame, Radio, Sliders, Sparkles } from 'lucide-react';

import { loadSavedState, saveState, clearSavedState } from './utils/storage';

export function App() {
  const initialState = loadSavedState();
  const [activeTab, setActiveTab] = useState<string>(initialState.activeTab || 'TWIN');
  const [simDay, setSimDay] = useState<number>(initialState.simDay || 18);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isAiAdvisorOpen, setIsAiAdvisorOpen] = useState<boolean>(false);

  // Multi-Well Field State
  const [selectedWellId, setSelectedWellId] = useState<string>('BW-07');
  const [res, setRes] = useState<ReservoirParameters>(initialState.res || FIELD_WELLS[0].res);
  const [css, setCss] = useState<CSSParameters>(initialState.css || FIELD_WELLS[0].css);
  const [srp, setSrp] = useState<SRPParameters>(initialState.srp || FIELD_WELLS[0].srp);

  // SCADA Streaming & Sampling Settings
  const [samplingRateMs, setSamplingRateMs] = useState<number>(250); // 250ms default
  const [packetsReceived, setPacketsReceived] = useState<number>(1420);
  const [alarms, setAlarms] = useState<ScadaAlarm[]>(INITIAL_ALARMS);
  const [isAutoGovernorActive, setIsAutoGovernorActive] = useState<boolean>(true);

  // High-Frequency Kinematic & Waveform State
  const strokeAngleRef = useRef<number>(0);
  const [oscilloscopeBuffer, setOscilloscopeBuffer] = useState<OscilloscopeFrame[]>([]);
  
  // Real-Time Telemetry Generator
  const [telemetry, setTelemetry] = useState(() => {
    const { telemetry: t } = generateRealtimeTelemetry(
      simDay,
      0,
      css,
      srp,
      res,
      packetsReceived,
      samplingRateMs
    );
    return t;
  });

  // Handle Multi-Well Selection
  const handleSelectWell = (well: WellProfile) => {
    setSelectedWellId(well.id);
    setRes(well.res);
    setCss(well.css);
    setSrp(well.srp);
    setSimDay(well.simDay);
    scadaAudio.playActionConfirm();
  };

  // High-Frequency Real-Time Telemetry Ticker Loop
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      // Kinematic angular velocity based on SPM
      strokeAngleRef.current += (srp.spm * 2 * Math.PI * (samplingRateMs / 1000)) / 60;
      if (strokeAngleRef.current > Math.PI * 200) {
        strokeAngleRef.current = strokeAngleRef.current % (Math.PI * 2);
      }

      setPacketsReceived((p) => p + 1);

      const { telemetry: nextTel, frame } = generateRealtimeTelemetry(
        simDay,
        strokeAngleRef.current,
        css,
        srp,
        res,
        packetsReceived + 1,
        samplingRateMs
      );

      setTelemetry(nextTel);

      // Append to rolling oscilloscope buffer (max 100 frames)
      setOscilloscopeBuffer((prev) => [...prev.slice(-99), frame]);

      // Trigger audio alarm if unacknowledged critical alarm occurs
      if (nextTel.rodFloatingDetected) {
        const hasUnack = alarms.some((a) => a.id === 'ALM-BW07-001' && !a.acknowledged);
        if (hasUnack && Math.random() < 0.05) {
          scadaAudio.playCriticalAlarm();
        }
      }
    }, samplingRateMs);

    return () => clearInterval(interval);
  }, [isPlaying, simDay, srp, css, res, samplingRateMs, packetsReceived, alarms]);

  // Day Cycle Ticker (Advances 1 cycle day every 6 seconds when playing)
  useEffect(() => {
    if (!isPlaying) return;
    const dayInterval = setInterval(() => {
      setSimDay((prev) => (prev >= 60 ? 1 : prev + 1));
    }, 6000);

    return () => clearInterval(dayInterval);
  }, [isPlaying]);

  // Autonomous Closed-Loop AI Governor: auto-mitigates if enabled
  useEffect(() => {
    if (isAutoGovernorActive && telemetry.rodFloatingDetected && srp.spm > 4.0) {
      const timer = setTimeout(() => {
        setSrp((prev) => ({ ...prev, spm: 3.8 }));
        scadaAudio.playActionConfirm();
        // Acknowledge the alarm
        setAlarms((prev) =>
          prev.map((a) => (a.code === 'EOR-ROD-FLT-01' ? { ...a, acknowledged: true } : a))
        );
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isAutoGovernorActive, telemetry.rodFloatingDetected, srp.spm]);

  // Integrated Optimization Solver
  const optimizationResult = solveIntegratedOptimization(css, srp, res);

  // Continuously persist state changes
  useEffect(() => {
    saveState({ activeTab, simDay, isPlaying, res, css, srp });
  }, [activeTab, simDay, isPlaying, res, css, srp]);

  const resetSim = () => {
    setSimDay(1);
    strokeAngleRef.current = 0;
  };

  const resetAllToDefaults = () => {
    clearSavedState();
    const defaultWell = FIELD_WELLS[0];
    setSelectedWellId(defaultWell.id);
    setRes(defaultWell.res);
    setCss(defaultWell.css);
    setSrp(defaultWell.srp);
    setSimDay(18);
    setIsPlaying(true);
    setActiveTab('TWIN');
  };

  const handleAcknowledgeAlarm = (id: string) => {
    setAlarms((prev) => prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a)));
    scadaAudio.playActionConfirm();
  };

  const handleApplyMitigation = (alarm: ScadaAlarm) => {
    if (alarm.mitigationSpm) {
      setSrp((prev) => ({ ...prev, spm: alarm.mitigationSpm! }));
    }
    if (alarm.mitigationSteam) {
      setCss((prev) => ({ ...prev, steamVolume: alarm.mitigationSteam! }));
    }
    handleAcknowledgeAlarm(alarm.id);
  };

  const unacknowledgedCriticalCount = alarms.filter((a) => a.severity === 'CRITICAL' && !a.acknowledged).length;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', width: '100%', padding: '0 20px 40px 20px' }}>
        {/* SCADA Mission Control Navbar Header */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          simDay={simDay}
          setSimDay={setSimDay}
          resetSim={resetSim}
          resetAllToDefaults={resetAllToDefaults}
          alertCount={unacknowledgedCriticalCount}
          rodFloatingDetected={telemetry.rodFloatingDetected}
          selectedWellId={selectedWellId}
          onSelectWell={handleSelectWell}
          samplingRateMs={samplingRateMs}
          setSamplingRateMs={setSamplingRateMs}
          packetsReceived={packetsReceived}
          commLatencyMs={telemetry.commLatencyMs}
          onOpenAiAdvisor={() => setIsAiAdvisorOpen(true)}
        />

        {/* Global Active Alert Banner if Rod Floating detected */}
        {telemetry.rodFloatingDetected && (
          <div
            className="glass-panel"
            style={{
              marginBottom: '20px',
              padding: '14px 20px',
              borderColor: 'rgba(255, 45, 85, 0.6)',
              background: 'rgba(255, 45, 85, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <AlertTriangle size={22} color="var(--accent-rose)" />
              <div>
                <strong style={{ color: 'var(--accent-rose)', fontSize: '0.95rem' }}>
                  CRITICAL SCADA EVENT: Viscous Drag Induced Rod Floating on Well #{selectedWellId}
                </strong>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-main)', marginTop: '2px' }}>
                  Reservoir thermal decay front ({telemetry.bottomHoleTemp}°C / {telemetry.viscosity} cP) exceeds natural rod fall velocity at {telemetry.spm} SPM.
                  {isAutoGovernorActive && ' (Autonomous Closed-Loop AI Governor is mitigating...)'}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => setIsAiAdvisorOpen(true)}
                className="btn-secondary"
                style={{ padding: '7px 14px', fontSize: '0.8rem', gap: '6px' }}
              >
                <Bot size={14} /> Ask AI Co-Pilot
              </button>
              <button
                onClick={() => {
                  setSrp({ ...srp, spm: 3.8 });
                  setActiveTab('DYNAMO');
                  scadaAudio.playActionConfirm();
                }}
                className="btn-primary"
                style={{
                  background: 'linear-gradient(135deg, #ff2d55 0%, #e11d48 100%)',
                  padding: '7px 16px',
                  fontSize: '0.8rem',
                  border: '1px solid rgba(255, 45, 85, 0.5)',
                }}
              >
                Manual Override: Dispatch 3.8 SPM
              </button>
            </div>
          </div>
        )}

        {/* Tab Views */}
        <main>
          {activeTab === 'TWIN' && (
            <DigitalTwinVisualizer telemetry={telemetry} srp={srp} res={res} simDay={simDay} />
          )}

          {activeTab === 'OSCILLO' && (
            <LiveOscilloscope telemetry={telemetry} buffer={oscilloscopeBuffer} />
          )}

          {activeTab === 'DYNAMO' && (
            <DynamometerCardView telemetry={telemetry} srp={srp} />
          )}

          {activeTab === 'ALARMS' && (
            <ScadaAlarmMatrix
              alarms={alarms}
              onAcknowledgeAlarm={handleAcknowledgeAlarm}
              onApplyMitigation={handleApplyMitigation}
              isAutoGovernorActive={isAutoGovernorActive}
              setIsAutoGovernorActive={setIsAutoGovernorActive}
            />
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

      {/* Floating Bottom-Right Quick AI Co-Pilot Button */}
      <button
        onClick={() => setIsAiAdvisorOpen(true)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: 'linear-gradient(135deg, #ff7a00 0%, #e65100 100%)',
          color: '#050608',
          border: '1px solid rgba(255, 122, 0, 0.6)',
          borderRadius: '50px',
          padding: '12px 22px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '0.9rem',
          fontWeight: 800,
          cursor: 'pointer',
          boxShadow: '0 8px 30px rgba(255, 122, 0, 0.5)',
          zIndex: 9000,
          transition: 'transform 0.2s ease, boxShadow 0.2s ease',
        }}
      >
        <Bot size={22} color="#050608" />
        <span>SCADA AI Co-Pilot</span>
        <Sparkles size={14} color="#050608" />
      </button>

      {/* Mobile Bottom App Navigation Bar */}
      <nav className="mobile-bottom-nav">
        <button onClick={() => setActiveTab('TWIN')} className={`mobile-nav-item ${activeTab === 'TWIN' ? 'active' : ''}`}>
          <Cpu size={18} />
          <span>3D Twin</span>
        </button>
        <button onClick={() => setActiveTab('OSCILLO')} className={`mobile-nav-item ${activeTab === 'OSCILLO' ? 'active' : ''}`}>
          <Radio size={18} />
          <span>Waveform</span>
        </button>
        <button onClick={() => setActiveTab('DYNAMO')} className={`mobile-nav-item ${activeTab === 'DYNAMO' ? 'active' : ''}`}>
          <Activity size={18} />
          <span>Dynamo</span>
        </button>
        <button onClick={() => setActiveTab('ALARMS')} className={`mobile-nav-item ${activeTab === 'ALARMS' ? 'active' : ''}`}>
          <AlertTriangle size={18} />
          <span>Alarms</span>
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
          <span>AI</span>
        </button>
      </nav>

      {/* Interactive AI Co-Pilot Modal */}
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
        onSetSpm={(spm) => {
          setSrp((prev) => ({ ...prev, spm }));
          setActiveTab('DYNAMO');
        }}
        onSwitchTab={(tab) => {
          setActiveTab(tab);
        }}
      />
    </div>
  );
}

export default App;
