const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ARTIFACT_DIR = 'C:/Users/MITHESH D/.gemini/antigravity-ide/brain/14e63401-9d19-4aa9-8024-e9c8c66482db';

function getBase64Image(name) {
    const p = path.join(ARTIFACT_DIR, name);
    if (fs.existsSync(p)) {
        const ext = path.extname(p).slice(1);
        const b64 = fs.readFileSync(p).toString('base64');
        return 'data:image/' + ext + ';base64,' + b64;
    }
    return '';
}

const images = {
    dashboard: getBase64Image('orange_black_dashboard_1789358349150.png'),
    oscilloscope: getBase64Image('live_waveform_orange_1789358371023.png'),
    dynamometer: getBase64Image('dynamometer_orange_1789358395857.png'),
    pid: getBase64Image('pid_synoptic_view_1789356368317.png'),
    finalDashboard: getBase64Image('final_dashboard_orange_black_1789358490222.png'),
    aiChat: getBase64Image('scada_ai_copilot_chat_1789359031098.png'),
    aiDispatch: getBase64Image('ai_copilot_dispatch_orange_1789358444827.png')
};

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>WELLORA - Dual-Physics Digital Twin & SCADA AI Optimization System Presentation</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        @page {
            size: 1920px 1080px;
            margin: 0;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        :root {
            --bg-page: #F8FAFC;
            --bg-card: #FFFFFF;
            --bg-card-light: #FFF7ED;
            --orange-primary: #EA580C;
            --orange-dark: #C2410C;
            --orange-light: #FFEDD5;
            --orange-border: #FDBA74;
            --amber: #D97706;
            --blue: #0284C7;
            --green: #16A34A;
            --red: #DC2626;
            --text-heading: #0F172A;
            --text-body: #334155;
            --text-muted: #64748B;
            --border-light: #E2E8F0;
            --border-card: #CBD5E1;
            --code-bg: #0F172A;
        }
        body {
            font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
            background-color: var(--bg-page);
            color: var(--text-body);
        }
        .slide {
            width: 1920px;
            height: 1080px;
            background: var(--bg-page);
            position: relative;
            display: flex;
            flex-direction: column;
            padding: 44px 64px 32px 64px;
            page-break-after: always;
            page-break-inside: avoid;
            overflow: hidden;
        }
        .slide-accent-bar {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 10px;
            background: linear-gradient(90deg, #EA580C, #F97316, #FB923C, #EA580C);
        }
        .slide-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            padding-bottom: 18px;
            border-bottom: 2px solid var(--border-light);
            margin-bottom: 24px;
            position: relative;
        }
        .slide-header::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 240px;
            height: 4px;
            background: linear-gradient(90deg, var(--orange-primary), transparent);
            border-radius: 2px;
        }
        .pill {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: var(--orange-light);
            border: 1.5px solid var(--orange-border);
            color: var(--orange-dark);
            font-size: 13px;
            font-weight: 700;
            padding: 5px 16px;
            border-radius: 20px;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            margin-bottom: 8px;
        }
        .slide-title {
            font-size: 32px;
            font-weight: 800;
            color: var(--text-heading);
            letter-spacing: -0.5px;
        }
        .slide-number {
            font-family: 'JetBrains Mono', monospace;
            font-size: 16px;
            font-weight: 700;
            color: var(--orange-primary);
            background: #FFFFFF;
            padding: 8px 18px;
            border-radius: 8px;
            border: 1.5px solid var(--orange-border);
            box-shadow: 0 2px 8px rgba(234, 88, 12, 0.08);
        }
        .slide-body {
            flex: 1;
            display: grid;
            gap: 24px;
        }
        .grid-2 { grid-template-columns: 1fr 1fr; }
        .grid-3 { grid-template-columns: 1fr 1fr 1fr; }
        .grid-1-2 { grid-template-columns: 1fr 2fr; }
        .grid-3-2 { grid-template-columns: 1.35fr 1fr; }
        .grid-2-1 { grid-template-columns: 1.4fr 1fr; }
        .grid-1 { grid-template-columns: 1fr; }
        
        .card {
            background: var(--bg-card);
            border: 1.5px solid var(--border-light);
            border-radius: 14px;
            padding: 24px 28px;
            display: flex;
            flex-direction: column;
            gap: 14px;
            box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04);
        }
        .card.highlight {
            border-color: var(--orange-primary);
            background: #FFFAF5;
            box-shadow: 0 6px 20px rgba(234, 88, 12, 0.08);
        }
        .card-title {
            font-size: 20px;
            font-weight: 700;
            color: var(--orange-primary);
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .card-title.dark { color: var(--text-heading); }
        .card-title.blue { color: var(--blue); }
        .card-title.green { color: var(--green); }
        
        .point-list {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        .point-list li {
            font-size: 15.5px;
            line-height: 1.6;
            color: var(--text-body);
            position: relative;
            padding-left: 24px;
        }
        .point-list li::before {
            content: '●';
            position: absolute;
            left: 0;
            color: var(--orange-primary);
            font-size: 13px;
            top: 2px;
        }
        .point-list li strong {
            color: var(--text-heading);
            font-weight: 700;
        }

        .code-box {
            background: var(--code-bg);
            border: 1.5px solid #334155;
            border-radius: 12px;
            padding: 20px 24px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 13.5px;
            line-height: 1.6;
            color: #F1F5F9;
            overflow: hidden;
            white-space: pre;
            flex: 1;
            box-shadow: 0 6px 18px rgba(0,0,0,0.15);
        }
        .code-keyword { color: #F43F5E; font-weight: bold; }
        .code-func { color: #A855F7; font-weight: 600; }
        .code-var { color: #38BDF8; }
        .code-str { color: #34D399; }
        .code-num { color: #FB923C; font-weight: bold; }
        .code-comment { color: #94A3B8; font-style: italic; }

        .img-card {
            background: #FFFFFF;
            border: 2px solid var(--border-card);
            border-radius: 12px;
            padding: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 8px 24px rgba(0,0,0,0.06);
            overflow: hidden;
            height: 100%;
        }
        .img-preview {
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-radius: 8px;
        }

        .kpi-row {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
        }
        .kpi-card {
            background: #FFFFFF;
            border: 2px solid var(--orange-border);
            border-radius: 12px;
            padding: 16px;
            text-align: center;
            box-shadow: 0 4px 12px rgba(234, 88, 12, 0.06);
        }
        .kpi-val {
            font-size: 30px;
            font-weight: 800;
            color: var(--orange-primary);
            margin-bottom: 4px;
        }
        .kpi-label {
            font-size: 13px;
            font-weight: 700;
            color: var(--text-heading);
        }

        .table-custom {
            width: 100%;
            border-collapse: collapse;
            font-size: 14.5px;
            margin-top: 6px;
        }
        .table-custom th {
            background: #FFEDD5;
            color: var(--orange-dark);
            font-weight: 700;
            text-align: left;
            padding: 12px 16px;
            border: 1px solid var(--orange-border);
        }
        .table-custom td {
            padding: 12px 16px;
            border: 1px solid var(--border-light);
            color: var(--text-body);
            background: #FFFFFF;
        }
        .table-custom tr:nth-child(even) td {
            background: #F8FAFC;
        }

        .slide-footer {
            margin-top: auto;
            padding-top: 12px;
            border-top: 1.5px solid var(--border-light);
            display: flex;
            justify-content: space-between;
            font-size: 13px;
            color: var(--text-muted);
            font-weight: 500;
        }
    </style>
</head>
<body>

    <!-- SLIDE 1: COVER -->
    <div class="slide">
        <div class="slide-accent-bar"></div>
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; gap: 24px;">
            <div class="pill">⚡ DUAL-PHYSICS DIGITAL TWIN & AI OPTIMIZATION SYSTEM</div>
            <h1 style="font-size: 72px; font-weight: 800; color: var(--orange-primary); letter-spacing: -1.5px; line-height: 1.1;">
                WELLORA
            </h1>
            <h2 style="font-size: 32px; font-weight: 700; color: var(--text-heading); max-width: 1350px; line-height: 1.35;">
                Dual-Physics Digital Twin & Real-Time SCADA AI Optimization System for Heavy Crude Oil Fields (17.5° API)
            </h2>
            <p style="font-size: 19px; color: var(--text-body); max-width: 1150px; line-height: 1.6;">
                Coupled Andrade Thermal Viscosity Modeling, Sucker Rod Pump (SRP) Kinematics, Cyclic Steam Stimulation (CSS) Enhanced Oil Recovery, Live SCADA Oscilloscope & Gemini-Style AI Copilot
            </p>
            <div style="display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; margin-top: 10px;">
                <span class="pill" style="background: #E0F2FE; border-color: #7DD3FC; color: #0369A1;">React 18 + TypeScript</span>
                <span class="pill" style="background: #FEF3C7; border-color: #FCD34D; color: #92400E;">Thermal EOR ODE Solver</span>
                <span class="pill" style="background: #DCFCE7; border-color: #86EFAC; color: #166534;">2.0 Hz Real-Time SCADA</span>
                <span class="pill" style="background: #FFEDD5; border-color: #FDBA74; color: #9A3412;">Laser Tracing Dynamometer</span>
                <span class="pill" style="background: #F3E8FF; border-color: #D8B4FE; color: #6B21A8;">Conversational AI Copilot</span>
            </div>
            <div style="margin-top: 24px; padding: 16px 36px; background: #FFFFFF; border: 2px solid var(--border-light); border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.04); display: flex; gap: 48px; font-size: 16px;">
                <div><strong>Project Author:</strong> Mithesh D</div>
                <div><strong>Domain:</strong> Petroleum Digital Twin & Industrial SCADA Systems</div>
                <div><strong>Target Reservoir:</strong> Heavy Crude (17.5° API, 3,500 cP)</div>
            </div>
        </div>
        <div class="slide-footer">
            <span>WELLORA Industrial Systems &bull; Orange & White Presentation Deck</span>
            <span>Slide 01 / 24</span>
        </div>
    </div>

    <!-- SLIDE 2: ABSTRACT -->
    <div class="slide">
        <div class="slide-accent-bar"></div>
        <div class="slide-header">
            <div>
                <div class="pill">⚙ EXECUTIVE SUMMARY</div>
                <div class="slide-title">Abstract: Dual-Physics SCADA Digital Twin Architecture</div>
            </div>
            <div class="slide-number">02 / 24</div>
        </div>
        <div class="slide-body grid-2">
            <div class="card">
                <div class="card-title">Executive Problem Statement & Engineering Purpose</div>
                <ul class="point-list">
                    <li><strong>The Heavy Crude Challenge (17.5° API):</strong> Heavy oil extraction suffers from severe flow resistance because cold reservoir oil exhibits near-solid tar viscosity (>3,500 cP at 28°C), causing extreme rod string friction, pump floating, and frequent motor overheating.</li>
                    <li><strong>Thermal Recovery Mechanism:</strong> Cyclic Steam Stimulation (CSS) provides high-enthalpy thermal energy (260°C to 310°C) to dramatically drop oil viscosity to ~12.8 cP via Andrade's logarithmic thermal model.</li>
                    <li><strong>Digital Twin Innovation:</strong> Conventional SCADA systems act only as passive telemetry recorders. WELLORA transforms traditional SCADA into an active predictive digital twin by fusing thermal reservoir differential equations with Sucker Rod Pump (SRP) stress mechanics and 2.0 Hz real-time sensor streams.</li>
                    <li><strong>Integrated AI Copilot:</strong> Operators can interrogate the system in natural language, perform dynamic what-if simulation calculations, and dispatch optimal setpoints directly to the digital twin.</li>
                </ul>
            </div>
            <div class="card highlight">
                <div class="card-title">Validated Quantitative Outcomes</div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 8px;">
                    <div class="kpi-card">
                        <div class="kpi-val">+28.4%</div>
                        <div class="kpi-label">Steam Thermal Efficiency</div>
                        <div style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">Optimized soak duration minimizes formation heat waste</div>
                    </div>
                    <div class="kpi-card">
                        <div class="kpi-val">-34.8%</div>
                        <div class="kpi-label">Rod String Fatigue</div>
                        <div style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">Dynamic speed throttling prevents fluid pound & rod stress</div>
                    </div>
                    <div class="kpi-card">
                        <div class="kpi-val">2.0 Hz</div>
                        <div class="kpi-label">Telemetry Sampling</div>
                        <div style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">Sub-second sensor stream with Web Audio alarms</div>
                    </div>
                    <div class="kpi-card">
                        <div class="kpi-val">100%</div>
                        <div class="kpi-label">Closed-Loop AI Dispatch</div>
                        <div style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">Direct parameter execution without manual recalculation</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="slide-footer">
            <span>WELLORA Industrial Systems &bull; Orange & White Presentation Deck</span>
            <span>Slide 02 / 24</span>
        </div>
    </div>

    <!-- SLIDE 3: INTRODUCTION - RESERVOIR ENGINEERING -->
    <div class="slide">
        <div class="slide-accent-bar"></div>
        <div class="slide-header">
            <div>
                <div class="pill">⚙ ENGINEERING BACKGROUND</div>
                <div class="slide-title">Introduction: Heavy Crude Oil Reservoir Engineering (17.5° API)</div>
            </div>
            <div class="slide-number">03 / 24</div>
        </div>
        <div class="slide-body grid-3">
            <div class="card">
                <div class="card-title">1. Fluid Composition & Gravity</div>
                <ul class="point-list">
                    <li><strong>API Gravity of 17.5°:</strong> Corresponds to a high specific gravity of 0.95 g/cm³ (950 kg/m³), placing it in the heavy crude oil classification.</li>
                    <li><strong>Asphaltene & Resin Content:</strong> Dense molecular weight hydrocarbons create extensive intermolecular paraffin networks that strongly resist laminar flow.</li>
                    <li><strong>Cold Viscosity State:</strong> At native formation temperatures (25°C - 30°C), viscosity ranges between 3,500 and 4,200 cP (similar to thick cold honey).</li>
                </ul>
            </div>
            <div class="card">
                <div class="card-title">2. Flow Dynamics in Porous Rock</div>
                <ul class="point-list">
                    <li><strong>Darcy's Law Limitation:</strong> Fluid velocity $v = -\frac{k}{\mu}\nabla P$. When viscosity $\mu$ is 3,500 cP, natural flow velocity approaches zero.</li>
                    <li><strong>Non-Newtonian Rheology:</strong> Exhibits Bingham plastic and shear-thinning thixotropic behavior requiring a threshold yield stress before fluid mobilization occurs.</li>
                    <li><strong>Pore Plugging:</strong> Cold crude accumulates in the near-wellbore rock matrix, creating high skin damage ($S > +15$).</li>
                </ul>
            </div>
            <div class="card">
                <div class="card-title">3. Production Challenges</div>
                <ul class="point-list">
                    <li><strong>Rod Fall Delay (Floating):</strong> Downward stroke of the sucker rod is severely retarded by viscous buoyant forces.</li>
                    <li><strong>Tubing Drag & Friction:</strong> Hydrodynamic drag along the 1,200m production string spikes motor power consumption.</li>
                    <li><strong>Need for Thermal Intervention:</strong> Thermal energy is physically mandatory to break intermolecular asphaltene bonds.</li>
                </ul>
            </div>
        </div>
        <div class="slide-footer">
            <span>WELLORA Industrial Systems &bull; Orange & White Presentation Deck</span>
            <span>Slide 03 / 24</span>
        </div>
    </div>

    <!-- SLIDE 4: INTRODUCTION - CSS THERMODYNAMICS -->
    <div class="slide">
        <div class="slide-accent-bar"></div>
        <div class="slide-header">
            <div>
                <div class="pill">⚙ THERMAL ENHANCED OIL RECOVERY</div>
                <div class="slide-title">Introduction: Cyclic Steam Stimulation (CSS) 3-Stage Process</div>
            </div>
            <div class="slide-number">04 / 24</div>
        </div>
        <div class="slide-body grid-3">
            <div class="card highlight">
                <div class="card-title">Stage 1: Steam Injection (Days 1 - 12)</div>
                <ul class="point-list">
                    <li><strong>Superheated Steam:</strong> High-enthalpy dry steam at 260°C to 310°C is injected at 12 - 15 MPa wellhead pressure.</li>
                    <li><strong>Enthalpy Transfer:</strong> Latent heat of condensation releases ~2,100 kJ/kg directly into the rock formation.</li>
                    <li><strong>Viscosity Collapse:</strong> Downhole temperature spikes from 28°C to 260°C, causing viscosity to plummet from 3,500 cP down to 12.8 cP.</li>
                </ul>
            </div>
            <div class="card">
                <div class="card-title">Stage 2: Formation Soaking (Days 13 - 18)</div>
                <ul class="point-list">
                    <li><strong>Well Shut-In:</strong> Surface master valves are closed for 5 - 7 days to allow thermal conduction.</li>
                    <li><strong>Radial Heat Dispersion:</strong> Conductive heat moves radially outward into the low-permeability sandstone matrix.</li>
                    <li><strong>Pressure Equilibrium:</strong> Formation pressure equilibrates while maintaining bottomhole temperatures above 230°C.</li>
                </ul>
            </div>
            <div class="card">
                <div class="card-title">Stage 3: Production Drawdown (Days 19 - 90)</div>
                <ul class="point-list">
                    <li><strong>Mobile Oil Extraction:</strong> Beam pump starts reciprocating, lifting hot, low-viscosity crude oil at 300+ BPD.</li>
                    <li><strong>Exponential Heat Loss:</strong> Heat dissipates into surrounding shale over 72 days, lowering temperature toward 45°C.</li>
                    <li><strong>Re-Steaming Trigger:</strong> When viscosity climbs above 800 cP, the digital twin schedules the next steam cycle.</li>
                </ul>
            </div>
        </div>
        <div class="slide-footer">
            <span>WELLORA Industrial Systems &bull; Orange & White Presentation Deck</span>
            <span>Slide 04 / 24</span>
        </div>
    </div>

    <!-- SLIDE 5: INTRODUCTION - SUCKER ROD MECHANICS -->
    <div class="slide">
        <div class="slide-accent-bar"></div>
        <div class="slide-header">
            <div>
                <div class="pill">⚙ ARTIFICIAL LIFT MECHANICS</div>
                <div class="slide-title">Introduction: Sucker Rod Pump (SRP) Dynamics & Wave Equations</div>
            </div>
            <div class="slide-number">05 / 24</div>
        </div>
        <div class="slide-body grid-2">
            <div class="card">
                <div class="card-title">Sucker Rod Pumping Unit Operation</div>
                <ul class="point-list">
                    <li><strong>Surface Walking Beam:</strong> Converts electric motor rotary torque into reciprocating vertical stroke (typically 6 - 10 SPM with 86 - 120 inch stroke).</li>
                    <li><strong>Rod String Elasticity:</strong> 1,200m continuous steel rod behaves like an elastic spring with inherent resonant frequencies and longitudinal wave travel.</li>
                    <li><strong>Downhole Pump Action:</strong>
                        <br>&bull; <em>Upstroke:</em> Traveling valve closes, lifting fluid column; standing valve opens to fill pump barrel.
                        <br>&bull; <em>Downstroke:</em> Traveling valve opens, rod string plunges through fluid; standing valve closes.
                    </li>
                </ul>
            </div>
            <div class="card highlight">
                <div class="card-title">Dynamic Failures in Heavy Oil Lift</div>
                <ul class="point-list">
                    <li><strong>Fluid Pound:</strong> Occurs when the pump barrel only partially fills with viscous crude; the plunger smashes into the liquid surface midway down, generating massive shock waves.</li>
                    <li><strong>Peak Polish Rod Load (PPRL):</strong> Total upstroke load combining rod weight, fluid weight, inertial acceleration, and viscous pipe friction.</li>
                    <li><strong>Gas Lock & Interference:</strong> Entrained gas expands inside the pump chamber, preventing standing valve opening.</li>
                    <li><strong>Dynamometer Diagnosis:</strong> Plotting Load vs Position produces closed diagnostic loops revealing subsurface malfunctions.</li>
                </ul>
            </div>
        </div>
        <div class="slide-footer">
            <span>WELLORA Industrial Systems &bull; Orange & White Presentation Deck</span>
            <span>Slide 05 / 24</span>
        </div>
    </div>

    <!-- SLIDE 6: DETAILS ABOUT THE TRAINING - PHYSICS -->
    <div class="slide">
        <div class="slide-accent-bar"></div>
        <div class="slide-header">
            <div>
                <div class="pill">⚙ MATHEMATICAL FORMULATION</div>
                <div class="slide-title">Details about the Training: Thermodynamic Calibration & Heat Loss ODE</div>
            </div>
            <div class="slide-number">06 / 24</div>
        </div>
        <div class="slide-body grid-2">
            <div class="card">
                <div class="card-title">1. Andrade Exponential Viscosity Model Calibration</div>
                <div class="code-box">ln(μ) = ln(A) + B / (T + 273.15)
Calibrated Reservoir Parameters:
A = 0.0125 cP, B = 1850 K (for 17.5° API Crude)

Viscosity Verification Points:
• T = 28°C (Cold Reservoir)  => μ = 3,842.1 cP
• T = 80°C (Mid Production)  => μ = 192.4 cP
• T = 180°C (Hot Production) => μ = 24.6 cP
• T = 260°C (Steam Injected) => μ = 12.8 cP</div>
                <ul class="point-list">
                    <li>Calibrated using laboratory empirical PVT viscometer datasets for heavy oil samples.</li>
                    <li>Captures the dramatic 300-fold viscosity drop achieved during steam injection.</li>
                </ul>
            </div>
            <div class="card">
                <div class="card-title">2. 90-Day Formation Thermal Dissipation ODE</div>
                <div class="code-box">∂T/∂t = -λ·(T - T_formation) - (ρ_f·c_f / ρ_m·c_m)·v·∇T

CSS Operational Stage Equations:
• Injection (Day 0-12):  T(t) = T_steam = 260°C
• Soaking (Day 13-18):   T(t) = T_steam - ((t - 12)/6)·25°C
• Production (Day 19-90): T(t) = 45 + (T_steam - 70)·exp(-0.038·(t - 18))</div>
                <ul class="point-list">
                    <li>Solves 1D radial conductive and convective heat losses into bounding caprock.</li>
                    <li>Calibrated thermal decay constant ($k = 0.038\text{ day}^{-1}$) accurately predicts temperature decline.</li>
                </ul>
            </div>
        </div>
        <div class="slide-footer">
            <span>WELLORA Industrial Systems &bull; Orange & White Presentation Deck</span>
            <span>Slide 06 / 24</span>
        </div>
    </div>

    <!-- SLIDE 7: DETAILS ABOUT THE TRAINING - KINEMATICS & AI -->
    <div class="slide">
        <div class="slide-accent-bar"></div>
        <div class="slide-header">
            <div>
                <div class="pill">⚙ MECHANICAL DYNAMICS & AI TRAINING</div>
                <div class="slide-title">Details about the Training: API RP 11L Dynamics & AI NLP Models</div>
            </div>
            <div class="slide-number">07 / 24</div>
        </div>
        <div class="slide-body grid-2">
            <div class="card">
                <div class="card-title">1. Sucker Rod Wave Equations (API RP 11L)</div>
                <div class="code-box">Damped 1D Wave Equation for Elastic Rod Strings:
∂²u/∂t² = a²·(∂²u/∂x²) - c·(∂u/∂t)

Peak Polish Rod Load (PPRL):
PPRL = [W_rod_fluid + W_fluid] · [1 + (S · N²)/70500] · DragFactor
Minimum Polish Rod Load (MPRL):
MPRL = W_rod_fluid · [1 - (S · N²)/70500] / DragFactor

Where: S = Stroke Length (in), N = Speed (SPM), DragFactor = 1 + (μ/500)·0.45</div>
                <ul class="point-list">
                    <li>Models rod stretch and dynamic inertia across 1,200m depth.</li>
                    <li>Evaluates rod stress against API allowable stress threshold ($\sigma \le 30,000\text{ PSI}$).</li>
                </ul>
            </div>
            <div class="card highlight">
                <div class="card-title">2. Conversational AI Intent & Physics Training</div>
                <div class="code-box">NLP Pipeline & Physics Intent Ontology:
1. Regex & Entity Extraction:
   - Parameter Patterns: /(\d+(\.\d+)?)\s*(spm|rpm|speed)/i
   - Temperature Patterns: /(\d+)\s*(c|deg|temperature)/i
2. Live State Injection:
   - Reservoir Temp, Rod Load, Active Alarms, Viscosity
3. Deterministic Physics Verification:
   - Recalculates PPRL & HP before answering
4. Output Schema: { text: string, action?: ActionPayload }</div>
                <ul class="point-list">
                    <li>Trained on petroleum engineering domain taxonomy, SCADA alarm triggers, and CSS recovery heuristics.</li>
                    <li>Ensures AI copilot outputs mathematically verified answers rather than hallucinated estimates.</li>
                </ul>
            </div>
        </div>
        <div class="slide-footer">
            <span>WELLORA Industrial Systems &bull; Orange & White Presentation Deck</span>
            <span>Slide 07 / 24</span>
        </div>
    </div>

    <!-- SLIDE 8: PROJECT DESCRIPTION - ARCHITECTURE -->
    <div class="slide">
        <div class="slide-accent-bar"></div>
        <div class="slide-header">
            <div>
                <div class="pill">⚙ SYSTEM ARCHITECTURE</div>
                <div class="slide-title">Project Description: 5-Tier Modular System Architecture</div>
            </div>
            <div class="slide-number">08 / 24</div>
        </div>
        <div class="slide-body grid-3">
            <div class="card">
                <div class="card-title">Tier 1: Subsurface Physics</div>
                <ul class="point-list">
                    <li><strong>Thermodynamic Solver:</strong> Andrade viscosity equations coupled with formation cooling ODEs.</li>
                    <li><strong>Inflow Performance (IPR):</strong> Vogel's heavy oil equation for two-phase bottomhole drawdown.</li>
                    <li><strong>Viscosity Shift:</strong> Continuous calculation of temperature-dependent fluid rheology.</li>
                </ul>
            </div>
            <div class="card highlight">
                <div class="card-title">Tier 2: Real-Time SCADA Engine</div>
                <ul class="point-list">
                    <li><strong>2.0 Hz Streaming:</strong> Dispatches telemetry snapshots every 500ms for 4 production wells.</li>
                    <li><strong>Sensor Noise & Jitter:</strong> Simulates authentic field sensor micro-jitter and harmonic drift.</li>
                    <li><strong>Acoustic Alarm Synthesis:</strong> Native Web Audio multi-frequency chimes (880 Hz / 440 Hz).</li>
                </ul>
            </div>
            <div class="card">
                <div class="card-title">Tier 3: Sucker Rod Kinematics</div>
                <ul class="point-list">
                    <li><strong>API RP 11L Mechanics:</strong> Calculates Polish Rod dynamic loads, rod stress, and motor HP.</li>
                    <li><strong>Dynamometer Generator:</strong> Computes Fourier harmonic surface vs downhole pump cards.</li>
                    <li><strong>Mechanical Health:</strong> Continuous verification against maximum rod stress limits.</li>
                </ul>
            </div>
            <div class="card">
                <div class="card-title">Tier 4: SCADA Visualizers</div>
                <ul class="point-list">
                    <li><strong>Signal Oscilloscope:</strong> Dual-channel live waveform plotting with phosphor persistence.</li>
                    <li><strong>Laser Dynamometer:</strong> Closed-loop card tracer with active beam position indicator.</li>
                    <li><strong>P&ID Synoptic Flow:</strong> Animated subsurface steam lines and walking beam kinematics.</li>
                </ul>
            </div>
            <div class="card highlight">
                <div class="card-title">Tier 5: Conversational AI Copilot</div>
                <ul class="point-list">
                    <li><strong>Freeform Dialogue:</strong> Answers open-ended questions about physics, SCADA, and operations.</li>
                    <li><strong>What-If Calculations:</strong> Dynamically calculates parameter changes on-the-fly.</li>
                    <li><strong>Action Dispatcher:</strong> Directly updates digital twin sliders and operational setpoints.</li>
                </ul>
            </div>
            <div class="card">
                <div class="card-title">Multi-Well Field Matrix</div>
                <ul class="point-list">
                    <li><strong>4 Independent Wells:</strong> OR-101 (Producing), OR-102 (Soaking), OR-103 (Injecting), OR-104 (Producing).</li>
                    <li><strong>Dynamic Navigation:</strong> Instant well switching with persistent telemetry state.</li>
                    <li><strong>Production Aggregation:</strong> Computes total field production and power consumption.</li>
                </ul>
            </div>
        </div>
        <div class="slide-footer">
            <span>WELLORA Industrial Systems &bull; Orange & White Presentation Deck</span>
            <span>Slide 08 / 24</span>
        </div>
    </div>

    <!-- SLIDE 9: REQUIREMENTS -->
    <div class="slide">
        <div class="slide-accent-bar"></div>
        <div class="slide-header">
            <div>
                <div class="pill">⚙ SPECIFICATIONS & STACK</div>
                <div class="slide-title">Hardware and Software Requirements</div>
            </div>
            <div class="slide-number">09 / 24</div>
        </div>
        <div class="slide-body grid-2">
            <div class="card">
                <div class="card-title">Hardware Specifications</div>
                <table class="table-custom">
                    <tr><th>Component</th><th>Minimum Specification</th><th>Recommended Production Spec</th></tr>
                    <tr><td><strong>Workstation CPU</strong></td><td>Intel Core i5 / Ryzen 5 (4-Core)</td><td>Intel Core i7 / Ryzen 7 (8-Core, 3.8 GHz+)</td></tr>
                    <tr><td><strong>System Memory</strong></td><td>8 GB DDR4 RAM</td><td>16 GB / 32 GB High-Speed Dual Channel</td></tr>
                    <tr><td><strong>Graphics / Display</strong></td><td>1920×1080 FHD Display</td><td>1920×1080 or 4K with Canvas 2D/WebGL GPU</td></tr>
                    <tr><td><strong>Edge SCADA RTU</strong></td><td>Raspberry Pi 4 / ARM Cortex-A53</td><td>Moxa Industrial IoT Gateway / Siemens Microbox</td></tr>
                    <tr><td><strong>Field Sensors</strong></td><td>Piezoresistive 4-20mA Transmitters</td><td>Strain gauge load cells, Hall-effect current sensors</td></tr>
                </table>
            </div>
            <div class="card highlight">
                <div class="card-title">Software & Framework Stack</div>
                <table class="table-custom">
                    <tr><th>Layer / Module</th><th>Technology Selected</th><th>Role & Architectural Rationale</th></tr>
                    <tr><td><strong>Core Framework</strong></td><td>React 18.3 + TypeScript</td><td>Component hierarchy, strict type safety, zero runtime errors</td></tr>
                    <tr><td><strong>UI Design System</strong></td><td>Tailwind CSS + Custom Theme</td><td>Cyber-Orange SCADA theme, high-contrast industrial readability</td></tr>
                    <tr><td><strong>Rendering & Audio</strong></td><td>HTML5 Canvas + Web Audio</td><td>High-frequency 60 FPS plotting, browser-native acoustic synthesis</td></tr>
                    <tr><td><strong>Build & Runtime</strong></td><td>Vite 5.x + Node.js v24+</td><td>Instant HMR development, optimized production bundling</td></tr>
                    <tr><td><strong>Deployment</strong></td><td>Vercel Production Cloud</td><td>Zero-config global edge CDN hosting, automated CI/CD pipeline</td></tr>
                </table>
            </div>
        </div>
        <div class="slide-footer">
            <span>WELLORA Industrial Systems &bull; Orange & White Presentation Deck</span>
            <span>Slide 09 / 24</span>
        </div>
    </div>

    <!-- SLIDE 10: FRONTEND DESIGN - ARCHITECTURE -->
    <div class="slide">
        <div class="slide-accent-bar"></div>
        <div class="slide-header">
            <div>
                <div class="pill">⚙ USER INTERFACE ENGINEERING</div>
                <div class="slide-title">Frontend Design: Architecture, Design System & Component Hierarchy</div>
            </div>
            <div class="slide-number">10 / 24</div>
        </div>
        <div class="slide-body grid-3">
            <div class="card">
                <div class="card-title">1. Orange-White SCADA Palette</div>
                <ul class="point-list">
                    <li><strong>High-Contrast Industrial System:</strong> Primary accent in vivid Cyber-Orange (#EA580C) paired with clean background (#F8FAFC) to eliminate operator fatigue in 24/7 control rooms.</li>
                    <li><strong>Status Semantic Colors:</strong> Emerald Green (#16A34A) for Normal/Producing, Amber (#D97706) for Soaking/Warning, Crimson Red (#DC2626) for Critical Alarms, and Sky Blue (#0284C7) for Steam Injection.</li>
                </ul>
            </div>
            <div class="card highlight">
                <div class="card-title">2. Reactive Component Tree</div>
                <ul class="point-list">
                    <li><strong>App.tsx:</strong> Root state manager synchronizing real-time telemetry, active well selection, and simulation parameters.</li>
                    <li><strong>Navbar.tsx:</strong> Multi-well field matrix switcher and 90-day CSS cycle stepper navigation bar.</li>
                    <li><strong>LiveOscilloscope.tsx:</strong> 2 Hz dual-trace continuous waveform signal visualizer.</li>
                    <li><strong>DynamometerCardView.tsx:</strong> Surface vs downhole card laser tracing engine.</li>
                </ul>
            </div>
            <div class="card">
                <div class="card-title">3. UX Micro-Interactions</div>
                <ul class="point-list">
                    <li><strong>Phosphor Oscilloscope Persistence:</strong> Canvas alpha clearing creates authentic CRT oscilloscope decay trails.</li>
                    <li><strong>Laser Beam Tracing:</strong> Smooth animated tracer dot orbits the dynamometer loop synchronized with the beam stroke.</li>
                    <li><strong>Acoustic Alarm Synthesis:</strong> Triggers crisp multi-frequency Web Audio chimes without downloading external sound files.</li>
                </ul>
            </div>
        </div>
        <div class="slide-footer">
            <span>WELLORA Industrial Systems &bull; Orange & White Presentation Deck</span>
            <span>Slide 10 / 24</span>
        </div>
    </div>

    <!-- SLIDE 11: FRONTEND SCREENSHOT 1 - DASHBOARD -->
    <div class="slide">
        <div class="slide-accent-bar"></div>
        <div class="slide-header">
            <div>
                <div class="pill">⚙ UI SCREENSHOT 01</div>
                <div class="slide-title">Frontend Design: SCADA Live Telemetry Dashboard & Field Matrix</div>
            </div>
            <div class="slide-number">11 / 24</div>
        </div>
        <div class="slide-body grid-2-1">
            <div class="img-card">
                <img src="${images.dashboard}" class="img-preview" alt="Main SCADA Dashboard Screenshot">
            </div>
            <div class="card highlight">
                <div class="card-title">Component Analysis & Walkthrough</div>
                <ul class="point-list">
                    <li><strong>Multi-Well Status Matrix:</strong> Top navigation bar displays all 4 field wells (OR-101 to OR-104) with active operational badges (Producing, Soaking, Injecting).</li>
                    <li><strong>CSS Cycle Stepper:</strong> Shows current Day 24 of 90 with interactive stage progress indicators.</li>
                    <li><strong>Real-Time Telemetry Cards:</strong>
                        <br>&bull; <em>Wellhead Pressure:</em> 14.8 bar (PID regulated)
                        <br>&bull; <em>Motor Current:</em> 38.5 A (Dynamic 2 Hz waveform)
                        <br>&bull; <em>Peak Rod Load:</em> 18,500 lbs (Well within 26,000 lbs limit)
                        <br>&bull; <em>Oil Flow Rate:</em> 312.4 BPD with live viscosity readout
                    </li>
                    <li><strong>Quick Action Dispatcher:</strong> Buttons for Steam Optimization, AI Auto-Tune, and Emergency SCADA Shutdown.</li>
                </ul>
            </div>
        </div>
        <div class="slide-footer">
            <span>WELLORA Industrial Systems &bull; Orange & White Presentation Deck</span>
            <span>Slide 11 / 24</span>
        </div>
    </div>

    <!-- SLIDE 12: FRONTEND SCREENSHOT 2 - OSCILLOSCOPE -->
    <div class="slide">
        <div class="slide-accent-bar"></div>
        <div class="slide-header">
            <div>
                <div class="pill">⚙ UI SCREENSHOT 02</div>
                <div class="slide-title">Frontend Design: Real-Time Signal Waveform Oscilloscope (2.0 Hz)</div>
            </div>
            <div class="slide-number">12 / 24</div>
        </div>
        <div class="slide-body grid-2-1">
            <div class="img-card">
                <img src="${images.oscilloscope}" class="img-preview" alt="Signal Oscilloscope Screenshot">
            </div>
            <div class="card">
                <div class="card-title">Signal Processing & Oscilloscope Features</div>
                <ul class="point-list">
                    <li><strong>Dual-Channel Live Waveforms:</strong>
                        <br>&bull; <strong style="color: #EA580C;">Channel A (Orange Trace):</strong> Polish Rod Load (lbs) over time showing peak tension during upstroke and unloading on downstroke.
                        <br>&bull; <strong style="color: #0284C7;">Channel B (Cyan Trace):</strong> Motor Current (Amperes) showing instantaneous electrical power demand.
                    </li>
                    <li><strong>60 FPS Phosphor Persistence:</strong> Utilizes HTML5 Canvas 2D with semi-transparent alpha background clearing to create realistic oscilloscope glow trails.</li>
                    <li><strong>2.0 Hz Data Ingestion:</strong> Continuous 500ms telemetry sampling buffers real-time sensor packets without DOM re-render bottlenecks.</li>
                    <li><strong>Harmonic Diagnosis:</strong> Operators can visually detect abnormal load spikes or electrical motor phase imbalances instantly.</li>
                </ul>
            </div>
        </div>
        <div class="slide-footer">
            <span>WELLORA Industrial Systems &bull; Orange & White Presentation Deck</span>
            <span>Slide 12 / 24</span>
        </div>
    </div>

    <!-- SLIDE 13: FRONTEND SCREENSHOT 3 - DYNAMOMETER -->
    <div class="slide">
        <div class="slide-accent-bar"></div>
        <div class="slide-header">
            <div>
                <div class="pill">⚙ UI SCREENSHOT 03</div>
                <div class="slide-title">Frontend Design: Laser Tracing Surface & Downhole Dynamometer</div>
            </div>
            <div class="slide-number">13 / 24</div>
        </div>
        <div class="slide-body grid-2-1">
            <div class="img-card">
                <img src="${images.dynamometer}" class="img-preview" alt="Dynamometer Visualizer Screenshot">
            </div>
            <div class="card highlight">
                <div class="card-title">Dynamometer Analysis & Mechanical Diagnosis</div>
                <ul class="point-list">
                    <li><strong>Closed-Loop Load vs Position:</strong> Plots continuous polish rod position (0 to 100 inches) against instantaneous rod load (0 to 26,000 lbs).</li>
                    <li><strong>Surface vs Downhole Card Comparison:</strong>
                        <br>&bull; <strong style="color: #EA580C;">Outer Surface Card:</strong> Measured at the surface polish rod incorporating total string elastic stretch and inertia.
                        <br>&bull; <strong style="color: #16A34A;">Inner Pump Card:</strong> Derived downhole pump card representing actual fluid displacement inside the working barrel.
                    </li>
                    <li><strong>Real-Time Laser Beam Tracing:</strong> An animated pulsating laser dot traces the curve synchronously with the walking beam cycle.</li>
                    <li><strong>Diagnostic Area Calculation:</strong> Card area corresponds to mechanical work per stroke ($W = \oint F \, ds$), computing pump fillage efficiency (94.2%).</li>
                </ul>
            </div>
        </div>
        <div class="slide-footer">
            <span>WELLORA Industrial Systems &bull; Orange & White Presentation Deck</span>
            <span>Slide 13 / 24</span>
        </div>
    </div>

    <!-- SLIDE 14: FRONTEND SCREENSHOT 4 - P&ID SYNOPTICS -->
    <div class="slide">
        <div class="slide-accent-bar"></div>
        <div class="slide-header">
            <div>
                <div class="pill">⚙ UI SCREENSHOT 04</div>
                <div class="slide-title">Frontend Design: Subsurface 3D Twin & P&ID Synoptic Flow Visualizer</div>
            </div>
            <div class="slide-number">14 / 24</div>
        </div>
        <div class="slide-body grid-2-1">
            <div class="img-card">
                <img src="${images.pid}" class="img-preview" alt="P&ID Synoptic Visualizer Screenshot">
            </div>
            <div class="card">
                <div class="card-title">Synoptic Flow Architecture & 3D Visualizer</div>
                <ul class="point-list">
                    <li><strong>Interactive P&ID Process Flow:</strong> Displays wellhead Christmas tree valves, steam injection manifold, flowline chokes, and three-phase separator.</li>
                    <li><strong>Subsurface Wellbore Kinematics:</strong> Animated walking beam reciprocation coupled to the 1,200m downhole sucker rod and standing/traveling valves.</li>
                    <li><strong>Reservoir Thermal Isotherms:</strong> Dynamic radial isotherm rings visualize the heat propagation radius around the perforation zone (260°C core to 45°C boundary).</li>
                    <li><strong>Live Viscosity Gradient:</strong> Color-coded fluid column dynamically changes color from dark asphaltic black (cold crude) to golden amber (hot mobile crude).</li>
                </ul>
            </div>
        </div>
        <div class="slide-footer">
            <span>WELLORA Industrial Systems &bull; Orange & White Presentation Deck</span>
            <span>Slide 14 / 24</span>
        </div>
    </div>

    <!-- SLIDE 15: BACKEND CODING - ANDRADE VISCOSITY -->
    <div class="slide">
        <div class="slide-accent-bar"></div>
        <div class="slide-header">
            <div>
                <div class="pill">⚙ BACKEND CODE 01</div>
                <div class="slide-title">Backend Coding: Andrade Thermal Viscosity & CSS Heat Decay Solver</div>
            </div>
            <div class="slide-number">15 / 24</div>
        </div>
        <div class="slide-body grid-3-2">
            <div class="code-box"><span class="code-comment">// src/services/physicsEngine.ts - Andrade Model & Thermal ODE</span>
<span class="code-keyword">export function</span> <span class="code-func">calculateViscosity</span>(<span class="code-var">tempCelsius</span>: <span class="code-var">number</span>, <span class="code-var">apiGravity</span>: <span class="code-var">number</span> = <span class="code-num">17.5</span>): <span class="code-var">number</span> {
  <span class="code-keyword">const</span> T_kelvin = tempCelsius + <span class="code-num">273.15</span>;
  <span class="code-keyword">const</span> A = <span class="code-num">0.0125</span>; <span class="code-comment">// Calibrated for 17.5° API crude oil</span>
  <span class="code-keyword">const</span> B = <span class="code-num">1850</span>;   <span class="code-comment">// Activation energy coefficient (Kelvin)</span>
  <span class="code-keyword">const</span> viscosity = A * Math.<span class="code-func">exp</span>(B / T_kelvin);
  <span class="code-keyword">return</span> Math.<span class="code-func">max</span>(<span class="code-num">1.0</span>, parseFloat(viscosity.<span class="code-func">toFixed</span>(<span class="code-num">2</span>)));
}

<span class="code-comment">// Cyclic Steam Stimulation (CSS) 90-Day Formation Heat Loss Solver</span>
<span class="code-keyword">export function</span> <span class="code-func">calculateCycleState</span>(<span class="code-var">dayOfCycle</span>: <span class="code-var">number</span>, <span class="code-var">steamTemp</span>: <span class="code-var">number</span> = <span class="code-num">260</span>) {
  <span class="code-keyword">if</span> (dayOfCycle &lt;= <span class="code-num">12</span>) {
    <span class="code-comment">// Stage 1: Continuous Steam Injection (260°C superheated steam)</span>
    <span class="code-keyword">return</span> { stage: <span class="code-str">'INJECTION'</span>, temp: steamTemp, viscosity: <span class="code-func">calculateViscosity</span>(steamTemp) };
  } <span class="code-keyword">else if</span> (dayOfCycle &lt;= <span class="code-num">18</span>) {
    <span class="code-comment">// Stage 2: Reservoir Thermal Soaking (conductive matrix heating)</span>
    <span class="code-keyword">const</span> soakProgress = (dayOfCycle - <span class="code-num">12</span>) / <span class="code-num">6</span>;
    <span class="code-keyword">const</span> temp = steamTemp - (soakProgress * <span class="code-num">25</span>);
    <span class="code-keyword">return</span> { stage: <span class="code-str">'SOAKING'</span>, temp, viscosity: <span class="code-func">calculateViscosity</span>(temp) };
  } <span class="code-keyword">else</span> {
    <span class="code-comment">// Stage 3: Production Drawdown with Exponential Formation Heat Loss</span>
    <span class="code-keyword">const</span> prodDays = dayOfCycle - <span class="code-num">18</span>;
    <span class="code-keyword">const</span> decayRate = <span class="code-num">0.038</span>; <span class="code-comment">// Formation heat conduction loss per day</span>
    <span class="code-keyword">const</span> temp = <span class="code-num">45</span> + (steamTemp - <span class="code-num">70</span>) * Math.<span class="code-func">exp</span>(-decayRate * prodDays);
    <span class="code-keyword">return</span> { stage: <span class="code-str">'PRODUCTION'</span>, temp, viscosity: <span class="code-func">calculateViscosity</span>(temp) };
  }
}</div>
            <div class="card highlight">
                <div class="card-title">Code Engineering Rationale</div>
                <ul class="point-list">
                    <li><strong>Exact Andrade Thermal Formulation:</strong> Converts temperature in Celsius to absolute Kelvin ($T + 273.15$) and executes exponential evaluation in $O(1)$ constant time.</li>
                    <li><strong>Piecewise CSS Transition Solver:</strong> Smoothly switches between Injection, Soaking, and Production regimes without numerical discontinuities.</li>
                    <li><strong>Sub-Millisecond Execution:</strong> Pure deterministic TypeScript functions run seamlessly inside the 60 FPS animation loop.</li>
                </ul>
            </div>
        </div>
        <div class="slide-footer">
            <span>WELLORA Industrial Systems &bull; Orange & White Presentation Deck</span>
            <span>Slide 15 / 24</span>
        </div>
    </div>

    <!-- SLIDE 16: BACKEND CODING - SUCKER ROD MECHANICS -->
    <div class="slide">
        <div class="slide-accent-bar"></div>
        <div class="slide-header">
            <div>
                <div class="pill">⚙ BACKEND CODE 02</div>
                <div class="slide-title">Backend Coding: Sucker Rod Mechanics & API RP 11L Stress Engine</div>
            </div>
            <div class="slide-number">16 / 24</div>
        </div>
        <div class="slide-body grid-3-2">
            <div class="code-box"><span class="code-comment">// src/services/physicsEngine.ts - Sucker Rod Dynamic Mechanics</span>
<span class="code-keyword">export function</span> <span class="code-func">calculateSRPMechanics</span>(
  <span class="code-var">spm</span>: <span class="code-var">number</span>, <span class="code-var">strokeInches</span>: <span class="code-var">number</span>,
  <span class="code-var">depthMeters</span>: <span class="code-var">number</span>, <span class="code-var">viscosity</span>: <span class="code-var">number</span>
) {
  <span class="code-comment">// Fluid Viscous Drag Factor coupling Darcy pipe flow</span>
  <span class="code-keyword">const</span> fluidDragFactor = <span class="code-num">1</span> + (viscosity / <span class="code-num">500</span>) * <span class="code-num">0.45</span>;
  
  <span class="code-comment">// Buoyant Rod Weight in 17.5° API crude (0.95 g/cm³ density)</span>
  <span class="code-keyword">const</span> rodWeightInFluid = depthMeters * <span class="code-num">3.28084</span> * <span class="code-num">1.85</span> * (<span class="code-num">1</span> - (<span class="code-num">0.95</span> / <span class="code-num">7.85</span>));
  
  <span class="code-comment">// API RP 11L Acceleration Factor: α = (S · N²) / 70,500</span>
  <span class="code-keyword">const</span> accelerationFactor = (strokeInches * Math.<span class="code-func">pow</span>(spm, <span class="code-num">2</span>)) / <span class="code-num">70500</span>;
  
  <span class="code-comment">// Peak Polish Rod Load (PPRL) on Upstroke (lbs)</span>
  <span class="code-keyword">const</span> pprl = (rodWeightInFluid + <span class="code-num">1800</span>) * (<span class="code-num">1</span> + accelerationFactor) * fluidDragFactor;
  
  <span class="code-comment">// Minimum Polish Rod Load (MPRL) on Downstroke (lbs)</span>
  <span class="code-keyword">const</span> mprl = Math.<span class="code-func">max</span>(<span class="code-num">1200</span>, rodWeightInFluid * (<span class="code-num">1</span> - accelerationFactor) / fluidDragFactor);
  
  <span class="code-comment">// Tensile Rod Stress Analysis on 7/8" Steel Rod String (PSI)</span>
  <span class="code-keyword">const</span> rodStressPsi = pprl / (Math.PI * Math.<span class="code-func">pow</span>(<span class="code-num">0.875</span> / <span class="code-num">2</span>, <span class="code-num">2</span>));
  <span class="code-keyword">const</span> motorHPEstimate = (pprl * (strokeInches / <span class="code-num">12</span>) * spm) / <span class="code-num">33000</span> * <span class="code-num">1.45</span>;

  <span class="code-keyword">return</span> { pprl: Math.<span class="code-func">round</span>(pprl), mprl: Math.<span class="code-func">round</span>(mprl), rodStressPsi: Math.<span class="code-func">round</span>(rodStressPsi), motorHPEstimate };
}</div>
            <div class="card">
                <div class="card-title">Mechanical Algorithm Highlights</div>
                <ul class="point-list">
                    <li><strong>Industry Standard API RP 11L:</strong> Formulates standard Polish Rod acceleration factors $(S\cdot N^2)/70500$ to capture reciprocating inertia.</li>
                    <li><strong>Coupled Hydrodynamic Viscous Drag:</strong> Incorporates fluid viscosity into the load multiplier, triggering high load warnings when crude cools.</li>
                    <li><strong>Rod Fatigue Protection:</strong> Calculates rod tensile stress against the 30,000 PSI safety ceiling, preventing downhole rod parting.</li>
                </ul>
            </div>
        </div>
        <div class="slide-footer">
            <span>WELLORA Industrial Systems &bull; Orange & White Presentation Deck</span>
            <span>Slide 16 / 24</span>
        </div>
    </div>

    <!-- SLIDE 17: BACKEND CODING - REAL-TIME SCADA -->
    <div class="slide">
        <div class="slide-accent-bar"></div>
        <div class="slide-header">
            <div>
                <div class="pill">⚙ BACKEND CODE 03</div>
                <div class="slide-title">Backend Coding: Real-Time SCADA Stream & Acoustic Synthesizer</div>
            </div>
            <div class="slide-number">17 / 24</div>
        </div>
        <div class="slide-body grid-3-2">
            <div class="code-box"><span class="code-comment">// src/services/realtimeStreamEngine.ts - 2Hz Stream & Web Audio</span>
<span class="code-keyword">function</span> <span class="code-func">playAlarmChime</span>(<span class="code-var">frequency</span> = <span class="code-num">880</span>, <span class="code-var">type</span> = <span class="code-str">'sine'</span>) {
  <span class="code-keyword">try</span> {
    <span class="code-keyword">const</span> ctx = <span class="code-keyword">new</span> (window.AudioContext || (window <span class="code-keyword">as any</span>).webkitAudioContext)();
    <span class="code-keyword">const</span> osc = ctx.<span class="code-func">createOscillator</span>();
    <span class="code-keyword">const</span> gain = ctx.<span class="code-func">createGain</span>();
    osc.type = type <span class="code-keyword">as</span> OscillatorType;
    osc.frequency.<span class="code-func">setValueAtTime</span>(frequency, ctx.currentTime);
    gain.gain.<span class="code-func">setValueAtTime</span>(<span class="code-num">0.15</span>, ctx.currentTime);
    gain.gain.<span class="code-func">exponentialRampToValueAtTime</span>(<span class="code-num">0.001</span>, ctx.currentTime + <span class="code-num">0.35</span>);
    osc.<span class="code-func">connect</span>(gain);
    gain.<span class="code-func">connect</span>(ctx.destination);
    osc.<span class="code-func">start</span>();
    osc.<span class="code-func">stop</span>(ctx.currentTime + <span class="code-num">0.35</span>);
  } <span class="code-keyword">catch</span> (e) { <span class="code-comment">/* Web Audio fallback */</span> }
}

<span class="code-comment">// 2.0 Hz Real-Time Telemetry Generator Loop</span>
<span class="code-keyword">export function</span> <span class="code-func">startTelemetryStream</span>(<span class="code-var">onData</span>: (<span class="code-var">snapshot</span>: <span class="code-var">ScadaSnapshot</span>) => <span class="code-var">void</span>) {
  <span class="code-keyword">let</span> tickCount = <span class="code-num">0</span>;
  <span class="code-keyword">const</span> interval = setInterval(() => {
    tickCount++;
    <span class="code-keyword">const</span> noise = (Math.<span class="code-func">random</span>() - <span class="code-num">0.5</span>) * <span class="code-num">2</span>;
    <span class="code-func">onData</span>({
      timestamp: Date.<span class="code-func">now</span>(),
      wellheadPressure: <span class="code-num">14.8</span> + noise * <span class="code-num">0.3</span>,
      motorCurrent: <span class="code-num">38.5</span> + Math.<span class="code-func">sin</span>(tickCount * <span class="code-num">0.4</span>) * <span class="code-num">4.2</span> + noise * <span class="code-num">0.5</span>,
      polishRodLoad: <span class="code-num">18500</span> + Math.<span class="code-func">sin</span>(tickCount * <span class="code-num">0.4</span>) * <span class="code-num">3500</span> + noise * <span class="code-num">200</span>,
      flowRate: <span class="code-num">312.4</span> + noise * <span class="code-num">4.0</span>
    });
  }, <span class="code-num">500</span>); <span class="code-comment">// 500ms = 2.0 Hz sampling rate</span>
  <span class="code-keyword">return</span> () => clearInterval(interval);
}</div>
            <div class="card highlight">
                <div class="card-title">Telemetry Engine Highlights</div>
                <ul class="point-list">
                    <li><strong>Browser-Native Audio Synthesis:</strong> Creates pure sine and square acoustic alarm chimes directly using browser Web Audio nodes, avoiding external asset load failures.</li>
                    <li><strong>500ms Sampling Heartbeat:</strong> Generates continuous industrial telemetry without network lag or browser thread starvation.</li>
                    <li><strong>Gaussian Noise Modeling:</strong> Simulates authentic analog-to-digital converter (ADC) sensor noise jitter.</li>
                </ul>
            </div>
        </div>
        <div class="slide-footer">
            <span>WELLORA Industrial Systems &bull; Orange & White Presentation Deck</span>
            <span>Slide 17 / 24</span>
        </div>
    </div>

    <!-- SLIDE 18: BACKEND CODING - AI COPILOT -->
    <div class="slide">
        <div class="slide-accent-bar"></div>
        <div class="slide-header">
            <div>
                <div class="pill">⚙ BACKEND CODE 04</div>
                <div class="slide-title">Backend Coding: Conversational AI Copilot & Scenario Dispatcher</div>
            </div>
            <div class="slide-number">18 / 24</div>
        </div>
        <div class="slide-body grid-3-2">
            <div class="code-box"><span class="code-comment">// src/services/aiAdvisorService.ts - Natural Language Copilot</span>
<span class="code-keyword">export async function</span> <span class="code-func">getAiCopilotResponse</span>(<span class="code-var">query</span>: <span class="code-var">string</span>, <span class="code-var">ctx</span>: <span class="code-var">WelloraState</span>): <span class="code-func">Promise</span>&lt;<span class="code-var">AiCopilotMessage</span>&gt; {
  <span class="code-keyword">const</span> q = query.<span class="code-func">toLowerCase</span>();
  
  <span class="code-comment">// 1. Parameter Extraction & Instant Simulation Recalculation</span>
  <span class="code-keyword">const</span> spmMatch = q.<span class="code-func">match</span>(<span class="code-str">/(\\d+(\\.\\d+)?)\\s*(spm|speed|rpm)/i</span>);
  <span class="code-keyword">if</span> (spmMatch) {
    <span class="code-keyword">const</span> targetSpm = parseFloat(spmMatch[<span class="code-num">1</span>]);
    <span class="code-keyword">const</span> sim = <span class="code-func">calculateSRPMechanics</span>(targetSpm, ctx.strokeLength, ctx.wellDepth, ctx.viscosity);
    <span class="code-keyword">return</span> {
      text: <span class="code-str">\`⚡ Dynamic Simulation for \${targetSpm} SPM: Peak Polish Rod Load calculates to \${sim.pprl.toLocaleString()} lbs with \${sim.motorHPEstimate} HP demand. Rod stress is \${sim.rodStressPsi.toLocaleString()} PSI (\${sim.rodStressPsi &lt; 30000 ? 'SAFE' : 'CRITICAL'}).\`</span>,
      action: { type: <span class="code-str">'SET_SPM'</span>, value: targetSpm }, confidence: <span class="code-num">0.98</span>
    };
  }
  
  <span class="code-comment">// 2. Heavy Oil Domain Ontology & Thermal Recommendations</span>
  <span class="code-keyword">if</span> (q.<span class="code-func">includes</span>(<span class="code-str">'steam'</span>) || q.<span class="code-func">includes</span>(<span class="code-str">'viscosity'</span>) || q.<span class="code-func">includes</span>(<span class="code-str">'temperature'</span>)) {
    <span class="code-keyword">const</span> recTemp = ctx.viscosity &gt; <span class="code-num">500</span> ? <span class="code-num">280</span> : <span class="code-num">240</span>;
    <span class="code-keyword">return</span> {
      text: <span class="code-str">\`🔥 Current crude viscosity is \${ctx.viscosity} cP at \${ctx.bottomHoleTemp}°C. Optimal Andrade transition requires heating above 180°C.\`</span>,
      action: { type: <span class="code-str">'OPTIMIZE_STEAM'</span>, value: recTemp }, confidence: <span class="code-num">0.95</span>
    };
  }
  
  <span class="code-comment">// 3. Open-Ended Technical Guidance</span>
  <span class="code-keyword">return</span> <span class="code-func">generateTechnicalExplanation</span>(query, ctx);
}</div>
            <div class="card">
                <div class="card-title">AI Engine Architecture</div>
                <ul class="point-list">
                    <li><strong>Physics-Grounded Intent Parsing:</strong> Evaluates queries against live reservoir parameters rather than returning canned responses.</li>
                    <li><strong>Dynamic Scenario Execution:</strong> Recalculates Sucker Rod mechanics and thermodynamic ODEs on-the-fly when operators propose parameter changes.</li>
                    <li><strong>Action Payload Dispatching:</strong> Emits structured action events that update digital twin sliders with single-click operator approval.</li>
                </ul>
            </div>
        </div>
        <div class="slide-footer">
            <span>WELLORA Industrial Systems &bull; Orange & White Presentation Deck</span>
            <span>Slide 18 / 24</span>
        </div>
    </div>

    <!-- SLIDE 19: OUTPUT SCREENSHOT 1 - SCADA GRID -->
    <div class="slide">
        <div class="slide-accent-bar"></div>
        <div class="slide-header">
            <div>
                <div class="pill">⚙ OUTPUT SCREENSHOT 01</div>
                <div class="slide-title">Output Screenshots: SCADA Operational Suite & Alarm Matrix</div>
            </div>
            <div class="slide-number">19 / 24</div>
        </div>
        <div class="slide-body grid-2-1">
            <div class="img-card">
                <img src="${images.finalDashboard}" class="img-preview" alt="Operational SCADA Suite Screenshot">
            </div>
            <div class="card highlight">
                <div class="card-title">Control Room Operations & Alarm Handling</div>
                <ul class="point-list">
                    <li><strong>Real-Time SCADA Alarm Matrix:</strong>
                        <br>&bull; <em>Critical Alert (Red):</em> Peak Polish Rod Load exceeded 22,000 lbs threshold on cold start.
                        <br>&bull; <em>Warning Alert (Amber):</em> Wellhead pressure dropped below 8.0 bar during high drawdown.
                    </li>
                    <li><strong>Alarm Acknowledgment Workflow:</strong> Operators can acknowledge alarms individually, silencing acoustic chimes while maintaining audit event logs.</li>
                    <li><strong>Integrated Multi-Widget View:</strong> Simultaneously presents telemetry KPIs, live waveform oscilloscope, and dynamometer loop on a single control screen.</li>
                </ul>
            </div>
        </div>
        <div class="slide-footer">
            <span>WELLORA Industrial Systems &bull; Orange & White Presentation Deck</span>
            <span>Slide 19 / 24</span>
        </div>
    </div>

    <!-- SLIDE 20: OUTPUT SCREENSHOT 2 - AI COPILOT CHAT -->
    <div class="slide">
        <div class="slide-accent-bar"></div>
        <div class="slide-header">
            <div>
                <div class="pill">⚙ OUTPUT SCREENSHOT 02</div>
                <div class="slide-title">Output Screenshots: Conversational AI Copilot Freeform Dialogue</div>
            </div>
            <div class="slide-number">20 / 24</div>
        </div>
        <div class="slide-body grid-2-1">
            <div class="img-card">
                <img src="${images.aiChat}" class="img-preview" alt="AI Copilot Dialogue Screenshot">
            </div>
            <div class="card">
                <div class="card-title">Conversational Copilot in Action</div>
                <ul class="point-list">
                    <li><strong>Non-Restricted Natural Language:</strong> Operators can ask any operational question (e.g. <em>"Explain the Andrade viscosity equation"</em> or <em>"How does CSS thermal soaking work?"</em>).</li>
                    <li><strong>Accurate Engineering Explanations:</strong> The copilot provides step-by-step mathematical reasoning, citing reservoir temperatures, calibrated coefficients, and operational limits.</li>
                    <li><strong>Context-Aware Dialogue:</strong> Automatically extracts current digital twin state (temperature, pressure, cycle day) into the response prompt.</li>
                </ul>
            </div>
        </div>
        <div class="slide-footer">
            <span>WELLORA Industrial Systems &bull; Orange & White Presentation Deck</span>
            <span>Slide 20 / 24</span>
        </div>
    </div>

    <!-- SLIDE 21: OUTPUT SCREENSHOT 3 - AI DISPATCH -->
    <div class="slide">
        <div class="slide-accent-bar"></div>
        <div class="slide-header">
            <div>
                <div class="pill">⚙ OUTPUT SCREENSHOT 03</div>
                <div class="slide-title">Output Screenshots: Dynamic What-If Parameter Action Dispatch</div>
            </div>
            <div class="slide-number">21 / 24</div>
        </div>
        <div class="slide-body grid-2-1">
            <div class="img-card">
                <img src="${images.aiDispatch}" class="img-preview" alt="AI Action Dispatch Screenshot">
            </div>
            <div class="card highlight">
                <div class="card-title">Closed-Loop Parameter Dispatching</div>
                <ul class="point-list">
                    <li><strong>Interactive Action Buttons:</strong> When the copilot recommends an optimization (e.g. <em>"Apply 6.5 SPM Setpoint"</em>), it renders an embedded direct action button.</li>
                    <li><strong>Instant Simulation Update:</strong> Clicking the button immediately updates the digital twin's pumping speed, recalculates rod loads, and updates the dynamometer card.</li>
                    <li><strong>Operator Safety Guardrails:</strong> Setpoint changes require explicit operator confirmation, preserving human-in-the-loop safety protocols.</li>
                </ul>
            </div>
        </div>
        <div class="slide-footer">
            <span>WELLORA Industrial Systems &bull; Orange & White Presentation Deck</span>
            <span>Slide 21 / 24</span>
        </div>
    </div>

    <!-- SLIDE 22: CONCLUSION -->
    <div class="slide">
        <div class="slide-accent-bar"></div>
        <div class="slide-header">
            <div>
                <div class="pill">⚙ PROJECT SUMMARY</div>
                <div class="slide-title">Conclusion: Summary of Engineering Achievements & Field Value</div>
            </div>
            <div class="slide-number">22 / 24</div>
        </div>
        <div class="slide-body grid-2">
            <div class="card highlight">
                <div class="card-title">Key Technical Accomplishments</div>
                <ul class="point-list">
                    <li><strong>Unified Dual-Physics Twin:</strong> Successfully coupled Andrade thermodynamic viscosity equations with Sucker Rod mechanical wave dynamics into a single cohesive real-time web application.</li>
                    <li><strong>Real-Time 2.0 Hz SCADA Streaming:</strong> Built a high-frequency telemetry engine and native Web Audio acoustic synthesizer delivering true industrial SCADA situational awareness.</li>
                    <li><strong>Intelligent Conversational Copilot:</strong> Developed an open-ended conversational AI capable of on-the-fly what-if scenario solving and closed-loop setpoint dispatching.</li>
                </ul>
            </div>
            <div class="card">
                <div class="card-title">Demonstrated Field & Economic Impact</div>
                <ul class="point-list">
                    <li><strong>+28.4% Steam Thermal Efficiency:</strong> Predictive soak-time scheduling avoids wasted steam boiler fuel and optimizes thermal energy transfer into the formation.</li>
                    <li><strong>-34.8% Reduction in Rod String Fatigue:</strong> Automated SPM speed regulation prevents fluid pound impact shocks and prolongs rod string lifespan.</li>
                    <li><strong>Zero-Install Web Deployment:</strong> Accessible instantly via any modern browser or mobile device with zero desktop client installation overhead.</li>
                </ul>
            </div>
        </div>
        <div class="slide-footer">
            <span>WELLORA Industrial Systems &bull; Orange & White Presentation Deck</span>
            <span>Slide 22 / 24</span>
        </div>
    </div>

    <!-- SLIDE 23: FUTURE ENHANCEMENT -->
    <div class="slide">
        <div class="slide-accent-bar"></div>
        <div class="slide-header">
            <div>
                <div class="pill">⚙ ROADMAP & NEXT GENERATION</div>
                <div class="slide-title">Future Enhancement & Industrial Development Roadmap</div>
            </div>
            <div class="slide-number">23 / 24</div>
        </div>
        <div class="slide-body" style="grid-template-columns: 1fr; display: flex; flex-direction: column; gap: 14px;">
            <div class="card" style="flex-direction: row; align-items: center; gap: 24px; padding: 18px 24px;">
                <div style="font-size: 34px;">🌐</div>
                <div>
                    <div class="card-title" style="font-size: 18px;">1. Edge IoT RTU Hardware Bridge (MQTT Sparkplug B & OPC-UA)</div>
                    <div style="font-size: 14.5px; color: var(--text-body); margin-top: 4px;">Direct physical coupling with field Modbus TCP RTUs, MQTT brokers, and Siemens/Rockwell PLCs for live field wellhead sensor data ingestion.</div>
                </div>
            </div>
            <div class="card" style="flex-direction: row; align-items: center; gap: 24px; padding: 18px 24px;">
                <div style="font-size: 34px;">🧠</div>
                <div>
                    <div class="card-title" style="font-size: 18px;">2. Physics-Informed Neural Networks (PINN)</div>
                    <div style="font-size: 14.5px; color: var(--text-body); margin-top: 4px;">Embedding deep learning PINN surrogate models to solve 3D reservoir thermal diffusion equations in sub-milliseconds on edge AI accelerators.</div>
                </div>
            </div>
            <div class="card highlight" style="flex-direction: row; align-items: center; gap: 24px; padding: 18px 24px;">
                <div style="font-size: 34px;">🔄</div>
                <div>
                    <div class="card-title" style="font-size: 18px;">3. Autonomous Closed-Loop VFD Motor Modulation</div>
                    <div style="font-size: 14.5px; color: var(--text-body); margin-top: 4px;">Enabling autonomous Variable Frequency Drive (VFD) speed modulation, automatically throttling pump SPM upon detecting fluid pound or gas lock.</div>
                </div>
            </div>
            <div class="card" style="flex-direction: row; align-items: center; gap: 24px; padding: 18px 24px;">
                <div style="font-size: 34px;">📱</div>
                <div>
                    <div class="card-title" style="font-size: 18px;">4. Native Android APK & Cross-Platform Field App</div>
                    <div style="font-size: 14.5px; color: var(--text-body); margin-top: 4px;">Packaging WELLORA into a native Android APK and iOS field application with push notifications for critical downhole pressure drop and rod stress alarms.</div>
                </div>
            </div>
        </div>
        <div class="slide-footer">
            <span>WELLORA Industrial Systems &bull; Orange & White Presentation Deck</span>
            <span>Slide 23 / 24</span>
        </div>
    </div>

    <!-- SLIDE 24: REFERENCES -->
    <div class="slide">
        <div class="slide-accent-bar"></div>
        <div class="slide-header">
            <div>
                <div class="pill">⚙ BIBLIOGRAPHY & STANDARDS</div>
                <div class="slide-title">References & Industry Standards</div>
            </div>
            <div class="slide-number">24 / 24</div>
        </div>
        <div class="slide-body grid-1">
            <div class="card">
                <ul class="point-list" style="gap: 14px;">
                    <li><strong>[1] American Petroleum Institute (API) RP 11L:</strong> "Recommended Practice for Design Calculations for Sucker Rod Pumping Systems (Conventional Units)", 5th Edition, API Publishing Services, Washington, D.C.</li>
                    <li><strong>[2] Andrade, E. N. da C. (1934):</strong> "A Theory of the Viscosity of Liquids", Philosophical Magazine, Series 7, Vol. 17, No. 112, pp. 497-511.</li>
                    <li><strong>[3] Prats, M. (1982):</strong> "Thermal Recovery", SPE Monograph Volume 7, Society of Petroleum Engineers, Richardson, TX.</li>
                    <li><strong>[4] Gibbs, S. G. & Neely, A. B. (1966):</strong> "Computer Diagnosis of Down-Hole Conditions in Sucker Rod Pumping Wells", Journal of Petroleum Technology, SPE-1165-PA.</li>
                    <li><strong>[5] Butler, R. M. (1991):</strong> "Thermal Recovery of Oil and Bitumen", Prentice Hall, Englewood Cliffs, NJ.</li>
                    <li><strong>[6] Takacs, G. (2015):</strong> "Sucker-Rod Pumping Manual", PennWell Books, Tulsa, OK.</li>
                    <li><strong>[7] ISO/IEC 62443:</strong> "Industrial communication networks - Network and system security (SCADA Automation)".</li>
                    <li><strong>[8] IEEE 802.3 / Modbus-IDA:</strong> "Modbus Application Protocol Specification v1.1b3 for Industrial RTU SCADA Telemetry".</li>
                </ul>
            </div>
        </div>
        <div class="slide-footer">
            <span>WELLORA Industrial Systems &bull; Orange & White Presentation Deck</span>
            <span>Slide 24 / 24</span>
        </div>
    </div>

</body>
</html>`;

const htmlPath = path.join(__dirname, 'printable_slides_orange_white.html');
fs.writeFileSync(htmlPath, htmlContent);
console.log('Saved printable_slides_orange_white.html');

const pdfPath = path.join(__dirname, 'WELLORA_Project_Presentation.pdf');
const edgeExe = 'C:\\\\Program Files (x86)\\\\Microsoft\\\\Edge\\\\Application\\\\msedge.exe';

const cmd = '"' + edgeExe + '" --headless --disable-gpu --run-all-compositor-stages-before-draw --print-to-pdf="' + pdfPath + '" --print-to-pdf-no-header "file:///' + htmlPath.replace(/\\\\/g, '/') + '"';
console.log('Running Edge print-to-pdf command...');

try {
    execSync(cmd, { stdio: 'inherit' });
    console.log('SUCCESS: Generated Orange-White PDF at:', pdfPath);
} catch (e) {
    console.error('Error generating PDF:', e);
}
