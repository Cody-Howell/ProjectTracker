export function TimeAfter(date: Date): number {
  const current = new Date();
  const timeDifferenceMs = current.getTime() - date.getTime();
  const days = Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24));

  return days > 0 ? days : 0;
}
