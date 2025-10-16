import { db } from '../db';
import { economicEvents, type EconomicEvent, type InsertEconomicEvent } from "@shared/schema";
import { eq, gte, and } from "drizzle-orm";

const EODHD_API_KEY = process.env.EODHD_API_KEY;
const FMP_API_KEY = process.env.FMP_API_KEY;
const EODHD_BASE_URL = "https://eodhd.com/api";
const FMP_BASE_URL = "https://financialmodelingprep.com/api/v3";
const CACHE_DURATION_HOURS = 24;

interface EODHDEconomicEvent {
  date: string;
  country: string;
  event: string;
  type?: string;
  period?: string;
  actual?: string | null;
  previous?: string | null;
  forecast?: string | null;
  change?: string | null;
  change_percentage?: string | null;
  importance?: string;
  comparison?: string;
  currency?: string;
}

interface FMPEconomicEvent {
  date: string;
  country: string;
  event: string;
  currency?: string;
  actual?: string | number | null;
  previous?: string | number | null;
  estimate?: string | number | null;
  change?: string | number | null;
  changePercentage?: string | number | null;
  impact?: string;
}

export class EconomicService {
  async getEconomicCalendar(
    startDate?: string,
    endDate?: string,
    currency?: string,
    impact?: string
  ): Promise<EconomicEvent[]> {
    const cacheExpiry = new Date(Date.now() - CACHE_DURATION_HOURS * 60 * 60 * 1000);
    
    const conditions = [gte(economicEvents.cachedAt, cacheExpiry)];
    if (currency) conditions.push(eq(economicEvents.currency, currency));
    if (impact) conditions.push(eq(economicEvents.impact, impact));

    const cachedEvents = await db
      .select()
      .from(economicEvents)
      .where(and(...conditions))
      .execute();

    if (cachedEvents.length > 0) {
      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        return cachedEvents.filter((e: EconomicEvent) => {
          const eventDate = new Date(e.datetime);
          return eventDate >= start && eventDate <= end;
        });
      }
      
      return cachedEvents;
    }

    const freshEvents = await this.fetchFromAPI(startDate, endDate);
    
    if (freshEvents.length > 0) {
      await this.cacheEvents(freshEvents);
    }

    const filteredConditions = [];
    if (currency) filteredConditions.push((e: EconomicEvent) => e.currency === currency);
    if (impact) filteredConditions.push((e: EconomicEvent) => e.impact === impact);

    let filtered = freshEvents;
    for (const condition of filteredConditions) {
      filtered = filtered.filter(condition);
    }

    return filtered;
  }

  private async fetchFromAPI(startDate?: string, endDate?: string): Promise<EconomicEvent[]> {
    const from = startDate || new Date().toISOString().split('T')[0];
    const to = endDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    // Try EODHD first
    if (EODHD_API_KEY) {
      const eodhd = await this.fetchFromEODHD(from, to);
      if (eodhd.length > 0) {
        console.log(`Fetched ${eodhd.length} events from EODHD`);
        return eodhd;
      }
    }

    // Fallback to FMP
    if (FMP_API_KEY) {
      const fmp = await this.fetchFromFMP(from, to);
      if (fmp.length > 0) {
        console.log(`Fetched ${fmp.length} events from FMP`);
        return fmp;
      }
    }

    console.warn("No API keys configured or both APIs failed, returning empty calendar");
    return [];
  }

  private async fetchFromEODHD(from: string, to: string): Promise<EconomicEvent[]> {
    const url = `${EODHD_BASE_URL}/economic-events?api_token=${EODHD_API_KEY}&fmt=json&from=${from}&to=${to}`;

    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`EODHD API error: ${response.status} ${response.statusText}`, errorText);
        return [];
      }

      const data: EODHDEconomicEvent[] = await response.json();

      return data.map(event => ({
        id: '',
        eventId: `eodhd_${event.date}_${event.country}_${event.event.replace(/\s/g, '_')}`,
        datetime: new Date(event.date),
        country: event.country,
        currency: event.currency || this.getCurrencyFromCountry(event.country),
        event: event.event,
        impact: event.importance?.toLowerCase() || 'medium',
        forecast: event.forecast || null,
        previous: event.previous || null,
        actual: event.actual || null,
        source: 'eodhd',
        cachedAt: new Date(),
      }));
    } catch (error) {
      console.error("Failed to fetch economic calendar from EODHD:", error);
      return [];
    }
  }

  private async fetchFromFMP(from: string, to: string): Promise<EconomicEvent[]> {
    const url = `${FMP_BASE_URL}/economic_calendar?apikey=${FMP_API_KEY}&from=${from}&to=${to}`;

    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`FMP API error: ${response.status} ${response.statusText}`, errorText);
        return [];
      }

      const data: FMPEconomicEvent[] = await response.json();

      return data.map(event => ({
        id: '',
        eventId: `fmp_${event.date}_${event.country}_${event.event.replace(/\s/g, '_')}`,
        datetime: new Date(event.date),
        country: event.country,
        currency: event.currency || this.getCurrencyFromCountry(event.country),
        event: event.event,
        impact: event.impact?.toLowerCase() || 'medium',
        forecast: event.estimate?.toString() || null,
        previous: event.previous?.toString() || null,
        actual: event.actual?.toString() || null,
        source: 'fmp',
        cachedAt: new Date(),
      }));
    } catch (error) {
      console.error("Failed to fetch economic calendar from FMP:", error);
      return [];
    }
  }

  private async cacheEvents(events: EconomicEvent[]): Promise<void> {
    try {
      await db.delete(economicEvents).execute();
      
      const insertData = events.map(event => ({
        eventId: event.eventId,
        datetime: event.datetime,
        country: event.country,
        currency: event.currency,
        event: event.event,
        impact: event.impact,
        forecast: event.forecast,
        previous: event.previous,
        actual: event.actual,
        source: event.source,
      }));

      if (insertData.length > 0) {
        await db.insert(economicEvents).values(insertData).execute();
      }
    } catch (error) {
      console.error("Failed to cache economic events:", error);
    }
  }

  private getCurrencyFromCountry(country: string): string {
    const countryToCurrency: Record<string, string> = {
      'United States': 'USD',
      'USA': 'USD',
      'US': 'USD',
      'Eurozone': 'EUR',
      'Germany': 'EUR',
      'France': 'EUR',
      'Italy': 'EUR',
      'Spain': 'EUR',
      'United Kingdom': 'GBP',
      'UK': 'GBP',
      'Japan': 'JPY',
      'Switzerland': 'CHF',
      'Canada': 'CAD',
      'Australia': 'AUD',
      'New Zealand': 'NZD',
      'China': 'CNY',
    };

    return countryToCurrency[country] || 'USD';
  }
}

export const economicService = new EconomicService();
