import { useState } from "react";
import { Watchlist } from "@/components/Watchlist";
import { TradingChart } from "@/components/TradingChart";
import { OrderTicket } from "@/components/OrderTicket";
import { AccountSummary } from "@/components/AccountSummary";
import { PositionsTable } from "@/components/PositionsTable";
import { OrdersTable } from "@/components/OrdersTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export default function DashboardPage() {
  const [selectedSymbol, setSelectedSymbol] = useState("EURUSD");
  const marginLevel = 4724.51; // Mock data
  const showMarginWarning = marginLevel < 150;

  return (
    <div className="flex h-full flex-col gap-4 p-6">
      {/* Margin Warning */}
      {showMarginWarning && (
        <Alert className="border-chart-4 bg-chart-4/10">
          <AlertTriangle className="h-4 w-4 text-chart-4" />
          <AlertDescription className="text-chart-4">
            Warning: Your margin level is below 150%. Please close positions or add funds to avoid liquidation.
          </AlertDescription>
        </Alert>
      )}

      {/* Account Summary */}
      <AccountSummary />

      {/* Main Trading Area */}
      <div className="flex flex-1 gap-4 min-h-0">
        {/* Watchlist Sidebar */}
        <div className="w-80 flex-shrink-0">
          <Watchlist 
            onSymbolSelect={setSelectedSymbol} 
            selectedSymbol={selectedSymbol} 
          />
        </div>

        {/* Chart & Order Ticket */}
        <div className="flex flex-1 gap-4 min-w-0">
          {/* Chart */}
          <div className="flex-1 min-w-0">
            <TradingChart symbol={selectedSymbol} />
          </div>

          {/* Order Ticket */}
          <div className="w-80 flex-shrink-0">
            <OrderTicket symbol={selectedSymbol} />
          </div>
        </div>
      </div>

      {/* Positions & Orders */}
      <Card>
        <CardHeader className="pb-3">
          <Tabs defaultValue="positions" className="w-full">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="positions" data-testid="tab-positions">
                  Open Positions
                </TabsTrigger>
                <TabsTrigger value="orders" data-testid="tab-orders">
                  Pending Orders
                </TabsTrigger>
                <TabsTrigger value="history" data-testid="tab-history">
                  History
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="positions" className="mt-4">
              <PositionsTable />
            </TabsContent>
            <TabsContent value="orders" className="mt-4">
              <OrdersTable />
            </TabsContent>
            <TabsContent value="history" className="mt-4">
              <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
                <p className="text-sm text-muted-foreground">No trade history</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardHeader>
      </Card>
    </div>
  );
}
