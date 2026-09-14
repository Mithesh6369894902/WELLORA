import type {
  CSSParameters,
  OscilloscopeFrame,
  RealTimeTelemetry,
  ReservoirParameters,
  ScadaAlarm,
  SRPParameters,
  WellProfile,
} from '../types';
import {
  calculateBottomHoleTemp,
  calculateProductionRates,
  calculateRodLoadsAndFloatingRisk,
  calculateViscosity,
  DEFAULT_CSS,
  DEFAULT_RESERVOIR,
  DEFAULT_SRP,
} from './physicsEngine';

// Multi-Well Field Matrix for Baghewala Field, Rajasthan
export const FIELD_WELLS: WellProfile[] = [
  {
    id: 'BW-07',
    name: 'Well #BW-07 (Main Digital Twin)',
    padLocation: 'Pad Alpha-01',
    coordinates: '27°48\'12"N 72°36\'44"E',
    status: 'PRODUCING',
    healthScore: 74,
    res: { ...DEFAULT_RESERVOIR },
    css: { ...DEFAULT_CSS, steamVolume: 2500, soakTimeDays: 5, cycleNumber: 3 },
    srp: { ...DEFAULT_SRP, spm: 6.0, strokeLength: 100 },
    simDay: 18,
  },
  {
    id: 'BW-08',
    name: 'Well #BW-08 (Post-Soak Peak)',
    padLocation: 'Pad Alpha-02',
    coordinates: '27°48\'28"N 72°37\'05"E',
    status: 'PRODUCING',
    healthScore: 96,
    res: { ...DEFAULT_RESERVOIR, initialViscosity: 2900 },
    css: { ...DEFAULT_CSS, steamVolume: 3200, soakTimeDays: 6, cycleNumber: 2 },
    srp: { ...DEFAULT_SRP, spm: 4.8, strokeLength: 100 },
    simDay: 6,
  },
  {
    id: 'BW-12',
    name: 'Well #BW-12 (Cold Baseline / Viscous Drag)',
    padLocation: 'Pad Beta-04',
    coordinates: '27°47\'55"N 72°35\'58"E',
    status: 'ALERT',
    healthScore: 42,
    res: { ...DEFAULT_RESERVOIR, initialViscosity: 3600 },
    css: { ...DEFAULT_CSS, steamVolume: 1200, soakTimeDays: 3, cycleNumber: 1 },
    srp: { ...DEFAULT_SRP, spm: 7.8, strokeLength: 90 },
    simDay: 48,
  },
  {
    id: 'BW-19',
    name: 'Well #BW-19 (CSS High-Pressure Injection)',
    padLocation: 'Pad Gamma-01',
    coordinates: '27°49\'02"N 72°38\'10"E',
    status: 'INJECTING',
    healthScore: 89,
    res: { ...DEFAULT_RESERVOIR },
    css: { ...DEFAULT_CSS, steamVolume: 3800, injectionPressure: 92, cycleNumber: 4 },
    srp: { ...DEFAULT_SRP, spm: 0 },
    simDay: 2,
  },
  {
    id: 'JOD-04',
    name: 'Well #JOD-04 (Boundary Monitoring)',
    padLocation: 'Pad Jodhpur-South',
    coordinates: '27°46\'40"N 72°34\'15"E',
    status: 'STANDBY',
    healthScore: 91,
    res: { ...DEFAULT_RESERVOIR, depth: 1140 },
    css: { ...DEFAULT_CSS, steamVolume: 2000, cycleNumber: 1 },
    srp: { ...DEFAULT_SRP, spm: 3.2 },
    simDay: 25,
  },
];

// Web Audio API Synthesizer for Authentic SCADA Alarm Chimes
class ScadaAudioSynthesizer {
  private audioCtx: AudioContext | null = null;
  private isMuted: boolean = false;

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  private initContext() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
  }

  public playCriticalAlarm() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.audioCtx) return;
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const now = this.audioCtx.currentTime;
      // Dual high-pitch alert pulse (880 Hz -> 1174 Hz)
      const osc1 = this.audioCtx.createOscillator();
      const gain1 = this.audioCtx.createGain();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(880, now);
      osc1.frequency.exponentialRampToValueAtTime(1174, now + 0.15);

      gain1.gain.setValueAtTime(0.12, now);
      gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

      osc1.connect(gain1);
      gain1.connect(this.audioCtx.destination);
      osc1.start(now);
      osc1.stop(now + 0.25);

      // Second tone pulse
      const osc2 = this.audioCtx.createOscillator();
      const gain2 = this.audioCtx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(1174, now + 0.15);
      osc2.frequency.exponentialRampToValueAtTime(880, now + 0.35);

      gain2.gain.setValueAtTime(0.08, now + 0.15);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc2.connect(gain2);
      gain2.connect(this.audioCtx.destination);
      osc2.start(now + 0.15);
      osc2.stop(now + 0.4);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  public playActionConfirm() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.audioCtx) return;
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.1); // A5

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.18);
    } catch {
      // Audio catch
    }
  }
}

