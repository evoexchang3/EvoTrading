import { useState, useMemo, useRef, useEffect } from "react";
import { useInfiniteQuery, useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Star, TrendingUp, DollarSign, Bitcoin, BarChart3, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Symbol as SymbolType } from "@shared/schema";

// Simple debounce hook
function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

type WatchlistProps = {
  onSymbolSelect?: (symbol: string) => void;
  selectedSymbol?: string;
};

export function Watchlist({ onSymbolSelect, selectedSymbol }: WatchlistProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const debouncedSearch = useDebounce(searchQuery, 300);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Fetch user preferences for favorites
  const { data: preferences } = useQuery<{ favorites?: string[] }>({
    queryKey: ["/api/preferences"],
  });

  const favorites = new Set(preferences?.favorites || []);

  // Infinite query with cursor-based pagination
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["/api/market/symbols", { type: activeTab === "all" ? "" : activeTab, search: debouncedSearch }],
    queryFn: async ({ pageParam }) => {
      const params = new URLSearchParams({
        limit: '100',
        ...(pageParam && { cursor: pageParam }),
        ...(activeTab !== "all" && activeTab !== "favorites" && { type: activeTab }),
        ...(debouncedSearch && { search: debouncedSearch }),
      });
      
      const response = await fetch(`/api/market/symbols?${params}`);
      if (!response.ok) throw new Error('Failed to fetch symbols');
      return response.json() as Promise<{ data: SymbolType[], nextCursor?: string, hasMore: boolean }>;
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  // Flatten all pages into single array
  const symbols: SymbolType[] = useMemo(
    () => data?.pages.flatMap(page => page.data) || [],
    [data]
  );

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

  // Filter symbols by category (favorites handled client-side since it's user-specific)
  const filteredSymbols = useMemo(() => {
    if (activeTab === "favorites") {
      return symbols.filter(s => favorites.has(s.symbol));
    }
    return symbols;
  }, [symbols, activeTab, favorites]);

  // Intersection observer for infinite scroll
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Only fetch if intersecting, has more pages, and not currently fetching
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

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
              {isLoading ? (
                <div className="flex h-32 items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : filteredSymbols.length === 0 ? (
                <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
                  <p className="text-sm text-muted-foreground">
                    {debouncedSearch ? "No symbols found" : "No symbols available"}
                  </p>
                </div>
              ) : (
                <>
                  {filteredSymbols.map((symbol) => (
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
                          {symbol.type && (
                            <div className="text-xs text-muted-foreground uppercase">
                              {symbol.type}
                            </div>
                          )}
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
                  ))}
                  
                  {/* Infinite scroll sentinel */}
                  {hasNextPage && (
                    <div
                      ref={sentinelRef}
                      className="flex items-center justify-center py-4"
                      data-testid="status-loading-more"
                    >
                      {isFetchingNextPage && (
                        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </ScrollArea>
        </Tabs>
      </CardContent>
    </Card>
  );
}
