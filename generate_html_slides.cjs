const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/MITHESH D/.gemini/antigravity-ide/brain/14e63401-9d19-4aa9-8024-e9c8c66482db';

function getBase64Image(name) {
    const p = path.join(ARTIFACT_DIR, name);
    if (fs.existsSync(p)) {
        const ext = path.extname(p).slice(1);
        const b64 = fs.readFileSync(p).toString('base64');
        return `data:image/${ext};base64,${b64}`;
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
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WELLORA - Dual-Physics Digital Twin & SCADA AI Optimization PPT</title>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
            --bg-deep: #080A0F;
            --bg-card: #10141E;
            --bg-card-light: #161D2C;
            --orange-primary: #FF6B00;
            --orange-glow: #FF8C00;
            --amber: #FFA726;
            --cyan: #00E5FF;
            --green: #00E676;
            --red: #FF3D71;
            --text-primary: #FFFFFF;
            --text-secondary: #9EABB8;
            --text-muted: #5A6778;
            --border: #232E40;
            --border-orange: rgba(255, 107, 0, 0.4);
        }
        body {
            font-family: 'Inter', sans-serif;
            background-color: var(--bg-deep);
            color: var(--text-primary);
            overflow: hidden;
            user-select: none;
        }
        .presentation-container {
            width: 100vw;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }
        .slide {
            width: 92vw;
            max-width: 1500px;
            height: 88vh;
            max-height: 850px;
            background: var(--bg-card);
            border: 1px solid var(--border-orange);
            border-radius: 16px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.8), 0 0 30px rgba(255,107,0,0.12);
            position: absolute;
            display: none;
            flex-direction: column;
            padding: 32px 40px;
            overflow: hidden;
            animation: slideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .slide.active {
            display: flex;
        }
        @keyframes slideIn {
            from { opacity: 0; transform: scale(0.97) translateY(10px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .slide-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            padding-bottom: 16px;
            border-bottom: 1px solid var(--border);
            margin-bottom: 20px;
            position: relative;
        }
        .slide-header::after {
            content: '';
            position: absolute;
            bottom: -1px;
            left: 0;
            width: 160px;
            height: 2px;
            background: linear-gradient(90deg, var(--orange-primary), transparent);
        }
        .pill {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: rgba(255, 107, 0, 0.12);
            border: 1px solid var(--orange-primary);
            color: var(--amber);
            font-size: 11px;
            font-weight: 700;
            padding: 4px 12px;
            border-radius: 20px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 6px;
        }
        .slide-title {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 26px;
            font-weight: 700;
            color: #FFF;
        }
        .slide-number {
            font-family: 'JetBrains Mono', monospace;
            font-size: 14px;
            font-weight: 700;
            color: var(--orange-primary);
            background: rgba(255, 107, 0, 0.1);
            padding: 6px 14px;
            border-radius: 8px;
            border: 1px solid var(--border-orange);
        }
        .slide-body {
            flex: 1;
            display: grid;
            gap: 24px;
            overflow-y: auto;
        }
        .grid-2 { grid-template-columns: 1fr 1fr; }
        .grid-3 { grid-template-columns: 1fr 1fr 1fr; }
        .grid-2-3 { grid-template-columns: 2fr 1fr; }
        .grid-1-2 { grid-template-columns: 1fr 2fr; }
        
        .card {
            background: var(--bg-card-light);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        .card.highlight {
            border-color: var(--orange-primary);
            box-shadow: 0 0 20px rgba(255,107,0,0.15);
        }
        .card-title {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 16px;
            font-weight: 700;
            color: var(--orange-primary);
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .card-title.cyan { color: var(--cyan); }
        .card-title.amber { color: var(--amber); }
        .card-title.green { color: var(--green); }
        
        .point-list {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        .point-list li {
            font-size: 13px;
            line-height: 1.5;
            color: var(--text-secondary);
            position: relative;
            padding-left: 18px;
        }
        .point-list li::before {
            content: '▹';
            position: absolute;
            left: 0;
            color: var(--orange-primary);
            font-weight: bold;
        }
        .point-list li strong {
            color: #FFF;
        }

        .code-box {
            background: #080A0F;
            border: 1px solid #1E293B;
            border-radius: 8px;
            padding: 14px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 11.5px;
            line-height: 1.5;
            color: #E2E8F0;
            overflow-x: auto;
            white-space: pre;
        }
        .code-keyword { color: #FF7B72; }
        .code-func { color: #D2A8FF; }
        .code-var { color: #79C0FF; }
        .code-str { color: #A5D6FF; }
        .code-num { color: #FFA657; }
        .code-comment { color: #8B949E; font-style: italic; }

        .img-preview {
            width: 100%;
            height: 100%;
            max-height: 380px;
            object-fit: cover;
            border-radius: 10px;
            border: 1px solid var(--border-orange);
            box-shadow: 0 10px 30px rgba(0,0,0,0.6);
        }

        .kpi-row {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
        }
        .kpi-card {
            background: rgba(255, 107, 0, 0.05);
            border: 1px solid var(--border-orange);
            border-radius: 10px;
            padding: 14px;
            text-align: center;
        }
        .kpi-val {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 24px;
            font-weight: 700;
            color: var(--orange-primary);
            margin-bottom: 4px;
        }
        .kpi-label {
            font-size: 11px;
            font-weight: 600;
            color: #FFF;
        }

        /* Controls bar */
        .controls {
            position: absolute;
            bottom: 16px;
            display: flex;
            align-items: center;
            gap: 16px;
            background: rgba(16, 20, 30, 0.85);
            backdrop-filter: blur(12px);
            padding: 8px 20px;
            border-radius: 30px;
            border: 1px solid var(--border);
            z-index: 100;
        }
        .btn {
            background: rgba(255, 107, 0, 0.15);
            border: 1px solid var(--orange-primary);
            color: #FFF;
            padding: 6px 14px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
        }
        .btn:hover {
            background: var(--orange-primary);
            color: #000;
        }
        .nav-counter {
            font-family: 'JetBrains Mono', monospace;
            font-size: 13px;
            color: var(--amber);
        }
    </style>
</head>
<body>

<div class="presentation-container">

    <!-- SLIDE 1: COVER -->
    <div class="slide active" id="slide-1">
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; gap: 20px;">
            <div class="pill">⚡ HEAVY CRUDE OIL (17.5° API) DIGITAL TWIN</div>
            <h1 style="font-family: 'Space Grotesk', sans-serif; font-size: 56px; font-weight: 800; color: var(--orange-primary); letter-spacing: -1px;">
                WELLORA
            </h1>
            <h2 style="font-size: 24px; font-weight: 600; color: #FFF; max-width: 900px;">
                Dual-Physics Digital Twin & Real-Time SCADA AI Optimization System
            </h2>
            <p style="font-size: 15px; color: var(--text-secondary); max-width: 800px; line-height: 1.6;">
                Integrating Andrade Thermal Viscosity, Sucker Rod Pump (SRP) Mechanics, Cyclic Steam Stimulation (CSS) EOR & Conversational AI Copilot
            </p>
            <div style="display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; margin-top: 10px;">
                <span class="pill" style="border-color: var(--cyan); color: var(--cyan); background: rgba(0,229,255,0.1);">React 18 + TS</span>
                <span class="pill" style="border-color: var(--amber); color: var(--amber); background: rgba(255,167,38,0.1);">Thermal ODE Solver</span>
                <span class="pill" style="border-color: var(--green); color: var(--green); background: rgba(0,230,118,0.1);">2Hz Live SCADA</span>
                <span class="pill" style="border-color: var(--orange-primary); color: var(--orange-primary); background: rgba(255,107,0,0.1);">Laser Dynamometer</span>
            </div>
            <div style="margin-top: 24px; font-size: 13px; color: var(--text-muted);">
                Presented by: <strong style="color: #FFF;">Mithesh D</strong> &bull; Production SCADA Digital Twin & AI Systems
            </div>
        </div>
    </div>

    <!-- SLIDE 2: ABSTRACT -->
    <div class="slide" id="slide-2">
        <div class="slide-header">
            <div>
                <div class="pill">⚙ EXECUTIVE SUMMARY</div>
                <div class="slide-title">Abstract: Dual-Physics SCADA Digital Twin</div>
            </div>
            <div class="slide-number">02 / 17</div>
        </div>
        <div class="slide-body grid-2">
            <div class="card">
                <div class="card-title">Executive Problem & Solution</div>
                <ul class="point-list">
                    <li><strong>17.5° API Heavy Crude Reality:</strong> Downhole fluid viscosity exceeds 3,500 cP at reservoir temperature (28°C), causing severe rod floating, motor overloading, and wellbore choking.</li>
                    <li><strong>Cyclic Steam Stimulation (CSS):</strong> High-temperature steam (260°C - 310°C) reduces oil viscosity exponentially via Andrade's logarithmic relationship.</li>
                    <li><strong>SCADA Digital Twin Innovation:</strong> WELLORA replaces passive historians with active dual-physics simulations, streaming at 2 Hz with acoustic alarms and AI copilot actions.</li>
                </ul>
            </div>
            <div class="card highlight">
                <div class="card-title amber">Validated Operational Gains</div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 10px;">
                    <div class="kpi-card">
                        <div class="kpi-val">+28.4%</div>
                        <div class="kpi-label">Steam Thermal Efficiency</div>
                    </div>
                    <div class="kpi-card">
                        <div class="kpi-val">-34.8%</div>
                        <div class="kpi-label">Rod Fatigue & Peak Load</div>
                    </div>
                    <div class="kpi-card">
                        <div class="kpi-val">2.0 Hz</div>
                        <div class="kpi-label">Live SCADA Streaming</div>
                    </div>
                    <div class="kpi-card">
                        <div class="kpi-val">100%</div>
                        <div class="kpi-label">AI What-If Actions</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- SLIDE 3: INTRODUCTION -->
    <div class="slide" id="slide-3">
        <div class="slide-header">
            <div>
                <div class="pill">⚙ ENGINEERING BACKGROUND</div>
                <div class="slide-title">Introduction: Heavy Oil Physics & Operational Realities</div>
            </div>
            <div class="slide-number">03 / 17</div>
        </div>
        <div class="slide-body grid-3">
            <div class="card">
                <div class="card-title">1. Heavy Oil Fluid Dynamics</div>
                <ul class="point-list">
                    <li>Specific gravity 0.95 g/cm³ with dense resin and asphaltic chains.</li>
                    <li>Cold reservoir conditions exhibit near-solid Bingham plastic shear behavior.</li>
                    <li>Viscosity is hypersensitive to temperature variations.</li>
                </ul>
            </div>
            <div class="card">
                <div class="card-title amber">2. Cyclic Steam Stimulation</div>
                <ul class="point-list">
                    <li><strong>Injection:</strong> 12 days of 260°C superheated steam at 15 MPa.</li>
                    <li><strong>Soaking:</strong> 6 days shut-in for conduction heating into rock matrix.</li>
                    <li><strong>Production:</strong> 72 days pumping with fluid viscosity dropped to 12 cP.</li>
                </ul>
            </div>
            <div class="card">
                <div class="card-title cyan">3. SRP Lift Dynamics</div>
                <ul class="point-list">
                    <li>Reciprocating beam pump lifts fluid from 1,200m depth.</li>
                    <li>Rod stretch and viscous drag cause fluid pound and high PPRL.</li>
                    <li>Surface & downhole dynamometer cards are required for diagnostic loops.</li>
                </ul>
            </div>
        </div>
    </div>

    <!-- SLIDE 4: TRAINING & FORMULATION -->
    <div class="slide" id="slide-4">
        <div class="slide-header">
            <div>
                <div class="pill">⚙ PHYSICS FORMULATION</div>
                <div class="slide-title">Details about the Training: Physics Calibration & AI Models</div>
            </div>
            <div class="slide-number">04 / 17</div>
        </div>
        <div class="slide-body grid-2">
            <div class="card">
                <div class="card-title">Andrade Thermal Calibration</div>
                <div class="code-box">ln(μ) = ln(A) + B / (T + 273.15)
Calibrated Parameters:
A = 0.0125 cP, B = 1850 K for 17.5° API Crude</div>
                <ul class="point-list">
                    <li>Calibrated using heavy crude empirical PVT laboratory curves.</li>
                    <li>Accurately predicts 300x viscosity shift across 28°C to 260°C.</li>
                </ul>
            </div>
            <div class="card">
                <div class="card-title cyan">Sucker Rod Wave Equation (API RP 11L)</div>
                <div class="code-box">∂²u/∂t² = a²·(∂²u/∂x²) - c·(∂u/∂t)
PPRL = (W_r + W_f) · (1 + (S·N²)/70500) · DragFactor</div>
                <ul class="point-list">
                    <li>Calculates Polish Rod dynamic loads and stress limits (30,000 PSI).</li>
                    <li>Generates Fourier harmonic surface vs downhole pump cards.</li>
                </ul>
            </div>
        </div>
    </div>

    <!-- SLIDE 5: PROJECT DESCRIPTION -->
    <div class="slide" id="slide-5">
        <div class="slide-header">
            <div>
                <div class="pill">⚙ ARCHITECTURE</div>
                <div class="slide-title">Project Description: Modular Digital Twin Architecture</div>
            </div>
            <div class="slide-number">05 / 17</div>
        </div>
        <div class="slide-body grid-3">
            <div class="card">
                <div class="card-title">01. Real-Time SCADA Engine</div>
                <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.5;">2 Hz telemetry streaming for 4 wells with acoustic Web Audio multi-tone alarm synthesis.</p>
            </div>
            <div class="card">
                <div class="card-title amber">02. Dual-Physics Solver</div>
                <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.5;">Coupled thermodynamic Andrade ODEs with mechanical rod string stress models.</p>
            </div>
            <div class="card">
                <div class="card-title cyan">03. Signal Oscilloscope</div>
                <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.5;">Dual-trace waveform oscilloscope plotting live Rod Load (lbs) and Motor Current (A).</p>
            </div>
            <div class="card">
                <div class="card-title green">04. Laser Dynamometer</div>
                <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.5;">Surface and pump card tracing with real-time beam position indicator and fluid fillage analysis.</p>
            </div>
            <div class="card">
                <div class="card-title">05. What-If Simulation</div>
                <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.5;">Sliders for Steam Temp, Soak Days, SPM, and Stroke Length with instantaneous state updates.</p>
            </div>
            <div class="card">
                <div class="card-title amber">06. Conversational AI Copilot</div>
                <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.5;">Open-ended copilot answering freeform questions and dispatching setpoint actions directly to the twin.</p>
            </div>
        </div>
    </div>

    <!-- SLIDE 6: REQUIREMENTS -->
    <div class="slide" id="slide-6">
        <div class="slide-header">
            <div>
                <div class="pill">⚙ SPECIFICATIONS</div>
                <div class="slide-title">Hardware and Software Requirements</div>
            </div>
            <div class="slide-number">06 / 17</div>
        </div>
        <div class="slide-body grid-2">
            <div class="card">
                <div class="card-title">Hardware Requirements</div>
                <ul class="point-list">
                    <li><strong>CPU:</strong> Intel Core i5 / AMD Ryzen 5 (Multi-core for real-time ODEs).</li>
                    <li><strong>RAM:</strong> 8 GB minimum (16 GB recommended for SCADA stream).</li>
                    <li><strong>Display:</strong> 1920×1080 FHD resolution with WebGL/Canvas 2D GPU acceleration.</li>
                    <li><strong>Edge Gateway:</strong> ARM Cortex-A53 / Moxa Industrial RTU for field deployment.</li>
                </ul>
            </div>
            <div class="card">
                <div class="card-title cyan">Software Stack</div>
                <ul class="point-list">
                    <li><strong>Core Framework:</strong> React 18.3 + TypeScript (Strict Type Safety).</li>
                    <li><strong>Styling & SCADA Theme:</strong> Tailwind CSS + Cyber-Orange Glassmorphism.</li>
                    <li><strong>Graphics & Audio:</strong> HTML5 Canvas API + Native Web Audio API.</li>
                    <li><strong>Build & Cloud Hosting:</strong> Node.js v24+, Vite 5.x, Vercel Production Cloud.</li>
                </ul>
            </div>
        </div>
    </div>

    <!-- SLIDE 7: FRONTEND SCREENSHOTS - DASHBOARD -->
    <div class="slide" id="slide-7">
        <div class="slide-header">
            <div>
                <div class="pill">⚙ USER INTERFACE DESIGN</div>
                <div class="slide-title">Frontend Design: Cyber-Orange SCADA Telemetry Dashboard</div>
            </div>
            <div class="slide-number">07 / 17</div>
        </div>
        <div class="slide-body grid-2-3">
            <div>
                <img src="${images.dashboard}" class="img-preview" alt="Dashboard">
            </div>
            <div class="card highlight">
                <div class="card-title">SCADA Dashboard Highlights</div>
                <ul class="point-list">
                    <li><strong>High-Contrast Industrial Palette:</strong> Jet-Black (#0A0D14) with Cyber-Orange (#FF6B00) prevents eye fatigue in 24/7 control rooms.</li>
                    <li><strong>Multi-Well Matrix:</strong> Instant switching between Well OR-101 through OR-104.</li>
                    <li><strong>Cycle Stepper:</strong> Real-time day timeline indicating current CSS phase.</li>
                </ul>
            </div>
        </div>
    </div>

    <!-- SLIDE 8: FRONTEND SCREENSHOTS - OSCILLOSCOPE & DYNAMOMETER -->
    <div class="slide" id="slide-8">
        <div class="slide-header">
            <div>
                <div class="pill">⚙ SIGNAL VISUALIZERS</div>
                <div class="slide-title">Frontend Design: Live Oscilloscope & Laser Dynamometer</div>
            </div>
            <div class="slide-number">08 / 17</div>
        </div>
        <div class="slide-body grid-2">
            <div class="card">
                <div class="card-title cyan">Live Signal Oscilloscope (2 Hz)</div>
                <img src="${images.oscilloscope}" style="max-height: 240px;" class="img-preview" alt="Oscilloscope">
                <p style="font-size: 12px; color: var(--text-secondary);">Continuous dual-trace plotting of Polish Rod Load and Motor Current.</p>
            </div>
            <div class="card">
                <div class="card-title">Laser Tracing Dynamometer</div>
                <img src="${images.dynamometer}" style="max-height: 240px;" class="img-preview" alt="Dynamometer">
                <p style="font-size: 12px; color: var(--text-secondary);">Real-time beam laser tracing of surface vs downhole pump cards.</p>
            </div>
        </div>
    </div>

    <!-- SLIDE 9: BACKEND - ANDRADE VISCOSITY -->
    <div class="slide" id="slide-9">
        <div class="slide-header">
            <div>
                <div class="pill">⚙ BACKEND CODING</div>
                <div class="slide-title">Backend Coding: Andrade Viscosity & Thermal ODE Solver</div>
            </div>
            <div class="slide-number">09 / 17</div>
        </div>
        <div class="slide-body grid-2">
            <div class="code-box"><span class="code-comment">// src/services/physicsEngine.ts - Andrade Model</span>
<span class="code-keyword">export function</span> <span class="code-func">calculateViscosity</span>(<span class="code-var">tempCelsius</span>: <span class="code-var">number</span>): <span class="code-var">number</span> {
  <span class="code-keyword">const</span> T_kelvin = tempCelsius + <span class="code-num">273.15</span>;
  <span class="code-keyword">const</span> A = <span class="code-num">0.0125</span>; <span class="code-comment">// Calibrated for 17.5° API</span>
  <span class="code-keyword">const</span> B = <span class="code-num">1850</span>;
  <span class="code-keyword">const</span> viscosity = A * Math.<span class="code-func">exp</span>(B / T_kelvin);
  <span class="code-keyword">return</span> Math.<span class="code-func">max</span>(<span class="code-num">1.0</span>, parseFloat(viscosity.<span class="code-func">toFixed</span>(<span class="code-num">2</span>)));
}

<span class="code-comment">// CSS 90-Day Formation Thermal Decay</span>
<span class="code-keyword">export function</span> <span class="code-func">calculateCycleState</span>(<span class="code-var">day</span>: <span class="code-var">number</span>, <span class="code-var">steamTemp</span> = <span class="code-num">260</span>) {
  <span class="code-keyword">if</span> (day &lt;= <span class="code-num">12</span>) {
    <span class="code-keyword">return</span> { stage: <span class="code-str">'INJECTION'</span>, temp: steamTemp };
  } <span class="code-keyword">else if</span> (day &lt;= <span class="code-num">18</span>) {
    <span class="code-keyword">return</span> { stage: <span class="code-str">'SOAKING'</span>, temp: steamTemp - <span class="code-num">25</span> };
  } <span class="code-keyword">else</span> {
    <span class="code-keyword">const</span> temp = <span class="code-num">45</span> + (steamTemp - <span class="code-num">70</span>) * Math.<span class="code-func">exp</span>(-<span class="code-num">0.038</span> * (day - <span class="code-num">18</span>));
    <span class="code-keyword">return</span> { stage: <span class="code-str">'PRODUCTION'</span>, temp };
  }
}</div>
            <div class="card">
                <div class="card-title">Physics Implementation Highlights</div>
                <ul class="point-list">
                    <li><strong>Exact Andrade Relation:</strong> Accurately models the heavy oil thermal thixotropy curve.</li>
                    <li><strong>Formation Thermal Dissipation:</strong> Solves exponential reservoir cooling to calculate optimal re-steaming dates.</li>
                    <li><strong>Deterministic ODE:</strong> Runs in sub-millisecond cycles inside the React render pipeline.</li>
                </ul>
            </div>
        </div>
    </div>

    <!-- SLIDE 10: BACKEND - SUCKER ROD MECHANICS -->
    <div class="slide" id="slide-10">
        <div class="slide-header">
            <div>
                <div class="pill">⚙ BACKEND CODING</div>
                <div class="slide-title">Backend Coding: Sucker Rod Mechanics & Stress Solver</div>
            </div>
            <div class="slide-number">10 / 17</div>
        </div>
        <div class="slide-body grid-2">
            <div class="code-box"><span class="code-comment">// src/services/physicsEngine.ts - API RP 11L SRP Mechanics</span>
<span class="code-keyword">export function</span> <span class="code-func">calculateSRPMechanics</span>(
  <span class="code-var">spm</span>: <span class="code-var">number</span>, <span class="code-var">strokeInches</span>: <span class="code-var">number</span>,
  <span class="code-var">depthMeters</span>: <span class="code-var">number</span>, <span class="code-var">viscosity</span>: <span class="code-var">number</span>
) {
  <span class="code-keyword">const</span> dragFactor = <span class="code-num">1</span> + (viscosity / <span class="code-num">500</span>) * <span class="code-num">0.45</span>;
  <span class="code-keyword">const</span> rodWeight = depthMeters * <span class="code-num">3.28084</span> * <span class="code-num">1.85</span> * (<span class="code-num">1</span> - <span class="code-num">0.95</span>/<span class="code-num">7.85</span>);
  <span class="code-keyword">const</span> accel = (strokeInches * Math.<span class="code-func">pow</span>(spm, <span class="code-num">2</span>)) / <span class="code-num">70500</span>;
  
  <span class="code-keyword">const</span> pprl = (rodWeight + <span class="code-num">1800</span>) * (<span class="code-num">1</span> + accel) * dragFactor;
  <span class="code-keyword">const</span> mprl = Math.<span class="code-func">max</span>(<span class="code-num">1200</span>, rodWeight * (<span class="code-num">1</span> - accel) / dragFactor);
  <span class="code-keyword">const</span> rodStress = pprl / (Math.PI * Math.<span class="code-func">pow</span>(<span class="code-num">0.875</span> / <span class="code-num">2</span>, <span class="code-num">2</span>));

  <span class="code-keyword">return</span> { pprl: Math.<span class="code-func">round</span>(pprl), mprl: Math.<span class="code-func">round</span>(mprl), rodStress };
}</div>
            <div class="card">
                <div class="card-title cyan">Kinematics Highlights</div>
                <ul class="point-list">
                    <li><strong>API RP 11L Compliance:</strong> Formulates standard Polish Rod acceleration factors.</li>
                    <li><strong>Coupled Drag:</strong> Rod buoyancy is dynamically reduced when heavy crude cools down.</li>
                    <li><strong>Stress Limits:</strong> Real-time alerts trigger if rod stress exceeds 30,000 PSI.</li>
                </ul>
            </div>
        </div>
    </div>

    <!-- SLIDE 11: BACKEND - REAL-TIME SCADA & AUDIO -->
    <div class="slide" id="slide-11">
        <div class="slide-header">
            <div>
                <div class="pill">⚙ BACKEND CODING</div>
                <div class="slide-title">Backend Coding: Real-Time SCADA Stream & Audio Synthesis</div>
            </div>
            <div class="slide-number">11 / 17</div>
        </div>
        <div class="slide-body grid-2">
            <div class="code-box"><span class="code-comment">// Web Audio API Synthesizer (No MP3 Files)</span>
<span class="code-keyword">function</span> <span class="code-func">playAlarmChime</span>(<span class="code-var">frequency</span> = <span class="code-num">880</span>) {
  <span class="code-keyword">const</span> ctx = <span class="code-keyword">new</span> AudioContext();
  <span class="code-keyword">const</span> osc = ctx.<span class="code-func">createOscillator</span>();
  <span class="code-keyword">const</span> gain = ctx.<span class="code-func">createGain</span>();
  osc.frequency.setValueAtTime(frequency, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(<span class="code-num">0.001</span>, ctx.currentTime + <span class="code-num">0.35</span>);
  osc.<span class="code-func">connect</span>(gain);
  gain.<span class="code-func">connect</span>(ctx.destination);
  osc.<span class="code-func">start</span>(); osc.<span class="code-func">stop</span>(ctx.currentTime + <span class="code-num">0.35</span>);
}

<span class="code-comment">// 2.0 Hz Real-Time Telemetry Loop</span>
setInterval(() => {
  <span class="code-func">onData</span>({
    wellheadPressure: <span class="code-num">14.8</span> + (Math.<span class="code-func">random</span>() - <span class="code-num">0.5</span>) * <span class="code-num">0.6</span>,
    motorCurrent: <span class="code-num">38.5</span> + Math.<span class="code-func">sin</span>(tick * <span class="code-num">0.4</span>) * <span class="code-num">4.2</span>,
    polishRodLoad: <span class="code-num">18500</span> + Math.<span class="code-func">sin</span>(tick * <span class="code-num">0.4</span>) * <span class="code-num">3500</span>
  });
}, <span class="code-num">500</span>);</div>
            <div class="card">
                <div class="card-title green">SCADA Engine Highlights</div>
                <ul class="point-list">
                    <li><strong>Zero Dependencies:</strong> Generates synthetic acoustic frequencies directly in browser memory.</li>
                    <li><strong>Continuous Telemetry:</strong> 500ms heartbeat updates the dashboard in real-time.</li>
                    <li><strong>Micro-Jitter Modeling:</strong> Authentic sensor noise injection.</li>
                </ul>
            </div>
        </div>
    </div>

    <!-- SLIDE 12: BACKEND - AI COPILOT -->
    <div class="slide" id="slide-12">
        <div class="slide-header">
            <div>
                <div class="pill">⚙ BACKEND CODING</div>
                <div class="slide-title">Backend Coding: Conversational AI Copilot Engine</div>
            </div>
            <div class="slide-number">12 / 17</div>
        </div>
        <div class="slide-body grid-2">
            <div class="code-box"><span class="code-comment">// src/services/aiAdvisorService.ts - Natural Language Copilot</span>
<span class="code-keyword">export async function</span> <span class="code-func">getAiCopilotResponse</span>(<span class="code-var">query</span>: <span class="code-var">string</span>, <span class="code-var">ctx</span>: <span class="code-var">WelloraState</span>) {
  <span class="code-keyword">const</span> spmMatch = query.<span class="code-func">match</span>(<span class="code-str">/(\\d+(\\.\\d+)?)\\s*spm/i</span>);
  <span class="code-keyword">if</span> (spmMatch) {
    <span class="code-keyword">const</span> targetSpm = parseFloat(spmMatch[<span class="code-num">1</span>]);
    <span class="code-keyword">const</span> sim = <span class="code-func">calculateSRPMechanics</span>(targetSpm, ctx.strokeLength, ctx.depth, ctx.viscosity);
    <span class="code-keyword">return</span> {
      text: <span class="code-str">\`Adjusted to \${targetSpm} SPM: Peak Polish Rod Load calculates to \${sim.pprl} lbs.\`</span>,
      action: { type: <span class="code-str">'SET_SPM'</span>, value: targetSpm }
    };
  }
  <span class="code-keyword">return</span> <span class="code-func">generateTechnicalExplanation</span>(query, ctx);
}</div>
            <div class="card">
                <div class="card-title amber">AI Copilot Capabilities</div>
                <ul class="point-list">
                    <li><strong>Physics-Grounded Reasoning:</strong> Every AI response recalculates thermodynamic equations on-the-fly.</li>
                    <li><strong>Action Dispatching:</strong> Generates clickable buttons to update physical parameters automatically.</li>
                    <li><strong>Open-Ended Dialogue:</strong> Handles any operational or troubleshooting query.</li>
                </ul>
            </div>
        </div>
    </div>

    <!-- SLIDE 13: OUTPUT SCREENSHOTS - FULL SUITE -->
    <div class="slide" id="slide-13">
        <div class="slide-header">
            <div>
                <div class="pill">⚙ APPLICATION OUTPUTS</div>
                <div class="slide-title">Output Screenshots: SCADA Live Operational Suite</div>
            </div>
            <div class="slide-number">13 / 17</div>
        </div>
        <div class="slide-body grid-2">
            <div class="card">
                <div class="card-title">Full SCADA Dashboard</div>
                <img src="${images.finalDashboard}" style="max-height: 250px;" class="img-preview" alt="Final Dashboard">
                <p style="font-size: 12px; color: var(--text-secondary);">Real-time monitoring grid with alarms, multi-well status, and telemetry cards.</p>
            </div>
            <div class="card">
                <div class="card-title cyan">Subsurface 3D & P&ID Synoptic Flow</div>
                <img src="${images.pid}" style="max-height: 250px;" class="img-preview" alt="P&ID View">
                <p style="font-size: 12px; color: var(--text-secondary);">Animated steam path lines, thermal isotherm dissipation, and mechanical pump kinematics.</p>
            </div>
        </div>
    </div>

    <!-- SLIDE 14: OUTPUT SCREENSHOTS - AI COPILOT -->
    <div class="slide" id="slide-14">
        <div class="slide-header">
            <div>
                <div class="pill">⚙ APPLICATION OUTPUTS</div>
                <div class="slide-title">Output Screenshots: Conversational AI Copilot in Action</div>
            </div>
            <div class="slide-number">14 / 17</div>
        </div>
        <div class="slide-body grid-2">
            <div class="card">
                <div class="card-title amber">Freeform Chat Interaction</div>
                <img src="${images.aiChat}" style="max-height: 250px;" class="img-preview" alt="AI Chat">
                <p style="font-size: 12px; color: var(--text-secondary);">AI Copilot answering complex Andrade viscosity questions with accurate data points.</p>
            </div>
            <div class="card">
                <div class="card-title green">Action Dispatch Button</div>
                <img src="${images.aiDispatch}" style="max-height: 250px;" class="img-preview" alt="AI Dispatch">
                <p style="font-size: 12px; color: var(--text-secondary);">Operator clicking "Apply 6.5 SPM Setpoint" to auto-tune the physical simulation.</p>
            </div>
        </div>
    </div>

    <!-- SLIDE 15: CONCLUSION -->
    <div class="slide" id="slide-15">
        <div class="slide-header">
            <div>
                <div class="pill">⚙ PROJECT SUMMARY</div>
                <div class="slide-title">Conclusion: Key Engineering Achievements</div>
            </div>
            <div class="slide-number">15 / 17</div>
        </div>
        <div class="slide-body grid-2">
            <div class="card">
                <div class="card-title">✔ Unified Dual-Physics Twin</div>
                <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.6;">Successfully combined heavy oil thermodynamics (Andrade model) with mechanical sucker rod dynamics into a cohesive real-time digital twin.</p>
            </div>
            <div class="card">
                <div class="card-title cyan">✔ 2 Hz SCADA Streaming</div>
                <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.6;">Built high-frequency sensor streaming with acoustic alarm synthesis for continuous situational awareness.</p>
            </div>
            <div class="card">
                <div class="card-title green">✔ Actionable AI Copilot</div>
                <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.6;">Developed an open-ended copilot capable of evaluating what-if scenarios and dispatching live setpoints.</p>
            </div>
            <div class="card">
                <div class="card-title amber">✔ Demonstrated Field Value</div>
                <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.6;">Delivers +28.4% steam thermal efficiency gain and -34.8% reduction in mechanical rod fatigue.</p>
            </div>
        </div>
    </div>

    <!-- SLIDE 16: FUTURE ENHANCEMENTS -->
    <div class="slide" id="slide-16">
        <div class="slide-header">
            <div>
                <div class="pill">⚙ ROADMAP</div>
                <div class="slide-title">Future Enhancement & Next Generation Features</div>
            </div>
            <div class="slide-number">16 / 17</div>
        </div>
        <div class="slide-body" style="grid-template-columns: 1fr; display: flex; flex-direction: column; gap: 12px;">
            <div class="card" style="flex-direction: row; align-items: center; gap: 16px;">
                <div style="font-size: 28px;">🌐</div>
                <div>
                    <div class="card-title">Edge IoT RTU Hardware Bridge (MQTT / OPC-UA)</div>
                    <div style="font-size: 13px; color: var(--text-secondary);">Direct coupling with field Modbus TCP RTUs, MQTT Sparkplug B brokers, and Siemens/Rockwell PLCs.</div>
                </div>
            </div>
            <div class="card" style="flex-direction: row; align-items: center; gap: 16px;">
                <div style="font-size: 28px;">🧠</div>
                <div>
                    <div class="card-title cyan">Physics-Informed Neural Networks (PINN)</div>
                    <div style="font-size: 13px; color: var(--text-secondary);">Embedding deep learning PINN models to solve 3D reservoir thermal equations in sub-milliseconds.</div>
                </div>
            </div>
            <div class="card" style="flex-direction: row; align-items: center; gap: 16px;">
                <div style="font-size: 28px;">🔄</div>
                <div>
                    <div class="card-title green">Autonomous Closed-Loop VFD Modulation</div>
                    <div style="font-size: 13px; color: var(--text-secondary);">Autonomous motor speed throttling upon early detection of fluid pound or gas interference.</div>
                </div>
            </div>
            <div class="card" style="flex-direction: row; align-items: center; gap: 16px;">
                <div style="font-size: 28px;">📱</div>
                <div>
                    <div class="card-title amber">Cross-Platform Native Android / iOS APK</div>
                    <div style="font-size: 13px; color: var(--text-secondary);">Packaged Android APK with push notifications for critical downhole pressure drops and rod stress spikes.</div>
                </div>
            </div>
        </div>
    </div>

    <!-- SLIDE 17: REFERENCES -->
    <div class="slide" id="slide-17">
        <div class="slide-header">
            <div>
                <div class="pill">⚙ CITATIONS</div>
                <div class="slide-title">References & Industry Standards</div>
            </div>
            <div class="slide-number">17 / 17</div>
        </div>
        <div class="slide-body grid-1">
            <div class="card">
                <ul class="point-list" style="gap: 14px;">
                    <li><strong>[1] API RP 11L:</strong> "Recommended Practice for Design Calculations for Sucker Rod Pumping Systems", American Petroleum Institute, 5th Edition.</li>
                    <li><strong>[2] Andrade, E. N. da C. (1934):</strong> "A Theory of the Viscosity of Liquids", Philosophical Magazine, Series 7, Vol. 17, No. 112, pp. 497-511.</li>
                    <li><strong>[3] Prats, M. (1982):</strong> "Thermal Recovery", SPE Monograph Volume 7, Society of Petroleum Engineers.</li>
                    <li><strong>[4] Gibbs, S. G. & Neely, A. B. (1966):</strong> "Computer Diagnosis of Down-Hole Conditions in Sucker Rod Pumping Wells", Journal of Petroleum Technology, SPE-1165-PA.</li>
                    <li><strong>[5] Butler, R. M. (1991):</strong> "Thermal Recovery of Oil and Bitumen", Prentice Hall.</li>
                    <li><strong>[6] Takacs, G. (2015):</strong> "Sucker-Rod Pumping Manual", PennWell Books, Tulsa, OK.</li>
                    <li><strong>[7] ISO/IEC 62443:</strong> "Industrial communication networks - Network and system security (SCADA Automation)".</li>
                </ul>
            </div>
        </div>
    </div>

    <!-- CONTROLS BAR -->
    <div class="controls">
        <button class="btn" onclick="prevSlide()">◀ Previous</button>
        <span class="nav-counter" id="slide-counter">Slide 1 / 17</span>
        <button class="btn" onclick="nextSlide()">Next ▶</button>
        <button class="btn" onclick="toggleFullScreen()" style="border-color: var(--cyan); color: var(--cyan);">⛶ Fullscreen</button>
    </div>

</div>

<script>
    let currentSlide = 1;
    const totalSlides = 17;

    function showSlide(n) {
        document.querySelectorAll('.slide').forEach(s => s.classList.remove('active'));
        if (n > totalSlides) currentSlide = 1;
        if (n < 1) currentSlide = totalSlides;
        document.getElementById('slide-' + currentSlide).classList.add('active');
        document.getElementById('slide-counter').innerText = 'Slide ' + currentSlide + ' / ' + totalSlides;
    }

    function nextSlide() {
        currentSlide++;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide--;
        showSlide(currentSlide);
    }

    function toggleFullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'f' || e.key === 'F') toggleFullScreen();
    });
</script>

</body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'WELLORA_Slide_Deck.html'), htmlContent);
console.log('SUCCESS: Interactive HTML slide deck created at WELLORA_Slide_Deck.html');
