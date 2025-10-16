import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, TrendingUp, TrendingDown } from "lucide-react";
import { useState } from "react";

export default function PipCalculatorPage() {
  const [symbol, setSymbol] = useState("EURUSD");
  const [lots, setLots] = useState("1");
  const [pips, setPips] = useState("50");
  const [accountCurrency, setAccountCurrency] = useState("USD");

  const calculatePipValue = () => {
    const lotSize = parseFloat(lots) || 0;
    const pipCount = parseFloat(pips) || 0;

    let pipValue = 0;
    if (symbol.includes("JPY")) {
      pipValue = (0.01 * lotSize * 100000) / 1;
    } else {
      pipValue = (0.0001 * lotSize * 100000) / 1;
    }

    const profitLoss = pipValue * pipCount;

    return {
      pipValue: pipValue.toFixed(2),
      profitLoss: profitLoss.toFixed(2),
      isProfit: pipCount > 0
    };
  };

  const result = calculatePipValue();

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Pip Calculator</h1>
            <p className="text-muted-foreground">Calculate profit and loss based on pip movement</p>
          </div>
          <Calculator className="w-8 h-8 text-muted-foreground" />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Trade Parameters</CardTitle>
              <CardDescription>Enter your position details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="symbol">Currency Pair</Label>
                <Select value={symbol} onValueChange={setSymbol}>
                  <SelectTrigger id="symbol" data-testid="select-symbol">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EURUSD">EUR/USD</SelectItem>
                    <SelectItem value="GBPUSD">GBP/USD</SelectItem>
                    <SelectItem value="USDJPY">USD/JPY</SelectItem>
                    <SelectItem value="AUDUSD">AUD/USD</SelectItem>
                    <SelectItem value="USDCAD">USD/CAD</SelectItem>
                    <SelectItem value="NZDUSD">NZD/USD</SelectItem>
                    <SelectItem value="EURGBP">EUR/GBP</SelectItem>
                    <SelectItem value="EURJPY">EUR/JPY</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lots">Position Size (Lots)</Label>
                <Input
                  id="lots"
                  type="number"
                  step="0.01"
                  value={lots}
                  onChange={(e) => setLots(e.target.value)}
                  data-testid="input-lots"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pips">Pip Movement (+ for profit, - for loss)</Label>
                <Input
                  id="pips"
                  type="number"
                  value={pips}
                  onChange={(e) => setPips(e.target.value)}
                  data-testid="input-pips"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="account-currency">Account Currency</Label>
                <Select value={accountCurrency} onValueChange={setAccountCurrency}>
                  <SelectTrigger id="account-currency" data-testid="select-account-currency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="JPY">JPY</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Calculation Result</CardTitle>
              <CardDescription>Profit/Loss based on pip movement</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Pip Value</p>
                <p className="text-2xl font-bold" data-testid="text-pip-value-result">
                  {accountCurrency} {result.pipValue} per pip
                </p>
              </div>

              <div className={`p-6 rounded-lg ${result.isProfit ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                <div className="flex items-center gap-2 mb-2">
                  {result.isProfit ? (
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-500" />
                  )}
                  <p className="text-sm text-muted-foreground">
                    {result.isProfit ? 'Profit' : 'Loss'}
                  </p>
                </div>
                <p className={`text-3xl font-bold ${result.isProfit ? 'text-green-500' : 'text-red-500'}`} data-testid="text-profit-loss">
                  {result.isProfit ? '+' : ''}{accountCurrency} {result.profitLoss}
                </p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between p-2 bg-muted rounded">
                  <span className="text-muted-foreground">Position Size</span>
                  <span className="font-semibold">{lots} Lots</span>
                </div>
                <div className="flex justify-between p-2 bg-muted rounded">
                  <span className="text-muted-foreground">Pip Movement</span>
                  <span className="font-semibold">{pips} pips</span>
                </div>
                <div className="flex justify-between p-2 bg-muted rounded">
                  <span className="text-muted-foreground">Symbol</span>
                  <span className="font-semibold">{symbol}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-muted rounded-lg p-4 text-sm">
          <h3 className="font-semibold mb-2">Understanding Pips</h3>
          <ul className="space-y-1 text-muted-foreground">
            <li>• A pip is the smallest price move in forex (usually 0.0001 for most pairs)</li>
            <li>• For JPY pairs, a pip is 0.01 (2 decimal places instead of 4)</li>
            <li>• Standard lot = 100,000 units, Mini lot = 10,000 units, Micro lot = 1,000 units</li>
            <li>• Pip value varies based on position size and currency pair</li>
            <li>• Use this calculator to determine potential profit/loss before entering a trade</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}
