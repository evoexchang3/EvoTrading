// Currency conversion rates (relative to USD)
const EXCHANGE_RATES: Record<string, number> = {
  USD: 1.0,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.50,
};

export function formatCurrency(
  amountInUSD: number,
  displayCurrency: string = 'USD',
  options?: {
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  }
): string {
  // Convert from USD to display currency
  const rate = EXCHANGE_RATES[displayCurrency] || 1.0;
  const convertedAmount = amountInUSD * rate;

  // Get currency symbol
  const currencySymbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
  };

  const symbol = currencySymbols[displayCurrency] || '$';
  const decimals = displayCurrency === 'JPY' ? 0 : 2;

  return `${symbol}${convertedAmount.toLocaleString('en-US', {
    minimumFractionDigits: options?.minimumFractionDigits ?? decimals,
    maximumFractionDigits: options?.maximumFractionDigits ?? decimals,
  })}`;
}

export function convertCurrency(
  amountInUSD: number,
  displayCurrency: string = 'USD'
): number {
  const rate = EXCHANGE_RATES[displayCurrency] || 1.0;
  return amountInUSD * rate;
}
