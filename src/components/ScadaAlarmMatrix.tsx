import React, { useState } from 'react';
import type { ScadaAlarm } from '../types';
import { AlertCircle, AlertTriangle, Check, CheckCircle2, Info, ShieldAlert, Volume2, VolumeX, Zap } from 'lucide-react';
import { scadaAudio } from '../services/realtimeStreamEngine';

interface ScadaAlarmMatrixProps {
  alarms: ScadaAlarm[];
  onAcknowledgeAlarm: (id: string) => void;
  onApplyMitigation: (alarm: ScadaAlarm) => void;
  isAutoGovernorActive: boolean;
  setIsAutoGovernorActive: (active: boolean) => void;
}

export const ScadaAlarmMatrix: React.FC<ScadaAlarmMatrixProps> = ({
  alarms,
  onAcknowledgeAlarm,
  onApplyMitigation,
  isAutoGovernorActive,
  setIsAutoGovernorActive,
}) => {
  const [filter, setFilter] = useState<'ALL' | 'CRITICAL' | 'WARNING' | 'INFO'>('ALL');
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(scadaAudio.getMuted());

  const handleToggleAudio = () => {
    const next = !isAudioMuted;
    setIsAudioMuted(next);
    scadaAudio.setMuted(next);
  };

  const filteredAlarms = alarms.filter((a) => {
    if (filter === 'ALL') return true;
    return a.severity === filter;
  });

  const criticalCount = alarms.filter((a) => a.severity === 'CRITICAL' && !a.acknowledged).length;
  const warningCount = alarms.filter((a) => a.severity === 'WARNING' && !a.acknowledged).length;

  return (
    <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              background: criticalCount > 0 ? 'rgba(255, 45, 85, 0.2)' : 'rgba(0, 255, 136, 0.2)',
              padding: '10px',
              borderRadius: '12px',
              border: `1px solid ${criticalCount > 0 ? 'rgba(255, 45, 85, 0.4)' : 'rgba(0, 255, 136, 0.4)'}`,
            }}
          >
            <ShieldAlert size={24} color={criticalCount > 0 ? 'var(--accent-rose)' : 'var(--accent-emerald)'} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>SCADA Operational Alarm & Event Matrix</h2>
              {criticalCount > 0 && <span className="badge badge-rose">{criticalCount} ACTIVE CRITICAL</span>}
              {warningCount > 0 && <span className="badge badge-amber">{warningCount} WARNING</span>}
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Real-time IEC-62682 industrial alarm management & automated anomaly mitigation dispatch
            </p>
          </div>
        </div>

        {/* Global Controls: Audio Alarm Toggle & Autonomous Closed-Loop Switch */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={handleToggleAudio}
            className="btn-secondary"
            style={{ padding: '8px 14px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}
            title={isAudioMuted ? 'Unmute SCADA acoustic alarm' : 'Mute SCADA acoustic alarm'}
          >
            {isAudioMuted ? <VolumeX size={16} color="var(--text-muted)" /> : <Volume2 size={16} color="var(--primary-cyan)" />}
            <span>{isAudioMuted ? 'Muted' : 'Audio Alarm ON'}</span>
          </button>

          <button
            onClick={() => {
              const next = !isAutoGovernorActive;
              setIsAutoGovernorActive(next);
              scadaAudio.playActionConfirm();
            }}
            style={{
              padding: '8px 16px',
              borderRadius: '10px',
              border: `1px solid ${isAutoGovernorActive ? 'rgba(0, 255, 136, 0.4)' : 'rgba(255, 255, 255, 0.1)'}`,
              background: isAutoGovernorActive
                ? 'linear-gradient(135deg, rgba(0, 255, 136, 0.2) 0%, rgba(16, 185, 129, 0.3) 100%)'
                : 'rgba(15, 23, 42, 0.6)',
              color: isAutoGovernorActive ? 'var(--accent-emerald)' : 'var(--text-muted)',
              fontSize: '0.8rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              boxShadow: isAutoGovernorActive ? '0 0 15px rgba(0, 255, 136, 0.2)' : 'none',
            }}
          >
            <Zap size={16} />
            <span>AI Autonomous Closed-Loop: {isAutoGovernorActive ? 'ENGAGED' : 'MANUAL'}</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
        <button
          onClick={() => setFilter('ALL')}
          className={`tab-btn-mini ${filter === 'ALL' ? 'active-cyan' : ''}`}
        >
          All Alarms ({alarms.length})
        </button>
        <button
          onClick={() => setFilter('CRITICAL')}
          className={`tab-btn-mini ${filter === 'CRITICAL' ? 'active-rose' : ''}`}
        >
          Critical ({alarms.filter((a) => a.severity === 'CRITICAL').length})
        </button>
        <button
          onClick={() => setFilter('WARNING')}
          className={`tab-btn-mini ${filter === 'WARNING' ? 'active-amber' : ''}`}
        >
          Warnings ({alarms.filter((a) => a.severity === 'WARNING').length})
        </button>
        <button
          onClick={() => setFilter('INFO')}
          className={`tab-btn-mini ${filter === 'INFO' ? 'active-emerald' : ''}`}
        >
          Advisory ({alarms.filter((a) => a.severity === 'INFO').length})
        </button>
      </div>

      {/* Alarms List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '420px', overflowY: 'auto' }}>
        {filteredAlarms.length === 0 ? (
          <div style={{ padding: '30px', textAlign: 'center', color: 'var(--text-dim)' }}>
            <CheckCircle2 size={32} color="var(--accent-emerald)" style={{ margin: '0 auto 8px auto' }} />
            <p>No active alarms matching selected filter.</p>
          </div>
        ) : (
          filteredAlarms.map((alarm) => {
            const isCrit = alarm.severity === 'CRITICAL';
            const isWarn = alarm.severity === 'WARNING';

            return (
              <div
                key={alarm.id}
                style={{
                  background: isCrit
                    ? 'rgba(255, 45, 85, 0.08)'
                    : isWarn
                    ? 'rgba(255, 184, 0, 0.08)'
                    : 'rgba(15, 23, 42, 0.6)',
                  border: `1px solid ${
                    isCrit ? 'rgba(255, 45, 85, 0.4)' : isWarn ? 'rgba(255, 184, 0, 0.3)' : 'var(--border-subtle)'
                  }`,
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '16px',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', gap: '12px', flex: 1 }}>
                  <div style={{ marginTop: '2px' }}>
                    {isCrit ? (
                      <AlertCircle size={20} color="var(--accent-rose)" />
                    ) : isWarn ? (
                      <AlertTriangle size={20} color="var(--accent-amber)" />
                    ) : (
                      <Info size={20} color="var(--primary-cyan)" />
                    )}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                        [{alarm.timestamp}]
                      </span>
                      <span className="font-mono badge badge-cyan" style={{ fontSize: '0.7rem' }}>
                        {alarm.code}
                      </span>
                      <span className="badge badge-amber" style={{ fontSize: '0.7rem' }}>
                        {alarm.wellId}
                      </span>
                      <strong style={{ fontSize: '0.95rem', color: '#fff' }}>{alarm.title}</strong>
                      {alarm.acknowledged && (
                        <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>
                          <Check size={10} /> ACKNOWLEDGED
                        </span>
                      )}
                    </div>

                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                      {alarm.description}
                    </p>

                    <div style={{ fontSize: '0.8rem', color: 'var(--primary-cyan)', marginTop: '4px' }}>
                      <strong>Protocol Action:</strong> {alarm.recommendedAction}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '160px' }}>
                  {alarm.mitigationSpm && (
                    <button
                      onClick={() => onApplyMitigation(alarm)}
                      className="btn-primary"
                      style={{
                        padding: '8px 12px',
                        fontSize: '0.75rem',
                        background: 'linear-gradient(135deg, #0284c7 0%, #00f0ff 100%)',
                        color: '#000',
                        fontWeight: 700,
                      }}
                    >
                      <Zap size={14} /> Dispatch {alarm.mitigationSpm} SPM
                    </button>
                  )}

                  {!alarm.acknowledged && (
                    <button
                      onClick={() => onAcknowledgeAlarm(alarm.id)}
                      className="btn-secondary"
                      style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                    >
                      <Check size={14} /> Acknowledge
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
