import type { CSSParameters, ReservoirParameters, SRPParameters } from '../types';
import { DEFAULT_CSS, DEFAULT_RESERVOIR, DEFAULT_SRP } from '../services/physicsEngine';

export interface PersistentAppState {
  activeTab: string;
  simDay: number;
  isPlaying: boolean;
  res: ReservoirParameters;
  css: CSSParameters;
  srp: SRPParameters;
}

const STORAGE_KEY = 'baghewala_digital_twin_state_v1';

export function loadSavedState(): PersistentAppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        activeTab: 'TWIN',
        simDay: 14,
        isPlaying: true,
        res: DEFAULT_RESERVOIR,
        css: DEFAULT_CSS,
        srp: DEFAULT_SRP,
      };
    }
    const parsed = JSON.parse(raw);
    return {
      activeTab: typeof parsed.activeTab === 'string' ? parsed.activeTab : 'TWIN',
      simDay: typeof parsed.simDay === 'number' && parsed.simDay >= 1 && parsed.simDay <= 60 ? parsed.simDay : 14,
      isPlaying: typeof parsed.isPlaying === 'boolean' ? parsed.isPlaying : true,
      res: { ...DEFAULT_RESERVOIR, ...(parsed.res || {}) },
      css: { ...DEFAULT_CSS, ...(parsed.css || {}) },
      srp: { ...DEFAULT_SRP, ...(parsed.srp || {}) },
    };
  } catch (err) {
    console.warn('Failed to load saved digital twin state from localStorage:', err);
    return {
      activeTab: 'TWIN',
      simDay: 14,
      isPlaying: true,
      res: DEFAULT_RESERVOIR,
      css: DEFAULT_CSS,
      srp: DEFAULT_SRP,
    };
  }
}

export function saveState(state: PersistentAppState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.warn('Failed to save digital twin state to localStorage:', err);
  }
}

export function clearSavedState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn('Failed to clear digital twin state:', err);
  }
}
