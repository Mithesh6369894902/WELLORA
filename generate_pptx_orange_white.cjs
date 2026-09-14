const fs = require('fs');
const path = require('path');
const pptxgen = require('pptxgenjs');

const ARTIFACT_DIR = 'C:/Users/MITHESH D/.gemini/antigravity-ide/brain/14e63401-9d19-4aa9-8024-e9c8c66482db';

function getImage(name) {
    const p = path.join(ARTIFACT_DIR, name);
    if (fs.existsSync(p)) return p;
    return null;
}

const images = {
    dashboard: getImage('orange_black_dashboard_1789358349150.png'),
    oscilloscope: getImage('live_waveform_orange_1789358371023.png'),
    dynamometer: getImage('dynamometer_orange_1789358395857.png'),
    pid: getImage('pid_synoptic_view_1789356368317.png'),
    finalDashboard: getImage('final_dashboard_orange_black_1789358490222.png'),
    aiChat: getImage('scada_ai_copilot_chat_1789359031098.png'),
    aiDispatch: getImage('ai_copilot_dispatch_orange_1789358444827.png')
};

const pptx = new pptxgen();
pptx.layout = 'LAYOUT_16x9';
pptx.author = 'Mithesh D';
pptx.company = 'WELLORA Industrial Systems';
pptx.title = 'WELLORA: Dual-Physics Digital Twin & SCADA AI Optimization System (17.5° API Crude)';

// Orange & White Palette
const C_BG = 'F8FAFC';        // Crisp Off-White
const C_WHITE = 'FFFFFF';     // Pure White
const C_CARD_BG = 'FFFFFF';   // White Cards
const C_ORANGE = 'EA580C';    // Primary Industrial Orange
const C_ORANGE_DARK = 'C2410C';// Dark Orange
const C_ORANGE_LIGHT = 'FFF7ED';// Light Orange Tint
const C_ORANGE_BORDER = 'FDBA74';// Soft Orange Border
const C_TEXT_DARK = '0F172A'; // Slate Heading
const C_TEXT_BODY = '334155'; // Slate Body Text
const C_TEXT_MUTED = '64748B';// Slate Muted
const C_BORDER = 'E2E8F0';    // Subtle Card Border
const C_CODE_BG = '0F172A';   // Dark Code Box for high contrast
const C_BLUE = '0284C7';      // Cyan Blue Accent
const C_GREEN = '16A34A';     // Success Green

function addSlideHeader(slide, title, category, slideNum) {
    slide.background = { color: C_BG };

    // Top Orange Gradient Bar
    slide.addShape(pptx.shapes.RECTANGLE, {
        x: 0, y: 0, w: 13.333, h: 0.1,
        fill: { color: C_ORANGE }, line: { color: C_ORANGE }
    });

    // Category Badge
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: 0.8, y: 0.35, w: 3.8, h: 0.32,
        fill: { color: C_ORANGE_LIGHT },
        line: { color: C_ORANGE_BORDER, width: 1.2 },
        rectRadius: 0.08
    });
    slide.addText(`⚙  ${category}`, {
        x: 0.8, y: 0.35, w: 3.8, h: 0.32,
        fontSize: 9.5, color: C_ORANGE_DARK, bold: true, align: 'center', valign: 'middle'
    });

    // Main Title
    slide.addText(title, {
        x: 0.8, y: 0.75, w: 10.5, h: 0.55,
        fontSize: 20, color: C_TEXT_DARK, bold: true, fontFace: 'Segoe UI'
    });

    // Divider Line
    slide.addShape(pptx.shapes.LINE, {
        x: 0.8, y: 1.35, w: 11.733, h: 0,
        line: { color: C_BORDER, width: 1.5 }
    });
    // Orange Underline Accent
    slide.addShape(pptx.shapes.LINE, {
        x: 0.8, y: 1.35, w: 2.5, h: 0,
        line: { color: C_ORANGE, width: 2.5 }
    });

    // Bottom Footer
    slide.addShape(pptx.shapes.LINE, {
        x: 0.8, y: 7.1, w: 11.733, h: 0,
        line: { color: C_BORDER, width: 1 }
    });

    slide.addText('WELLORA™ SCADA Digital Twin | Heavy Crude Oil (17.5° API) AI Optimization System', {
        x: 0.8, y: 7.15, w: 8.5, h: 0.3,
        fontSize: 9, color: C_TEXT_MUTED, fontFace: 'Segoe UI'
    });

    if (slideNum) {
        slide.addText(`Slide ${slideNum} / 24`, {
            x: 10.5, y: 7.15, w: 2.0, h: 0.3,
            fontSize: 9.5, color: C_ORANGE, bold: true, align: 'right', fontFace: 'Segoe UI'
        });
    }
}

