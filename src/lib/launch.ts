import { useEffect, useState } from "react";
import { SUITCASE_LAUNCH } from "@/data/suitcase";

/** Launch as a UTC timestamp, so it opens at the same moment for everyone whatever their time zone. */
export const LAUNCH_MS = Date.parse(SUITCASE_LAUNCH);
if (Number.isNaN(LAUNCH_MS)) throw new Error(`SUITCASE_LAUNCH is not a valid date: ${SUITCASE_LAUNCH}`);

export const isLaunched = (now: number) => now >= LAUNCH_MS;

export interface Remaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const remainingUntilLaunch = (now: number): Remaining => {
  const total = Math.max(0, Math.ceil((LAUNCH_MS - now) / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
};

// "Opens Tuesday 20 October, 8:00 PM Doha time", read straight from the Doha wall-clock time in SUITCASE_LAUNCH,
// so the words always match the setting (and don't depend on the reader's locale).
const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const parts = SUITCASE_LAUNCH.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
if (!parts) throw new Error(`SUITCASE_LAUNCH must look like 2026-10-20T20:00:00+03:00, got ${SUITCASE_LAUNCH}`);
const [year, month, day, hour, minute] = parts.slice(1).map(Number);
const weekday = WEEKDAYS[new Date(Date.UTC(year, month - 1, day)).getUTCDay()];
const hour12 = hour % 12 || 12;
const meridiem = hour < 12 ? "AM" : "PM";
const time = `${hour12}:${String(minute).padStart(2, "0")} ${meridiem}`;
const shortTime = minute === 0 ? `${hour12} ${meridiem}` : time;

export const launchLabels = {
  opensLong: `Opens ${weekday} ${day} ${MONTHS[month - 1]}, ${time} Doha time`,
  opensShort: `Opens ${weekday}, ${shortTime}`,
  opensShortLower: `opens ${weekday}, ${shortTime}`,
};

/**
 * Prerendered pages are built at BUILD_TIME, so the first client render uses the same moment to match the HTML.
 * After mount it switches to the real clock and ticks every second until launch.
 */
export const useSuitcaseLaunch = () => {
  const [now, setNow] = useState<number>(__BUILD_TIME__);
  const [justOpened, setJustOpened] = useState(false);
  const open = isLaunched(now);

  useEffect(() => {
    const startedLocked = !isLaunched(Date.now());
    setNow(Date.now());
    if (!startedLocked) return;
    const timer = window.setInterval(() => {
      const current = Date.now();
      setNow(current);
      if (isLaunched(current)) {
        setJustOpened(true);
        window.clearInterval(timer);
      }
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return { open, justOpened, remaining: remainingUntilLaunch(now) };
};
