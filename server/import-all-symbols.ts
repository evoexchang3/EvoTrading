import axios from 'axios';
import { db } from './db';
import { symbols } from '@shared/schema';
import { eq } from 'drizzle-orm';
import { DEFAULT_EXCHANGE_HOURS } from './services/market-hours.service';

const TWELVE_DATA_API_KEY = process.env.TWELVEDATA_API_KEY;

// Helper function to get exchange timezone and hours
function getExchangeInfo(exchange: string | null | undefined) {
  if (!exchange) return { timezone: null, tradingHours: null };
  
  const exchangeInfo = DEFAULT_EXCHANGE_HOURS[exchange.toUpperCase()];
  if (exchangeInfo) {
    return {
      timezone: exchangeInfo.timezone,
      tradingHours: exchangeInfo.hours
    };
  }
  
  return { timezone: null, tradingHours: null };
}

async function importAllForexPairs() {
  console.log('Importing ALL forex pairs...');
  
  try {
    const response = await axios.get<{ data: any[] }>(
      'https://api.twelvedata.com/forex_pairs',
      { params: { apikey: TWELVE_DATA_API_KEY } }
    );

    const forexPairs = response.data.data;
    console.log(`Found ${forexPairs.length} forex pairs - importing all...`);

    for (const pair of forexPairs) {
      const symbolCode = pair.symbol.replace('/', '');
      
      try {
        const existing = await db.select().from(symbols).where(eq(symbols.symbol, symbolCode)).limit(1);
        
        if (existing.length === 0) {
          await db.insert(symbols).values({
            symbol: symbolCode,
            twelveDataSymbol: pair.symbol, // Store original format: EUR/USD
            name: `${pair.currency_base} vs ${pair.currency_quote}`,
            type: 'forex',
            digits: 5,
            contractSize: '100000',
            minLot: '0.01',
            maxLot: '100',
            lotStep: '0.01',
            spread: '0.00002',
            currency: pair.currency_base,
            isActive: true,
          });
        }
      } catch (error) {
        // Skip errors for individual symbols
      }
    }
    
    console.log(`✓ Completed forex import`);
  } catch (error) {
    console.error('Error importing forex pairs:', error);
  }
}

async function importAllCryptocurrencies() {
  console.log('Importing ALL cryptocurrencies...');
  
  try {
    const response = await axios.get<{ data: any[] }>(
      'https://api.twelvedata.com/cryptocurrencies',
      { params: { apikey: TWELVE_DATA_API_KEY } }
    );

    const cryptos = response.data.data;
    console.log(`Found ${cryptos.length} cryptocurrencies - importing all...`);

    for (const crypto of cryptos) {
      const symbolCode = crypto.symbol.replace('/', '');
      
      try {
        const existing = await db.select().from(symbols).where(eq(symbols.symbol, symbolCode)).limit(1);
        
        if (existing.length === 0) {
          await db.insert(symbols).values({
            symbol: symbolCode,
            twelveDataSymbol: crypto.symbol, // Store original format: BTC/USD
            name: `${crypto.currency_base} vs ${crypto.currency_quote}`,
            type: 'crypto',
            digits: 2,
            contractSize: '1',
            minLot: '0.01',
            maxLot: '1000',
            lotStep: '0.01',
            spread: '0.5',
            currency: crypto.currency_base,
            isActive: true,
          });
        }
      } catch (error) {
        // Skip errors for individual symbols
      }
    }
    
    console.log(`✓ Completed crypto import`);
  } catch (error) {
    console.error('Error importing cryptocurrencies:', error);
  }
}

async function importAllETFs() {
  console.log('Importing ALL ETFs...');
  
  try {
    const response = await axios.get<{ data: any[] }>(
      'https://api.twelvedata.com/etf',
      { params: { apikey: TWELVE_DATA_API_KEY } }
    );

    const etfs = response.data.data;
    console.log(`Found ${etfs.length} ETFs - importing all...`);

    for (const etf of etfs) {
      try {
        const existing = await db.select().from(symbols).where(eq(symbols.symbol, etf.symbol)).limit(1);
        
        if (existing.length === 0) {
          const exchangeInfo = getExchangeInfo(etf.exchange);
          await db.insert(symbols).values({
            symbol: etf.symbol,
            twelveDataSymbol: etf.symbol,
            name: etf.name,
            type: 'etf',
            digits: 2,
            contractSize: '1',
            minLot: '1',
            maxLot: '10000',
            lotStep: '1',
            spread: '0.01',
            exchange: etf.exchange,
            exchangeTimezone: exchangeInfo.timezone,
            tradingHours: exchangeInfo.tradingHours as any,
            country: etf.country,
            currency: etf.currency,
            isActive: true,
          });
        }
      } catch (error) {
        // Skip errors for individual symbols
      }
    }
    
    console.log(`✓ Completed ETF import`);
  } catch (error) {
    console.error('Error importing ETFs:', error);
  }
}

