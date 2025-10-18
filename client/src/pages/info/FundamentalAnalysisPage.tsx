import { LandingLayout } from "@/components/LandingLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, TrendingUp, Globe, DollarSign, HelpCircle, ArrowRight, BookOpen, Calendar, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLanguage } from "@/hooks/useLanguage";

export default function FundamentalAnalysisPage() {
  const { t } = useLanguage();

  const factors = [
    {
      title: t('marketInfo.fundamentalAnalysis.factors.economicIndicators.title'),
      icon: TrendingUp,
      description: t('marketInfo.fundamentalAnalysis.factors.economicIndicators.description'),
      indicators: [
        {
          name: t('marketInfo.fundamentalAnalysis.factors.economicIndicators.interestRates.name'),
          impact: t('marketInfo.fundamentalAnalysis.factors.economicIndicators.interestRates.impact'),
          frequency: t('marketInfo.fundamentalAnalysis.factors.economicIndicators.interestRates.frequency'),
          importance: t('marketInfo.fundamentalAnalysis.factors.economicIndicators.interestRates.importance')
        },
        {
          name: t('marketInfo.fundamentalAnalysis.factors.economicIndicators.gdp.name'),
          impact: t('marketInfo.fundamentalAnalysis.factors.economicIndicators.gdp.impact'),
          frequency: t('marketInfo.fundamentalAnalysis.factors.economicIndicators.gdp.frequency'),
          importance: t('marketInfo.fundamentalAnalysis.factors.economicIndicators.gdp.importance')
        },
        {
          name: t('marketInfo.fundamentalAnalysis.factors.economicIndicators.employment.name'),
          impact: t('marketInfo.fundamentalAnalysis.factors.economicIndicators.employment.impact'),
          frequency: t('marketInfo.fundamentalAnalysis.factors.economicIndicators.employment.frequency'),
          importance: t('marketInfo.fundamentalAnalysis.factors.economicIndicators.employment.importance')
        },
        {
          name: t('marketInfo.fundamentalAnalysis.factors.economicIndicators.inflation.name'),
          impact: t('marketInfo.fundamentalAnalysis.factors.economicIndicators.inflation.impact'),
          frequency: t('marketInfo.fundamentalAnalysis.factors.economicIndicators.inflation.frequency'),
          importance: t('marketInfo.fundamentalAnalysis.factors.economicIndicators.inflation.importance')
        },
        {
          name: t('marketInfo.fundamentalAnalysis.factors.economicIndicators.tradeBalance.name'),
          impact: t('marketInfo.fundamentalAnalysis.factors.economicIndicators.tradeBalance.impact'),
          frequency: t('marketInfo.fundamentalAnalysis.factors.economicIndicators.tradeBalance.frequency'),
          importance: t('marketInfo.fundamentalAnalysis.factors.economicIndicators.tradeBalance.importance')
        },
        {
          name: t('marketInfo.fundamentalAnalysis.factors.economicIndicators.retailSales.name'),
          impact: t('marketInfo.fundamentalAnalysis.factors.economicIndicators.retailSales.impact'),
          frequency: t('marketInfo.fundamentalAnalysis.factors.economicIndicators.retailSales.frequency'),
          importance: t('marketInfo.fundamentalAnalysis.factors.economicIndicators.retailSales.importance')
        }
      ]
    },
    {
      title: t('marketInfo.fundamentalAnalysis.factors.centralBankPolicy.title'),
      icon: Building2,
      description: t('marketInfo.fundamentalAnalysis.factors.centralBankPolicy.description'),
      indicators: [
        {
          name: t('marketInfo.fundamentalAnalysis.factors.centralBankPolicy.rateDecisions.name'),
          impact: t('marketInfo.fundamentalAnalysis.factors.centralBankPolicy.rateDecisions.impact'),
          frequency: t('marketInfo.fundamentalAnalysis.factors.centralBankPolicy.rateDecisions.frequency'),
          importance: t('marketInfo.fundamentalAnalysis.factors.centralBankPolicy.rateDecisions.importance')
        },
        {
          name: t('marketInfo.fundamentalAnalysis.factors.centralBankPolicy.qe.name'),
          impact: t('marketInfo.fundamentalAnalysis.factors.centralBankPolicy.qe.impact'),
          frequency: t('marketInfo.fundamentalAnalysis.factors.centralBankPolicy.qe.frequency'),
          importance: t('marketInfo.fundamentalAnalysis.factors.centralBankPolicy.qe.importance')
        },
        {
          name: t('marketInfo.fundamentalAnalysis.factors.centralBankPolicy.forwardGuidance.name'),
          impact: t('marketInfo.fundamentalAnalysis.factors.centralBankPolicy.forwardGuidance.impact'),
          frequency: t('marketInfo.fundamentalAnalysis.factors.centralBankPolicy.forwardGuidance.frequency'),
          importance: t('marketInfo.fundamentalAnalysis.factors.centralBankPolicy.forwardGuidance.importance')
        },
        {
          name: t('marketInfo.fundamentalAnalysis.factors.centralBankPolicy.meetingMinutes.name'),
          impact: t('marketInfo.fundamentalAnalysis.factors.centralBankPolicy.meetingMinutes.impact'),
          frequency: t('marketInfo.fundamentalAnalysis.factors.centralBankPolicy.meetingMinutes.frequency'),
          importance: t('marketInfo.fundamentalAnalysis.factors.centralBankPolicy.meetingMinutes.importance')
        }
      ]
    },
    {
      title: t('marketInfo.fundamentalAnalysis.factors.geopoliticalEvents.title'),
      icon: Globe,
      description: t('marketInfo.fundamentalAnalysis.factors.geopoliticalEvents.description'),
      indicators: [
        {
          name: t('marketInfo.fundamentalAnalysis.factors.geopoliticalEvents.elections.name'),
          impact: t('marketInfo.fundamentalAnalysis.factors.geopoliticalEvents.elections.impact'),
          frequency: t('marketInfo.fundamentalAnalysis.factors.geopoliticalEvents.elections.frequency'),
          importance: t('marketInfo.fundamentalAnalysis.factors.geopoliticalEvents.elections.importance')
        },
        {
          name: t('marketInfo.fundamentalAnalysis.factors.geopoliticalEvents.trade.name'),
          impact: t('marketInfo.fundamentalAnalysis.factors.geopoliticalEvents.trade.impact'),
          frequency: t('marketInfo.fundamentalAnalysis.factors.geopoliticalEvents.trade.frequency'),
          importance: t('marketInfo.fundamentalAnalysis.factors.geopoliticalEvents.trade.importance')
        },
        {
          name: t('marketInfo.fundamentalAnalysis.factors.geopoliticalEvents.conflicts.name'),
          impact: t('marketInfo.fundamentalAnalysis.factors.geopoliticalEvents.conflicts.impact'),
          frequency: t('marketInfo.fundamentalAnalysis.factors.geopoliticalEvents.conflicts.frequency'),
          importance: t('marketInfo.fundamentalAnalysis.factors.geopoliticalEvents.conflicts.importance')
        },
        {
          name: t('marketInfo.fundamentalAnalysis.factors.geopoliticalEvents.brexit.name'),
          impact: t('marketInfo.fundamentalAnalysis.factors.geopoliticalEvents.brexit.impact'),
          frequency: t('marketInfo.fundamentalAnalysis.factors.geopoliticalEvents.brexit.frequency'),
          importance: t('marketInfo.fundamentalAnalysis.factors.geopoliticalEvents.brexit.importance')
        }
      ]
    },
    {
      title: t('marketInfo.fundamentalAnalysis.factors.marketSentiment.title'),
      icon: DollarSign,
      description: t('marketInfo.fundamentalAnalysis.factors.marketSentiment.description'),
      indicators: [
        {
          name: t('marketInfo.fundamentalAnalysis.factors.marketSentiment.riskOn.name'),
          impact: t('marketInfo.fundamentalAnalysis.factors.marketSentiment.riskOn.impact'),
          frequency: t('marketInfo.fundamentalAnalysis.factors.marketSentiment.riskOn.frequency'),
          importance: t('marketInfo.fundamentalAnalysis.factors.marketSentiment.riskOn.importance')
        },
        {
          name: t('marketInfo.fundamentalAnalysis.factors.marketSentiment.riskOff.name'),
          impact: t('marketInfo.fundamentalAnalysis.factors.marketSentiment.riskOff.impact'),
          frequency: t('marketInfo.fundamentalAnalysis.factors.marketSentiment.riskOff.frequency'),
          importance: t('marketInfo.fundamentalAnalysis.factors.marketSentiment.riskOff.importance')
        },
        {
          name: t('marketInfo.fundamentalAnalysis.factors.marketSentiment.commodityPrices.name'),
          impact: t('marketInfo.fundamentalAnalysis.factors.marketSentiment.commodityPrices.impact'),
          frequency: t('marketInfo.fundamentalAnalysis.factors.marketSentiment.commodityPrices.frequency'),
          importance: t('marketInfo.fundamentalAnalysis.factors.marketSentiment.commodityPrices.importance')
        },
        {
          name: t('marketInfo.fundamentalAnalysis.factors.marketSentiment.stockMarket.name'),
          impact: t('marketInfo.fundamentalAnalysis.factors.marketSentiment.stockMarket.impact'),
          frequency: t('marketInfo.fundamentalAnalysis.factors.marketSentiment.stockMarket.frequency'),
          importance: t('marketInfo.fundamentalAnalysis.factors.marketSentiment.stockMarket.importance')
        }
      ]
    }
  ];

  const economicCalendar = [
    {
      event: t('marketInfo.fundamentalAnalysis.economicCalendar.nfp.event'),
      country: t('marketInfo.fundamentalAnalysis.economicCalendar.nfp.country'),
      impact: t('marketInfo.fundamentalAnalysis.economicCalendar.nfp.impact'),
      typical: t('marketInfo.fundamentalAnalysis.economicCalendar.nfp.typical'),
      tradingTip: t('marketInfo.fundamentalAnalysis.economicCalendar.nfp.tradingTip')
    },
    {
      event: t('marketInfo.fundamentalAnalysis.economicCalendar.fed.event'),
      country: t('marketInfo.fundamentalAnalysis.economicCalendar.fed.country'),
      impact: t('marketInfo.fundamentalAnalysis.economicCalendar.fed.impact'),
      typical: t('marketInfo.fundamentalAnalysis.economicCalendar.fed.typical'),
      tradingTip: t('marketInfo.fundamentalAnalysis.economicCalendar.fed.tradingTip')
    },
    {
      event: t('marketInfo.fundamentalAnalysis.economicCalendar.ecb.event'),
      country: t('marketInfo.fundamentalAnalysis.economicCalendar.ecb.country'),
      impact: t('marketInfo.fundamentalAnalysis.economicCalendar.ecb.impact'),
      typical: t('marketInfo.fundamentalAnalysis.economicCalendar.ecb.typical'),
      tradingTip: t('marketInfo.fundamentalAnalysis.economicCalendar.ecb.tradingTip')
    },
    {
      event: t('marketInfo.fundamentalAnalysis.economicCalendar.ukCpi.event'),
      country: t('marketInfo.fundamentalAnalysis.economicCalendar.ukCpi.country'),
      impact: t('marketInfo.fundamentalAnalysis.economicCalendar.ukCpi.impact'),
      typical: t('marketInfo.fundamentalAnalysis.economicCalendar.ukCpi.typical'),
      tradingTip: t('marketInfo.fundamentalAnalysis.economicCalendar.ukCpi.tradingTip')
    },
    {
      event: t('marketInfo.fundamentalAnalysis.economicCalendar.chinaGdp.event'),
      country: t('marketInfo.fundamentalAnalysis.economicCalendar.chinaGdp.country'),
      impact: t('marketInfo.fundamentalAnalysis.economicCalendar.chinaGdp.impact'),
      typical: t('marketInfo.fundamentalAnalysis.economicCalendar.chinaGdp.typical'),
      tradingTip: t('marketInfo.fundamentalAnalysis.economicCalendar.chinaGdp.tradingTip')
    }
  ];

  const correlations = [
    {
      pair: t('marketInfo.fundamentalAnalysis.correlations.audGold.pair'),
      relationship: t('marketInfo.fundamentalAnalysis.correlations.audGold.relationship'),
      reason: t('marketInfo.fundamentalAnalysis.correlations.audGold.reason')
    },
    {
      pair: t('marketInfo.fundamentalAnalysis.correlations.usdCadOil.pair'),
      relationship: t('marketInfo.fundamentalAnalysis.correlations.usdCadOil.relationship'),
      reason: t('marketInfo.fundamentalAnalysis.correlations.usdCadOil.reason')
    },
    {
      pair: t('marketInfo.fundamentalAnalysis.correlations.eurDxy.pair'),
      relationship: t('marketInfo.fundamentalAnalysis.correlations.eurDxy.relationship'),
      reason: t('marketInfo.fundamentalAnalysis.correlations.eurDxy.reason')
    },
    {
      pair: t('marketInfo.fundamentalAnalysis.correlations.nzdDairy.pair'),
      relationship: t('marketInfo.fundamentalAnalysis.correlations.nzdDairy.relationship'),
      reason: t('marketInfo.fundamentalAnalysis.correlations.nzdDairy.reason')
    },
    {
      pair: t('marketInfo.fundamentalAnalysis.correlations.usdJpyYields.pair'),
      relationship: t('marketInfo.fundamentalAnalysis.correlations.usdJpyYields.relationship'),
      reason: t('marketInfo.fundamentalAnalysis.correlations.usdJpyYields.reason')
    }
  ];

  const faqs = [
    {
      question: t('marketInfo.fundamentalAnalysis.faq.q1.question'),
      answer: t('marketInfo.fundamentalAnalysis.faq.q1.answer')
    },
    {
      question: t('marketInfo.fundamentalAnalysis.faq.q2.question'),
      answer: t('marketInfo.fundamentalAnalysis.faq.q2.answer')
    },
    {
      question: t('marketInfo.fundamentalAnalysis.faq.q3.question'),
      answer: t('marketInfo.fundamentalAnalysis.faq.q3.answer')
    },
    {
      question: t('marketInfo.fundamentalAnalysis.faq.q4.question'),
      answer: t('marketInfo.fundamentalAnalysis.faq.q4.answer')
    },
    {
      question: t('marketInfo.fundamentalAnalysis.faq.q5.question'),
      answer: t('marketInfo.fundamentalAnalysis.faq.q5.answer')
    },
    {
      question: t('marketInfo.fundamentalAnalysis.faq.q6.question'),
      answer: t('marketInfo.fundamentalAnalysis.faq.q6.answer')
    },
    {
      question: t('marketInfo.fundamentalAnalysis.faq.q7.question'),
      answer: t('marketInfo.fundamentalAnalysis.faq.q7.answer')
    }
  ];

  return (
    <LandingLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4" data-testid="badge-fundamental-analysis">{t('marketInfo.fundamentalAnalysis.badge')}</Badge>
            <h1 className="text-4xl font-bold mb-4">{t('marketInfo.fundamentalAnalysis.title')}</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('marketInfo.fundamentalAnalysis.description')}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid sm:grid-cols-4 gap-4 mb-12">
            <Card data-testid="card-stat-indicators">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-1">{t('marketInfo.fundamentalAnalysis.stats.indicators')}</div>
                <p className="text-sm text-muted-foreground">{t('marketInfo.fundamentalAnalysis.stats.indicatorsLabel')}</p>
              </CardContent>
            </Card>
            <Card data-testid="card-stat-banks">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-1">{t('marketInfo.fundamentalAnalysis.stats.centralBanks')}</div>
                <p className="text-sm text-muted-foreground">{t('marketInfo.fundamentalAnalysis.stats.centralBanksLabel')}</p>
              </CardContent>
            </Card>
            <Card data-testid="card-stat-events">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-1">{t('marketInfo.fundamentalAnalysis.stats.monthlyEvents')}</div>
                <p className="text-sm text-muted-foreground">{t('marketInfo.fundamentalAnalysis.stats.monthlyEventsLabel')}</p>
              </CardContent>
            </Card>
            <Card data-testid="card-stat-impact">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-1">{t('marketInfo.fundamentalAnalysis.stats.pipsPerNews')}</div>
                <p className="text-sm text-muted-foreground">{t('marketInfo.fundamentalAnalysis.stats.pipsPerNewsLabel')}</p>
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
                          <p className="text-xs text-primary font-medium">{t('marketInfo.fundamentalAnalysis.frequencyLabel')} {indicator.frequency}</p>
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
                <CardTitle>{t('marketInfo.fundamentalAnalysis.economicCalendar.title')}</CardTitle>
              </div>
              <CardDescription>{t('marketInfo.fundamentalAnalysis.economicCalendar.description')}</CardDescription>
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
                          {event.impact} {t('marketInfo.fundamentalAnalysis.economicCalendar.impactLabel')}
                        </Badge>
                      </div>
                    </div>
                    <Alert className="mt-2">
                      <AlertDescription className="text-sm">
                        <strong>{t('marketInfo.fundamentalAnalysis.economicCalendar.tradingTipLabel')}</strong> {event.tradingTip}
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
              <CardTitle>{t('marketInfo.fundamentalAnalysis.correlations.title')}</CardTitle>
              <CardDescription>{t('marketInfo.fundamentalAnalysis.correlations.description')}</CardDescription>
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
                  <CardTitle>{t('marketInfo.fundamentalAnalysis.workflow.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">1</div>
                  <p><strong>{t('marketInfo.fundamentalAnalysis.workflow.step1')}</strong></p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">2</div>
                  <p><strong>{t('marketInfo.fundamentalAnalysis.workflow.step2')}</strong></p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">3</div>
                  <p><strong>{t('marketInfo.fundamentalAnalysis.workflow.step3')}</strong></p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">4</div>
                  <p><strong>{t('marketInfo.fundamentalAnalysis.workflow.step4')}</strong></p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">5</div>
                  <p><strong>{t('marketInfo.fundamentalAnalysis.workflow.step5')}</strong></p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">6</div>
                  <p><strong>{t('marketInfo.fundamentalAnalysis.workflow.step6')}</strong></p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  <CardTitle>{t('marketInfo.fundamentalAnalysis.mistakes.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold text-amber-600 dark:text-amber-500 mb-1">{t('marketInfo.fundamentalAnalysis.mistakes.tradingNumber.title')}</h4>
                  <p className="text-muted-foreground">{t('marketInfo.fundamentalAnalysis.mistakes.tradingNumber.description')}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-amber-600 dark:text-amber-500 mb-1">{t('marketInfo.fundamentalAnalysis.mistakes.ignoringDivergence.title')}</h4>
                  <p className="text-muted-foreground">{t('marketInfo.fundamentalAnalysis.mistakes.ignoringDivergence.description')}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-amber-600 dark:text-amber-500 mb-1">{t('marketInfo.fundamentalAnalysis.mistakes.holdingThroughNews.title')}</h4>
                  <p className="text-muted-foreground">{t('marketInfo.fundamentalAnalysis.mistakes.holdingThroughNews.description')}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-amber-600 dark:text-amber-500 mb-1">{t('marketInfo.fundamentalAnalysis.mistakes.pricedIn.title')}</h4>
                  <p className="text-muted-foreground">{t('marketInfo.fundamentalAnalysis.mistakes.pricedIn.description')}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FAQ */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                <CardTitle>{t('marketInfo.fundamentalAnalysis.faq.title')}</CardTitle>
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
            <h2 className="text-2xl font-bold mb-4">{t('marketInfo.fundamentalAnalysis.cta.title')}</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {t('marketInfo.fundamentalAnalysis.cta.description')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" data-testid="button-economic-calendar">
                {t('marketInfo.fundamentalAnalysis.cta.button')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" data-testid="button-market-news">
                {t('marketInfo.fundamentalAnalysis.cta.learnMore')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}
