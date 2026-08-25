import React, { useEffect, useRef } from 'react';
import type { RealTimeTelemetry, ReservoirParameters, SRPParameters } from '../types';
import { Thermometer, Droplets, Activity, Layers } from 'lucide-react';

interface DigitalTwinProps {
  telemetry: RealTimeTelemetry;
  srp: SRPParameters;
  res: ReservoirParameters;
  simDay: number;
}

export const DigitalTwinVisualizer: React.FC<DigitalTwinProps> = ({
  telemetry,
  srp,
  res,
  simDay,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let strokeAngle = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;

      // 1. Draw Background & Geological Layers
      // Top Surface Layer (Desert Sand - Baghewala Rajasthan)
      ctx.fillStyle = '#1c1917';
      ctx.fillRect(0, 0, width, 120);

      // Subsurface Formations
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 120, width, height - 260);

      // Reservoir Layer: Jodhpur Sandstone (bottom formation)
      const reservoirTopY = height - 160;
      const resGradient = ctx.createLinearGradient(0, reservoirTopY, 0, height);
      resGradient.addColorStop(0, '#1e1b4b');
      resGradient.addColorStop(1, '#0f172a');
      ctx.fillStyle = resGradient;
      ctx.fillRect(0, reservoirTopY, width, 160);

      // Sandstone Texture dots
      ctx.fillStyle = 'rgba(217, 119, 6, 0.15)';
      for (let i = 0; i < 80; i++) {
        const x = (i * 27) % width;
        const y = reservoirTopY + 20 + ((i * 13) % 120);
        ctx.fillRect(x, y, 3, 3);
      }

      // Reservoir Formation Label
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.font = '12px Outfit, sans-serif';
      ctx.fillText(`Jodhpur Sandstone Formation (Depth: ${res.depth}m, T_res: ${res.reservoirTemp}°C)`, 20, reservoirTopY + 25);

      // 2. Draw Heated Reservoir Plume / Thermal Front (CSS effect)
      const thermalRadius = Math.max(20, 180 * Math.pow(telemetry.bottomHoleTemp / 295, 1.5));
      const wellCenterX = width / 2;
      const plumeY = reservoirTopY + 70;

      const plumeGrad = ctx.createRadialGradient(
        wellCenterX,
        plumeY,
        5,
        wellCenterX,
        plumeY,
        thermalRadius
      );

      // Color changes based on Bottom Hole Temp
      if (telemetry.bottomHoleTemp > 180) {
        plumeGrad.addColorStop(0, 'rgba(249, 115, 22, 0.7)'); // Hot Orange
        plumeGrad.addColorStop(0.5, 'rgba(234, 88, 12, 0.35)');
        plumeGrad.addColorStop(1, 'rgba(234, 88, 12, 0)');
      } else if (telemetry.bottomHoleTemp > 90) {
        plumeGrad.addColorStop(0, 'rgba(245, 158, 11, 0.6)'); // Amber
        plumeGrad.addColorStop(0.6, 'rgba(245, 158, 11, 0.25)');
        plumeGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');
      } else {
        plumeGrad.addColorStop(0, 'rgba(56, 189, 248, 0.4)'); // Cooled Cyan
        plumeGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
      }

      ctx.fillStyle = plumeGrad;
      ctx.beginPath();
      ctx.arc(wellCenterX, plumeY, thermalRadius, 0, Math.PI * 2);
      ctx.fill();

      // Thermal Front boundary ring
      ctx.strokeStyle = telemetry.bottomHoleTemp > 120 ? 'rgba(249, 115, 22, 0.5)' : 'rgba(56, 189, 248, 0.3)';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      // 3. Draw Wellbore & Tubing String
      const wellWidth = 24;
      const tubingWidth = 12;
      ctx.fillStyle = 'rgba(30, 41, 59, 0.9)';
      ctx.fillRect(wellCenterX - wellWidth / 2, 70, wellWidth, height - 130);

      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 3;
      ctx.strokeRect(wellCenterX - wellWidth / 2, 70, wellWidth, height - 130);

      // Inner Tubing
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(wellCenterX - tubingWidth / 2, 70, tubingWidth, height - 130);

      // 4. Calculate SRP Beam Motion & Polished Rod Displacement
      // Speed driven by SPM
      strokeAngle += (srp.spm * 0.05);
      const rodDisplacement = Math.sin(strokeAngle); // -1 to +1

      // Surface Pumping Unit (Samson Post, Walking Beam, Horsehead)
      const postX = wellCenterX - 110;
      const postY = 110;
      const beamPivotY = 40;
      const beamAngle = rodDisplacement * 0.15; // beam rocking angle

      // Samson Post Structure (A-Frame)
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(postX - 30, postY);
      ctx.lineTo(postX, beamPivotY + 20);
      ctx.lineTo(postX + 30, postY);
      ctx.stroke();

      // Walking Beam
      ctx.save();
      ctx.translate(postX, beamPivotY + 20);
      ctx.rotate(beamAngle);

      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(-70, 0);
      ctx.lineTo(110, 0);
      ctx.stroke();

      // Horsehead at right end of beam
      const horseheadX = 110;
      ctx.fillStyle = '#0284c7';
      ctx.beginPath();
      ctx.arc(horseheadX, -10, 20, 0, Math.PI / 2);
      ctx.lineTo(horseheadX, 0);
      ctx.fill();
      ctx.restore();

      // Polished Rod connected to Horsehead
      const rodTopY = 40 + rodDisplacement * 18;
      const polishedRodBottomY = height - 130 + rodDisplacement * 15;

      // Sucker Rod String
      ctx.strokeStyle = telemetry.rodFloatingDetected ? '#f43f5e' : '#f59e0b';
      ctx.lineWidth = telemetry.rodFloatingDetected ? 4 : 3;

      // Draw rod string (if floating, draw slight buckling wobble curve!)
      ctx.beginPath();
      ctx.moveTo(wellCenterX, rodTopY);

      if (telemetry.rodFloatingDetected && Math.sin(strokeAngle) < 0) {
        // Rod buckling on downstroke!
        const midY = (rodTopY + polishedRodBottomY) / 2;
        const wobbleX = wellCenterX + Math.sin(strokeAngle * 3) * 6;
        ctx.quadraticCurveTo(wobbleX, midY, wellCenterX, polishedRodBottomY);
      } else {
        ctx.lineTo(wellCenterX, polishedRodBottomY);
      }
      ctx.stroke();

      // 5. Downhole Pump Plunger & Valves
      const plungerY = polishedRodBottomY;
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(wellCenterX - 5, plungerY - 15, 10, 30);

      // Valves
      const isUpstroke = Math.cos(strokeAngle) >= 0;
      ctx.fillStyle = isUpstroke ? '#10b981' : '#f43f5e';
      // Traveling valve (on plunger)
      ctx.beginPath();
      ctx.arc(wellCenterX, plungerY - 18, 4, 0, Math.PI * 2);
      ctx.fill();

      // Standing valve (at bottom of tubing)
      ctx.fillStyle = !isUpstroke ? '#10b981' : '#f43f5e';
      ctx.beginPath();
      ctx.arc(wellCenterX, height - 135, 5, 0, Math.PI * 2);
      ctx.fill();

      // 6. Upward Crude Oil Fluid Flow Particles inside Tubing
      ctx.fillStyle = 'rgba(245, 158, 11, 0.7)';
      for (let i = 0; i < 8; i++) {
        const py = ((strokeAngle * 25 + i * 40) % (height - 200)) + 80;
        ctx.beginPath();
        ctx.arc(wellCenterX, height - py, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [telemetry, srp, res, simDay]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>
      {/* Canvas Digital Twin Column */}
      <div className="glass-panel" style={{ padding: '20px', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Layers size={18} color="var(--primary-cyan)" />
              Baghewala Well #BW-07 Live Wellbore Schematic
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Real-time surface pumping unit motion & downhole thermal steam plume
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <span className="badge badge-cyan">Depth: 1,100 m</span>
            <span className="badge badge-amber">API: 17.5°</span>
          </div>
        </div>

        <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
          <canvas
            ref={canvasRef}
            width={720}
            height={520}
            style={{ width: '100%', height: '520px', background: '#090d16', display: 'block' }}
          />

          {/* Canvas Floating HUD Badges */}
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              background: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(8px)',
              padding: '12px 16px',
              borderRadius: '12px',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>RESERVOIR THERMAL FRONT</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Thermometer size={16} color="var(--accent-amber)" />
              <span style={{ fontSize: '1rem', fontWeight: 700 }} className="font-mono glow-text-cyan">
                {telemetry.bottomHoleTemp} °C
              </span>
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Crude Viscosity: <strong style={{ color: '#fff' }}>{telemetry.viscosity} cP</strong>
            </div>
          </div>

          <div
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(8px)',
              padding: '12px 16px',
              borderRadius: '12px',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>POLISHED ROD LOADS</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={16} color="var(--primary-cyan)" />
              <span style={{ fontSize: '1rem', fontWeight: 700 }} className="font-mono">
                {telemetry.polishedRodPeakLoad} / {telemetry.polishedRodMinLoad} lbs
              </span>
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              SRP Speed: <strong style={{ color: '#fff' }}>{telemetry.spm} SPM</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Telemetry & Anomaly Diagnostics Column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Rod Floating Status Box */}
        <div
          className="glass-panel"
          style={{
            padding: '20px',
            borderColor: telemetry.rodFloatingDetected ? 'rgba(244, 63, 94, 0.5)' : 'rgba(16, 185, 129, 0.3)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>ROD FLOATING DIAGNOSIS</span>
            {telemetry.rodFloatingDetected ? (
              <span className="badge badge-rose">CRITICAL</span>
            ) : (
              <span className="badge badge-emerald">NORMAL TENSION</span>
            )}
          </div>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 800 }} className={telemetry.rodFloatingDetected ? 'glow-text-rose' : 'glow-text-emerald'}>
              {telemetry.rodFloatingRiskScore}%
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Downstroke Viscous Drag Risk Index</div>
          </div>

          <div style={{ height: '8px', background: 'rgba(51, 65, 85, 0.6)', borderRadius: '4px', overflow: 'hidden', marginBottom: '12px' }}>
            <div
              style={{
                height: '100%',
                width: `${telemetry.rodFloatingRiskScore}%`,
                background: telemetry.rodFloatingDetected
                  ? 'linear-gradient(90deg, #f59e0b, #f43f5e)'
                  : 'linear-gradient(90deg, #10b981, #38bdf8)',
                transition: 'width 0.3s ease',
              }}
            />
          </div>

          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
            {telemetry.rodFloatingDetected
              ? 'High crude viscosity at reservoir cooling front is causing viscous drag to overcome rod string gravity on downstroke.'
              : 'Rod string operates within safe mechanical tension boundaries. Downstroke drag is well below buoyancy limits.'}
          </p>
        </div>

        {/* Live Key Metrics Cards */}
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Live Well Metrics
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Droplets size={16} color="var(--accent-amber)" />
              <span style={{ fontSize: '0.85rem' }}>Oil Production</span>
            </div>
            <span className="font-mono glow-text-emerald" style={{ fontSize: '1.1rem', fontWeight: 700 }}>
              {telemetry.oilRate} m³/day
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Thermometer size={16} color="var(--accent-rose)" />
              <span style={{ fontSize: '0.85rem' }}>Wellhead Fluid Temp</span>
            </div>
            <span className="font-mono" style={{ fontSize: '1rem', fontWeight: 600 }}>
              {telemetry.fluidTemperature} °C
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={16} color="var(--primary-cyan)" />
              <span style={{ fontSize: '0.85rem' }}>Pump Fillage</span>
            </div>
            <span className="font-mono glow-text-cyan" style={{ fontSize: '1rem', fontWeight: 600 }}>
              {telemetry.pumpFillagePercent}%
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Layers size={16} color="var(--accent-purple)" />
              <span style={{ fontSize: '0.85rem' }}>Steam-Oil Ratio (SOR)</span>
            </div>
            <span className="font-mono" style={{ fontSize: '1rem', fontWeight: 600 }}>
              {telemetry.steamOilRatio} m³/m³
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
