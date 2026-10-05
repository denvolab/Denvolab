"use client";
// ---------------------------------------------------------------------------
// LiveClock: the studio's local time ("10:42 AM"), ticking on the minute.
//
// The page is built ahead of time, so the server can't know the visitor's
// "now". The server HTML holds an invisible placeholder the same size as a
// time; the real time appears as soon as the page is interactive, then
// updates at the start of every minute. useSyncExternalStore keeps this
// free of hydration warnings.
// ---------------------------------------------------------------------------
import { useMemo, useSyncExternalStore } from "react";

// Calls `onTick` right after each minute starts.
function subscribe(onTick: () => void) {
  let timer: ReturnType<typeof setTimeout>;
  const schedule = () => {
    timer = setTimeout(() => {
      onTick();
      schedule();
    }, 60_000 - (Date.now() % 60_000) + 50);
  };
  schedule();
  return () => clearTimeout(timer);
}

const getServerSnapshot = () => null;

export function LiveClock({ timeZone, className }: { timeZone: string; className?: string }) {
  const formatter = useMemo(
    () => new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", hour12: true, timeZone }),
    [timeZone],
  );
  const time = useSyncExternalStore(
    subscribe,
    // Newer browsers put a narrow no-break space before AM/PM; Figma uses a
    // normal space.
    () => formatter.format(Date.now()).replace(/ /g, " "),
    getServerSnapshot,
  );

  return (
    <span className={className}>
      {time ?? (
        <span aria-hidden="true" className="invisible">
          00:00 AM
        </span>
      )}
    </span>
  );
}
