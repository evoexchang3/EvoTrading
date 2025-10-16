import { LandingLayout } from "@/components/LandingLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, BarChart3, Activity } from "lucide-react";

export default function TechnicalAnalysisPage() {
  const concepts = [
    {
      title: "Chart Patterns",
      icon: BarChart3,
      description: "Visual formations that predict future price movements",
      examples: [
        {
          name: "Head and Shoulders",
          type: "Reversal pattern indicating trend change from bullish to bearish"
        },
        {
          name: "Double Top/Bottom",
          type: "Reversal pattern showing resistance or support levels"
        },
        {
          name: "Triangles",
          type: "Continuation patterns (ascending, descending, symmetrical)"
        },
        {
          name: "Flags and Pennants",
          type: "Short-term continuation patterns during strong trends"
        }
      ]
    },
    {
      title: "Technical Indicators",
      icon: Activity,
      description: "Mathematical calculations based on price and volume",
      examples: [
        {
          name: "Moving Averages (MA)",
          type: "Smoothed price data showing trend direction (SMA, EMA)"
        },
        {
          name: "RSI (Relative Strength Index)",
          type: "Momentum oscillator measuring overbought/oversold conditions (0-100)"
        },
        {
          name: "MACD",
          type: "Trend-following indicator showing momentum and direction changes"
        },
        {
          name: "Bollinger Bands",
          type: "Volatility indicator showing price extremes and potential reversals"
        }
      ]
    },
    {
      title: "Support & Resistance",
      icon: TrendingUp,
      description: "Key price levels where buying or selling pressure concentrates",
      examples: [
        {
          name: "Horizontal Levels",
          type: "Previous highs/lows where price has reversed multiple times"
        },
        {
          name: "Trend Lines",
          type: "Diagonal lines connecting swing highs or lows"
        },
        {
          name: "Fibonacci Retracements",
          type: "Mathematical levels (23.6%, 38.2%, 50%, 61.8%) showing potential reversals"
        },
        {
          name: "Pivot Points",
          type: "Daily/weekly levels calculated from previous period's high, low, close"
        }
      ]
    }
  ];

  return (
    <LandingLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Technical Analysis</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn how to analyze price charts and identify trading opportunities using technical indicators, chart patterns, and key price levels.
            </p>
          </div>

          <div className="space-y-8">
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
                        <div key={index} className="p-4 bg-muted rounded-lg">
                          <h3 className="font-semibold mb-2">{example.name}</h3>
                          <p className="text-sm text-muted-foreground">{example.type}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>How to Use Technical Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-xs font-bold">1</div>
                  <p><span className="font-semibold">Identify the Trend:</span> Use moving averages and trend lines to determine if the market is trending up, down, or sideways.</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-xs font-bold">2</div>
                  <p><span className="font-semibold">Find Key Levels:</span> Mark support and resistance levels where price has previously reversed.</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-xs font-bold">3</div>
                  <p><span className="font-semibold">Look for Patterns:</span> Identify chart patterns that suggest potential price movements.</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-xs font-bold">4</div>
                  <p><span className="font-semibold">Confirm with Indicators:</span> Use RSI, MACD, or other indicators to confirm your analysis.</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-xs font-bold">5</div>
                  <p><span className="font-semibold">Plan Your Trade:</span> Set entry, stop loss, and take profit levels based on your analysis.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Common Mistakes to Avoid</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="p-3 bg-destructive/10 rounded-lg">
                  <p className="font-semibold mb-1">Using too many indicators</p>
                  <p className="text-muted-foreground">Stick to 2-3 indicators maximum to avoid conflicting signals</p>
                </div>
                <div className="p-3 bg-destructive/10 rounded-lg">
                  <p className="font-semibold mb-1">Ignoring the bigger picture</p>
                  <p className="text-muted-foreground">Always check higher timeframes before trading on lower ones</p>
                </div>
                <div className="p-3 bg-destructive/10 rounded-lg">
                  <p className="font-semibold mb-1">Not adapting to market conditions</p>
                  <p className="text-muted-foreground">Different strategies work in trending vs ranging markets</p>
                </div>
                <div className="p-3 bg-destructive/10 rounded-lg">
                  <p className="font-semibold mb-1">Forcing patterns</p>
                  <p className="text-muted-foreground">Not every price movement forms a tradeable pattern</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 bg-muted rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Technical vs Fundamental Analysis</h2>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <h3 className="font-semibold mb-2">Technical Analysis</h3>
                <p className="text-muted-foreground mb-2">Focuses on price action and chart patterns</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Best for short to medium-term trading</li>
                  <li>• Works on any timeframe</li>
                  <li>• Helps with precise entry/exit timing</li>
                  <li>• Based on historical price behavior</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Fundamental Analysis</h3>
                <p className="text-muted-foreground mb-2">Focuses on economic factors and news</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Best for long-term trading decisions</li>
                  <li>• Explains why prices move</li>
                  <li>• Considers economic data and policy</li>
                  <li>• Based on intrinsic value assessment</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}
