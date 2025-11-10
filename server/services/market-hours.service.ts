import { formatInTimeZone, toDate } from 'date-fns-tz';
import { isWithinInterval, parseISO, getDay } from 'date-fns';

/**
 * Service for determining market trading hours and status
 * Handles timezone-aware market hours for stocks, forex, crypto, commodities
 */

export interface TradingHours {
  open: string;   // HH:mm format in exchange timezone
  close: string;  // HH:mm format in exchange timezone
  days?: number[]; // 0-6, Sunday=0, Monday=1, etc. (optional, defaults to weekdays)
}

export interface MarketStatus {
  isOpen: boolean;
  nextOpen?: Date;
  nextClose?: Date;
  timezone: string;
}

/**
 * Checks if a forex market is currently open
 * Forex markets are open 24/5 (Monday 00:00 UTC to Friday 23:00 UTC)
 */
export function isForexMarketOpen(now: Date = new Date()): boolean {
  const dayOfWeek = now.getUTCDay(); // 0 = Sunday, 6 = Saturday
  const hourOfDay = now.getUTCHours();
  
  // Forex is closed on weekends
  if (dayOfWeek === 0) { // Sunday
    return false;
  }
  
  if (dayOfWeek === 6) { // Saturday
    return false;
  }
  
  // Friday closes at 23:00 UTC
  if (dayOfWeek === 5 && hourOfDay >= 23) {
    return false;
  }
  
  // Open all other times (Monday 00:00 - Friday 22:59 UTC)
  return true;
}

/**
 * Checks if a crypto market is currently open
 * Crypto markets are open 24/7
 */
export function isCryptoMarketOpen(): boolean {
  return true;
}

/**
 * Checks if a stock/commodity/ETF market is currently open
 * based on exchange-specific trading hours in the exchange's timezone
 * 
 * @param tradingHours - Market hours in exchange timezone
 * @param exchangeTimezone - IANA timezone string (e.g., "America/New_York")
 * @param now - Current time (defaults to current Date)
 */
export function isExchangeMarketOpen(
  tradingHours: TradingHours | null | undefined,
  exchangeTimezone: string | null | undefined,
  now: Date = new Date()
): boolean {
  if (!tradingHours || !exchangeTimezone) {
    // If no trading hours defined, assume it's not open (safer default)
    return false;
  }
  
  try {
    // Get current time in the exchange's timezone
    const exchangeTime = toDate(now, { timeZone: exchangeTimezone });
    const dayOfWeek = getDay(exchangeTime);
    
    // Check if today is a trading day (default to weekdays if not specified)
    const tradingDays = tradingHours.days || [1, 2, 3, 4, 5]; // Mon-Fri by default
    if (!tradingDays.includes(dayOfWeek)) {
      return false;
    }
    
    // Parse trading hours in exchange timezone
    const currentTimeStr = formatInTimeZone(now, exchangeTimezone, 'HH:mm');
    const [currentHour, currentMin] = currentTimeStr.split(':').map(Number);
    const currentMinutes = currentHour * 60 + currentMin;
    
    // Parse open time
    const [openHour, openMin] = tradingHours.open.split(':').map(Number);
    const openMinutes = openHour * 60 + openMin;
    
    // Parse close time
    const [closeHour, closeMin] = tradingHours.close.split(':').map(Number);
    const closeMinutes = closeHour * 60 + closeMin;
    
    // Check if current time is within trading hours
    return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
  } catch (error) {
    console.error('Error checking exchange market hours:', error);
    return false;
  }
}

/**
 * Determines if a market is currently open based on symbol type and metadata
 * 
 * @param symbolType - Type of symbol (forex, crypto, stock, commodity, index, etf)
 * @param exchangeTimezone - IANA timezone for exchange (required for stocks/commodities/ETFs)
 * @param tradingHours - Trading hours object (required for stocks/commodities/ETFs)
 */
export function isMarketOpen(
  symbolType: string | null | undefined,
  exchangeTimezone?: string | null,
  tradingHours?: TradingHours | null
): boolean {
  const type = symbolType?.toLowerCase();
  
  switch (type) {
    case 'forex':
      return isForexMarketOpen();
    
    case 'crypto':
    case 'cryptocurrency':
      return isCryptoMarketOpen();
    
    case 'stock':
    case 'stocks':
    case 'commodity':
    case 'commodities':
    case 'index':
    case 'indices':
    case 'etf':
      return isExchangeMarketOpen(tradingHours, exchangeTimezone);
    
    default:
      // For unknown types, check if we have exchange hours
      if (tradingHours && exchangeTimezone) {
        return isExchangeMarketOpen(tradingHours, exchangeTimezone);
      }
      // Default to forex-like behavior for backwards compatibility
      return isForexMarketOpen();
  }
}

/**
 * Gets detailed market status including next open/close times
 */
export function getMarketStatus(
  symbolType: string | null | undefined,
  exchangeTimezone?: string | null,
  tradingHours?: TradingHours | null,
  now: Date = new Date()
): MarketStatus {
  const isOpen = isMarketOpen(symbolType, exchangeTimezone, tradingHours);
  
  return {
    isOpen,
    timezone: exchangeTimezone || 'UTC',
    // TODO: Calculate nextOpen and nextClose times
    // This would require more complex date math considering weekends and holidays
  };
}

/**
 * Default trading hours for common exchanges (24-hour format in exchange timezone)
 */
export const DEFAULT_EXCHANGE_HOURS: Record<string, { timezone: string; hours: TradingHours }> = {
  // US Markets
  'NYSE': {
    timezone: 'America/New_York',
    hours: { open: '09:30', close: '16:00', days: [1, 2, 3, 4, 5] }
  },
  'NASDAQ': {
    timezone: 'America/New_York',
    hours: { open: '09:30', close: '16:00', days: [1, 2, 3, 4, 5] }
  },
  
  // European Markets
  'LSE': {
    timezone: 'Europe/London',
    hours: { open: '08:00', close: '16:30', days: [1, 2, 3, 4, 5] }
  },
  'EURONEXT': {
    timezone: 'Europe/Paris',
    hours: { open: '09:00', close: '17:30', days: [1, 2, 3, 4, 5] }
  },
  'XETRA': {
    timezone: 'Europe/Berlin',
    hours: { open: '09:00', close: '17:30', days: [1, 2, 3, 4, 5] }
  },
  
  // Asian Markets
  'TSE': { // Tokyo Stock Exchange
    timezone: 'Asia/Tokyo',
    hours: { open: '09:00', close: '15:00', days: [1, 2, 3, 4, 5] }
  },
  'HKEX': { // Hong Kong Stock Exchange
    timezone: 'Asia/Hong_Kong',
    hours: { open: '09:30', close: '16:00', days: [1, 2, 3, 4, 5] }
  },
  'SSE': { // Shanghai Stock Exchange
    timezone: 'Asia/Shanghai',
    hours: { open: '09:30', close: '15:00', days: [1, 2, 3, 4, 5] }
  },
};
