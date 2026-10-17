import { suitcase } from "@/data/suitcase";
import { launchLabels, type Remaining } from "@/lib/launch";
import { cn } from "@/lib/utils";

const pad = (n: number) => String(n).padStart(2, "0");

/** Days · Hours · Minutes · Seconds. `compact` is the small teaser version, styled with the site colours. */
const Countdown = ({ remaining, compact = false }: { remaining: Remaining; compact?: boolean }) => {
  const units = [
    { value: remaining.days, label: suitcase.locked.units.days },
    { value: remaining.hours, label: suitcase.locked.units.hours },
    { value: remaining.minutes, label: suitcase.locked.units.minutes },
    { value: remaining.seconds, label: suitcase.locked.units.seconds },
  ];

  return (
    // role="timer" is not announced every second; the label gives screen readers the launch time instead
    <div role="timer" aria-label={launchLabels.opensLong} className={compact ? "flex gap-4 tabular-nums" : "sc-countdown"}>
      {units.map((unit, index) => (
        <div key={unit.label} className="contents">
          {index > 0 && !compact && (
            <span className="sc-countdown-sep" aria-hidden="true">
              ·
            </span>
          )}
          <div className={compact ? "grid gap-0.5 text-center min-w-[2.6ch]" : "sc-countdown-unit"} aria-hidden="true">
            <span suppressHydrationWarning className={cn(compact ? "font-serif text-3xl text-journal-text leading-none" : "sc-countdown-num")}>
              {index === 0 ? unit.value : pad(unit.value)}
            </span>
            <span className={compact ? "text-[9px] tracking-[0.2em] uppercase text-journal-muted" : "sc-countdown-label"}>{unit.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Countdown;