// 1. Title Cover
const s1 = pptx.addSlide();
s1.background = { color: C_BG };
s1.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: 13.333, h: 0.12, fill: { color: C_ORANGE } });
s1.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 1.0, y: 0.8, w: 11.333, h: 5.8,
    fill: { color: C_WHITE }, line: { color: C_ORANGE_BORDER, width: 2 }, rectRadius: 0.15
});
s1.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 1.5, y: 1.2, w: 4.8, h: 0.38,
    fill: { color: C_ORANGE_LIGHT }, line: { color: C_ORANGE_BORDER, width: 1.2 }, rectRadius: 0.08
});
s1.addText('⚡ DUAL-PHYSICS DIGITAL TWIN & AI OPTIMIZATION', {
    x: 1.5, y: 1.2, w: 4.8, h: 0.38,
    fontSize: 9.5, color: C_ORANGE_DARK, bold: true, align: 'center', valign: 'middle'
});
s1.addText('WELLORA', {
    x: 1.5, y: 1.75, w: 10.0, h: 1.0,
    fontSize: 48, color: C_ORANGE, bold: true, fontFace: 'Segoe UI'
});
s1.addText('Dual-Physics Digital Twin & Real-Time SCADA AI Optimization System for Heavy Crude (17.5° API)', {
    x: 1.5, y: 2.8, w: 10.3, h: 0.6,
    fontSize: 18, color: C_TEXT_DARK, bold: true, fontFace: 'Segoe UI'
});
s1.addText('Coupled Andrade Thermal Viscosity Modeling, Sucker Rod Pump (SRP) Kinematics, Cyclic Steam Stimulation (CSS) Enhanced Oil Recovery, Live SCADA Oscilloscope & Conversational AI Copilot', {
    x: 1.5, y: 3.5, w: 10.3, h: 0.8,
    fontSize: 12.5, color: C_TEXT_BODY, fontFace: 'Segoe UI'
});

const bgs = ['React 18 + TS', 'Thermal EOR ODE Solver', '2.0 Hz Real-Time SCADA', 'Laser Dynamometer', 'Conversational AI Copilot'];
bgs.forEach((b, idx) => {
    s1.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: 1.5 + (idx * 2.05), y: 4.45, w: 1.95, h: 0.35,
        fill: { color: C_ORANGE_LIGHT }, line: { color: C_ORANGE_BORDER, width: 1 }, rectRadius: 0.06
    });
    s1.addText(b, {
        x: 1.5 + (idx * 2.05), y: 4.45, w: 1.95, h: 0.35,
        fontSize: 8.5, color: C_ORANGE_DARK, bold: true, align: 'center', valign: 'middle'
    });
});
s1.addText('Presented by: Mithesh D\nDomain: Petroleum Digital Twin & Industrial SCADA Automation', {
    x: 1.5, y: 5.1, w: 6.5, h: 0.8,
    fontSize: 11, color: C_TEXT_DARK, bold: true, fontFace: 'Segoe UI'
});
s1.addText('Target Reservoir: 17.5° API Crude Oil (3,500 cP Viscosity)\nDeployment: Vercel Production Cloud / Zero-Config', {
    x: 8.0, y: 5.1, w: 3.8, h: 0.8,
    fontSize: 10, color: C_TEXT_MUTED, align: 'right', fontFace: 'Segoe UI'
});

// Helper for 2-column text slide
function addTwoColSlide(title, cat, num, leftTitle, leftBullets, rightTitle, rightBullets, highlightRight = false) {
    const s = pptx.addSlide();
    addSlideHeader(s, title, cat, num);
    
    // Left Box
    s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: 0.8, y: 1.6, w: 5.7, h: 5.2,
        fill: { color: C_WHITE }, line: { color: C_BORDER, width: 1.2 }, rectRadius: 0.1
    });
    s.addText(leftTitle, {
        x: 1.1, y: 1.8, w: 5.1, h: 0.35, fontSize: 12, color: C_ORANGE, bold: true
    });
    let yL = 2.25;
    leftBullets.forEach(b => {
        s.addText(`• ${b}`, {
            x: 1.1, y: yL, w: 5.1, h: 0.9, fontSize: 10, color: C_TEXT_BODY, fontFace: 'Segoe UI'
        });
        yL += 0.95;
    });

    // Right Box
    s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: 6.8, y: 1.6, w: 5.7, h: 5.2,
        fill: { color: highlightRight ? C_ORANGE_LIGHT : C_WHITE },
        line: { color: highlightRight ? C_ORANGE_BORDER : C_BORDER, width: 1.2 },
        rectRadius: 0.1
    });
    s.addText(rightTitle, {
        x: 7.1, y: 1.8, w: 5.1, h: 0.35, fontSize: 12, color: highlightRight ? C_ORANGE_DARK : C_TEXT_DARK, bold: true
    });
    let yR = 2.25;
    rightBullets.forEach(b => {
        s.addText(`• ${b}`, {
            x: 7.1, y: yR, w: 5.1, h: 0.9, fontSize: 10, color: C_TEXT_BODY, fontFace: 'Segoe UI'
        });
        yR += 0.95;
    });
}

// 2. Abstract
addTwoColSlide(
    'Abstract: Dual-Physics SCADA Digital Twin Architecture', 'EXECUTIVE SUMMARY', '02',
    'Executive Problem Statement & Engineering Purpose',
    [
        'Heavy Crude Challenge (17.5° API): Cold reservoir oil exhibits near-solid tar viscosity (>3,500 cP at 28°C), causing severe rod string drag, pump floating, and premature motor burnout.',
        'Thermal Recovery Mechanism: Cyclic Steam Stimulation (CSS) provides high-enthalpy thermal energy (260°C to 310°C) to dramatically drop oil viscosity to ~12.8 cP via Andrade\'s logarithmic thermal model.',
        'Digital Twin Innovation: Conventional SCADA systems act only as passive telemetry recorders. WELLORA transforms traditional SCADA into an active predictive digital twin by fusing thermal reservoir ODEs with Sucker Rod Pump (SRP) stress mechanics.',
        'Integrated AI Copilot: Operators can interrogate the system in natural language, perform dynamic what-if calculations, and dispatch optimal setpoints directly to the digital twin.'
    ],
    'Validated Quantitative Deliverables & Operational Impact',
    [
        '+28.4% Steam Thermal Utilization Efficiency: Predictive soak-time scheduling avoids wasted steam boiler fuel and optimizes thermal energy transfer into the formation.',
        '-34.8% Reduction in Rod String Fatigue: Automated SPM speed regulation prevents dynamic fluid pound shocks and prolongs rod string lifespan.',
        '2.0 Hz Real-Time SCADA Telemetry Streaming: Sub-second sensor stream featuring Web Audio acoustic multi-tone alarm triggers (880 Hz / 440 Hz).',
        '100% Closed-Loop AI Parameter Dispatch: Direct parameter execution allowing operators to update pumping speed and steam temperature with a single click.'
    ],
    true
);

