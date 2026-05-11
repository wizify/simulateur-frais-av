import type { TooltipContent } from '../content/tooltips';

type Props = {
  content: TooltipContent;
};

export function Tooltip({ content }: Props) {
  return (
    <span className="of-tooltip-trigger relative inline-flex items-center" tabIndex={0}>
      <span
        aria-label={`En savoir plus : ${content.title}`}
        className="ml-1.5 inline-flex h-4 w-4 cursor-help items-center justify-center rounded-full bg-of-blue-100 text-[10px] font-bold text-of-blue"
      >
        ?
      </span>
      <span
        role="tooltip"
        className="of-tooltip absolute left-1/2 bottom-[calc(100%+10px)] z-50 w-56 -translate-x-1/2 rounded-md border border-of-blue-100 bg-white p-3 text-left text-xs leading-snug text-of-ink-2 shadow-hover"
      >
        <span className="block font-bold text-of-blue text-[11px] uppercase tracking-wider mb-1">
          {content.title}
        </span>
        <span className="block">{content.body}</span>
      </span>
    </span>
  );
}
