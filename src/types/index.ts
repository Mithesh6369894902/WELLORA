// Data types for Baghewala Field CSS + SRP Real-Time SCADA Digital Twin

export type CSSPhase = 'INJECTION' | 'SOAK' | 'PRODUCTION' | 'IDLE';

export interface ReservoirParameters {
  apiGravity: number; // 17 - 19 °API (Baghewala Field standard: 17.5)
  depth: number; // Reservoir depth in meters (~1100 m)
  reservoirTemp: number; // Reservoir temperature in °C (46-48°C)
  reservoirPressure: number; // Reservoir pressure in bar (low ~35 bar)
  asphalteneContent: number; // % asphaltene (~14.5%)
  initialViscosity: number; // Viscosity at reservoir temp (~3200 cP)
  formationName: string; // Jodhpur Sandstone
}

export interface CSSParameters {
  steamVolume: number; // m3 (Cold Water Equivalent - CWE) e.g., 1500 - 4000 m3
  injectionPressure: number; // bar (e.g. 70-90 bar)
  injectionTemp: number; // °C (e.g. 280-310°C)
  soakTimeDays: number; // Days (e.g. 3 - 7 days)
  productionCutoffRate: number; // m3/day oil cutoff rate before next cycle
  cycleNumber: number; // Current CSS cycle (e.g., Cycle 3)
}

export interface SRPParameters {
  strokeLength: number; // inches (e.g. 86 - 120 in)
  spm: number; // Strokes Per Minute (e.g., 3.0 - 8.5 SPM)
  plungerDiameter: number; // inches (e.g., 1.75 - 2.25 in)
  rodDiameter: number; // inches (e.g., 0.875 in)
  pumpDepth: number; // meters (e.g., 1050 m)
}

export interface WellProfile {
  id: string;
  name: string;
  padLocation: string;
  coordinates: string;
  status: 'PRODUCING' | 'INJECTING' | 'SOAKING' | 'ALERT' | 'STANDBY';
  healthScore: number; // 0-100%
  res: ReservoirParameters;
  css: CSSParameters;
  srp: SRPParameters;
  simDay: number;
}

export interface RealTimeTelemetry {
  timestamp: number; // unix time ms
  isoTime: string;
  cycleDays: number; // current day in CSS cycle
  phase: CSSPhase;
  bottomHoleTemp: number; // °C
  viscosity: number; // cP
  fluidTemperature: number; // °C at wellhead
  oilRate: number; // m3/day
  waterRate: number; // m3/day
  waterCut: number; // %
  steamInjectionRate: number; // m3/day (0 when producing)
  spm: number; // SRP strokes per minute
  
  // High-frequency mechanical & electrical parameters
  instantaneousRodPosition: number; // inches (0 to strokeLength)
  instantaneousRodLoad: number; // lbs
  polishedRodPeakLoad: number; // lbs
  polishedRodMinLoad: number; // lbs
  motorPowerKw: number; // kW electrical draw
  motorCurrentAmps: number; // Amps
  casingPressureBar: number; // bar
  tubingHeadPressureBar: number; // bar
  downholePressureBar: number; // bar
  acousticFluidLevelMeters: number; // meters from surface
  vibrationRmsMmSec: number; // mm/s structural vibration
  
  // SCADA Diagnostic scores
  rodFloatingRiskScore: number; // 0 - 100%
  rodFloatingDetected: boolean;
  pumpFillagePercent: number; // %
  steamOilRatio: number; // m3 steam / m3 oil
  specificEnergyCost: number; // $/bbl oil
  netDailyMargin: number; // $ / day
  
  // Real-time communication telemetry
  samplingRateMs: number; // 100, 250, 500, 1000, 2000 ms
  packetsReceived: number;
  commLatencyMs: number;
  mqttStatus: 'CONNECTED' | 'RECONNECTING' | 'OFFLINE';
}

export interface OscilloscopeFrame {
  timeMs: number;
  rodLoadLbs: number;
  motorCurrentAmps: number;
  downholePressureBar: number;
  vibrationRms: number;
  fluidLevelM: number;
}

export interface DynamometerPoint {
  position: number; // inches (0 to Stroke Length)
  surfaceLoad: number; // lbs
  downholeLoad: number; // lbs
}

export interface DynamometerCardData {
  surfacePoints: DynamometerPoint[];
  downholePoints: DynamometerPoint[];
  anomalyType: 'NORMAL' | 'ROD_FLOATING' | 'FLUID_POUND' | 'GAS_INTERFERENCE' | 'LEAKAGE';
  confidence: number; // 0 - 100%
  cardDescription: string;
}

export interface OptimizationResult {
  recommendedSteamVolume: number; // m3
  recommendedSoakDays: number; // days
  recommendedCutoffRate: number; // m3/day
  recommendedSpmSchedule: { day: number; spm: number; targetViscosity: number }[];
  projectedOilGainPercent: number; // +%
  projectedSorReductionPercent: number; // -%
  projectedEnergySavingsPercent: number; // -%
  projectedNpvGain: number; // $ net value added
  paybackDays: number;
}

export interface ScadaAlarm {
  id: string;
  wellId: string;
  timestamp: string;
  timeMs: number;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  code: string;
  title: string;
  description: string;
  recommendedAction: string;
  mitigationSpm?: number;
  mitigationSteam?: number;
  acknowledged: boolean;
}
