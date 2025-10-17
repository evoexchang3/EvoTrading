import { db } from '../db';
import { newsArticles, type NewsArticle, type InsertNewsArticle } from "@shared/schema";
import { gte, eq, and } from "drizzle-orm";

const MARKETAUX_API_KEY = process.env.MARKETAUX_API_KEY;
const MARKETAUX_BASE_URL = "https://api.marketaux.com/v1";
const CACHE_DURATION_HOURS = 6;

interface MarketauxEntity {
  symbol: string;
  name: string;
  exchange?: string | null;
  exchange_long?: string | null;
  country: string;
  type: string; // equity, cryptocurrency, currency, commodity, index
  industry?: string;
  match_score: number;
  sentiment_score: number;
  highlights?: Array<{
    highlight: string;
    sentiment: number;
    highlighted_in: string;
  }>;
}

interface MarketauxArticle {
  uuid: string;
  title: string;
  description: string;
  url: string;
  published_at: string;
  source: string;
  image_url?: string;
  entities: MarketauxEntity[];
}

interface MarketauxResponse {
  data: MarketauxArticle[];
  meta?: {
    found: number;
    returned: number;
    limit: number;
  };
}

export class NewsService {
  async getForexNews(
    category?: string,
    sentiment?: string,
    limit: number = 20
  ): Promise<NewsArticle[]> {
    const cacheExpiry = new Date(Date.now() - CACHE_DURATION_HOURS * 60 * 60 * 1000);
    
    const conditions = [gte(newsArticles.cachedAt, cacheExpiry)];
    if (category) conditions.push(eq(newsArticles.category, category));
    if (sentiment) conditions.push(eq(newsArticles.sentiment, sentiment));

    const cachedNews = await db
      .select()
      .from(newsArticles)
      .where(and(...conditions))
      .execute();

    if (cachedNews.length > 0) {
      return cachedNews.slice(0, limit);
    }

    const freshNews = await this.fetchFromAPI();
    
    if (freshNews.length > 0) {
      await this.cacheNews(freshNews);
    }

    const filteredConditions = [];
    if (category) filteredConditions.push((n: NewsArticle) => n.category === category);
    if (sentiment) filteredConditions.push((n: NewsArticle) => n.sentiment === sentiment);

    let filtered = freshNews;
    for (const condition of filteredConditions) {
      filtered = filtered.filter(condition);
    }

    return filtered.slice(0, limit);
  }

  private async fetchFromAPI(): Promise<NewsArticle[]> {
    if (!MARKETAUX_API_KEY) {
      console.warn("MARKETAUX_API_KEY not configured, returning empty news");
      return [];
    }

    try {
      // Make parallel API calls for each category to ensure balanced coverage
      // Note: Marketaux doesn't have 'commodity' as entity_type, so we query by symbols
      const [stocksData, cryptoData, forexData, commoditiesData] = await Promise.all([
        this.fetchCategoryNews('equity', 15),
        this.fetchCategoryNews('cryptocurrency', 10),
        this.fetchCategoryNews('currency', 10),
        this.fetchCommodityNews(10), // Special handler for commodities
      ]);

      // Combine all articles
      const allArticles = [
        ...stocksData.map(a => ({ ...a, forcedCategory: 'stocks' as const })),
        ...cryptoData.map(a => ({ ...a, forcedCategory: 'crypto' as const })),
        ...forexData.map(a => ({ ...a, forcedCategory: 'forex' as const })),
        ...commoditiesData.map(a => ({ ...a, forcedCategory: 'commodities' as const })),
      ];

      // Deduplicate by newsId
      const uniqueArticles = new Map<string, typeof allArticles[0]>();
      for (const article of allArticles) {
        if (!uniqueArticles.has(article.uuid)) {
          uniqueArticles.set(article.uuid, article);
        }
      }

      console.log(`Fetched news: ${stocksData.length} stocks, ${cryptoData.length} crypto, ${forexData.length} forex, ${commoditiesData.length} commodities (${uniqueArticles.size} unique)`);

      // Convert to NewsArticle format
      return Array.from(uniqueArticles.values()).map(article => ({
        id: '',
        newsId: article.uuid,
        publishedAt: new Date(article.published_at),
        title: article.title,
        summary: article.description || null,
        source: article.source,
        url: article.url,
        sentiment: this.calculateSentiment(article.entities),
        symbols: article.entities.map(e => e.symbol).filter(Boolean),
        category: article.forcedCategory, // Use forced category for guaranteed distribution
        cachedAt: new Date(),
      }));
    } catch (error) {
      console.error("Failed to fetch news from Marketaux:", error);
      return [];
    }
  }

