import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PriceDisplay } from "@/components/PriceDisplay";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Symbol = {
  symbol: string;
  name: string;
  bid: number;
  ask: number;
  change: number;
  changePercent: number;
};

type WatchlistProps = {
  onSymbolSelect?: (symbol: string) => void;
  selectedSymbol?: string;
};

export function Watchlist({ onSymbolSelect, selectedSymbol }: WatchlistProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data - will be replaced with real data
  const symbols: Symbol[] = [
    { symbol: "EURUSD", name: "Euro / US Dollar", bid: 1.08542, ask: 1.08545, change: 0.00012, changePercent: 0.11 },
    { symbol: "GBPUSD", name: "British Pound / US Dollar", bid: 1.26432, ask: 1.26435, change: -0.00023, changePercent: -0.02 },
    { symbol: "BTCUSD", name: "Bitcoin / US Dollar", bid: 43250.50, ask: 43252.00, change: 320.50, changePercent: 0.75 },
    { symbol: "XAUUSD", name: "Gold / US Dollar", bid: 2045.30, ask: 2045.80, change: 12.40, changePercent: 0.61 },
    { symbol: "WTI", name: "Crude Oil WTI", bid: 75.42, ask: 75.45, change: -0.38, changePercent: -0.50 },
  ];

  const filteredSymbols = symbols.filter(
    (s) =>
      s.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="space-y-4 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">Market Watch</CardTitle>
          <Button size="icon" variant="ghost" className="h-8 w-8" data-testid="button-favorites">
            <Star className="h-4 w-4" />
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search symbols..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            data-testid="input-symbol-search"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-full">
          <div className="space-y-1 p-4 pt-0">
            {filteredSymbols.map((symbol) => (
              <button
                key={symbol.symbol}
                onClick={() => onSymbolSelect?.(symbol.symbol)}
                className={cn(
                  "w-full rounded-md p-3 text-left transition-colors hover-elevate active-elevate-2",
                  selectedSymbol === symbol.symbol && "bg-accent"
                )}
                data-testid={`symbol-${symbol.symbol.toLowerCase()}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{symbol.symbol}</div>
                    <div className="text-xs text-muted-foreground truncate">
                      {symbol.name}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-sm font-medium tabular-nums">
                      {symbol.bid.toFixed(symbol.symbol.includes("BTC") ? 2 : 5)}
                    </div>
                    <div
                      className={cn(
                        "text-xs font-medium tabular-nums",
                        symbol.changePercent >= 0 ? "text-chart-1" : "text-chart-2"
                      )}
                    >
                      {symbol.changePercent >= 0 ? "+" : ""}
                      {symbol.changePercent.toFixed(2)}%
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
