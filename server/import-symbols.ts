import axios from 'axios';
import { db } from './db';
import { symbols } from '@shared/schema';
import { eq } from 'drizzle-orm';

const TWELVE_DATA_API_KEY = process.env.TWELVEDATA_API_KEY;

interface TwelveDataForexPair {
  symbol: string;
  currency_group: string;
  currency_base: string;
  currency_quote: string;
}

interface TwelveDataCrypto {
  symbol: string;
  available_exchanges: string[];
  currency_base: string;
  currency_quote: string;
}

interface TwelveDataSymbol {
  symbol: string;
  name: string;
  currency?: string;
  country?: string;
  type?: string;
}

async function importForexPairs() {
  console.log('Importing forex pairs...');
  
  try {
    const response = await axios.get<{ data: TwelveDataForexPair[] }>(
      'https://api.twelvedata.com/forex_pairs',
      { params: { apikey: TWELVE_DATA_API_KEY } }
    );

    const forexPairs = response.data.data;
    console.log(`Found ${forexPairs.length} forex pairs`);

    // Import ALL forex pairs (Twelve Data Ultra plan provides thousands)
    console.log(`Importing all ${forexPairs.length} forex pairs...`);

    for (const pair of forexPairs) {
      const symbolCode = pair.symbol.replace('/', '');
      
      try {
        const existing = await db.select().from(symbols).where(eq(symbols.symbol, symbolCode)).limit(1);
        
        if (existing.length === 0) {
          await db.insert(symbols).values({
            symbol: symbolCode,
            name: `${pair.currency_base} vs ${pair.currency_quote}`,
            type: 'forex',
            digits: 5,
            contractSize: '100000',
            minLot: '0.01',
            maxLot: '100',
            lotStep: '0.01',
            spread: '0.00002',
            isActive: true,
          });
          console.log(`✓ Added ${symbolCode}`);
        }
      } catch (error) {
        console.error(`✗ Error adding ${symbolCode}:`, error);
      }
    }
  } catch (error) {
    console.error('Error importing forex pairs:', error);
  }
}

async function importCryptocurrencies() {
  console.log('Importing cryptocurrencies...');
  
  try {
    const response = await axios.get<{ data: TwelveDataCrypto[] }>(
      'https://api.twelvedata.com/cryptocurrencies',
      { params: { apikey: TWELVE_DATA_API_KEY } }
    );

    const cryptos = response.data.data;
    console.log(`Found ${cryptos.length} cryptocurrencies`);

    // Import ALL cryptocurrencies (Twelve Data Ultra plan provides extensive coverage)
    console.log(`Importing all ${cryptos.length} cryptocurrencies...`);

    for (const crypto of cryptos) {
      const symbolCode = crypto.symbol.replace('/', '');
      
      try {
        const existing = await db.select().from(symbols).where(eq(symbols.symbol, symbolCode)).limit(1);
        
        if (existing.length === 0) {
          await db.insert(symbols).values({
            symbol: symbolCode,
            name: `${crypto.currency_base} vs ${crypto.currency_quote}`,
            type: 'crypto',
            digits: 2,
            contractSize: '1',
            minLot: '0.01',
            maxLot: '1000',
            lotStep: '0.01',
            spread: '0.5',
            isActive: true,
          });
          console.log(`✓ Added ${symbolCode}`);
        }
      } catch (error) {
        console.error(`✗ Error adding ${symbolCode}:`, error);
      }
    }
  } catch (error) {
    console.error('Error importing cryptocurrencies:', error);
  }
}

async function importCommodities() {
  console.log('Importing commodities...');
  
  // Twelve Data uses specific symbols for commodities
  const commodities = [
    { symbol: 'XAUUSD', name: 'Gold vs US Dollar', digits: 2 },
    { symbol: 'XAGUSD', name: 'Silver vs US Dollar', digits: 3 },
    { symbol: 'XPTUSD', name: 'Platinum vs US Dollar', digits: 2 },
    { symbol: 'XPDUSD', name: 'Palladium vs US Dollar', digits: 2 },
    { symbol: 'XTIUSD', name: 'WTI Crude Oil', digits: 2 },
    { symbol: 'XBRUSD', name: 'Brent Crude Oil', digits: 2 },
    { symbol: 'XNGUSD', name: 'Natural Gas', digits: 3 },
    { symbol: 'COPPER', name: 'Copper', digits: 5 },
  ];

  for (const commodity of commodities) {
    try {
      const existing = await db.select().from(symbols).where(eq(symbols.symbol, commodity.symbol)).limit(1);
      
      if (existing.length === 0) {
        await db.insert(symbols).values({
          symbol: commodity.symbol,
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
        console.log(`✓ Added ${commodity.symbol}`);
      }
    } catch (error) {
      console.error(`✗ Error adding ${commodity.symbol}:`, error);
    }
  }
}

async function importIndices() {
  console.log('Importing indices...');
  
  // Comprehensive stock indices available on Twelve Data
  const indices = [
    { symbol: 'SPX', name: 'S&P 500 Index' },
    { symbol: 'DJI', name: 'Dow Jones Industrial Average' },
    { symbol: 'IXIC', name: 'NASDAQ Composite' },
    { symbol: 'NDX', name: 'NASDAQ 100' },
    { symbol: 'RUT', name: 'Russell 2000' },
    { symbol: 'VIX', name: 'CBOE Volatility Index' },
    { symbol: 'FTSE', name: 'FTSE 100' },
    { symbol: 'DAX', name: 'DAX 30' },
    { symbol: 'CAC40', name: 'CAC 40' },
    { symbol: 'N225', name: 'Nikkei 225' },
    { symbol: 'HSI', name: 'Hang Seng Index' },
    { symbol: 'SSEC', name: 'Shanghai Composite' },
    { symbol: 'ASX200', name: 'ASX 200' },
    { symbol: 'US500', name: 'US 500 CFD' },
    { symbol: 'US30', name: 'US 30 CFD' },
    { symbol: 'US100', name: 'US Tech 100 CFD' },
    { symbol: 'GER30', name: 'Germany 30 CFD' },
    { symbol: 'DE40', name: 'Germany 40 CFD' },
    { symbol: 'UK100', name: 'UK 100 CFD' },
    { symbol: 'FR40', name: 'France 40 CFD' },
    { symbol: 'ES35', name: 'Spain 35 CFD' },
    { symbol: 'EU50', name: 'Euro Stoxx 50 CFD' },
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
        console.log(`✓ Added ${index.symbol}`);
      }
    } catch (error) {
      console.error(`✗ Error adding ${index.symbol}:`, error);
    }
  }
}

async function main() {
  console.log('Starting symbol import from Twelve Data...\n');
  
  await importForexPairs();
  console.log('');
  
  await importCryptocurrencies();
  console.log('');
  
  await importCommodities();
  console.log('');
  
  await importIndices();
  console.log('');
  
  const totalSymbols = await db.select().from(symbols);
  console.log(`\n✓ Import complete! Total symbols in database: ${totalSymbols.length}`);
  
  process.exit(0);
}

main().catch((error) => {
  console.error('Import failed:', error);
  process.exit(1);
});
