import { LandingLayout } from "@/components/LandingLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Grid3x3, TrendingUp, TrendingDown, Eye } from "lucide-react";

export default function MarketHeatmapPage() {
  const heatmapTypes = [
    {
      title: "Currency Strength Heatmap",
      icon: TrendingUp,
      description: "Visual representation of relative currency strength",
      features: [
        "Compare 8 major currencies (USD, EUR, GBP, JPY, AUD, NZD, CAD, CHF)",
        "Color coding: Green = strongest, Red = weakest",
        "Updated in real-time based on price movements",
        "Helps identify which currencies are trending"
      ],
      useCase: "Use to find the strongest vs weakest currency pairs for trending trades. For example, if USD is strongest and JPY is weakest, consider buying USD/JPY."
    },
    {
      title: "Asset Class Heatmap",
      icon: Grid3x3,
      description: "Performance across different market sectors",
      features: [
        "Forex pairs, commodities, indices, cryptocurrencies",
        "Sort by daily, weekly, or monthly performance",
        "Identify which asset classes are in demand",
        "Spot market correlations and divergences"
      ],
      useCase: "Determine overall market sentiment. Strong equities + weak safe havens = risk-on. Weak equities + strong USD/JPY = risk-off."
    },
    {
      title: "Volatility Heatmap",
      icon: TrendingDown,
      description: "Measure of price volatility across instruments",
      features: [
        "Shows which pairs/assets are moving the most",
        "Helps with position sizing decisions",
        "Identifies low volatility (ranging) markets",
        "Highlights breakout opportunities"
      ],
      useCase: "Trade high volatility pairs for breakouts, low volatility pairs for range trading. Adjust stop loss width based on current volatility levels."
    }
  ];

  const interpretation = [
    {
      scenario: "Strong Green Cluster",
      meaning: "Multiple instruments moving up together",
      action: "Look for continuation buys on dips, positive market sentiment"
    },
    {
      scenario: "Strong Red Cluster",
      meaning: "Widespread selling pressure",
      action: "Look for continuation sells on rallies, negative market sentiment"
    },
    {
      scenario: "Mixed Colors (No Clear Pattern)",
      meaning: "Indecisive market, no dominant trend",
      action: "Reduce position sizes, wait for clearer directional bias"
    },
    {
      scenario: "Currency X Green Across All Pairs",
      meaning: "Strong buying pressure in that specific currency",
      action: "Trade pairs with that currency on the buy side"
    },
    {
      scenario: "Sudden Color Shift",
      meaning: "Market sentiment changing rapidly",
      action: "Major news event or trend reversal, reassess open positions"
    }
  ];

  return (
    <LandingLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Market Heatmap</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn how to use market heatmaps to quickly visualize performance across multiple instruments and identify trading opportunities at a glance.
            </p>
          </div>

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
                      <div>
                        <CardTitle>{type.title}</CardTitle>
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
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                              <span className="text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-4 bg-muted rounded-lg">
                        <h3 className="font-semibold mb-2 text-sm">How to Use:</h3>
                        <p className="text-sm text-muted-foreground">{type.useCase}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Eye className="w-6 h-6 text-primary" />
                <div>
                  <CardTitle>Reading the Heatmap</CardTitle>
                  <CardDescription>How to interpret different color patterns</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {interpretation.map((item, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-muted rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{item.scenario}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{item.meaning}</p>
                      <p className="text-sm"><span className="font-semibold">Action:</span> {item.action}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Best Practices</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-xs font-bold">✓</div>
                  <p>Check heatmap before each trading session to gauge market sentiment</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-xs font-bold">✓</div>
                  <p>Use multiple timeframes (daily, weekly) for confirmation</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-xs font-bold">✓</div>
                  <p>Combine with technical analysis for precise entry/exit points</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-xs font-bold">✓</div>
                  <p>Monitor color changes for early trend reversal signals</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-xs font-bold">✓</div>
                  <p>Cross-reference with economic calendar for context</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Common Mistakes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="p-3 bg-destructive/10 rounded-lg">
                  <p className="font-semibold mb-1">Trading on Heatmap Alone</p>
                  <p className="text-muted-foreground">Always confirm with price action and technical levels</p>
                </div>
                <div className="p-3 bg-destructive/10 rounded-lg">
                  <p className="font-semibold mb-1">Ignoring Timeframe Context</p>
                  <p className="text-muted-foreground">Strong on daily but weak on weekly = conflicting signals</p>
                </div>
                <div className="p-3 bg-destructive/10 rounded-lg">
                  <p className="font-semibold mb-1">Chasing Extreme Moves</p>
                  <p className="text-muted-foreground">Very green/red may indicate overextension, not continuation</p>
                </div>
                <div className="p-3 bg-destructive/10 rounded-lg">
                  <p className="font-semibold mb-1">Not Accounting for News</p>
                  <p className="text-muted-foreground">Color changes may be temporary reactions to news events</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 bg-muted rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Example: Using Currency Strength Heatmap</h2>
            <div className="space-y-4 text-sm">
              <div className="p-4 bg-background rounded-lg">
                <p className="font-semibold mb-2">Scenario: EUR is strongest (dark green), JPY is weakest (dark red)</p>
                <p className="text-muted-foreground mb-3">This shows strong EUR buying and JPY selling across all pairs.</p>
                <div className="space-y-2">
                  <p><span className="font-semibold">Primary Trade:</span> Buy EUR/JPY (strongest vs weakest)</p>
                  <p><span className="font-semibold">Secondary Trades:</span> Buy EUR/USD, Sell USD/JPY (if USD is neutral)</p>
                  <p><span className="font-semibold">Avoid:</span> Trading pairs where both currencies show similar colors</p>
                  <p><span className="font-semibold">Risk Management:</span> Monitor for color shift indicating sentiment change</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}
