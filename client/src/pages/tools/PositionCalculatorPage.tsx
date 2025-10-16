import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, HelpCircle, BookOpen, Target, AlertTriangle, Zap, Download, Shield } from "lucide-react";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

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
    
    if (pipDiff === 0) return { lots: 0, units: 0, riskAmount: 0, pipValue: 0, pipDiff: 0 };

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

  const calculationExamples = [
    {
      scenario: "$10,000 Account, 2% Risk, EUR/USD 50 Pip Stop",
      inputs: "Balance: $10,000 | Risk: 2% | Entry: 1.1000 | Stop Loss: 1.0950 (50 pips)",
      calculation: "Step 1: Calculate risk amount = $10,000 × 2% = $200\nStep 2: Stop distance = |1.1000 - 1.0950| × 10,000 = 50 pips\nStep 3: Pip value needed = $200 ÷ 50 pips = $4 per pip\nStep 4: Position size = $4 ÷ $10 (standard lot pip value) = 0.4 lots",
      result: "0.40 lots (40,000 units)",
      explanation: "With a 50 pip stop and 2% risk, you can trade 0.4 lots. If stopped out, you lose exactly $200 (2% of account). Never exceed this size."
    },
    {
      scenario: "$5,000 Account, 1% Risk, GBP/USD 80 Pip Stop",
      inputs: "Balance: $5,000 | Risk: 1% | Entry: 1.2500 | Stop Loss: 1.2420 (80 pips)",
      calculation: "Step 1: Risk amount = $5,000 × 1% = $50\nStep 2: Stop distance = 80 pips\nStep 3: Pip value = $50 ÷ 80 = $0.625 per pip\nStep 4: Position size = $0.625 ÷ $10 = 0.0625 lots (or 0.06 rounded)",
      result: "0.06 lots (6,000 units)",
      explanation: "Wider stop (80 pips) means smaller position size to maintain $50 risk. Conservative 1% risk protects small account from significant drawdowns."
    },
    {
      scenario: "$50,000 Account, 3% Risk, USD/JPY 30 Pip Stop",
      inputs: "Balance: $50,000 | Risk: 3% | Entry: 150.00 | Stop Loss: 149.70 (30 pips)",
      calculation: "Step 1: Risk amount = $50,000 × 3% = $1,500\nStep 2: Stop distance = 30 pips (JPY pair, but same logic)\nStep 3: Pip value = $1,500 ÷ 30 = $50 per pip\nStep 4: Position size = $50 ÷ $10 ≈ 5 lots",
      result: "5.00 lots (500,000 units)",
      explanation: "Tight stop (30 pips) allows larger position. Warning: 3% risk is aggressive - recommended only for experienced traders with proven edge."
    },
    {
      scenario: "$2,000 Account, 2% Risk, AUD/USD 100 Pip Stop",
      inputs: "Balance: $2,000 | Risk: 2% | Entry: 0.6500 | Stop Loss: 0.6400 (100 pips)",
      calculation: "Step 1: Risk amount = $2,000 × 2% = $40\nStep 2: Stop distance = 100 pips\nStep 3: Pip value = $40 ÷ 100 = $0.40 per pip\nStep 4: Position size = $0.40 ÷ $10 = 0.04 lots",
      result: "0.04 lots (4,000 units / micro lots)",
      explanation: "Small account + wide stop = very small position. Consider micro lots (0.01). Better to skip trade if stop must be 100 pips - find better entry."
    }
  ];

  const riskManagementRules = [
    {
      rule: "The 2% Rule (Conservative Standard)",
      icon: Shield,
      description: "Never risk more than 2% of your account on any single trade",
      reasoning: "With 2% risk, you can withstand 50 consecutive losses before blowing account (unlikely with proper strategy). Most professional traders use 0.5-2% risk. Beginners should start at 1%.",
      example: "$10,000 account → Max $200 risk per trade. If stopped out 5 times in a row, you're only down $1,000 (10%), still plenty of capital to recover."
    },
    {
      rule: "Maximum 6% Total Risk Exposure",
      icon: AlertTriangle,
      description: "Combined risk across all open positions should not exceed 6%",
      reasoning: "Multiple losing trades can compound losses. If you have 3 trades open at 2% each (6% total) and all hit stops, you lose 6% in one event (e.g., major news). Reduce individual position sizes when holding multiple.",
      example: "If you want 3 positions open: Use 1.5% risk each (4.5% total) or 2% each but close one before opening third. Never exceed 6% combined."
    },
    {
      rule: "Adjust for Volatility & Pair Characteristics",
      icon: Zap,
      description: "Reduce position size for high-volatility pairs or exotic currencies",
      reasoning: "GBP/JPY moves 150+ pips daily (high volatility) vs EUR/CHF 30 pips (low). Using same 2% risk on both pairs gives different actual volatility exposure. Exotic pairs can gap 200+ pips on news.",
      example: "Standard trade: 2% risk, 50 pip stop on EUR/USD. High volatility (GBP/JPY): 1% risk, 80 pip stop. Exotic (USD/TRY): 0.5% risk, 150 pip stop. Scale risk down for unpredictable pairs."
    },
    {
      rule: "Stop Loss is Non-Negotiable",
      icon: Target,
      description: "Every trade MUST have a predefined stop loss before entry, no exceptions",
      reasoning: "Position size is meaningless without a stop. 'Mental stops' don't work - you'll move them when trade goes against you. Pre-set physical stop loss enforces discipline and limits losses to calculated risk.",
      example: "DON'T: Enter EUR/USD at 1.1000, 'I'll exit if it goes too far down.' DO: Enter 1.1000, stop at 1.0950 (50 pips), position 0.4 lots for $200 risk. System exits automatically."
    }
  ];

  const useCases = [
    {
      title: "Scalping with Tight Stops (5-15 Pips)",
      scenario: "EUR/USD scalp setup: Entry 1.0850, Stop 1.0845 (5 pips), $10K account, 1% risk",
      calculation: "Risk = $100, Stop = 5 pips → Pip value = $20 → Size = 2 lots",
      insight: "Very tight stop allows large position (2 lots). Scalping requires this. Risk: Spreads eat into profit (1.2 pip spread = 24% of 5 pip target). Use during London/NY overlap for tight spreads."
    },
    {
      title: "Swing Trading with Wide Stops (100+ Pips)",
      scenario: "GBP/USD swing: Entry 1.2500, Stop 1.2350 (150 pips), $10K account, 2% risk",
      calculation: "Risk = $200, Stop = 150 pips → Pip value = $1.33 → Size = 0.13 lots",
      insight: "Wide stop forces small position. That's OK - swing trades target 300-500 pips (2:1 to 3:1 R:R). One win covers 2-3 losses. Don't increase risk to get bigger size - adjust strategy."
    },
    {
      title: "Multiple Correlated Positions",
      scenario: "Trading EUR/USD long + GBP/USD long (80% correlated). Both lose if USD strengthens.",
      calculation: "Normal: 2% each = 4% total risk. Adjusted: 1.5% each = 3% total (safer).",
      insight: "When trading correlated pairs (EUR/USD + GBP/USD, or AUD/USD + NZD/USD), reduce individual position sizes. Treat them as one trade from risk perspective. If wrong, both lose together."
    },
    {
      title: "Pyramiding (Adding to Winners)",
      scenario: "Initial: 1 lot EUR/USD long, +50 pips profit. Want to add 1 more lot.",
      calculation: "DON'T: Add full 1 lot (2 lot total = 2x risk). DO: Add 0.5 lot (1.5 total) or move initial stop to breakeven first.",
      insight: "Pyramiding increases position size as trade profits. Risk: Reversal loses all gains + original risk. Solution: Move stop to breakeven on initial position before adding, or reduce add-on size to 50%."
    }
  ];

  const proTips = [
    {
      tip: "Calculate Position Size BEFORE Finding Entry",
      detail: "Many traders find setup, then calculate size. Better: Decide max risk ($200), then find setups that fit. If only setup has 200 pip stop but you can only afford 50 pip stop at proper size, skip trade."
    },
    {
      tip: "Use This Calculator for Every Single Trade",
      detail: "Don't eyeball position size or use 'standard' lot size. Account balance changes daily (profits/losses), risk % may vary by setup quality. Recalculate each trade - takes 30 seconds, saves account."
    },
    {
      tip: "If Calculator Shows Very Small Size (<0.05 lots), Reconsider Trade",
      detail: "If $5K account + 100 pip stop + 1% risk = 0.05 lots, spread/commission eats significant portion. Either reduce stop (better entry), increase risk (risky), or skip trade. Micro accounts struggle with wide stops."
    },
    {
      tip: "Stop Distance is More Important Than Direction",
      detail: "Many traders focus on 'will it go up/down' but ignore 'how far to stop.' A great setup with bad entry (wide stop) forces tiny size. A decent setup with tight stop (proper entry) allows proper size. Entry quality matters."
    },
    {
      tip: "Create a Position Sizing Spreadsheet for Common Scenarios",
      detail: "Pre-calculate position sizes for your account at different stop distances (20, 30, 50, 75, 100 pips) and risk levels (1%, 1.5%, 2%). Faster execution when opportunity appears. Update monthly as balance changes."
    },
    {
      tip: "Account for Spread in Stop Distance",
      detail: "If EUR/USD spread is 1.2 pips, entry 1.0850, stop 1.0830 (20 pips chart distance), ACTUAL risk is 21.2 pips (20 + 1.2 spread). Add spread to stop distance for accurate position size calculation."
    }
  ];

  const faqs = [
    {
      question: "What percentage of my account should I risk per trade?",
      answer: "Conservative (recommended for beginners): 0.5-1% per trade. Standard (intermediate): 1-2% per trade. Aggressive (experienced only): 2-3% per trade. Never exceed 3%. At 1% risk, you can lose 100 trades before account is gone (impossible with any strategy). At 5% risk, 20 losses = game over (very possible in rough month). Most blown accounts came from 5-10% risk per trade. Start at 1%, increase to 2% only after 6+ months of consistent profitability."
    },
    {
      question: "How do I calculate position size if I don't know the pip value?",
      answer: "Use this formula for any pair: Position Size (lots) = (Account Risk $ ) / (Stop Loss pips × Pip Value). If you don't know pip value: For EUR/USD, GBP/USD, AUD/USD, NZD/USD (USD is counter currency): $10 per pip per standard lot. For USD/JPY, USD/CHF, USD/CAD (USD is base): ~$7-9 per pip per lot (varies with exchange rate). For crosses (EUR/GBP, etc.): Use our calculator - too complex to calculate manually. Quick shortcut: For USD account trading major pairs, assume $10/pip, calculate, then verify in calculator."
    },
    {
      question: "Should I use the same position size for every trade or vary it?",
      answer: "Vary position size based on these factors: 1) Stop loss distance - Wider stop = smaller size to maintain constant dollar risk. 2) Setup quality - A-grade setups (3+ confluences): 2% risk. B-grade (1-2 confluences): 1% risk. C-grade (marginal): 0.5% or skip. 3) Market conditions - High volatility/news: Reduce all positions by 50%. Never vary size based on 'feeling confident' or trying to recover losses (revenge trading). Use objective criteria only."
    },
    {
      question: "What if the calculated position size is larger than my broker's maximum?",
      answer: "If calculator shows 20 lots but broker max is 10 lots per order: 1) Split into multiple orders (2 × 10 lots) with same entry/stop. 2) Reduce risk % to fit within 10 lot limit. 3) Switch to institutional broker (Interactive Brokers, etc.) with higher limits. This is a 'good problem' - means you have large account ($100K+). Most retail traders never hit this. For accounts >$500K, consider prime broker with no lot limits and institutional pricing."
    },
    {
      question: "How do I account for overnight swap/rollover fees in position sizing?",
      answer: "Swap fees are typically 0.5-3 pips per night and don't affect position size calculation for day trades or swing trades <1 week. For longer holds: 1) Check swap rate (e.g., -$2 per lot per night on EUR/USD long). 2) Calculate total swap for hold period: 30 days × $2 × 1 lot = $60. 3) Add to risk: If normal stop loss risk is $200, total risk = $200 + $60 = $260. 4) Calculate position size using $260 as total risk, not $200. For carry trades (holding for weeks), swap can exceed stop loss risk - factor it in heavily."
    },
    {
      question: "What's the difference between 'fixed fractional' and 'fixed ratio' position sizing?",
      answer: "Fixed Fractional (recommended for most traders): Risk a fixed % of current account balance per trade. Example: 2% of $10K = $200 risk. Account grows to $12K → 2% = $240 risk. Position size scales with account automatically. Pros: Compounds gains, reduces risk on drawdowns. Cons: Slow growth initially. Fixed Ratio: Risk increases only after specific profit target (e.g., increase size by 1 lot per $5K profit). Example: 1 lot until $15K, then 2 lots until $20K. Pros: Controlled growth. Cons: Complex to manage. For 95% of traders, use Fixed Fractional - it's mathematically optimal and emotionally easier."
    },
    {
      question: "How should I adjust position size during a losing streak?",
      answer: "During losing streak (3+ losses in a row): REDUCE position size to 50% of normal, not increase to 'make it back' (revenge trading). Example: Normal 2% risk → Reduce to 1% after 3 losses. After 5 losses → 0.5% or stop trading for 1 week to reassess strategy. DO NOT: Increase to 4-5% to recover losses quickly - this is how accounts blow up. The goal during drawdown is capital preservation, not recovery. Recovery happens naturally when strategy works again. Alternatively, use fixed dollar risk that doesn't change ($200 per trade regardless of account size) - prevents downward spiral where smaller account + same % = even smaller $ risk."
    }
  ];

  const result = calculatePositionSize();

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold" data-testid="heading-position-calculator">Position Size Calculator</h1>
            <p className="text-muted-foreground">Calculate optimal position size based on risk management</p>
          </div>
          <Calculator className="w-8 h-8 text-muted-foreground" />
        </div>

        {/* Quick Stats */}
        <div className="grid sm:grid-cols-4 gap-4">
          <Card data-testid="card-stat-recommended-risk">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-1">1-2%</div>
              <p className="text-sm text-muted-foreground">Recommended Risk Per Trade</p>
            </CardContent>
          </Card>
          <Card data-testid="card-stat-max-exposure">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-1">6%</div>
              <p className="text-sm text-muted-foreground">Max Total Exposure</p>
            </CardContent>
          </Card>
          <Card data-testid="card-stat-stop-required">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-1">100%</div>
              <p className="text-sm text-muted-foreground">Trades Need Stop Loss</p>
            </CardContent>
          </Card>
          <Card data-testid="card-stat-survival">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-1">50+</div>
              <p className="text-sm text-muted-foreground">Losses to Survive (2% Risk)</p>
            </CardContent>
          </Card>
        </div>

        {/* Calculator */}
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
                  placeholder="10000"
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
                  placeholder="1-2% recommended"
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
                  placeholder="1.1000"
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
                  placeholder="1.0950"
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

        {/* Calculation Examples */}
        <Card data-testid="card-calculation-examples">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <CardTitle>Step-by-Step Calculation Examples</CardTitle>
            </div>
            <CardDescription>Real scenarios showing how position sizing works</CardDescription>
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
                      <p className="text-sm font-medium mb-1">Calculation Steps:</p>
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

        {/* Risk Management Rules */}
        <Card data-testid="card-risk-rules">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <CardTitle>Core Risk Management Rules</CardTitle>
            </div>
            <CardDescription>Professional money management principles for consistent trading</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {riskManagementRules.map((rule, index) => {
                const Icon = rule.icon;
                return (
                  <div key={index} className="border-l-4 border-primary pl-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{rule.rule}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{rule.description}</p>
                      </div>
                    </div>
                    <div className="p-4 bg-muted rounded-lg mb-3">
                      <p className="text-sm"><strong>Why This Matters:</strong> {rule.reasoning}</p>
                    </div>
                    <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                      <p className="text-sm"><strong className="text-primary">Example:</strong> {rule.example}</p>
                    </div>
                  </div>
                );
              })}
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
            <CardDescription>Position sizing for different trading scenarios</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {useCases.map((useCase, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-3">{useCase.title}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="p-2 bg-muted rounded">
                      <p className="text-muted-foreground">{useCase.scenario}</p>
                    </div>
                    <div className="p-2 bg-muted rounded">
                      <p className="font-medium">Calculation:</p>
                      <p className="text-muted-foreground">{useCase.calculation}</p>
                    </div>
                    <Alert>
                      <AlertDescription className="text-sm">
                        <strong>Key Insight:</strong> {useCase.insight}
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
              ))}
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
            <CardDescription>Expert position sizing strategies</CardDescription>
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
            <CardDescription>Track and analyze your position sizing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">💾 Save Calculation</h3>
                <p className="text-sm text-muted-foreground mb-3">Save position size for each strategy/pair combination for quick reference before entering trades</p>
                <Button variant="outline" size="sm" data-testid="button-save-calculation">Save Current</Button>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">📊 Position Size Table</h3>
                <p className="text-sm text-muted-foreground mb-3">Generate table of lot sizes for your account at various stop distances (20, 30, 50, 75, 100 pips) </p>
                <Button variant="outline" size="sm" data-testid="button-export-table">Export Table</Button>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">📋 Trade Journal Integration</h3>
                <p className="text-sm text-muted-foreground mb-3">Copy calculation results with timestamp to paste into your trading journal or risk log</p>
                <Button variant="outline" size="sm" data-testid="button-copy-journal">Copy for Journal</Button>
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
            <CardDescription>Everything you need to know about position sizing and risk management</CardDescription>
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
      </div>
    </DashboardLayout>
  );
}
