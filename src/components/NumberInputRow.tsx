import { Tooltip } from './Tooltip';
import type { TooltipContent } from '../content/tooltips';

type Props = {
  label: string;
  tooltipContent: TooltipContent;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  suffix: string;
  onChange: (v: number) => void;
};

export function NumberInputRow({
  label,
  tooltipContent,
  value,
  min,
  max,
  step = 1,
  suffix,
  onChange,
}: Props) {
  const handleChange = (raw: string) => {
    if (raw === '') {
      onChange(0);
      return;
    }
    let n = Number(raw.replace(/\s/g, '').replace(',', '.'));
    if (Number.isNaN(n)) return;
    if (typeof min === 'number') n = Math.max(min, n);
    if (typeof max === 'number') n = Math.min(max, n);
    onChange(n);
  };

  return (
    <div className="px-5 py-3 flex items-center justify-between gap-4">
      <div className="flex items-center text-of-ink font-semibold text-sm">
        <span>{label}</span>
        <Tooltip content={tooltipContent} />
      </div>
      <div className="relative">
        <input
          type="number"
          inputMode="numeric"
          value={value === 0 ? '' : value}
          min={min}
          max={max}
          step={step}
          placeholder="0"
          onChange={(e) => handleChange(e.target.value)}
          aria-label={label}
          className="w-28 h-9 rounded-sm border border-of-line bg-white pl-3 pr-9 text-right text-sm font-bold text-of-ink tabular-nums outline-none transition-[border,box-shadow] duration-200 ease-of focus:border-of-blue focus:shadow-[0_0_0_3px_rgba(51,64,250,0.15)] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-of-mute">
          {suffix}
        </span>
      </div>
    </div>
  );
}