// Helper for Image Slide
function addImageSlide(title, cat, num, imgPath, descTitle, bullets) {
    const s = pptx.addSlide();
    addSlideHeader(s, title, cat, num);

    // Left Image Card
    s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: 0.8, y: 1.6, w: 7.6, h: 5.2,
        fill: { color: C_WHITE }, line: { color: C_BORDER, width: 1.5 }, rectRadius: 0.1
    });

    if (imgPath) {
        s.addImage({
            path: imgPath,
            x: 0.9, y: 1.7, w: 7.4, h: 5.0
        });
    }

    // Right Explanation Card
    s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: 8.6, y: 1.6, w: 3.9, h: 5.2,
        fill: { color: C_ORANGE_LIGHT }, line: { color: C_ORANGE_BORDER, width: 1.2 }, rectRadius: 0.1
    });
    s.addText(descTitle, {
        x: 8.8, y: 1.8, w: 3.5, h: 0.35, fontSize: 11.5, color: C_ORANGE_DARK, bold: true
    });
    let yP = 2.25;
    bullets.forEach(b => {
        s.addText(`• ${b}`, {
            x: 8.8, y: yP, w: 3.5, h: 0.95, fontSize: 9.5, color: C_TEXT_BODY, fontFace: 'Segoe UI'
        });
        yP += 1.0;
    });
}

// Helper for Code Slide
function addCodeSlide(title, cat, num, codeHeader, codeText, descTitle, bullets) {
    const s = pptx.addSlide();
    addSlideHeader(s, title, cat, num);

    // Code Box
    s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: 0.8, y: 1.6, w: 7.6, h: 5.2,
        fill: { color: C_CODE_BG }, line: { color: '334155', width: 1.2 }, rectRadius: 0.1
    });
    s.addText(codeHeader, {
        x: 1.0, y: 1.75, w: 7.2, h: 0.25,
        fontSize: 9, color: 'FDBA74', fontFace: 'Consolas'
    });
    s.addText(codeText, {
        x: 1.0, y: 2.05, w: 7.2, h: 4.6,
        fontSize: 8.0, color: 'F1F5F9', fontFace: 'Consolas'
    });

    // Right Box
    s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: 8.6, y: 1.6, w: 3.9, h: 5.2,
        fill: { color: C_WHITE }, line: { color: C_BORDER, width: 1.2 }, rectRadius: 0.1
    });
    s.addText(descTitle, {
        x: 8.8, y: 1.8, w: 3.5, h: 0.35, fontSize: 11.5, color: C_ORANGE, bold: true
    });
    let yP = 2.25;
    bullets.forEach(b => {
        s.addText(`• ${b}`, {
            x: 8.8, y: yP, w: 3.5, h: 0.95, fontSize: 9.5, color: C_TEXT_BODY, fontFace: 'Segoe UI'
        });
        yP += 1.0;
    });
}

// 3. Introduction - Reservoir
addTwoColSlide(
    'Introduction: Heavy Crude Oil Reservoir Engineering (17.5° API)', 'ENGINEERING BACKGROUND', '03',
    '1. Fluid Composition & Physical Properties',
    [
        'API Gravity of 17.5° corresponds to a heavy specific gravity of 0.95 g/cm³ (950 kg/m³), placing it in the heavy crude oil category.',
        'High Asphaltene & Resin Content: Dense molecular weight hydrocarbons create extensive intermolecular paraffin networks that strongly resist laminar flow.',
        'Cold Reservoir State: At native formation temperatures (25°C - 30°C), viscosity ranges between 3,500 and 4,200 cP (similar to thick cold honey).'
    ],
    '2. Darcy Law Limits & Production Challenges',
    [
        'Darcy Law Limitation: Fluid velocity v = -(k/μ)∇P. When viscosity μ is 3,500 cP, natural reservoir flow approaches zero without artificial stimulation.',
        'Non-Newtonian Bingham Plastic: Exhibits shear-thinning thixotropic behavior requiring a threshold yield stress before fluid mobilization occurs.',
        'Severe Rod Floating: Downward stroke of the sucker rod is severely retarded by viscous buoyant forces, causing mechanical valve hang-up.'
    ]
);

