export function formatNumber(number: number): string {
  let formatted: string;

  if (number >= 1_000_000) {
    formatted = (number / 1_000_000).toFixed(1) + 'M';
  } else if (number >= 1_000) {
    formatted = (number / 1_000).toFixed(1) + 'K';
  } else {
    formatted = number.toString();
  }

  return formatted;
}
