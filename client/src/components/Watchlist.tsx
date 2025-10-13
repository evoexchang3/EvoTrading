import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PriceDisplay } from "@/components/PriceDisplay";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useWebSocket } from "@/hooks/useWebSocket";

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
  
  const { data: symbolsData = [] } = useQuery<Symbol[]>({
    queryKey: ["/api/market/symbols"],
  });

  const symbolList = symbolsData.map(s => s.symbol);
  const { prices } = useWebSocket(symbolList);

  const symbols: Symbol[] = symbolsData.map(s => ({
    ...s,
    bid: prices[s.symbol]?.bid || s.bid || 0,
    ask: prices[s.symbol]?.ask || s.ask || 0,
    change: prices[s.symbol]?.change || s.change || 0,
    changePercent: prices[s.symbol]?.changePercent || s.changePercent || 0,
  }));

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
