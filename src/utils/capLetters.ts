export default function capLetters(str: string) {
  const firstLetter = str[0].toUpperCase();
  const remaining = str.slice(1);
  return firstLetter + remaining;
}
