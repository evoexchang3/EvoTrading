import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Clock, HelpCircle, BookOpen, Target, AlertTriangle, Zap, Download } from "lucide-react";
import { useState, useEffect } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function TradingSessionsPage() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const sessions = [
    {
      name: "Sydney",
      timezone: "Australia/Sydney",
      open: 21,
      close: 6,
      color: "bg-blue-500",
      pairs: ["AUD/USD", "AUD/JPY", "NZD/USD"],
      avgDaily: "50-70 pips",
      volatility: "Low"
    },
    {
      name: "Tokyo",
      timezone: "Asia/Tokyo",
      open: 23,
      close: 8,
      color: "bg-red-500",
      pairs: ["USD/JPY", "EUR/JPY", "GBP/JPY"],
      avgDaily: "70-100 pips",
      volatility: "Medium"
    },
    {
      name: "London",
      timezone: "Europe/London",
      open: 7,
      close: 16,
      color: "bg-green-500",
      pairs: ["EUR/USD", "GBP/USD", "EUR/GBP"],
      avgDaily: "100-150 pips",
      volatility: "High"
    },
    {
      name: "New York",
      timezone: "America/New_York",
      open: 12,
      close: 21,
      color: "bg-yellow-500",
      pairs: ["EUR/USD", "GBP/USD", "USD/CAD"],
      avgDaily: "80-120 pips",
      volatility: "High"
    }
  ];

  const sessionStrategies = [
    {
      session: "Asian Session (Sydney + Tokyo)",
      timeUTC: "21:00 - 08:00 UTC",
      characteristics: "Lower volatility, ranging markets, thin liquidity outside major pairs",
      bestPairs: ["AUD/USD", "AUD/JPY", "NZD/USD", "USD/JPY"],
      strategies: "Range Trading: Identify support/resistance from previous day's high/low. Buy at support, sell at resistance with tight stops (20-30 pips). Avoid breakout trades - fakeouts common.\n\nScalping: Use 5-15 minute charts. Target 5-10 pips per trade. Best during Tokyo open (23:00-01:00 UTC) when Japanese institutions active.\n\nCarry Trade Adjustments: Positions often rebalanced during Asian session. Watch for 'rollover' flows at 00:00 UTC affecting AUD, NZD.",
      avoid: "Avoid EUR/USD, GBP/USD - very low volume, wide spreads (3-5 pips vs 1-2 during London)"
    },
    {
      session: "London Session",
      timeUTC: "07:00 - 16:00 UTC",
      characteristics: "Highest volume globally (~35% of forex transactions), strong trends, major breakouts",
      bestPairs: ["EUR/USD", "GBP/USD", "EUR/GBP", "GBP/JPY"],
      strategies: "Breakout Trading: First hour (07:00-08:00 UTC) - 'London Open Breakout'. Price often breaks previous day range. Trade direction of break with 40-60 pip stops, 100+ pip targets.\n\nTrend Following: Mid-session (09:00-14:00 UTC). Use 15min/1H charts. Follow strong directional moves. Don't fight the trend - London drives global forex direction.\n\nNews Trading: UK/EU economic data released 07:00-10:00 UTC. Trade with the surprise (beat = buy GBP/EUR, miss = sell).",
      avoid: "Last hour (15:00-16:00 UTC) - volatility drops as traders prepare for NY close"
    },
    {
      session: "London/New York Overlap",
      timeUTC: "12:00 - 16:00 UTC (8am-12pm NY time)",
      characteristics: "PEAK LIQUIDITY - Tightest spreads, largest moves, 70% of daily volume in this 4-hour window",
      bestPairs: ["EUR/USD", "GBP/USD", "USD/JPY", "USD/CHF"],
      strategies: "Momentum Trading: Strongest trends occur here. Use 5-15 min charts. Enter pullbacks to 20 EMA in direction of trend. Ride until momentum weakens (RSI divergence).\n\nNews Spike Trading: US news (12:30-14:00 UTC) - NFP, Fed, CPI. Wait 10 min post-release, trade breakout direction. High risk/reward.\n\nHigh-Volume Scalping: If spread drops below 1 pip on EUR/USD, scalp 3-5 pip targets with high win rate. Need tight execution.",
      avoid: "Nothing - this is THE trading session. If you can only trade 4 hours/day, make it these 4 hours."
    },
    {
      session: "New York Afternoon",
      timeUTC: "16:00 - 21:00 UTC (12pm-5pm NY time)",
      characteristics: "Declining volume, position squaring before close, potential reversals",
      bestPairs: ["USD/CAD", "EUR/USD", "GBP/USD"],
      strategies: "Reversal Trading: After London close (16:00 UTC), trends often reverse as London traders close positions. Look for reversals at extremes - overbought/oversold RSI + candlestick patterns.\n\nEnd-of-Day Positioning: Final hour (20:00-21:00 UTC) - trade in direction that favors overnight carry. If AUD positive carry, bias long AUD/USD into close.\n\nLow-Risk Scalping: Use very tight stops (10-15 pips). Volatility lower, so profits smaller but safer for learning.",
      avoid: "Avoid holding positions into Sydney open if major news pending in Asia (China data, BOJ) - can gap against you"
    }
  ];

  const overlapGuides = [
    {
      overlap: "Tokyo/London Overlap",
      time: "07:00 - 08:00 UTC (1 hour)",
      volume: "Medium - Increases as London opens",
      bestFor: "EUR/JPY, GBP/JPY, EUR/GBP",
      tradingTip: "London traders enter while Tokyo still active. Yen crosses (EUR/JPY, GBP/JPY) see increased volatility. Watch for Tokyo range breakout as London volume hits. Not as strong as London/NY overlap but still tradable with 40-60 pip targets."
    },
    {
      overlap: "London/New York Overlap",
      time: "12:00 - 16:00 UTC (4 hours)",
      volume: "EXTREME - 70%+ of daily forex volume",
      bestFor: "ALL major pairs, especially EUR/USD, GBP/USD",
      tradingTip: "THE most important 4 hours in forex. Spreads at daily low (EUR/USD often 0.5-0.8 pips). Largest moves, clearest trends. US news + European afternoon = perfect storm. Professional traders make 60-80% of daily profits in this window. If struggling with profits, focus ONLY on this session."
    },
    {
      overlap: "Sydney/Tokyo Overlap",
      time: "23:00 - 06:00 UTC (7 hours)",
      volume: "Low - Primarily regional flows",
      bestFor: "AUD/JPY, NZD/JPY, AUD/NZD",
      tradingTip: "Quiet overlap, mostly institutional/corporate flows. Good for learning without pressure. Spreads wider (1.5-2 pips vs 0.8). Use for range trading with 30-40 pip ranges. Avoid large positions - liquidity thin, one large order can move market 20 pips."
    }
  ];

  const proTips = [
    {
      tip: "Trade the First Hour of London - 'London Open Breakout'",
      detail: "07:00-08:00 UTC is when London traders arrive and break previous session ranges. Set alerts on daily high/low - when price breaks with volume, trade the direction. 60-70% success rate if executed properly. Use 1:2 risk/reward minimum."
    },
    {
      tip: "Never Trade During 'Dead Zones' (04:00-07:00 UTC)",
      detail: "Between Tokyo close and London open, volume drops 80%. Spreads widen, price action is random. Even if you see a 'perfect' setup, skip it - execution will be poor and you'll get stopped out on spread widening alone."
    },
    {
      tip: "Adjust Strategy Based on Session - Not One-Size-Fits-All",
      detail: "Breakouts work in London/NY (high volume). Range trading works in Asia (low volume). Momentum strategies work in overlaps. Using Asian session strategy in NY overlap will lose money - they're different markets."
    },
    {
      tip: "London/NY Overlap is When Retail Traders Get Destroyed",
      detail: "Paradox: Best session for profit is also most dangerous. Spreads tight but moves are violent. If you don't have fast execution and tight risk management, you'll get run over. Start with smaller position sizes (50% normal) until you master this session."
    },
    {
      tip: "Use Session Times to Set Stop Losses Strategically",
      detail: "Don't place stops near round numbers during London open - they'll get hunted. Instead, place slightly above/below (e.g., 1.0852 instead of 1.0850). During Asian session, tight stops (20-30 pips) work. During London, need 40-60 pips minimum."
    },
    {
      tip: "Friday Afternoon is Terrible for Trading (Position Squaring)",
      detail: "After 18:00 UTC on Fridays, traders close positions before weekend (can't manage risk Sat/Sun). Trends reverse, stop hunts common. If you have profits by Friday 16:00 UTC, close and enjoy weekend. Weekend gaps can wipe out week's gains."
    }
  ];

  const faqs = [
    {
      question: "What is the best trading session for beginners?",
      answer: "London/New York overlap (12:00-16:00 UTC) for active trading - clearest trends, tightest spreads, most educational. BUT if you want to LEARN without losing money, start with Asian session (23:00-06:00 UTC) using micro lots. Asian session is slower, more forgiving, and you can practice range trading without the pressure of rapid price movements. After 3-6 months of profitable Asian trading, graduate to London/NY overlap. Never start learning during London open (07:00-08:00 UTC) - it's too fast and you'll form bad habits from panic trading."
    },
    {
      question: "Should I trade during my local business hours or adjust to forex hours?",
      answer: "Adjust to forex hours, not your local schedule. Forex doesn't care where you live. If you're in California (UTC-8) and can only trade 9am-5pm your time (17:00-01:00 UTC), you're stuck with end of NY session (mediocre) and start of Sydney (poor). Either: 1) Wake up early (4am-8am local = 12:00-16:00 UTC overlap - GOLD), or 2) Accept lower profits trading suboptimal hours. The only exception: If you're in London (GMT) or Central Europe (CET) - you're blessed, your business hours align perfectly with best forex hours."
    },
    {
      question: "How do session times affect different currency pairs differently?",
      answer: "Currency pairs are most active during their 'home' sessions: AUD/USD, NZD/USD: Sydney/Tokyo sessions (21:00-08:00 UTC) - 60% of daily range occurs here. EUR/USD, EUR/GBP, GBP/USD: London session (07:00-16:00 UTC) - 70% of moves here. USD/CAD, USD/MXN: NY session (12:00-21:00 UTC). JPY pairs: Active in Tokyo (23:00-08:00) but MORE active in London/NY when crosses move (EUR/JPY, GBP/JPY). Rule: Trade a currency pair during the session when at least one of its currencies is 'at work'. Don't trade AUD/NZD during London (both sides asleep) - you're just gambling on random moves."
    },
    {
      question: "Why do prices often reverse at session changes (especially London open and NY open)?",
      answer: "Session changes = liquidity shift = trader rotation. Example: Asian session ends at 08:00 UTC - Asian traders (who were long USD/JPY) close positions (sell USD/JPY). London traders arrive with fresh view, see USD/JPY weak, also sell. Cascade = reversal. NY open (12:00 UTC) - European traders take profit on EUR/USD longs (sell), US traders see weakness, pile on (more selling) = reversal. These reversals are TRADABLE: Watch for exhaustion patterns (wicks, doji) in final 30min of a session. If Tokyo pushed USD/JPY up 40 pips (06:30-08:00 UTC), expect reversal as London opens. Place sell stop 20 pips below high."
    },
    {
      question: "How can I trade if I work full-time and can only trade 1-2 hours per day?",
      answer: "Scenario 1 - You can trade mornings (before work): If you wake at 6am local time, calculate 6am your timezone = ?:00 UTC. If it's 12:00-16:00 UTC → PERFECT, trade London/NY overlap for 1 hour. If it's during Asian session → trade ranges. Scenario 2 - You can trade evenings (after work): If you trade 7pm-9pm local = ?:00 UTC. If it's 00:00-02:00 UTC (Tokyo open) → tradable for scalping. If it's 03:00-06:00 UTC (dead zone) → skip trading, use time for analysis/education. Scenario 3 - Flexible schedule (can pick any 2 hours): ALWAYS choose 12:00-14:00 UTC (London/NY overlap start). Cancel meetings, wake up early, trade these 2 hours - they're worth more than 8 hours of Asian session. Use session clock to find YOUR optimal 1-2 hours."
    },
    {
      question: "What are 'session highs/lows' and why do traders watch them closely?",
      answer: "Session high/low = the highest/lowest price reached during a specific session. Example: Asian session (21:00-08:00 UTC) EUR/USD ranged 1.0850-1.0880. Asian high = 1.0880, Asian low = 1.0850. Why critical: When London opens (08:00 UTC), if price breaks above 1.0880 (Asian high) with volume → BULLISH breakout → traders pile in long → rally to 1.0920+. If price stays below 1.0880 and breaks 1.0850 (Asian low) → BEARISH breakout. Trading strategy: At session change, set buy stop 5 pips above previous session high, sell stop 5 pips below previous session low. Cancel opposite order when one triggers. Works 60-70% of time at major session changes (Tokyo→London, London→NY). Stop loss 40-50 pips, target 80-100 pips (1:2 R:R)."
    },
    {
      question: "How do daylight saving time changes affect trading sessions?",
      answer: "Forex uses UTC (never changes), but local times shift: March (Spring forward): London shifts from GMT (UTC+0) to BST (UTC+1). London 'open' moves from 08:00 UTC to 07:00 UTC local. NY shifts from EST (UTC-5) to EDT (UTC-4). NY 'open' stays 12:00 UTC (but is 8am local instead of 9am). November (Fall back): Reverse of above. Problem: Overlap timing CHANGES. When US on DST but UK not (or vice versa for 2 weeks), overlap may be 3 hours instead of 4. Solution: Ignore local times entirely. Use UTC exclusively. Set your trading platform to UTC. Mark on calendar: London/NY overlap is ALWAYS 12:00-16:00 UTC regardless of DST. Let other traders get confused by local times - you'll know the exact moment overlap starts."
    }
  ];

  const isSessionOpen = (session: typeof sessions[0]) => {
    const hour = currentTime.getUTCHours();
    if (session.close > session.open) {
      return hour >= session.open && hour < session.close;
    } else {
      return hour >= session.open || hour < session.close;
    }
  };

  const getSessionProgress = (session: typeof sessions[0]) => {
    const hour = currentTime.getUTCHours();
    const minute = currentTime.getUTCMinutes();
    const currentMinutes = hour * 60 + minute;
    
    let openMinutes = session.open * 60;
    let closeMinutes = session.close * 60;
    
    if (closeMinutes < openMinutes) {
      closeMinutes += 24 * 60;
    }
    
    let adjustedCurrent = currentMinutes;
    if (currentMinutes < openMinutes && closeMinutes > 24 * 60) {
      adjustedCurrent += 24 * 60;
    }
    
    if (adjustedCurrent < openMinutes || adjustedCurrent >= closeMinutes) {
      return 0;
    }
    
    const progress = ((adjustedCurrent - openMinutes) / (closeMinutes - openMinutes)) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };

  const getActiveOverlap = () => {
    const hour = currentTime.getUTCHours();
    if (hour >= 12 && hour < 16) return "London/NY Overlap";
    if (hour >= 7 && hour < 8) return "Tokyo/London Overlap";
    if (hour >= 23 || hour < 6) return "Sydney/Tokyo Overlap";
    return "No Major Overlap";
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold" data-testid="heading-trading-sessions">Trading Sessions</h1>
            <p className="text-muted-foreground">Monitor global market hours and liquidity</p>
          </div>
          <Globe className="w-8 h-8 text-muted-foreground" />
        </div>

        {/* Quick Stats */}
        <div className="grid sm:grid-cols-4 gap-4">
          <Card data-testid="card-stat-peak-hours">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-1">4 hrs</div>
              <p className="text-sm text-muted-foreground">Peak Overlap Time</p>
            </CardContent>
          </Card>
          <Card data-testid="card-stat-daily-volume">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-1">70%</div>
              <p className="text-sm text-muted-foreground">Volume in London/NY Overlap</p>
            </CardContent>
          </Card>
          <Card data-testid="card-stat-active-overlap">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary mb-1">{getActiveOverlap()}</div>
              <p className="text-sm text-muted-foreground">Currently Active</p>
            </CardContent>
          </Card>
          <Card data-testid="card-stat-sessions">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-1">24/5</div>
              <p className="text-sm text-muted-foreground">Market Open (Mon-Fri)</p>
            </CardContent>
          </Card>
        </div>

        {/* Current Time */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Current Time (UTC)</CardTitle>
                <CardDescription>All times displayed in UTC timezone</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-muted-foreground" />
                <span className="text-2xl font-mono font-bold" data-testid="text-utc-time">
                  {currentTime.toUTCString().split(' ')[4]}
                </span>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Live Sessions */}
        <div className="grid gap-4">
          {sessions.map((session) => {
            const isOpen = isSessionOpen(session);
            const progress = getSessionProgress(session);
            
            return (
              <Card key={session.name} data-testid={`card-session-${session.name.toLowerCase()}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${session.color} ${isOpen ? 'animate-pulse' : 'opacity-30'}`} />
                      <div>
                        <CardTitle>{session.name}</CardTitle>
                        <CardDescription>
                          {String(session.open).padStart(2, '0')}:00 - {String(session.close).padStart(2, '0')}:00 UTC
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right text-sm">
                        <p className="font-medium">{session.avgDaily}</p>
                        <p className="text-muted-foreground">{session.volatility} Volatility</p>
                      </div>
                      <Badge variant={isOpen ? "default" : "secondary"} data-testid={`badge-status-${session.name.toLowerCase()}`}>
                        {isOpen ? "OPEN" : "CLOSED"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    {session.pairs.map(pair => (
                      <Badge key={pair} variant="outline" className="text-xs">{pair}</Badge>
                    ))}
                  </div>
                </CardHeader>
                {isOpen && (
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Session Progress</span>
                        <span className="font-semibold">{progress.toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${session.color} transition-all duration-1000`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>

        {/* Session Strategies */}
        <Card data-testid="card-session-strategies">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <CardTitle>Trading Strategies by Session</CardTitle>
            </div>
            <CardDescription>Optimize your strategy based on market hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {sessionStrategies.map((strategy, index) => (
                <div key={index} className="border-l-4 border-primary pl-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{strategy.session}</h3>
                      <p className="text-sm text-muted-foreground">{strategy.timeUTC}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm"><strong>Characteristics:</strong> {strategy.characteristics}</p>
                    </div>
                    <div className="flex gap-2">
                      <p className="text-sm font-medium">Best Pairs:</p>
                      {strategy.bestPairs.map(pair => (
                        <Badge key={pair} variant="outline" className="text-xs">{pair}</Badge>
                      ))}
                    </div>
                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                      <p className="text-sm font-medium mb-2">Trading Strategies:</p>
                      <p className="text-sm text-muted-foreground whitespace-pre-line">{strategy.strategies}</p>
                    </div>
                    <Alert>
                      <AlertDescription className="text-sm">
                        <strong>⚠️ Avoid:</strong> {strategy.avoid}
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Overlap Information */}
        <Card data-testid="card-session-overlaps">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              <CardTitle>Session Overlap Trading Guide</CardTitle>
            </div>
            <CardDescription>Maximize profits during high-liquidity overlaps</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {overlapGuides.map((guide, index) => (
                <div key={index} className="p-4 bg-muted rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold mb-1">{guide.overlap}</h3>
                      <p className="text-sm text-muted-foreground">{guide.time}</p>
                    </div>
                    <Badge variant="outline">{guide.volume}</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p><strong>Best Pairs:</strong> {guide.bestFor}</p>
                    <div className="p-3 bg-background rounded border">
                      <p><strong className="text-primary">Trading Tip:</strong> {guide.tradingTip}</p>
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
              <Zap className="w-5 h-5 text-amber-500" />
              <CardTitle>Professional Tips & Best Practices</CardTitle>
            </div>
            <CardDescription>Master session-based trading with expert insights</CardDescription>
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

        {/* Export Features */}
        <Card data-testid="card-export-functionality">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Download className="w-5 h-5 text-primary" />
              <CardTitle>Session Tools & Alerts</CardTitle>
            </div>
            <CardDescription>Never miss optimal trading hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">⏰ Session Alerts</h3>
                <p className="text-sm text-muted-foreground mb-3">Get notified 15min before London open, NY open, and major overlaps start</p>
                <Button variant="outline" size="sm" data-testid="button-setup-alerts">Setup Alerts</Button>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">📅 Export Schedule</h3>
                <p className="text-sm text-muted-foreground mb-3">Download session times in your local timezone as iCal/Google Calendar file</p>
                <Button variant="outline" size="sm" data-testid="button-export-calendar">Export Calendar</Button>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">🌍 Timezone Converter</h3>
                <p className="text-sm text-muted-foreground mb-3">Convert UTC session times to your local timezone for easy reference</p>
                <Button variant="outline" size="sm" data-testid="button-convert-timezone">Convert Times</Button>
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
            <CardDescription>Everything you need to know about trading sessions</CardDescription>
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
