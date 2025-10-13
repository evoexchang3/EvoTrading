import { WebSocketServer, WebSocket } from 'ws';
import { Server } from 'http';
import { MarketService } from './services/market.service';
import { TradingService } from './services/trading.service';

const PRICE_UPDATE_INTERVAL = 2000; // 2 seconds

export function setupWebSocket(httpServer: Server) {
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });

  const subscribers = new Map<string, Set<WebSocket>>();

  wss.on('connection', (ws: WebSocket) => {
    console.log('WebSocket client connected');

    ws.on('message', async (message: string) => {
      try {
        const data = JSON.parse(message.toString());

        if (data.type === 'subscribe') {
          const { symbols } = data;
          symbols.forEach((symbol: string) => {
            if (!subscribers.has(symbol)) {
              subscribers.set(symbol, new Set());
            }
            subscribers.get(symbol)!.add(ws);
          });

          ws.send(JSON.stringify({
            type: 'subscribed',
            symbols,
          }));
        } else if (data.type === 'unsubscribe') {
          const { symbols } = data;
          symbols.forEach((symbol: string) => {
            subscribers.get(symbol)?.delete(ws);
          });
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    });

    ws.on('close', () => {
      // Remove from all subscriptions
      subscribers.forEach((clients) => {
        clients.delete(ws);
      });
      console.log('WebSocket client disconnected');
    });
  });

  // Broadcast price updates
  const priceUpdateInterval = setInterval(async () => {
    for (const [symbol, clients] of subscribers.entries()) {
      if (clients.size === 0) continue;

      try {
        const quote = await MarketService.getQuote(symbol);
        
        // Update all positions for this symbol
        await TradingService.updatePositionPrices(symbol, quote.bid);

        const message = JSON.stringify({
          type: 'price',
          symbol,
          data: quote,
          timestamp: Date.now(),
        });

        clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(message);
          }
        });
      } catch (error) {
        console.error(`Error updating price for ${symbol}:`, error);
      }
    }
  }, PRICE_UPDATE_INTERVAL);

  wss.on('close', () => {
    clearInterval(priceUpdateInterval);
  });

  return wss;
}
