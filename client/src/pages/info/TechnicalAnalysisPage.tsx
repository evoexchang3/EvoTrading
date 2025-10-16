import { LandingLayout } from "@/components/LandingLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, BarChart3, Activity, HelpCircle, ArrowRight, BookOpen, Target, LineChart, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function TechnicalAnalysisPage() {
  const concepts = [
    {
      title: "Chart Patterns",
      icon: BarChart3,
      description: "Visual formations that predict future price movements",
      examples: [
        {
          name: "Head and Shoulders",
          type: "Reversal pattern indicating trend change from bullish to bearish",
          reliability: "High (70-80%)",
          timeframe: "Works best on H4 and Daily charts"
        },
        {
          name: "Double Top/Bottom",
          type: "Reversal pattern showing strong resistance or support levels",
          reliability: "High (75-85%)",
          timeframe: "All timeframes, stronger on higher TF"
        },
        {
          name: "Triangles (Ascending/Descending/Symmetrical)",
          type: "Continuation patterns indicating consolidation before breakout",
          reliability: "Medium (65-75%)",
          timeframe: "H1 to Daily charts"
        },
        {
          name: "Flags and Pennants",
          type: "Short-term continuation patterns during strong trends",
          reliability: "Medium-High (70-80%)",
          timeframe: "M15 to H4 for quick trades"
        },
        {
          name: "Cup and Handle",
          type: "Bullish continuation pattern showing accumulation",
          reliability: "High (75-85%)",
          timeframe: "Daily to Weekly charts"
        }
      ]
    },
    {
      title: "Technical Indicators",
      icon: Activity,
      description: "Mathematical calculations based on price and volume",
      examples: [
        {
          name: "Moving Averages (SMA/EMA)",
          type: "Smoothed price data showing trend direction and dynamic support/resistance",
          reliability: "Best in trending markets",
          timeframe: "Popular: 20, 50, 100, 200 period MAs"
        },
        {
          name: "RSI (Relative Strength Index)",
          type: "Momentum oscillator measuring overbought (>70) / oversold (<30) conditions",
          reliability: "Strong divergence signals",
          timeframe: "Default 14 periods on any TF"
        },
        {
          name: "MACD (Moving Average Convergence Divergence)",
          type: "Trend-following indicator showing momentum and direction changes via crossovers",
          reliability: "Excellent for trend confirmation",
          timeframe: "Settings: 12, 26, 9 on H4/Daily"
        },
        {
          name: "Bollinger Bands",
          type: "Volatility indicator showing price extremes and mean reversion opportunities",
          reliability: "Best in ranging markets",
          timeframe: "20 period, 2 std deviations"
        },
        {
          name: "Stochastic Oscillator",
          type: "Momentum indicator comparing closing price to price range (overbought/oversold)",
          reliability: "Strong reversal signals",
          timeframe: "14, 3, 3 settings typical"
        },
        {
          name: "Fibonacci Retracement",
          type: "Mathematical levels (23.6%, 38.2%, 50%, 61.8%) for pullback entries",
          reliability: "Self-fulfilling prophecy effect",
          timeframe: "Works on all timeframes"
        }
      ]
    },
    {
      title: "Support & Resistance",
      icon: TrendingUp,
      description: "Key price levels where buying or selling pressure concentrates",
      examples: [
        {
          name: "Horizontal Support/Resistance",
          type: "Previous swing highs/lows where price has reversed multiple times",
          reliability: "Very high (tested levels)",
          timeframe: "Stronger on higher timeframes"
        },
        {
          name: "Trend Lines",
          type: "Diagonal lines connecting swing highs (resistance) or lows (support)",
          reliability: "High when touched 3+ times",
          timeframe: "Draw from H4 upwards"
        },
        {
          name: "Fibonacci Retracements",
          type: "Mathematical levels showing potential reversal zones (38.2%, 50%, 61.8%)",
          reliability: "Medium-High at key levels",
          timeframe: "All timeframes"
        },
        {
          name: "Pivot Points (Daily/Weekly)",
          type: "Calculated levels from previous period's high, low, close (PP, R1-R3, S1-S3)",
          reliability: "High for intraday trading",
          timeframe: "Daily pivots for day trading"
        },
        {
          name: "Psychological Levels",
          type: "Round numbers ending in 00 or 50 (e.g., 1.1000, 1.1050)",
          reliability: "Medium (self-fulfilling)",
          timeframe: "All timeframes, major pairs"
        }
      ]
    }
  ];

  const tradingStrategies = [
    {
      name: "Trend Following Strategy",
      description: "Trade with the dominant trend using MAs and momentum indicators",
      setup: "Price above 200 EMA + MACD positive + RSI > 50 = Bullish bias",
      entry: "Buy on pullback to 20/50 EMA with bullish candle confirmation",
      stopLoss: "Below recent swing low or 1-2 ATR below entry",
      takeProfit: "Previous high or 2-3x risk distance",
      winRate: "55-65%",
      rrRatio: "1:2 to 1:3"
    },
    {
      name: "Support/Resistance Bounce",
      description: "Trade reversals at key horizontal levels",
      setup: "Price approaching tested S/R level + RSI oversold/overbought",
      entry: "Bullish/bearish candle rejection at level (pin bar, engulfing)",
      stopLoss: "Beyond the level (20-30 pips buffer)",
      takeProfit: "Next S/R level or 1:2 RR minimum",
      winRate: "60-70%",
      rrRatio: "1:2 to 1:2.5"
    },
    {
      name: "Breakout Strategy",
      description: "Trade momentum when price breaks consolidation",
      setup: "Triangle, range, or consolidation pattern + decreasing volume",
      entry: "Close above/below pattern with volume spike confirmation",
      stopLoss: "Inside the pattern (false breakout protection)",
      takeProfit: "Pattern height projected from breakout point",
      winRate: "50-60%",
      rrRatio: "1:2.5 to 1:4"
    }
  ];

  const commonMistakes = [
    {
      mistake: "Over-reliance on a Single Indicator",
      why: "No indicator is 100% accurate; false signals are common",
      solution: "Use confluence: Combine 2-3 indicators + price action confirmation"
    },
    {
      mistake: "Trading Against the Trend",
      why: "Counter-trend trades have lower probability and need perfect timing",
      solution: "Trade with the trend or wait for clear reversal confirmation (H&S, double top)"
    },
    {
      mistake: "Ignoring Higher Timeframes",
      why: "Lower timeframe trades can conflict with daily/weekly trend",
      solution: "Check Daily/H4 trend first, then drop to H1/M15 for entries"
    },
    {
      mistake: "Not Waiting for Confirmation",
      why: "Early entries before pattern completion lead to losses",
      solution: "Wait for candle close, volume confirmation, or indicator crossover"
    },
    {
      mistake: "Using Too Many Indicators",
      why: "Chart clutter causes confusion and contradictory signals",
      solution: "Maximum 3 indicators: One trend (MA), one momentum (RSI/MACD), one volatility (BB)"
    }
  ];

  const faqs = [
    {
      question: "What timeframe is best for technical analysis?",
      answer: "It depends on your trading style: Scalpers use M1-M15, day traders use M15-H1, swing traders use H4-Daily, and position traders use Daily-Weekly. For beginners, start with H4 and Daily charts for clearer trends and less noise. Always check higher timeframes for context before entering trades on lower timeframes."
    },
    {
      question: "How many indicators should I use on my chart?",
      answer: "Less is more. Use 2-3 complementary indicators maximum: one for trend direction (moving average), one for momentum (RSI or MACD), and optionally one for volatility (Bollinger Bands). Too many indicators create conflicting signals and 'analysis paralysis.' Price action alone can be sufficient for experienced traders."
    },
    {
      question: "Do technical patterns really work in modern markets?",
      answer: "Yes, but with caveats. Classic patterns work because they represent trader psychology and institutional order flow. Success rates vary: Head & Shoulders (70-80%), Double tops/bottoms (75-85%), Triangles (65-75%). However, patterns work best when combined with volume analysis, market context, and proper risk management. Never rely solely on patterns."
    },
    {
      question: "What's the difference between SMA and EMA?",
      answer: "SMA (Simple Moving Average) gives equal weight to all periods and is smoother but slower to react. EMA (Exponential Moving Average) gives more weight to recent prices, making it more responsive to new data. For trend following, 200 SMA is popular. For dynamic support/resistance and quicker signals, 20/50 EMA is preferred. Many traders use both."
    },
    {
      question: "How do I know if a support/resistance level is strong?",
      answer: "Strong levels have: 1) Multiple touches (3+ times) historically, 2) Significant reversals at that level, 3) Round numbers (psychological levels like 1.1000), 4) Confluence with Fibonacci levels or pivot points, 5) High timeframe levels (Daily/Weekly stronger than H1). The more factors align, the stronger the level."
    },
    {
      question: "Can I use technical analysis for fundamental-driven markets?",
      answer: "Yes, but with caution. Technical analysis works in all markets but can be overridden by strong fundamental events (NFP, Fed decisions, geopolitical shocks). Use technicals for entry/exit timing even on fundamental trades. Avoid trading purely technical setups during high-impact news. Combine both analyses for best results."
    },
    {
      question: "What's the best indicator for beginners?",
      answer: "Start with Moving Averages (20/50/200 EMA) and RSI (14 period). MAs show trend direction clearly, and RSI identifies overbought/oversold conditions. These two cover trend and momentum. Once comfortable, add MACD for confirmation. Avoid complex indicators until you master the basics of price action and these fundamental tools."
    }
  ];

  return (
    <LandingLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4" data-testid="badge-technical-analysis">Market Education</Badge>
            <h1 className="text-4xl font-bold mb-4">Technical Analysis Guide</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Master the art of reading price charts, identifying patterns, and using indicators to make informed trading decisions. Learn proven technical analysis strategies used by professional traders.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid sm:grid-cols-4 gap-4 mb-12">
            <Card data-testid="card-stat-patterns">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-1">15+</div>
                <p className="text-sm text-muted-foreground">Chart Patterns</p>
              </CardContent>
            </Card>
            <Card data-testid="card-stat-indicators">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-1">10+</div>
                <p className="text-sm text-muted-foreground">Key Indicators</p>
              </CardContent>
            </Card>
            <Card data-testid="card-stat-strategies">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-1">3</div>
                <p className="text-sm text-muted-foreground">Proven Strategies</p>
              </CardContent>
            </Card>
            <Card data-testid="card-stat-accuracy">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-1">70%+</div>
                <p className="text-sm text-muted-foreground">Pattern Accuracy</p>
              </CardContent>
            </Card>
          </div>

          {/* Core Concepts */}
          <div className="space-y-8 mb-12">
            {concepts.map((concept) => {
              const Icon = concept.icon;
              return (
                <Card key={concept.title} data-testid={`card-concept-${concept.title.toLowerCase().replace(/\s+/g, '-')}`}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle>{concept.title}</CardTitle>
                        <CardDescription>{concept.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {concept.examples.map((example, index) => (
                        <div key={index} className="p-4 border rounded-lg hover-elevate">
                          <h3 className="font-semibold mb-2">{example.name}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{example.type}</p>
                          <div className="flex justify-between text-xs">
                            <span className="text-primary font-medium">{example.reliability}</span>
                            <span className="text-muted-foreground">{example.timeframe}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Trading Strategies */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                <CardTitle>Proven Technical Trading Strategies</CardTitle>
              </div>
              <CardDescription>Complete strategy breakdowns with entry, exit, and risk management</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {tradingStrategies.map((strategy, index) => (
                  <div key={index} className="border-l-4 border-primary pl-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">{strategy.name}</h3>
                      <div className="flex gap-4 text-sm">
                        <Badge variant="outline">Win Rate: {strategy.winRate}</Badge>
                        <Badge variant="outline">R:R: {strategy.rrRatio}</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{strategy.description}</p>
                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium mb-1">Setup:</p>
                        <p className="text-muted-foreground">{strategy.setup}</p>
                      </div>
                      <div>
                        <p className="font-medium mb-1">Entry:</p>
                        <p className="text-muted-foreground">{strategy.entry}</p>
                      </div>
                      <div>
                        <p className="font-medium mb-1">Stop Loss:</p>
                        <p className="text-muted-foreground">{strategy.stopLoss}</p>
                      </div>
                      <div>
                        <p className="font-medium mb-1">Take Profit:</p>
                        <p className="text-muted-foreground">{strategy.takeProfit}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Common Mistakes */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <CardTitle>5 Common Technical Analysis Mistakes</CardTitle>
              </div>
              <CardDescription>Avoid these pitfalls to improve your trading results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {commonMistakes.map((item, index) => (
                  <div key={index} className="border-l-4 border-amber-500 pl-4">
                    <h4 className="font-semibold text-amber-600 dark:text-amber-500 mb-1">
                      {index + 1}. {item.mistake}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong>Why it's wrong:</strong> {item.why}
                    </p>
                    <p className="text-sm text-primary">
                      <strong>Solution:</strong> {item.solution}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* How to Use Guide */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <CardTitle>Getting Started with Technical Analysis</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">1</div>
                  <p><strong>Learn to read candlesticks:</strong> Understand bullish/bearish candles, wicks, and bodies</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">2</div>
                  <p><strong>Identify the trend:</strong> Use moving averages to determine overall market direction</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">3</div>
                  <p><strong>Mark key levels:</strong> Draw support/resistance from swing highs and lows</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">4</div>
                  <p><strong>Add 2-3 indicators:</strong> Start with RSI and MACD for confirmation</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">5</div>
                  <p><strong>Look for confluence:</strong> Trade only when multiple factors align</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">6</div>
                  <p><strong>Practice on demo:</strong> Test strategies without risking real money</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <LineChart className="w-5 h-5 text-primary" />
                  <CardTitle>Multi-Timeframe Analysis</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <Alert>
                  <AlertDescription>
                    Always analyze multiple timeframes before trading. This prevents taking buy signals on M15 when Daily chart shows strong downtrend.
                  </AlertDescription>
                </Alert>
                <div>
                  <p className="font-medium mb-2">Recommended Approach:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-primary">•</span>
                      <span><strong>Daily/H4:</strong> Identify overall trend direction</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-primary">•</span>
                      <span><strong>H1:</strong> Find key support/resistance levels</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-primary">•</span>
                      <span><strong>M15/M5:</strong> Fine-tune entry with precise timing</span>
                    </li>
                  </ul>
                </div>
                <p className="text-muted-foreground italic">
                  Example: Daily shows uptrend → H4 pullback to support → M15 bullish engulfing = High-probability long entry
                </p>
              </CardContent>
            </Card>
          </div>

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
            <h2 className="text-2xl font-bold mb-4">Ready to Apply Technical Analysis?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Access our trading platform with advanced charting tools, all major indicators, and drawing tools to practice technical analysis in real-time.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" data-testid="button-start-trading">
                Open Trading Platform
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" data-testid="button-education">
                View Full Course
              </Button>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}
