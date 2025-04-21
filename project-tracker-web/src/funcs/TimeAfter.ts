/**
 * Returns the number of days after the given date (with a floor at 0).
 * @param date Date to check
 * @returns Number of days after a date (or 0)
 */
export function TimeAfter(date: Date): number {
  const current = new Date();
  const timeDifferenceMs = current.getTime() - date.getTime();
  const days = Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24));

  return days > 0 ? days : 0;
}
