import type { ReactNode } from 'react';

type Props = {
  title: string;
  children: ReactNode;
};

export function SectionCard({ title, children }: Props) {
  return (
    <section className="rounded-md bg-white border border-of-blue-100 shadow-card">
      <header className="px-5 py-3 border-b border-of-line-3">
        <div className="text-[11px] uppercase tracking-[2px] font-bold text-of-blue">
          {title}
        </div>
      </header>
      <div className="divide-y divide-of-line-3">{children}</div>
    </section>
  );
}
