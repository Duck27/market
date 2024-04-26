export function convert(amount, fromRate, toRate) {
  const result = (amount / fromRate) * toRate;
  return parseFloat(result.toFixed(6));
}
