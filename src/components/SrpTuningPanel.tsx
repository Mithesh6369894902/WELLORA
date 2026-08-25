import React, { useState } from 'react';
import type { OptimizationResult, RealTimeTelemetry, SRPParameters } from '../types';
import { Activity, Cpu } from 'lucide-react';

interface SrpPanelProps {
  srp: SRPParameters;
  setSrp: React.Dispatch<React.SetStateAction<SRPParameters>>;
  telemetry: RealTimeTelemetry;
  optimizationResult: OptimizationResult;
}

export const SrpTuningPanel: React.FC<SrpPanelProps> = ({
  srp,
  setSrp,
  telemetry,
  optimizationResult,
}) => {
  const [autoTunerActive, setAutoTunerActive] = useState<boolean>(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Banner */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <Activity size={24} color="var(--primary-cyan)" />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Sucker Rod Pump (SRP) Continuous Operational Tuner</h2>
              {autoTunerActive ? (
                <span className="badge badge-emerald">AI AUTO-TUNER ACTIVE</span>
              ) : (
                <span className="badge badge-amber">MANUAL OVERRIDE</span>
              )}
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Real-time speed regulation, viscous downstroke drag mitigation, and rod floating elimination
            </p>
          </div>

          <button
            onClick={() => setAutoTunerActive(!autoTunerActive)}
            className={autoTunerActive ? 'btn-primary' : 'btn-secondary'}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Cpu size={16} />
            {autoTunerActive ? 'Auto-Tuner: Enabled' : 'Enable Auto-Tuner'}
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* SRP Controls */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '16px' }}>
            Operational Speed & Geometry Controls
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Strokes Per Minute (SPM)</span>
                <span className="font-mono glow-text-cyan" style={{ fontWeight: 700 }}>
                  {srp.spm} SPM
                </span>
              </div>
              <input
                type="range"
                min="2.0"
                max="9.0"
                step="0.1"
                disabled={autoTunerActive}
                value={srp.spm}
                onChange={(e) => setSrp({ ...srp, spm: Number(e.target.value) })}
              />
              {autoTunerActive && (
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', marginTop: '4px', display: 'block' }}>
                  ⚡ Controlled by Digital Twin based on current crude viscosity ({telemetry.viscosity} cP)
                </span>
              )}
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Polished Rod Stroke Length</span>
                <span className="font-mono" style={{ fontWeight: 600 }}>
                  {srp.strokeLength} inches
                </span>
              </div>
              <input
                type="range"
                min="60"
                max="120"
                step="5"
                value={srp.strokeLength}
                onChange={(e) => setSrp({ ...srp, strokeLength: Number(e.target.value) })}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Pump Plunger Diameter</span>
                <span className="font-mono" style={{ fontWeight: 600 }}>
                  {srp.plungerDiameter} inches
                </span>
              </div>
              <input
                type="range"
                min="1.25"
                max="2.75"
                step="0.25"
                value={srp.plungerDiameter}
                onChange={(e) => setSrp({ ...srp, plungerDiameter: Number(e.target.value) })}
              />
            </div>
          </div>
        </div>

        {/* Rod Floating Prevention Monitor */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '16px' }}>
            Mechanical Reliability & Rod Floating Monitor
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '14px', borderRadius: '10px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                Peak Upstroke Load / Min Downstroke Load
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700 }} className="font-mono">
                {telemetry.polishedRodPeakLoad} lbs / {telemetry.polishedRodMinLoad} lbs
              </div>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '14px', borderRadius: '10px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                Rod Tension Downstroke Margin
              </div>
              <div
                style={{ fontSize: '1.1rem', fontWeight: 700 }}
                className={telemetry.rodFloatingDetected ? 'glow-text-rose' : 'glow-text-emerald'}
              >
                {telemetry.rodFloatingDetected
                  ? 'CRITICAL SLACK - Rod Buckling Risk'
                  : 'STABLE TENSION (+1,850 lbs Margin)'}
              </div>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '14px', borderRadius: '10px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                Estimated Rod Fatigue Life Expectancy
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary-cyan)' }}>
                4.2 Years (Optimal Dynamic Speed Profile)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Speed Schedule Table */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '16px' }}>
          AI Recommended SPM Schedule Over CSS Cycle Days
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left', color: 'var(--text-muted)' }}>
                <th style={{ padding: '10px' }}>Cycle Day</th>
                <th style={{ padding: '10px' }}>Cooling Reservoir Viscosity</th>
                <th style={{ padding: '10px' }}>Target SPM</th>
                <th style={{ padding: '10px' }}>Downstroke Status</th>
                <th style={{ padding: '10px' }}>Pump Fillage</th>
              </tr>
            </thead>
            <tbody>
              {optimizationResult.recommendedSpmSchedule.slice(0, 7).map((item) => (
                <tr key={item.day} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '10px', fontWeight: 600 }}>Day {item.day}</td>
                  <td style={{ padding: '10px' }} className="font-mono">
                    {item.targetViscosity} cP
                  </td>
                  <td style={{ padding: '10px' }} className="font-mono glow-text-cyan">
                    {item.spm} SPM
                  </td>
                  <td style={{ padding: '10px' }}>
                    {item.targetViscosity > 1500 ? (
                      <span className="badge badge-amber">LOW SPEED SAFE</span>
                    ) : (
                      <span className="badge badge-emerald">HIGH EFFICIENCY</span>
                    )}
                  </td>
                  <td style={{ padding: '10px' }} className="font-mono">
                    94.5%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
