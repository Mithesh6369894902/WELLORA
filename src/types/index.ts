// Data types for Baghewala Field CSS + SRP Digital Twin

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

export interface RealTimeTelemetry {
  timestamp: number; // unix time
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
  polishedRodPeakLoad: number; // lbs
  polishedRodMinLoad: number; // lbs
  rodFloatingRiskScore: number; // 0 - 100%
  rodFloatingDetected: boolean;
  pumpFillagePercent: number; // %
  steamOilRatio: number; // m3 steam / m3 oil
  specificEnergyCost: number; // $/bbl oil
  netDailyMargin: number; // $ / day
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

export interface AlertMessage {
  id: string;
  timestamp: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  title: string;
  description: string;
  actionRequired: string;
}