async function importAllStocks() {
  console.log('Importing ALL stocks (this will take a while)...');
  
  const exchanges = ['NASDAQ', 'NYSE', 'LSE', 'JPX', 'SSE', 'HKEX', 'Euronext', 'TSX'];
  
  for (const exchange of exchanges) {
    try {
      console.log(`  Importing ${exchange} stocks...`);
      const response = await axios.get<{ data: any[] }>(
        'https://api.twelvedata.com/stocks',
        { params: { apikey: TWELVE_DATA_API_KEY, exchange } }
      );

      const stocks = response.data.data;
      console.log(`  Found ${stocks.length} stocks on ${exchange}`);

      for (const stock of stocks) {
        try {
          const existing = await db.select().from(symbols).where(eq(symbols.symbol, stock.symbol)).limit(1);
          
          if (existing.length === 0) {
            const exchangeInfo = getExchangeInfo(stock.exchange);
            await db.insert(symbols).values({
              symbol: stock.symbol,
              twelveDataSymbol: stock.symbol,
              name: stock.name,
              type: 'stock',
              digits: 2,
              contractSize: '1',
              minLot: '1',
              maxLot: '10000',
              lotStep: '1',
              spread: '0.01',
              exchange: stock.exchange,
              exchangeTimezone: exchangeInfo.timezone,
              tradingHours: exchangeInfo.tradingHours as any,
              country: stock.country,
              currency: stock.currency,
              isActive: true,
            });
          }
        } catch (error) {
          // Skip errors for individual symbols
        }
      }
      
      console.log(`  ✓ Completed ${exchange}`);
    } catch (error) {
      console.error(`  Error importing ${exchange}:`, error);
    }
  }
  
  console.log(`✓ Completed all stock imports`);
}

async function importAllCommodities() {
  console.log('Importing commodities...');
  
  // Extended commodity list
  const commodities = [
    // Precious metals
    { symbol: 'XAUUSD', name: 'Gold vs US Dollar', digits: 2 },
    { symbol: 'XAGUSD', name: 'Silver vs US Dollar', digits: 3 },
    { symbol: 'XPTUSD', name: 'Platinum vs US Dollar', digits: 2 },
    { symbol: 'XPDUSD', name: 'Palladium vs US Dollar', digits: 2 },
    
    // Energy
    { symbol: 'XTIUSD', name: 'WTI Crude Oil', digits: 2 },
    { symbol: 'XBRUSD', name: 'Brent Crude Oil', digits: 2 },
    { symbol: 'XNGUSD', name: 'Natural Gas', digits: 3 },
    
    // Base metals
    { symbol: 'COPPER', name: 'Copper', digits: 5 },
    { symbol: 'ALUMINUM', name: 'Aluminum', digits: 2 },
    { symbol: 'ZINC', name: 'Zinc', digits: 2 },
    { symbol: 'NICKEL', name: 'Nickel', digits: 2 },
    { symbol: 'LEAD', name: 'Lead', digits: 2 },
    
    // Agricultural
    { symbol: 'CORN', name: 'Corn', digits: 2 },
    { symbol: 'WHEAT', name: 'Wheat', digits: 2 },
    { symbol: 'SOYBEAN', name: 'Soybean', digits: 2 },
    { symbol: 'SUGAR', name: 'Sugar', digits: 2 },
    { symbol: 'COFFEE', name: 'Coffee', digits: 2 },
    { symbol: 'COTTON', name: 'Cotton', digits: 2 },
    { symbol: 'COCOA', name: 'Cocoa', digits: 2 },
  ];

  for (const commodity of commodities) {
    try {
      const existing = await db.select().from(symbols).where(eq(symbols.symbol, commodity.symbol)).limit(1);
      
      if (existing.length === 0) {
        await db.insert(symbols).values({
          symbol: commodity.symbol,
          twelveDataSymbol: commodity.symbol,
          name: commodity.name,
          type: 'commodity',
          digits: commodity.digits,
          contractSize: '100',
          minLot: '0.01',
          maxLot: '100',
          lotStep: '0.01',
          spread: '0.01',
          isActive: true,
        });
      }
    } catch (error) {
      // Skip errors for individual symbols
    }
  }
  
  console.log(`✓ Completed commodity import`);
}

