export function formatSeconds(value: number) {
  const seconds = value % 60;
  const minutes = Math.trunc(value / 60);

  return `${twoDigitsAtLeast(minutes)}:${twoDigitsAtLeast(seconds)}`;
}

function twoDigitsAtLeast(num: number): string {
  if (num < 10)
    return '0' + num;
  return num.toString();
}