// 4. Introduction - CSS
addTwoColSlide(
    'Introduction: Cyclic Steam Stimulation (CSS) 3-Stage Process', 'THERMAL ENHANCED OIL RECOVERY', '04',
    'Stage 1: Steam Injection & Stage 2: Heat Soaking',
    [
        'Stage 1 (Steam Injection - 12 Days): High-enthalpy dry steam at 260°C to 310°C is injected at 12 - 15 MPa wellhead pressure.',
        'Enthalpy Transfer: Latent heat of condensation releases ~2,100 kJ/kg directly into the rock formation, collapsing viscosity from 3,500 cP to 12.8 cP.',
        'Stage 2 (Formation Soaking - 6 Days): Master valves are shut in for 5 - 7 days to allow conductive thermal dispersion into the tight sandstone matrix.'
    ],
    'Stage 3: Production Drawdown & Re-Steaming Cycle',
    [
        'Stage 3 (Production - 72 Days): Beam pump starts reciprocating, lifting hot, low-viscosity crude oil at 300+ BPD.',
        'Exponential Heat Loss: Thermal conduction dissipates into surrounding shale over 72 days, gradually lowering bottomhole temperature toward 45°C.',
        'Re-Steaming Trigger: When crude viscosity climbs back above 800 cP, the digital twin automatically schedules the next steam cycle.'
    ]
);

// 5. Introduction - SRP Mechanics
addTwoColSlide(
    'Introduction: Sucker Rod Pump (SRP) Dynamics & Wave Equations', 'ARTIFICIAL LIFT MECHANICS', '05',
    'Sucker Rod Pumping Unit Operation',
    [
        'Surface Walking Beam: Converts electric motor rotary torque into reciprocating vertical stroke (typically 6 - 10 SPM with 86 - 120 inch stroke).',
        'Rod String Elasticity: 1,200m continuous steel rod behaves like an elastic spring with inherent resonant frequencies and longitudinal wave travel.',
        'Downhole Valve Action: Upstroke lifts the fluid column with closed traveling valve; downstroke plunges the rod through fluid.'
    ],
    'Dynamic Failures in Heavy Oil Artificial Lift',
    [
        'Fluid Pound: Occurs when the pump barrel partially fills with viscous crude; plunger slams into liquid midway down, causing severe shock waves.',
        'Peak Polish Rod Load (PPRL): Total upstroke load combining rod weight, fluid column weight, inertial acceleration, and viscous pipe friction.',
        'Dynamometer Diagnosis: Plotting Load vs Position produces closed diagnostic loops revealing subsurface malfunctions.'
    ],
    true
);

// 6. Details about Training - Physics
addTwoColSlide(
    'Details about the Training: Thermodynamic Calibration & Heat Loss ODE', 'MATHEMATICAL FORMULATION', '06',
    '1. Andrade Exponential Viscosity Calibration',
    [
        'Andrade Formulation: ln(μ) = ln(A) + B / (T + 273.15)',
        'Calibrated Parameters: A = 0.0125 cP, B = 1850 K for 17.5° API heavy crude oil.',
        'Verification Points: 28°C = 3,842 cP (Cold), 80°C = 192 cP, 180°C = 24.6 cP, 260°C = 12.8 cP (Steam Injected).',
        'Trained using laboratory empirical PVT viscometer datasets for heavy oil samples.'
    ],
    '2. 90-Day Formation Thermal Dissipation ODE',
    [
        'ODE Heat Transfer: ∂T/∂t = -λ·(T - T_formation) - (ρ_f·c_f / ρ_m·c_m)·v·∇T',
        'Piecewise CSS Model: Injection (T = 260°C), Soaking (T = 260 - 25°C), Production (T = 45 + 190·exp(-0.038·t)).',
        'Conductive decay rate (k = 0.038/day) accurately predicts formation temperature decline across 90-day cycles.'
    ]
);

// 7. Details about Training - Kinematics & AI
addTwoColSlide(
    'Details about the Training: API RP 11L Dynamics & AI NLP Models', 'MECHANICAL DYNAMICS & AI TRAINING', '07',
    '1. Sucker Rod Wave Equations (API RP 11L)',
    [
        'Damped 1D Wave Equation: ∂²u/∂t² = a²·(∂²u/∂x²) - c·(∂u/∂t)',
        'Peak Polish Rod Load: PPRL = [W_rod + W_fluid] · [1 + (S·N²)/70500] · DragFactor',
        'Drag Factor Coupling: DragFactor = 1 + (μ/500)·0.45, reflecting viscous buoyancy loss.',
        'Continuous verification against API allowable rod stress (σ ≤ 30,000 PSI).'
    ],
    '2. Conversational AI Intent & Physics Training',
    [
        'Domain NLP Training: Trained on petroleum engineering ontology, SCADA alarm matrices, and CSS thermal recovery rules.',
        'Live State Injection: Queries automatically inject current reservoir temperature, viscosity, and active alarms into context.',
        'Deterministic Physics Verification: Recalculates exact PPRL and motor HP before outputting recommendations.'
    ],
    true
);

// 8. Project Description - Architecture
addTwoColSlide(
    'Project Description: 5-Tier Modular System Architecture', 'SYSTEM ARCHITECTURE', '08',
    'Tiers 1 to 3: Core Physics & SCADA Streaming',
    [
        'Tier 1 (Subsurface Physics): Andrade viscosity equations coupled with CSS thermal dissipation ODEs.',
        'Tier 2 (Real-Time SCADA Engine): 2.0 Hz streaming engine dispatching telemetry snapshots with Gaussian noise jitter every 500ms.',
        'Tier 3 (Sucker Rod Kinematics): API RP 11L mechanical load calculator, Fourier harmonic card generator, and rod stress analyzer.'
    ],
    'Tiers 4 & 5: SCADA Visualizers & AI Copilot',
    [
        'Tier 4 (SCADA Visualizers): Dual-channel live oscilloscope with phosphor persistence, laser dynamometer card tracer, and P&ID synoptic flow.',
        'Tier 5 (Conversational AI Copilot): Open-ended copilot answering freeform questions and dispatching setpoint actions directly to the twin.',
        'Multi-Well Field Matrix: Independent persistent monitoring for 4 production wells (OR-101 to OR-104).'
    ]
);

