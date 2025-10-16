import { LandingLayout } from "@/components/LandingLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, TrendingUp, Globe, DollarSign, HelpCircle, ArrowRight, BookOpen, Calendar, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function FundamentalAnalysisPage() {
  const factors = [
    {
      title: "Economic Indicators",
      icon: TrendingUp,
      description: "Key data releases that drive currency valuations",
      indicators: [
        {
          name: "Interest Rates (Central Bank Rates)",
          impact: "Higher rates attract foreign investment → Currency strengthens",
          frequency: "Monthly/Quarterly",
          importance: "Highest - Directly set by central banks"
        },
        {
          name: "GDP Growth (Gross Domestic Product)",
          impact: "Strong growth signals healthy economy → Supports currency strength",
          frequency: "Quarterly",
          importance: "High - Overall economic health indicator"
        },
        {
          name: "Employment Data (NFP, Unemployment Rate)",
          impact: "Low unemployment = economic strength → Positive for currency",
          frequency: "Monthly",
          importance: "Very High - Directly impacts central bank policy"
        },
        {
          name: "Inflation (CPI, PPI)",
          impact: "Moderate inflation (2-3%) healthy; too high forces rate hikes",
          frequency: "Monthly",
          importance: "Very High - Key driver of rate decisions"
        },
        {
          name: "Trade Balance",
          impact: "Surplus (exports > imports) strengthens currency",
          frequency: "Monthly",
          importance: "Medium-High - Shows demand for currency"
        },
        {
          name: "Retail Sales",
          impact: "Strong sales = consumer confidence → Currency positive",
          frequency: "Monthly",
          importance: "Medium - Leading indicator of economic health"
        }
      ]
    },
    {
      title: "Central Bank Policy",
      icon: Building2,
      description: "Monetary policy decisions that directly impact currencies",
      indicators: [
        {
          name: "Interest Rate Decisions",
          impact: "Rate hikes strengthen currency; cuts weaken it (carry trade effect)",
          frequency: "6-8 meetings per year",
          importance: "Highest - Most direct FX impact"
        },
        {
          name: "Quantitative Easing (QE) / Tightening (QT)",
          impact: "QE increases money supply → Weakens currency; QT does opposite",
          frequency: "Program-based",
          importance: "Very High - Long-term structural impact"
        },
        {
          name: "Forward Guidance",
          impact: "Central bank hints about future policy → Market reprices expectations",
          frequency: "Each meeting",
          importance: "High - Shapes market expectations"
        },
        {
          name: "Meeting Minutes & Speeches",
          impact: "Reveals central bank thinking → Hints at future policy bias (hawkish/dovish)",
          frequency: "Weekly (speeches)",
          importance: "Medium-High - Fine-tunes expectations"
        }
      ]
    },
    {
      title: "Geopolitical Events",
      icon: Globe,
      description: "Political and global events affecting market sentiment",
      indicators: [
        {
          name: "Elections & Political Stability",
          impact: "Uncertainty weakens currency; stable government strengthens it",
          frequency: "Event-driven",
          importance: "High during election periods"
        },
        {
          name: "Trade Relations & Tariffs",
          impact: "Trade wars weaken both currencies; agreements strengthen them",
          frequency: "Ongoing/negotiation",
          importance: "High - Impacts economic outlook"
        },
        {
          name: "Military Conflicts & Wars",
          impact: "Wars drive safe-haven flows → USD, JPY, CHF gain",
          frequency: "Event-driven",
          importance: "Highest during crises"
        },
        {
          name: "Brexit-style Policy Shifts",
          impact: "Major structural changes create volatility and trend shifts",
          frequency: "Rare but impactful",
          importance: "Extreme when occurring"
        }
      ]
    },
    {
      title: "Market Sentiment & Risk Appetite",
      icon: DollarSign,
      description: "Collective trader psychology and risk appetite",
      indicators: [
        {
          name: "Risk-On Sentiment",
          impact: "Investors favor higher-yielding currencies → AUD, NZD, EM currencies gain",
          frequency: "Daily shifts",
          importance: "High - Drives short-term flows"
        },
        {
          name: "Risk-Off Sentiment",
          impact: "Flight to safety → USD, JPY, CHF strengthen",
          frequency: "Crisis-driven",
          importance: "Very High during volatility"
        },
        {
          name: "Commodity Prices (Oil, Gold, Copper)",
          impact: "Oil affects CAD/NOK; Gold affects AUD/ZAR; impacts commodity currencies",
          frequency: "Continuous",
          importance: "High for commodity exporters"
        },
        {
          name: "Stock Market Performance",
          impact: "Strong equities correlate with risk currencies gaining (AUD, NZD, GBP)",
          frequency: "Continuous",
          importance: "Medium-High - Risk appetite gauge"
        }
      ]
    }
  ];

  const economicCalendar = [
    {
      event: "Non-Farm Payrolls (NFP)",
      country: "USD",
      impact: "Highest",
      typical: "1st Friday of month",
      tradingTip: "Avoid trading 30min before/after; or trade breakout with 50+ pip stops"
    },
    {
      event: "Federal Reserve Rate Decision",
      country: "USD",
      impact: "Highest",
      typical: "8 meetings/year",
      tradingTip: "Wait for press conference; volatility can exceed 100 pips"
    },
    {
      event: "ECB Rate Decision",
      country: "EUR",
      impact: "Highest",
      typical: "8 meetings/year",
      tradingTip: "Similar to Fed; Draghi/Lagarde speeches critical"
    },
    {
      event: "UK CPI Inflation",
      country: "GBP",
      impact: "High",
      typical: "Mid-month",
      tradingTip: "Directly impacts BOE rate expectations; 30-50 pip moves"
    },
    {
      event: "China GDP",
      country: "CNY/AUD",
      impact: "High",
      typical: "Quarterly",
      tradingTip: "Affects AUD heavily (China's largest trading partner)"
    }
  ];

  const correlations = [
    {
      pair: "AUD/USD vs Gold",
      relationship: "Positive (70%)",
      reason: "Australia is major gold exporter"
    },
    {
      pair: "USD/CAD vs Oil",
      relationship: "Negative (80%)",
      reason: "Canada exports oil; USD/CAD falls when oil rises"
    },
    {
      pair: "EUR/USD vs DXY",
      relationship: "Negative (95%)",
      reason: "EUR is 57% of Dollar Index"
    },
    {
      pair: "NZD/USD vs Dairy Prices",
      relationship: "Positive (65%)",
      reason: "New Zealand's main export is dairy"
    },
    {
      pair: "USD/JPY vs US Yields",
      relationship: "Positive (85%)",
      reason: "Higher yields attract capital to USD"
    }
  ];

  const faqs = [
    {
      question: "How does fundamental analysis differ from technical analysis?",
      answer: "Fundamental analysis examines economic factors, central bank policies, and geopolitical events to determine intrinsic currency value and long-term trends. Technical analysis uses price charts and patterns for timing entries/exits. Most professional traders combine both: fundamentals for direction and bias, technicals for precise entry/exit timing. For example, if Fed raises rates (fundamental), you'd look for bullish USD setups on charts (technical)."
    },
    {
      question: "Which economic indicators have the biggest impact on forex?",
      answer: "The top 3 are: 1) Interest rate decisions (highest impact - directly set by central banks), 2) Employment data like NFP (very high - influences rate policy), 3) Inflation (CPI/PPI - determines if rates need to change). These often cause 50-150 pip moves within minutes. GDP, retail sales, and PMI data are secondary but still important for medium-term trends."
    },
    {
      question: "How do I trade around major news releases?",
      answer: "Three approaches: 1) Avoid trading - Close positions 30min before high-impact news and wait for volatility to settle. 2) Breakout trading - Wait for initial spike to establish direction, then trade the continuation with tight stops. 3) Fade the spike - Counter-trade emotional moves after 30-60 minutes. Beginners should avoid trading during news; it requires experience and wider stops (50+ pips)."
    },
    {
      question: "What is 'priced in' and how does it affect trading?",
      answer: "'Priced in' means the market has already adjusted prices based on expectations. If everyone expects a Fed rate hike and it happens, there may be no USD rally (buy the rumor, sell the fact). The key is surprises: if expected +0.25% but get +0.50%, expect big moves. Check market expectations (consensus forecasts) before news and trade the deviation from expectations, not the absolute number."
    },
    {
      question: "How do central bank policies affect currency pairs?",
      answer: "Central banks control interest rates, which drive currency value through carry trade. Higher rates attract foreign investment → stronger currency. Divergent policies create trends: if Fed raises rates while ECB holds, USD/EUR strengthens. Key terms: Hawkish (favors rate hikes) = bullish currency; Dovish (favors rate cuts) = bearish currency. Follow central bank meeting calendars and speeches closely."
    },
    {
      question: "Can I trade forex based purely on fundamentals?",
      answer: "Yes, but it's challenging for short-term traders. Fundamental themes (like Fed hiking cycle) play out over weeks/months, not hours. Position traders use fundamentals successfully with multi-week trades. For day traders, fundamentals provide directional bias, but you still need technical analysis for entries. Recommended: Use fundamentals to determine which side to trade, technicals for timing."
    },
    {
      question: "How do commodity prices affect forex pairs?",
      answer: "Commodity currencies (CAD, AUD, NZD, NOK) correlate with commodity prices because exports drive their economies. USD/CAD falls ~80% of time when oil rises (Canada exports oil). AUD/USD rises with gold and iron ore prices. NZD/USD follows dairy prices. Trade these correlations: if oil spikes, consider shorting USD/CAD. Check commodity charts before trading commodity currencies."
    }
  ];

  return (
    <LandingLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4" data-testid="badge-fundamental-analysis">Market Education</Badge>
            <h1 className="text-4xl font-bold mb-4">Fundamental Analysis Guide</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Master the economic factors, central bank policies, and geopolitical events that drive long-term currency movements. Learn how professional traders analyze macroeconomic data to identify high-probability trade opportunities.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid sm:grid-cols-4 gap-4 mb-12">
            <Card data-testid="card-stat-indicators">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-1">20+</div>
                <p className="text-sm text-muted-foreground">Key Indicators</p>
              </CardContent>
            </Card>
            <Card data-testid="card-stat-banks">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-1">8</div>
                <p className="text-sm text-muted-foreground">Major Central Banks</p>
              </CardContent>
            </Card>
            <Card data-testid="card-stat-events">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-1">50+</div>
                <p className="text-sm text-muted-foreground">Monthly Events</p>
              </CardContent>
            </Card>
            <Card data-testid="card-stat-impact">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-1">150+</div>
                <p className="text-sm text-muted-foreground">Pips per Major News</p>
              </CardContent>
            </Card>
          </div>

          {/* Core Factors */}
          <div className="space-y-8 mb-12">
            {factors.map((factor) => {
              const Icon = factor.icon;
              return (
                <Card key={factor.title} data-testid={`card-factor-${factor.title.toLowerCase().replace(/\s+/g, '-')}`}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle>{factor.title}</CardTitle>
                        <CardDescription>{factor.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {factor.indicators.map((indicator, index) => (
                        <div key={index} className="p-4 border rounded-lg hover-elevate">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold">{indicator.name}</h3>
                            <Badge variant="outline" className="ml-2">{indicator.importance}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{indicator.impact}</p>
                          <p className="text-xs text-primary font-medium">Frequency: {indicator.frequency}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Economic Calendar */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                <CardTitle>High-Impact Economic Events</CardTitle>
              </div>
              <CardDescription>Key events that move markets - plan your trades around these</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {economicCalendar.map((event, index) => (
                  <div key={index} className="border-l-4 border-primary pl-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold">{event.event}</h3>
                        <p className="text-sm text-muted-foreground">{event.typical}</p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Badge>{event.country}</Badge>
                        <Badge variant={event.impact === "Highest" ? "destructive" : "default"}>
                          {event.impact} Impact
                        </Badge>
                      </div>
                    </div>
                    <Alert className="mt-2">
                      <AlertDescription className="text-sm">
                        <strong>Trading Tip:</strong> {event.tradingTip}
                      </AlertDescription>
                    </Alert>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Correlations */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Currency-Commodity Correlations</CardTitle>
              <CardDescription>How commodities and other assets influence forex pairs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                {correlations.map((corr, index) => (
                  <div key={index} className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{corr.pair}</h3>
                      <Badge variant={corr.relationship.includes("Positive") ? "default" : "secondary"}>
                        {corr.relationship}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{corr.reason}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* How to Use */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <CardTitle>Fundamental Trading Workflow</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">1</div>
                  <p><strong>Check economic calendar:</strong> Identify high-impact events for the week</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">2</div>
                  <p><strong>Analyze central bank stance:</strong> Determine if hawkish or dovish bias</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">3</div>
                  <p><strong>Compare interest rate differentials:</strong> Higher yielding currency favored</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">4</div>
                  <p><strong>Assess geopolitical risks:</strong> Wars, elections, trade tensions</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">5</div>
                  <p><strong>Determine market sentiment:</strong> Risk-on (high-yield) vs risk-off (safe-haven)</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">6</div>
                  <p><strong>Use technicals for entry:</strong> Fundamentals = direction, technicals = timing</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  <CardTitle>Common Fundamental Mistakes</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold text-amber-600 dark:text-amber-500 mb-1">Trading the number, not the expectation</h4>
                  <p className="text-muted-foreground">Markets react to surprises, not absolute values. Check consensus forecasts first.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-amber-600 dark:text-amber-500 mb-1">Ignoring central bank divergence</h4>
                  <p className="text-muted-foreground">Rate differentials create multi-month trends. Follow both central banks in a pair.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-amber-600 dark:text-amber-500 mb-1">Holding through high-impact news</h4>
                  <p className="text-muted-foreground">News can reverse trends instantly. Close positions or use very wide stops (100+ pips).</p>
                </div>
                <div>
                  <h4 className="font-semibold text-amber-600 dark:text-amber-500 mb-1">Overlooking 'priced in' effect</h4>
                  <p className="text-muted-foreground">Expected news often causes "buy rumor, sell fact." Trade the surprise, not the headline.</p>
                </div>
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
            <h2 className="text-2xl font-bold mb-4">Stay Ahead with Economic Calendar</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Access our integrated economic calendar with real-time alerts for high-impact events. Never miss a major news release that could affect your trades.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" data-testid="button-economic-calendar">
                View Economic Calendar
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" data-testid="button-market-news">
                Latest Market News
              </Button>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}
