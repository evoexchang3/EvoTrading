import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator } from "lucide-react";
import { useState } from "react";

export default function PositionCalculatorPage() {
  const [accountBalance, setAccountBalance] = useState("10000");
  const [riskPercent, setRiskPercent] = useState("2");
  const [entryPrice, setEntryPrice] = useState("1.1000");
  const [stopLoss, setStopLoss] = useState("1.0950");
  const [currency, setCurrency] = useState("USD");

  const calculatePositionSize = () => {
    const balance = parseFloat(accountBalance) || 0;
    const risk = parseFloat(riskPercent) || 0;
    const entry = parseFloat(entryPrice) || 0;
    const sl = parseFloat(stopLoss) || 0;

    const riskAmount = (balance * risk) / 100;
    const pipDiff = Math.abs(entry - sl) * 10000;
    
    if (pipDiff === 0) return { lots: 0, units: 0, riskAmount: 0, pipValue: 0 };

    const pipValue = riskAmount / pipDiff;
    const units = Math.floor(pipValue * 100000) / 10;
    const lots = units / 100000;

    return {
      lots: lots.toFixed(2),
      units: Math.floor(units),
      riskAmount: riskAmount.toFixed(2),
      pipValue: pipValue.toFixed(2),
      pipDiff: pipDiff.toFixed(1)
    };
  };

  const result = calculatePositionSize();

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Position Size Calculator</h1>
            <p className="text-muted-foreground">Calculate optimal position size based on risk management</p>
          </div>
          <Calculator className="w-8 h-8 text-muted-foreground" />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Input Parameters</CardTitle>
              <CardDescription>Enter your account details and trade setup</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="account-balance">Account Balance</Label>
                <Input
                  id="account-balance"
                  type="number"
                  value={accountBalance}
                  onChange={(e) => setAccountBalance(e.target.value)}
                  data-testid="input-account-balance"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Account Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger id="currency" data-testid="select-currency">
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

              <div className="space-y-2">
                <Label htmlFor="risk-percent">Risk per Trade (%)</Label>
                <Input
                  id="risk-percent"
                  type="number"
                  step="0.1"
                  value={riskPercent}
                  onChange={(e) => setRiskPercent(e.target.value)}
                  data-testid="input-risk-percent"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="entry-price">Entry Price</Label>
                <Input
                  id="entry-price"
                  type="number"
                  step="0.0001"
                  value={entryPrice}
                  onChange={(e) => setEntryPrice(e.target.value)}
                  data-testid="input-entry-price"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stop-loss">Stop Loss Price</Label>
                <Input
                  id="stop-loss"
                  type="number"
                  step="0.0001"
                  value={stopLoss}
                  onChange={(e) => setStopLoss(e.target.value)}
                  data-testid="input-stop-loss"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Calculated Position Size</CardTitle>
              <CardDescription>Recommended lot size based on your risk parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 bg-primary/10 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Position Size</p>
                  <p className="text-3xl font-bold" data-testid="text-position-lots">
                    {result.lots} Lots
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    ({result.units} units)
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Risk Amount</p>
                    <p className="text-xl font-semibold" data-testid="text-risk-amount">
                      {currency} {result.riskAmount}
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Stop Loss Pips</p>
                    <p className="text-xl font-semibold" data-testid="text-pip-diff">
                      {result.pipDiff}
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg col-span-2">
                    <p className="text-sm text-muted-foreground mb-1">Pip Value</p>
                    <p className="text-xl font-semibold" data-testid="text-pip-value">
                      {currency} {result.pipValue} per pip
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-muted rounded-lg p-4 text-sm">
          <h3 className="font-semibold mb-2">Risk Management Guidelines</h3>
          <ul className="space-y-1 text-muted-foreground">
            <li>• Never risk more than 1-2% of your account on a single trade</li>
            <li>• Always set a stop loss before entering a trade</li>
            <li>• Position size should be adjusted based on stop loss distance</li>
            <li>• Consider correlation between open positions to avoid overexposure</li>
            <li>• Use proper risk-reward ratio (minimum 1:2 recommended)</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}
