import type { SimulationResult, SimulationInput } from '../lib/simulate';

const fmtEur = (n: number) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
const fmtPct = (n: number) => `${(n * 100).toFixed(1).replace('.', ',')} %`;

type Props = {
  result: SimulationResult;
  input: SimulationInput;
};

export function FeeBreakdownTable({ result, input }: Props) {
  const rows = [
    {
      label: 'Capital versé',
      sub: `${fmtEur(input.monthly)}/mois${input.initial > 0 ? ` + ${fmtEur(input.initial)} initial` : ''} pendant ${input.years} an${input.years > 1 ? 's' : ''}`,
      op: '',
      value: result.totalDeposited,
      tone: 'neutral' as const,
    },
    {
      label: `Frais d'entrée ${fmtPct(input.entryFee)}`,
      sub: `Prélevés sur chaque versement`,
      op: '−',
      value: -result.entryFeesTotal,
      tone: 'coral' as const,
    },
    {
      label: 'Gain brut généré',
      sub: `À ${fmtPct(input.grossReturn)}/an de rendement brut`,
      op: '+',
      value: result.grossGain,
      tone: 'positive' as const,
    },
    {
      label: `Frais courants UC ${fmtPct(input.ucFee)}`,
      sub: `Prélevés à la source dans le fonds`,
      op: '−',
      value: -result.ucFeesTotal,
      tone: 'amber' as const,
    },
    {
      label: `Frais de gestion AV ${fmtPct(input.mgmtFee)}`,
      sub: `Prélevés annuellement par l'assureur`,
      op: '−',
      value: -result.mgmtFeesTotal,
      tone: 'violet' as const,
    },
  ];

  const toneClass = {
    neutral: 'text-of-ink',
    positive: 'text-of-blue',
    coral: 'text-of-coral',
    amber: 'text-of-amber',
    violet: 'text-of-violet',
  };

  return (
    <div className="rounded-md bg-white border border-of-blue-100 p-6 shadow-card">
      <div className="text-[11px] uppercase tracking-wider font-bold text-of-blue mb-1">
        Détail du calcul
      </div>
      <div className="text-of-ink-2 text-sm mb-4">
        Étape par étape, de votre versement total à ce qui reste vraiment sur le contrat.
      </div>
      <div className="divide-y divide-of-line-3">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between gap-4 py-3">
            <div className="min-w-0">
              <div className={`text-sm font-semibold ${toneClass[r.tone]}`}>{r.label}</div>
              <div className="text-xs text-of-mute">{r.sub}</div>
            </div>
            <div className="flex items-baseline gap-2 whitespace-nowrap">
              {r.op && <span className="text-of-mute font-bold">{r.op}</span>}
              <span className={`text-base font-bold tabular-nums ${toneClass[r.tone]}`}>
                {fmtEur(Math.abs(r.value))}
              </span>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-between gap-4 pt-4 mt-1 border-t-2 border-of-blue">
          <div>
            <div className="text-sm font-bold text-of-ink">Capital final net</div>
            <div className="text-xs text-of-mute">Ce qui reste réellement sur votre contrat</div>
          </div>
          <div className="text-xl font-bold tabular-nums text-of-blue">
            {fmtEur(result.finalNet)}
          </div>
        </div>
      </div>
    </div>
  );
}
