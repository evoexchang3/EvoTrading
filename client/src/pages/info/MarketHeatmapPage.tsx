import { LandingLayout } from "@/components/LandingLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Grid3x3, TrendingUp, TrendingDown, Eye, HelpCircle, ArrowRight, Activity, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function MarketHeatmapPage() {
  const heatmapTypes = [
    {
      title: "Currency Strength Heatmap",
      icon: TrendingUp,
      description: "Visual representation of relative currency strength across major pairs",
      features: [
        "Compare 8 major currencies: USD, EUR, GBP, JPY, AUD, NZD, CAD, CHF",
        "Color coding: Dark Green = strongest (>1%), Red = weakest (<-1%)",
        "Updated in real-time based on weighted price movements across all pairs",
        "Helps identify which currencies are trending vs ranging"
      ],
      useCase: "Use to find the strongest vs weakest currency pairs for trending trades. For example, if USD is strongest (+1.5%) and JPY is weakest (-1.2%), consider buying USD/JPY. Avoid pairs where both currencies show similar strength (low relative movement).",
      updateFrequency: "Real-time (tick-by-tick)",
      bestTimeframe: "Intraday to swing trading"
    },
    {
      title: "Asset Class Performance Heatmap",
      icon: Grid3x3,
      description: "Performance comparison across different market sectors and instruments",
      features: [
        "Categories: Forex pairs, Commodities (Gold, Oil, Silver), Indices (S&P, FTSE, DAX), Cryptocurrencies",
        "Sort by daily, weekly, or monthly performance percentage",
        "Identify which asset classes are in demand (risk-on vs risk-off)",
        "Spot market correlations and divergences instantly"
      ],
      useCase: "Determine overall market sentiment. Strong equities + weak safe havens (JPY, CHF) = risk-on environment. Weak equities + strong USD/JPY = risk-off. Trade accordingly: In risk-on, buy AUD/JPY, NZD/JPY. In risk-off, buy USD/JPY, sell commodity currencies.",
      updateFrequency: "Every 5-15 minutes",
      bestTimeframe: "Position and swing trading"
    },
    {
      title: "Volatility Heatmap",
      icon: TrendingDown,
      description: "Measure of price volatility across instruments using ATR (Average True Range)",
      features: [
        "Shows which pairs/assets are moving the most (high volatility) vs consolidating (low volatility)",
        "Helps with position sizing decisions - reduce size on high volatility instruments",
        "Identifies low volatility (ranging) markets unsuitable for breakout strategies",
        "Highlights breakout opportunities when volatility spikes from low levels"
      ],
      useCase: "Trade high volatility pairs for breakouts and momentum strategies. Use low volatility pairs for range trading and mean reversion strategies. Adjust stop loss width based on current volatility levels (wider stops for GBP/JPY, tighter for EUR/CHF).",
      updateFrequency: "Hourly",
      bestTimeframe: "All trading styles"
    },
    {
      title: "Session-Based Heatmap",
      icon: Activity,
      description: "Performance segmented by trading sessions (Tokyo, London, New York)",
      features: [
        "Identify which pairs are most active during specific sessions",
        "Tokyo (Asian): JPY, AUD, NZD pairs most active",
        "London (European): EUR, GBP pairs dominate volume",
        "New York (US): USD pairs and commodities (Gold, Oil) most volatile"
      ],
      useCase: "Trade the most active pairs during your available session. London traders should focus on EUR/GBP, GBP/USD. Tokyo session traders should focus on AUD/JPY, NZD/JPY. Overlaps (London + NY) provide highest liquidity and opportunities.",
      updateFrequency: "Per session",
      bestTimeframe: "Day trading and scalping"
    }
  ];

  const interpretation = [
    {
      scenario: "Strong Green Cluster (Multiple Currencies Up)",
      meaning: "Widespread bullish sentiment across major pairs",
      action: "Look for continuation buys on pullbacks. Positive risk-on environment. Consider buying high-yield currencies (AUD, NZD) against safe havens (JPY, CHF).",
      probability: "Medium-High confidence"
    },
    {
      scenario: "Strong Red Cluster (Widespread Selling)",
      meaning: "Risk-off sentiment, flight to safety underway",
      action: "Look for continuation sells on rallies. Buy safe havens (USD, JPY, CHF). Avoid commodity currencies and emerging markets. Reduce position sizes due to volatility.",
      probability: "High confidence"
    },
    {
      scenario: "Mixed Colors (No Clear Pattern)",
      meaning: "Indecisive market, no dominant trend, choppy consolidation",
      action: "Reduce position sizes significantly. Focus on range trading strategies at key levels. Wait for clearer directional bias. Avoid breakout trades (high false breakout risk).",
      probability: "Low-confidence environment"
    },
    {
      scenario: "Single Currency Green Across All Pairs",
      meaning: "Strong buying pressure in that specific currency (e.g., USD green across EUR/USD, GBP/USD, AUD/USD)",
      action: "Trade pairs with that currency on the buy side. Check fundamentals - likely central bank hawkishness, strong data, or safe-haven demand. High-probability trend trades.",
      probability: "Very High confidence"
    },
    {
      scenario: "Sudden Color Shift (Green to Red in <1 hour)",
      meaning: "Major news event or trend reversal occurring, market repricing rapidly",
      action: "Check economic calendar for news. If no scheduled news, possible geopolitical event. Reassess open positions immediately. Tighten stops or exit if against new trend. Wait 30min for clarity before new entries.",
      probability: "High volatility, lower confidence initially"
    },
    {
      scenario: "Divergence: Heatmap vs Your Chart",
      meaning: "Currency strength showing bullish but your pair's chart shows bearish structure",
      action: "Trust the heatmap for broader context but wait for chart confirmation. Heatmap might be early signal of upcoming reversal. Mark levels and wait for price action confirmation before entering.",
      probability: "Requires confirmation"
    }
  ];

  const practicalStrategies = [
    {
      strategy: "Relative Strength Trading",
      description: "Identify and trade the strongest vs weakest currencies",
      steps: [
        "Check heatmap at start of session (London open, NY open)",
        "Identify strongest currency (darkest green) and weakest (darkest red)",
        "Open chart for that pair (e.g., Strong USD + Weak EUR = USD/EUR buy)",
        "Wait for pullback to support or EMA on H1/H4 chart",
        "Enter long with SL below support, TP at recent high",
        "Risk/Reward minimum 1:2"
      ],
      winRate: "60-70%",
      riskReward: "1:2 to 1:3"
    },
    {
      strategy: "Volatility Breakout Strategy",
      description: "Trade breakouts when volatility spikes from low levels",
      steps: [
        "Monitor volatility heatmap for pairs showing low ATR (blue/neutral)",
        "When volatility jumps to high (red/orange), consolidation breaking",
        "Identify direction of breakout on price chart",
        "Enter on retest of breakout level or immediate breakout",
        "SL inside consolidation pattern",
        "TP at pattern height projected from breakout"
      ],
      winRate: "55-65%",
      riskReward: "1:2.5 to 1:4"
    },
    {
      strategy: "Session Momentum Trading",
      description: "Trade pairs most active during your session for best liquidity",
      steps: [
        "Check session heatmap to see which pairs are moving most",
        "Focus on top 3 most active pairs during your session",
        "Use M15-H1 timeframe for entries during active hours",
        "Trade with momentum (buy strength, sell weakness)",
        "Exit before session close or when activity drops",
        "Avoid carrying positions through quiet sessions"
      ],
      winRate: "65-75%",
      riskReward: "1:1.5 to 1:2"
    }
  ];

  const tips = [
    {
      tip: "Combine Heatmap with Price Action",
      detail: "Heatmap shows what's moving, but always confirm with chart structure (support/resistance, patterns) before entering"
    },
    {
      tip: "Check Multiple Timeframes",
      detail: "Daily heatmap for trend, H4 for swing trades, H1 for day trades. Align your trading with the dominant timeframe strength"
    },
    {
      tip: "Avoid 'Neutral' Pairs",
      detail: "If both currencies show similar strength (both green or both red), pair will likely range. Trade pairs with strong divergence only"
    },
    {
      tip: "Use Heatmap for Market Sentiment",
      detail: "Safe havens strong (USD, JPY, CHF green) = Risk-off. Commodity currencies strong (AUD, NZD, CAD green) = Risk-on"
    },
    {
      tip: "Time Your Entries with Heatmap",
      detail: "Don't chase strong green after 5 hours of rally. Wait for pullback or trade the opposite on reversal signs"
    },
    {
      tip: "Monitor Correlation Changes",
      detail: "Usually correlated pairs (EUR/USD and GBP/USD) diverging? Potential pair trading opportunity or confusion - be cautious"
    }
  ];

  const faqs = [
    {
      question: "How often should I check the market heatmap?",
      answer: "For day traders: Every 30-60 minutes to catch momentum shifts. For swing traders: Once per day at market open to identify weekly bias. For scalpers: Every 5-15 minutes during active sessions. Set alerts for major color changes (green to red shift) to catch reversals early. Always check heatmap before entering any trade to ensure currency momentum aligns with your direction."
    },
    {
      question: "Can I rely solely on the heatmap for trading decisions?",
      answer: "No. Heatmaps show relative strength but don't indicate support/resistance levels, chart patterns, or risk/reward ratios. Use heatmap as a filter to identify which pairs to trade, then analyze charts for precise entries. Best approach: Heatmap identifies the pair (strongest vs weakest) → Chart analysis finds the entry setup → Risk management determines position size."
    },
    {
      question: "What causes sudden heatmap color changes?",
      answer: "Major news events (NFP, Fed decisions, geopolitical shocks), central bank surprises, or technical breakouts. When you see rapid shifts: 1) Check economic calendar for scheduled news, 2) Check news feeds for breaking stories, 3) Review charts for major level breaks. Allow 15-30min for volatility to settle before trading after sudden shifts."
    },
    {
      question: "How do I use heatmap for risk management?",
      answer: "Volatility heatmaps show which pairs are most risky. High volatility (dark red) = wider stops needed (40-60 pips for GBP/JPY). Low volatility (blue) = tighter stops (15-25 pips for EUR/CHF). Also, reduce position size by 50% when trading high volatility pairs to keep dollar risk constant. If overall market shows extreme volatility (all red), reduce trading or stay out completely."
    },
    {
      question: "Which heatmap type is best for beginners?",
      answer: "Start with Currency Strength Heatmap - it's the simplest and most actionable. Shows which currencies are strong/weak in real-time. Trade strongest vs weakest pairs with clear trends. Once comfortable, add Session-Based Heatmap to trade during your available hours. Volatility and Asset Class heatmaps are for intermediate traders who understand correlations and market sentiment."
    },
    {
      question: "How do I interpret divergence between heatmap and my chart?",
      answer: "Example: Heatmap shows USD strong (green) but USD/JPY chart is falling. Possibilities: 1) JPY is even stronger (check JPY vs other pairs), 2) Temporary pullback before resuming up, 3) Early reversal signal. Action: Wait for alignment - either heatmap shifts or chart confirms. Never trade against both heatmap and chart structure; one must support your direction."
    },
    {
      question: "Can heatmaps predict market direction?",
      answer: "No, heatmaps are descriptive (what's happening now), not predictive (what will happen). They show current strength, not future direction. However, persistent strength (USD green for 3+ hours) often continues short-term. Use heatmap to ride existing momentum, not predict reversals. For reversals, wait for price action confirmation (chart patterns, candlesticks) + heatmap color change together."
    }
  ];

  return (
    <LandingLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4" data-testid="badge-market-heatmap">Market Education</Badge>
            <h1 className="text-4xl font-bold mb-4">Market Heatmap Guide</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Learn how to use market heatmaps to quickly visualize performance across multiple instruments, identify currency strength, spot trading opportunities, and manage risk at a glance.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid sm:grid-cols-4 gap-4 mb-12">
            <Card data-testid="card-stat-currencies">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-1">8</div>
                <p className="text-sm text-muted-foreground">Major Currencies</p>
              </CardContent>
            </Card>
            <Card data-testid="card-stat-pairs">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-1">28+</div>
                <p className="text-sm text-muted-foreground">Currency Pairs</p>
              </CardContent>
            </Card>
            <Card data-testid="card-stat-update">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-1">Real-Time</div>
                <p className="text-sm text-muted-foreground">Live Updates</p>
              </CardContent>
            </Card>
            <Card data-testid="card-stat-sessions">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-1">3</div>
                <p className="text-sm text-muted-foreground">Trading Sessions</p>
              </CardContent>
            </Card>
          </div>

          {/* Heatmap Types */}
          <div className="space-y-8 mb-12">
            {heatmapTypes.map((type) => {
              const Icon = type.icon;
              return (
                <Card key={type.title} data-testid={`card-heatmap-${type.title.toLowerCase().replace(/\s+/g, '-')}`}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <CardTitle>{type.title}</CardTitle>
                          <Badge variant="outline">{type.updateFrequency}</Badge>
                        </div>
                        <CardDescription>{type.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2 text-sm">Key Features:</h3>
                        <ul className="space-y-1">
                          {type.features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                              <span className="text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-4 bg-muted rounded-lg">
                        <h3 className="font-semibold mb-2 text-sm">Practical Use Case:</h3>
                        <p className="text-sm text-muted-foreground">{type.useCase}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge>{type.bestTimeframe}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Interpretation Guide */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-primary" />
                <CardTitle>Reading Heatmap Patterns</CardTitle>
              </div>
              <CardDescription>What different color patterns mean and how to trade them</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {interpretation.map((item, index) => (
                  <div key={index} className="border-l-4 border-primary pl-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">{item.scenario}</h3>
                      <Badge>{item.probability}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      <strong>Meaning:</strong> {item.meaning}
                    </p>
                    <Alert>
                      <AlertDescription className="text-sm">
                        <strong>Trading Action:</strong> {item.action}
                      </AlertDescription>
                    </Alert>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Trading Strategies */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                <CardTitle>Heatmap-Based Trading Strategies</CardTitle>
              </div>
              <CardDescription>Complete strategies using heatmap analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {practicalStrategies.map((strat, index) => (
                  <div key={index} className="border-l-4 border-primary pl-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{strat.strategy}</h3>
                        <p className="text-sm text-muted-foreground">{strat.description}</p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Badge variant="outline">Win: {strat.winRate}</Badge>
                        <Badge variant="outline">R:R: {strat.riskReward}</Badge>
                      </div>
                    </div>
                    <div className="mt-3 bg-muted rounded-lg p-4">
                      <h4 className="font-semibold text-sm mb-2">Step-by-Step:</h4>
                      <ol className="space-y-2">
                        {strat.steps.map((step, i) => (
                          <li key={i} className="flex gap-3 text-sm">
                            <span className="font-bold text-primary">{i + 1}.</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pro Tips */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Professional Tips & Best Practices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                {tips.map((item, index) => (
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

          {/* FAQ */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                <CardTitle>Frequently Asked Questions</CardTitle>
              </div>
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

          {/* CTA */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Access Real-Time Market Heatmaps</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our trading platform includes integrated currency strength, volatility, and session heatmaps updated in real-time to help you identify the best trading opportunities.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" data-testid="button-view-heatmap">
                View Live Heatmap
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" data-testid="button-start-trading">
                Start Trading
              </Button>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}
