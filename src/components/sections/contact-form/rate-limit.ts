// ---------------------------------------------------------------------------
// Rate limits for the Contact form (Oct 8, 2026). Without them anyone could
// send the form in a loop: every send emails the studio and auto-replies to
// whatever address was typed in, so the studio's Gmail could be used to spam
// strangers and be flagged, and its ~500 emails a day run out.
//
//   per visitor  PER_IP sends per WINDOW_MS, by IP address
//   per server   CONFIRM_PER_HOUR automatic "thank you" replies an hour
//
// In memory, per server instance: a determined attacker spread over many
// instances gets a little further, but casual abuse and scripts stop here.
// For a hard limit across instances, move these counters to a shared store
// (e.g. Upstash Redis from the Vercel Marketplace).
// ---------------------------------------------------------------------------
const PER_IP = 3;
const WINDOW_MS = 10 * 60 * 1000;
const CONFIRM_PER_HOUR = 40;
const HOUR_MS = 60 * 60 * 1000;
const MAX_TRACKED = 5000; // keeps the table small under a flood

const sends = new Map<string, number[]>();
let confirmations: number[] = [];

/** True if this IP may send now; records the attempt when it may. */
export function allowSend(ip: string, now = Date.now()): boolean {
  const key = ip || "unknown";
  const recent = (sends.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= PER_IP) {
    sends.set(key, recent);
    return false;
  }
  recent.push(now);
  sends.set(key, recent);
  if (sends.size > MAX_TRACKED) {
    for (const [k, times] of sends) {
      if (!times.some((t) => now - t < WINDOW_MS)) sends.delete(k);
    }
  }
  return true;
}

/** True if another automatic confirmation email may go out this hour. */
export function allowConfirmation(now = Date.now()): boolean {
  confirmations = confirmations.filter((t) => now - t < HOUR_MS);
  if (confirmations.length >= CONFIRM_PER_HOUR) return false;
  confirmations.push(now);
  return true;
}
