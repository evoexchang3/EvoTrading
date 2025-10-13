import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { ConnectionStatus } from "@/components/ConnectionStatus";

type TradingChartProps = {
  symbol: string;
  connectionStatus?: "connected" | "reconnecting" | "disconnected";
};

export function TradingChart({ symbol, connectionStatus = "connected" }: TradingChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // TradingView Lightweight Charts will be integrated here
    // For now, showing placeholder
    if (!chartContainerRef.current) return;

    // Cleanup
    return () => {
      // Chart cleanup will go here
    };
  }, [symbol]);

  return (
    <Card className="relative h-full">
      <div className="absolute top-4 left-4 z-10 flex items-center gap-4">
        <div>
          <div className="text-lg font-semibold">{symbol}</div>
          <div className="text-xs text-muted-foreground">1 Hour Chart</div>
        </div>
        <ConnectionStatus status={connectionStatus} />
      </div>
      
      <div 
        ref={chartContainerRef} 
        className="h-full w-full rounded-lg bg-card p-4"
        data-testid="trading-chart"
      >
        {/* Chart canvas will be rendered here */}
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <div className="text-sm text-muted-foreground">
              Chart for {symbol}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              TradingView Lightweight Charts integration
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
