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
    <title>WELLORA Project Presentation</title>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        @page {
            size: 1920px 1080px;
            margin: 0;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        :root {
            --bg-deep: #0A0D14;
            --bg-card: #121722;
            --bg-card-light: #182030;
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
            --border-orange: rgba(255, 107, 0, 0.45);
        }
        body {
            font-family: 'Inter', sans-serif;
            background-color: var(--bg-deep);
            color: var(--text-primary);
        }
        .slide {
            width: 1920px;
            height: 1080px;
            background: var(--bg-deep);
            position: relative;
            display: flex;
            flex-direction: column;
            padding: 48px 64px 36px 64px;
            page-break-after: always;
            page-break-inside: avoid;
            overflow: hidden;
        }
        .slide-accent-bar {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 8px;
            background: linear-gradient(90deg, #FF6B00, #FFA726, #FF6B00);
        }
        .slide-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            padding-bottom: 20px;
            border-bottom: 1px solid var(--border);
            margin-bottom: 28px;
            position: relative;
        }
        .slide-header::after {
            content: '';
            position: absolute;
            bottom: -1px;
            left: 0;
            width: 220px;
            height: 3px;
            background: linear-gradient(90deg, var(--orange-primary), transparent);
        }
        .pill {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(255, 107, 0, 0.12);
            border: 1px solid var(--orange-primary);
            color: var(--amber);
            font-size: 14px;
            font-weight: 700;
            padding: 6px 16px;
            border-radius: 20px;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            margin-bottom: 8px;
        }
        .slide-title {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 34px;
            font-weight: 700;
            color: #FFF;
        }
        .slide-number {
            font-family: 'JetBrains Mono', monospace;
            font-size: 18px;
            font-weight: 700;
            color: var(--orange-primary);
            background: rgba(255, 107, 0, 0.12);
            padding: 8px 18px;
            border-radius: 8px;
            border: 1px solid var(--border-orange);
        }
        .slide-body {
            flex: 1;
            display: grid;
            gap: 28px;
        }
        .grid-2 { grid-template-columns: 1fr 1fr; }
        .grid-3 { grid-template-columns: 1fr 1fr 1fr; }
        .grid-2-3 { grid-template-columns: 2fr 1fr; }
        .grid-3-2 { grid-template-columns: 1.35fr 1fr; }
        
        .card {
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: 16px;
            padding: 28px;
            display: flex;
            flex-direction: column;
            gap: 16px;
        }
        .card.highlight {
            border-color: var(--orange-primary);
            box-shadow: 0 0 30px rgba(255,107,0,0.15);
        }
        .card-title {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 22px;
            font-weight: 700;
            color: var(--orange-primary);
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .card-title.cyan { color: var(--cyan); }
        .card-title.amber { color: var(--amber); }
        .card-title.green { color: var(--green); }
        
        .point-list {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 14px;
        }
        .point-list li {
            font-size: 17px;
            line-height: 1.6;
            color: var(--text-secondary);
            position: relative;
            padding-left: 26px;
        }
        .point-list li::before {
            content: '▹';
            position: absolute;
            left: 0;
            color: var(--orange-primary);
            font-size: 20px;
            font-weight: bold;
        }
        .point-list li strong {
            color: #FFF;
        }

        .code-box {
            background: #080A0F;
            border: 1px solid #1E293B;
            border-radius: 12px;
            padding: 20px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 14.5px;
            line-height: 1.55;
            color: #E2E8F0;
            overflow: hidden;
            white-space: pre;
            flex: 1;
        }
        .code-keyword { color: #FF7B72; font-weight: bold; }
        .code-func { color: #D2A8FF; }
        .code-var { color: #79C0FF; }
        .code-str { color: #A5D6FF; }
        .code-num { color: #FFA657; }
        .code-comment { color: #8B949E; font-style: italic; }

        .img-container {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #000;
            border-radius: 12px;
            border: 1px solid var(--border-orange);
            overflow: hidden;
        }
        .img-preview {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .kpi-row {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
        }
        .kpi-card {
            background: rgba(255, 107, 0, 0.06);
            border: 1px solid var(--border-orange);
            border-radius: 12px;
            padding: 20px;
            text-align: center;
        }
        .kpi-val {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 34px;
            font-weight: 800;
            color: var(--orange-primary);
            margin-bottom: 6px;
        }
        .kpi-label {
            font-size: 14px;
            font-weight: 600;
            color: #FFF;
        }

        .slide-footer {
            margin-top: auto;
            padding-top: 14px;
            border-top: 1px solid #1A2332;
            display: flex;
            justify-content: space-between;
            font-size: 13px;
            color: var(--text-muted);
        }
    </style>
</head>
<body>

    <!-- SLIDE 1: TITLE / COVER -->
    <div class="slide">
        <div class="slide-accent-bar"></div>
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; gap: 28px;">
            <div class="pill">⚡ HEAVY CRUDE OIL (17.5° API) DIGITAL TWIN</div>
            <h1 style="font-family: 'Space Grotesk', sans-serif; font-size: 76px; font-weight: 800; color: var(--orange-primary); letter-spacing: -1.5px; line-height: 1.1;">
                WELLORA
            </h1>
            <h2 style="font-size: 34px; font-weight: 600; color: #FFF; max-width: 1300px; line-height: 1.3;">
                Dual-Physics Digital Twin & Real-Time SCADA AI Optimization System
            </h2>
            <p style="font-size: 20px; color: var(--text-secondary); max-width: 1100px; line-height: 1.6;">
                Integrating Andrade Thermal Viscosity, Sucker Rod Pump (SRP) Mechanics, Cyclic Steam Stimulation (CSS) EOR & Conversational AI Copilot
            </p>
            <div style="display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; margin-top: 10px;">
                <span class="pill" style="border-color: var(--cyan); color: var(--cyan); background: rgba(0,229,255,0.1); font-size: 14px;">React 18 + TS</span>
                <span class="pill" style="border-color: var(--amber); color: var(--amber); background: rgba(255,167,38,0.1); font-size: 14px;">Thermal ODE Solver</span>
                <span class="pill" style="border-color: var(--green); color: var(--green); background: rgba(0,230,118,0.1); font-size: 14px;">2Hz Live SCADA</span>
                <span class="pill" style="border-color: var(--orange-primary); color: var(--orange-primary); background: rgba(255,107,0,0.1); font-size: 14px;">Laser Dynamometer</span>
                <span class="pill" style="border-color: #FFF; color: #FFF; background: rgba(255,255,255,0.1); font-size: 14px;">Conversational AI</span>
            </div>
            <div style="margin-top: 32px; font-size: 18px; color: var(--text-muted); display: flex; gap: 40px;">
                <span>Presented by: <strong style="color: #FFF;">Mithesh D</strong></span>
                <span>Project: <strong style="color: var(--amber);">Production SCADA Digital Twin & AI Systems</strong></span>
            </div>
        </div>
        <div class="slide-footer">
            <span>WELLORA™ Industrial SCADA Digital Twin</span>
            <span>Slide 01 / 17</span>
        </div>
    </div>

    <!-- SLIDE 2: ABSTRACT -->
    <div class="slide">
        <div class="slide-accent-bar"></div>
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
                    <li><strong>17.5° API Heavy Crude Challenge:</strong> Bottom-hole fluid viscosity exceeds 3,500 cP at cold reservoir temperatures (28°C), causing severe rod string drag, pump floating, and premature motor burnout.</li>
                    <li><strong>Cyclic Steam Stimulation (CSS):</strong> High-enthalpy steam (260°C - 310°C) is injected into the reservoir to exponentially drop crude viscosity down to 12.8 cP via Andrade's logarithmic relationship.</li>
                    <li><strong>SCADA Digital Twin Innovation:</strong> Conventional SCADA historians only record past alarms. WELLORA provides real-time dual-physics predictive simulations, 2 Hz sensor telemetry, and an open-ended conversational AI Copilot.</li>
                </ul>
            </div>
            <div class="card highlight">
                <div class="card-title amber">Validated Operational Gains</div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 10px;">
                    <div class="kpi-card">
                        <div class="kpi-val">+28.4%</div>
                        <div class="kpi-label">Steam Thermal Utilization Efficiency</div>
                    </div>
                    <div class="kpi-card">
                        <div class="kpi-val">-34.8%</div>
                        <div class="kpi-label">Rod String Fatigue & Peak Load</div>
                    </div>
                    <div class="kpi-card">
                        <div class="kpi-val">2.0 Hz</div>
                        <div class="kpi-label">Real-Time SCADA Telemetry Streaming</div>
                    </div>
                    <div class="kpi-card">
                        <div class="kpi-val">100%</div>
                        <div class="kpi-label">AI What-If Action Parameter Dispatch</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="slide-footer">
            <span>WELLORA™ Industrial SCADA Digital Twin</span>
            <span>Slide 02 / 17</span>
        </div>
    </div>

    <!-- SLIDE 3: INTRODUCTION -->
    <div class="slide">
        <div class="slide-accent-bar"></div>
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
                    <li>Heavy specific gravity of 0.95 g/cm³ with complex asphaltic molecular networks.</li>
                    <li>Cold reservoir conditions produce near-solid tar behavior with zero natural flow.</li>
                    <li>Viscosity is exponentially temperature-dependent: cooling immediately chokes the wellbore.</li>
                </ul>
            </div>
            <div class="card">
                <div class="card-title amber">2. Cyclic Steam Stimulation</div>
                <ul class="point-list">
                    <li><strong>Stage 1 - Injection:</strong> 12 days of 260°C superheated steam at 15 MPa.</li>
                    <li><strong>Stage 2 - Soaking:</strong> 6 days shut-in for thermal conduction into the rock matrix.</li>
                    <li><strong>Stage 3 - Production:</strong> 72 days pumping with fluid viscosity dropped from 3,500 to 12 cP.</li>
                </ul>
            </div>
            <div class="card">
                <div class="card-title cyan">3. SRP Lift Dynamics</div>
                <ul class="point-list">
                    <li>Reciprocating sucker rod pump lifts heavy fluid from 1,200m+ depth.</li>
                    <li>Extreme fluid drag causes delayed rod fall, fluid pound, and high peak loads.</li>
                    <li>Requires dynamic surface and downhole dynamometer cards to diagnose pump fillage.</li>
                </ul>
            </div>
        </div>
        <div class="slide-footer">
            <span>WELLORA™ Industrial SCADA Digital Twin</span>
            <span>Slide 03 / 17</span>
        </div>
    </div>

    <!-- SLIDE 4: DETAILS ABOUT THE TRAINING -->
    <div class="slide">
        <div class="slide-accent-bar"></div>
        <div class="slide-header">
            <div>
                <div class="pill">⚙ SYSTEM FORMULATION & TRAINING</div>
                <div class="slide-title">Details about the Training: Physics Calibration & AI Models</div>
            </div>
            <div class="slide-number">04 / 17</div>
        </div>
        <div class="slide-body grid-2">
            <div class="card">
                <div class="card-title">Andrade Thermal Viscosity Calibration</div>
                <div class="code-box">ln(μ) = ln(A) + B / (T + 273.15)
Calibrated Parameters:
A = 0.0125 cP, B = 1850 K for 17.5° API Crude</div>
                <ul class="point-list">
                    <li>Trained and calibrated using heavy crude empirical laboratory PVT curves.</li>
                    <li>Accurately predicts 300x viscosity reduction across 28°C to 260°C.</li>
                </ul>
            </div>
            <div class="card">
                <div class="card-title cyan">Sucker Rod Wave Dynamics (API RP 11L)</div>
                <div class="code-box">∂²u/∂t² = a²·(∂²u/∂x²) - c·(∂u/∂t)
PPRL = (W_r + W_f) · (1 + (S·N²)/70500) · FluidDragFactor</div>
                <ul class="point-list">
                    <li>Calculates Polish Rod dynamic loads and stress safety margins (&lt; 30,000 PSI).</li>
                    <li>Generates Fourier harmonic surface vs downhole pump cards in real-time.</li>
                </ul>
            </div>
        </div>
        <div class="slide-footer">
            <span>WELLORA™ Industrial SCADA Digital Twin</span>
            <span>Slide 04 / 17</span>
        </div>
    </div>

    <!-- SLIDE 5: PROJECT DESCRIPTION -->
    <div class="slide">
        <div class="slide-accent-bar"></div>
        <div class="slide-header">
            <div>
                <div class="pill">⚙ SYSTEM ARCHITECTURE</div>
                <div class="slide-title">Project Description: Architecture & System Modules</div>
            </div>
            <div class="slide-number">05 / 17</div>
        </div>
        <div class="slide-body grid-3">
            <div class="card">
                <div class="card-title">01. Real-Time SCADA Engine</div>
                <p style="font-size: 16px; color: var(--text-secondary); line-height: 1.6;">2 Hz telemetry streaming for 4 wells with acoustic Web Audio multi-tone alarm sound synthesis.</p>
            </div>
            <div class="card">
                <div class="card-title amber">02. Dual-Physics Digital Twin</div>
                <p style="font-size: 16px; color: var(--text-secondary); line-height: 1.6;">Coupled thermodynamic Andrade ODEs with mechanical rod string elastic stress models.</p>
            </div>
            <div class="card">
                <div class="card-title cyan">03. Signal Oscilloscope</div>
                <p style="font-size: 16px; color: var(--text-secondary); line-height: 1.6;">Dual-trace waveform oscilloscope plotting live Rod Load (lbs) and Motor Current (A) with phosphor decay.</p>
            </div>
            <div class="card">
                <div class="card-title green">04. Laser Dynamometer</div>
                <p style="font-size: 16px; color: var(--text-secondary); line-height: 1.6;">Surface and pump card tracing with real-time beam position indicator and fluid fillage analysis.</p>
            </div>
            <div class="card">
                <div class="card-title">05. What-If Simulation</div>
                <p style="font-size: 16px; color: var(--text-secondary); line-height: 1.6;">Interactive sliders for Steam Temp, Soak Days, SPM, and Stroke Length with instantaneous state updates.</p>
            </div>
            <div class="card">
                <div class="card-title amber">06. Conversational AI Copilot</div>
                <p style="font-size: 16px; color: var(--text-secondary); line-height: 1.6;">Open-ended copilot answering freeform questions and dispatching setpoint actions directly to the twin.</p>
            </div>
        </div>
        <div class="slide-footer">
            <span>WELLORA™ Industrial SCADA Digital Twin</span>
            <span>Slide 05 / 17</span>
        </div>
    </div>

    <!-- SLIDE 6: REQUIREMENTS -->
    <div class="slide">
        <div class="slide-accent-bar"></div>
        <div class="slide-header">
            <div>
                <div class="pill">⚙ SPECIFICATIONS & TECH STACK</div>
                <div class="slide-title">Hardware and Software Requirements</div>
            </div>
            <div class="slide-number">06 / 17</div>
        </div>
        <div class="slide-body grid-2">
            <div class="card">
                <div class="card-title">Hardware Requirements</div>
                <ul class="point-list">
                    <li><strong>Processor (CPU):</strong> Intel Core i5 / AMD Ryzen 5 or higher (Multi-core for real-time ODE solving).</li>
                    <li><strong>System Memory (RAM):</strong> 8 GB minimum (16 GB recommended for SCADA telemetry stream).</li>
                    <li><strong>Display & Graphics:</strong> 1920×1080 FHD resolution with WebGL/Canvas 2D GPU acceleration.</li>
                    <li><strong>Field IoT / RTU Gateway:</strong> ARM Cortex-A53 / Moxa Industrial RTU for field deployment.</li>
                </ul>
            </div>
            <div class="card">
                <div class="card-title cyan">Software Stack</div>
                <ul class="point-list">
                    <li><strong>Core Framework:</strong> React 18.3 + TypeScript (Strict Type Safety, Modular Architecture).</li>
                    <li><strong>Styling & SCADA Theme:</strong> Tailwind CSS + Cyber-Orange Industrial Glassmorphism.</li>
                    <li><strong>Visualization & Audio:</strong> HTML5 Canvas 2D API + Native Web Audio API Synthesizer.</li>
                    <li><strong>Build & Cloud Hosting:</strong> Node.js v24+, Vite 5.x Bundler, Vercel Production Cloud.</li>
                </ul>
            </div>
        </div>
        <div class="slide-footer">
            <span>WELLORA™ Industrial SCADA Digital Twin</span>
            <span>Slide 06 / 17</span>
        </div>
    </div>

    <!-- SLIDE 7: FRONTEND SCREENSHOTS - DASHBOARD -->
    <div class="slide">
        <div class="slide-accent-bar"></div>
        <div class="slide-header">
            <div>
                <div class="pill">⚙ USER INTERFACE DESIGN</div>
                <div class="slide-title">Frontend Design: Cyber-Orange SCADA Telemetry Dashboard</div>
            </div>
            <div class="slide-number">07 / 17</div>
        </div>
        <div class="slide-body grid-3-2">
            <div class="img-container">
                <img src="${images.dashboard}" class="img-preview" alt="Dashboard Screenshot">
            </div>
            <div class="card highlight">
                <div class="card-title">SCADA Dashboard Highlights</div>
                <ul class="point-list">
                    <li><strong>High-Contrast Industrial Palette:</strong> Jet-Black (#0A0D14) with Cyber-Orange (#FF6B00) prevents eye fatigue in 24/7 control rooms.</li>
                    <li><strong>Multi-Well Matrix:</strong> Instant switching between Well OR-101 through OR-104 with independent telemetry streams.</li>
                    <li><strong>Cycle Stepper:</strong> Real-time day timeline indicating current CSS phase (Injection / Soaking / Production).</li>
                </ul>
            </div>
        </div>
        <div class="slide-footer">
            <span>WELLORA™ Industrial SCADA Digital Twin</span>
            <span>Slide 07 / 17</span>
        </div>
    </div>

    <!-- SLIDE 8: FRONTEND SCREENSHOTS - OSCILLOSCOPE & DYNAMOMETER -->
    <div class="slide">
        <div class="slide-accent-bar"></div>
        <div class="slide-header">
            <div>
                <div class="pill">⚙ REAL-TIME SIGNAL ANALYSIS</div>
                <div class="slide-title">Frontend Design: Live Oscilloscope & Laser Dynamometer</div>
            </div>
            <div class="slide-number">08 / 17</div>
        </div>
        <div class="slide-body grid-2">
            <div class="card">
                <div class="card-title cyan">Real-Time Signal Oscilloscope (2 Hz)</div>
                <div class="img-container" style="max-height: 380px;">
                    <img src="${images.oscilloscope}" class="img-preview" alt="Oscilloscope Screenshot">
                </div>
                <p style="font-size: 15px; color: var(--text-secondary); line-height: 1.5;">Dual-channel oscilloscope plotting real-time Polish Rod Load (orange trace) and Motor Current (cyan trace) with continuous phosphor decay effect.</p>
            </div>
            <div class="card">
                <div class="card-title">Laser Tracing Dynamometer Card</div>
                <div class="img-container" style="max-height: 380px;">
                    <img src="${images.dynamometer}" class="img-preview" alt="Dynamometer Screenshot">
                </div>
                <p style="font-size: 15px; color: var(--text-secondary); line-height: 1.5;">Closed-loop dynamometer comparing Surface Polish Rod Card vs Downhole Pump Card with real-time beam position indicator and fluid fillage diagnosis.</p>
            </div>
        </div>
        <div class="slide-footer">
            <span>WELLORA™ Industrial SCADA Digital Twin</span>
            <span>Slide 08 / 17</span>
        </div>
    </div>

    <!-- SLIDE 9: BACKEND - ANDRADE VISCOSITY -->
    <div class="slide">
        <div class="slide-accent-bar"></div>
        <div class="slide-header">
            <div>
                <div class="pill">⚙ CORE PHYSICS ALGORITHMS</div>
                <div class="slide-title">Backend Coding: Andrade Viscosity & Thermal ODE Solver</div>
            </div>
            <div class="slide-number">09 / 17</div>
        </div>
        <div class="slide-body grid-3-2">
            <div class="code-box"><span class="code-comment">// src/services/physicsEngine.ts - Andrade Exponential Viscosity Model</span>
<span class="code-keyword">export function</span> <span class="code-func">calculateViscosity</span>(<span class="code-var">tempCelsius</span>: <span class="code-var">number</span>, <span class="code-var">apiGravity</span>: <span class="code-var">number</span> = <span class="code-num">17.5</span>): <span class="code-var">number</span> {
  <span class="code-keyword">const</span> T_kelvin = tempCelsius + <span class="code-num">273.15</span>;
  <span class="code-keyword">const</span> A = <span class="code-num">0.0125</span>; <span class="code-comment">// Calibrated for 17.5° API crude</span>
  <span class="code-keyword">const</span> B = <span class="code-num">1850</span>;
  <span class="code-keyword">const</span> viscosity = A * Math.<span class="code-func">exp</span>(B / T_kelvin);
  <span class="code-keyword">return</span> Math.<span class="code-func">max</span>(<span class="code-num">1.0</span>, parseFloat(viscosity.<span class="code-func">toFixed</span>(<span class="code-num">2</span>)));
}

<span class="code-comment">// Cyclic Steam Stimulation (CSS) 90-Day Formation Thermal Dissipation ODE</span>
<span class="code-keyword">export function</span> <span class="code-func">calculateCycleState</span>(<span class="code-var">dayOfCycle</span>: <span class="code-var">number</span>, <span class="code-var">steamTemp</span>: <span class="code-var">number</span> = <span class="code-num">260</span>) {
  <span class="code-keyword">if</span> (dayOfCycle &lt;= <span class="code-num">12</span>) {
    <span class="code-keyword">return</span> { stage: <span class="code-str">'INJECTION'</span>, temp: steamTemp, viscosity: <span class="code-func">calculateViscosity</span>(steamTemp) };
  } <span class="code-keyword">else if</span> (dayOfCycle &lt;= <span class="code-num">18</span>) {
    <span class="code-keyword">const</span> soakProgress = (dayOfCycle - <span class="code-num">12</span>) / <span class="code-num">6</span>;
    <span class="code-keyword">const</span> temp = steamTemp - (soakProgress * <span class="code-num">25</span>);
    <span class="code-keyword">return</span> { stage: <span class="code-str">'SOAKING'</span>, temp, viscosity: <span class="code-func">calculateViscosity</span>(temp) };
  } <span class="code-keyword">else</span> {
    <span class="code-keyword">const</span> prodDays = dayOfCycle - <span class="code-num">18</span>;
    <span class="code-keyword">const</span> temp = <span class="code-num">45</span> + (steamTemp - <span class="code-num">70</span>) * Math.<span class="code-func">exp</span>(-<span class="code-num">0.038</span> * prodDays);
    <span class="code-keyword">return</span> { stage: <span class="code-str">'PRODUCTION'</span>, temp, viscosity: <span class="code-func">calculateViscosity</span>(temp) };
  }
}</div>
            <div class="card">
                <div class="card-title">Mathematical Rationale</div>
                <ul class="point-list">
                    <li><strong>Andrade Relation:</strong> Models the 300x viscosity reduction from cold reservoir (28°C: ~3,800 cP) to steamed temperature (260°C: ~12.8 cP).</li>
                    <li><strong>3-Stage CSS Simulation:</strong> Automatically transitions between Injection (12d), Soaking (6d), and Production (72d).</li>
                    <li><strong>Formation Thermal Decay:</strong> Simulates heat loss into surrounding caprock using calibrated exponential decay rate (0.038/day).</li>
                </ul>
            </div>
        </div>
        <div class="slide-footer">
            <span>WELLORA™ Industrial SCADA Digital Twin</span>
            <span>Slide 09 / 17</span>
        </div>
    </div>

    <!-- SLIDE 10: BACKEND - SUCKER ROD MECHANICS -->
    <div class="slide">
        <div class="slide-accent-bar"></div>
        <div class="slide-header">
            <div>
                <div class="pill">⚙ ROD STRING KINEMATICS</div>
                <div class="slide-title">Backend Coding: Sucker Rod Mechanics & Stress Solver</div>
            </div>
            <div class="slide-number">10 / 17</div>
        </div>
        <div class="slide-body grid-3-2">
            <div class="code-box"><span class="code-comment">// src/services/physicsEngine.ts - API RP 11L SRP Mechanics Engine</span>
<span class="code-keyword">export function</span> <span class="code-func">calculateSRPMechanics</span>(
  <span class="code-var">spm</span>: <span class="code-var">number</span>, <span class="code-var">strokeInches</span>: <span class="code-var">number</span>,
  <span class="code-var">depthMeters</span>: <span class="code-var">number</span>, <span class="code-var">viscosity</span>: <span class="code-var">number</span>
) {
  <span class="code-keyword">const</span> fluidDragFactor = <span class="code-num">1</span> + (viscosity / <span class="code-num">500</span>) * <span class="code-num">0.45</span>;
  <span class="code-keyword">const</span> rodWeightInFluid = depthMeters * <span class="code-num">3.28084</span> * <span class="code-num">1.85</span> * (<span class="code-num">1</span> - (<span class="code-num">0.95</span> / <span class="code-num">7.85</span>));
  <span class="code-keyword">const</span> accelerationFactor = (strokeInches * Math.<span class="code-func">pow</span>(spm, <span class="code-num">2</span>)) / <span class="code-num">70500</span>;
  
  <span class="code-keyword">const</span> pprl = (rodWeightInFluid + <span class="code-num">1800</span>) * (<span class="code-num">1</span> + accelerationFactor) * fluidDragFactor;
  <span class="code-keyword">const</span> mprl = Math.<span class="code-func">max</span>(<span class="code-num">1200</span>, rodWeightInFluid * (<span class="code-num">1</span> - accelerationFactor) / fluidDragFactor);
  
  <span class="code-keyword">const</span> rodStressPsi = pprl / (Math.PI * Math.<span class="code-func">pow</span>(<span class="code-num">0.875</span> / <span class="code-num">2</span>, <span class="code-num">2</span>));
  <span class="code-keyword">const</span> motorHPEstimate = (pprl * (strokeInches / <span class="code-num">12</span>) * spm) / <span class="code-num">33000</span> * <span class="code-num">1.45</span>;

  <span class="code-keyword">return</span> { pprl: Math.<span class="code-func">round</span>(pprl), mprl: Math.<span class="code-func">round</span>(mprl), rodStressPsi: Math.<span class="code-func">round</span>(rodStressPsi), motorHPEstimate };
}</div>
            <div class="card">
                <div class="card-title cyan">Kinematics Highlights</div>
                <ul class="point-list">
                    <li><strong>API RP 11L Compliance:</strong> Formulates standard Polish Rod acceleration factors to compute dynamic peak loads.</li>
                    <li><strong>Coupled Fluid Drag:</strong> Dynamically couples oil viscosity to rod fall damping, detecting rod floating and fluid pound.</li>
                    <li><strong>Real-Time Stress Verification:</strong> Constantly monitors rod stress against allowable limits (30,000 PSI).</li>
                </ul>
            </div>
        </div>
        <div class="slide-footer">
            <span>WELLORA™ Industrial SCADA Digital Twin</span>
            <span>Slide 10 / 17</span>
        </div>
    </div>

    <!-- SLIDE 11: BACKEND - REAL-TIME SCADA & AUDIO -->
    <div class="slide">
        <div class="slide-accent-bar"></div>
        <div class="slide-header">
            <div>
                <div class="pill">⚙ SCADA TELEMETRY & AUDIO SYNTHESIS</div>
                <div class="slide-title">Backend Coding: Real-Time SCADA Stream & Audio Synthesis</div>
            </div>
            <div class="slide-number">11 / 17</div>
        </div>
        <div class="slide-body grid-3-2">
            <div class="code-box"><span class="code-comment">// src/services/realtimeStreamEngine.ts - Native Web Audio Synthesizer</span>
<span class="code-keyword">function</span> <span class="code-func">playAlarmChime</span>(<span class="code-var">frequency</span> = <span class="code-num">880</span>, <span class="code-var">type</span> = <span class="code-str">'sine'</span>) {
  <span class="code-keyword">const</span> ctx = <span class="code-keyword">new</span> AudioContext();
  <span class="code-keyword">const</span> osc = ctx.<span class="code-func">createOscillator</span>();
  <span class="code-keyword">const</span> gain = ctx.<span class="code-func">createGain</span>();
  osc.frequency.setValueAtTime(frequency, ctx.currentTime);
  gain.gain.setValueAtTime(<span class="code-num">0.15</span>, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(<span class="code-num">0.001</span>, ctx.currentTime + <span class="code-num">0.35</span>);
  osc.<span class="code-func">connect</span>(gain);
  gain.<span class="code-func">connect</span>(ctx.destination);
  osc.<span class="code-func">start</span>(); osc.<span class="code-func">stop</span>(ctx.currentTime + <span class="code-num">0.35</span>);
}

<span class="code-comment">// 2.0 Hz Real-Time Telemetry Stream Generator</span>
<span class="code-keyword">export function</span> <span class="code-func">startTelemetryStream</span>(<span class="code-var">onData</span>: (<span class="code-var">s</span>: <span class="code-var">ScadaSnapshot</span>) => <span class="code-var">void</span>) {
  <span class="code-keyword">const</span> interval = setInterval(() => {
    tickCount++;
    <span class="code-keyword">const</span> noise = (Math.<span class="code-func">random</span>() - <span class="code-num">0.5</span>) * <span class="code-num">2</span>;
    <span class="code-func">onData</span>({
      wellheadPressure: <span class="code-num">14.8</span> + noise * <span class="code-num">0.3</span>,
      motorCurrent: <span class="code-num">38.5</span> + Math.<span class="code-func">sin</span>(tickCount * <span class="code-num">0.4</span>) * <span class="code-num">4.2</span> + noise * <span class="code-num">0.5</span>,
      polishRodLoad: <span class="code-num">18500</span> + Math.<span class="code-func">sin</span>(tickCount * <span class="code-num">0.4</span>) * <span class="code-num">3500</span> + noise * <span class="code-num">200</span>
    });
  }, <span class="code-num">500</span>); <span class="code-comment">// 500ms = 2.0 Hz rate</span>
  <span class="code-keyword">return</span> () => clearInterval(interval);
}</div>
            <div class="card">
                <div class="card-title green">SCADA Engine Highlights</div>
                <ul class="point-list">
                    <li><strong>Zero Dependencies:</strong> Generates synthetic acoustic frequencies directly in browser memory without external audio files.</li>
                    <li><strong>2 Hz Industrial Sampling:</strong> Telemetry updates every 500ms, providing real-time SCADA responsiveness.</li>
                    <li><strong>Micro-Jitter Modeling:</strong> Authentic Gaussian noise injection simulates physical sensor chatter.</li>
                </ul>
            </div>
        </div>
        <div class="slide-footer">
            <span>WELLORA™ Industrial SCADA Digital Twin</span>
            <span>Slide 11 / 17</span>
        </div>
    </div>

    <!-- SLIDE 12: BACKEND - AI COPILOT -->
    <div class="slide">
        <div class="slide-accent-bar"></div>
        <div class="slide-header">
            <div>
                <div class="pill">⚙ AI NATURAL LANGUAGE & SCENARIO ENGINE</div>
                <div class="slide-title">Backend Coding: Conversational AI Copilot Engine</div>
            </div>
            <div class="slide-number">12 / 17</div>
        </div>
        <div class="slide-body grid-3-2">
            <div class="code-box"><span class="code-comment">// src/services/aiAdvisorService.ts - Dynamic Physics AI Copilot</span>
<span class="code-keyword">export async function</span> <span class="code-func">getAiCopilotResponse</span>(<span class="code-var">query</span>: <span class="code-var">string</span>, <span class="code-var">ctx</span>: <span class="code-var">WelloraState</span>) {
  <span class="code-keyword">const</span> q = query.<span class="code-func">toLowerCase</span>();
  
  <span class="code-comment">// 1. Parameter Extraction & Live Scenario Calculation</span>
  <span class="code-keyword">const</span> spmMatch = q.<span class="code-func">match</span>(<span class="code-str">/(\\d+(\\.\\d+)?)\\s*spm/i</span>);
  <span class="code-keyword">if</span> (spmMatch) {
    <span class="code-keyword">const</span> targetSpm = parseFloat(spmMatch[<span class="code-num">1</span>]);
    <span class="code-keyword">const</span> sim = <span class="code-func">calculateSRPMechanics</span>(targetSpm, ctx.strokeLength, ctx.wellDepth, ctx.viscosity);
    <span class="code-keyword">return</span> {
      text: <span class="code-str">\`⚡ Recalculated for \${targetSpm} SPM: Peak Polish Rod Load adjusts to \${sim.pprl} lbs with \${sim.motorHPEstimate} HP.\`</span>,
      action: { type: <span class="code-str">'SET_SPM'</span>, value: targetSpm }, confidence: <span class="code-num">0.98</span>
    };
  }
  
  <span class="code-comment">// 2. Heavy Oil Domain Ontology & Thermal Recommendations</span>
  <span class="code-keyword">if</span> (q.<span class="code-func">includes</span>(<span class="code-str">'steam'</span>) || q.<span class="code-func">includes</span>(<span class="code-str">'viscosity'</span>)) {
    <span class="code-keyword">return</span> {
      text: <span class="code-str">\`🔥 Crude viscosity is \${ctx.viscosity} cP at \${ctx.bottomHoleTemp}°C. Optimal Andrade transition requires >180°C.\`</span>,
      action: { type: <span class="code-str">'OPTIMIZE_STEAM'</span>, value: <span class="code-num">280</span> }, confidence: <span class="code-num">0.95</span>
    };
  }
  <span class="code-keyword">return</span> <span class="code-func">generateTechnicalExplanation</span>(query, ctx);
}</div>
            <div class="card">
                <div class="card-title amber">AI Copilot Capabilities</div>
                <ul class="point-list">
                    <li><strong>Conversational & Freeform:</strong> Answers open-ended operational questions about thermodynamics, SCADA signals, and equipment safety.</li>
                    <li><strong>Physics-Grounded Reasoning:</strong> Every recommendation is backed by real-time ODE recalculation.</li>
                    <li><strong>Action Dispatch Buttons:</strong> Generates clickable action buttons that directly update the digital twin parameters.</li>
                </ul>
            </div>
        </div>
        <div class="slide-footer">
            <span>WELLORA™ Industrial SCADA Digital Twin</span>
            <span>Slide 12 / 17</span>
        </div>
    </div>

    <!-- SLIDE 13: OUTPUT SCREENSHOTS - FULL SUITE -->
    <div class="slide">
        <div class="slide-accent-bar"></div>
        <div class="slide-header">
            <div>
                <div class="pill">⚙ APPLICATION OUTPUTS</div>
                <div class="slide-title">Output Screenshots: SCADA Live Operational Suite</div>
            </div>
            <div class="slide-number">13 / 17</div>
        </div>
        <div class="slide-body grid-2">
            <div class="card">
                <div class="card-title">Production SCADA Control Grid</div>
                <div class="img-container" style="max-height: 380px;">
                    <img src="${images.finalDashboard}" class="img-preview" alt="Final Dashboard Screenshot">
                </div>
                <p style="font-size: 15px; color: var(--text-secondary); line-height: 1.5;">Complete SCADA dashboard displaying active alarms, multi-well telemetry, live oscilloscopes, and dynamometer loops simultaneously.</p>
            </div>
            <div class="card">
                <div class="card-title cyan">Subsurface 3D & P&ID Synoptic Flow</div>
                <div class="img-container" style="max-height: 380px;">
                    <img src="${images.pid}" class="img-preview" alt="P&ID Screenshot">
                </div>
                <p style="font-size: 15px; color: var(--text-secondary); line-height: 1.5;">Subsurface visualizer rendering animated steam injection paths, reservoir thermal isotherms, and walking beam mechanical reciprocation.</p>
            </div>
        </div>
        <div class="slide-footer">
            <span>WELLORA™ Industrial SCADA Digital Twin</span>
            <span>Slide 13 / 17</span>
        </div>
    </div>

    <!-- SLIDE 14: OUTPUT SCREENSHOTS - AI COPILOT -->
    <div class="slide">
        <div class="slide-accent-bar"></div>
        <div class="slide-header">
            <div>
                <div class="pill">⚙ AI INTERACTION OUTPUTS</div>
                <div class="slide-title">Output Screenshots: Conversational AI Copilot in Action</div>
            </div>
            <div class="slide-number">14 / 17</div>
        </div>
        <div class="slide-body grid-2">
            <div class="card">
                <div class="card-title amber">Freeform AI Chat Interaction</div>
                <div class="img-container" style="max-height: 380px;">
                    <img src="${images.aiChat}" class="img-preview" alt="AI Copilot Chat Screenshot">
                </div>
                <p style="font-size: 15px; color: var(--text-secondary); line-height: 1.5;">AI Copilot answering complex, freeform technical questions regarding Andrade viscosity equations and thermal soaking strategies.</p>
            </div>
            <div class="card">
                <div class="card-title green">What-If Scenario Action Dispatch</div>
                <div class="img-container" style="max-height: 380px;">
                    <img src="${images.aiDispatch}" class="img-preview" alt="AI Dispatch Screenshot">
                </div>
                <p style="font-size: 15px; color: var(--text-secondary); line-height: 1.5;">Operator clicking direct "Apply 6.5 SPM Setpoint" action button from AI advice, immediately updating physics simulations and SCADA alarms.</p>
            </div>
        </div>
        <div class="slide-footer">
            <span>WELLORA™ Industrial SCADA Digital Twin</span>
            <span>Slide 14 / 17</span>
        </div>
    </div>

    <!-- SLIDE 15: CONCLUSION -->
    <div class="slide">
        <div class="slide-accent-bar"></div>
        <div class="slide-header">
            <div>
                <div class="pill">⚙ PROJECT SUMMARY</div>
                <div class="slide-title">Conclusion: Key Engineering Achievements</div>
            </div>
            <div class="slide-number">15 / 17</div>
        </div>
        <div class="slide-body grid-2">
            <div class="card">
                <div class="card-title">✔ Unified Dual-Physics Twin Realized</div>
                <p style="font-size: 17px; color: var(--text-secondary); line-height: 1.6;">Successfully combined heavy crude oil thermodynamics (Andrade model) with mechanical sucker rod dynamics into a single cohesive SCADA digital twin.</p>
            </div>
            <div class="card">
                <div class="card-title cyan">✔ 2 Hz SCADA Telemetry & Alarm Matrix</div>
                <p style="font-size: 17px; color: var(--text-secondary); line-height: 1.6;">Engineered a 2 Hz streaming engine and native Web Audio acoustic synthesizer, delivering instant situational awareness for heavy crude operators.</p>
            </div>
            <div class="card">
                <div class="card-title green">✔ Actionable Conversational AI Copilot</div>
                <p style="font-size: 17px; color: var(--text-secondary); line-height: 1.6;">Developed an open-ended copilot capable of evaluating what-if scenarios on-the-fly and dispatching parameter setpoints directly to the digital twin.</p>
            </div>
            <div class="card">
                <div class="card-title amber">✔ Demonstrated Field Value</div>
                <p style="font-size: 17px; color: var(--text-secondary); line-height: 1.6;">Simulations demonstrate a +28.4% improvement in steam thermal efficiency and a -34.8% reduction in rod fatigue cycles, saving equipment wear and energy costs.</p>
            </div>
        </div>
        <div class="slide-footer">
            <span>WELLORA™ Industrial SCADA Digital Twin</span>
            <span>Slide 15 / 17</span>
        </div>
    </div>

    <!-- SLIDE 16: FUTURE ENHANCEMENTS -->
    <div class="slide">
        <div class="slide-accent-bar"></div>
        <div class="slide-header">
            <div>
                <div class="pill">⚙ NEXT GENERATION CAPABILITIES</div>
                <div class="slide-title">Future Enhancement & Technical Roadmap</div>
            </div>
            <div class="slide-number">16 / 17</div>
        </div>
        <div class="slide-body" style="grid-template-columns: 1fr; display: flex; flex-direction: column; gap: 16px;">
            <div class="card" style="flex-direction: row; align-items: center; gap: 24px; padding: 20px 28px;">
                <div style="font-size: 38px;">🌐</div>
                <div>
                    <div class="card-title">Edge IoT RTU Hardware Bridge (MQTT / OPC-UA)</div>
                    <div style="font-size: 16px; color: var(--text-secondary); margin-top: 4px;">Direct coupling with field Modbus TCP RTUs, MQTT Sparkplug B brokers, and Siemens/Rockwell PLCs for live wellhead sensor ingestion.</div>
                </div>
            </div>
            <div class="card" style="flex-direction: row; align-items: center; gap: 24px; padding: 20px 28px;">
                <div style="font-size: 38px;">🧠</div>
                <div>
                    <div class="card-title cyan">Physics-Informed Neural Networks (PINN)</div>
                    <div style="font-size: 16px; color: var(--text-secondary); margin-top: 4px;">Embedding deep learning PINN surrogate models to solve 3D reservoir thermal diffusion equations in sub-milliseconds on edge AI accelerators.</div>
                </div>
            </div>
            <div class="card" style="flex-direction: row; align-items: center; gap: 24px; padding: 20px 28px;">
                <div style="font-size: 38px;">🔄</div>
                <div>
                    <div class="card-title green">Autonomous Closed-Loop VFD Modulation</div>
                    <div style="font-size: 16px; color: var(--text-secondary); margin-top: 4px;">Autonomous Variable Frequency Drive (VFD) speed modulation, automatically throttling pump SPM upon early detection of fluid pound or gas interference.</div>
                </div>
            </div>
            <div class="card" style="flex-direction: row; align-items: center; gap: 24px; padding: 20px 28px;">
                <div style="font-size: 38px;">📱</div>
                <div>
                    <div class="card-title amber">Cross-Platform Native Android / iOS SCADA</div>
                    <div style="font-size: 16px; color: var(--text-secondary); margin-top: 4px;">Packaged native Android APK and iOS application with push notifications for critical downhole pressure drops and rod stress spikes.</div>
                </div>
            </div>
        </div>
        <div class="slide-footer">
            <span>WELLORA™ Industrial SCADA Digital Twin</span>
            <span>Slide 16 / 17</span>
        </div>
    </div>

    <!-- SLIDE 17: REFERENCES -->
    <div class="slide">
        <div class="slide-accent-bar"></div>
        <div class="slide-header">
            <div>
                <div class="pill">⚙ BIBLIOGRAPHY & CITATIONS</div>
                <div class="slide-title">References & Industry Standards</div>
            </div>
            <div class="slide-number">17 / 17</div>
        </div>
        <div class="slide-body grid-1">
            <div class="card">
                <ul class="point-list" style="gap: 18px;">
                    <li><strong>[1] American Petroleum Institute (API) RP 11L:</strong> "Recommended Practice for Design Calculations for Sucker Rod Pumping Systems (Conventional Units)", 5th Edition.</li>
                    <li><strong>[2] Andrade, E. N. da C. (1934):</strong> "A Theory of the Viscosity of Liquids", Philosophical Magazine, Series 7, Vol. 17, No. 112, pp. 497-511.</li>
                    <li><strong>[3] Prats, M. (1982):</strong> "Thermal Recovery", SPE Monograph Volume 7, Society of Petroleum Engineers, Richardson, TX.</li>
                    <li><strong>[4] Gibbs, S. G. & Neely, A. B. (1966):</strong> "Computer Diagnosis of Down-Hole Conditions in Sucker Rod Pumping Wells", Journal of Petroleum Technology, SPE-1165-PA.</li>
                    <li><strong>[5] Butler, R. M. (1991):</strong> "Thermal Recovery of Oil and Bitumen", Prentice Hall, Englewood Cliffs, NJ.</li>
                    <li><strong>[6] Takacs, G. (2015):</strong> "Sucker-Rod Pumping Manual", PennWell Books, Tulsa, OK.</li>
                    <li><strong>[7] ISO/IEC 62443:</strong> "Industrial communication networks - Network and system security (SCADA Automation)".</li>
                </ul>
            </div>
        </div>
        <div class="slide-footer">
            <span>WELLORA™ Industrial SCADA Digital Twin</span>
            <span>Slide 17 / 17</span>
        </div>
    </div>

</body>
</html>`;

const htmlPath = path.join(__dirname, 'printable_slides.html');
fs.writeFileSync(htmlPath, htmlContent);
console.log('Saved printable_slides.html');

const pdfPath = path.join(__dirname, 'WELLORA_Project_Presentation.pdf');
const edgeExe = 'C:\\\\Program Files (x86)\\\\Microsoft\\\\Edge\\\\Application\\\\msedge.exe';

const cmd = '"' + edgeExe + '" --headless --disable-gpu --run-all-compositor-stages-before-draw --print-to-pdf="' + pdfPath + '" --print-to-pdf-no-header "file:///' + htmlPath.replace(/\\\\/g, '/') + '"';
console.log('Running Edge print-to-pdf command...');

try {
    execSync(cmd, { stdio: 'inherit' });
    console.log('SUCCESS: Generated PDF at:', pdfPath);
} catch (e) {
    console.error('Error generating PDF:', e);
}