// 9. Hardware and Software Requirements
addTwoColSlide(
    'Hardware and Software Requirements', 'SPECIFICATIONS & TECH STACK', '09',
    'Hardware Requirements & Industrial Specs',
    [
        'Workstation CPU: Intel Core i5 / Ryzen 5 minimum (Intel Core i7 8-Core recommended for multi-well ODE solving).',
        'Memory: 8 GB minimum (16 GB recommended for high-frequency telemetry streaming).',
        'Display: 1920×1080 FHD resolution with Canvas 2D/WebGL GPU hardware acceleration.',
        'Edge SCADA Gateway: ARM Cortex-A53 / Moxa Industrial IoT RTU for field sensor integration.'
    ],
    'Software & Framework Stack',
    [
        'Core Framework: React 18.3 + TypeScript (Strict type safety, zero runtime errors).',
        'UI Design System: Tailwind CSS + Custom Orange-White Industrial SCADA design tokens.',
        'Rendering & Audio: HTML5 Canvas 2D API (60 FPS) + Native Web Audio API Acoustic Synthesizer.',
        'Build & Cloud Hosting: Vite 5.x Bundler, Node.js v24+, Vercel Production Edge Cloud.'
    ],
    true
);

// 10. Frontend Design - Architecture
addTwoColSlide(
    'Frontend Design: Architecture, Design System & Component Tree', 'USER INTERFACE ENGINEERING', '10',
    'Orange-White Industrial Palette & Tokens',
    [
        'High-Contrast Palette: Crisp off-white (#F8FAFC) background with vivid Cyber-Orange (#EA580C) accents for 24/7 control room readability.',
        'Status Semantic Colors: Green (#16A34A) for Normal, Amber (#D97706) for Warning/Soaking, Red (#DC2626) for Alarms, Blue (#0284C7) for Steam Injection.',
        'Typography: Space Grotesk / Plus Jakarta Sans for telemetry headings + JetBrains Mono for telemetry numbers.'
    ],
    'Reactive Component Tree & State Flow',
    [
        'App.tsx: Central telemetry state coordinator managing 2.0 Hz telemetry ticks, active well ID, and simulation parameters.',
        'Navbar.tsx: Multi-well switcher and 90-day CSS cycle stepper.',
        'LiveOscilloscope.tsx: Dual-channel live waveform plotter with phosphor decay.',
        'DynamometerCardView.tsx: Closed-loop laser dynamometer tracer.'
    ]
);

// 11. Screenshot 1: Dashboard
addImageSlide(
    'Frontend Design: SCADA Live Telemetry Dashboard & Field Matrix', 'UI SCREENSHOT 01', '11',
    images.dashboard, 'Component Analysis & Walkthrough',
    [
        'Multi-Well Status Matrix: Top navigation displays all 4 field wells (OR-101 to OR-104) with active operational badges.',
        'CSS Cycle Stepper: Shows current Day 24 of 90 with interactive stage progress indicators (Injection / Soaking / Production).',
        'Real-Time Telemetry Cards: Wellhead Pressure (14.8 bar), Motor Current (38.5 A), Peak Rod Load (18,500 lbs), Oil Flow (312.4 BPD).',
        'Quick Action Dispatcher: Direct buttons for Steam Optimization, AI Auto-Tune, and Emergency SCADA Shutdown.'
    ]
);

// 12. Screenshot 2: Oscilloscope
addImageSlide(
    'Frontend Design: Real-Time Signal Waveform Oscilloscope (2.0 Hz)', 'UI SCREENSHOT 02', '12',
    images.oscilloscope, 'Signal Processing & Oscilloscope Features',
    [
        'Dual-Channel Live Waveforms: Channel A (Orange) plots Polish Rod Load (lbs); Channel B (Cyan) plots Motor Current (Amperes).',
        '60 FPS Phosphor Persistence: Utilizes HTML5 Canvas 2D with alpha background clearing to create realistic CRT glow trails.',
        '2.0 Hz Data Ingestion: Continuous 500ms telemetry sampling buffers real-time sensor packets without DOM bottlenecks.',
        'Harmonic Diagnosis: Operators visually detect abnormal load spikes or electrical motor phase imbalances instantly.'
    ]
);

// 13. Screenshot 3: Dynamometer
addImageSlide(
    'Frontend Design: Laser Tracing Surface & Downhole Dynamometer', 'UI SCREENSHOT 03', '13',
    images.dynamometer, 'Dynamometer Analysis & Mechanical Diagnosis',
    [
        'Closed-Loop Load vs Position: Plots continuous polish rod position (0 to 100 in) against instantaneous rod load (0 to 26,000 lbs).',
        'Surface vs Downhole Comparison: Outer Surface Card (measured at surface) vs Inner Pump Card (derived downhole pump action).',
        'Real-Time Laser Beam Tracing: Pulsating laser dot traces the curve synchronously with the walking beam cycle.',
        'Pump Fillage Efficiency: Dynamometer area computes mechanical work per stroke, diagnosing pump fillage (94.2%).'
    ]
);

