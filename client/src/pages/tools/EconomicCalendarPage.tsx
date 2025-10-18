import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, TrendingUp, TrendingDown, Minus, HelpCircle, BookOpen, Target, AlertTriangle, Zap, Activity } from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useLanguage } from "@/hooks/useLanguage";

interface EconomicEvent {
  id: string;
  datetime: string;
  country: string;
  currency: string;
  event: string;
  impact: string;
  forecast: string | null;
  previous: string | null;
  actual: string | null;
}

export default function EconomicCalendarPage() {
  const { t } = useLanguage();
  const [currencyFilter, setCurrencyFilter] = useState("all");
  const [impactFilter, setImpactFilter] = useState("all");

  // Fetch all events (without filters) for stats calculation
  const { data: allEvents = [] } = useQuery<EconomicEvent[]>({
    queryKey: ['/api/economic-calendar'],
    queryFn: async () => {
      const res = await fetch('/api/economic-calendar', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      if (!res.ok) throw new Error(t('tools.economicCalendar.errors.fetchFailed'));
      return res.json();
    },
    refetchInterval: 1000 * 60 * 30,
  });

  // Fetch filtered events for display
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
      
      if (!res.ok) throw new Error(t('tools.economicCalendar.errors.fetchFailed'));
      return res.json();
    },
    refetchInterval: 1000 * 60 * 30,
  });

  // Calculate stats from all events
  const stats = {
    highImpactToday: allEvents.filter(e => {
      const eventDate = new Date(e.datetime);
      const today = new Date();
      return e.impact === 'high' && 
             eventDate.toDateString() === today.toDateString();
    }).length,
    uniqueCurrencies: new Set(allEvents.map(e => e.currency)).size,
    upcomingIn24h: allEvents.filter(e => {
      const eventDate = new Date(e.datetime);
      const now = new Date();
      const in24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      return eventDate >= now && eventDate <= in24h;
    }).length,
    totalEvents: allEvents.length
  };

  const keyIndicators = [
    {
      name: t('tools.economicCalendar.keyIndicators.nfp.name'),
      icon: TrendingUp,
      currency: t('tools.economicCalendar.keyIndicators.nfp.currency'),
      impact: t('tools.economicCalendar.keyIndicators.nfp.impact'),
      description: t('tools.economicCalendar.keyIndicators.nfp.description'),
      interpretation: t('tools.economicCalendar.keyIndicators.nfp.interpretation'),
      tradingTips: t('tools.economicCalendar.keyIndicators.nfp.tradingTips')
    },
    {
      name: t('tools.economicCalendar.keyIndicators.interestRate.name'),
      icon: Target,
      currency: t('tools.economicCalendar.keyIndicators.interestRate.currency'),
      impact: t('tools.economicCalendar.keyIndicators.interestRate.impact'),
      description: t('tools.economicCalendar.keyIndicators.interestRate.description'),
      interpretation: t('tools.economicCalendar.keyIndicators.interestRate.interpretation'),
      tradingTips: t('tools.economicCalendar.keyIndicators.interestRate.tradingTips')
    },
    {
      name: t('tools.economicCalendar.keyIndicators.gdp.name'),
      icon: Activity,
      currency: t('tools.economicCalendar.keyIndicators.gdp.currency'),
      impact: t('tools.economicCalendar.keyIndicators.gdp.impact'),
      description: t('tools.economicCalendar.keyIndicators.gdp.description'),
      interpretation: t('tools.economicCalendar.keyIndicators.gdp.interpretation'),
      tradingTips: t('tools.economicCalendar.keyIndicators.gdp.tradingTips')
    },
    {
      name: t('tools.economicCalendar.keyIndicators.cpi.name'),
      icon: TrendingUp,
      currency: t('tools.economicCalendar.keyIndicators.cpi.currency'),
      impact: t('tools.economicCalendar.keyIndicators.cpi.impact'),
      description: t('tools.economicCalendar.keyIndicators.cpi.description'),
      interpretation: t('tools.economicCalendar.keyIndicators.cpi.interpretation'),
      tradingTips: t('tools.economicCalendar.keyIndicators.cpi.tradingTips')
    }
  ];

  const eventCategories = [
    {
      category: t('tools.economicCalendar.categories.employment.name'),
      events: [
        t('tools.economicCalendar.categories.employment.event1'),
        t('tools.economicCalendar.categories.employment.event2'),
        t('tools.economicCalendar.categories.employment.event3')
      ],
      importance: t('tools.economicCalendar.categories.employment.importance'),
      frequency: t('tools.economicCalendar.categories.employment.frequency'),
      tradingStrategy: t('tools.economicCalendar.categories.employment.strategy')
    },
    {
      category: t('tools.economicCalendar.categories.inflation.name'),
      events: [
        t('tools.economicCalendar.categories.inflation.event1'),
        t('tools.economicCalendar.categories.inflation.event2'),
        t('tools.economicCalendar.categories.inflation.event3')
      ],
      importance: t('tools.economicCalendar.categories.inflation.importance'),
      frequency: t('tools.economicCalendar.categories.inflation.frequency'),
      tradingStrategy: t('tools.economicCalendar.categories.inflation.strategy')
    },
    {
      category: t('tools.economicCalendar.categories.centralBank.name'),
      events: [
        t('tools.economicCalendar.categories.centralBank.event1'),
        t('tools.economicCalendar.categories.centralBank.event2'),
        t('tools.economicCalendar.categories.centralBank.event3')
      ],
      importance: t('tools.economicCalendar.categories.centralBank.importance'),
      frequency: t('tools.economicCalendar.categories.centralBank.frequency'),
      tradingStrategy: t('tools.economicCalendar.categories.centralBank.strategy')
    },
    {
      category: t('tools.economicCalendar.categories.growth.name'),
      events: [
        t('tools.economicCalendar.categories.growth.event1'),
        t('tools.economicCalendar.categories.growth.event2'),
        t('tools.economicCalendar.categories.growth.event3')
      ],
      importance: t('tools.economicCalendar.categories.growth.importance'),
      frequency: t('tools.economicCalendar.categories.growth.frequency'),
      tradingStrategy: t('tools.economicCalendar.categories.growth.strategy')
    }
  ];

  const interpretationExamples = [
    {
      scenario: t('tools.economicCalendar.examples.nfp.scenario'),
      interpretation: t('tools.economicCalendar.examples.nfp.interpretation'),
      expectedMove: t('tools.economicCalendar.examples.nfp.expectedMove'),
      tradingAction: t('tools.economicCalendar.examples.nfp.tradingAction')
    },
    {
      scenario: t('tools.economicCalendar.examples.ecb.scenario'),
      interpretation: t('tools.economicCalendar.examples.ecb.interpretation'),
      expectedMove: t('tools.economicCalendar.examples.ecb.expectedMove'),
      tradingAction: t('tools.economicCalendar.examples.ecb.tradingAction')
    },
    {
      scenario: t('tools.economicCalendar.examples.ukGdp.scenario'),
      interpretation: t('tools.economicCalendar.examples.ukGdp.interpretation'),
      expectedMove: t('tools.economicCalendar.examples.ukGdp.expectedMove'),
      tradingAction: t('tools.economicCalendar.examples.ukGdp.tradingAction')
    },
    {
      scenario: t('tools.economicCalendar.examples.usCpi.scenario'),
      interpretation: t('tools.economicCalendar.examples.usCpi.interpretation'),
      expectedMove: t('tools.economicCalendar.examples.usCpi.expectedMove'),
      tradingAction: t('tools.economicCalendar.examples.usCpi.tradingAction')
    }
  ];

  const proTips = [
    {
      tip: t('tools.economicCalendar.proTips.beatMiss.tip'),
      detail: t('tools.economicCalendar.proTips.beatMiss.detail')
    },
    {
      tip: t('tools.economicCalendar.proTips.highImpact.tip'),
      detail: t('tools.economicCalendar.proTips.highImpact.detail')
    },
    {
      tip: t('tools.economicCalendar.proTips.weekPlanning.tip'),
      detail: t('tools.economicCalendar.proTips.weekPlanning.detail')
    },
    {
      tip: t('tools.economicCalendar.proTips.currencySpecific.tip'),
      detail: t('tools.economicCalendar.proTips.currencySpecific.detail')
    },
    {
      tip: t('tools.economicCalendar.proTips.technical.tip'),
      detail: t('tools.economicCalendar.proTips.technical.detail')
    },
    {
      tip: t('tools.economicCalendar.proTips.reaction.tip'),
      detail: t('tools.economicCalendar.proTips.reaction.detail')
    }
  ];

  const faqs = [
    {
      question: t('tools.economicCalendar.faq.q1.question'),
      answer: t('tools.economicCalendar.faq.q1.answer')
    },
    {
      question: t('tools.economicCalendar.faq.q2.question'),
      answer: t('tools.economicCalendar.faq.q2.answer')
    },
    {
      question: t('tools.economicCalendar.faq.q3.question'),
      answer: t('tools.economicCalendar.faq.q3.answer')
    },
    {
      question: t('tools.economicCalendar.faq.q4.question'),
      answer: t('tools.economicCalendar.faq.q4.answer')
    },
    {
      question: t('tools.economicCalendar.faq.q5.question'),
      answer: t('tools.economicCalendar.faq.q5.answer')
    },
    {
      question: t('tools.economicCalendar.faq.q6.question'),
      answer: t('tools.economicCalendar.faq.q6.answer')
    },
    {
      question: t('tools.economicCalendar.faq.q7.question'),
      answer: t('tools.economicCalendar.faq.q7.answer')
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
            <h1 className="text-3xl font-bold" data-testid="heading-economic-calendar">{t('tools.economicCalendar.title')}</h1>
            <p className="text-muted-foreground">{t('tools.economicCalendar.description')}</p>
          </div>
          <Calendar className="w-8 h-8 text-muted-foreground" />
        </div>

        {/* Quick Stats */}
        <div className="grid sm:grid-cols-4 gap-4">
          <Card data-testid="card-stat-high-impact">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-destructive mb-1">{stats.highImpactToday}</div>
              <p className="text-sm text-muted-foreground">{t('tools.economicCalendar.stats.highImpact')}</p>
            </CardContent>
          </Card>
          <Card data-testid="card-stat-currencies">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-1">{stats.uniqueCurrencies}</div>
              <p className="text-sm text-muted-foreground">{t('tools.economicCalendar.stats.currencies')}</p>
            </CardContent>
          </Card>
          <Card data-testid="card-stat-upcoming">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-1">{stats.upcomingIn24h}</div>
              <p className="text-sm text-muted-foreground">{t('tools.economicCalendar.stats.upcoming')}</p>
            </CardContent>
          </Card>
          <Card data-testid="card-stat-total">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-1">{stats.totalEvents}</div>
              <p className="text-sm text-muted-foreground">{t('tools.economicCalendar.stats.total')}</p>
            </CardContent>
          </Card>
        </div>

        {/* Calendar Filter and Events */}
        <div className="flex gap-4 items-center">
          <Select value={currencyFilter} onValueChange={setCurrencyFilter}>
            <SelectTrigger className="w-[150px]" data-testid="select-currency-filter">
              <SelectValue placeholder={t('tools.economicCalendar.filter.currency')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('tools.economicCalendar.filter.allCurrencies')}</SelectItem>
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
              <SelectValue placeholder={t('tools.economicCalendar.filter.impact')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('tools.economicCalendar.filter.allImpact')}</SelectItem>
              <SelectItem value="high">{t('tools.economicCalendar.filter.highImpact')}</SelectItem>
              <SelectItem value="medium">{t('tools.economicCalendar.filter.mediumImpact')}</SelectItem>
              <SelectItem value="low">{t('tools.economicCalendar.filter.lowImpact')}</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex gap-2 ml-auto">
            <Badge variant="destructive" className="gap-1" data-testid="badge-high-impact">
              <TrendingUp className="w-3 h-3" />
              {t('tools.economicCalendar.legend.high')}
            </Badge>
            <Badge variant="default" className="gap-1" data-testid="badge-medium-impact">
              <Minus className="w-3 h-3" />
              {t('tools.economicCalendar.legend.medium')}
            </Badge>
            <Badge variant="secondary" className="gap-1" data-testid="badge-low-impact">
              <TrendingDown className="w-3 h-3" />
              {t('tools.economicCalendar.legend.low')}
            </Badge>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t('tools.economicCalendar.events.title')}</CardTitle>
            <CardDescription>
              {isLoading ? t('tools.economicCalendar.events.loading') : t('tools.economicCalendar.events.showing', {
                count: events.length,
                eventText: events.length === 1 ? t('tools.economicCalendar.events.event') : t('tools.economicCalendar.events.events')
              })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-muted-foreground">{t('tools.economicCalendar.events.loadingCalendar')}</div>
              </div>
            ) : events.length === 0 ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-muted-foreground">{t('tools.economicCalendar.events.noEventsFilters')}</div>
              </div>
            ) : (
              <div className="space-y-3">
                {events.map((event, index) => (
                  <div 
                    key={event.id || index} 
                    className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 p-4 rounded-lg border hover-elevate"
                    data-testid={`event-${index}`}
                  >
                    <div className="flex items-center gap-2 min-w-[120px]">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="font-mono font-semibold text-sm">
                        {format(new Date(event.datetime), 'MMM dd HH:mm')}
                      </span>
                    </div>
                    
                    <Badge variant="outline" className="font-mono w-fit min-w-[50px] justify-center">
                      {event.currency}
                    </Badge>
                    
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold break-words">{event.event}</p>
                      <p className="text-xs text-muted-foreground">{event.country}</p>
                    </div>
                    
                    <Badge variant={getImpactColor(event.impact || 'low')} className="gap-1 w-fit min-w-[100px] justify-center">
                      {getImpactIcon(event.impact || 'low')}
                      {event.impact || 'low'}
                    </Badge>
                    
                    <div className="grid grid-cols-3 gap-2 md:gap-4 w-full md:w-auto md:min-w-[300px] text-sm">
                      <div>
                        <p className="text-muted-foreground text-xs">{t('tools.economicCalendar.table.forecast')}</p>
                        <p className="font-semibold truncate">{event.forecast || "-"}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">{t('tools.economicCalendar.table.previous')}</p>
                        <p className="font-semibold truncate">{event.previous || "-"}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">{t('tools.economicCalendar.table.actual')}</p>
                        <p className="font-semibold truncate">{event.actual || "-"}</p>
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
              <CardTitle>{t('tools.economicCalendar.keyIndicators.title')}</CardTitle>
            </div>
            <CardDescription>{t('tools.economicCalendar.keyIndicators.description')}</CardDescription>
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
                      <h4 className="font-semibold text-sm mb-2">{t('tools.economicCalendar.keyIndicators.howToInterpret')}</h4>
                      <p className="text-sm text-muted-foreground whitespace-pre-line">{indicator.interpretation}</p>
                    </div>
                    <div className="mt-2 p-3 border border-primary/20 rounded-lg bg-primary/5">
                      <p className="text-sm"><strong className="text-primary">{t('tools.economicCalendar.keyIndicators.tradingTip')}</strong> {indicator.tradingTips}</p>
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
              <CardTitle>{t('tools.economicCalendar.categories.title')}</CardTitle>
            </div>
            <CardDescription>{t('tools.economicCalendar.categories.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {eventCategories.map((category, index) => (
                <div key={index} className="p-4 border rounded-lg hover-elevate" data-testid={`category-${index}`}>
                  <h3 className="font-semibold text-lg mb-2">{category.category}</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">{t('tools.economicCalendar.categories.keyEvents')}</p>
                      <div className="flex flex-wrap gap-1">
                        {category.events.map((event, i) => (
                          <Badge key={i} variant="outline" className="text-xs">{event}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-medium mb-1">{t('tools.economicCalendar.categories.importance')} <span className="text-primary">{category.importance}</span></p>
                      <p className="text-xs text-muted-foreground">{t('tools.economicCalendar.categories.frequency')} {category.frequency}</p>
                    </div>
                    <Alert>
                      <AlertDescription className="text-sm">
                        <strong>{t('tools.economicCalendar.categories.strategy')}</strong> {category.tradingStrategy}
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
              <CardTitle>{t('tools.economicCalendar.examples.title')}</CardTitle>
            </div>
            <CardDescription>{t('tools.economicCalendar.examples.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {interpretationExamples.map((example, index) => (
                <div key={index} className="p-4 bg-muted rounded-lg" data-testid={`example-${index}`}>
                  <h3 className="font-semibold mb-2 text-primary">{example.scenario}</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>{t('tools.economicCalendar.examples.interpretation')}</strong> {example.interpretation}</p>
                    <p className="text-muted-foreground"><strong>{t('tools.economicCalendar.examples.expectedMove')}</strong> {example.expectedMove}</p>
                    <div className="p-3 bg-background rounded border border-primary/20 mt-3">
                      <p><strong className="text-primary">{t('tools.economicCalendar.examples.tradingAction')}</strong> {example.tradingAction}</p>
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
              <CardTitle>{t('tools.economicCalendar.proTips.title')}</CardTitle>
            </div>
            <CardDescription>{t('tools.economicCalendar.proTips.description')}</CardDescription>
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

        {/* FAQ Section */}
        <Card data-testid="card-faq">
          <CardHeader>
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-primary" />
              <CardTitle>{t('tools.economicCalendar.faq.title')}</CardTitle>
            </div>
            <CardDescription>{t('tools.economicCalendar.faq.description')}</CardDescription>
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
