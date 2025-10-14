import { WebSocketServer, WebSocket } from 'ws';
import { Server } from 'http';
import { TradingService } from './services/trading.service';

const TWELVEDATA_API_KEY = process.env.TWELVEDATA_API_KEY;
const TWELVEDATA_WS_URL = 'wss://ws.twelvedata.com/v1/quotes/price';

export function setupWebSocket(httpServer: Server) {
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });

  // Map to track client subscriptions
  const clientSubscriptions = new Map<WebSocket, Set<string>>();
  
  // Map to track symbols to their Twelve Data WebSocket connections
  const symbolConnections = new Map<string, WebSocket>();
  
  // Map to track which symbols have subscribers
  const symbolSubscribers = new Map<string, Set<WebSocket>>();

  function connectToTwelveData(symbol: string) {
    if (symbolConnections.has(symbol)) {
      return; // Already connected
    }

    const twelveWs = new WebSocket(`${TWELVEDATA_WS_URL}?apikey=${TWELVEDATA_API_KEY}`);
    symbolConnections.set(symbol, twelveWs);

    twelveWs.on('open', () => {
      console.log(`Connected to Twelve Data for ${symbol}`);
      // Subscribe to symbol
      twelveWs.send(JSON.stringify({
        action: 'subscribe',
        params: {
          symbols: symbol
        }
      }));
    });

    twelveWs.on('message', async (data: Buffer) => {
      try {
        const message = JSON.parse(data.toString());
        
        // Handle successful subscription confirmation
        if (message.event === 'subscribe-status' && message.status === 'ok') {
          console.log(`Successfully subscribed to ${symbol}`);
          return;
        }

        // Handle price updates
        if (message.event === 'price') {
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
          twelveWs.send(JSON.stringify({ event: 'heartbeat', response: 'pong' }));
        }
      } catch (error) {
        console.error(`Error processing Twelve Data message for ${symbol}:`, error);
      }
    });

    twelveWs.on('error', (error) => {
      console.error(`Twelve Data WebSocket error for ${symbol}:`, error);
    });

    twelveWs.on('close', () => {
      console.log(`Twelve Data connection closed for ${symbol}`);
      symbolConnections.delete(symbol);
      
      // Reconnect if there are still subscribers
      if (symbolSubscribers.get(symbol)?.size > 0) {
        setTimeout(() => connectToTwelveData(symbol), 5000);
      }
    });
  }

  function disconnectFromTwelveData(symbol: string) {
    const conn = symbolConnections.get(symbol);
    if (conn && conn.readyState === WebSocket.OPEN) {
      // Unsubscribe from symbol
      conn.send(JSON.stringify({
        action: 'unsubscribe',
        params: {
          symbols: symbol
        }
      }));
      conn.close();
      symbolConnections.delete(symbol);
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

            // Connect to Twelve Data if not already connected
            connectToTwelveData(symbol);
          });

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

            // Disconnect from Twelve Data if no more subscribers
            if (symbolSubscribers.get(symbol)?.size === 0) {
              disconnectFromTwelveData(symbol);
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

          // Disconnect from Twelve Data if no more subscribers
          if (symbolSubscribers.get(symbol)?.size === 0) {
            disconnectFromTwelveData(symbol);
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
