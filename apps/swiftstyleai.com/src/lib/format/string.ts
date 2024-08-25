export function formatStringToArray(format: string, separator = ':'): string[] {
  return format
    .split(separator)
    .map((char) => char.trim())
    .filter((char) => char !== '');
}

export function getFirstLetterWords(str: string | null) {
  if (!str || str === '') return '';
  let firstLetters = '';
  const words = str
    .trim()
    .split(' ')
    .map((e) => e.trim())
    .filter((e) => e !== '');

  for (const word of words) {
    firstLetters += word[0];
  }

  return firstLetters;
}