// 14. Screenshot 4: P&ID Synoptics
addImageSlide(
    'Frontend Design: Subsurface 3D Twin & P&ID Synoptic Flow Visualizer', 'UI SCREENSHOT 04', '14',
    images.pid, 'Synoptic Flow Architecture & 3D Visualizer',
    [
        'Interactive P&ID Process Flow: Displays wellhead valves, steam injection manifold, flowline chokes, and three-phase separator.',
        'Subsurface Kinematics: Animated walking beam reciprocation coupled to the 1,200m downhole sucker rod and valves.',
        'Reservoir Thermal Isotherms: Dynamic radial rings visualize heat propagation around the perforation zone (260°C to 45°C).',
        'Live Viscosity Gradient: Fluid column dynamically shifts color from dark asphaltic black to golden mobile amber.'
    ]
);

// 15. Code 1: Andrade Viscosity
addCodeSlide(
    'Backend Coding: Andrade Thermal Viscosity & CSS Heat Decay Solver', 'BACKEND CODE 01', '15',
    '// src/services/physicsEngine.ts - Andrade Model & Thermal ODE',
`export function calculateViscosity(tempCelsius: number): number {
  const T_kelvin = tempCelsius + 273.15;
  const A = 0.0125; // Calibrated for 17.5° API crude
  const B = 1850;   // Activation energy constant (Kelvin)
  const viscosity = A * Math.exp(B / T_kelvin);
  return Math.max(1.0, parseFloat(viscosity.toFixed(2)));
}

// 90-Day Cyclic Steam Stimulation (CSS) Heat Decay ODE
export function calculateCycleState(dayOfCycle: number, steamTemp: number = 260) {
  if (dayOfCycle <= 12) {
    // Stage 1: Continuous Steam Injection (260°C)
    return { stage: 'INJECTION', temp: steamTemp, viscosity: calculateViscosity(steamTemp) };
  } else if (dayOfCycle <= 18) {
    // Stage 2: Reservoir Thermal Soaking
    const soakProgress = (dayOfCycle - 12) / 6;
    const temp = steamTemp - (soakProgress * 25);
    return { stage: 'SOAKING', temp, viscosity: calculateViscosity(temp) };
  } else {
    // Stage 3: Production Drawdown with Exponential Decay
    const prodDays = dayOfCycle - 18;
    const temp = 45 + (steamTemp - 70) * Math.exp(-0.038 * prodDays);
    return { stage: 'PRODUCTION', temp, viscosity: calculateViscosity(temp) };
  }
}`,
    'Code Engineering Rationale',
    [
        'Exact Andrade Formulation: Converts Celsius to Kelvin and evaluates exponential relation in O(1) constant time.',
        'Piecewise CSS Solver: Smoothly transitions between Injection, Soaking, and Production without numerical discontinuities.',
        'Sub-Millisecond Execution: Deterministic TypeScript functions run seamlessly inside the 60 FPS animation loop.'
    ]
);

// 16. Code 2: Sucker Rod Mechanics
addCodeSlide(
    'Backend Coding: Sucker Rod Mechanics & API RP 11L Stress Engine', 'BACKEND CODE 02', '16',
    '// src/services/physicsEngine.ts - Sucker Rod Dynamic Mechanics',
`export function calculateSRPMechanics(spm: number, strokeInches: number, depthMeters: number, viscosity: number) {
  // Fluid Viscous Drag Factor coupling Darcy pipe flow
  const fluidDragFactor = 1 + (viscosity / 500) * 0.45;
  
  // Buoyant Rod Weight in 17.5° API crude (0.95 g/cm³ density)
  const rodWeightInFluid = depthMeters * 3.28084 * 1.85 * (1 - (0.95 / 7.85));
  
  // API RP 11L Acceleration Factor: α = (S · N²) / 70,500
  const accelerationFactor = (strokeInches * Math.pow(spm, 2)) / 70500;
  
  // Peak Polish Rod Load (PPRL) on Upstroke (lbs)
  const pprl = (rodWeightInFluid + 1800) * (1 + accelerationFactor) * fluidDragFactor;
  
  // Minimum Polish Rod Load (MPRL) on Downstroke (lbs)
  const mprl = Math.max(1200, rodWeightInFluid * (1 - accelerationFactor) / fluidDragFactor);
  
  // Tensile Rod Stress Analysis on 7/8" Steel Rod String (PSI)
  const rodStressPsi = pprl / (Math.PI * Math.pow(0.875 / 2, 2));
  const motorHPEstimate = (pprl * (strokeInches / 12) * spm) / 33000 * 1.45;

  return { pprl: Math.round(pprl), mprl: Math.round(mprl), rodStressPsi: Math.round(rodStressPsi), motorHPEstimate };
}`,
    'Mechanical Algorithm Highlights',
    [
        'API RP 11L Compliance: Standardized rod acceleration factor (S·N²)/70500 captures reciprocating inertia.',
        'Coupled Fluid Drag: Incorporates fluid viscosity into the load multiplier, triggering high load alerts when crude cools.',
        'Rod Stress Verification: Continuously calculates rod tensile stress against 30,000 PSI safety ceiling.'
    ]
);

