import { WebSocketServer, WebSocket } from 'ws';
import { Server } from 'http';
import { TradingService } from './services/trading.service';

const TWELVEDATA_API_KEY = process.env.TWELVEDATA_API_KEY;
const TWELVEDATA_WS_URL = 'wss://ws.twelvedata.com/v1/quotes/price';

export function setupWebSocket(httpServer: Server) {
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });

  // Map to track client subscriptions
  const clientSubscriptions = new Map<WebSocket, Set<string>>();
  
  // Single Twelve Data WebSocket connection for all symbols
  let twelveDataWs: WebSocket | null = null;
  let reconnectTimeout: NodeJS.Timeout | null = null;
  
  // Map to track which symbols have subscribers
  const symbolSubscribers = new Map<string, Set<WebSocket>>();
  
  // Track subscribed symbols on Twelve Data
  const subscribedSymbols = new Set<string>();

  function ensureTwelveDataConnection() {
    if (twelveDataWs && twelveDataWs.readyState === WebSocket.OPEN) {
      return;
    }

    if (reconnectTimeout) {
      clearTimeout(reconnectTimeout);
      reconnectTimeout = null;
    }

    twelveDataWs = new WebSocket(`${TWELVEDATA_WS_URL}?apikey=${TWELVEDATA_API_KEY}`);

    twelveDataWs.on('open', async () => {
      console.log('Connected to Twelve Data WebSocket');
      
      // Resubscribe to all symbols that have subscribers
      if (subscribedSymbols.size > 0) {
        // Fetch the twelveDataSymbol format for all subscribed symbols
        const symbolsToSubscribe = Array.from(subscribedSymbols);
        console.log(`Subscribing to ${symbolsToSubscribe.length} symbols`);
        
        // Get the proper Twelve Data format for each symbol
        const { db } = await import('./db');
        const { symbols: symbolsTable } = await import('@shared/schema');
        const { inArray } = await import('drizzle-orm');
        
        const symbolRecords = await db
          .select({ symbol: symbolsTable.symbol, twelveDataSymbol: symbolsTable.twelveDataSymbol })
          .from(symbolsTable)
          .where(inArray(symbolsTable.symbol, symbolsToSubscribe));
        
        // Use twelve_data_symbol if available, otherwise use symbol as-is
        const formattedSymbols = symbolRecords.map(s => s.twelveDataSymbol || s.symbol).join(',');
        
        if (formattedSymbols) {
          twelveDataWs?.send(JSON.stringify({
            action: 'subscribe',
            params: {
              symbols: formattedSymbols
            }
          }));
        }
      }
    });

    twelveDataWs.on('message', async (data: Buffer) => {
      try {
        const message = JSON.parse(data.toString());
        
        // Handle successful subscription confirmation
        if (message.event === 'subscribe-status') {
          if (message.status === 'ok') {
            console.log(`Successfully subscribed to symbols`);
          } else {
            console.error('Subscription error:', message);
          }
          return;
        }

        // Handle price updates
        if (message.event === 'price') {
          const symbol = message.symbol;
          const price = parseFloat(message.price);
          
          // Update positions for this symbol
          try {
            await TradingService.updatePositionPrices(symbol, price);
          } catch (error) {
            console.error(`Error updating positions for ${symbol}:`, error);
          }

          // Broadcast to all subscribers
          const subscribers = symbolSubscribers.get(symbol);
          if (subscribers) {
            const priceUpdate = JSON.stringify({
              type: 'price',
              symbol,
              data: {
                symbol,
                bid: price,
                ask: price + 0.00002, // Add small spread
                change: 0,
                changePercent: 0,
                timestamp: message.timestamp || Date.now()
              },
              timestamp: Date.now()
            });

            subscribers.forEach((client) => {
              if (client.readyState === WebSocket.OPEN) {
                client.send(priceUpdate);
              }
            });
          }
        }

        // Handle heartbeat
        if (message.event === 'heartbeat') {
          twelveDataWs?.send(JSON.stringify({ event: 'heartbeat', response: 'pong' }));
        }
      } catch (error) {
        console.error('Error processing Twelve Data message:', error);
      }
    });

    twelveDataWs.on('error', (error) => {
      console.error('Twelve Data WebSocket error:', error);
    });

    twelveDataWs.on('close', () => {
      console.log('Twelve Data connection closed');
      twelveDataWs = null;
      
      // Reconnect if there are subscribers
      if (symbolSubscribers.size > 0) {
        console.log('Reconnecting to Twelve Data in 5 seconds...');
        reconnectTimeout = setTimeout(() => ensureTwelveDataConnection(), 5000);
      }
    });
  }

  async function subscribeToSymbol(symbol: string) {
    if (!subscribedSymbols.has(symbol)) {
      subscribedSymbols.add(symbol);
      
      // If connection is open, subscribe immediately
      if (twelveDataWs && twelveDataWs.readyState === WebSocket.OPEN) {
        // Get the proper Twelve Data format for this symbol
        const { db } = await import('./db');
        const { symbols: symbolsTable } = await import('@shared/schema');
        const { eq } = await import('drizzle-orm');
        
        const [symbolRecord] = await db
          .select({ twelveDataSymbol: symbolsTable.twelveDataSymbol })
          .from(symbolsTable)
          .where(eq(symbolsTable.symbol, symbol))
          .limit(1);
        
        const formattedSymbol = symbolRecord?.twelveDataSymbol || symbol;
        
        twelveDataWs.send(JSON.stringify({
          action: 'subscribe',
          params: {
            symbols: formattedSymbol
          }
        }));
      }
    }
  }

  async function unsubscribeFromSymbol(symbol: string) {
    if (subscribedSymbols.has(symbol)) {
      subscribedSymbols.delete(symbol);
      
      // If connection is open, unsubscribe immediately
      if (twelveDataWs && twelveDataWs.readyState === WebSocket.OPEN) {
        // Get the proper Twelve Data format for this symbol
        const { db } = await import('./db');
        const { symbols: symbolsTable } = await import('@shared/schema');
        const { eq } = await import('drizzle-orm');
        
        const [symbolRecord] = await db
          .select({ twelveDataSymbol: symbolsTable.twelveDataSymbol })
          .from(symbolsTable)
          .where(eq(symbolsTable.symbol, symbol))
          .limit(1);
        
        const formattedSymbol = symbolRecord?.twelveDataSymbol || symbol;
        
        twelveDataWs.send(JSON.stringify({
          action: 'unsubscribe',
          params: {
            symbols: formattedSymbol
          }
        }));
      }
    }
  }

  wss.on('connection', (ws: WebSocket) => {
    console.log('WebSocket client connected');
    clientSubscriptions.set(ws, new Set());

    ws.on('message', async (message: string) => {
      try {
        const data = JSON.parse(message.toString());

        if (data.type === 'subscribe') {
          const { symbols } = data;
          const clientSubs = clientSubscriptions.get(ws)!;

          symbols.forEach((symbol: string) => {
            // Add to client's subscriptions
            clientSubs.add(symbol);

            // Add to symbol subscribers
            if (!symbolSubscribers.has(symbol)) {
              symbolSubscribers.set(symbol, new Set());
            }
            symbolSubscribers.get(symbol)!.add(ws);

            // Subscribe to symbol on Twelve Data
            subscribeToSymbol(symbol);
          });

          // Ensure connection is established
          ensureTwelveDataConnection();

          ws.send(JSON.stringify({
            type: 'subscribed',
            symbols,
          }));
        } else if (data.type === 'unsubscribe') {
          const { symbols } = data;
          const clientSubs = clientSubscriptions.get(ws)!;

          symbols.forEach((symbol: string) => {
            // Remove from client's subscriptions
            clientSubs.delete(symbol);

            // Remove from symbol subscribers
            symbolSubscribers.get(symbol)?.delete(ws);

            // Unsubscribe from Twelve Data if no more subscribers
            if (symbolSubscribers.get(symbol)?.size === 0) {
              unsubscribeFromSymbol(symbol);
              symbolSubscribers.delete(symbol);
            }
          });
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    });

    ws.on('close', () => {
      // Get client's subscriptions
      const clientSubs = clientSubscriptions.get(ws);
      
      if (clientSubs) {
        // Remove from all symbol subscribers
        clientSubs.forEach((symbol) => {
          symbolSubscribers.get(symbol)?.delete(ws);

          // Unsubscribe from Twelve Data if no more subscribers
          if (symbolSubscribers.get(symbol)?.size === 0) {
            unsubscribeFromSymbol(symbol);
            symbolSubscribers.delete(symbol);
          }
        });

        clientSubscriptions.delete(ws);
      }

      console.log('WebSocket client disconnected');
    });
  });

  return wss;
}
