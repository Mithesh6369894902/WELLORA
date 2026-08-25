import type { RealTimeTelemetry, CSSParameters, SRPParameters, ReservoirParameters } from '../types';
import { calculateViscosity, calculateProductionRates, calculateRodLoadsAndFloatingRisk } from './physicsEngine';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: number;
  category?: 'DIAGNOSTIC' | 'RECOMMENDATION' | 'EXPLANATION' | 'GENERAL';
}

const AI_CHAT_STORAGE_KEY = 'baghewala_ai_chat_history_v1';

export function loadSavedChatHistory(): ChatMessage[] {
  try {
    const raw = localStorage.getItem(AI_CHAT_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn('Failed to load chat history:', err);
    return [];
  }
}

export function saveChatHistory(messages: ChatMessage[]): void {
  try {
    localStorage.setItem(AI_CHAT_STORAGE_KEY, JSON.stringify(messages.slice(-50)));
  } catch (err) {
    console.warn('Failed to save chat history:', err);
  }
}

/**
 * Friendly, Descriptive AI Chatbox Generator.
 * Delivers clear, plain-English explanations without dense technical formulas.
 */
export function generateAiAdvice(
  userQuery: string,
  telemetry: RealTimeTelemetry,
  css: CSSParameters,
  srp: SRPParameters,
  res: ReservoirParameters
): { response: string; category: ChatMessage['category'] } {
  const query = userQuery.trim();
  const qLower = query.toLowerCase();
  const fieldName = res.formationName;

  // --- 1. GREETINGS & CONVERSATIONAL HELP ---
  if (
    qLower === 'hi' ||
    qLower === 'hello' ||
    qLower === 'hey' ||
    qLower.startsWith('hi ') ||
    qLower.startsWith('hello ') ||
    qLower.startsWith('hey ')
  ) {
    return {
      category: 'GENERAL',
      response: `👋 **Hello! Welcome to the WELLORA AI Assistant.**\n\nI am your friendly AI guide for the Baghewala Heavy Oil Field project. I'm here to explain how the well works, describe any feature in this application, or answer any questions you have in simple, plain language!\n\nHere are a few things you can ask me:\n- 🧪 *"How does the What-If Lab work?"*\n- ⚡ *"What is Rod Floating and how do we fix it?"*\n- 🌡️ *"Why do we inject steam into the ground?"*\n- 📊 *"What is SPM or Viscosity?"*\n- 💰 *"How do we increase daily profit margin?"*\n\nFeel free to type any question below!`,
    };
  }

  if (
    qLower.includes('who are you') ||
    qLower.includes('what are you') ||
    qLower.includes('who created') ||
    qLower.includes('what can you do') ||
    qLower.includes('help')
  ) {
    return {
      category: 'GENERAL',
      response: `🤖 **About Your AI Assistant**\n\nI am an interactive AI chat assistant designed to help engineers and users understand the Baghewala Oil Field Digital Twin application.\n\n**What I Can Do For You**:\n1. **Describe Application Features**: I can walk you through the **3D Digital Twin**, **What-If Lab**, **Dynamometer View**, **Economic ROI**, and **Data Center**.\n2. **Explain Oilfield Terms Simply**: I explain terms like **SPM**, **BHT**, **Viscosity**, **SOR**, and **API Gravity** without complicated mathematical code.\n3. **Provide Well Recommendations**: I look at live conditions (${telemetry.bottomHoleTemp}°C temperature, ${telemetry.viscosity} cP thickness, ${telemetry.spm} SPM pump speed) and share easy-to-follow suggestions.`,
    };
  }

  if (qLower.includes('thank') || qLower === 'thanks' || qLower.includes('good job') || qLower.includes('awesome')) {
    return {
      category: 'GENERAL',
      response: `😊 **You are very welcome!** I'm happy to help. Let me know whenever you want to explore more features or ask about the well!`,
    };
  }

  // --- 2. APPLICATION FEATURE GUIDES (Simple & Descriptive) ---
  if (qLower.includes('what-if') || qLower.includes('sandbox') || qLower.includes('scenario')) {
    return {
      category: 'EXPLANATION',
      response: `🧪 **What-If Scenario Lab Guide**\n\n**What it is**:\nThink of the What-If Lab as an interactive testing ground where you can try out different ideas without risking real equipment.\n\n**How to use it**:\n1. Click the **What-If Lab** tab at the top of your screen.\n2. Slide the controls to change **Steam Volume**, **Soak Days**, or **Pump Speed**.\n3. The app automatically compares your new setup against historical practices and shows you how much extra oil and profit you will generate!`,
    };
  }

  if (qLower.includes('3d') || qLower.includes('visualizer') || qLower.includes('twin visualizer')) {
    return {
      category: 'EXPLANATION',
      response: `🖥️ **3D Digital Twin Visualizer Guide**\n\n**What it is**:\nThis view gives you a live 3D visual model of the pumping unit on the surface and the deep well underground.\n\n**What to look for**:\n- Watch the surface pump beam move up and down in sync with live speed.\n- See the underground heat colors: bright orange/yellow near the steam core downhole, fading to cool blue further out into the rock formation.\n- Check live gauges for oil output and downhole temperature!`,
    };
  }

  if (qLower.includes('dynamometer view') || qLower.includes('dynamometer card view') || qLower.includes('dynamometer tab') || qLower.includes('card view')) {
    return {
      category: 'EXPLANATION',
      response: `📈 **Dynamometer & SRP View Guide**\n\n**What it is**:\nA Dynamometer card is like an **ECG heart monitor for the oil pump**. It draws a loop graph comparing how heavy the load is versus how far the pump rod moves.\n\n**Why it matters**:\n- A smooth, full loop shape means the pump is operating perfectly.\n- An odd, squished loop alerts you if the crude oil is too thick or if gas is trapped in the pump cylinder!`,
    };
  }

  if (qLower.includes('css tab') || qLower.includes('css thermal optimizer') || qLower.includes('thermal panel')) {
    return {
      category: 'EXPLANATION',
      response: `🔥 **CSS Thermal Optimizer Guide**\n\n**What it is**:\nThis screen helps you manage the **steam injection strategy** for the well.\n\n**How it works**:\n- Injecting steam heats up the cold, thick oil underground so it can flow toward the pump.\n- This panel shows a 60-day temperature cooling graph and helps you pick the perfect amount of steam so you get maximum oil without wasting boiler fuel!`,
    };
  }

  if (qLower.includes('economic roi') || qLower.includes('economic tab') || qLower.includes('economic dashboard')) {
    return {
      category: 'EXPLANATION',
      response: `💰 **Economic ROI Dashboard Guide**\n\n**What it is**:\nThis dashboard tracks the financial performance of the well in dollars and cents.\n\n**Key Numbers Displayed**:\n- **Gross Daily Revenue**: Total money earned from selling crude oil ($72 per barrel baseline).\n- **Power & Fuel Expenses**: Costs spent running the electric motor and steam boiler.\n- **Net Daily Cash Margin**: Your clean daily profit after paying operating expenses!`,
    };
  }

  if (qLower.includes('data center') || qLower.includes('dataset') || qLower.includes('csv') || qLower.includes('download')) {
    return {
      category: 'EXPLANATION',
      response: `📊 **Data Center & CSV Downloads Guide**\n\n**What it is**:\nThe Data Center holds the actual real-world field datasets and core measurements collected from the Baghewala oil field in Rajasthan.\n\n**What you can do**:\n- Click on any dataset to preview core rock measurements, temperature logs, or pump load readings.\n- Click the **Download CSV** buttons to download raw files directly to your computer!`,
    };
  }

  if (qLower.includes('red alert') || qLower.includes('auto-mitigate') || qLower.includes('alert banner')) {
    return {
      category: 'EXPLANATION',
      response: `🚨 **Rod Floating Red Alert Banner Guide**\n\n**What it means**:\nWhen the red alert appears, it means the crude oil underground has cooled down and become thick. Because the oil is sticky, the pump rod is having trouble falling back down smoothly on its downstroke.\n\n**How to fix it instantly**:\nClick the red **Auto-Mitigate (Set 3.8 SPM)** button! The app will automatically slow down the pump speed to 3.8 strokes per minute, giving the rod enough time to descend safely without bending or buckling!`,
    };
  }

  // --- 3. OILFIELD TERMS EXPLAINED SIMPLY ---
  if (qLower === 'what is spm' || qLower.includes('spm meaning') || qLower.includes('define spm') || qLower === 'spm') {
    return {
      category: 'EXPLANATION',
      response: `⏱️ **What is SPM? (Strokes Per Minute)**\n\n**Simple Explanation**:\nSPM is the **speed of the oil pump**. It measures how many times the surface pump beam moves up and down in one minute.\n\n- **Fast Speed (e.g. 7-8 SPM)**: Pumps more volume, but if the oil is thick, it can cause the rod to stick.\n- **Recommended Speed**: Right now, **${telemetry.spm} SPM** is set for smooth, steady production.`,
    };
  }

  if (qLower === 'what is bht' || qLower.includes('bht meaning') || qLower.includes('define bht') || qLower === 'bht') {
    return {
      category: 'EXPLANATION',
      response: `🌡️ **What is BHT? (Bottom-Hole Temperature)**\n\n**Simple Explanation**:\nBHT is the temperature deep down at the bottom of the well where the oil is stored in the rock.\n\n- **Natural Rock Temp**: 47°C (cold and thick crude).\n- **After Steam Injection**: BHT rises up to 295°C (super hot and thin oil).\n- **Current BHT**: Right now downhole temperature is **${telemetry.bottomHoleTemp}°C**.`,
    };
  }

  if (qLower === 'what is sor' || qLower.includes('sor meaning') || qLower.includes('define sor') || qLower === 'sor') {
    return {
      category: 'EXPLANATION',
      response: `🔥 **What is SOR? (Steam-Oil Ratio)**\n\n**Simple Explanation**:\nSOR tells you **how efficient your steam heating is**. It shows how many barrels of steam you had to inject to produce 1 barrel of oil.\n\n- **Lower SOR is Better**: An SOR below 3.5 means your steam is doing a great job mobilizing oil efficiently!\n- **Current SOR**: Currently **${telemetry.steamOilRatio}**.`,
    };
  }

  if (qLower === 'what is css' || qLower.includes('css meaning') || qLower.includes('define css') || qLower === 'css') {
    return {
      category: 'EXPLANATION',
      response: `♨️ **What is CSS? (Cyclic Steam Stimulation)**\n\n**Simple Explanation**:\nCSS is a 3-step thermal heating process used to extract heavy crude oil:\n1. **Inject**: Pump hot steam deep into the oil rock.\n2. **Soak**: Shut the well for a few days so the heat melts the thick oil.\n3. **Produce**: Open the pump and suck out the warm, thin oil!`,
    };
  }

  if (qLower === 'what is srp' || qLower.includes('srp meaning') || qLower.includes('define srp') || qLower === 'srp') {
    return {
      category: 'EXPLANATION',
      response: `🏗️ **What is SRP? (Sucker Rod Pump)**\n\n**Simple Explanation**:\nSRP is the classic "nodding donkey" oil pump beam you see on surface oilfields. It pulls a long steel rod up and down to bring oil from 1,100 meters underground up to the surface tanks.`,
    };
  }

  if (qLower.includes('api gravity') || qLower === 'api' || qLower === 'what is api') {
    return {
      category: 'EXPLANATION',
      response: `🛢️ **What is API Gravity?**\n\n**Simple Explanation**:\nAPI gravity measures how heavy or light an oil is:\n- **High API (e.g. 35-40° API)**: Light crude oil that flows easily like water or kerosene.\n- **Baghewala Crude (17.5° API)**: Heavy crude oil that is thick and sticky, requiring steam heat to flow.`,
    };
  }

  if (qLower.includes('viscosity') || qLower === 'cp' || qLower === 'what is cp') {
    return {
      category: 'EXPLANATION',
      response: `💧 **What is Viscosity?**\n\n**Simple Explanation**:\nViscosity is a measure of **how thick or sticky a fluid is**:\n- Water has a viscosity of 1 cP (thin).\n- Cold Baghewala crude has a viscosity of **3,200 cP** (thick like cold molasses).\n- When heated by steam, viscosity drops to **18 cP** so the oil flows freely! Current viscosity is **${telemetry.viscosity} cP**.`,
    };
  }

  // --- 4. CUSTOM PARAMETER COMPUTATION (If user inputs numbers) ---
  const spmMatch = qLower.match(/(?:spm|speed)[^\d]*(\d+(?:\.\d+)?)/);
  const steamMatch = qLower.match(/(?:steam|volume)[^\d]*(\d{3,5})/);
  const tempMatch = qLower.match(/(?:temp|bht|temperature)[^\d]*(\d{2,3})/);

  if (spmMatch || steamMatch || tempMatch) {
    let customSpm = srp.spm;
    let customSteam = css.steamVolume;
    let customTemp = telemetry.bottomHoleTemp;

    if (spmMatch) customSpm = parseFloat(spmMatch[1]);
    if (steamMatch) customSteam = parseFloat(steamMatch[1]);
    if (tempMatch) customTemp = parseFloat(tempMatch[1]);

    const customViscosity = calculateViscosity(customTemp);
    const customRates = calculateProductionRates(customViscosity, { ...srp, spm: customSpm });
    const customLoads = calculateRodLoadsAndFloatingRisk(customViscosity, { ...srp, spm: customSpm });

    const isCustomRodFloating = customLoads.isRodFloating;
    const grossRev = customRates.oilRate * 6.28981 * 72;
    const powerExp = 0.8 * customSpm * 24 * 0.12;
    const steamExp = (customSteam * 14.5) / 60;
    const estMargin = Math.round(grossRev - powerExp - steamExp);

    return {
      category: 'RECOMMENDATION',
      response: `⚙️ **Custom Scenario Results**\n\nHere is what happens if you set:\n- **Pump Speed**: ${customSpm} SPM\n- **Temperature**: ${customTemp}°C\n- **Steam Volume**: ${customSteam} m³\n\n**Calculated Output**:\n- **Oil Output**: **${customRates.oilRate} m³/day** (${Math.round(customRates.oilRate * 6.28981)} barrels/day)\n- **Oil Thickness**: **${customViscosity} cP**\n- **Pump Load**: Peak load of ${customLoads.peakLoadLbs.toLocaleString()} lbs\n- **Rod Operation Status**: ${isCustomRodFloating ? '⚠️ Sticky oil causing rod floating! Lower speed.' : '✅ Smooth and safe pump operation!'}\n- **Daily Net Margin**: **$${estMargin.toLocaleString()} / day profit**`,
    };
  }

  // --- 5. ROD FLOATING & WELL TROUBLESHOOTING ---
  if (qLower.includes('float') || qLower.includes('drag') || qLower.includes('stuck') || qLower.includes('downstroke')) {
    if (telemetry.rodFloatingDetected) {
      return {
        category: 'DIAGNOSTIC',
        response: `🚨 **Rod Floating Diagnosis**\n\n**What is happening**:\nThe crude oil underground is currently thick (${telemetry.viscosity} cP). Because the pump speed is set to ${telemetry.spm} SPM, the heavy steel rod doesn't have enough time to sink back down smoothly through the sticky oil.\n\n**Easy Solution**:\n1. Click the red **Auto-Mitigate (Set 3.8 SPM)** button at the top of the screen.\n2. Or lower your pump speed slider to 3.8 SPM to keep the pump running smoothly without rod damage!`,
      };
    } else {
      return {
        category: 'RECOMMENDATION',
        response: `✅ **Rod Operation Status: Normal**\n\nYour pump is running smoothly at **${srp.spm} SPM**. The oil is warm enough (${telemetry.bottomHoleTemp}°C) that the steel rod is sinking down smoothly without any sticking or rod floating risk!`,
      };
    }
  }

  if (qLower.includes('steam') || qLower.includes('css') || qLower.includes('thermal') || qLower.includes('sor')) {
    return {
      category: 'RECOMMENDATION',
      response: `🔥 **Steam Strategy Recommendation**\n\nInjecting **2,400 to 2,500 m³** of steam with a **4 to 5 day soak period** gives you the best balance: it melts the thick crude effectively while keeping your boiler fuel expenses low!`,
    };
  }

  if (qLower.includes('profit') || qLower.includes('margin') || qLower.includes('roi') || qLower.includes('money') || qLower.includes('cost')) {
    return {
      category: 'RECOMMENDATION',
      response: `💰 **Profit & Income Overview**\n\n- **Current Daily Net Margin**: **$${telemetry.netDailyMargin.toLocaleString()} per day**\n- **Daily Oil Output**: **${telemetry.oilRate} m³/day** (${Math.round(telemetry.oilRate * 6.28981)} barrels/day)\n\n**Tip**: You can increase your net margin by trimming unnecessary steam volume in the **What-If Lab**!`,
    };
  }

  if (qLower.includes('andrade') || qLower.includes('model') || qLower.includes('equation')) {
    return {
      category: 'EXPLANATION',
      response: `📊 **Understanding the Viscosity Curve**\n\n**Plain Description**:\nThis model describes how oil thins out when heated:\n- At natural ground temp (47°C), oil is thick like honey (3,200 cP).\n- At steam temp (260°C), oil becomes thin like water (18 cP).\n- Right now downhole temp is **${telemetry.bottomHoleTemp}°C**, making the oil **${telemetry.viscosity} cP** thick.`,
    };
  }

  // --- UNIVERSAL DESCRIPTIVE ASSISTANT RESPONSE ---
  return {
    category: 'GENERAL',
    response: `🤖 **WELLORA AI Assistant (${fieldName})**\n\nHere is a simple breakdown for **"${query}"**:\n\n**Live Well Conditions**:\n- **Bottom-Hole Temp**: ${telemetry.bottomHoleTemp}°C\n- **Oil Thickness**: ${telemetry.viscosity} cP\n- **Pump Speed**: ${telemetry.spm} SPM\n- **Daily Oil Output**: ${telemetry.oilRate} m³/day (${Math.round(telemetry.oilRate * 6.28981)} barrels/day)\n\n**What you can do**:\n- Click the **What-If Lab** tab to test new ideas.\n- Click **Data Center** to download real field data.\n- Ask me questions like *"What is SPM?"*, *"What is BHT?"*, or *"How do I fix Rod Floating?"*`,
  };
}