async function importAllIndices() {
  console.log('Importing indices...');
  
  const indices = [
    // US Indices
    { symbol: 'SPX', name: 'S&P 500 Index' },
    { symbol: 'DJI', name: 'Dow Jones Industrial Average' },
    { symbol: 'IXIC', name: 'NASDAQ Composite' },
    { symbol: 'NDX', name: 'NASDAQ 100' },
    { symbol: 'RUT', name: 'Russell 2000' },
    { symbol: 'VIX', name: 'CBOE Volatility Index' },
    { symbol: 'US500', name: 'US 500 CFD' },
    { symbol: 'US30', name: 'US 30 CFD' },
    { symbol: 'US100', name: 'US Tech 100 CFD' },
    
    // European Indices
    { symbol: 'FTSE', name: 'FTSE 100' },
    { symbol: 'DAX', name: 'DAX 30' },
    { symbol: 'CAC40', name: 'CAC 40' },
    { symbol: 'GER30', name: 'Germany 30 CFD' },
    { symbol: 'DE40', name: 'Germany 40 CFD' },
    { symbol: 'UK100', name: 'UK 100 CFD' },
    { symbol: 'FR40', name: 'France 40 CFD' },
    { symbol: 'ES35', name: 'Spain 35 CFD' },
    { symbol: 'EU50', name: 'Euro Stoxx 50 CFD' },
    
    // Asian Indices
    { symbol: 'N225', name: 'Nikkei 225' },
    { symbol: 'HSI', name: 'Hang Seng Index' },
    { symbol: 'SSEC', name: 'Shanghai Composite' },
    { symbol: 'ASX200', name: 'ASX 200' },
    { symbol: 'JP225', name: 'Japan 225 CFD' },
    { symbol: 'JPN225', name: 'Japan 225 Index' },
    { symbol: 'AUS200', name: 'Australia 200 CFD' },
    { symbol: 'HK50', name: 'Hong Kong 50 CFD' },
    { symbol: 'CHINA50', name: 'China A50 CFD' },
    { symbol: 'NGAS', name: 'Natural Gas CFD' },
  ];

  for (const index of indices) {
    try {
      const existing = await db.select().from(symbols).where(eq(symbols.symbol, index.symbol)).limit(1);
      
      if (existing.length === 0) {
        await db.insert(symbols).values({
          symbol: index.symbol,
          twelveDataSymbol: index.symbol,
          name: index.name,
          type: 'index',
          digits: 2,
          contractSize: '1',
          minLot: '0.1',
          maxLot: '100',
          lotStep: '0.1',
          spread: '0.5',
          isActive: true,
        });
      }
    } catch (error) {
      // Skip errors for individual symbols
    }
  }
  
  console.log(`✓ Completed index import`);
}

async function main() {
  console.log('='.repeat(60));
  console.log('IMPORTING ALL AVAILABLE SYMBOLS FROM TWELVE DATA');
  console.log('This includes 100,000+ symbols across all asset classes');
  console.log('='.repeat(60));
  console.log('');
  
  // Import in order of priority
  await importAllForexPairs();
  console.log('');
  
  await importAllCryptocurrencies();
  console.log('');
  
  await importAllCommodities();
  console.log('');
  
  await importAllIndices();
  console.log('');
  
  await importAllETFs();
  console.log('');
  
  await importAllStocks();
  console.log('');
  
  const totalSymbols = await db.select().from(symbols);
  console.log('='.repeat(60));
  console.log(`✓ IMPORT COMPLETE! Total symbols in database: ${totalSymbols.length}`);
  console.log('='.repeat(60));
  
  process.exit(0);
}

main().catch((error) => {
  console.error('Import failed:', error);
  process.exit(1);
});
