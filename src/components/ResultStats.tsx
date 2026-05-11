import type { SimulationResult } from '../lib/simulate';

const fmtEur = (n: number) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
const fmtPct = (n: number) => `${(n * 100).toFixed(2).replace('.', ',')} %/an`;

type Stat = { label: string; value: string; tone: 'ink' | 'blue' | 'coral' };

export function ResultStats({ result }: { result: SimulationResult }) {
  const stats: Stat[] = [
    { label: 'Capital versé', value: fmtEur(result.totalDeposited), tone: 'ink' },
    { label: 'Capital final net', value: fmtEur(result.finalNet), tone: 'blue' },
    { label: 'Frais totaux', value: fmtEur(result.totalFees), tone: 'coral' },
    { label: 'Rendement net', value: fmtPct(result.netCAGR), tone: 'blue' },
  ];
  const toneClass = {
    ink: 'text-of-ink',
    blue: 'text-of-blue',
    coral: 'text-of-coral',
  };
  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-md bg-white border border-of-blue-100 p-4 shadow-card"
        >
          <div className="text-[11px] uppercase tracking-wider font-bold text-of-mute mb-1">
            {s.label}
          </div>
          <div className={`text-xl font-bold tabular-nums ${toneClass[s.tone]}`}>
            {s.value}
          </div>
        </div>
      ))}
    </div>
  );
}
