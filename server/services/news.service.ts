import { db } from '../db';
import { newsArticles, type NewsArticle, type InsertNewsArticle } from "@shared/schema";
import { gte, eq, and } from "drizzle-orm";

const MARKETAUX_API_KEY = process.env.MARKETAUX_API_KEY;
const MARKETAUX_BASE_URL = "https://api.marketaux.com/v1";
const CACHE_DURATION_HOURS = 6;

interface MarketauxArticle {
  uuid: string;
  title: string;
  description: string;
  url: string;
  published_at: string;
  source: string;
  sentiment?: string;
  entities?: Array<{
    symbol?: string;
    name?: string;
  }>;
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

    const allSymbols = [
      'EURUSD', 'GBPUSD', 'USDJPY', 'AUDUSD', 'USDCAD', 'USDCHF',
      'BTC-USD', 'ETH-USD', 'XRP-USD', 'ADA-USD', 'SOL-USD',
      'XAUUSD', 'XAGUSD', 'USOIL', 'UKOIL',
      'SPY', 'QQQ', 'DIA', 'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA'
    ];
    const url = `${MARKETAUX_BASE_URL}/news/all?api_token=${MARKETAUX_API_KEY}&symbols=${allSymbols.join(',')}&filter_entities=true&language=en&limit=50`;

    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        console.error(`Marketaux API error: ${response.status} ${response.statusText}`);
        return [];
      }

      const data: MarketauxResponse = await response.json();

      return data.data.map(article => ({
        id: '',
        newsId: article.uuid,
        publishedAt: new Date(article.published_at),
        title: article.title,
        summary: article.description || null,
        source: article.source,
        url: article.url,
        sentiment: article.sentiment?.toLowerCase() || 'neutral',
        symbols: article.entities?.map(e => e.symbol).filter(Boolean) as string[] || [],
        category: this.deriveCategory(article.entities || []),
        cachedAt: new Date(),
      }));
    } catch (error) {
      console.error("Failed to fetch news from Marketaux:", error);
      return [];
    }
  }

  private deriveCategory(entities: Array<{ symbol?: string; name?: string }>): string {
    const symbols = entities.map(e => e.symbol).filter(Boolean);
    
    const forexPairs = ['EURUSD', 'GBPUSD', 'USDJPY', 'AUDUSD', 'USDCAD', 'USDCHF', 'EURGBP', 'EURJPY', 'GBPJPY'];
    const cryptoSymbols = ['BTC-USD', 'ETH-USD', 'XRP-USD', 'ADA-USD', 'SOL-USD', 'BTC', 'ETH', 'XRP', 'ADA', 'SOL', 'DOGE', 'MATIC', 'DOT', 'AVAX', 'LINK'];
    const commoditySymbols = ['XAUUSD', 'XAGUSD', 'USOIL', 'UKOIL', 'GOLD', 'SILVER', 'OIL', 'CRUDE'];
    const stockSymbols = ['SPY', 'QQQ', 'DIA', 'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NVDA', 'AMD', 'NFLX', 'BABA'];
    
    for (const symbol of symbols) {
      if (cryptoSymbols.some(c => symbol?.toUpperCase().includes(c))) {
        return 'crypto';
      }
      if (commoditySymbols.some(c => symbol?.toUpperCase().includes(c))) {
        return 'commodities';
      }
      if (stockSymbols.some(s => symbol?.toUpperCase() === s)) {
        return 'stocks';
      }
      if (forexPairs.some(f => symbol?.toUpperCase() === f)) {
        return 'forex';
      }
    }
    
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
