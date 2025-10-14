import axios from 'axios';
import { db } from '../db';
import { symbols, candles } from '@shared/schema';
import { eq, and, gte } from 'drizzle-orm';

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
    };
  }

  static async getCandles(symbol: string, interval: string = '1h', limit: number = 100) {
    // Check cache first
    const cached = await db
      .select()
      .from(candles)
      .where(
        and(
          eq(candles.symbol, symbol),
          eq(candles.interval, interval),
          gte(candles.cachedAt, new Date(Date.now() - 3600000)) // 1 hour cache
        )
      )
      .limit(limit);

    if (cached.length > 0) {
      return cached;
    }

    // Get the twelve_data_symbol from database
    const [symbolRecord] = await db
      .select({ twelveDataSymbol: symbols.twelveDataSymbol })
      .from(symbols)
      .where(eq(symbols.symbol, symbol))
      .limit(1);

    const apiSymbol = symbolRecord?.twelveDataSymbol || symbol;

    // Fetch from API
    try {
      const response = await axios.get('https://api.twelvedata.com/time_series', {
        params: {
          symbol: apiSymbol,
          interval,
          outputsize: limit,
          apikey: TWELVE_DATA_API_KEY,
        },
      });

      if (response.data?.values) {
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

        // Cache candles - delete existing entries first to avoid duplicate key errors
        try {
          await db.delete(candles).where(
            and(
              eq(candles.symbol, symbol),
              eq(candles.interval, interval)
            )
          );
          await db.insert(candles).values(candleData);
        } catch (error) {
          console.error('Error caching candles:', error);
        }

        return candleData;
      }
    } catch (error) {
      console.error('Error fetching candles:', error);
    }

    // Return mock data
    return [];
  }

  static async getCurrentPrice(symbol: string): Promise<number> {
    const quote = await this.getQuote(symbol);
    return quote.bid;
  }
}
