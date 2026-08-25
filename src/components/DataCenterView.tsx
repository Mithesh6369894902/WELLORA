import React, { useState } from 'react';
import { Database, Download, FileSpreadsheet } from 'lucide-react';

interface DatasetMeta {
  id: string;
  name: string;
  filename: string;
  description: string;
  recordCount: number;
  format: string;
  category: string;
}

export const DataCenterView: React.FC = () => {
  const [selectedDataset, setSelectedDataset] = useState<string>('RESERVOIR');

  const datasets: DatasetMeta[] = [
    {
      id: 'RESERVOIR',
      name: 'Baghewala Reservoir & Formation Core Data',
      filename: 'Baghewala_Reservoir_Core_Data.csv',
      description: 'Physical parameters of Jodhpur Sandstone formation, 17.5° API crude gravity, 14.5% asphaltene, 47°C ambient temperature, 35 bar reservoir pressure, and SRP pump geometry.',
      recordCount: 19,
      format: 'CSV / JSON',
      category: 'Geological & Fluids',
    },
    {
      id: 'CSS_TELEMETRY',
      name: 'CSS Thermal Injection & Cooling Cycle Time-Series',
      filename: 'CSS_Thermal_Cycle_Telemetry.csv',
      description: '60-day historical time-series trajectory tracking steam volume injection, soak period, bottom-hole temperature decay, crude viscosity, oil/water rates, and Steam-Oil Ratio (SOR).',
      recordCount: 19,
      format: 'CSV / Time-Series',
      category: 'Thermal EOR Telemetry',
    },
    {
      id: 'DYNAMOMETER',
      name: 'SRP Dynamometer Card & Rod Floating Telemetry',
      filename: 'SRP_Dynamometer_Card_Time_Series.csv',
      description: 'High-frequency load vs displacement points for surface polished rod and downhole pump, containing labeled rod floating anomaly instances under high viscous drag.',
      recordCount: 19,
      format: 'CSV / High-Freq Load',
      category: 'Artificial Lift Telemetry',
    },
    {
      id: 'ANDRADE_CURVE',
      name: 'Andrade Crude Viscosity-Temperature Calibration Matrix',
      filename: 'Andrade_Viscosity_Temperature_Curve.csv',
      description: 'Calibrated empirical Andrade model dataset correlating heavy crude viscosity (cP) from 30°C to 300°C for Baghewala crude.',
      recordCount: 11,
      format: 'CSV / Empirical Model',
      category: 'Thermodynamic Calibration',
    },
  ];

  const handleDownload = (filename: string) => {
    const link = document.createElement('a');
    link.href = `/datasets/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadAll = () => {
    datasets.forEach((ds) => {
      handleDownload(ds.filename);
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header Banner */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <Database size={24} color="var(--primary-cyan)" />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Digital Twin Data Center & Empirical Datasets</h2>
              <span className="badge badge-cyan">Standard Field Dataset</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Explore, inspect, and download the exact historical & physics-calibrated datasets powering the Baghewala Field Digital Twin
            </p>
          </div>

          <button onClick={handleDownloadAll} className="btn-primary" style={{ gap: '8px' }}>
            <Download size={16} />
            Download All Datasets (CSV Bundle)
          </button>
        </div>
      </div>

      {/* Dataset Selection Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {datasets.map((ds) => (
          <div
            key={ds.id}
            onClick={() => setSelectedDataset(ds.id)}
            className="glass-panel"
            style={{
              padding: '18px',
              cursor: 'pointer',
              borderColor: selectedDataset === ds.id ? 'var(--primary-cyan)' : 'var(--border-subtle)',
              background: selectedDataset === ds.id ? 'rgba(56, 189, 248, 0.1)' : 'var(--bg-card)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>{ds.category}</span>
              <FileSpreadsheet size={16} color="var(--primary-cyan)" />
            </div>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '6px' }}>{ds.name}</h3>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
              {ds.recordCount} Records • {ds.format}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDownload(ds.filename);
              }}
              className="btn-secondary"
              style={{ width: '100%', padding: '6px 10px', fontSize: '0.75rem', justifyContent: 'center' }}
            >
              <Download size={14} /> Download CSV
            </button>
          </div>
        ))}
      </div>

      {/* Dataset Details & Preview */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        {selectedDataset === 'RESERVOIR' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Baghewala Reservoir Core Data Preview</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  File: <code className="font-mono" style={{ color: 'var(--primary-cyan)' }}>Baghewala_Reservoir_Core_Data.csv</code>
                </p>
              </div>
              <button onClick={() => handleDownload('Baghewala_Reservoir_Core_Data.csv')} className="btn-primary" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
                <Download size={14} /> Download Dataset
              </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '10px' }}>Parameter Name</th>
                    <th style={{ padding: '10px' }}>Calibrated Value</th>
                    <th style={{ padding: '10px' }}>Unit</th>
                    <th style={{ padding: '10px' }}>Engineering Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '10px', fontWeight: 600 }}>Field & Formation</td>
                    <td style={{ padding: '10px' }} className="font-mono glow-text-cyan">Baghewala Field</td>
                    <td style={{ padding: '10px' }}>—</td>
                    <td style={{ padding: '10px' }}>Jodhpur Sandstone Formation, Rajasthan</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '10px', fontWeight: 600 }}>Crude API Gravity</td>
                    <td style={{ padding: '10px' }} className="font-mono glow-text-cyan">17.5</td>
                    <td style={{ padding: '10px' }}>°API</td>
                    <td style={{ padding: '10px' }}>Heavy Crude Oil Characterization</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '10px', fontWeight: 600 }}>Asphaltene Content</td>
                    <td style={{ padding: '10px' }} className="font-mono glow-text-rose">14.5</td>
                    <td style={{ padding: '10px' }}>%</td>
                    <td style={{ padding: '10px' }}>High asphaltene precipitation risk</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '10px', fontWeight: 600 }}>Initial Reservoir Temp</td>
                    <td style={{ padding: '10px' }} className="font-mono">47.0</td>
                    <td style={{ padding: '10px' }}>°C</td>
                    <td style={{ padding: '10px' }}>Low primary thermal energy</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '10px', fontWeight: 600 }}>Initial Crude Viscosity</td>
                    <td style={{ padding: '10px' }} className="font-mono glow-text-amber">3,200</td>
                    <td style={{ padding: '10px' }}>cP</td>
                    <td style={{ padding: '10px' }}>Ultra-high fluid resistance at 47°C</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedDataset === 'CSS_TELEMETRY' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>CSS Thermal Injection Time-Series Telemetry Preview</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  File: <code className="font-mono" style={{ color: 'var(--primary-cyan)' }}>CSS_Thermal_Cycle_Telemetry.csv</code>
                </p>
              </div>
              <button onClick={() => handleDownload('CSS_Thermal_Cycle_Telemetry.csv')} className="btn-primary" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
                <Download size={14} /> Download Dataset
              </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '10px' }}>Cycle Day</th>
                    <th style={{ padding: '10px' }}>Phase</th>
                    <th style={{ padding: '10px' }}>BHT (°C)</th>
                    <th style={{ padding: '10px' }}>Viscosity (cP)</th>
                    <th style={{ padding: '10px' }}>Oil Rate (m³/d)</th>
                    <th style={{ padding: '10px' }}>SOR (m³/m³)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '10px', fontWeight: 600 }}>Day -1</td>
                    <td style={{ padding: '10px' }}><span className="badge badge-amber">SOAK</span></td>
                    <td style={{ padding: '10px' }} className="font-mono">295.0 °C</td>
                    <td style={{ padding: '10px' }} className="font-mono glow-text-emerald">18 cP</td>
                    <td style={{ padding: '10px' }} className="font-mono">0.0</td>
                    <td style={{ padding: '10px' }} className="font-mono">—</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '10px', fontWeight: 600 }}>Day 1</td>
                    <td style={{ padding: '10px' }}><span className="badge badge-emerald">PRODUCTION</span></td>
                    <td style={{ padding: '10px' }} className="font-mono">282.5 °C</td>
                    <td style={{ padding: '10px' }} className="font-mono glow-text-emerald">21 cP</td>
                    <td style={{ padding: '10px' }} className="font-mono glow-text-cyan">18.4 m³/d</td>
                    <td style={{ padding: '10px' }} className="font-mono">2.1</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '10px', fontWeight: 600 }}>Day 14</td>
                    <td style={{ padding: '10px' }}><span className="badge badge-emerald">PRODUCTION</span></td>
                    <td style={{ padding: '10px' }} className="font-mono">152.0 °C</td>
                    <td style={{ padding: '10px' }} className="font-mono glow-text-cyan">210 cP</td>
                    <td style={{ padding: '10px' }} className="font-mono glow-text-cyan">10.4 m³/d</td>
                    <td style={{ padding: '10px' }} className="font-mono">3.8</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '10px', fontWeight: 600 }}>Day 30</td>
                    <td style={{ padding: '10px' }}><span className="badge badge-emerald">PRODUCTION</span></td>
                    <td style={{ padding: '10px' }} className="font-mono">74.0 °C</td>
                    <td style={{ padding: '10px' }} className="font-mono glow-text-amber">1,980 cP</td>
                    <td style={{ padding: '10px' }} className="font-mono">4.8 m³/d</td>
                    <td style={{ padding: '10px' }} className="font-mono">6.7</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedDataset === 'DYNAMOMETER' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>SRP Dynamometer Load-Displacement Time-Series Preview</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  File: <code className="font-mono" style={{ color: 'var(--primary-cyan)' }}>SRP_Dynamometer_Card_Time_Series.csv</code>
                </p>
              </div>
              <button onClick={() => handleDownload('SRP_Dynamometer_Card_Time_Series.csv')} className="btn-primary" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
                <Download size={14} /> Download Dataset
              </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '10px' }}>Stroke Position (in)</th>
                    <th style={{ padding: '10px' }}>Surface Load (lbs)</th>
                    <th style={{ padding: '10px' }}>Downhole Load (lbs)</th>
                    <th style={{ padding: '10px' }}>SPM</th>
                    <th style={{ padding: '10px' }}>Anomaly State</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '10px' }} className="font-mono">100.0 in</td>
                    <td style={{ padding: '10px' }} className="font-mono glow-text-cyan">11,800 lbs</td>
                    <td style={{ padding: '10px' }} className="font-mono">4,500 lbs</td>
                    <td style={{ padding: '10px' }} className="font-mono">6.0 SPM</td>
                    <td style={{ padding: '10px' }}><span className="badge badge-emerald">NORMAL</span></td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '10px' }} className="font-mono">20.0 in (Downstroke)</td>
                    <td style={{ padding: '10px' }} className="font-mono glow-text-rose">450 lbs</td>
                    <td style={{ padding: '10px' }} className="font-mono">200 lbs</td>
                    <td style={{ padding: '10px' }} className="font-mono">7.5 SPM</td>
                    <td style={{ padding: '10px' }}><span className="badge badge-rose">ROD FLOATING DETECTED</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedDataset === 'ANDRADE_CURVE' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Andrade Crude Viscosity-Temperature Calibration Matrix</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  File: <code className="font-mono" style={{ color: 'var(--primary-cyan)' }}>Andrade_Viscosity_Temperature_Curve.csv</code>
                </p>
              </div>
              <button onClick={() => handleDownload('Andrade_Viscosity_Temperature_Curve.csv')} className="btn-primary" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
                <Download size={14} /> Download Dataset
              </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '10px' }}>Temp (°C)</th>
                    <th style={{ padding: '10px' }}>Viscosity (cP)</th>
                    <th style={{ padding: '10px' }}>Fluid State Description</th>
                    <th style={{ padding: '10px' }}>Mobility Index</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '10px' }} className="font-mono">47.0 °C</td>
                    <td style={{ padding: '10px' }} className="font-mono glow-text-rose">3,200 cP</td>
                    <td style={{ padding: '10px' }}>Baghewala Ambient Reservoir Matrix</td>
                    <td style={{ padding: '10px' }} className="font-mono">0.031</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '10px' }} className="font-mono">100.0 °C</td>
                    <td style={{ padding: '10px' }} className="font-mono glow-text-amber">410 cP</td>
                    <td style={{ padding: '10px' }}>Enhanced Mobility Zone</td>
                    <td style={{ padding: '10px' }} className="font-mono">0.244</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '10px' }} className="font-mono">280.0 °C</td>
                    <td style={{ padding: '10px' }} className="font-mono glow-text-emerald">16 cP</td>
                    <td style={{ padding: '10px' }}>Steam Chamber Core Boundary</td>
                    <td style={{ padding: '10px' }} className="font-mono">6.250</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