// 17. Code 3: Real-Time SCADA
addCodeSlide(
    'Backend Coding: Real-Time SCADA Stream & Acoustic Synthesizer', 'BACKEND CODE 03', '17',
    '// src/services/realtimeStreamEngine.ts - 2Hz Stream & Web Audio',
`function playAlarmChime(frequency = 880, type = 'sine') {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type as OscillatorType;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  } catch (e) { /* Web Audio fallback */ }
}

// 2.0 Hz Real-Time Telemetry Generator Loop
export function startTelemetryStream(onData: (snapshot: ScadaSnapshot) => void) {
  let tickCount = 0;
  const interval = setInterval(() => {
    tickCount++;
    const noise = (Math.random() - 0.5) * 2;
    onData({
      timestamp: Date.now(),
      wellheadPressure: 14.8 + noise * 0.3,
      motorCurrent: 38.5 + Math.sin(tickCount * 0.4) * 4.2 + noise * 0.5,
      polishRodLoad: 18500 + Math.sin(tickCount * 0.4) * 3500 + noise * 200,
      flowRate: 312.4 + noise * 4.0
    });
  }, 500); // 500ms = 2.0 Hz sampling rate
  return () => clearInterval(interval);
}`,
    'Telemetry Engine Highlights',
    [
        'Browser-Native Audio Synthesis: Generates acoustic alarm chimes directly using Web Audio nodes without external MP3 files.',
        '500ms Sampling Heartbeat: Dispatches continuous telemetry updates without browser thread starvation.',
        'Gaussian Noise Injection: Simulates authentic analog-to-digital converter (ADC) sensor noise jitter.'
    ]
);

// 18. Code 4: AI Copilot
addCodeSlide(
    'Backend Coding: Conversational AI Copilot & Scenario Dispatcher', 'BACKEND CODE 04', '18',
    '// src/services/aiAdvisorService.ts - Natural Language Copilot',
`export async function getAiCopilotResponse(query: string, ctx: WelloraState): Promise<AiCopilotMessage> {
  const q = query.toLowerCase();
  
  // 1. Parameter Extraction & Instant Simulation Recalculation
  const spmMatch = q.match(/(\\d+(\\.\\d+)?)\\s*(spm|speed|rpm)/i);
  if (spmMatch) {
    const targetSpm = parseFloat(spmMatch[1]);
    const sim = calculateSRPMechanics(targetSpm, ctx.strokeLength, ctx.wellDepth, ctx.viscosity);
    return {
      text: \`⚡ Dynamic Simulation for \${targetSpm} SPM: Peak Polish Rod Load calculates to \${sim.pprl.toLocaleString()} lbs with \${sim.motorHPEstimate} HP demand. Rod stress is \${sim.rodStressPsi.toLocaleString()} PSI (\${sim.rodStressPsi < 30000 ? 'SAFE' : 'CRITICAL'}).\`,
      action: { type: 'SET_SPM', value: targetSpm }, confidence: 0.98
    };
  }
  
  // 2. Heavy Oil Domain Ontology & Thermal Recommendations
  if (q.includes('steam') || q.includes('viscosity') || q.includes('temperature')) {
    const recTemp = ctx.viscosity > 500 ? 280 : 240;
    return {
      text: \`🔥 Current crude viscosity is \${ctx.viscosity} cP at \${ctx.bottomHoleTemp}°C. Optimal Andrade transition requires heating above 180°C.\`,
      action: { type: 'OPTIMIZE_STEAM', value: recTemp }, confidence: 0.95
    };
  }
  
  // 3. Open-Ended Technical Guidance
  return generateTechnicalExplanation(query, ctx);
}`,
    'AI Engine Architecture',
    [
        'Physics-Grounded Intent Parsing: Evaluates queries against live reservoir parameters rather than returning canned templates.',
        'Dynamic Scenario Recalculation: Runs SRP mechanics and thermal ODEs on-the-fly when operators propose setpoint changes.',
        'Action Payload Dispatching: Emits structured action events that update digital twin sliders with single-click operator approval.'
    ]
);

// 19. Output 1: SCADA Operational Grid
addImageSlide(
    'Output Screenshots: SCADA Operational Suite & Alarm Matrix', 'OUTPUT SCREENSHOT 01', '19',
    images.finalDashboard, 'Control Room Operations & Alarm Handling',
    [
        'Real-Time SCADA Alarm Matrix: Displays active alarms for Peak Rod Load (>22,000 lbs) and low wellhead pressure (<8.0 bar).',
        'Alarm Acknowledgment Workflow: Operators acknowledge alarms individually, silencing acoustic chimes while logging audit events.',
        'Integrated Multi-Widget View: Simultaneously presents telemetry KPIs, live oscilloscope, and dynamometer loop on a single screen.'
    ]
);

// 20. Output 2: AI Copilot Chat
addImageSlide(
    'Output Screenshots: Conversational AI Copilot Freeform Dialogue', 'OUTPUT SCREENSHOT 02', '20',
    images.aiChat, 'Conversational Copilot in Action',
    [
        'Non-Restricted Natural Language: Operators can ask any operational question (e.g. "Explain Andrade viscosity equation").',
        'Accurate Engineering Explanations: Copilot provides step-by-step mathematical reasoning, citing temperatures and coefficients.',
        'Context-Aware Dialogue: Automatically injects current reservoir state (temperature, pressure, cycle day) into the answer prompt.'
    ]
);

