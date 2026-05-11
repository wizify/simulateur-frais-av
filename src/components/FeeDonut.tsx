import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import type { SimulationResult } from '../lib/simulate';

const fmtEur = (n: number) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);

export function FeeDonut({ result }: { result: SimulationResult }) {
  const reference = Math.max(result.grossGain, 1);
  const data = [
    { name: 'Gain net', value: result.netGain, color: '#3340FA' },
    { name: 'Frais d\'entrée', value: result.entryFeesTotal, color: '#FF6B5C' },
    { name: 'Frais courants UC', value: result.ucFeesTotal, color: '#FFBE5C' },
    { name: 'Frais de gestion AV', value: result.mgmtFeesTotal, color: '#C938FF' },
  ].filter((d) => d.value > 0);

  const netPct = Math.max(0, Math.round((result.netGain / reference) * 100));

  return (
    <div className="rounded-md bg-white border border-of-blue-100 p-6 shadow-card">
      <div className="text-[11px] uppercase tracking-wider font-bold text-of-blue mb-1">
        Répartition du gain brut
      </div>
      <div className="text-of-ink-2 text-sm mb-4">
        Sur tout ce que votre placement aurait pu produire (sans frais), voici ce qui vous revient et ce que prennent les frais.
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_220px] gap-6 items-center">
        <div className="relative h-[220px]">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius="58%"
                outerRadius="92%"
                stroke="#fff"
                strokeWidth={2}
                startAngle={90}
                endAngle={-270}
                paddingAngle={1}
              >
                {data.map((d) => (
                  <Cell key={d.name} fill={d.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="text-3xl font-bold text-of-blue tabular-nums">{netPct} %</div>
            <div className="text-[11px] uppercase tracking-wider font-bold text-of-mute">
              Gain net
            </div>
          </div>
        </div>
        <ul className="text-sm space-y-2">
          {data.map((d) => {
            const pct = Math.round((d.value / reference) * 100);
            return (
              <li key={d.name} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="h-3 w-3 rounded-sm flex-shrink-0"
                    style={{ background: d.color }}
                    aria-hidden
                  />
                  <span className="text-of-ink truncate">{d.name}</span>
                </div>
                <div className="text-right whitespace-nowrap">
                  <span className="font-bold text-of-ink tabular-nums">{pct} %</span>
                  <span className="text-of-mute text-xs ml-2 tabular-nums">{fmtEur(d.value)}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
