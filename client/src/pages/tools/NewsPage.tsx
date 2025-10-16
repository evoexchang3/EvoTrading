import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Newspaper, ExternalLink, TrendingUp, HelpCircle, BookOpen, Target, AlertTriangle, Zap, Download, Bell } from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function NewsPage() {
  const [category, setCategory] = useState("all");

  const newsItems = [
    {
      title: "Federal Reserve Signals Potential Rate Cuts in 2024",
      source: "Reuters",
      category: "central-banks",
      time: "2 hours ago",
      impact: "high",
      summary: "Fed Chair Jerome Powell indicated the central bank may consider lowering interest rates if inflation continues its downward trend, sending USD lower across major pairs.",
      tradingImplication: "Bearish USD: Sell USD/JPY target 148.00, USD/CHF target 0.8500. Long Gold (XAU/USD) target $2,100. Risk: If jobs data stays strong, Fed may delay cuts - reversal likely."
    },
    {
      title: "ECB Maintains Hawkish Stance Despite Slowing Growth",
      source: "Bloomberg",
      category: "central-banks",
      time: "4 hours ago",
      impact: "high",
      summary: "European Central Bank keeps rates unchanged but signals vigilance on inflation, supporting EUR strength against commodity currencies.",
      tradingImplication: "Bullish EUR: Buy EUR/AUD target 1.6800, EUR/NZD target 1.8200. Avoid EUR/USD (mixed signals with Fed dovish). Take profit if ECB hints at cuts in Q2."
    },
    {
      title: "Gold Reaches New Yearly High on Safe Haven Demand",
      source: "Financial Times",
      category: "commodities",
      time: "5 hours ago",
      impact: "medium",
      summary: "XAU/USD breaks through $2,050 resistance as geopolitical tensions and dovish Fed expectations drive investors to safe haven assets.",
      tradingImplication: "Bullish Gold: Buy XAU/USD on pullback to $2,045 support, target $2,100, stop $2,030. Correlates with USD weakness - if DXY drops, gold rises. Watch US yields."
    },
    {
      title: "US Jobless Claims Fall Below Expectations",
      source: "MarketWatch",
      category: "economic-data",
      time: "6 hours ago",
      impact: "medium",
      summary: "Initial jobless claims drop to 201K, beating forecast of 215K, indicating continued labor market strength and complicating Fed rate cut timeline.",
      tradingImplication: "Mixed USD: Short-term bullish (strong jobs), long-term bearish (delays cuts = slows economy). Trade: Wait for NFP Friday - if also strong, buy USD. If weak, ignore claims."
    },
    {
      title: "Bitcoin Surges Past $45,000 on ETF Approval Hopes",
      source: "CoinDesk",
      category: "crypto",
      time: "7 hours ago",
      impact: "high",
      summary: "BTC/USD rallies 8% as institutional investors anticipate spot Bitcoin ETF approvals, with analysts projecting further upside to $50K.",
      tradingImplication: "Bullish BTC: Buy BTC/USD target $48K, stop $43K (tight - volatile). If ETF approved, rally to $55K. If rejected, drop to $38K. High risk/reward. Use 50% normal position size."
    },
    {
      title: "Oil Prices Decline on Demand Concerns",
      source: "Reuters",
      category: "commodities",
      time: "8 hours ago",
      impact: "medium",
      summary: "WTI crude falls 2.3% to $78.50 amid worries about Chinese economic slowdown and potential increase in OPEC+ production quotas.",
      tradingImplication: "Bearish Oil: Sell WTI at $79.00, target $75.00. Affects CAD (oil-linked) - short CAD/JPY. Watch for OPEC emergency meeting - can reverse trend instantly if cut production."
    }
  ];

  const newsInterpretation = [
    {
      newsType: "Central Bank Rate Decisions (Fed, ECB, BOE, BOJ)",
      impact: "Very High - Can move markets 100-200 pips instantly",
      howToRead: "1. Rate decision (hike/cut/hold) - Less important than you think\n2. Forward guidance in statement - THIS is what moves markets\n3. Press conference tone (hawkish/dovish) - Watch Jerome Powell's face, not just words\n4. Dot plot / rate projections - Shows future path\n\nExample: Fed holds at 5.25% (neutral), but statement says 'prepared to hike further if needed' (hawkish) = USD rallies even though no hike today.",
      tradingAction: "WAIT for press conference (30min after decision). Initial move often reverses. Trade the tone: Hawkish statement + hawkish presser = Buy currency. Dovish statement but hawkish presser = Confusion, stay out. Use 1.5x normal stop loss (high volatility)."
    },
    {
      newsType: "Employment Data (NFP, Jobless Claims, ADP)",
      impact: "Very High (NFP) / Medium (Claims, ADP)",
      howToRead: "1. Headline number vs forecast - Beat = bullish, miss = bearish\n2. Revisions to previous months - Negative revisions can negate good headline\n3. Unemployment rate - Rising unemployment = recession signal (bearish)\n4. Wage growth (Average Hourly Earnings) - High wages = inflation = hawkish Fed = bullish USD\n\nFormula: Strong jobs + high wages = Most bullish. Weak jobs + low wages = Most bearish. Mixed data = choppy, avoid.",
      tradingAction: "For NFP (first Friday each month): Close all positions 30min before (8:30am ET). Wait 10-15min post-release for initial spike to settle. If beat by >50K: Buy USD. If miss by >50K: Sell USD. If within 30K of forecast: Ignore, no trade. Use 60-80 pip stops (wide moves)."
    },
    {
      newsType: "Inflation Data (CPI, PPI, PCE)",
      impact: "Very High - Directly affects rate policy",
      howToRead: "1. Headline CPI vs forecast - Most watched number\n2. Core CPI (excludes food/energy) - Fed watches this more\n3. Month-over-month (MoM) - Shows current trend. >0.3% MoM = 'hot', <0.1% = 'cold'\n4. Year-over-year (YoY) - Less important for trading, more for policy\n\nThresholds: CPI >3.5% = Fed must hike/keep high = Bullish USD. CPI <2% = Fed can cut = Bearish USD. CPI 2-3% = Goldilocks, mixed reaction.",
      tradingAction: "Hot inflation (beat forecast by >0.2%): Buy USD immediately, sell Gold, sell indices (rate hike fear). Cold inflation (miss by >0.2%): Sell USD, buy Gold, buy indices (rate cut hopes). Trade expires in 24hrs - take profit by next day, don't hold for weeks."
    },
    {
      newsType: "GDP Growth Data",
      impact: "High - Shows economic health",
      howToRead: "1. Q/Q (quarter-over-quarter) vs forecast - Most immediate impact\n2. Components: Consumer spending (70% of US GDP), business investment, net exports\n3. Revisions - Second and third estimates can change narrative\n\nPositive surprise (beat by >0.5%): Economy strong → Rate hikes likely → Bullish currency. Negative surprise (miss/negative): Recession fears → Rate cuts → Bearish currency.",
      tradingAction: "Strong GDP (>3%): Buy currency, but ONLY if inflation also high. Strong GDP + low inflation = No trades (Fed confused). Weak GDP (<1%): Sell currency IF employment also weak (confirms slowdown). One weak data point isn't enough - need confirmation."
    },
    {
      newsType: "Geopolitical Events (Wars, Elections, Crises)",
      impact: "Variable - Can be extreme (war) or negligible (small election)",
      howToRead: "1. Severity - War/terrorism = high impact. Trade disputes = medium. Political speeches = low\n2. Which currencies affected - War in Middle East = Oil up = CAD up. US election = USD volatile. Brexit = GBP chaos\n3. Safe haven flows - Fear → Buy USD, JPY, CHF, Gold. Risk-on → Buy AUD, NZD, GBP\n\nRule: Uncertainty = Sell risk currencies (AUD, NZD, emerging markets), Buy safe havens (USD, JPY, CHF, Gold).",
      tradingAction: "Geopolitical shock (war starts, coup, major attack): Immediately buy JPY (ultimate safe haven), buy Gold, sell all risk currencies. DON'T use normal technical analysis - geopolitics override all patterns. Use wide stops (100+ pips). Exit when crisis de-escalates (1-7 days usually)."
    }
  ];

  const tradingStrategies = [
    {
      strategy: "Trade the Surprise (Deviation from Forecast)",
      when: "Economic data releases (NFP, CPI, GDP, etc.)",
      setup: "Compare actual vs forecast. Calculate deviation percentage. If deviation >30% of forecast = tradeable surprise.",
      execution: "Example: NFP forecast 180K, actual 250K. Deviation: +70K (39% beat) = STRONG surprise → Buy USD/JPY immediately. Entry: Current price. Stop: 50 pips. Target: 100 pips (1:2 R:R). Exit in 2-4 hours max.",
      riskManagement: "Use 50% normal position size (news is volatile). If price doesn't move 20+ pips in first 10min, exit (market doesn't care about this data)."
    },
    {
      strategy: "Fade the Initial Spike (Reversal Trading)",
      when: "High impact news with extreme initial reaction (>100 pip move in 5min)",
      setup: "Wait 15-20min after news release. If price spikes violently up/down, then shows exhaustion (long wick, doji, volume drop), prepare to fade.",
      execution: "Example: Fed cuts rates, USD crashes 120 pips in 10min (spike low 1.0850). Price bounces to 1.0900, forms doji on 5min chart. Sell USD at 1.0895, stop 1.0920 (25 pips), target 1.0850 (45 pips). Expect reversal to 50% of initial move.",
      riskManagement: "ONLY fade extremes (>80 pip moves). Never fade a 30 pip move - it can go 200 more. Set tight stop (30 pips max). If wrong, don't re-enter - you missed the trade."
    },
    {
      strategy: "Pre-Position Based on Consensus (Risky but High Reward)",
      when: "Before very predictable news (e.g., Fed hike is 95% priced in)",
      setup: "When market consensus is >90% (check CME FedWatch for Fed, analyst surveys for others), pre-position 1-2 hours before news in direction of consensus.",
      execution: "Example: Fed 95% likely to hike 0.25%. Buy USD/JPY 2 hours before meeting at 149.50. When Fed hikes as expected, USD rallies to 150.20 (+70 pips). Exit immediately - don't hold for presser (can reverse).",
      riskManagement: "If consensus wrong (5% chance), loss is huge (100-200 pips). Use 25% position size only. Set mental stop - if news opposes position, exit at market instantly, don't wait for stop loss (slippage will destroy you)."
    },
    {
      strategy: "News + Technical Confluence",
      when: "News aligns with existing technical setup (best setup)",
      setup: "Identify key technical level (support/resistance, trend line, major Fib). Wait for news that supports technical bias. Combine for high-probability trade.",
      execution: "Example: EUR/USD at 1.0800 major support. Strong US CPI expected (bearish EUR). If CPI hot → EUR/USD breaks 1.0800 → Sell with conviction. Entry 1.0795, stop 1.0820 (25 pips), target 1.0720 (80 pips - next support). News + technicals = 70-80% win rate.",
      riskManagement: "ONLY trade when news AND technicals agree. Don't force it. If news bullish but technicals bearish (or vice versa), stay out - signals are mixed. Wait for alignment."
    }
  ];

  const proTips = [
    {
      tip: "The First Reaction is Often Wrong (Wait 10-15 Minutes)",
      detail: "Algorithmic trading and knee-jerk reactions dominate first 5-10 minutes. Real direction emerges after humans digest the details. USD may spike up on strong NFP, then reverse when traders realize revisions were terrible."
    },
    {
      tip: "Read the Full Statement/Report, Not Just Headlines",
      detail: "Headlines lie. 'Fed Holds Rates' sounds neutral, but statement might say 'prepared to hike further if needed' (hawkish). Algos trade headlines, humans trade substance. Be the human. Bloomberg terminal users see details 15sec before free news sites - you're already behind, so don't rush."
    },
    {
      tip: "Correlation is Key: USD Up = Gold Down, Stocks May Down",
      detail: "Strong USD news (hawkish Fed, good jobs): USD/JPY up, EUR/USD down, Gold down, US indices may drop (rate hike fear). Weak USD news: Opposite. Trade the correlated assets, not just forex. Sometimes Gold moves more clearly than EUR/USD on same news."
    },
    {
      tip: "Never Hold Positions Through High Impact News Unless Planned",
      detail: "If you have EUR/USD long going into NFP, either: Close it 30min before (safe), or accept 100+ pip stop might get hit (risky). 'Maybe I'll get lucky' is not a strategy. News gaps can blow past stop losses by 50 pips (slippage)."
    },
    {
      tip: "Some News is 'Priced In' - Market Won't React Even if Predictable",
      detail: "When Fed hike is 100% expected, announcement may cause ZERO move - it's already in the price. Only trade news with uncertainty (50/50 outcomes) or extreme surprises. Check CME FedWatch, analyst estimates before trading."
    },
    {
      tip: "Create a News Trading Journal Separate from Regular Journal",
      detail: "News trading has different dynamics than technical trading. Track: News type, expectation, actual, initial move, final move (4 hours later), your entry/exit. Find patterns: 'I'm profitable on NFP but lose on CPI - stop trading CPI'."
    }
  ];

  const faqs = [
    {
      question: "How can I tell which news is important and which to ignore?",
      answer: "High Impact (Always trade): Fed/ECB/BOE/BOJ meetings, NFP, CPI/inflation data, GDP flash estimates. Medium Impact (Trade if surprise >30%): Retail sales, jobless claims, PMI, consumer confidence. Low Impact (Ignore): Existing home sales, crude oil inventories, minor speeches. Use Forex Factory or Investing.com economic calendar - they rate impact (red = high, orange = medium, yellow = low). If it's not 'red' and doesn't move market 30+ pips historically, skip it. Focus on 10-15 major events per month, not 100+ minor ones."
    },
    {
      question: "Should I trade immediately when news is released or wait?",
      answer: "Wait 10-15 minutes UNLESS you have a predefined plan. Immediate (0-5 min): Algorithms dominate, spreads widen to 5+ pips, slippage is common, stop losses may not trigger at exact level - very risky for retail. After 10-15 min: Algorithms done, spreads normalize (1-2 pips), direction clarifies, humans take over. Trading strategy: Set alerts for news, watch first 5 min WITHOUT trading (learn the initial reaction), then trade 10-15 min after with clear bias. Exception: If you're very experienced and have fast execution (VPS, institutional broker), you can trade 30-60 seconds after release - but most retail traders will lose doing this."
    },
    {
      question: "What's the best way to prepare for a major news event?",
      answer: "48 hours before: 1) Mark calendar with news time (convert to YOUR timezone). 2) Check consensus forecast (what market expects). 3) Review previous 3 releases (trend). 24 hours before: 4) Identify current bias (is USD strong/weak leading into this?). 5) Note key technical levels (support/resistance). 6) Decide IF you'll trade (if uncertain, sit out). 1 hour before: 7) Close unrelated positions or reduce size to 50%. 8) Remove pending orders (can trigger in spike). 9) Write down plan: 'If NFP beats by >50K → Buy USD/JPY at market, stop 50 pips, target 100 pips. If misses → Sell.' 10 min before: 10) Hands off keyboard. Watch. Let first move happen. At release +10min: 11) Execute your plan IF conditions met, or walk away if not. Never 'wing it' - you'll panic trade."
    },
    {
      question: "Why does the market sometimes move opposite to what the news suggests?",
      answer: "Three main reasons: 1) 'Priced In' - Market already expected the outcome. NFP beats but USD drops because everyone was already long USD before the news (buy the rumor, sell the fact). 2) Details Matter More Than Headlines - Headline: 'Strong NFP 250K' (bullish). Detail: Previous month revised down by 100K (bearish). Net result: Bearish. Algos trade headline (USD up), humans trade details (USD down) = reversal. 3) Bigger Picture Overrides - Strong US jobs (bullish USD), but global recession fears (bearish USD). Macro context wins. Solution: Don't assume direction based on headline alone. Wait for market to tell you with price action, then trade WITH the market direction, not against it."
    },
    {
      question: "How do I manage risk when trading around news events?",
      answer: "Before news: 1) Reduce position size to 50% of normal if trading the news. 2) Use wider stops (60-80 pips vs usual 30-40) to account for volatility. 3) Set maximum loss for the day (e.g., 'If I lose $500 on this NFP trade, I'm done for the day'). During news: 4) NEVER move stop loss further away if trade goes against you (discipline). 5) Use mental stops for news trades - if price moves 30 pips against you instantly, exit at market, don't wait for stop to trigger (slippage). After news: 6) Take profit within 1-4 hours. Don't get greedy and hold for 'the big move' - it often reverses by next day. 7) If trade profitable by +2R, move stop to breakeven and let it run. Overall: Accept that news trading is higher risk than technical trading. Win rates may be 50-60% (vs 65-70% technical), but R:R can be 1:3 if you catch big moves. Use it to complement technical trading, not replace it."
    },
    {
      question: "What's the relationship between news events and technical analysis?",
      answer: "News can override technicals short-term (1-4 hours), but technicals override news medium-term (1-3 days). Example: EUR/USD at 1.1000 resistance (technical). Strong US CPI released (bullish USD, bearish EUR - fundamental). Price crashes through 1.1000 to 1.0920 (news wins). But after 48 hours, if there's no follow-through, price often returns to 1.1000 area (technical level reasserts). Best approach: Use technicals to identify levels, use news to provide catalyst for breakout. Setup: Price at major support + supportive news = high probability long. Price at random level + random news = low probability, skip. Never trade news in a vacuum - always consider where price is relative to key technical levels."
    },
    {
      question: "How can I trade news if I'm at work during major economic releases?",
      answer: "Option 1 - Don't trade news directly, trade the aftermath: If NFP releases at 8:30am ET and you can only trade at 6pm ET (10 hours later), you can still trade the resulting trend. After strong NFP, USD often trends higher for 1-3 days. Enter on pullbacks to moving average using technical analysis. You miss the initial spike (100 pips) but catch the trend (200+ pips). Option 2 - Use pending orders (risky): Before news, set buy stop 20 pips above current price, sell stop 20 pips below. One will trigger. Use wide stops (80+ pips). Risk: Both might trigger in whipsaw, causing double loss. Option 3 - Mobile alerts + quick trades: Set alerts for major news on phone. If price moves >50 pips in 5 min, place mobile order during bathroom break. Use 'one-click trading' apps. Option 4 (recommended) - Accept your limitations: If you can't actively monitor during news, focus on swing trading and position trading that doesn't rely on news timing. Trade the 'slow money' while others trade the 'fast money'. Less stress, more sustainable."
    }
  ];

  const categories = {
    all: "All News",
    "central-banks": "Central Banks",
    "economic-data": "Economic Data",
    commodities: "Commodities",
    crypto: "Cryptocurrency"
  };

  const filteredNews = category === "all" 
    ? newsItems 
    : newsItems.filter(item => item.category === category);

  const getImpactColor = (impact: string) => {
    return impact === "high" ? "destructive" : "default";
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold" data-testid="heading-market-news">Market News</h1>
            <p className="text-muted-foreground">Stay updated with real-time financial news and trading insights</p>
          </div>
          <Newspaper className="w-8 h-8 text-muted-foreground" />
        </div>

        {/* Quick Stats */}
        <div className="grid sm:grid-cols-4 gap-4">
          <Card data-testid="card-stat-high-impact-news">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-destructive mb-1">3</div>
              <p className="text-sm text-muted-foreground">High Impact Today</p>
            </CardContent>
          </Card>
          <Card data-testid="card-stat-update-frequency">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-1">5min</div>
              <p className="text-sm text-muted-foreground">Auto-Refresh Rate</p>
            </CardContent>
          </Card>
          <Card data-testid="card-stat-sources">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-1">12+</div>
              <p className="text-sm text-muted-foreground">Trusted Sources</p>
            </CardContent>
          </Card>
          <Card data-testid="card-stat-categories">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-1">5</div>
              <p className="text-sm text-muted-foreground">News Categories</p>
            </CardContent>
          </Card>
        </div>

        {/* News Filter */}
        <div className="flex gap-4 items-center">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[200px]" data-testid="select-news-category">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(categories).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TrendingUp className="w-4 h-4" />
            <span>Auto-refresh every 5 minutes</span>
          </div>

          <Button variant="outline" className="ml-auto gap-2" data-testid="button-news-alerts">
            <Bell className="w-4 h-4" />
            Setup Alerts
          </Button>
        </div>

        {/* News Feed */}
        <div className="space-y-4">
          {filteredNews.map((news, index) => (
            <Card key={index} className="hover-elevate" data-testid={`card-news-${index}`}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={getImpactColor(news.impact)}>
                        {news.impact} impact
                      </Badge>
                      <Badge variant="outline">{categories[news.category as keyof typeof categories]}</Badge>
                      <span className="text-sm text-muted-foreground">{news.time}</span>
                    </div>
                    <CardTitle className="text-xl mb-2">{news.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <span>{news.source}</span>
                    </CardDescription>
                  </div>
                  <ExternalLink className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3">{news.summary}</p>
                <Alert>
                  <AlertDescription className="text-sm">
                    <strong className="text-primary">Trading Implication:</strong> {news.tradingImplication}
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* News Interpretation Guide */}
        <Card data-testid="card-news-interpretation">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <CardTitle>How to Interpret Different News Types</CardTitle>
            </div>
            <CardDescription>Master the art of reading economic news for trading decisions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {newsInterpretation.map((item, index) => (
                <div key={index} className="border-l-4 border-primary pl-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.newsType}</h3>
                      <Badge variant="destructive" className="mt-1">{item.impact}</Badge>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm font-medium mb-2">How to Read This News:</p>
                      <p className="text-sm text-muted-foreground whitespace-pre-line">{item.howToRead}</p>
                    </div>
                    <Alert>
                      <AlertDescription className="text-sm">
                        <strong className="text-primary">Trading Action:</strong> {item.tradingAction}
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Trading Strategies */}
        <Card data-testid="card-trading-strategies">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              <CardTitle>News-Based Trading Strategies</CardTitle>
            </div>
            <CardDescription>Proven approaches for trading market-moving news</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {tradingStrategies.map((strategy, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">{strategy.strategy}</h3>
                  <div className="space-y-3">
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="p-3 bg-muted rounded">
                        <p className="text-xs font-medium mb-1">When to Use:</p>
                        <p className="text-sm text-muted-foreground">{strategy.when}</p>
                      </div>
                      <div className="p-3 bg-muted rounded">
                        <p className="text-xs font-medium mb-1">Setup:</p>
                        <p className="text-sm text-muted-foreground">{strategy.setup}</p>
                      </div>
                    </div>
                    <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                      <p className="text-sm font-medium mb-1">Execution Example:</p>
                      <p className="text-sm text-muted-foreground">{strategy.execution}</p>
                    </div>
                    <Alert>
                      <AlertDescription className="text-sm">
                        <strong>Risk Management:</strong> {strategy.riskManagement}
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
              <CardTitle>Professional News Trading Tips</CardTitle>
            </div>
            <CardDescription>Expert insights for profitable news trading</CardDescription>
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

        {/* Export & Alert Features */}
        <Card data-testid="card-export-functionality">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Download className="w-5 h-5 text-primary" />
              <CardTitle>News Alerts & Export Features</CardTitle>
            </div>
            <CardDescription>Stay informed with custom notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">🔔 Custom News Alerts</h3>
                <p className="text-sm text-muted-foreground mb-3">Get instant push notifications for high-impact news affecting your traded pairs (EUR/USD, GBP/USD, etc.)</p>
                <Button variant="outline" size="sm" data-testid="button-setup-news-alerts">Configure Alerts</Button>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">📰 News Digest</h3>
                <p className="text-sm text-muted-foreground mb-3">Daily/weekly summary of major market-moving news sent to your email with trading implications</p>
                <Button variant="outline" size="sm" data-testid="button-subscribe-digest">Subscribe</Button>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">💾 Save Articles</h3>
                <p className="text-sm text-muted-foreground mb-3">Bookmark important news for later review and export your saved articles as PDF/CSV</p>
                <Button variant="outline" size="sm" data-testid="button-saved-news">View Saved</Button>
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
            <CardDescription>Everything you need to know about trading the news</CardDescription>
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
