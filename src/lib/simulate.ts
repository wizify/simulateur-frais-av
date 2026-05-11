export type SimulationInput = {
  initial: number;
  monthly: number;
  years: number;
  entryFee: number;
  mgmtFee: number;
  ucFee: number;
  grossReturn: number;
};

export type TimelinePoint = {
  year: number;
  netValue: number;
  depositedToDate: number;
  feesToDate: number;
};

export type SimulationResult = {
  totalDeposited: number;
  entryFeesTotal: number;
  mgmtFeesTotal: number;
  ucFeesTotal: number;
  totalFees: number;
  capitalInvested: number;
  finalNet: number;
  finalGrossNoFees: number;
  netGain: number;
  grossGain: number;
  netCAGR: number;
  timeline: TimelinePoint[];
};

type Scenario = {
  entryFee: number;
  mgmtFee: number;
  ucFee: number;
};

function runGrossReference(input: SimulationInput): { final: number; timeline: TimelinePoint[]; deposited: number } {
  const months = Math.round(input.years * 12);
  const rMonthly = Math.pow(1 + input.grossReturn, 1 / 12) - 1;

  let v = input.initial;
  let deposited = input.initial;
  const timeline: TimelinePoint[] = [
    { year: 0, netValue: v, depositedToDate: deposited, feesToDate: 0 },
  ];

  for (let k = 1; k <= months; k++) {
    v = v * (1 + rMonthly);
    v += input.monthly;
    deposited += input.monthly;
    if (k % 12 === 0) {
      timeline.push({ year: k / 12, netValue: v, depositedToDate: deposited, feesToDate: 0 });
    }
  }
  return { final: v, timeline, deposited };
}

export function simulate(input: SimulationInput): SimulationResult {
  // 1. Run the full simulation (all fees) — this is the one with the visible timeline
  const full = runScenarioWithTimeline(input, {
    entryFee: input.entryFee,
    mgmtFee: input.mgmtFee,
    ucFee: input.ucFee,
  });

  // 2. Run three "isolation" scenarios — each removes ONE fee bucket
  const noEntry = runScenarioFinalOnly(input, {
    entryFee: 0,
    mgmtFee: input.mgmtFee,
    ucFee: input.ucFee,
  });
  const noUc = runScenarioFinalOnly(input, {
    entryFee: input.entryFee,
    mgmtFee: input.mgmtFee,
    ucFee: 0,
  });
  const noMgmt = runScenarioFinalOnly(input, {
    entryFee: input.entryFee,
    mgmtFee: 0,
    ucFee: input.ucFee,
  });

  // 4. The fee-free reference (gross)
  const gross = runGrossReference(input);

  const totalDeposited = full.deposited;
  const finalNet = full.final;
  const finalGrossNoFees = gross.final;

  // Each "noX" final - finalNet = value destroyed BY THAT FEE in isolation
  // (it's the marginal contribution since other fees are still applied)
  const entryFeesTotal = Math.max(0, noEntry - finalNet);
  const ucFeesTotal = Math.max(0, noUc - finalNet);
  const mgmtFeesTotal = Math.max(0, noMgmt - finalNet);

  // Total fees (in value terms) — by definition gross - net
  const totalFees = Math.max(0, finalGrossNoFees - finalNet);

  // Normalize the three buckets so they sum to totalFees (cross-effects ~1-2%)
  const sumBuckets = entryFeesTotal + ucFeesTotal + mgmtFeesTotal;
  const scale = sumBuckets > 0 ? totalFees / sumBuckets : 1;
  const entryAdj = entryFeesTotal * scale;
  const ucAdj = ucFeesTotal * scale;
  const mgmtAdj = mgmtFeesTotal * scale;

  const netGain = finalNet - totalDeposited;
  const grossGain = finalGrossNoFees - totalDeposited;

  // Rendement net annualisé — méthodologie AMF : drag analytique sur les frais récurrents.
  // Ignore les frais d'entrée (one-shot) et les timings de versement, ce qui donne un chiffre
  // indépendant de la durée et comparable d'un produit à l'autre.
  const netCAGR = (1 + input.grossReturn) / ((1 + input.mgmtFee) * (1 + input.ucFee)) - 1;

  // Build timeline with proper feesToDate = gross - net at each year
  const timeline: TimelinePoint[] = full.timeline.map((p, i) => {
    const grossPoint = gross.timeline[i];
    const feesToDate = grossPoint ? Math.max(0, grossPoint.netValue - p.netValue) : 0;
    return {
      year: p.year,
      netValue: p.netValue,
      depositedToDate: p.depositedToDate,
      feesToDate,
    };
  });

  return {
    totalDeposited,
    entryFeesTotal: entryAdj,
    mgmtFeesTotal: mgmtAdj,
    ucFeesTotal: ucAdj,
    totalFees,
    capitalInvested: totalDeposited * (1 - input.entryFee),
    finalNet,
    finalGrossNoFees,
    netGain,
    grossGain,
    netCAGR,
    timeline,
  };
}

function runScenarioWithTimeline(
  input: SimulationInput,
  s: Scenario
): { final: number; timeline: TimelinePoint[]; deposited: number } {
  const months = Math.round(input.years * 12);
  const rMonthly = Math.pow(1 + input.grossReturn, 1 / 12) - 1;
  const drag = s.mgmtFee + s.ucFee;
  const dragMonthly = Math.pow(1 + drag, 1 / 12) - 1;
  const netMonthly = (1 + rMonthly) / (1 + dragMonthly) - 1;

  let v = input.initial * (1 - s.entryFee);
  let deposited = input.initial;
  const timeline: TimelinePoint[] = [
    { year: 0, netValue: v, depositedToDate: deposited, feesToDate: 0 },
  ];

  for (let k = 1; k <= months; k++) {
    v = v * (1 + netMonthly);
    v += input.monthly * (1 - s.entryFee);
    deposited += input.monthly;
    if (k % 12 === 0) {
      timeline.push({ year: k / 12, netValue: v, depositedToDate: deposited, feesToDate: 0 });
    }
  }
  return { final: v, timeline, deposited };
}

function runScenarioFinalOnly(input: SimulationInput, s: Scenario): number {
  const months = Math.round(input.years * 12);
  const rMonthly = Math.pow(1 + input.grossReturn, 1 / 12) - 1;
  const drag = s.mgmtFee + s.ucFee;
  const dragMonthly = Math.pow(1 + drag, 1 / 12) - 1;
  const netMonthly = (1 + rMonthly) / (1 + dragMonthly) - 1;

  let v = input.initial * (1 - s.entryFee);
  for (let k = 1; k <= months; k++) {
    v = v * (1 + netMonthly);
    v += input.monthly * (1 - s.entryFee);
  }
  return v;
}
