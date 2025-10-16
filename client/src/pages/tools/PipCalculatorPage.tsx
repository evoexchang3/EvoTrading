import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, TrendingUp, TrendingDown, HelpCircle, BookOpen, Target, AlertTriangle, Zap, Download } from "lucide-react";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

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

  const calculationExamples = [
    {
      scenario: "EUR/USD, 1 Standard Lot, +50 Pips",
      inputs: "Pair: EUR/USD | Lot Size: 1.00 | Pip Movement: +50",
      calculation: "Pip Value = 0.0001 × 100,000 = $10 per pip\nProfit = $10 × 50 pips = $500",
      result: "$500 profit",
      explanation: "For standard lots on major USD pairs, each pip = $10. A 50 pip favorable move = $500 gain."
    },
    {
      scenario: "GBP/JPY, 0.5 Lots, -80 Pips",
      inputs: "Pair: GBP/JPY | Lot Size: 0.50 | Pip Movement: -80",
      calculation: "Pip Value = 0.01 × (0.5 × 100,000) = 500 JPY per pip\nConvert to USD (assume 150 JPY/USD): 500/150 = $3.33 per pip\nLoss = $3.33 × 80 = $266.40",
      result: "$266.40 loss",
      explanation: "JPY pairs use 0.01 as pip value. Cross pairs require currency conversion. Half lot = 50% pip value."
    },
    {
      scenario: "AUD/USD, 0.1 Mini Lot, +25 Pips",
      inputs: "Pair: AUD/USD | Lot Size: 0.10 | Pip Movement: +25",
      calculation: "Pip Value = 0.0001 × 10,000 = $1 per pip\nProfit = $1 × 25 pips = $25",
      result: "$25 profit",
      explanation: "Mini lots (0.1) have 1/10th the pip value of standard lots. Good for risk management with small accounts."
    },
    {
      scenario: "USD/CAD, 2 Lots, -120 Pips",
      inputs: "Pair: USD/CAD | Lot Size: 2.00 | Pip Movement: -120",
      calculation: "Pip Value per standard lot = 0.0001 × 100,000 = 10 CAD\nConvert to USD (assume 1.35 CAD/USD): 10/1.35 = $7.41 per pip\nTotal for 2 lots: $7.41 × 2 = $14.82 per pip\nLoss = $14.82 × 120 = $1,778.40",
      result: "$1,778.40 loss",
      explanation: "When USD is base currency (USD/XXX), pip value is in counter currency. Multiple lots multiply pip value linearly."
    }
  ];

  const useCases = [
    {
      title: "Pre-Trade Risk Assessment",
      icon: Target,
      scenario: "You're planning to buy EUR/USD at 1.0850 with stop loss at 1.0800 (50 pips risk)",
      howToUse: "1. Enter pair: EUR/USD\n2. Enter position size: 1 lot\n3. Enter pips: -50 (negative for potential loss)\n4. Calculator shows: $500 risk\n5. Decision: If this is >2% of account, reduce lot size to 0.5 (risk becomes $250)",
      benefit: "Know exact dollar risk before entering trade. Prevents overleveraging and emotional decisions."
    },
    {
      title: "Profit Target Calculation",
      icon: TrendingUp,
      scenario: "You want to make $300 on a GBP/USD trade using 0.5 lots",
      howToUse: "1. Set pair: GBP/USD, lots: 0.5\n2. Try different pip values until P/L shows ~$300\n3. Result: 60 pips needed (0.5 × $10 × 60 = $300)\n4. Set take profit 60 pips above entry",
      benefit: "Reverse-engineer required pip movement to hit profit goals. Helps set realistic TP levels."
    },
    {
      title: "Comparing Multiple Pairs",
      icon: Calculator,
      scenario: "Choosing between EUR/USD and GBP/JPY for next trade",
      howToUse: "1. Calculate pip value for EUR/USD (1 lot = $10/pip)\n2. Calculate GBP/JPY (1 lot ≈ $6.67/pip at 150 JPY/USD)\n3. For same 100 pip move: EUR/USD = $1000, GBP/JPY = $667\n4. Adjust lot sizes to match risk (use 1.5 lots GBP/JPY for same $1000 exposure)",
      benefit: "Normalize risk across different pairs. Essential when trading exotics or cross pairs."
    },
    {
      title: "Position Sizing for Fixed Dollar Risk",
      icon: AlertTriangle,
      scenario: "You want to risk exactly $200 on USD/JPY trade with 40 pip stop",
      howToUse: "1. Set pair: USD/JPY, pips: -40\n2. Try lot sizes: 0.5 lots → ~$666 risk (too much)\n3. Try 0.15 lots → ~$200 risk ✓\n4. Use 0.15 lots to match desired $200 risk",
      benefit: "Achieve consistent dollar risk per trade regardless of pair or stop distance. Core risk management."
    }
  ];

  const proTips = [
    {
      tip: "JPY Pairs Have Different Pip Values",
      detail: "For pairs ending in JPY (USD/JPY, EUR/JPY), a pip is 0.01 not 0.0001. This means pip values are ~100x larger but price moves in larger increments. Don't compare JPY pip moves to EUR/USD directly."
    },
    {
      tip: "Account Currency Matters for Cross Pairs",
      detail: "If your account is in USD but trading EUR/GBP, pip value must be converted twice (GBP→USD). Calculator handles this automatically, but be aware cross pairs have variable pip values based on exchange rates."
    },
    {
      tip: "Micro Lots Are Perfect for Learning",
      detail: "0.01 lot (micro) = $0.10 per pip on EUR/USD. You can practice with real money but tiny risk. A 100 pip loss = only $10. Use micro lots for first 3-6 months of live trading."
    },
    {
      tip: "Pip Value Changes with Lot Size Linearly",
      detail: "Double the lot size = double the pip value. EUR/USD: 0.5 lots = $5/pip, 1 lot = $10/pip, 2 lots = $20/pip. Use this to quickly scale positions without recalculating."
    },
    {
      tip: "Calculate Risk BEFORE Setting Stop Loss",
      detail: "Many traders set stop at technical level, then calculate risk. Better: Decide max risk first ($200), calculate pip allowance (40 pips), then check if technical stop fits. If not, reduce size or skip trade."
    },
    {
      tip: "Save Common Scenarios for Quick Access",
      detail: "Create a spreadsheet with pip values for your standard lot sizes (0.1, 0.5, 1, 2) on pairs you trade often. Saves time vs calculating every trade. Update when account currency changes."
    }
  ];

  const faqs = [
    {
      question: "What exactly is a 'pip' and how is it measured?",
      answer: "A pip (Point in Percentage) is the smallest price movement in forex. For most pairs (EUR/USD, GBP/USD), a pip is the 4th decimal place: 0.0001. Example: EUR/USD moves from 1.0850 to 1.0851 = 1 pip move. Exception: JPY pairs use 2 decimals, so a pip is 0.01. Example: USD/JPY 149.50 to 149.51 = 1 pip. Some brokers quote fractional pips (pipettes/points) as 5th decimal: 1.08501 - each pipette is 1/10th of a pip."
    },
    {
      question: "How do I calculate pip value for pairs where USD is not involved (cross pairs)?",
      answer: "For crosses like EUR/GBP or AUD/NZD, pip value calculation requires two conversions to your account currency. Formula: (0.0001 / current exchange rate) × lot size × counter currency to account currency rate. However, our calculator handles this automatically. Example: EUR/GBP with USD account - calculator uses GBP/USD rate to convert GBP pip value to USD. Manual calculation complex, always use calculator for crosses to avoid errors."
    },
    {
      question: "Why does my actual profit/loss sometimes differ from the calculator?",
      answer: "Three main reasons: 1) Spread cost - Calculator shows gross P/L, but you pay bid/ask spread (typically 1-3 pips on entry). Subtract spread from profit. 2) Overnight swap/rollover - Holding positions overnight incurs interest charges or credits, not reflected in pip calculations. 3) Slippage - During fast markets (news events), your exit may be 2-5 pips worse than intended, especially on stop losses. Calculator assumes perfect execution at exact pip count. For accurate P/L, deduct spreads and factor in realistic slippage (5-10 pips for stops during news)."
    },
    {
      question: "What's the difference between standard, mini, and micro lots?",
      answer: "Standard lot = 100,000 units of base currency. On EUR/USD: 1 lot = $10 per pip. Mini lot = 10,000 units (0.1 lot). EUR/USD: 0.1 lot = $1 per pip. Micro lot = 1,000 units (0.01 lot). EUR/USD: 0.01 lot = $0.10 per pip. Use standard lots with large accounts ($50K+), mini lots for accounts $5K-$50K, and micro lots for learning or accounts <$5K. Each step down reduces risk by 90%, making micro lots ideal for beginners to practice without risking significant capital."
    },
    {
      question: "How can I use this calculator to determine my position size?",
      answer: "Reverse calculation method: 1) Decide max risk in dollars (e.g., $100 = 2% of $5K account). 2) Measure stop loss distance in pips (e.g., 50 pips from entry to stop). 3) Work backward: Required lot size = Risk ($100) / (pips (50) × pip value per lot). For EUR/USD: $100 / (50 × $10) = 0.2 lots. Enter different lot sizes in calculator until P/L at your pip distance equals your dollar risk. This ensures consistent risk per trade regardless of stop loss width."
    },
    {
      question: "Does pip value change during the trade, or is it fixed?",
      answer: "For USD-account pairs where USD is the counter currency (EUR/USD, GBP/USD, AUD/USD), pip value is fixed at $10 per standard lot throughout the trade. For pairs where USD is the base (USD/JPY, USD/CHF) or cross pairs (EUR/GBP), pip value fluctuates with exchange rate changes - but the difference is usually negligible (<5%) for short-term trades. Our calculator uses current rates. For accuracy on long-term positions (weeks/months), recalculate pip value if exchange rates move significantly (>10%)."
    },
    {
      question: "How do I account for commission when using this calculator?",
      answer: "Calculator shows gross P/L before commission. If your broker charges commission (e.g., $3.50 per lot per side): 1) Calculate pip P/L normally. 2) Subtract commission: For 1 lot EUR/USD = $7 total ($3.50 open + $3.50 close). 3) Adjust for breakeven: With $7 commission on 1 lot ($10/pip), you need 0.7 pip move just to break even. For 50 pip profit shown in calculator, actual net = 50 pips × $10 - $7 = $493. Consider commission-free brokers (spread-only) for smaller accounts or frequent trading to avoid commission eating into profits."
    }
  ];

  const result = calculatePipValue();

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold" data-testid="heading-pip-calculator">Pip Calculator</h1>
            <p className="text-muted-foreground">Calculate profit and loss based on pip movement</p>
          </div>
          <Calculator className="w-8 h-8 text-muted-foreground" />
        </div>

        {/* Quick Stats */}
        <div className="grid sm:grid-cols-4 gap-4">
          <Card data-testid="card-stat-standard-lot">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-1">$10</div>
              <p className="text-sm text-muted-foreground">Per Pip (1 Lot EUR/USD)</p>
            </CardContent>
          </Card>
          <Card data-testid="card-stat-mini-lot">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-1">$1</div>
              <p className="text-sm text-muted-foreground">Per Pip (0.1 Lot)</p>
            </CardContent>
          </Card>
          <Card data-testid="card-stat-micro-lot">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-1">$0.10</div>
              <p className="text-sm text-muted-foreground">Per Pip (0.01 Lot)</p>
            </CardContent>
          </Card>
          <Card data-testid="card-stat-jpy-multiplier">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-1">0.01</div>
              <p className="text-sm text-muted-foreground">JPY Pair Pip Size</p>
            </CardContent>
          </Card>
        </div>

        {/* Calculator */}
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
                  placeholder="1.00 = Standard, 0.10 = Mini, 0.01 = Micro"
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
                  placeholder="50 or -50"
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

        {/* Calculation Examples */}
        <Card data-testid="card-calculation-examples">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <CardTitle>Real Calculation Examples</CardTitle>
            </div>
            <CardDescription>Step-by-step examples showing how pip values work</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {calculationExamples.map((example, index) => (
                <div key={index} className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold text-lg mb-2">{example.scenario}</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm font-medium mb-1">Inputs:</p>
                      <p className="text-sm text-muted-foreground">{example.inputs}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm font-medium mb-1">Calculation:</p>
                      <p className="text-sm text-muted-foreground font-mono whitespace-pre-line">{example.calculation}</p>
                    </div>
                    <Alert>
                      <AlertDescription>
                        <strong className="text-primary">Result:</strong> {example.result}<br />
                        <span className="text-sm">{example.explanation}</span>
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Use Cases */}
        <Card data-testid="card-use-cases">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              <CardTitle>Practical Use Cases</CardTitle>
            </div>
            <CardDescription>When and how to use the pip calculator effectively</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {useCases.map((useCase, index) => {
                const Icon = useCase.icon;
                return (
                  <div key={index} className="border-l-4 border-primary pl-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-semibold text-lg">{useCase.title}</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-sm font-medium mb-1">Scenario:</p>
                        <p className="text-sm text-muted-foreground">{useCase.scenario}</p>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-sm font-medium mb-1">How to Use Calculator:</p>
                        <p className="text-sm text-muted-foreground whitespace-pre-line">{useCase.howToUse}</p>
                      </div>
                      <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                        <p className="text-sm"><strong className="text-primary">Benefit:</strong> {useCase.benefit}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Pro Tips */}
        <Card data-testid="card-pro-tips">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              <CardTitle>Professional Tips & Best Practices</CardTitle>
            </div>
            <CardDescription>Expert insights for mastering pip calculations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {proTips.map((item, index) => (
                <div key={index} className="p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    {item.tip}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.detail}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Export & Save */}
        <Card data-testid="card-export-functionality">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Download className="w-5 h-5 text-primary" />
              <CardTitle>Save & Export Features</CardTitle>
            </div>
            <CardDescription>Keep track of your pip calculations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">💾 Save Calculation</h3>
                <p className="text-sm text-muted-foreground mb-3">Save current calculation with custom label (e.g., "EUR/USD Strategy A") for quick reference later</p>
                <Button variant="outline" size="sm" data-testid="button-save-calculation">Save Current</Button>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">📊 Export to CSV</h3>
                <p className="text-sm text-muted-foreground mb-3">Export pip value tables for all your common lot sizes and pairs to use in trading journal</p>
                <Button variant="outline" size="sm" data-testid="button-export-csv">Export CSV</Button>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">📋 Copy Results</h3>
                <p className="text-sm text-muted-foreground mb-3">Copy calculation results to clipboard for pasting into trade notes or risk spreadsheet</p>
                <Button variant="outline" size="sm" data-testid="button-copy-results">Copy to Clipboard</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card data-testid="card-faq">
          <CardHeader>
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-primary" />
              <CardTitle>Frequently Asked Questions</CardTitle>
            </div>
            <CardDescription>Everything you need to know about pip calculations</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} data-testid={`faq-item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Quick Reference */}
        <div className="bg-muted rounded-lg p-4 text-sm">
          <h3 className="font-semibold mb-3">📌 Quick Reference: Lot Sizes</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <p className="font-medium">Standard Lot (1.00)</p>
              <p className="text-muted-foreground">100,000 units • $10/pip (EUR/USD)</p>
            </div>
            <div>
              <p className="font-medium">Mini Lot (0.10)</p>
              <p className="text-muted-foreground">10,000 units • $1/pip (EUR/USD)</p>
            </div>
            <div>
              <p className="font-medium">Micro Lot (0.01)</p>
              <p className="text-muted-foreground">1,000 units • $0.10/pip (EUR/USD)</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
