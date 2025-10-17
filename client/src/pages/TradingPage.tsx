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
import { TradesTable } from "@/components/TradesTable";
import { AccountInfoBar } from "@/components/AccountInfoBar";
import { useWebSocketContext } from "@/contexts/WebSocketContext";
import { useLanguage } from "@/hooks/useLanguage";
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
  const { t } = useLanguage();
  const [selectedSymbol, setSelectedSymbol] = useState(initialSymbol || "EURUSD");
  const [panelVisibility, setPanelVisibility] = useState<PanelVisibility>({
    watchlist: true,
    orderTicket: true,
    positions: true,
  });

  const { prices, subscribe } = useWebSocketContext();
  const priceData = prices[selectedSymbol];
  const currentPrice = priceData?.bid || priceData?.ask || 0;
  const priceTimestamp = priceData?.timestamp;

  useEffect(() => {
    subscribe([selectedSymbol]);
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
              {t('trading.toolbar.backToDashboard')}
            </Button>
          </Link>
          <div className="h-4 w-px bg-border" />
          <h1 className="text-lg font-semibold" data-testid="text-trading-platform">{t('trading.title')}</h1>
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
            {t('trading.toolbar.watchlist')}
          </Button>
          <Button
            size="sm"
            variant={panelVisibility.orderTicket ? "secondary" : "ghost"}
            onClick={() => togglePanel("orderTicket")}
            data-testid="button-toggle-order-ticket"
            className="h-8"
          >
            <PanelRight className="h-4 w-4 mr-2" />
            {t('trading.toolbar.orderTicket')}
          </Button>
          <Button
            size="sm"
            variant={panelVisibility.positions ? "secondary" : "ghost"}
            onClick={() => togglePanel("positions")}
            data-testid="button-toggle-positions"
            className="h-8"
          >
            <PanelBottom className="h-4 w-4 mr-2" />
            {t('trading.toolbar.positions')}
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
            {t('trading.toolbar.resetLayout')}
          </Button>
        </div>
      </div>

      {/* Account Info Bar */}
      <AccountInfoBar />

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
                        onSymbolSelect={setSelectedSymbol}
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
                        priceTimestamp={priceTimestamp}
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
                    <Tabs defaultValue="positions" className="flex-1 flex flex-col min-h-0">
                      <div className="px-6 pt-4 pb-2 flex-shrink-0">
                        <TabsList data-testid="tabs-positions-orders">
                          <TabsTrigger value="positions" data-testid="tab-positions">
                            {t('trading.tabs.positions')}
                          </TabsTrigger>
                          <TabsTrigger value="orders" data-testid="tab-orders">
                            {t('trading.tabs.orders')}
                          </TabsTrigger>
                          <TabsTrigger value="history" data-testid="tab-history">
                            {t('trading.tabs.history')}
                          </TabsTrigger>
                        </TabsList>
                      </div>

                      <TabsContent
                        value="positions"
                        className="flex-1 min-h-0 px-6 pb-6 mt-0 overflow-auto"
                      >
                        <PositionsTable />
                      </TabsContent>

                      <TabsContent
                        value="orders"
                        className="flex-1 min-h-0 px-6 pb-6 mt-0 overflow-auto"
                      >
                        <OrdersTable />
                      </TabsContent>

                      <TabsContent
                        value="history"
                        className="flex-1 min-h-0 px-6 pb-6 mt-0 overflow-auto"
                      >
                        <TradesTable />
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
