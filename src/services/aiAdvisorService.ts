import type { RealTimeTelemetry, CSSParameters, SRPParameters, ReservoirParameters } from '../types';
import {
  calculateProductionRates,
  calculateRodLoadsAndFloatingRisk,
  calculateViscosity,
} from './physicsEngine';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: number;
  category?: 'DIAGNOSTIC' | 'RECOMMENDATION' | 'EXPLANATION' | 'GENERAL';
  actionButton?: {
    label: string;
    actionType: 'SET_SPM' | 'SET_STEAM' | 'SWITCH_TAB';
    payload: string | number;
  };
}

const AI_CHAT_STORAGE_KEY = 'wellora_scada_ai_chat_history_v2';

export function loadSavedChatHistory(): ChatMessage[] {
  try {
    const raw = localStorage.getItem(AI_CHAT_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveChatHistory(messages: ChatMessage[]): void {
  try {
    localStorage.setItem(AI_CHAT_STORAGE_KEY, JSON.stringify(messages.slice(-50)));
  } catch {
    //
  }
}

/**
 * Intelligent, Conversational Natural Language Reasoning Engine for WELLORA
 */
export function generateAiAdvice(
  userQuery: string,
  telemetry: RealTimeTelemetry,
  css: CSSParameters,
  srp: SRPParameters,
  res: ReservoirParameters
): {
  response: string;
  category: ChatMessage['category'];
  actionButton?: ChatMessage['actionButton'];
} {
  const query = userQuery.trim();
  const qLower = query.toLowerCase();

  // Helper to extract numbers from query
  const extractNumbers = (str: string): number[] => {
    const matches = str.match(/-?\d+(\.\d+)?/g);
    return matches ? matches.map(Number) : [];
  };

  // =========================================================================
  // 1. GREETINGS, IDENTITY & CASUAL CHAT
  // =========================================================================
  if (
    /^(hi|hello|hey|greetings|howdy|sup|good\s*(morning|afternoon|evening|day))(\s.*)?$/i.test(query)
  ) {
    return {
      category: 'GENERAL',
      response: `👋 **Hello! Welcome to WELLORA.**\n\nI'm your real-time operations co-pilot for the Baghewala heavy crude field.\n\n**Current Live Well Status**:\n- 🛢️ **Production**: \`${telemetry.oilRate} m³/day\` (\`${(telemetry.oilRate * 6.28981).toFixed(1)} bpd\`)\n- 🌡️ **Bottom-Hole Temp**: \`${telemetry.bottomHoleTemp} °C\` (Viscosity: \`${telemetry.viscosity} cP\`)\n- ⚙️ **Pump Speed**: \`${telemetry.spm} SPM\` (Motor: \`${telemetry.motorPowerKw} kW\`)\n- 🛡️ **Mechanical Status**: ${
        telemetry.rodFloatingDetected
          ? '🚨 **Rod Floating Active!** (Viscous drag high)'
          : '✅ **Normal Tension Boundaries**'
      }\n\nYou can chat with me naturally about any part of this system, ask for live physics simulations, or give setpoint commands!`,
    };
  }

  if (
    qLower.includes('who are you') ||
    qLower.includes('what are you') ||
    qLower.includes('your name') ||
    qLower.includes('what can you do') ||
    qLower.includes('help me') ||
    qLower.includes('capabilities')
  ) {
    return {
      category: 'GENERAL',
      response: `🤖 **About WELLORA AI Co-Pilot**\n\nI am the intelligent supervisory and digital twin assistant for this petroleum engineering application.\n\n**Here is what you can ask me**:\n1. **App Navigation & Features**: Ask how the **3D Digital Twin**, **Waveform Oscilloscope**, **Dynamometer**, **CSS Optimizer**, **What-If Lab**, **ROI Dashboard**, or **Data Center** work.\n2. **Dynamic Physics & "What-If" Math**: Ask questions like *"What if temperature cools to 70°C?"* or *"What if SPM is 7.5?"* and I will calculate the exact viscosity, oil rate, and motor power on the fly.\n3. **Field Diagnostics**: Ask about rod floating, fluid pound, steam-oil ratio (SOR), bottom-hole cooling, or reservoir geology.\n4. **Setpoints & Automation**: Command me to adjust pump speeds, trigger mitigation actions, or jump between cycle days.`,
    };
  }

  if (
    qLower.includes('thank') ||
    qLower.includes('thanks') ||
    qLower.includes('awesome') ||
    qLower.includes('good job') ||
    qLower.includes('great work') ||
    qLower.includes('cool') ||
    qLower.includes('nice')
  ) {
    return {
      category: 'GENERAL',
      response: `😊 **You're very welcome!** I'm constantly monitoring the real-time sensor stream and physics model. Feel free to ask any other questions or test any scenario!`,
    };
  }

  if (
    qLower.includes('how are you') ||
    qLower.includes('how is the well') ||
    qLower.includes('how is well') ||
    qLower.includes('status of the well') ||
    qLower.includes('overview') ||
    qLower.includes('summary')
  ) {
    return {
      category: 'GENERAL',
      response: `📊 **Live Well Overview (Day ${telemetry.cycleDays}/60)**:\n\n- **Field**: Baghewala Formation (17.5° API, Depth ${res.depth}m)\n- **Reservoir Temperature**: \`${telemetry.bottomHoleTemp} °C\` (Fluid Viscosity: \`${telemetry.viscosity} cP\`)\n- **Production Rate**: \`${telemetry.oilRate} m³/day\` oil, \`${telemetry.waterRate} m³/day\` water (${telemetry.waterCut}% water cut)\n- **Pumping Dynamics**: \`${telemetry.spm} SPM\`, Peak Load \`${telemetry.polishedRodPeakLoad.toLocaleString()} lbs\`, Min Load \`${telemetry.polishedRodMinLoad.toLocaleString()} lbs\`\n- **Economics**: Daily Net Cash Flow is \`$${telemetry.netDailyMargin.toLocaleString()}/day\` with specific OPEX at \`$${telemetry.specificEnergyCost}/bbl\`.\n- **Health Alert**: ${
        telemetry.rodFloatingDetected
          ? '🚨 High viscous drag is causing rod floating on downstroke.'
          : '✅ Wellbore hydraulics and rod string tension are stable.'
      }`,
    };
  }

  // =========================================================================
  // 2. DYNAMIC "WHAT-IF" & ON-THE-FLY CALCULATIONS
  // =========================================================================
  const numbers = extractNumbers(query);

  // If user asks about changing SPM (e.g. "what if SPM is 8" or "what happens at 3.5 spm")
  if (
    (qLower.includes('what if') || qLower.includes('what happens') || qLower.includes('calculate') || qLower.includes('simulate')) &&
    (qLower.includes('spm') || qLower.includes('speed') || qLower.includes('stroke per min'))
  ) {
    const targetSpm = numbers.length > 0 ? numbers[0] : 8.0;
    const testRates = calculateProductionRates(telemetry.viscosity, { ...srp, spm: targetSpm });
    const testLoads = calculateRodLoadsAndFloatingRisk(telemetry.viscosity, { ...srp, spm: targetSpm });
    const testKw = parseFloat(((testLoads.peakLoadLbs * srp.strokeLength * targetSpm * 0.7457) / (12 * 33000 * 0.88) + 0.9).toFixed(2));
    const deltaOil = (testRates.oilRate - telemetry.oilRate).toFixed(1);

    return {
      category: 'DIAGNOSTIC',
      response: `⚡ **On-the-Fly Simulation at ${targetSpm} SPM**:\n\n- **Oil Production**: \`${testRates.oilRate} m³/day\` (${Number(deltaOil) >= 0 ? '+' : ''}${deltaOil} m³/day vs current)\n- **Peak Polished Rod Load**: \`${testLoads.peakLoadLbs.toLocaleString()} lbs\`\n- **Minimum Downstroke Load**: \`${testLoads.minLoadLbs.toLocaleString()} lbs\`\n- **Motor Electrical Draw**: \`${testKw} kW\`\n- **Rod Floating Diagnosis**: ${
        testLoads.isRodFloating
          ? `🚨 **HIGH RISK (${testLoads.floatingRiskScore}%)** — At ${targetSpm} SPM with ${telemetry.viscosity} cP crude, rod fall velocity is too fast for viscous drag, causing severe downstroke buckling!`
          : `✅ **SAFE TENSION (${testLoads.floatingRiskScore}% risk)** — Rod string descends naturally without compression.`
      }`,
      actionButton: {
        label: `⚡ Apply ${targetSpm} SPM Setpoint`,
        actionType: 'SET_SPM',
        payload: targetSpm,
      },
    };
  }

  // If user asks about temperature / viscosity changes (e.g. "what if temp is 60" or "what if viscosity is 1000")
  if (
    (qLower.includes('what if') || qLower.includes('what happens') || qLower.includes('calculate')) &&
    (qLower.includes('temp') || qLower.includes('temperature') || qLower.includes('degree') || qLower.includes('°c') || qLower.includes('viscos'))
  ) {
    const targetTemp = numbers.length > 0 && numbers[0] < 350 ? numbers[0] : 65;
    const targetVisc = Math.round(calculateViscosity(targetTemp));
    const testRates = calculateProductionRates(targetVisc, srp);
    const testLoads = calculateRodLoadsAndFloatingRisk(targetVisc, srp);

    return {
      category: 'EXPLANATION',
      response: `🌡️ **Thermal Scenario at ${targetTemp}°C Bottom-Hole Temperature**:\n\n- **Calculated Crude Viscosity**: \`${targetVisc.toLocaleString()} cP\` (via Andrade equation)\n- **Projected Oil Rate**: \`${testRates.oilRate} m³/day\`\n- **Downstroke Tension Margin**: \`${testLoads.minLoadLbs.toLocaleString()} lbs\`\n- **Rod Floating Risk Score**: \`${testLoads.floatingRiskScore}%\`\n\n${
        targetVisc > 1500
          ? `⚠️ At ${targetTemp}°C, the crude becomes viscous and thick (${targetVisc} cP). You will need to slow down the SRP to ~3.5–4.0 SPM or inject thermal steam to prevent rod floating.`
          : `✨ At ${targetTemp}°C, thermal thinning allows fluid to flow easily with minimal rod string drag.`
      }`,
    };
  }

  // =========================================================================
  // 3. APPLICATION TABS, CONTROLS & FEATURES
  // =========================================================================
  if (
    qLower.includes('3d') ||
    qLower.includes('twin') ||
    qLower.includes('visualizer') ||
    qLower.includes('schematic') ||
    qLower.includes('strata') ||
    qLower.includes('formation layer')
  ) {
    return {
      category: 'EXPLANATION',
      response: `🖥️ **3D Digital Twin Visualizer Feature Guide**\n\n**What it displays**:\n- **Surface Pumping Unit**: Walking beam rocking in real-time sync with SPM, counterweights rotating with centrifugal physics, horsehead motion, and stuffing box.\n- **Downhole Wellbore**: Fluid column height, dynamic traveling and standing valve seats opening/closing in sync with upstroke/downstroke, and upward oil flow bubbles.\n- **Geological Formations**: Surface Desert Sand $\\rightarrow$ Eocene Clay Seal $\\rightarrow$ Bilara Limestone $\\rightarrow$ Jodhpur Pay Sandstone ($1,100\\text{m}$ depth).\n- **3 Switchable View Modes**:\n  1. **3D Kinematic**: Full mechanical and subsurface schematic.\n  2. **P&ID Synoptic**: Industrial piping and instrumentation diagram with live flowmeters and transmitters.\n  3. **Thermal Isotherms**: Radial heat map from steam core ($295^\\circ\\text{C}$) to cold rock ($47^\\circ\\text{C}$).`,
      actionButton: {
        label: '🖥️ View 3D Digital Twin',
        actionType: 'SWITCH_TAB',
        payload: 'TWIN',
      },
    };
  }

  if (
    qLower.includes('waveform') ||
    qLower.includes('oscilloscope') ||
    qLower.includes('channel') ||
    qLower.includes('50 hz') ||
    qLower.includes('sensor stream')
  ) {
    return {
      category: 'EXPLANATION',
      response: `📈 **Real-Time Waveform Oscilloscope Guide**\n\n**What it is**:\nA high-speed (50 Hz) industrial sensor oscilloscope that plots live wave telemetry with sweep lines and timebase scaling (1X, 2X, Hold/Freeze).\n\n**4 Selectable Channels**:\n1. **Rod Tension Load (lbs)**: Live mechanical load wave showing upstroke peak and downstroke drop.\n2. **Motor Power & Current (kW / Amps)**: Real-time 440V 3-phase electrical draw.\n3. **Downhole & Casing Pressure (bar)**: Subsurface pressure waves during pump strokes.\n4. **Acoustic Fluid Level (meters)**: Echo sounder reflections tracking fluid depth inside the casing annulus.`,
      actionButton: {
        label: '📊 Open Waveform Oscilloscope',
        actionType: 'SWITCH_TAB',
        payload: 'OSCILLO',
      },
    };
  }

  if (
    qLower.includes('dynamometer') ||
    qLower.includes('dyno card') ||
    qLower.includes('laser') ||
    qLower.includes('card view')
  ) {
    return {
      category: 'EXPLANATION',
      response: `🎯 **Real-Time Dynamometer Card Diagnostics**\n\n**How it works**:\n- Plots the **Load (lbs) vs Position (inches)** closed loop for each pump stroke.\n- **Live Laser Tracing**: A glowing tracer cursor sweeps continuously along the card in real-time sync with the pump beam position.\n- **Overlays**:\n  - **Surface Card**: Live measured polished rod load loop.\n  - **Downhole Pump Card**: Calculated bottom-hole plunger load loop.\n  - **Ghost Reference**: Ideal 100% fillage card.\n- **Automated Anomaly Detection**: Classifies *Rod Floating*, *Fluid Pound*, *Gas Interference*, *Valve Leakage*, or *Normal Operation*.`,
      actionButton: {
        label: '🎯 Open Dynamometer Diagnostics',
        actionType: 'SWITCH_TAB',
        payload: 'DYNAMO',
      },
    };
  }

  if (
    qLower.includes('alarm') ||
    qLower.includes('matrix') ||
    qLower.includes('audio') ||
    qLower.includes('sound') ||
    qLower.includes('mute') ||
    qLower.includes('closed loop') ||
    qLower.includes('governor')
  ) {
    return {
      category: 'EXPLANATION',
      response: `🚨 **SCADA Alarm Matrix & Autonomous Governor**\n\n**Key Capabilities**:\n- **IEC-62682 Industrial Alarms**: Live triage for Critical, Warning, and Advisory events with ISO codes (e.g. \`EOR-ROD-FLT-01\`).\n- **Web Audio Alert Synthesizer**: Plays acoustic dual-tone alert chimes for critical SCADA alarms (you can mute/unmute anytime).\n- **Autonomous Closed-Loop AI Governor**: When enabled, the system automatically detects rod floating or viscous drag surges and autonomously dispatches a safe VFD setpoint (e.g. 3.8 SPM) without requiring manual operator intervention!`,
      actionButton: {
        label: '🚨 Open SCADA Alarm Matrix',
        actionType: 'SWITCH_TAB',
        payload: 'ALARMS',
      },
    };
  }

  if (
    qLower.includes('what-if') ||
    qLower.includes('sandbox') ||
    qLower.includes('scenario lab') ||
    qLower.includes('compare')
  ) {
    return {
      category: 'EXPLANATION',
      response: `🧪 **What-If Scenario Laboratory**\n\n**Purpose**:\nAllows petroleum engineers to simulate and contrast historical unintegrated field practices (Scenario A) against the AI Integrated Strategy (Scenario B) over a 60-day CSS cycle.\n\n**What you can tweak**:\n- Steam Injection Volume ($1,000 - 4,500\\text{ m}^3$ CWE)\n- Soak Period Duration ($1 - 12\\text{ days}$)\n- Pump Speed ($2.5 - 8.5\\text{ SPM}$)\n\nInstantly calculates cumulative crude yield, total boiler fuel cost, electric OPEX, and net strategy cash profit!`,
      actionButton: {
        label: '🧪 Open What-If Lab',
        actionType: 'SWITCH_TAB',
        payload: 'SANDBOX',
      },
    };
  }

  if (
    qLower.includes('css') ||
    qLower.includes('steam') ||
    qLower.includes('thermal optimizer') ||
    qLower.includes('soak') ||
    qLower.includes('injection')
  ) {
    return {
      category: 'EXPLANATION',
      response: `🔥 **Cyclic Steam Stimulation (CSS) Thermal Optimizer**\n\n**Physics Model**:\nCSS (also known as "Huff and Puff") consists of 3 cyclical phases:\n1. **Injection Phase (Days 1–3)**: High-pressure superheated steam ($295^\\circ\\text{C}$ at $85\\text{ bar}$) is injected into the Jodhpur Sandstone formation.\n2. **Soak Phase (Days 4–8)**: Well is shut in to allow heat diffusion into the heavy crude matrix.\n3. **Production Phase (Days 9–60)**: Thermal thinning lowers crude viscosity from 3,200 cP down to ~20–50 cP, allowing the Sucker Rod Pump to produce at high rates before gradual thermal cooling occurs.\n\n**Pareto Solver**: Balances Steam-Oil Ratio (SOR) vs Net Cash Margin to find the economic sweet spot.`,
      actionButton: {
        label: '🔥 Open CSS Optimizer',
        actionType: 'SWITCH_TAB',
        payload: 'CSS',
      },
    };
  }

  if (
    qLower.includes('roi') ||
    qLower.includes('economic') ||
    qLower.includes('money') ||
    qLower.includes('profit') ||
    qLower.includes('cost') ||
    qLower.includes('opex') ||
    qLower.includes('revenue') ||
    qLower.includes('export report') ||
    qLower.includes('json')
  ) {
    return {
      category: 'RECOMMENDATION',
      response: `💰 **Economic ROI & OPEX Analytics**\n\n**Financial Calculations (Live)**:\n- **Crude Benchmark**: $72.00 / bbl (${(telemetry.oilRate * 6.28981).toFixed(1)} bbls/day $\\rightarrow$ **$${Math.round(telemetry.oilRate * 6.28981 * 72).toLocaleString()}/day** gross revenue)\n- **Steam Fuel OPEX**: $14.50 / m³ CWE (${css.steamVolume} m³ amortized $\\rightarrow$ **$${Math.round((css.steamVolume * 14.5) / 60).toLocaleString()}/day**)\n- **SRP Electrical OPEX**: $0.12 / kWh (${telemetry.motorPowerKw} kW $\\rightarrow$ **$${Math.round(telemetry.motorPowerKw * 24 * 0.12).toLocaleString()}/day**)\n- **Net Profit**: **$${telemetry.netDailyMargin.toLocaleString()} / day**\n- **Specific Energy Cost**: **$${telemetry.specificEnergyCost} / bbl**\n\nYou can click **Export Executive Report (JSON)** on the ROI tab to download an auditable financial summary!`,
      actionButton: {
        label: '💰 Open Economic ROI Dashboard',
        actionType: 'SWITCH_TAB',
        payload: 'ECONOMIC',
      },
    };
  }

  if (
    qLower.includes('data center') ||
    qLower.includes('dataset') ||
    qLower.includes('csv') ||
    qLower.includes('download') ||
    qLower.includes('raw data')
  ) {
    return {
      category: 'EXPLANATION',
      response: `📊 **Data Center & Empirical Datasets Guide**\n\n**Available Field Datasets**:\n1. \`Baghewala_Reservoir_Core_Data.csv\` — Porosity (26%), Permeability (1,800 mD), Depth (1,100m), Initial Pressure (35 bar).\n2. \`Baghewala_Viscosity_Temp_Matrix.csv\` — Viscosity vs Temperature calibration points from 47°C (3,200 cP) to 295°C (14 cP).\n3. \`Well_BW07_CSS_Cycle3_Telemetry.csv\` — 60-day historical time-series data for BHT, SPM, loads, and SOR.\n4. \`Baghewala_Dynamometer_Surface_Cards.csv\` — Raw high-frequency load-displacement curves for 5 anomaly states.\n\nYou can preview and download all CSV files directly from the **Data Center** tab!`,
      actionButton: {
        label: '📊 Open Data Center',
        actionType: 'SWITCH_TAB',
        payload: 'DATASET',
      },
    };
  }

  if (
    qLower.includes('well') ||
    qLower.includes('bw-07') ||
    qLower.includes('bw-08') ||
    qLower.includes('bw-12') ||
    qLower.includes('bw-19') ||
    qLower.includes('jod-04') ||
    qLower.includes('multi well') ||
    qLower.includes('switch well')
  ) {
    return {
      category: 'EXPLANATION',
      response: `🛢️ **Baghewala Field Multi-Well Matrix**:\n\n- **Well #BW-07 (Main Digital Twin)**: Cycle 3 Production (Day 18), active viscous drag anomaly, 74% health score.\n- **Well #BW-08 (Post-Soak Peak)**: Cycle 2 Peak ($240^\\circ\\text{C}$ BHT), highest productivity ($24\\text{ m}^3/\\text{day}$), 96% health score.\n- **Well #BW-12 (Cold Production Baseline)**: Cold baseline, severe viscous drag without steam, 42% health score.\n- **Well #BW-19 (CSS High-Pressure Injection)**: Active steam injection at 92 bar, SRP standby, 89% health score.\n- **Well #JOD-04 (Boundary Monitoring)**: Observation well tracking formation boundary pressures, 91% health score.\n\nUse the **ACTIVE WELL** dropdown in the top navbar to switch between them!`,
    };
  }

  // =========================================================================
  // 4. PETROLEUM ENGINEERING TERMS & ANOMALY DEFINITIONS
  // =========================================================================
  if (
    qLower.includes('rod floating') ||
    qLower.includes('floating') ||
    qLower.includes('viscous drag') ||
    qLower.includes('buckl')
  ) {
    return {
      category: 'DIAGNOSTIC',
      response: `🚨 **What is Rod Floating?**\n\n**Mechanism**:\nIn ultra-heavy crude wells (like Baghewala 17.5° API), as the downhole steam cools below ~120°C, viscosity rises sharply to >1,600 cP. During the pump **downstroke**, the sucker rod string must fall by gravity. However, the thick oil exerts an upward hydrodynamic drag force ($F_{\\text{drag}} \\propto \\mu^{0.65} \\cdot v_{\\text{rod}}$).\n\nWhen drag exceeds rod weight, rod string tension drops to zero or goes into compression. This causes the rods to **buckle, whip against the tubing wall, and float**, leading to rod parts or tubing wear.\n\n**Mitigation**:\n1. **Slow down SPM** (e.g. set 3.8 SPM) to reduce downstroke descent velocity.\n2. **Re-heat wellbore** with cyclic thermal steam stimulation.`,
      actionButton: {
        label: '⚡ Dispatch 3.8 SPM Setpoint',
        actionType: 'SET_SPM',
        payload: 3.8,
      },
    };
  }

  if (
    qLower.includes('fluid pound') ||
    qLower.includes('pounding') ||
    qLower.includes('incomplete fillage')
  ) {
    return {
      category: 'EXPLANATION',
      response: `💥 **What is Fluid Pound?**\n\n**Mechanism**:\nFluid pound occurs when the pump barrel does not completely fill with liquid on the upstroke (due to low reservoir inflow or pumping faster than the reservoir can deliver). On the subsequent downstroke, the traveling valve stays closed in the vapor pocket until the plunger slams into the fluid surface, creating a violent mechanical shockwave that damages the gearbox and rod string.\n\n**Identification**:\nOn the dynamometer card, fluid pound shows a sharp vertical drop in load midway through the downstroke.\n\n**Mitigation**:\nLower pump speed (SPM) to match reservoir inflow capacity.`,
      actionButton: {
        label: '🎯 View Dynamometer Anomaly',
        actionType: 'SWITCH_TAB',
        payload: 'DYNAMO',
      },
    };
  }

  if (
    qLower.includes('andrade') ||
    qLower.includes('viscosity model') ||
    qLower.includes('formula') ||
    qLower.includes('equation')
  ) {
    return {
      category: 'EXPLANATION',
      response: `📐 **Andrade Viscosity Model for Baghewala Crude**\n\nThe relationship between temperature and heavy crude dynamic viscosity is modeled using the Andrade exponential equation:\n\n$$\\mu(T) = \\mu_{\\text{ref}} \\cdot \\exp\\left(B \\cdot \\left(\\frac{1}{T} - \\frac{1}{T_{\\text{ref}}}\\right)\\right)$$\n\n**Calibrated Parameters for Jodhpur Sandstone**:\n- Reference Temperature ($T_{\\text{ref}}$): $47^\\circ\\text{C}$ ($320.15\\text{ K}$)\n- Reference Viscosity ($\\mu_{\\text{ref}}$): $3,200\\text{ cP}$\n- Empirical Activation Constant ($B$): $4,650\\text{ K}$\n\nThis model shows that heating the oil from 47°C to 200°C reduces viscosity by **over 98%** (from 3,200 cP down to ~35 cP)!`,
    };
  }

  if (
    qLower.includes('sor') ||
    qLower.includes('steam oil ratio') ||
    qLower.includes('steam-oil')
  ) {
    return {
      category: 'EXPLANATION',
      response: `🔥 **Steam-Oil Ratio (SOR) Explained**\n\n**Definition**:\nSOR is the volume of steam injected (Cold Water Equivalent in $\\text{m}^3$) divided by the volume of crude oil produced ($\\text{m}^3$):\n\n$$\\text{SOR} = \\frac{\\text{Cumulative Steam Injected } (\\text{m}^3)}{\\text{Cumulative Oil Produced } (\\text{m}^3)}$$\n\n- **Industry Benchmark**: An SOR below **3.0** is considered highly economic.\n- **Current Live Status**: Well #BW-07 SOR is **${telemetry.steamOilRatio} m³/m³**.\n- Lower SOR means less boiler fuel burned per barrel of oil recovered!`,
    };
  }

  if (
    qLower.includes('api') ||
    qLower.includes('density') ||
    qLower.includes('heavy oil') ||
    qLower.includes('gravity')
  ) {
    return {
      category: 'EXPLANATION',
      response: `🛢️ **API Gravity & Baghewala Crude**\n\n**Definition**:\nAPI gravity measures how heavy or light a petroleum liquid is compared to water:\n\n$$\\text{API} = \\frac{141.5}{\\text{Specific Gravity at } 60^\\circ\\text{F}} - 131.5$$\n\n- **Baghewala Crude**: **17.5° API** (Heavy Crude, specific gravity $\\approx 0.95\\text{ g/cm}^3$).\n- **Characteristics**: High asphaltene content (14.5%), high initial viscosity (3,200 cP at 47°C reservoir temperature), and low solution gas-oil ratio. Requires thermal EOR (steam) to mobilize.`,
    };
  }

  if (
    qLower.includes('spm') ||
    qLower.includes('speed') ||
    qLower.includes('stroke') ||
    qLower.includes('sucker rod') ||
    qLower.includes('srp')
  ) {
    return {
      category: 'EXPLANATION',
      response: `⚙️ **Sucker Rod Pump (SRP) Parameters**:\n\n- **SPM (Strokes Per Minute)**: Pumping unit cycling speed. Current setting is **${srp.spm} SPM**.\n- **Stroke Length**: Distance the polished rod travels per cycle. Current is **${srp.strokeLength} inches**.\n- **Plunger Diameter**: Size of downhole pump barrel (**${srp.plungerDiameter} inches**).\n- **Pump Depth**: Downhole setting depth (**${srp.pumpDepth} meters**).\n- **Theoretical Displacement**: Calculated as $\\text{Displacement} = \\frac{\\pi}{4} d^2 \\cdot S \\cdot \\text{SPM} \\cdot 1440$.`,
    };
  }

  // =========================================================================
  // 5. GENERAL & OPEN-ENDED NATURAL CONVERSATIONAL RESPONSE
  // =========================================================================
  // Dynamic semantic synthesis based on keywords in query:
  const words = qLower.split(/\s+/).filter((w) => w.length > 2);
  const relevantTopics: string[] = [];

  if (words.some((w) => ['pressure', 'psi', 'bar', 'casing', 'tubing'].includes(w))) {
    relevantTopics.push(`- **Pressure Telemetry**: Tubing head pressure is **${telemetry.tubingHeadPressureBar} bar**, casing pressure is **${telemetry.casingPressureBar} bar**, and downhole gauge reads **${telemetry.downholePressureBar} bar**.`);
  }
  if (words.some((w) => ['motor', 'power', 'electric', 'watt', 'kw', 'amps', 'vfd'].includes(w))) {
    relevantTopics.push(`- **Electrical Power**: 440V VFD motor drawing **${telemetry.motorPowerKw} kW** (${telemetry.motorCurrentAmps} Amps).`);
  }
  if (words.some((w) => ['water', 'cut', 'condensate', 'fluid'].includes(w))) {
    relevantTopics.push(`- **Fluid Production**: Water cut is currently **${telemetry.waterCut}%** (${telemetry.waterRate} m³/day water vs ${telemetry.oilRate} m³/day oil).`);
  }
  if (words.some((w) => ['load', 'weight', 'tension', 'pprl', 'mprl', 'lbs'].includes(w))) {
    relevantTopics.push(`- **Mechanical Loads**: Peak Polished Rod Load is **${telemetry.polishedRodPeakLoad.toLocaleString()} lbs** and Min Load is **${telemetry.polishedRodMinLoad.toLocaleString()} lbs**.`);
  }

  let extraContext = '';
  if (relevantTopics.length > 0) {
    extraContext = `\n\n**Relevant Live Sensor Readings**:\n${relevantTopics.join('\n')}`;
  }

  return {
    category: 'GENERAL',
    response: `💬 **Operational Analysis for:** *"${query}"*\n\nIn this digital twin for Baghewala Well #BW-07 (Jodhpur Sandstone heavy crude):\n\n1. **Thermal & Fluid State**: Downhole temperature is **${telemetry.bottomHoleTemp}°C**, giving an active crude viscosity of **${telemetry.viscosity} cP** and an oil flow rate of **${telemetry.oilRate} m³/day**.\n2. **Pumping Dynamics**: Operating at **${srp.spm} SPM** with a stroke length of **${srp.strokeLength} inches**. Mechanical risk score is **${telemetry.rodFloatingRiskScore}%**.\n3. **Recommendation**: ${
      telemetry.rodFloatingDetected
        ? '⚠️ Keep SPM throttled below 4.0 SPM or use the autonomous closed-loop controller to prevent rod floating.'
        : '✅ Production parameters are well-balanced within the optimal economic Pareto frontier.'
    }${extraContext}\n\nYou can ask me for specific calculations, diagnostics on any tab, or definitions of any oilfield parameter!`,
  };
}
