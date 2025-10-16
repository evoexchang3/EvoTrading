import { db } from '../db';
import { economicEvents, type EconomicEvent, type InsertEconomicEvent } from "@shared/schema";
import { eq, gte, and } from "drizzle-orm";

const EODHD_API_KEY = process.env.EODHD_API_KEY;
const EODHD_BASE_URL = "https://eodhd.com/api";
const CACHE_DURATION_HOURS = 24;

interface EODHDEconomicEvent {
  date: string;
  country: string;
  type: string; // This is the event name (e.g., "CPI", "NFP")
  period?: string;
  actual?: number | string | null;
  previous?: number | string | null;
  estimate?: number | string | null;
  change?: number | string | null;
  change_percentage?: number | string | null;
  comparison?: string | null;
  currency?: string;
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
    if (!EODHD_API_KEY) {
      console.warn("EODHD_API_KEY not configured, returning empty calendar");
      return [];
    }

    const from = startDate || new Date().toISOString().split('T')[0];
    const to = endDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const events = await this.fetchFromEODHD(from, to);
    console.log(`Fetched ${events.length} events from EODHD economic calendar`);
    return events;
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

      // Filter out events with missing required fields
      const validEvents = data.filter(event => 
        event.date && event.country && event.type
      );

      console.log(`Received ${data.length} events, ${validEvents.length} valid events from EODHD`);

      return validEvents.map(event => ({
        id: '',
        eventId: `eodhd_${event.date}_${event.country}_${event.type.replace(/\s/g, '_')}`,
        datetime: new Date(event.date),
        country: event.country,
        currency: event.currency || this.getCurrencyFromCountry(event.country),
        event: event.type, // EODHD uses 'type' field for event name
        impact: 'medium', // EODHD doesn't provide importance/impact in this endpoint
        forecast: event.estimate?.toString() || null,
        previous: event.previous?.toString() || null,
        actual: event.actual?.toString() || null,
        source: 'eodhd',
        cachedAt: new Date(),
      }));
    } catch (error) {
      console.error("Failed to fetch economic calendar from EODHD:", error);
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
