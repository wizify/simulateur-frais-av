import { Slider } from './Slider';
import { Tooltip } from './Tooltip';
import type { TooltipContent } from '../content/tooltips';

type Props = {
  label: string;
  tooltipContent: TooltipContent;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  onChange: (v: number) => void;
};

export function SliderRow({ label, tooltipContent, value, min, max, step, format, onChange }: Props) {
  return (
    <div className="px-5 py-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center text-of-ink font-semibold text-sm">
          <span>{label}</span>
          <Tooltip content={tooltipContent} />
        </div>
        <div className="text-of-blue font-bold text-sm tabular-nums">{format(value)}</div>
      </div>
      <Slider
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
        ariaLabel={label}
      />
    </div>
  );
}