  private async fetchCategoryNews(entityType: string, limit: number): Promise<MarketauxArticle[]> {
    const url = `${MARKETAUX_BASE_URL}/news/all?api_token=${MARKETAUX_API_KEY}&entity_types=${entityType}&must_have_entities=true&language=en&limit=${limit}`;

    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        console.error(`Marketaux API error for ${entityType}: ${response.status} ${response.statusText}`);
        return [];
      }

      const data: MarketauxResponse = await response.json();
      return data.data;
    } catch (error) {
      console.error(`Failed to fetch ${entityType} news from Marketaux:`, error);
      return [];
    }
  }

  private async fetchCommodityNews(limit: number): Promise<MarketauxArticle[]> {
    // Marketaux doesn't have 'commodity' entity type, so we query by commodity symbols
    const commoditySymbols = ['XAUUSD', 'XAGUSD', 'USOIL', 'UKOIL', 'GC', 'SI', 'CL'];
    const url = `${MARKETAUX_BASE_URL}/news/all?api_token=${MARKETAUX_API_KEY}&symbols=${commoditySymbols.join(',')}&filter_entities=true&language=en&limit=${limit}`;

    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        console.error(`Marketaux API error for commodities: ${response.status} ${response.statusText}`);
        return [];
      }

      const data: MarketauxResponse = await response.json();
      return data.data;
    } catch (error) {
      console.error(`Failed to fetch commodity news from Marketaux:`, error);
      return [];
    }
  }

  private calculateSentiment(entities: MarketauxEntity[]): string {
    if (!entities || entities.length === 0) return 'neutral';
    
    // Calculate average sentiment from all entities
    const avgSentiment = entities.reduce((sum, entity) => sum + entity.sentiment_score, 0) / entities.length;
    
    // Classify based on sentiment score (-1 to +1 scale)
    if (avgSentiment > 0.1) return 'positive';
    if (avgSentiment < -0.1) return 'negative';
    return 'neutral';
  }

  private deriveCategoryFromEntities(entities: MarketauxEntity[], title: string = '', description: string = ''): string {
    if (!entities || entities.length === 0) return 'general';
    
    // Count entity types to determine dominant category
    const typeCounts: Record<string, number> = {};
    
    for (const entity of entities) {
      const type = entity.type?.toLowerCase();
      if (type) {
        typeCounts[type] = (typeCounts[type] || 0) + 1;
      }
    }
    
    // Map entity types to our categories
    if (typeCounts['cryptocurrency'] > 0) return 'crypto';
    if (typeCounts['currency'] > 0) return 'forex';
    if (typeCounts['commodity'] > 0) return 'commodities';
    if (typeCounts['equity'] > 0 || typeCounts['index'] > 0) return 'stocks';
    
    // Fallback to keyword matching
    const text = `${title} ${description}`.toUpperCase();
    const forexKeywords = ['FOREX', 'CURRENCY', 'EUR/USD', 'GBP/USD', 'USD/JPY', 'EXCHANGE RATE', 'FX MARKET', 'DOLLAR', 'EURO', 'POUND', 'YEN'];
    const cryptoKeywords = ['BITCOIN', 'CRYPTOCURRENCY', 'CRYPTO', 'ETHEREUM', 'BLOCKCHAIN', 'NFT', 'DEFI', 'ALTCOIN', 'BTC', 'ETH'];
    const commodityKeywords = ['GOLD', 'SILVER', 'OIL', 'CRUDE', 'COMMODITY', 'COMMODITIES', 'PRECIOUS METALS', 'ENERGY', 'BRENT', 'WTI'];
    
    if (cryptoKeywords.some(keyword => text.includes(keyword))) return 'crypto';
    if (commodityKeywords.some(keyword => text.includes(keyword))) return 'commodities';
    if (forexKeywords.some(keyword => text.includes(keyword))) return 'forex';
    
    return 'general';
  }

  private async cacheNews(articles: NewsArticle[]): Promise<void> {
    try {
      await db.delete(newsArticles).execute();
      
      const insertData = articles.map(article => ({
        newsId: article.newsId,
        publishedAt: article.publishedAt,
        title: article.title,
        summary: article.summary,
        source: article.source,
        url: article.url,
        sentiment: article.sentiment,
        symbols: article.symbols,
        category: article.category,
      }));

      if (insertData.length > 0) {
        await db.insert(newsArticles).values(insertData).execute();
      }
    } catch (error) {
      console.error("Failed to cache news articles:", error);
    }
  }
}

export const newsService = new NewsService();
