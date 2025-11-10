import axios from 'axios';
import { db } from '../db';
import { symbols, candles } from '@shared/schema';
import { eq, and, gte } from 'drizzle-orm';
import { isMarketOpen } from './market-hours.service';

const TWELVE_DATA_API_KEY = process.env.TWELVEDATA_API_KEY;

export class MarketService {
  static async getSymbols() {
    return await db.select().from(symbols).where(eq(symbols.isActive, true));
  }

  static async getQuote(symbol: string) {
    try {
      // Get the twelve_data_symbol from database
      const [symbolRecord] = await db
        .select({ twelveDataSymbol: symbols.twelveDataSymbol })
        .from(symbols)
        .where(eq(symbols.symbol, symbol))
        .limit(1);

      const apiSymbol = symbolRecord?.twelveDataSymbol || symbol;

      const response = await axios.get('https://api.twelvedata.com/quote', {
        params: {
          symbol: apiSymbol,
          apikey: TWELVE_DATA_API_KEY,
        },
      });

      if (response.data) {
        return {
          symbol,
          bid: parseFloat(response.data.close),
          ask: parseFloat(response.data.close) + 0.00002,
          change: parseFloat(response.data.change || 0),
          changePercent: parseFloat(response.data.percent_change || 0),
          timestamp: new Date(response.data.datetime || Date.now()),
        };
      }
    } catch (error) {
      console.error('Error fetching quote:', error);
    }

    // Return mock data if API fails
    return {
      symbol,
      bid: 1.08542,
      ask: 1.08545,
      change: 0.00012,
      changePercent: 0.11,
      timestamp: new Date(),
    };
  }

  static async getCandles(symbol: string, interval: string = '1h', limit: number = 100) {
    // Determine cache TTL based on interval (shorter intervals need fresher data)
    // Twelve Data API uses formats like '1min', '5min', '15min', '1h', '1day', '1week'
    const cacheTTL = interval === '1min' || interval === '5min' || interval === '15min' || interval === '1h'
      ? 300000  // 5 minutes for intraday
      : 1800000; // 30 minutes for daily/weekly
      
    // Check for fresh cache first
    const cached = await db
      .select()
      .from(candles)
      .where(
        and(
          eq(candles.symbol, symbol),
          eq(candles.interval, interval),
          gte(candles.cachedAt, new Date(Date.now() - cacheTTL))
        )
      )
      .limit(limit);

    if (cached.length > 0) {
      console.log(`✓ Using fresh cache for ${symbol} ${interval} (${cached.length} candles)`);
      return cached;
    }
    
    console.log(`Cache miss or expired for ${symbol} ${interval}, fetching from API...`);

    // Cache expired or missing - try to fetch fresh data from API
    // Get the twelve_data_symbol from database
    const [symbolRecord] = await db
      .select({ twelveDataSymbol: symbols.twelveDataSymbol })
      .from(symbols)
      .where(eq(symbols.symbol, symbol))
      .limit(1);

    const apiSymbol = symbolRecord?.twelveDataSymbol || symbol;

    // Fetch from TwelveData API
    try {
      const response = await axios.get('https://api.twelvedata.com/time_series', {
        params: {
          symbol: apiSymbol,
          interval,
          outputsize: limit,
          apikey: TWELVE_DATA_API_KEY,
        },
        timeout: 10000,
      });

      if (response.data?.values && Array.isArray(response.data.values)) {
        const candleData = response.data.values.map((v: any) => ({
          symbol,
          interval,
          timestamp: new Date(v.datetime),
          open: v.open,
          high: v.high,
          low: v.low,
          close: v.close,
          volume: v.volume || '0',
        }));

        // Cache candles - delete existing entries first to refresh cache
        try {
          await db.delete(candles).where(
            and(
              eq(candles.symbol, symbol),
              eq(candles.interval, interval)
            )
          );
          await db.insert(candles).values(candleData);
          const latestTime = candleData.length > 0 ? candleData[0].timestamp : 'N/A';
          console.log(`✓ Fetched and cached ${candleData.length} fresh candles for ${symbol} ${interval} (latest: ${latestTime})`);
        } catch (error) {
          console.error('Error caching candles:', error);
        }

        return candleData;
      } else if (response.data?.status === 'error') {
        console.error(`❌ TwelveData API error for ${symbol}:`, response.data.message);
        console.error('API response:', JSON.stringify(response.data, null, 2));
      }
    } catch (error: any) {
      console.error(`Error fetching candles from TwelveData for ${symbol}:`, error.message);
    }

    // If API fails, check for ANY cached data (even if expired) as fallback
    const anyCached = await db
      .select()
      .from(candles)
      .where(
        and(
          eq(candles.symbol, symbol),
          eq(candles.interval, interval)
        )
      )
      .limit(limit);

    if (anyCached.length > 0) {
      console.log(`Using expired cache for ${symbol} ${interval} (${anyCached.length} candles)`);
      return anyCached;
    }

    // No data available
    console.log(`No candle data available for ${symbol} ${interval}`);
    return [];
  }

  static async getCurrentPrice(symbol: string): Promise<number> {
    const quote = await this.getQuote(symbol);
    return quote.bid;
  }

  static async getCurrentPriceWithTimestamp(symbol: string): Promise<{ price: number; timestamp: Date }> {
    const quote = await this.getQuote(symbol);
    return { price: quote.bid, timestamp: quote.timestamp };
  }

  static async getSymbolInfo(symbol: string) {
    const [symbolInfo] = await db
      .select()
      .from(symbols)
      .where(eq(symbols.symbol, symbol))
      .limit(1);

    if (!symbolInfo) {
      return null;
    }

    return {
      symbol: symbolInfo.symbol,
      name: symbolInfo.name,
      type: symbolInfo.type,
      exchangeTimezone: symbolInfo.exchangeTimezone,
      tradingHours: symbolInfo.tradingHours,
      exchange: symbolInfo.exchange,
      digits: symbolInfo.digits,
      spread: symbolInfo.spread,
    };
  }

  static async getMarketStatus(symbol: string) {
    const symbolInfo = await this.getSymbolInfo(symbol);

    if (!symbolInfo) {
      return {
        isOpen: false,
        timezone: 'UTC',
      };
    }

    const isOpen = isMarketOpen(
      symbolInfo.type,
      symbolInfo.exchangeTimezone,
      symbolInfo.tradingHours as any
    );

    return {
      isOpen,
      timezone: symbolInfo.exchangeTimezone || 'UTC',
    };
  }
}
