import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RTooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import type { SimulationResult } from '../lib/simulate';

const fmtEur = (n: number) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);

export function ProjectionChart({ result }: { result: SimulationResult }) {
  const data = result.timeline.map((p) => ({
    year: p.year,
    Versé: Math.round(p.depositedToDate),
    'Capital net': Math.round(p.netValue),
    'Frais cumulés': Math.round(p.feesToDate),
  }));

  return (
    <div className="rounded-md bg-white border border-of-blue-100 p-6 shadow-card">
      <div className="text-[11px] uppercase tracking-wider font-bold text-of-blue mb-1">
        Évolution dans le temps
      </div>
      <div className="text-of-ink-2 text-sm mb-4">
        Comment votre capital net grandit, comparé à ce que vous versez, et combien les frais grignotent en parallèle.
      </div>
      <div className="h-[260px]">
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="year"
              tick={{ fontSize: 11, fill: '#999' }}
              tickFormatter={(y) => `${y} an${y > 1 ? 's' : ''}`}
              stroke="#CCCCCC"
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#999' }}
              stroke="#CCCCCC"
              tickFormatter={(v) =>
                v >= 1000 ? `${(v / 1000).toFixed(0)} k€` : `${v} €`
              }
              width={56}
            />
            <RTooltip
              formatter={(v) => fmtEur(Number(v))}
              labelFormatter={(y) => `Année ${y}`}
              contentStyle={{
                borderRadius: 8,
                border: '1px solid #E8E9FF',
                boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                fontSize: 12,
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
              iconType="circle"
            />
            <Line
              type="monotone"
              dataKey="Versé"
              stroke="#999999"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="Capital net"
              stroke="#3340FA"
              strokeWidth={3}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="Frais cumulés"
              stroke="#FFBE5C"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