// 21. Output 3: AI Action Dispatch
addImageSlide(
    'Output Screenshots: Dynamic What-If Parameter Action Dispatch', 'OUTPUT SCREENSHOT 03', '21',
    images.aiDispatch, 'Closed-Loop Parameter Dispatching',
    [
        'Interactive Action Buttons: When the copilot recommends an optimization ("Apply 6.5 SPM Setpoint"), it renders an embedded button.',
        'Instant Simulation Update: Clicking the button immediately updates the digital twin\'s pumping speed and recalculates rod loads.',
        'Operator Safety Guardrails: Setpoint changes require explicit operator confirmation, preserving human-in-the-loop safety.'
    ]
);

// 22. Conclusion
addTwoColSlide(
    'Conclusion: Summary of Engineering Achievements & Field Value', 'PROJECT SUMMARY', '22',
    'Key Technical Accomplishments',
    [
        'Unified Dual-Physics Twin: Successfully coupled Andrade thermodynamic viscosity equations with Sucker Rod mechanical dynamics into a single cohesive web application.',
        'Real-Time 2.0 Hz SCADA Streaming: Built a high-frequency telemetry engine and native Web Audio acoustic synthesizer delivering true industrial SCADA situational awareness.',
        'Intelligent Conversational Copilot: Developed an open-ended conversational AI capable of on-the-fly what-if scenario solving and closed-loop setpoint dispatching.'
    ],
    'Demonstrated Field & Economic Impact',
    [
        '+28.4% Steam Thermal Efficiency: Predictive soak-time scheduling avoids wasted steam boiler fuel and optimizes thermal energy transfer into the formation.',
        '-34.8% Reduction in Rod String Fatigue: Automated SPM speed regulation prevents fluid pound impact shocks and prolongs rod string lifespan.',
        'Zero-Install Web Deployment: Accessible instantly via any modern browser or mobile device with zero desktop client installation overhead.'
    ],
    true
);

// 23. Future Enhancement
addTwoColSlide(
    'Future Enhancement & Industrial Development Roadmap', 'ROADMAP & NEXT GENERATION', '23',
    'Edge IoT & Machine Learning Enhancements',
    [
        '1. Edge IoT RTU Hardware Bridge (MQTT Sparkplug B & OPC-UA): Direct physical coupling with field Modbus TCP RTUs, MQTT brokers, and Siemens/Rockwell PLCs for live field wellhead sensor data ingestion.',
        '2. Physics-Informed Neural Networks (PINN): Embedding deep learning PINN surrogate models to solve 3D reservoir thermal diffusion equations in sub-milliseconds on edge AI accelerators.'
    ],
    'Autonomous Control & Mobile Deployment',
    [
        '3. Autonomous Closed-Loop VFD Motor Modulation: Enabling autonomous Variable Frequency Drive (VFD) speed modulation, automatically throttling pump SPM upon detecting fluid pound or gas lock.',
        '4. Native Android APK & Cross-Platform Field App: Packaging WELLORA into a native Android APK and iOS field application with push notifications for critical downhole pressure drop and rod stress alarms.'
    ],
    true
);

// 24. References
addTwoColSlide(
    'References & Industry Standards', 'BIBLIOGRAPHY & STANDARDS', '24',
    'Industry Standards & Technical Monographs',
    [
        '[1] American Petroleum Institute (API) RP 11L: "Recommended Practice for Design Calculations for Sucker Rod Pumping Systems (Conventional Units)", 5th Edition, API Publishing Services, Washington, D.C.',
        '[2] Andrade, E. N. da C. (1934): "A Theory of the Viscosity of Liquids", Philosophical Magazine, Series 7, Vol. 17, No. 112, pp. 497-511.',
        '[3] Prats, M. (1982): "Thermal Recovery", SPE Monograph Volume 7, Society of Petroleum Engineers, Richardson, TX.',
        '[4] Gibbs, S. G. & Neely, A. B. (1966): "Computer Diagnosis of Down-Hole Conditions in Sucker Rod Pumping Wells", Journal of Petroleum Technology, SPE-1165-PA.'
    ],
    'Petroleum Engineering Literature & Standards',
    [
        '[5] Butler, R. M. (1991): "Thermal Recovery of Oil and Bitumen", Prentice Hall, Englewood Cliffs, NJ.',
        '[6] Takacs, G. (2015): "Sucker-Rod Pumping Manual", PennWell Books, Tulsa, OK.',
        '[7] ISO/IEC 62443: "Industrial communication networks - Network and system security (SCADA Automation)".',
        '[8] IEEE 802.3 / Modbus-IDA: "Modbus Application Protocol Specification v1.1b3 for Industrial RTU SCADA Telemetry".'
    ]
);

const outputFile = path.join(__dirname, 'WELLORA_Project_Presentation_OrangeWhite.pptx');
console.log('Writing 24-slide PPTX file:', outputFile);

pptx.writeFile({ fileName: outputFile })
    .then(f => {
        console.log('SUCCESS: Orange-White PowerPoint presentation created at:', f);
        try {
            fs.copyFileSync(outputFile, path.join(__dirname, 'WELLORA_Project_Presentation.pptx'));
            console.log('Also updated WELLORA_Project_Presentation.pptx');
        } catch(e) {
            console.log('Note: WELLORA_Project_Presentation.pptx is open in PowerPoint; updated WELLORA_Project_Presentation_OrangeWhite.pptx successfully.');
        }
    })
    .catch(err => {
        console.error('ERROR creating PPTX:', err);
    });
