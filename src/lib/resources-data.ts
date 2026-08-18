export interface Article {
  slug: string;
  title: string;
  summary: string;
  category: "HVAC" | "Electrical" | "Plumbing" | "Fire Fighting" | "Revit Sync" | "Case Studies";
  readTime: string;
  date: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  featured?: boolean;
  image: string;
  tags: string[];
  content: string;
}

export const ARTICLES: Article[] = [
  {
    slug: "ashrae-cooling-load-calculation-guide",
    title: "ASHRAE 62.1 & 90.1 Ventilation & Cooling Load Calculations: A Complete Engineer's Guide",
    summary: "Master sensible vs. latent cooling load calculations, fresh air intake rates, and solar heat gain coefficients mapped directly to ASHRAE handbook standards.",
    category: "HVAC",
    readTime: "8 min read",
    date: "August 14, 2026",
    featured: true,
    author: {
      name: "Salil Kulkarni",
      role: "CEO & Founder, TARV",
      avatar: "/salil-kulkarni.jpg",
    },
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80",
    tags: ["ASHRAE 62.1", "Cooling Load", "HVAC Design", "Fresh Air CFM"],
    content: `
# ASHRAE 62.1 & 90.1 Ventilation & Cooling Load Calculations: A Complete Engineer's Guide

Performing accurate cooling load calculations is the cornerstone of mechanical HVAC engineering. Underestimating peak thermal loads leads to inadequate indoor thermal comfort, while over-sizing chillers results in excessive capital expenditure, poor part-load efficiency, and compressor short-cycling.

This guide breaks down the essential mathematical principles governing **sensible heat gain**, **latent heat gain**, and **ASHRAE 62.1 ventilation rate procedures (VRP)**.

---

## 1. Fundamentals of Thermal Heat Gain

Space cooling load is divided into two main thermal components:

### A. Sensible Cooling Load ($Q_s$)
Sensible load causes a direct temperature rise in space air without altering moisture content. It is derived from building envelope conduction, internal lighting, equipment, and occupancy sensible heat:

$$Q_s = 1.08 \\times \\text{CFM} \\times (T_{\\text{outdoor}} - T_{\\text{indoor}})$$

Where:
- $Q_s$ = Sensible Heat Gain (BTU/hr)
- $\\text{CFM}$ = Supply Airflow Rate (Cubic Feet per Minute)
- $T_{\\text{outdoor}}$ = Outdoor Design Dry-Bulb Temperature (°F)
- $T_{\\text{indoor}}$ = Indoor Target Dry-Bulb Temperature (°F)

### B. Latent Cooling Load ($Q_l$)
Latent load accounts for moisture removal (dehumidification) from occupant respiration, outdoor ventilation air, and process vapor:

$$Q_l = 4840 \\times \\text{CFM} \\times (W_{\\text{outdoor}} - W_{\\text{indoor}})$$

Where:
- $Q_l$ = Latent Heat Gain (BTU/hr)
- $W$ = Humidity Ratio (lbs of water vapor per lb of dry air)

---

## 2. ASHRAE 62.1 Outdoor Air Ventilation Rate Procedure

To maintain indoor air quality (IAQ), outdoor intake airflow ($V_{ot}$) must satisfy both occupant breathing rates ($R_p$) and floor area contaminant dilution rates ($R_a$):

$$V_{bz} = (R_p \\times P_z) + (R_a \\times A_z)$$

Where:
- $V_{bz}$ = Breathing Zone Outdoor Airflow (CFM)
- $R_p$ = Outdoor Airflow Rate per Person (CFM/person, from ASHRAE Table 6.2.2.1)
- $P_z$ = Design Zone Population
- $R_a$ = Outdoor Airflow Rate per Unit Area (CFM/ft²)
- $A_z$ = Net Occupied Zone Area (ft²)

---

## 3. How TARV Automates ASHRAE Load Calculations

In traditional manual workflows, engineers spend hours cross-referencing psychrometric charts, solar radiation tables, and wall U-values. 

With **TARV MEP Calculator**:
1. Enter space geometry, occupancy density, and regional design dry-bulb/wet-bulb temperatures.
2. TARV automatically pulls verified ASHRAE climate constants.
3. Instantaneous calculation outputs yield total sensible, latent, and total tons of refrigeration ($TR$) in **< 0.01 seconds**.
4. Parameter values push directly to your **Revit BIM model** room elements with 1-click sync.
    `,
  },
  {
    slug: "nec-2023-voltage-drop-cable-sizing",
    title: "NEC 2023 Voltage Drop & Cable Sizing: Standard Formulas vs. AI Automation",
    summary: "A step-by-step breakdown of NEC Article 310 ampacity adjustment factors, voltage drop equations, and continuous load sizing rules for electrical engineers.",
    category: "Electrical",
    readTime: "7 min read",
    date: "August 11, 2026",
    featured: false,
    author: {
      name: "Salil Kulkarni",
      role: "CEO & Founder, TARV",
      avatar: "/salil-kulkarni.jpg",
    },
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    tags: ["NEC 2023", "Voltage Drop", "Cable Sizing", "Electrical Load"],
    content: `
# NEC 2023 Voltage Drop & Cable Sizing: Standard Formulas vs. AI Automation

Designing safe, code-compliant electrical distribution networks requires precise conductor sizing based on continuous load current, ambient temperature derating, raceway fill adjustments, and maximum permissible voltage drop limits.

According to National Electrical Code (NEC) Informational Notes 210.19(A) and 215.2(A), the maximum recommended voltage drop is:
- **3% max** on branch circuits
- **5% max** combined across feeder and branch circuits to the farthest outlet.

---

## 1. Single-Phase & Three-Phase Voltage Drop Formulas

### Three-Phase Voltage Drop ($V_{drop}$)
$$V_{drop} = \\frac{\\sqrt{3} \\times I \\times L \\times R}{1000}$$

Where:
- $I$ = Load Current (Amperes)
- $L$ = One-way Length of Conductor (Feet or Meters)
- $R$ = Conductor Resistance per 1,000 ft (from NEC Chapter 9, Table 8)

Percentage Voltage Drop ($\\%VD$):
$$\\%VD = \\left( \\frac{V_{drop}}{V_{\\text{phase-to-phase}}} \\right) \\times 100$$

---

## 2. NEC Cable Ampacity Derating Factors

Conductor ampacity must be adjusted using NEC Table 310.15(B1) for elevated ambient temperatures and Table 310.15(C1) for more than 3 current-carrying conductors in a single raceway:

$$I_{\\text{allowable}} = I_{\\text{table}} \\times K_{\\text{temp}} \\times K_{\\text{fill}}$$

---

## 3. Automating Cable Schedules with TARV

Rather than manually consulting NEC resistance tables and typing values into static Excel spreadsheets, **TARV Electrical Calculator**:
- Automatically applies NEC 2023 ampacity tables and thermal derating factors.
- Calculates 3-phase short circuit levels and voltage drop across complex feeder runs.
- Generates 1-click **Distribution Board (DB) schedules** ready for submittal.
    `,
  },
  {
    slug: "300-hours-vs-30-minutes-power-of-tarv",
    title: "Case Study — 300 Hours vs. 30 Minutes: The Power of TARV BIM Automation",
    summary: "How a leading Middle East MEP consultancy reduced complex project calculation times by 90% while achieving 100% Revit BIM parameter synchronization.",
    category: "Case Studies",
    readTime: "6 min read",
    date: "August 05, 2026",
    featured: false,
    author: {
      name: "Salil Kulkarni",
      role: "CEO & Founder, TARV",
      avatar: "/salil-kulkarni.jpg",
    },
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    tags: ["Revit BIM", "Case Study", "Workflow Automation", "MEP Productivity"],
    content: `
# Case Study — 300 Hours vs. 30 Minutes: The Power of TARV BIM Automation

## Background
On a 45-story commercial tower project in Dubai, UAE, an international MEP consultancy faced tight submittal deadlines for detailed HVAC cooling loads, electrical DB schedules, and fire fighting pump sizing under strict DEWA and DCL authority regulations.

Historically, senior engineers calculated loads manually in isolated Excel workbooks and manually typed hundreds of resulting parameter values into Revit element tags.

---

## The Challenge
- **Time Consumption**: Over 300 engineering hours required per design revision cycle.
- **Human Error Risk**: Manual copy-pasting of CFM airflow and kW electrical values into Revit schedules led to parameter discrepancies between calculation reports and drawing sheets.
- **Re-work Cycles**: Client layout changes required repeating the entire manual calculation chain from scratch.

---

## The TARV Solution
By deploying **TARV Engineering Suite**:
1. The project team connected TARV's cloud solver to their Revit 2026 3D model using the 2-way BIM plugin.
2. Space airflow CFM, chiller plant loads, and cable sizing runs were calculated instantly in TARV.
3. With 1 click, all calculated parameters pushed back into Revit room tags and equipment schedules in **under 30 minutes**.

---

## Results & Impact
- ⏱️ **90% Reduction in Calculation Time**: From 300 hours down to 30 minutes per revision.
- 🎯 **Zero Discrepancies**: 100% parameter accuracy between calculation reports and Revit schedules.
- 💰 **Estimated Cost Savings**: Over $28,000 in saved billable engineering hours on project #1 alone.
    `,
  },
  {
    slug: "ipc-2024-fixture-units-water-demand-sizing",
    title: "Plumbing Fixture Unit (WSFU) Sizing Mapped to IPC 2024 Standards",
    summary: "Learn how to calculate Water Supply Fixture Units (WSFU), Hunter's curve peak flow demand (GPM), and sanitary drainage pipe diameters according to IPC 2024.",
    category: "Plumbing",
    readTime: "6 min read",
    date: "July 28, 2026",
    featured: false,
    author: {
      name: "Salil Kulkarni",
      role: "CEO & Founder, TARV",
      avatar: "/salil-kulkarni.jpg",
    },
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
    tags: ["IPC 2024", "Plumbing Sizer", "WSFU", "Water Demand"],
    content: `
# Plumbing Fixture Unit (WSFU) Sizing Mapped to IPC 2024 Standards

Designing water supply and sanitary drainage systems requires converting discrete plumbing fixture counts (water closets, lavatories, showers, kitchen sinks) into continuous peak flow demand using **Hunter’s Curve** methodology as standardized in International Plumbing Code (IPC) Chapter 6.

---

## 1. Water Supply Fixture Units (WSFU) & Peak Flow Conversion

Each plumbing fixture is assigned a WSFU value based on standard IPC Table 604.3:
- Water Closet (Flush Tank): **2.5 WSFU**
- Water Closet (Flushometer Valve): **5.0 WSFU**
- Lavatory: **0.75 WSFU**
- Shower Head: **1.5 WSFU**

Total WSFU is converted to peak design flow rate ($GPM$) using Hunter's non-linear probability curve:

$$Q_{\\text{GPM}} = f(\\sum \\text{WSFU})$$

---

## 2. Supply Pipe Friction Loss Calculation

Pipe sizing must maintain velocity below **8 ft/s** to prevent erosion-corrosion and water hammer, using the Hazen-Williams head loss equation:

$$h_f = 0.2083 \\times \\left( \\frac{100}{C} \\right)^{1.852} \\times \\frac{Q^{1.852}}{d^{4.8655}}$$

Where:
- $h_f$ = Friction head loss per 100 ft of pipe
- $C$ = Pipe roughness coefficient (e.g., $C = 150$ for Copper/PEX)
- $Q$ = Flow rate in GPM
- $d$ = Internal pipe diameter in inches

---

## 3. TARV Plumbing Suite Sizing Automation
TARV’s **Plumbing Calculator** automatically aggregates fixture counts, maps Hunter's curve probability curves for flushometer vs. flush tank fixtures, and calculates booster pump head requirements instantly.
    `,
  },
  {
    slug: "duct-static-pressure-loss-smacna-ashrae",
    title: "Duct Static Pressure Loss & Friction Calculation: SMACNA & ASHRAE Handbook Methods",
    summary: "Understand equal friction, static regain methods, and dynamic fitting loss coefficients for sizing supply and return air duct networks.",
    category: "HVAC",
    readTime: "7 min read",
    date: "July 20, 2026",
    featured: false,
    author: {
      name: "Salil Kulkarni",
      role: "CEO & Founder, TARV",
      avatar: "/salil-kulkarni.jpg",
    },
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80",
    tags: ["Ductulator", "Static Pressure", "SMACNA", "HVAC Sizer"],
    content: `
# Duct Static Pressure Loss & Friction Calculation: SMACNA & ASHRAE Handbook Methods

Proper air duct sizing ensures equal airflow distribution to conditioned zones while minimizing fan total static pressure ($TSP$) requirements and acoustic noise generation.

---

## 1. Equal Friction Method Equations

The pressure drop due to friction in a straight duct section is calculated using the Darcy-Weisbach equation:

$$\\Delta P_f = f \\times \\left( \\frac{L}{D_h} \\right) \\times \\left( \\frac{\\rho \\times V^2}{2} \\right)$$

Where:
- $\\Delta P_f$ = Pressure loss (in. w.g. or Pa)
- $f$ = Friction factor (from Colebrook equation)
- $L$ = Duct length (ft or m)
- $D_h$ = Hydraulic diameter ($D_h = \\frac{4A}{P}$)
- $\\rho$ = Air density ($0.075 \\text{ lb/ft}^3$)
- $V$ = Air velocity (fpm)

---

## 2. Dynamic Loss in Duct Fittings

Fittings (elbows, transitions, tees, dampers) create turbulence and localized pressure drops using C-coefficients:

$$\\Delta P_k = C_o \\times P_v$$

Where $P_v = \\left( \\frac{V}{4005} \\right)^2$ is the velocity pressure in inches water gauge.

---

## 3. TARV Interactive Ductulator
TARV’s **Duct Sizing Calculator** calculates rectangular, circular, and flat-oval duct dimensions simultaneously, applying SMACNA roughness tables and velocity constraints automatically.
    `,
  },
  {
    slug: "nfpa-13-fire-protection-sprinkler-k-factor",
    title: "Hydraulic Sprinkler K-Factor & Hazen-Williams Sizing for Fire Protection Engineers",
    summary: "Step-by-step NFPA 13 density/area calculations, sprinkler head discharge flow equations, and fire pump head sizing.",
    category: "Fire Fighting",
    readTime: "6 min read",
    date: "July 12, 2026",
    featured: false,
    author: {
      name: "Salil Kulkarni",
      role: "CEO & Founder, TARV",
      avatar: "/salil-kulkarni.jpg",
    },
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    tags: ["NFPA 13", "Fire Fighting", "K-Factor", "Hydraulic Sizing"],
    content: `
# Hydraulic Sprinkler K-Factor & Hazen-Williams Sizing for Fire Protection Engineers

Designing fire protection sprinkler systems according to **NFPA 13** requires verifying that the hydraulic demand of the most remote design area ($1,500 \\text{ ft}^2$) is satisfied by the available water supply pressure and flow.

---

## 1. Sprinkler Discharge Flow Equation

The flow rate ($Q$) discharging from a fire sprinkler nozzle depends on its nominal K-factor and operating pressure ($P$):

$$Q = K \\times \\sqrt{P}$$

Where:
- $Q$ = Discharge flow rate (GPM)
- $K$ = Sprinkler K-Factor (e.g., $K=5.6$ for standard 1/2" orifice, $K=8.0$, $K=11.2$, or $K=16.8$)
- $P$ = Minimum operating pressure at the sprinkler head (PSI, min 7 PSI per NFPA 13)

---

## 2. Hazen-Williams Hydraulic Loss Formula

Friction loss in fire piping network branches is governed by NFPA 13 Hazen-Williams formula:

$$p_m = \\frac{4.52 \\times Q^{1.85}}{C^{1.85} \\times d^{4.87}}$$

Where $p_m$ is the friction loss per foot of pipe (PSI/ft).

---

## 3. TARV Fire Fighting Calculator
TARV automatically balances remote area hydraulic trees, determines required fire pump duty ($GPM @ PSI$), and sizes fire water storage tank capacities under NFPA 20 rules.
    `,
  },
  {
    slug: "kva-generator-transformer-sizing-nec-iec",
    title: "Transformer & kVA Generator Load Calculations to NEC & IEC Standards",
    summary: "Calculate total connected electrical load, maximum demand load, diversity factors, motor starting kVA, and transformer sizing rules.",
    category: "Electrical",
    readTime: "7 min read",
    date: "June 30, 2026",
    featured: false,
    author: {
      name: "Salil Kulkarni",
      role: "CEO & Founder, TARV",
      avatar: "/salil-kulkarni.jpg",
    },
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80",
    tags: ["Electrical Load", "Transformer Sizing", "Generator kVA", "NEC"],
    content: `
# Transformer & kVA Generator Load Calculations to NEC & IEC Standards

Properly sizing main distribution transformers and emergency standby generators requires establishing **connected load**, applying NEC Article 220 **demand factors**, and accounting for motor locked-rotor inrush kVA.

---

## 1. Apparent Power Formula (kVA)

Three-phase apparent power ($S_{\\text{kVA}}$) is calculated as:

$$S_{\\text{kVA}} = \\frac{\\sqrt{3} \\times V_{\\text{L-L}} \\times I_{\\text{demand}}}{1000}$$

Where:
- $V_{\\text{L-L}}$ = Line-to-line system voltage (e.g., 480V or 400V)
- $I_{\\text{demand}}$ = Total calculated demand current (Amperes)

---

## 2. Demand Factor vs. Diversity Factor

- **Demand Factor** = $\\frac{\\text{Maximum Demand Load}}{\\text{Total Connected Load}} \\le 1.0$
- **Diversity Factor** = $\\frac{\\sum \\text{Individual Max Demands}}{\\text{Coincident Peak Demand}} \\ge 1.0$

---

## 3. TARV Electrical Sizer Automation
TARV’s **Electrical Calculator** compiles connected vs. demand loads across lighting, HVAC mechanical units, and receptacles, generating a 100% NEC-compliant transformer and kVA generator summary.
    `,
  },
  {
    slug: "psychrometric-air-condition-cooling-process",
    title: "Psychrometric Air Condition Processes: Sensible vs. Latent Cooling Load Calculations",
    summary: "Master dry-bulb, wet-bulb, dew point, enthalpy, and sensible heat ratio (SHR) plotting on psychrometric charts.",
    category: "HVAC",
    readTime: "8 min read",
    date: "June 18, 2026",
    featured: false,
    author: {
      name: "Salil Kulkarni",
      role: "CEO & Founder, TARV",
      avatar: "/salil-kulkarni.jpg",
    },
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
    tags: ["Psychrometrics", "SHR", "Enthalpy", "HVAC Design"],
    content: `
# Psychrometric Air Condition Processes: Sensible vs. Latent Cooling Load Calculations

Psychrometrics is the study of thermodynamic properties of moist air. Understanding the relationship between dry-bulb temperature ($DBT$), wet-bulb temperature ($WBT$), relative humidity ($RH$), and enthalpy ($h$) is vital for sizing AHU cooling coils and dehumidification systems.

---

## 1. Enthalpy Energy Equation

Total thermal cooling capacity required at an AHU cooling coil is determined by enthalpy difference:

$$Q_{\\text{total}} = 4.5 \\times \\text{CFM} \\times (h_{\\text{entering}} - h_{\\text{leaving}})$$

Where:
- $Q_{\\text{total}}$ = Total Cooling Load (BTU/hr)
- $h$ = Enthalpy of air stream (BTU/lb of dry air)

---

## 2. Sensible Heat Ratio (SHR)

$$SHR = \\frac{Q_{\\text{sensible}}}{Q_{\\text{total}}} = \\frac{Q_s}{Q_s + Q_l}$$

Target indoor comfort conditions ($75^\\circ\\text{F } DB, 50\\% RH$) typically require an apparatus dew point (ADP) that matches the SHR slope.

---

## 3. TARV Psychrometric Calculator
Use TARV’s interactive **Psychrometric Calculator** to plot air mixing processes, apparatus dew points, and coil bypass factors automatically.
    `,
  },
  {
    slug: "revit-parameter-syncing-5-pitfalls-automation",
    title: "Revit Parameter Syncing: 5 Common BIM Schedule Pitfalls & How to Automate",
    summary: "Avoid broken shared parameters, mismatched units, and manual data typing errors between engineering calculation workbooks and 3D Revit models.",
    category: "Revit Sync",
    readTime: "6 min read",
    date: "June 04, 2026",
    featured: false,
    author: {
      name: "Salil Kulkarni",
      role: "CEO & Founder, TARV",
      avatar: "/salil-kulkarni.jpg",
    },
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    tags: ["Revit BIM", "BIM Automation", "Parameter Sync", "Revit Addin"],
    content: `
# Revit Parameter Syncing: 5 Common BIM Schedule Pitfalls & How to Automate

BIM coordination is only as good as the parameter data living inside elements. When calculation data is manually copied from external spreadsheets into Revit, parameter drift occurs.

---

## The 5 Common BIM Schedule Pitfalls
1. **Shared Parameter GUID Mismatches**: Custom family parameters not matching project shared parameter definitions.
2. **Unit Conversion Bugs**: Inadvertently mixing Imperial (CFM, GPM, BTU/hr) and Metric ($m^3/h$, $L/s$, $kW$) parameters.
3. **Out-of-Date Mechanical Equipment Tags**: Revisions made in engineering spreadsheets failing to update Revit tags before submission.
4. **Disconnected DB Electrical Schedules**: Circuit breaker ratings and load totals typed as static text strings instead of dynamic parameters.
5. **Slow Manual Typing**: Spending 40+ billable hours entering room airflow values manually.

---

## The TARV 2-Way Sync Solution
TARV bridges cloud calculation engines directly into Revit 2024–2026 via native API calls, updating space CFM, cooling tons, and cable sizes in under 2 seconds.
    `,
  },
  {
    slug: "dubai-dewa-dcl-mep-calculation-compliance-guide",
    title: "GCC Code Compliance: DEWA, DCL & Saudi Building Code (SBC) Calculations",
    summary: "A practical guide to designing HVAC, electrical, and plumbing systems compliant with Dubai Municipality (DCL), DEWA regulations, and Saudi SBC 601/401.",
    category: "Case Studies",
    readTime: "7 min read",
    date: "May 22, 2026",
    featured: false,
    author: {
      name: "Salil Kulkarni",
      role: "CEO & Founder, TARV",
      avatar: "/salil-kulkarni.jpg",
    },
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    tags: ["DEWA", "DCL Dubai", "Saudi SBC", "GCC Engineering"],
    content: `
# GCC Code Compliance: DEWA, DCL & Saudi Building Code (SBC) Calculations

MEP consulting firms operating in the Middle East (UAE, Saudi Arabia, Qatar, Oman) must adhere to regional building codes alongside international ASHRAE and NEC standards.

---

## Key Regional Requirements:
1. **DEWA (Dubai Electricity and Water Authority)**: Strict power factor limits ($\ge 0.95$), continuous cable derating for $50^\\circ\text{C}$ ambient soil/air temperatures.
2. **DCL (Dubai Central Laboratory)**: Green Building Regulation envelope thermal transmittance values ($U$-values max $0.3 \\text{ W/m}^2\\text{K}$).
3. **Saudi Building Code (SBC 601 & 401)**: Energy conservation and electrical installation compliance rules.

---

## How TARV Pre-Configures Regional Codes
TARV includes pre-set calculation templates tailored for GCC local authorities, allowing engineers to generate authority-ready calculation submittals with 1 click.
    `,
  },
];
