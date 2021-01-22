export const decodeEntities = (function () {
  const element = document.createElement('div');

  function decodeHTMLEntities(input: string) {
    element.innerHTML = input;
    const output = element.textContent;
    element.textContent = '';
    return output!;
  }

  return decodeHTMLEntities;
})();

export function formatSeconds(value: number): string {
  const seconds = value % 60;
  const minutes = Math.trunc(value / 60);

  return `${twoDigitsAtLeast(minutes)}:${twoDigitsAtLeast(seconds)}`;
}

function twoDigitsAtLeast(num: number): string {
  if (num < 10)
    return '0' + num;
  return num.toString();
}

