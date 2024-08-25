export function formatToTwoDigits(number: number) {
  // Handle non-numeric input or negative numbers
  if (isNaN(number) || number < 0) {
    throw new Error('Input must be a number greater than or equal to zero');
  }

  // Convert to string and pad with leading zero if needed
  return number.toString().padStart(2, '0');
}
