type Props = {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  ariaLabel: string;
};

export function Slider({ value, min, max, step, onChange, ariaLabel }: Props) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <input
      type="range"
      className="of-slider"
      style={{
        background: `linear-gradient(to right, var(--of-blue) 0%, var(--of-blue) ${pct}%, var(--of-line-3) ${pct}%, var(--of-line-3) 100%)`,
      }}
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      aria-label={ariaLabel}
    />
  );
}