export const scadaAudio = new ScadaAudioSynthesizer();

/**
 * Generates continuous high-frequency telemetry stream with mechanical kinematics,
 * electrical draw, downhole wave loads, and sensor micro-jitter.
 */
export function generateRealtimeTelemetry(
  simDay: number,
  strokeAngleRad: number,
  css: CSSParameters,
  srp: SRPParameters,
  res: ReservoirParameters,
  packetCount: number,
  samplingRateMs: number
): { telemetry: RealTimeTelemetry; frame: OscilloscopeFrame } {
  const bht = calculateBottomHoleTemp(simDay, 'PRODUCTION', css, res);
  const mu = calculateViscosity(bht);
  const rates = calculateProductionRates(mu, srp);
  const rodDiag = calculateRodLoadsAndFloatingRisk(mu, srp);

  // Micro-sensor jitter (thermal noise in industrial SCADA ADCs)
  const jitterNoise = (Math.random() - 0.5) * 0.03;
  const currentBht = parseFloat((bht + jitterNoise * 2).toFixed(1));
  const currentVisc = Math.round(mu + jitterNoise * 25);

  // Instantaneous Rod Kinematics ($0$ to Stroke Length)
  // Displacement = Stroke/2 * (1 - cos(theta))
  const normalizedPosition = (1 - Math.cos(strokeAngleRad)) / 2; // 0 to 1
  const instPositionInches = parseFloat((normalizedPosition * srp.strokeLength).toFixed(1));

  // Instantaneous Load (Wave mechanics: Peak on upstroke, drop on downstroke)
  const isUpstroke = Math.sin(strokeAngleRad) >= 0;
  const strokePhase = Math.sin(strokeAngleRad); // -1 (downstroke) to +1 (upstroke)
  
  // Base static rod weight
  const baseLoad = (rodDiag.peakLoadLbs + rodDiag.minLoadLbs) / 2;
  const loadAmplitude = (rodDiag.peakLoadLbs - rodDiag.minLoadLbs) / 2;
  
  // Dynamic wave effects with viscous drag
  let instLoad = baseLoad + loadAmplitude * strokePhase;
  if (!isUpstroke && rodDiag.isRodFloating) {
    // Sharp drop in tension during downstroke floating!
    instLoad = Math.max(800, rodDiag.minLoadLbs * 0.75 + Math.sin(strokeAngleRad * 2) * 200);
  }
  // Add 1.5% SCADA load-cell sensor noise
  instLoad = Math.round(instLoad + (Math.random() - 0.5) * 120);

  // Electrical Motor Power (kW) & Current (Amps) driven by mechanical load & SPM
  const mechanicalHp = (instLoad * (srp.strokeLength / 12) * srp.spm) / 33000;
  const motorEfficiency = 0.88;
  const powerFactor = 0.85;
  const motorPowerKw = parseFloat((Math.max(1.8, (mechanicalHp * 0.7457) / motorEfficiency + 0.9)).toFixed(2));
  const motorCurrentAmps = parseFloat(((motorPowerKw * 1000) / (Math.sqrt(3) * 440 * powerFactor)).toFixed(1));

  // Pressures (Casing, Tubing, Downhole)
  const casingPressureBar = parseFloat((res.reservoirPressure * 0.42 + Math.sin(simDay * 0.1) * 1.5 + jitterNoise).toFixed(1));
  const tubingHeadPressureBar = parseFloat((casingPressureBar * 1.6 + rates.oilRate * 0.18 + jitterNoise).toFixed(1));
  const fluidColumnHeadBar = (res.depth - 120) * 0.0981 * (0.92 + rates.waterCut * 0.0008);
  const downholePressureBar = parseFloat((tubingHeadPressureBar + fluidColumnHeadBar + (isUpstroke ? -3.5 : 2.2) + jitterNoise).toFixed(1));

  // Acoustic Echo Fluid Level (meters from surface)
  const acousticFluidLevelMeters = Math.round(res.depth - (rates.oilRate / 25) * 220 + Math.sin(strokeAngleRad) * 4);

  // Structural Vibration (RMS mm/s) - surges during rod slap/floating
  const baseVib = 1.2 + (srp.spm / 10) * 1.5;
  const vibrationRmsMmSec = parseFloat((baseVib + (rodDiag.isRodFloating ? 3.4 : 0.2) + Math.random() * 0.4).toFixed(2));

  // Economics
  const bblsPerDay = rates.oilRate * 6.28981;
  const revenue = bblsPerDay * 72; // $72/bbl baseline
  const steamCostDaily = (css.steamVolume * 14.5) / 60; // 60 day cycle
  const powerCostDaily = motorPowerKw * 24 * 0.12; // $0.12/kWh
  const netDailyMargin = Math.round(revenue - steamCostDaily - powerCostDaily);
  const sor = parseFloat((css.steamVolume / Math.max(1, rates.oilRate * 60)).toFixed(2));
  const specificEnergyCost = parseFloat(((steamCostDaily + powerCostDaily) / Math.max(0.1, bblsPerDay)).toFixed(2));

  const now = Date.now();
  const isoTime = new Date(now).toISOString().substring(11, 23);

  const telemetry: RealTimeTelemetry = {
    timestamp: now,
    isoTime,
    cycleDays: simDay,
    phase: 'PRODUCTION',
    bottomHoleTemp: currentBht,
    viscosity: currentVisc,
    fluidTemperature: Math.round(currentBht * 0.52 + 18),
    oilRate: parseFloat(rates.oilRate.toFixed(1)),
    waterRate: parseFloat(rates.waterRate.toFixed(1)),
    waterCut: Math.round(rates.waterCut),
    steamInjectionRate: 0,
    spm: srp.spm,
    instantaneousRodPosition: instPositionInches,
    instantaneousRodLoad: instLoad,
    polishedRodPeakLoad: rodDiag.peakLoadLbs,
    polishedRodMinLoad: rodDiag.minLoadLbs,
    motorPowerKw,
    motorCurrentAmps,
    casingPressureBar,
    tubingHeadPressureBar,
    downholePressureBar,
    acousticFluidLevelMeters,
    vibrationRmsMmSec,
    rodFloatingRiskScore: rodDiag.floatingRiskScore,
    rodFloatingDetected: rodDiag.isRodFloating,
    pumpFillagePercent: 88,
    steamOilRatio: sor,
    specificEnergyCost,
    netDailyMargin,
    samplingRateMs,
    packetsReceived: packetCount,
    commLatencyMs: Math.round(12 + Math.random() * 8),
    mqttStatus: 'CONNECTED',
  };

  const frame: OscilloscopeFrame = {
    timeMs: now,
    rodLoadLbs: instLoad,
    motorCurrentAmps,
    downholePressureBar,
    vibrationRms: vibrationRmsMmSec,
    fluidLevelM: acousticFluidLevelMeters,
  };

  return { telemetry, frame };
}

