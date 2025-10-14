import { useState, useMemo, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Star, TrendingUp, DollarSign, Bitcoin, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWebSocketContext } from "@/contexts/WebSocketContext";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Symbol as SymbolType } from "@shared/schema";

type WatchlistProps = {
  onSymbolSelect?: (symbol: string) => void;
  selectedSymbol?: string;
};

type SymbolWithPrice = SymbolType & {
  bid?: number;
  ask?: number;
  change?: number;
  changePercent?: number;
};

export function Watchlist({ onSymbolSelect, selectedSymbol }: WatchlistProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Fetch user preferences for favorites
  const { data: preferences } = useQuery<{ favorites?: string[] }>({
    queryKey: ["/api/preferences"],
  });

  const favorites = new Set(preferences?.favorites || []);

  const { data: symbolsData = [] } = useQuery<SymbolType[]>({
    queryKey: ["/api/market/symbols"],
  });

  const symbolList = useMemo(() => symbolsData.map(s => s.symbol), [symbolsData]);
  const { prices, subscribe } = useWebSocketContext();

  useEffect(() => {
    if (symbolList.length > 0) {
      subscribe(symbolList);
    }
  }, [symbolList.join(',')]);

  const symbols: SymbolWithPrice[] = symbolsData.map(s => ({
    ...s,
    bid: prices[s.symbol]?.bid || 0,
    ask: prices[s.symbol]?.ask || 0,
    change: prices[s.symbol]?.change || 0,
    changePercent: prices[s.symbol]?.changePercent || 0,
  }));

  const updateFavoritesMutation = useMutation({
    mutationFn: async (newFavorites: string[]) => {
      return await apiRequest("PATCH", "/api/preferences", { favorites: newFavorites });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/preferences"] });
    },
  });

  const toggleFavorite = (symbol: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(symbol)) {
      newFavorites.delete(symbol);
    } else {
      newFavorites.add(symbol);
    }
    updateFavoritesMutation.mutate(Array.from(newFavorites) as string[]);
  };

  const getCategorySymbols = (category: string) => {
    if (category === "all") return symbols;
    if (category === "favorites") return symbols.filter(s => favorites.has(s.symbol));
    return symbols.filter(s => s.type === category);
  };

  const filteredSymbols = getCategorySymbols(activeTab).filter(
    (s) =>
      s.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getDigits = (symbol: string) => {
    if (symbol.includes("BTC") || symbol.includes("ETH")) return 2;
    if (symbol.includes("JPY")) return 3;
    return 5;
  };

  const categoryIcons = {
    all: BarChart3,
    favorites: Star,
    forex: TrendingUp,
    crypto: Bitcoin,
    commodity: DollarSign,
    index: BarChart3,
  };

  const categoryLabels = {
    all: "All",
    favorites: "Favorites",
    forex: "Forex",
    crypto: "Crypto",
    commodity: "Commodities",
    index: "Indices",
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="space-y-4 pb-4">
        <CardTitle className="text-base font-semibold">Market Watch</CardTitle>
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
      <CardContent className="flex-1 p-0 flex flex-col min-h-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
          <TabsList className="grid grid-cols-6 mx-4">
            {Object.entries(categoryLabels).map(([key, label]) => {
              const Icon = categoryIcons[key as keyof typeof categoryIcons];
              return (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="text-xs px-2"
                  data-testid={`tab-${key}`}
                >
                  <Icon className="h-3 w-3 mr-1" />
                  {label}
                </TabsTrigger>
              );
            })}
          </TabsList>

          <ScrollArea className="flex-1">
            <div className="space-y-1 p-4">
              {filteredSymbols.length === 0 ? (
                <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
                  <p className="text-sm text-muted-foreground">
                    {searchQuery ? "No symbols found" : "No symbols available"}
                  </p>
                </div>
              ) : (
                filteredSymbols.map((symbol) => (
                  <div
                    key={symbol.symbol}
                    className={cn(
                      "relative group rounded-md transition-colors",
                      selectedSymbol === symbol.symbol && "bg-accent"
                    )}
                  >
                    <button
                      onClick={() => onSymbolSelect?.(symbol.symbol)}
                      className="w-full rounded-md p-3 text-left hover-elevate active-elevate-2"
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
                            {(symbol.bid || 0).toFixed(getDigits(symbol.symbol))}
                          </div>
                          <div
                            className={cn(
                              "text-xs font-medium tabular-nums",
                              (symbol.changePercent || 0) >= 0 ? "text-chart-1" : "text-chart-2"
                            )}
                          >
                            {(symbol.changePercent || 0) >= 0 ? "+" : ""}
                            {(symbol.changePercent || 0).toFixed(2)}%
                          </div>
                        </div>
                      </div>
                    </button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(symbol.symbol);
                      }}
                      data-testid={`button-favorite-${symbol.symbol.toLowerCase()}`}
                    >
                      <Star
                        className={cn(
                          "h-3 w-3",
                          favorites.has(symbol.symbol) && "fill-primary text-primary"
                        )}
                      />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </Tabs>
      </CardContent>
    </Card>
  );
}
