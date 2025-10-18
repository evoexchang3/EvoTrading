import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Clock, HelpCircle, BookOpen, Target, AlertTriangle, Zap, Download } from "lucide-react";
import { useState, useEffect } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLanguage } from "@/hooks/useLanguage";

export default function TradingSessionsPage() {
  const { t } = useLanguage();
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
      volatility: t('tools.tradingSessions.volatility.low')
    },
    {
      name: "Tokyo",
      timezone: "Asia/Tokyo",
      open: 23,
      close: 8,
      color: "bg-red-500",
      pairs: ["USD/JPY", "EUR/JPY", "GBP/JPY"],
      avgDaily: "70-100 pips",
      volatility: t('tools.tradingSessions.volatility.medium')
    },
    {
      name: "London",
      timezone: "Europe/London",
      open: 7,
      close: 16,
      color: "bg-green-500",
      pairs: ["EUR/USD", "GBP/USD", "EUR/GBP"],
      avgDaily: "100-150 pips",
      volatility: t('tools.tradingSessions.volatility.high')
    },
    {
      name: "New York",
      timezone: "America/New_York",
      open: 12,
      close: 21,
      color: "bg-yellow-500",
      pairs: ["EUR/USD", "GBP/USD", "USD/CAD"],
      avgDaily: "80-120 pips",
      volatility: t('tools.tradingSessions.volatility.high')
    }
  ];

  const sessionStrategies = [
    {
      session: t('tools.tradingSessions.strategies.asian.session'),
      timeUTC: t('tools.tradingSessions.strategies.asian.timeUTC'),
      characteristics: t('tools.tradingSessions.strategies.asian.characteristics'),
      bestPairs: ["AUD/USD", "AUD/JPY", "NZD/USD", "USD/JPY"],
      strategies: t('tools.tradingSessions.strategies.asian.strategies'),
      avoid: t('tools.tradingSessions.strategies.asian.avoid')
    },
    {
      session: t('tools.tradingSessions.strategies.london.session'),
      timeUTC: t('tools.tradingSessions.strategies.london.timeUTC'),
      characteristics: t('tools.tradingSessions.strategies.london.characteristics'),
      bestPairs: ["EUR/USD", "GBP/USD", "EUR/GBP", "GBP/JPY"],
      strategies: t('tools.tradingSessions.strategies.london.strategies'),
      avoid: t('tools.tradingSessions.strategies.london.avoid')
    },
    {
      session: t('tools.tradingSessions.strategies.londonNy.session'),
      timeUTC: t('tools.tradingSessions.strategies.londonNy.timeUTC'),
      characteristics: t('tools.tradingSessions.strategies.londonNy.characteristics'),
      bestPairs: ["EUR/USD", "GBP/USD", "USD/JPY", "USD/CHF"],
      strategies: t('tools.tradingSessions.strategies.londonNy.strategies'),
      avoid: t('tools.tradingSessions.strategies.londonNy.avoid')
    },
    {
      session: t('tools.tradingSessions.strategies.nyAfternoon.session'),
      timeUTC: t('tools.tradingSessions.strategies.nyAfternoon.timeUTC'),
      characteristics: t('tools.tradingSessions.strategies.nyAfternoon.characteristics'),
      bestPairs: ["USD/CAD", "EUR/USD", "GBP/USD"],
      strategies: t('tools.tradingSessions.strategies.nyAfternoon.strategies'),
      avoid: t('tools.tradingSessions.strategies.nyAfternoon.avoid')
    }
  ];

  const overlapGuides = [
    {
      overlap: t('tools.tradingSessions.overlaps.tokyoLondon.overlap'),
      time: t('tools.tradingSessions.overlaps.tokyoLondon.time'),
      volume: t('tools.tradingSessions.overlaps.tokyoLondon.volume'),
      bestFor: t('tools.tradingSessions.overlaps.tokyoLondon.bestFor'),
      tradingTip: t('tools.tradingSessions.overlaps.tokyoLondon.tradingTip')
    },
    {
      overlap: t('tools.tradingSessions.overlaps.londonNy.overlap'),
      time: t('tools.tradingSessions.overlaps.londonNy.time'),
      volume: t('tools.tradingSessions.overlaps.londonNy.volume'),
      bestFor: t('tools.tradingSessions.overlaps.londonNy.bestFor'),
      tradingTip: t('tools.tradingSessions.overlaps.londonNy.tradingTip')
    },
    {
      overlap: t('tools.tradingSessions.overlaps.sydneyTokyo.overlap'),
      time: t('tools.tradingSessions.overlaps.sydneyTokyo.time'),
      volume: t('tools.tradingSessions.overlaps.sydneyTokyo.volume'),
      bestFor: t('tools.tradingSessions.overlaps.sydneyTokyo.bestFor'),
      tradingTip: t('tools.tradingSessions.overlaps.sydneyTokyo.tradingTip')
    }
  ];

  const proTips = [
    {
      tip: t('tools.tradingSessions.proTips.tip1.tip'),
      detail: t('tools.tradingSessions.proTips.tip1.detail')
    },
    {
      tip: t('tools.tradingSessions.proTips.tip2.tip'),
      detail: t('tools.tradingSessions.proTips.tip2.detail')
    },
    {
      tip: t('tools.tradingSessions.proTips.tip3.tip'),
      detail: t('tools.tradingSessions.proTips.tip3.detail')
    },
    {
      tip: t('tools.tradingSessions.proTips.tip4.tip'),
      detail: t('tools.tradingSessions.proTips.tip4.detail')
    },
    {
      tip: t('tools.tradingSessions.proTips.tip5.tip'),
      detail: t('tools.tradingSessions.proTips.tip5.detail')
    },
    {
      tip: t('tools.tradingSessions.proTips.tip6.tip'),
      detail: t('tools.tradingSessions.proTips.tip6.detail')
    }
  ];

  const faqs = [
    {
      question: t('tools.tradingSessions.faq.q1.question'),
      answer: t('tools.tradingSessions.faq.q1.answer')
    },
    {
      question: t('tools.tradingSessions.faq.q2.question'),
      answer: t('tools.tradingSessions.faq.q2.answer')
    },
    {
      question: t('tools.tradingSessions.faq.q3.question'),
      answer: t('tools.tradingSessions.faq.q3.answer')
    },
    {
      question: t('tools.tradingSessions.faq.q4.question'),
      answer: t('tools.tradingSessions.faq.q4.answer')
    },
    {
      question: t('tools.tradingSessions.faq.q5.question'),
      answer: t('tools.tradingSessions.faq.q5.answer')
    },
    {
      question: t('tools.tradingSessions.faq.q6.question'),
      answer: t('tools.tradingSessions.faq.q6.answer')
    },
    {
      question: t('tools.tradingSessions.faq.q7.question'),
      answer: t('tools.tradingSessions.faq.q7.answer')
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
    if (hour >= 12 && hour < 16) return t('tools.tradingSessions.overlap.londonNy');
    if (hour >= 7 && hour < 8) return t('tools.tradingSessions.overlap.tokyoLondon');
    if (hour >= 23 || hour < 6) return t('tools.tradingSessions.overlap.sydneyTokyo');
    return t('tools.tradingSessions.overlap.none');
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold" data-testid="heading-trading-sessions">{t('tools.tradingSessions.title')}</h1>
            <p className="text-muted-foreground">{t('tools.tradingSessions.description')}</p>
          </div>
          <Globe className="w-8 h-8 text-muted-foreground" />
        </div>

        {/* Quick Stats */}
        <div className="grid sm:grid-cols-4 gap-4">
          <Card data-testid="card-stat-peak-hours">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-1">{t('tools.tradingSessions.stats.peakHours')}</div>
              <p className="text-sm text-muted-foreground">{t('tools.tradingSessions.stats.peakHoursDescription')}</p>
            </CardContent>
          </Card>
          <Card data-testid="card-stat-daily-volume">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-1">{t('tools.tradingSessions.stats.volume')}</div>
              <p className="text-sm text-muted-foreground">{t('tools.tradingSessions.stats.volumeDescription')}</p>
            </CardContent>
          </Card>
          <Card data-testid="card-stat-active-overlap">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary mb-1">{getActiveOverlap()}</div>
              <p className="text-sm text-muted-foreground">{t('tools.tradingSessions.stats.currentlyActive')}</p>
            </CardContent>
          </Card>
          <Card data-testid="card-stat-sessions">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-1">{t('tools.tradingSessions.stats.marketOpen')}</div>
              <p className="text-sm text-muted-foreground">{t('tools.tradingSessions.stats.marketOpenDescription')}</p>
            </CardContent>
          </Card>
        </div>

        {/* Current Time */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{t('tools.tradingSessions.currentTime.title')}</CardTitle>
                <CardDescription>{t('tools.tradingSessions.currentTime.description')}</CardDescription>
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
                        {isOpen ? t('tools.tradingSessions.session.open') : t('tools.tradingSessions.session.closed')}
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
                        <span className="text-muted-foreground">{t('tools.tradingSessions.session.progress')}</span>
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
              <CardTitle>{t('tools.tradingSessions.strategies.title')}</CardTitle>
            </div>
            <CardDescription>{t('tools.tradingSessions.strategies.description')}</CardDescription>
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
                      <p className="text-sm"><strong>{t('tools.tradingSessions.strategies.characteristics')}</strong> {strategy.characteristics}</p>
                    </div>
                    <div className="flex gap-2">
                      <p className="text-sm font-medium">{t('tools.tradingSessions.strategies.bestPairs')}</p>
                      {strategy.bestPairs.map(pair => (
                        <Badge key={pair} variant="outline" className="text-xs">{pair}</Badge>
                      ))}
                    </div>
                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                      <p className="text-sm font-medium mb-2">{t('tools.tradingSessions.strategies.tradingStrategies')}</p>
                      <p className="text-sm text-muted-foreground whitespace-pre-line">{strategy.strategies}</p>
                    </div>
                    <Alert>
                      <AlertDescription className="text-sm">
                        <strong>{t('tools.tradingSessions.strategies.avoid')}</strong> {strategy.avoid}
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
              <CardTitle>{t('tools.tradingSessions.overlaps.title')}</CardTitle>
            </div>
            <CardDescription>{t('tools.tradingSessions.overlaps.description')}</CardDescription>
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
                    <p><strong>{t('tools.tradingSessions.overlaps.bestPairs')}</strong> {guide.bestFor}</p>
                    <div className="p-3 bg-background rounded border">
                      <p><strong className="text-primary">{t('tools.tradingSessions.overlaps.tradingTip')}</strong> {guide.tradingTip}</p>
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
              <CardTitle>{t('tools.tradingSessions.proTips.title')}</CardTitle>
            </div>
            <CardDescription>{t('tools.tradingSessions.proTips.description')}</CardDescription>
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
              <CardTitle>{t('tools.tradingSessions.export.title')}</CardTitle>
            </div>
            <CardDescription>{t('tools.tradingSessions.export.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">{t('tools.tradingSessions.export.alerts.title')}</h3>
                <p className="text-sm text-muted-foreground mb-3">{t('tools.tradingSessions.export.alerts.description')}</p>
                <Button variant="outline" size="sm" data-testid="button-setup-alerts">{t('tools.tradingSessions.export.alerts.button')}</Button>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">{t('tools.tradingSessions.export.schedule.title')}</h3>
                <p className="text-sm text-muted-foreground mb-3">{t('tools.tradingSessions.export.schedule.description')}</p>
                <Button variant="outline" size="sm" data-testid="button-export-calendar">{t('tools.tradingSessions.export.schedule.button')}</Button>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">{t('tools.tradingSessions.export.timezone.title')}</h3>
                <p className="text-sm text-muted-foreground mb-3">{t('tools.tradingSessions.export.timezone.description')}</p>
                <Button variant="outline" size="sm" data-testid="button-convert-timezone">{t('tools.tradingSessions.export.timezone.button')}</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card data-testid="card-faq">
          <CardHeader>
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-primary" />
              <CardTitle>{t('tools.tradingSessions.faq.title')}</CardTitle>
            </div>
            <CardDescription>{t('tools.tradingSessions.faq.description')}</CardDescription>
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
