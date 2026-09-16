/** Brasília time helpers. Brazil has no DST since 2019, so BRT is a fixed UTC-3. */
const BRT_OFFSET_MS = 3 * 60 * 60 * 1000;

/** "2026-09-30T18:00" (BRT) -> UTC ISO string */
export function brtLocalToIso(value: string): string {
  return new Date(`${value}:00-03:00`).toISOString();
}

/** UTC ISO string -> "2026-09-30T18:00" (BRT) for datetime-local inputs */
export function isoToBrtLocal(iso: string): string {
  return new Date(new Date(iso).getTime() - BRT_OFFSET_MS).toISOString().slice(0, 16);
}

/** Human-readable BRT stamp, e.g. "30/09/2026 18:00 BRT" */
export function formatBrt(iso: string): string {
  const formatted = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso));
  return `${formatted} BRT`;
}
