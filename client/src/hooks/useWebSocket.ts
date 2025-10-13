import { useEffect, useRef, useState } from 'react';

interface WebSocketMessage {
  type: string;
  symbol?: string;
  data?: any;
  timestamp?: number;
}

export function useWebSocket(symbols: string[] = []) {
  const ws = useRef<WebSocket | null>(null);
  const [prices, setPrices] = useState<Record<string, any>>({});
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws`;

    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      console.log('WebSocket connected');
      setIsConnected(true);

      // Subscribe to symbols
      if (symbols.length > 0) {
        ws.current?.send(JSON.stringify({
          type: 'subscribe',
          symbols,
        }));
      }
    };

    ws.current.onmessage = (event) => {
      try {
        const message: WebSocketMessage = JSON.parse(event.data);

        if (message.type === 'price' && message.symbol && message.data) {
          setPrices(prev => ({
            ...prev,
            [message.symbol!]: message.data,
          }));
        }
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.current.onclose = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
    };

    return () => {
      ws.current?.close();
    };
  }, [symbols.join(',')]);

  const subscribe = (newSymbols: string[]) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({
        type: 'subscribe',
        symbols: newSymbols,
      }));
    }
  };

  const unsubscribe = (symbolsToRemove: string[]) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({
        type: 'unsubscribe',
        symbols: symbolsToRemove,
      }));
    }
  };

  return {
    prices,
    isConnected,
    subscribe,
    unsubscribe,
  };
}
