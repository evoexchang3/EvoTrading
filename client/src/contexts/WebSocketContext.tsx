import { createContext, useContext, useEffect, useRef, useState, useCallback, ReactNode } from 'react';

interface WebSocketMessage {
  type: string;
  symbol?: string;
  data?: any;
  timestamp?: number;
}

interface WebSocketContextValue {
  prices: Record<string, any>;
  isConnected: boolean;
  subscribe: (symbols: string[]) => void;
  unsubscribe: (symbols: string[]) => void;
}

const WebSocketContext = createContext<WebSocketContextValue | null>(null);

export function WebSocketProvider({ children }: { children: ReactNode }) {
  const ws = useRef<WebSocket | null>(null);
  const [prices, setPrices] = useState<Record<string, any>>({});
  const [isConnected, setIsConnected] = useState(false);
  const subscribedSymbols = useRef<Set<string>>(new Set());

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws`;

    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      setIsConnected(true);
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
      setIsConnected(false);
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  const subscribe = useCallback((symbols: string[]) => {
    if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
      return;
    }

    const newSymbols = symbols.filter(s => !subscribedSymbols.current.has(s));
    if (newSymbols.length === 0) return;

    newSymbols.forEach(s => subscribedSymbols.current.add(s));

    ws.current.send(JSON.stringify({
      type: 'subscribe',
      symbols: newSymbols,
    }));
  }, []);

  const unsubscribe = useCallback((symbols: string[]) => {
    if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
      return;
    }

    const symbolsToRemove = symbols.filter(s => subscribedSymbols.current.has(s));
    if (symbolsToRemove.length === 0) return;

    symbolsToRemove.forEach(s => subscribedSymbols.current.delete(s));

    ws.current.send(JSON.stringify({
      type: 'unsubscribe',
      symbols: symbolsToRemove,
    }));
  }, []);

  return (
    <WebSocketContext.Provider value={{ prices, isConnected, subscribe, unsubscribe }}>
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocketContext() {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocketContext must be used within WebSocketProvider');
  }
  return context;
}
