import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, TrendingUp, TrendingDown, Minus, HelpCircle, BookOpen, Target, AlertTriangle, Zap, Download, Activity } from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

interface EconomicEvent {
  id: string;
  datetime: string;
  currency: string;
  event: string;
  impact: string;
  forecast: string | null;
  previous: string | null;
  actual: string | null;
}

export default function EconomicCalendarPage() {
  const [currencyFilter, setCurrencyFilter] = useState("all");
  const [impactFilter, setImpactFilter] = useState("all");

  const { data: events = [], isLoading } = useQuery<EconomicEvent[]>({
    queryKey: ['/api/economic-calendar', currencyFilter, impactFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (currencyFilter && currencyFilter !== 'all') params.append('currency', currencyFilter);
      if (impactFilter && impactFilter !== 'all') params.append('impact', impactFilter);
      
      const url = `/api/economic-calendar${params.toString() ? '?' + params.toString() : ''}`;
      const res = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      
      if (!res.ok) throw new Error('Failed to fetch economic calendar');
      return res.json();
    },
    refetchInterval: 1000 * 60 * 30, // Refetch every 30 minutes
  });

  const mockEvents = [
    {
      time: "09:30",
      currency: "USD",
      event: "Non-Farm Payrolls",
      impact: "high",
      forecast: "185K",
      previous: "209K",
      actual: null
    },
    {
      time: "10:00",
      currency: "EUR",
      event: "ECB Interest Rate Decision",
      impact: "high",
      forecast: "4.50%",
      previous: "4.50%",
      actual: null
    },
    {
      time: "13:30",
      currency: "GBP",
      event: "GDP Growth Rate",
      impact: "medium",
      forecast: "0.2%",
      previous: "0.1%",
      actual: null
    },
    {
      time: "14:00",
      currency: "USD",
      event: "Consumer Confidence Index",
      impact: "medium",
      forecast: "102.5",
      previous: "101.3",
      actual: null
    },
    {
      time: "15:00",
      currency: "CAD",
      event: "Employment Change",
      impact: "medium",
      forecast: "22K",
      previous: "18K",
      actual: null
    },
    {
      time: "16:00",
      currency: "JPY",
      event: "BOJ Policy Statement",
      impact: "high",
      forecast: "-",
      previous: "-",
      actual: null
    }
  ];

  const keyIndicators = [
    {
      name: "Non-Farm Payrolls (NFP)",
      icon: TrendingUp,
      currency: "USD",
      impact: "Very High",
      description: "US employment change excluding farm sector",
      interpretation: "Higher than forecast (bullish USD): Indicates strong job growth → Fed may raise rates → USD strengthens\n\nLower than forecast (bearish USD): Weak job growth → Fed may pause/cut → USD weakens\n\nTypical market reaction: 50-150 pip move in USD pairs within 5 minutes",
      tradingTips: "Wait 5-10 minutes for initial volatility to settle, then trade breakout direction with 30-40 pip stops"
    },
    {
      name: "Interest Rate Decisions",
      icon: Target,
      currency: "All Major Currencies",
      impact: "Very High",
      description: "Central bank policy rate changes (Fed, ECB, BOE, BOJ)",
      interpretation: "Rate Hike (bullish currency): Higher rates attract foreign capital → Currency appreciates\n\nRate Cut (bearish currency): Lower rates reduce yield → Currency weakens\n\nUnchanged but hawkish statement: Can strengthen currency if future hikes hinted",
      tradingTips: "Focus on forward guidance in statement, not just the rate. Trade the trend reversal if actual differs from consensus"
    },
    {
      name: "GDP (Gross Domestic Product)",
      icon: Activity,
      currency: "All",
      impact: "High",
      description: "Economic growth rate measuring total economic output",
      interpretation: "Strong GDP growth (bullish): Economy expanding → Potential rate hikes → Currency strength\n\nWeak/Negative GDP (bearish): Recession risk → Rate cuts likely → Currency weakness\n\nQ/Q vs Y/Y: Quarter-over-quarter more immediate impact than year-over-year",
      tradingTips: "Combine with employment data. Strong GDP + strong jobs = high confidence bullish setup"
    },
    {
      name: "CPI/Inflation Data",
      icon: TrendingUp,
      currency: "All",
      impact: "Very High",
      description: "Consumer Price Index - measure of inflation",
      interpretation: "Higher inflation (variable): If <3% target, bullish (growth). If >3%, bearish (rate hike fear)\n\nLower inflation: If too low (<1%), bearish (deflation risk). If moderate, bullish (Goldilocks)\n\nCore CPI: Excludes food/energy, watched more by central banks",
      tradingTips: "Watch for 'hot' CPI (>0.3% monthly) to trade aggressive USD long. Cold CPI (<0.1%) = USD short opportunity"
    }
  ];

  const eventCategories = [
    {
      category: "Employment Data",
      events: ["Non-Farm Payrolls", "Unemployment Rate", "Jobless Claims", "ADP Employment"],
      importance: "Very High - Drives central bank policy decisions",
      frequency: "Monthly/Weekly",
      tradingStrategy: "Trade direction of surprise. Strong jobs = currency long, weak jobs = currency short. Use 1:2 risk/reward minimum."
    },
    {
      category: "Inflation Indicators",
      events: ["CPI", "PPI", "PCE", "Core Inflation"],
      importance: "Very High - Primary central bank mandate",
      frequency: "Monthly",
      tradingStrategy: "Hot inflation (>forecast) = buy currency (rate hike expectations). Cold inflation = sell currency (dovish policy)."
    },
    {
      category: "Central Bank Meetings",
      events: ["FOMC", "ECB Meeting", "BOE Meeting", "BOJ Meeting"],
      importance: "Extreme - Can move markets 200+ pips",
      frequency: "6-8 times per year",
      tradingStrategy: "Trade the statement tone, not just the rate. Hawkish (raise/hold high) = buy, Dovish (cut/lower) = sell. Wait for clarity."
    },
    {
      category: "Growth Indicators",
      events: ["GDP", "Retail Sales", "Industrial Production", "PMI"],
      importance: "High - Economic health indicators",
      frequency: "Monthly/Quarterly",
      tradingStrategy: "Strong growth data supports currency. Weak data signals slowdown. Combine with inflation for full picture."
    }
  ];

  const interpretationExamples = [
    {
      scenario: "NFP Forecast: 185K | Actual: 250K (Beat by 65K)",
      interpretation: "Strong labor market surprise - very bullish USD",
      expectedMove: "USD pairs rally 80-120 pips immediately",
      tradingAction: "After initial spike, wait 10min → If price holds above spike low, buy pullback to 50% retracement. SL below low, TP at new high + 50 pips. If reverses completely, stay out (false breakout)."
    },
    {
      scenario: "ECB Rate Decision: Expected 4.50% | Actual 4.75% (Hike)",
      interpretation: "Hawkish surprise - very bullish EUR",
      expectedMove: "EUR/USD +100-150 pips, EUR/JPY +150-200 pips",
      tradingAction: "Trade EUR long vs all pairs (especially vs JPY, CHF). Enter on first pullback to rising 15min EMA. Hold until press conference ends (30min-1hr after decision)."
    },
    {
      scenario: "UK GDP Q/Q: Forecast 0.2% | Actual -0.1% (Miss & Negative)",
      interpretation: "Recession signal - very bearish GBP",
      expectedMove: "GBP/USD -50-80 pips, EUR/GBP +60-100 pips",
      tradingAction: "Sell GBP aggressively vs USD, EUR. Use wide stops (50-60 pips) as panic selling can overshoot. Take profit at recent support levels. Exit all by end of day."
    },
    {
      scenario: "US CPI M/M: Forecast 0.3% | Actual 0.5% (Hot inflation)",
      interpretation: "Fed will likely raise rates - bullish USD short-term",
      expectedMove: "USD pairs rally, Gold drops, indices may fall (rate hike fear)",
      tradingAction: "Buy USD/JPY, USD/CHF immediately. Sell Gold. Hold until Fed meeting or next data. If inflation continues rising for 2-3 months, switch to USD short (recession fear)."
    }
  ];

  const proTips = [
    {
      tip: "Trade the 'Beat' or 'Miss', Not the Absolute Number",
      detail: "Market moves based on forecast deviation, not the actual value. NFP 180K that beats 160K forecast is bullish. NFP 220K that misses 250K forecast is bearish."
    },
    {
      tip: "High Impact Events = Stay Out or Use Reduced Size",
      detail: "During NFP, Fed meetings, CPI: Either stay flat or reduce position size to 50%. Spreads widen 3-5x, slippage is common. Not worth the risk for most retail traders."
    },
    {
      tip: "Mark Calendar for Entire Week, Not Just Today",
      detail: "Plan your week around high-impact events. If NFP is Friday, avoid aggressive swing trades Thursday night. Major events create multi-day trends."
    },
    {
      tip: "Watch Currency-Specific Events, Not Just USD",
      detail: "EUR traders: ECB meeting > US events for EUR/GBP, EUR/CHF. JPY traders: BOJ > Fed. Trade the currency whose data is released."
    },
    {
      tip: "Combine Calendar with Technical Levels",
      detail: "Economic data + technical confluence = highest probability. Example: NFP bullish USD + price at major support = strong long setup. Data alone isn't enough."
    },
    {
      tip: "First Reaction Often Reversed Within 1 Hour",
      detail: "Knee-jerk reactions fade as traders digest details. If NFP beats but revision shows previous month was terrible, USD may reverse lower after 30-60min spike."
    }
  ];

  const faqs = [
    {
      question: "How do I know which economic events are most important?",
      answer: "High impact events are: Non-Farm Payrolls (NFP), FOMC/ECB/BOE/BOJ meetings, CPI/inflation data, and GDP releases. These typically cause 50-150 pip moves. Medium impact: Retail sales, jobless claims, PMI (20-50 pips). Low impact: Minor indicators, speeches (<20 pips). Always check the 'impact' rating on the calendar and focus on 'high' and 'very high' events that affect currencies you trade."
    },
    {
      question: "Should I trade during high-impact news events or avoid them?",
      answer: "For beginners: Avoid trading 15min before to 30min after high-impact events. Spreads widen dramatically (EUR/USD from 0.8 pips to 5+ pips), slippage is common, and stop losses may not trigger at your level. For experienced traders: Reduce position size by 50-75%, use wider stops (50+ pips), and trade the breakout after initial volatility settles (10-15 minutes post-release). Never hold pending orders during NFP or central bank meetings."
    },
    {
      question: "How do I interpret 'forecast vs actual' correctly?",
      answer: "Market moves based on SURPRISE (deviation from forecast), not the actual number. Formula: If Actual > Forecast by ≥0.3% = Bullish currency (big beat). If Actual < Forecast by ≥0.3% = Bearish currency (big miss). Example: GDP forecast 1.5%, actual 2.0% (+0.5% beat) = very bullish. GDP forecast 2.0%, actual 1.9% (-0.1% miss) = slightly bearish but minimal impact. The bigger the surprise, the bigger the move. Track 'consensus' vs 'previous' too - if consensus already priced in improvement, 'meeting' forecast may not rally currency."
    },
    {
      question: "What's the best way to prepare for a major economic release?",
      answer: "Day before: 1) Check calendar for all releases in next 24h, 2) Identify your bias (bullish/bearish on the currency), 3) Mark key technical levels (support/resistance). 1 hour before: 4) Close/reduce positions in that currency if holding overnight, 5) Remove pending orders, 6) Set alerts at technical levels. Post-release: 7) Wait 5-10min for initial volatility, 8) Assess if actual beat/missed forecast significantly, 9) Trade the breakout direction IF it aligns with technicals. If confused, stay out entirely - there's always another trade."
    },
    {
      question: "Can I predict market direction before the data is released?",
      answer: "No. Attempting to predict economic data is gambling, not trading. However, you CAN prepare scenarios: 'If NFP beats by 50K+ → Buy USD/JPY at 149.50 with SL 149.00, TP 150.50' vs 'If NFP misses by 50K+ → Sell USD/JPY at 148.50, SL 149.00, TP 147.00'. Create an IF/THEN plan for both outcomes. This removes emotion and allows fast execution. Never 'hope' or 'guess' the number - let the data tell you, then react with a predefined plan."
    },
    {
      question: "How long does the impact of economic data typically last?",
      answer: "Immediate impact: 5-30 minutes (volatility spike, may reverse). Short-term: 1-24 hours (trend develops if data is significant). Medium-term: 2-7 days (especially for central bank meetings, GDP). Long-term: Weeks to months (major policy shifts like Fed pivot from hikes to cuts). Example: Single strong NFP = 1-2 day USD strength. Three consecutive strong NFPs = Fed rate hike cycle = months of USD uptrend. Use calendar to identify potential trend-starting events (Fed meetings, CPI series) vs one-off volatility (single jobless claims)."
    },
    {
      question: "What are 'revisions' and why do they matter?",
      answer: "Revisions are adjustments to previously reported data (usually 1-2 months later). Example: NFP initially reported as +200K, revised down to +150K. This means the previous 'good' data was actually weak - bearish for USD even if current NFP is strong. Always check revisions in the calendar. A positive current number + negative revision can cause mixed reactions or reversals. Professional traders weight revisions heavily because they show real economic trend, not just the headline number. If revisions are consistently negative for 3+ months, it signals deteriorating economy regardless of headline beats."
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "secondary";
    }
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case "high": return <TrendingUp className="w-3 h-3" />;
      case "medium": return <Minus className="w-3 h-3" />;
      case "low": return <TrendingDown className="w-3 h-3" />;
      default: return null;
    }
  };


  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold" data-testid="heading-economic-calendar">Economic Calendar</h1>
            <p className="text-muted-foreground">Track important economic events that impact markets</p>
          </div>
          <Calendar className="w-8 h-8 text-muted-foreground" />
        </div>

        {/* Quick Stats */}
        <div className="grid sm:grid-cols-4 gap-4">
          <Card data-testid="card-stat-high-impact">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-destructive mb-1">6</div>
              <p className="text-sm text-muted-foreground">High Impact Today</p>
            </CardContent>
          </Card>
          <Card data-testid="card-stat-currencies">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-1">8</div>
              <p className="text-sm text-muted-foreground">Currencies Tracked</p>
            </CardContent>
          </Card>
          <Card data-testid="card-stat-auto-update">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-1">Real-time</div>
              <p className="text-sm text-muted-foreground">Auto Updates</p>
            </CardContent>
          </Card>
          <Card data-testid="card-stat-upcoming">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-1">24hrs</div>
              <p className="text-sm text-muted-foreground">Advance Notice</p>
            </CardContent>
          </Card>
        </div>

        {/* Calendar Filter and Events */}
        <div className="flex gap-4 items-center">
          <Select value={currencyFilter} onValueChange={setCurrencyFilter}>
            <SelectTrigger className="w-[150px]" data-testid="select-currency-filter">
              <SelectValue placeholder="Currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Currencies</SelectItem>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="EUR">EUR</SelectItem>
              <SelectItem value="GBP">GBP</SelectItem>
              <SelectItem value="JPY">JPY</SelectItem>
              <SelectItem value="AUD">AUD</SelectItem>
              <SelectItem value="CAD">CAD</SelectItem>
              <SelectItem value="CHF">CHF</SelectItem>
              <SelectItem value="NZD">NZD</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={impactFilter} onValueChange={setImpactFilter}>
            <SelectTrigger className="w-[150px]" data-testid="select-impact-filter">
              <SelectValue placeholder="Impact" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Impact</SelectItem>
              <SelectItem value="high">High Impact</SelectItem>
              <SelectItem value="medium">Medium Impact</SelectItem>
              <SelectItem value="low">Low Impact</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex gap-2">
            <Badge variant="destructive" className="gap-1" data-testid="badge-high-impact">
              <TrendingUp className="w-3 h-3" />
              High Impact
            </Badge>
            <Badge variant="default" className="gap-1" data-testid="badge-medium-impact">
              <Minus className="w-3 h-3" />
              Medium Impact
            </Badge>
            <Badge variant="secondary" className="gap-1" data-testid="badge-low-impact">
              <TrendingDown className="w-3 h-3" />
              Low Impact
            </Badge>
          </div>

          <Button variant="outline" className="ml-auto gap-2" data-testid="button-export-calendar">
            <Download className="w-4 h-4" />
            Export to CSV
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Economic Events</CardTitle>
            <CardDescription>
              {isLoading ? "Loading events..." : `Showing ${events.length} ${events.length === 1 ? 'event' : 'events'} • All times in UTC`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-muted-foreground">Loading economic calendar...</div>
              </div>
            ) : events.length === 0 ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-muted-foreground">No events found for the selected filters</div>
              </div>
            ) : (
              <div className="space-y-3">
                {events.map((event, index) => (
                  <div 
                    key={event.id || index} 
                    className="flex items-center gap-4 p-4 rounded-lg border hover-elevate"
                    data-testid={`event-${index}`}
                  >
                    <div className="flex items-center gap-2 min-w-[120px]">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="font-mono font-semibold text-sm">
                        {format(new Date(event.datetime), 'MMM dd HH:mm')}
                      </span>
                    </div>
                    
                    <Badge variant="outline" className="font-mono min-w-[50px] justify-center">
                      {event.currency}
                    </Badge>
                    
                    <div className="flex-1">
                      <p className="font-semibold">{event.event}</p>
                      <p className="text-xs text-muted-foreground">{event.country}</p>
                    </div>
                    
                    <Badge variant={getImpactColor(event.impact || 'low')} className="gap-1 min-w-[100px] justify-center">
                      {getImpactIcon(event.impact || 'low')}
                      {event.impact || 'low'}
                    </Badge>
                    
                    <div className="grid grid-cols-3 gap-4 min-w-[300px] text-sm">
                      <div>
                        <p className="text-muted-foreground text-xs">Forecast</p>
                        <p className="font-semibold">{event.forecast || "-"}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Previous</p>
                        <p className="font-semibold">{event.previous || "-"}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Actual</p>
                        <p className="font-semibold">{event.actual || "-"}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Key Indicators Guide */}
        <Card data-testid="card-key-indicators">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <CardTitle>Understanding Key Economic Indicators</CardTitle>
            </div>
            <CardDescription>Master the most market-moving economic events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {keyIndicators.map((indicator, index) => {
                const Icon = indicator.icon;
                return (
                  <div key={index} className="border-l-4 border-primary pl-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{indicator.name}</h3>
                          <p className="text-sm text-muted-foreground">{indicator.description}</p>
                        </div>
                      </div>
                      <Badge variant="destructive">{indicator.impact}</Badge>
                    </div>
                    <div className="mt-3 p-4 bg-muted rounded-lg">
                      <h4 className="font-semibold text-sm mb-2">How to Interpret:</h4>
                      <p className="text-sm text-muted-foreground whitespace-pre-line">{indicator.interpretation}</p>
                    </div>
                    <div className="mt-2 p-3 border border-primary/20 rounded-lg bg-primary/5">
                      <p className="text-sm"><strong className="text-primary">Trading Tip:</strong> {indicator.tradingTips}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Event Categories */}
        <Card data-testid="card-event-categories">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              <CardTitle>Event Categories & Trading Strategies</CardTitle>
            </div>
            <CardDescription>How to trade different types of economic releases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {eventCategories.map((category, index) => (
                <div key={index} className="p-4 border rounded-lg hover-elevate" data-testid={`category-${index}`}>
                  <h3 className="font-semibold text-lg mb-2">{category.category}</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Key Events:</p>
                      <div className="flex flex-wrap gap-1">
                        {category.events.map((event, i) => (
                          <Badge key={i} variant="outline" className="text-xs">{event}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-medium mb-1">Importance: <span className="text-primary">{category.importance}</span></p>
                      <p className="text-xs text-muted-foreground">Frequency: {category.frequency}</p>
                    </div>
                    <Alert>
                      <AlertDescription className="text-sm">
                        <strong>Strategy:</strong> {category.tradingStrategy}
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Real-World Examples */}
        <Card data-testid="card-interpretation-examples">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              <CardTitle>Real-World Interpretation Examples</CardTitle>
            </div>
            <CardDescription>Learn how to react to actual vs forecast scenarios</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {interpretationExamples.map((example, index) => (
                <div key={index} className="p-4 bg-muted rounded-lg" data-testid={`example-${index}`}>
                  <h3 className="font-semibold mb-2 text-primary">{example.scenario}</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Interpretation:</strong> {example.interpretation}</p>
                    <p className="text-muted-foreground"><strong>Expected Move:</strong> {example.expectedMove}</p>
                    <div className="p-3 bg-background rounded border border-primary/20 mt-3">
                      <p><strong className="text-primary">Trading Action:</strong> {example.tradingAction}</p>
                    </div>
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
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <CardTitle>Professional Tips & Best Practices</CardTitle>
            </div>
            <CardDescription>Master economic calendar trading with these expert insights</CardDescription>
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

        {/* Export & Save Functionality */}
        <Card data-testid="card-export-functionality">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Download className="w-5 h-5 text-primary" />
              <CardTitle>Export & Save Features</CardTitle>
            </div>
            <CardDescription>Never miss an important economic event</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">📅 Calendar Export</h3>
                <p className="text-sm text-muted-foreground mb-3">Export events to Google Calendar, Outlook, or iCal with automatic reminders 15 minutes before release</p>
                <Button variant="outline" size="sm" data-testid="button-sync-calendar">Sync to Calendar</Button>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">📊 CSV Download</h3>
                <p className="text-sm text-muted-foreground mb-3">Download full week/month event data as CSV for analysis in Excel or custom trading journal</p>
                <Button variant="outline" size="sm" data-testid="button-download-csv">Download CSV</Button>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">🔔 Custom Alerts</h3>
                <p className="text-sm text-muted-foreground mb-3">Set SMS/email alerts for specific events (NFP, Fed) or impact levels (High only). Filter by currency</p>
                <Button variant="outline" size="sm" data-testid="button-setup-alerts">Setup Alerts</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card data-testid="card-faq">
          <CardHeader>
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-primary" />
              <CardTitle>Frequently Asked Questions</CardTitle>
            </div>
            <CardDescription>Everything you need to know about trading economic events</CardDescription>
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
