import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

type ConnectionStatusProps = {
  status: "connected" | "reconnecting" | "disconnected";
  symbol?: string; // Optional: show market status if symbol provided
  className?: string;
};

interface MarketStatusResponse {
  isOpen: boolean;
  timezone: string;
}

interface SymbolInfo {
  symbol: string;
  type: string;
  exchangeTimezone?: string;
  tradingHours?: {
    open: string;
    close: string;
    days?: number[];
  };
}

export function ConnectionStatus({ status, symbol, className }: ConnectionStatusProps) {
  // Fetch symbol info to get market hours (only if symbol is provided)
  const { data: symbolInfo } = useQuery<SymbolInfo>({
    queryKey: ['/api/market/symbols', symbol],
    queryFn: async () => {
      if (!symbol) throw new Error('Symbol required');
      const response = await fetch(`/api/market/symbols/${symbol}`);
      if (!response.ok) throw new Error('Failed to fetch symbol info');
      return response.json();
    },
    enabled: !!symbol,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  // Check market status based on symbol type and trading hours
  const { data: marketStatus } = useQuery<MarketStatusResponse>({
    queryKey: ['/api/market/status', symbol],
    queryFn: async () => {
      if (!symbol) throw new Error('Symbol required');
      const response = await fetch(`/api/market/status/${symbol}`);
      if (!response.ok) throw new Error('Failed to fetch market status');
      return response.json();
    },
    enabled: !!symbol && !!symbolInfo,
    refetchInterval: 60000, // Refresh every minute
    staleTime: 30000, // 30 seconds stale time
  });

  // Determine the effective status
  const getDisplayStatus = (): {
    label: string;
    color: string;
  } => {
    // If WebSocket is not connected, always show connection status
    if (status === "reconnecting") {
      return { label: "Reconnecting...", color: "text-chart-4" };
    }
    if (status === "disconnected") {
      return { label: "Disconnected", color: "text-chart-2" };
    }

    // WebSocket is connected - check market status
    if (!symbol || !marketStatus) {
      // No symbol provided or market status not loaded - just show "Live"
      return { label: "Live", color: "text-chart-1" };
    }

    // Market status available - show accurate status
    if (marketStatus.isOpen) {
      return { label: "Market Open", color: "text-chart-1" };
    } else {
      return { label: "Market Closed", color: "text-muted-foreground" };
    }
  };

  const displayStatus = getDisplayStatus();

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Circle className={cn("h-2 w-2 fill-current", displayStatus.color)} />
      <span className="text-xs text-muted-foreground">
        {displayStatus.label}
      </span>
    </div>
  );
}
