import { db } from './db';
import { symbols } from '@shared/schema';

const tradingSymbols = [
  // Major Forex Pairs
  { symbol: 'EURUSD', name: 'Euro vs US Dollar', type: 'forex', digits: 5, contractSize: '100000', spread: '0.00002' },
  { symbol: 'GBPUSD', name: 'British Pound vs US Dollar', type: 'forex', digits: 5, contractSize: '100000', spread: '0.00003' },
  { symbol: 'USDJPY', name: 'US Dollar vs Japanese Yen', type: 'forex', digits: 3, contractSize: '100000', spread: '0.002' },
  { symbol: 'USDCHF', name: 'US Dollar vs Swiss Franc', type: 'forex', digits: 5, contractSize: '100000', spread: '0.00003' },
  { symbol: 'AUDUSD', name: 'Australian Dollar vs US Dollar', type: 'forex', digits: 5, contractSize: '100000', spread: '0.00003' },
  { symbol: 'USDCAD', name: 'US Dollar vs Canadian Dollar', type: 'forex', digits: 5, contractSize: '100000', spread: '0.00003' },
  { symbol: 'NZDUSD', name: 'New Zealand Dollar vs US Dollar', type: 'forex', digits: 5, contractSize: '100000', spread: '0.00003' },
  
  // Cross Pairs
  { symbol: 'EURJPY', name: 'Euro vs Japanese Yen', type: 'forex', digits: 3, contractSize: '100000', spread: '0.003' },
  { symbol: 'GBPJPY', name: 'British Pound vs Japanese Yen', type: 'forex', digits: 3, contractSize: '100000', spread: '0.004' },
  { symbol: 'EURGBP', name: 'Euro vs British Pound', type: 'forex', digits: 5, contractSize: '100000', spread: '0.00003' },
  { symbol: 'EURAUD', name: 'Euro vs Australian Dollar', type: 'forex', digits: 5, contractSize: '100000', spread: '0.00004' },
  { symbol: 'EURCAD', name: 'Euro vs Canadian Dollar', type: 'forex', digits: 5, contractSize: '100000', spread: '0.00004' },
  { symbol: 'GBPAUD', name: 'British Pound vs Australian Dollar', type: 'forex', digits: 5, contractSize: '100000', spread: '0.00005' },
  { symbol: 'GBPCAD', name: 'British Pound vs Canadian Dollar', type: 'forex', digits: 5, contractSize: '100000', spread: '0.00005' },
  { symbol: 'AUDCAD', name: 'Australian Dollar vs Canadian Dollar', type: 'forex', digits: 5, contractSize: '100000', spread: '0.00004' },
  { symbol: 'AUDJPY', name: 'Australian Dollar vs Japanese Yen', type: 'forex', digits: 3, contractSize: '100000', spread: '0.003' },
  { symbol: 'CADJPY', name: 'Canadian Dollar vs Japanese Yen', type: 'forex', digits: 3, contractSize: '100000', spread: '0.003' },
  { symbol: 'CHFJPY', name: 'Swiss Franc vs Japanese Yen', type: 'forex', digits: 3, contractSize: '100000', spread: '0.003' },
  { symbol: 'NZDJPY', name: 'New Zealand Dollar vs Japanese Yen', type: 'forex', digits: 3, contractSize: '100000', spread: '0.003' },
  { symbol: 'AUDNZD', name: 'Australian Dollar vs New Zealand Dollar', type: 'forex', digits: 5, contractSize: '100000', spread: '0.00004' },
  
  // Exotic Pairs
  { symbol: 'USDZAR', name: 'US Dollar vs South African Rand', type: 'forex', digits: 5, contractSize: '100000', spread: '0.0010' },
  { symbol: 'USDMXN', name: 'US Dollar vs Mexican Peso', type: 'forex', digits: 5, contractSize: '100000', spread: '0.0008' },
  { symbol: 'USDTRY', name: 'US Dollar vs Turkish Lira', type: 'forex', digits: 5, contractSize: '100000', spread: '0.0015' },
  { symbol: 'USDSEK', name: 'US Dollar vs Swedish Krona', type: 'forex', digits: 5, contractSize: '100000', spread: '0.0006' },
  { symbol: 'USDNOK', name: 'US Dollar vs Norwegian Krone', type: 'forex', digits: 5, contractSize: '100000', spread: '0.0006' },
  { symbol: 'USDDKK', name: 'US Dollar vs Danish Krone', type: 'forex', digits: 5, contractSize: '100000', spread: '0.0005' },
  { symbol: 'USDPLN', name: 'US Dollar vs Polish Zloty', type: 'forex', digits: 5, contractSize: '100000', spread: '0.0008' },
  { symbol: 'USDHUF', name: 'US Dollar vs Hungarian Forint', type: 'forex', digits: 3, contractSize: '100000', spread: '0.08' },
  { symbol: 'USDCZK', name: 'US Dollar vs Czech Koruna', type: 'forex', digits: 5, contractSize: '100000', spread: '0.0010' },
  { symbol: 'USDSGD', name: 'US Dollar vs Singapore Dollar', type: 'forex', digits: 5, contractSize: '100000', spread: '0.00005' },
  { symbol: 'USDHKD', name: 'US Dollar vs Hong Kong Dollar', type: 'forex', digits: 5, contractSize: '100000', spread: '0.00008' },
  
  // Major Cryptocurrencies
  { symbol: 'BTCUSD', name: 'Bitcoin vs US Dollar', type: 'crypto', digits: 2, contractSize: '1', spread: '50.00', minLot: '0.001', maxLot: '10' },
  { symbol: 'ETHUSD', name: 'Ethereum vs US Dollar', type: 'crypto', digits: 2, contractSize: '1', spread: '2.00', minLot: '0.01', maxLot: '50' },
  { symbol: 'XRPUSD', name: 'Ripple vs US Dollar', type: 'crypto', digits: 5, contractSize: '1', spread: '0.00100', minLot: '1', maxLot: '10000' },
  { symbol: 'LTCUSD', name: 'Litecoin vs US Dollar', type: 'crypto', digits: 2, contractSize: '1', spread: '0.50', minLot: '0.01', maxLot: '100' },
  { symbol: 'BCHUSD', name: 'Bitcoin Cash vs US Dollar', type: 'crypto', digits: 2, contractSize: '1', spread: '1.00', minLot: '0.01', maxLot: '100' },
  { symbol: 'ADAUSD', name: 'Cardano vs US Dollar', type: 'crypto', digits: 5, contractSize: '1', spread: '0.00050', minLot: '1', maxLot: '10000' },
  { symbol: 'DOTUSD', name: 'Polkadot vs US Dollar', type: 'crypto', digits: 3, contractSize: '1', spread: '0.100', minLot: '0.1', maxLot: '1000' },
  { symbol: 'SOLUSD', name: 'Solana vs US Dollar', type: 'crypto', digits: 2, contractSize: '1', spread: '0.50', minLot: '0.01', maxLot: '100' },
  { symbol: 'MATICUSD', name: 'Polygon vs US Dollar', type: 'crypto', digits: 4, contractSize: '1', spread: '0.0050', minLot: '1', maxLot: '10000' },
  { symbol: 'AVAXUSD', name: 'Avalanche vs US Dollar', type: 'crypto', digits: 2, contractSize: '1', spread: '0.50', minLot: '0.01', maxLot: '100' },
  { symbol: 'LINKUSD', name: 'Chainlink vs US Dollar', type: 'crypto', digits: 3, contractSize: '1', spread: '0.100', minLot: '0.1', maxLot: '1000' },
  { symbol: 'UNIUSD', name: 'Uniswap vs US Dollar', type: 'crypto', digits: 3, contractSize: '1', spread: '0.100', minLot: '0.1', maxLot: '1000' },
  { symbol: 'ATOMUSD', name: 'Cosmos vs US Dollar', type: 'crypto', digits: 3, contractSize: '1', spread: '0.100', minLot: '0.1', maxLot: '1000' },
  { symbol: 'DOGEUSD', name: 'Dogecoin vs US Dollar', type: 'crypto', digits: 5, contractSize: '1', spread: '0.00050', minLot: '10', maxLot: '100000' },
  
  // Commodities - Metals
  { symbol: 'XAUUSD', name: 'Gold vs US Dollar', type: 'commodity', digits: 2, contractSize: '100', spread: '0.50', minLot: '0.01', maxLot: '50' },
  { symbol: 'XAGUSD', name: 'Silver vs US Dollar', type: 'commodity', digits: 3, contractSize: '5000', spread: '0.030', minLot: '0.01', maxLot: '50' },
  { symbol: 'XPTUSD', name: 'Platinum vs US Dollar', type: 'commodity', digits: 2, contractSize: '50', spread: '3.00', minLot: '0.01', maxLot: '10' },
  { symbol: 'XPDUSD', name: 'Palladium vs US Dollar', type: 'commodity', digits: 2, contractSize: '50', spread: '10.00', minLot: '0.01', maxLot: '10' },
  { symbol: 'COPPER', name: 'Copper', type: 'commodity', digits: 5, contractSize: '25000', spread: '0.00050', minLot: '0.1', maxLot: '50' },
  
  // Commodities - Energy
  { symbol: 'XTIUSD', name: 'WTI Crude Oil', type: 'commodity', digits: 2, contractSize: '1000', spread: '0.05', minLot: '0.01', maxLot: '100' },
  { symbol: 'XBRUSD', name: 'Brent Crude Oil', type: 'commodity', digits: 2, contractSize: '1000', spread: '0.05', minLot: '0.01', maxLot: '100' },
  { symbol: 'NGAS', name: 'Natural Gas', type: 'commodity', digits: 3, contractSize: '10000', spread: '0.010', minLot: '0.1', maxLot: '100' },
  
  // Indices - US
  { symbol: 'US30', name: 'Dow Jones Industrial Average', type: 'index', digits: 2, contractSize: '5', spread: '3.00', minLot: '0.01', maxLot: '50' },
  { symbol: 'US500', name: 'S&P 500', type: 'index', digits: 2, contractSize: '50', spread: '0.50', minLot: '0.01', maxLot: '50' },
  { symbol: 'US100', name: 'NASDAQ 100', type: 'index', digits: 2, contractSize: '20', spread: '1.50', minLot: '0.01', maxLot: '50' },
  { symbol: 'VIX', name: 'Volatility Index', type: 'index', digits: 2, contractSize: '1000', spread: '0.10', minLot: '0.1', maxLot: '50' },
  
  // Indices - Europe
  { symbol: 'DE40', name: 'Germany 40 (DAX)', type: 'index', digits: 2, contractSize: '25', spread: '2.00', minLot: '0.01', maxLot: '50' },
  { symbol: 'UK100', name: 'UK 100 (FTSE)', type: 'index', digits: 2, contractSize: '10', spread: '2.00', minLot: '0.01', maxLot: '50' },
  { symbol: 'FR40', name: 'France 40 (CAC)', type: 'index', digits: 2, contractSize: '10', spread: '2.00', minLot: '0.01', maxLot: '50' },
  { symbol: 'EU50', name: 'Euro Stoxx 50', type: 'index', digits: 2, contractSize: '10', spread: '2.50', minLot: '0.01', maxLot: '50' },
  { symbol: 'ES35', name: 'Spain 35 (IBEX)', type: 'index', digits: 2, contractSize: '10', spread: '5.00', minLot: '0.01', maxLot: '50' },
  
  // Indices - Asia Pacific
  { symbol: 'JP225', name: 'Japan 225 (Nikkei)', type: 'index', digits: 2, contractSize: '5', spread: '10.00', minLot: '0.01', maxLot: '50' },
  { symbol: 'HK50', name: 'Hong Kong 50', type: 'index', digits: 2, contractSize: '1', spread: '15.00', minLot: '0.1', maxLot: '50' },
  { symbol: 'AUS200', name: 'Australia 200', type: 'index', digits: 2, contractSize: '25', spread: '3.00', minLot: '0.01', maxLot: '50' },
  { symbol: 'CHINA50', name: 'China A50', type: 'index', digits: 2, contractSize: '1', spread: '20.00', minLot: '0.1', maxLot: '50' },
  
  // Additional Popular Pairs
  { symbol: 'EURCHF', name: 'Euro vs Swiss Franc', type: 'forex', digits: 5, contractSize: '100000', spread: '0.00003' },
  { symbol: 'GBPCHF', name: 'British Pound vs Swiss Franc', type: 'forex', digits: 5, contractSize: '100000', spread: '0.00004' },
  { symbol: 'AUDCHF', name: 'Australian Dollar vs Swiss Franc', type: 'forex', digits: 5, contractSize: '100000', spread: '0.00004' },
  { symbol: 'NZDCHF', name: 'New Zealand Dollar vs Swiss Franc', type: 'forex', digits: 5, contractSize: '100000', spread: '0.00004' },
  { symbol: 'CADCHF', name: 'Canadian Dollar vs Swiss Franc', type: 'forex', digits: 5, contractSize: '100000', spread: '0.00004' },
  { symbol: 'NZDCAD', name: 'New Zealand Dollar vs Canadian Dollar', type: 'forex', digits: 5, contractSize: '100000', spread: '0.00004' },
  { symbol: 'EURNZD', name: 'Euro vs New Zealand Dollar', type: 'forex', digits: 5, contractSize: '100000', spread: '0.00005' },
  { symbol: 'GBPNZD', name: 'British Pound vs New Zealand Dollar', type: 'forex', digits: 5, contractSize: '100000', spread: '0.00006' },
];

async function seedSymbols() {
  try {
    console.log('Seeding symbols...');
    
    // Insert symbols if they don't already exist
    for (const symbol of tradingSymbols) {
      try {
        await db.insert(symbols).values(symbol).onConflictDoNothing();
      } catch (error) {
        // Symbol might already exist, continue
        console.log(`Symbol ${symbol.symbol} may already exist, skipping...`);
      }
    }
    
    console.log(`✓ Successfully seeded ${tradingSymbols.length} symbols`);
  } catch (error) {
    console.error('Error seeding symbols:', error);
    throw error;
  }
}

export { seedSymbols };

// Run seed
seedSymbols()
  .then(() => {
    console.log('Seed completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  });
