import React, { useEffect, useRef, useState } from 'react';
import type { DynamometerCardData, RealTimeTelemetry, SRPParameters } from '../types';
import { generateDynamometerCard } from '../services/physicsEngine';
import { Activity, Cpu } from 'lucide-react';

interface DynamometerProps {
  telemetry: RealTimeTelemetry;
  srp: SRPParameters;
}

export const DynamometerCardView: React.FC<DynamometerProps> = ({ telemetry, srp }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedAnomaly, setSelectedAnomaly] = useState<'AUTO' | 'ROD_FLOATING' | 'FLUID_POUND' | 'NORMAL'>('AUTO');

  const cardData: DynamometerCardData = generateDynamometerCard(
    telemetry.viscosity,
    srp,
    selectedAnomaly === 'AUTO' ? undefined : selectedAnomaly
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 50; x < width - 20; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 20);
      ctx.lineTo(x, height - 40);
      ctx.stroke();
    }
    for (let y = 20; y < height - 40; y += 40) {
      ctx.beginPath();
      ctx.moveTo(50, y);
      ctx.lineTo(width - 20, y);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(50, 20);
    ctx.lineTo(50, height - 40);
    ctx.lineTo(width - 20, height - 40);
    ctx.stroke();

    // Axis Labels
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px Outfit, sans-serif';
    ctx.fillText('0 in', 45, height - 20);
    ctx.fillText(`${srp.strokeLength} in`, width - 50, height - 20);
    ctx.fillText('Position (inches)', (width - 50) / 2, height - 10);

    ctx.fillText('12,000 lbs', 5, 30);
    ctx.fillText('0 lbs', 15, height - 40);

    // Map function for position -> X and load -> Y
    const mapX = (posInches: number) => 50 + (posInches / srp.strokeLength) * (width - 70);
    const mapY = (loadLbs: number) => height - 40 - (loadLbs / 12000) * (height - 60);

    // Render Surface Dynamometer Card Loop
    if (cardData.surfacePoints.length > 0) {
      ctx.beginPath();
      ctx.moveTo(mapX(cardData.surfacePoints[0].position), mapY(cardData.surfacePoints[0].surfaceLoad));

      for (let i = 1; i < cardData.surfacePoints.length; i++) {
        ctx.lineTo(mapX(cardData.surfacePoints[i].position), mapY(cardData.surfacePoints[i].surfaceLoad));
      }
      ctx.closePath();

      // Card stroke color based on anomaly
      let strokeColor = '#38bdf8'; // Cyan
      let fillColor = 'rgba(56, 189, 248, 0.1)';
      if (cardData.anomalyType === 'ROD_FLOATING') {
        strokeColor = '#f43f5e'; // Rose
        fillColor = 'rgba(244, 63, 94, 0.15)';
      } else if (cardData.anomalyType === 'FLUID_POUND') {
        strokeColor = '#f59e0b'; // Amber
        fillColor = 'rgba(245, 158, 11, 0.15)';
      }

      ctx.fillStyle = fillColor;
      ctx.fill();
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 3;
      ctx.stroke();
    }

    // Render Downhole Pump Card Loop (inner shape)
    if (cardData.downholePoints.length > 0) {
      ctx.beginPath();
      ctx.moveTo(mapX(cardData.downholePoints[0].position), mapY(cardData.downholePoints[0].downholeLoad));

      for (let i = 1; i < cardData.downholePoints.length; i++) {
        ctx.lineTo(mapX(cardData.downholePoints[i].position), mapY(cardData.downholePoints[i].downholeLoad));
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.8)';
      ctx.setLineDash([4, 4]);
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }, [cardData, srp]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '20px' }}>
      {/* Canvas Plot Column */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={18} color="var(--primary-cyan)" />
              Real-Time Polished Rod Dynamometer Card Plot
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Surface Load vs. Position (Solid) & Downhole Pump Card (Dashed Green)
            </p>
          </div>

          {/* Test Pattern Selector */}
          <div style={{ display: 'flex', gap: '6px', background: 'rgba(15, 23, 42, 0.6)', padding: '4px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
            {(['AUTO', 'NORMAL', 'ROD_FLOATING', 'FLUID_POUND'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setSelectedAnomaly(mode)}
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  background: selectedAnomaly === mode ? 'var(--primary-cyan)' : 'transparent',
                  color: selectedAnomaly === mode ? '#090d16' : 'var(--text-muted)',
                }}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
          <canvas
            ref={canvasRef}
            width={680}
            height={440}
            style={{ width: '100%', height: '440px', background: '#090d16', display: 'block' }}
          />
        </div>
      </div>

      {/* AI Anomaly Classifier & Diagnostics Column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Classification Result Card */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <Cpu size={22} color="var(--primary-cyan)" />
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>AI Dynamometer Classifier</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Convolutional Neural Network Diagnostic Engine</span>
            </div>
          </div>

          <div
            style={{
              padding: '16px',
              borderRadius: '12px',
              background:
                cardData.anomalyType === 'ROD_FLOATING'
                  ? 'rgba(244, 63, 94, 0.15)'
                  : cardData.anomalyType === 'FLUID_POUND'
                  ? 'rgba(245, 158, 11, 0.15)'
                  : 'rgba(16, 185, 129, 0.15)',
              border: `1px solid ${
                cardData.anomalyType === 'ROD_FLOATING'
                  ? 'rgba(244, 63, 94, 0.4)'
                  : cardData.anomalyType === 'FLUID_POUND'
                  ? 'rgba(245, 158, 11, 0.4)'
                  : 'rgba(16, 185, 129, 0.4)'
              }`,
              marginBottom: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>PATTERNS DETECTED</span>
              <span className="font-mono" style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-cyan)' }}>
                {cardData.confidence}% Confidence
              </span>
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.01em', marginBottom: '6px' }}>
              {cardData.anomalyType.replace('_', ' ')}
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-main)', lineHeight: '1.4' }}>
              {cardData.cardDescription}
            </p>
          </div>

          {/* Diagnostic Action Recommendation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Automated Mitigation Plan
            </h4>

            {cardData.anomalyType === 'ROD_FLOATING' && (
              <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', fontSize: '0.8rem' }}>
                <strong style={{ color: 'var(--accent-rose)', display: 'block', marginBottom: '4px' }}>
                  Action 1: Reduce SRP Speed
                </strong>
                Lower SPM from {srp.spm} to {(srp.spm - 2.0).toFixed(1)} SPM to match fluid downstroke descent rate.
              </div>
            )}

            {cardData.anomalyType === 'FLUID_POUND' && (
              <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', fontSize: '0.8rem' }}>
                <strong style={{ color: 'var(--accent-amber)', display: 'block', marginBottom: '4px' }}>
                  Action 1: Adjust Pump Fillage
                </strong>
                Reduce pumping rate to allow fluid level rebuild in wellbore.
              </div>
            )}

            <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', fontSize: '0.8rem' }}>
              <strong style={{ color: 'var(--primary-cyan)', display: 'block', marginBottom: '4px' }}>
                Action 2: Thermal Schedule
              </strong>
              Trigger dynamic hot water flush or evaluate next CSS injection cycle.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
