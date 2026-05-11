import { useMemo, useState } from 'react';
import { SectionCard } from './components/SectionCard';
import { NumberInputRow } from './components/NumberInputRow';
import { SliderRow } from './components/SliderRow';
import { ResultStats } from './components/ResultStats';
import { FeeDonut } from './components/FeeDonut';
import { ProjectionChart } from './components/ProjectionChart';
import { FeeBreakdownTable } from './components/FeeBreakdownTable';
import { MarketComparisonCard } from './components/MarketComparisonCard';
import { simulate, type SimulationInput } from './lib/simulate';
import { tooltips } from './content/tooltips';

const fmtPct1 = (n: number) => `${(n * 100).toFixed(1).replace('.', ',')} %`;
const fmtYears = (n: number) => `${n} an${n > 1 ? 's' : ''}`;

export default function App() {
  const [initial, setInitial] = useState(0);
  const [monthly, setMonthly] = useState(100);
  const [years, setYears] = useState(10);
  const [grossReturn, setGrossReturn] = useState(0.05);
  const [entryFee, setEntryFee] = useState(0.01);
  const [mgmtFee, setMgmtFee] = useState(0.008);
  const [ucFee, setUcFee] = useState(0.015);

  const input: SimulationInput = useMemo(
    () => ({ initial, monthly, years, grossReturn, entryFee, mgmtFee, ucFee }),
    [initial, monthly, years, grossReturn, entryFee, mgmtFee, ucFee]
  );

  const result = useMemo(() => simulate(input), [input]);

  return (
    <div className="min-h-screen bg-of-bg-soft">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-8 lg:py-10">
        <header className="mb-8">
          <div className="text-of-blue font-bold text-xs uppercase tracking-[2px] mb-2">
            Simulateur
          </div>
          <h1 className="text-of-ink font-bold text-2xl lg:text-[32px] leading-[1.1] tracking-[-1px] mb-3 max-w-3xl">
            L&apos;impact réel des frais sur votre assurance-vie.
          </h1>
          <p className="text-of-ink-2 text-sm lg:text-base leading-relaxed max-w-3xl">
            Manipulez les paramètres et observez ce qui reste vraiment. Méthodologie inspirée
            de l&apos;Autorité des Marchés Financiers (AMF).
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6 items-start">
          {/* Inputs — sticky on desktop */}
          <div className="flex flex-col gap-4 lg:sticky lg:top-6">
            <SectionCard title="Votre placement">
              <NumberInputRow
                label="Capital initial"
                tooltipContent={tooltips.initial}
                value={initial}
                min={0}
                max={1000000}
                step={100}
                suffix="€"
                onChange={setInitial}
              />
              <NumberInputRow
                label="Versement mensuel"
                tooltipContent={tooltips.monthly}
                value={monthly}
                min={0}
                max={10000}
                step={10}
                suffix="€"
                onChange={setMonthly}
              />
              <SliderRow
                label="Durée"
                tooltipContent={tooltips.years}
                value={years}
                min={1}
                max={40}
                step={1}
                format={fmtYears}
                onChange={setYears}
              />
              <SliderRow
                label="Rendement brut"
                tooltipContent={tooltips.grossReturn}
                value={grossReturn}
                min={0.02}
                max={0.08}
                step={0.001}
                format={fmtPct1}
                onChange={setGrossReturn}
              />
            </SectionCard>

            <SectionCard title="Les frais">
              <SliderRow
                label="Frais d'entrée"
                tooltipContent={tooltips.entryFee}
                value={entryFee}
                min={0}
                max={0.05}
                step={0.001}
                format={fmtPct1}
                onChange={setEntryFee}
              />
              <SliderRow
                label="Frais de gestion AV"
                tooltipContent={tooltips.mgmtFee}
                value={mgmtFee}
                min={0.002}
                max={0.02}
                step={0.001}
                format={fmtPct1}
                onChange={setMgmtFee}
              />
              <SliderRow
                label="Frais courants UC"
                tooltipContent={tooltips.ucFee}
                value={ucFee}
                min={0.001}
                max={0.02}
                step={0.001}
                format={fmtPct1}
                onChange={setUcFee}
              />
            </SectionCard>

            <MarketComparisonCard
              entryFee={entryFee}
              mgmtFee={mgmtFee}
              ucFee={ucFee}
            />
          </div>

          {/* Results */}
          <div className="flex flex-col gap-6">
            <ResultStats result={result} />
            <FeeDonut result={result} />
            <ProjectionChart result={result} />
            <FeeBreakdownTable result={result} input={input} />
          </div>
        </div>

        <footer className="mt-16 pt-8 border-t border-of-line-3 text-xs text-of-mute leading-relaxed max-w-3xl">
          <p>
            <strong className="text-of-ink-2">Méthodologie.</strong> Simulation à versements constants
            avec capitalisation mensuelle. Le rendement brut est une hypothèse — pas une garantie.
            Le rendement net annualisé correspond à la formule AMF&nbsp;: (1 + brut) / [(1 + gestion) × (1 + UC)] − 1.
            Hors fiscalité (PFU, abattements) et hors arbitrages éventuels.
          </p>
        </footer>
      </div>
    </div>
  );
}
