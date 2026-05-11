import { simulate, type SimulationInput } from '../lib/simulate';

const BEST_IN_CLASS = {
  entryFee: 0,
  mgmtFee: 0.005,
  ucFee: 0.003,
};

const fmtEur = (n: number) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);

type Props = {
  input: SimulationInput;
  currentFinalNet: number;
};

export function ImpactComparisonCard({ input, currentFinalNet }: Props) {
  const bestInput: SimulationInput = {
    ...input,
    entryFee: BEST_IN_CLASS.entryFee,
    mgmtFee: BEST_IN_CLASS.mgmtFee,
    ucFee: BEST_IN_CLASS.ucFee,
  };
  const bestResult = simulate(bestInput);
  const diff = bestResult.finalNet - currentFinalNet;
  const isAlreadyCompetitive = diff < 100;

  return (
    <section className="rounded-md bg-of-blue-50 border border-of-blue-200 shadow-card">
      <header className="px-5 py-3 border-b border-of-blue-200">
        <div className="text-[11px] uppercase tracking-[2px] font-bold text-of-blue">
          {isAlreadyCompetitive ? 'Votre scénario est déjà compétitif' : 'Et si vos frais baissaient ?'}
        </div>
      </header>
      <div className="px-5 py-4">
        {isAlreadyCompetitive ? (
          <p className="text-sm text-of-ink-2 leading-relaxed mb-4">
            <span className="text-of-ink font-semibold">Bonne nouvelle.</span> Vos paramètres
            sont déjà au niveau des meilleurs contrats du marché (0 % d&apos;entrée,
            0,5 % de gestion, &lt; 0,3 % sur les supports). Sur ce front, peu de marge
            de progression.
          </p>
        ) : (
          <>
            <div className="space-y-3 mb-4">
              <div>
                <div className="text-[11px] uppercase tracking-wider font-bold text-of-mute mb-0.5">
                  Avec vos paramètres
                </div>
                <div className="text-lg font-bold text-of-ink tabular-nums">
                  {fmtEur(currentFinalNet)}
                </div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider font-bold text-of-mute mb-0.5">
                  Avec un contrat best-in-class
                </div>
                <div className="text-lg font-bold text-of-ink tabular-nums">
                  {fmtEur(bestResult.finalNet)}
                </div>
              </div>
              <div className="border-t border-of-blue-200 pt-3">
                <div className="text-[11px] uppercase tracking-wider font-bold text-of-blue mb-0.5">
                  Différence sur {input.years} an{input.years > 1 ? 's' : ''}
                </div>
                <div className="text-2xl font-bold text-of-blue tabular-nums leading-tight">
                  + {fmtEur(diff)}
                </div>
                <div className="text-[11px] text-of-mute mt-1">
                  avec 0 % d&apos;entrée, 0,5 % de gestion, 0,3 % de frais courants
                </div>
              </div>
            </div>
            <p className="text-xs text-of-ink-2 leading-snug mb-4">
              Au-delà du choix du contrat, c&apos;est toute la stratégie patrimoniale
              — allocation, fiscalité, transmission — qui fait basculer l&apos;équation.
            </p>
          </>
        )}
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