// Initial SCADA alarms queue
export const INITIAL_ALARMS: ScadaAlarm[] = [
  {
    id: 'ALM-BW07-001',
    wellId: 'BW-07',
    timestamp: new Date().toLocaleTimeString(),
    timeMs: Date.now() - 45000,
    severity: 'CRITICAL',
    code: 'EOR-ROD-FLT-01',
    title: 'Viscous Drag Induced Rod Floating',
    description: 'Reservoir cooling front (viscosity > 1,600 cP) exceeds rod string terminal fall velocity. Compression detected on downstroke.',
    recommendedAction: 'Throttle VFD speed to ≤ 3.8 SPM or inject 300 m³ cyclic thermal slug to reheat wellbore.',
    mitigationSpm: 3.8,
    acknowledged: false,
  },
  {
    id: 'ALM-BW07-002',
    wellId: 'BW-07',
    timestamp: new Date(Date.now() - 120000).toLocaleTimeString(),
    timeMs: Date.now() - 120000,
    severity: 'WARNING',
    code: 'EOR-PMP-VIB-03',
    title: 'High Structural Beam Vibration',
    description: 'Surface walking beam RMS vibration elevated to 4.8 mm/s due to downhole rod bounce.',
    recommendedAction: 'Inspect polished rod stuffing box and adjust counterbalance weight position.',
    acknowledged: true,
  },
  {
    id: 'ALM-BW08-001',
    wellId: 'BW-08',
    timestamp: new Date(Date.now() - 360000).toLocaleTimeString(),
    timeMs: Date.now() - 360000,
    severity: 'INFO',
    code: 'EOR-CSS-CYCLE-02',
    title: 'Peak Thermal Productivity Confirmed',
    description: 'Well #BW-08 bottom-hole temperature stable at 240°C. Viscosity optimal at 28 cP.',
    recommendedAction: 'Maintain current production setpoint (4.8 SPM).',
    acknowledged: true,
  },
];
