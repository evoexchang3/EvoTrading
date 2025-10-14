import { useState, useEffect } from "react";
import { Link } from "wouter";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Watchlist } from "@/components/Watchlist";
import { TradingChart } from "@/components/TradingChart";
import { OrderTicket } from "@/components/OrderTicket";
import { PositionsTable } from "@/components/PositionsTable";
import { OrdersTable } from "@/components/OrdersTable";
import {
  LayoutDashboard,
  PanelLeft,
  PanelRight,
  PanelBottom,
  Maximize2,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

type PanelVisibility = {
  watchlist: boolean;
  orderTicket: boolean;
  positions: boolean;
};

type TradingPageProps = {
  symbol?: string;
};

export default function TradingPage({ symbol: initialSymbol }: TradingPageProps) {
  const [selectedSymbol, setSelectedSymbol] = useState(initialSymbol || "EURUSD");
  const [currentPrice, setCurrentPrice] = useState(1.08545);
  const [panelVisibility, setPanelVisibility] = useState<PanelVisibility>({
    watchlist: true,
    orderTicket: true,
    positions: true,
  });

  // Connect to WebSocket for live prices
  useEffect(() => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      // Subscribe to the selected symbol
      ws.send(JSON.stringify({
        type: "subscribe",
        symbols: [selectedSymbol],
      }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "price" && data.symbol === selectedSymbol) {
        setCurrentPrice(data.data.bid);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      // Unsubscribe before closing
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({
          type: "unsubscribe",
          symbols: [selectedSymbol],
        }));
      }
      ws.close();
    };
  }, [selectedSymbol]);

  const togglePanel = (panel: keyof PanelVisibility) => {
    setPanelVisibility((prev) => ({
      ...prev,
      [panel]: !prev[panel],
    }));
  };

  const resetLayout = () => {
    setPanelVisibility({
      watchlist: true,
      orderTicket: true,
      positions: true,
    });
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-2 border-b bg-card px-4 py-2">
        <div className="flex items-center gap-2">
          <Link href="/dashboard">
            <Button
              size="sm"
              variant="ghost"
              data-testid="button-back-to-dashboard"
              className="h-8"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
          </Link>
          <div className="h-4 w-px bg-border" />
          <h1 className="text-lg font-semibold" data-testid="text-trading-platform">Trading Platform</h1>
          <div className="h-4 w-px bg-border" />
          <span className="text-sm text-muted-foreground" data-testid="text-current-symbol">{selectedSymbol}</span>
        </div>

        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant={panelVisibility.watchlist ? "secondary" : "ghost"}
            onClick={() => togglePanel("watchlist")}
            data-testid="button-toggle-watchlist"
            className="h-8"
          >
            <PanelLeft className="h-4 w-4 mr-2" />
            Watchlist
          </Button>
          <Button
            size="sm"
            variant={panelVisibility.orderTicket ? "secondary" : "ghost"}
            onClick={() => togglePanel("orderTicket")}
            data-testid="button-toggle-order-ticket"
            className="h-8"
          >
            <PanelRight className="h-4 w-4 mr-2" />
            Order Ticket
          </Button>
          <Button
            size="sm"
            variant={panelVisibility.positions ? "secondary" : "ghost"}
            onClick={() => togglePanel("positions")}
            data-testid="button-toggle-positions"
            className="h-8"
          >
            <PanelBottom className="h-4 w-4 mr-2" />
            Positions
          </Button>
          <div className="h-4 w-px bg-border mx-1" />
          <Button
            size="sm"
            variant="ghost"
            onClick={resetLayout}
            data-testid="button-reset-layout"
            className="h-8"
          >
            <Maximize2 className="h-4 w-4 mr-2" />
            Reset Layout
          </Button>
        </div>
      </div>

      {/* Main Trading Layout */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="vertical">
          {/* Top Section: Watchlist, Chart, Order Ticket */}
          <ResizablePanel defaultSize={70} minSize={30}>
            <ResizablePanelGroup direction="horizontal">
              {/* Watchlist Panel */}
              {panelVisibility.watchlist && (
                <>
                  <ResizablePanel
                    defaultSize={20}
                    minSize={15}
                    maxSize={35}
                    className="min-w-[250px]"
                  >
                    <div className="h-full p-4">
                      <Watchlist
                        onSymbolSelect={(symbol) => {
                          setSelectedSymbol(symbol);
                          setCurrentPrice(
                            symbol === "BTCUSD" ? 43250.5 : 1.08545
                          );
                        }}
                        selectedSymbol={selectedSymbol}
                      />
                    </div>
                  </ResizablePanel>
                  <ResizableHandle withHandle data-testid="handle-watchlist" />
                </>
              )}

              {/* Chart Panel */}
              <ResizablePanel defaultSize={60} minSize={40}>
                <div className="h-full p-4">
                  <TradingChart
                    symbol={selectedSymbol}
                    connectionStatus="connected"
                  />
                </div>
              </ResizablePanel>

              {/* Order Ticket Panel */}
              {panelVisibility.orderTicket && (
                <>
                  <ResizableHandle withHandle data-testid="handle-order-ticket" />
                  <ResizablePanel
                    defaultSize={20}
                    minSize={15}
                    maxSize={35}
                    className="min-w-[280px]"
                  >
                    <div className="h-full p-4">
                      <OrderTicket
                        symbol={selectedSymbol}
                        currentPrice={currentPrice}
                      />
                    </div>
                  </ResizablePanel>
                </>
              )}
            </ResizablePanelGroup>
          </ResizablePanel>

          {/* Bottom Panel: Positions/Orders/History */}
          {panelVisibility.positions && (
            <>
              <ResizableHandle withHandle data-testid="handle-positions" />
              <ResizablePanel
                defaultSize={30}
                minSize={20}
                maxSize={50}
                className="min-h-[200px]"
              >
                <div className="h-full p-4">
                  <Card className="h-full flex flex-col">
                    <Tabs defaultValue="positions" className="flex-1 flex flex-col">
                      <div className="px-6 pt-4 pb-2">
                        <TabsList data-testid="tabs-positions-orders">
                          <TabsTrigger value="positions" data-testid="tab-positions">
                            Positions
                          </TabsTrigger>
                          <TabsTrigger value="orders" data-testid="tab-orders">
                            Orders
                          </TabsTrigger>
                          <TabsTrigger value="history" data-testid="tab-history">
                            History
                          </TabsTrigger>
                        </TabsList>
                      </div>

                      <TabsContent
                        value="positions"
                        className="flex-1 px-6 pb-6 mt-0"
                      >
                        <PositionsTable />
                      </TabsContent>

                      <TabsContent
                        value="orders"
                        className="flex-1 px-6 pb-6 mt-0"
                      >
                        <OrdersTable />
                      </TabsContent>

                      <TabsContent
                        value="history"
                        className="flex-1 px-6 pb-6 mt-0"
                      >
                        <div className="flex h-full items-center justify-center rounded-md border border-dashed">
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">
                              Trade history will appear here
                            </p>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </Card>
                </div>
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
