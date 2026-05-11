type Tone = 'best' | 'mid' | 'high';

type Row = {
  label: string;
  value: number;
  tone: Tone;
  badgeLabel: string;
};

const fmtPct = (n: number) => `${(n * 100).toFixed(1).replace('.', ',')} %`;

function classifyEntry(v: number): { tone: Tone; label: string } {
  if (v <= 0.005) return { tone: 'best', label: 'Compétitif' };
  if (v <= 0.02) return { tone: 'mid', label: 'Dans la moyenne' };
  return { tone: 'high', label: 'Élevé' };
}

function classifyMgmt(v: number): { tone: Tone; label: string } {
  if (v <= 0.006) return { tone: 'best', label: 'Compétitif' };
  if (v <= 0.01) return { tone: 'mid', label: 'Dans la moyenne' };
  return { tone: 'high', label: 'Élevé' };
}

function classifyUC(v: number): { tone: Tone; label: string } {
  if (v <= 0.005) return { tone: 'best', label: 'Compétitif' };
  if (v <= 0.015) return { tone: 'mid', label: 'Dans la moyenne' };
  return { tone: 'high', label: 'Élevé' };
}

const badgeStyles: Record<Tone, string> = {
  best: 'bg-[#D4F9EF] text-[#0E8F6F]',
  mid: 'bg-[#FFF1D9] text-[#A36300]',
  high: 'bg-[#FFE2DD] text-[#C44430]',
};

type Props = {
  entryFee: number;
  mgmtFee: number;
  ucFee: number;
};

export function MarketComparisonCard({ entryFee, mgmtFee, ucFee }: Props) {
  const entry = classifyEntry(entryFee);
  const mgmt = classifyMgmt(mgmtFee);
  const uc = classifyUC(ucFee);

  const rows: Row[] = [
    { label: 'Frais d\'entrée', value: entryFee, tone: entry.tone, badgeLabel: entry.label },
    { label: 'Gestion AV', value: mgmtFee, tone: mgmt.tone, badgeLabel: mgmt.label },
    { label: 'Frais courants UC', value: ucFee, tone: uc.tone, badgeLabel: uc.label },
  ];

  return (
    <section className="rounded-md bg-of-blue-50 border border-of-blue-200 shadow-card">
      <header className="px-5 py-3 border-b border-of-blue-200">
        <div className="text-[11px] uppercase tracking-[2px] font-bold text-of-blue">
          Vos frais dans le marché
        </div>
      </header>
      <div className="px-5 py-4">
        <ul className="space-y-2.5 mb-4">
          {rows.map((r) => (
            <li key={r.label} className="flex items-center justify-between text-sm">
              <span className="text-of-ink font-medium">{r.label}</span>
              <div className="flex items-center gap-3">
                <span className="text-of-ink font-bold tabular-nums">{fmtPct(r.value)}</span>
                <span
                  className={`inline-flex items-center rounded-sm px-2 py-0.5 text-[11px] font-bold ${badgeStyles[r.tone]}`}
                >
                  {r.badgeLabel}
                </span>
              </div>
            </li>
          ))}
        </ul>
        <p className="text-xs text-of-ink-2 leading-snug border-t border-of-blue-200 pt-3 mb-4">
          <strong className="text-of-ink">Les meilleurs contrats du marché :</strong> 0 % d&apos;entrée,
          0,5 % de gestion sur UC, et &lt; 0,3 % de frais courants pour les ETF passifs.
          Au-delà des chiffres, la fiscalité et la cohérence patrimoniale comptent autant.
        </p>
        <a
          href="https://wizpatrimoine.fr"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full h-10 rounded-md border-2 border-of-blue bg-white text-of-blue text-sm font-bold transition-colors duration-200 ease-of hover:bg-of-blue hover:text-white focus:outline-none focus:ring-2 focus:ring-of-blue/30"
        >
          Découvrir WizPatrimoine
          <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  );
}
