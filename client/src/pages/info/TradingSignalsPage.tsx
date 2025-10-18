import { LandingLayout } from "@/components/LandingLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Target, Shield, BarChart, HelpCircle, ArrowRight, CheckCircle2, AlertTriangle, TrendingUp, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLanguage } from "@/hooks/useLanguage";

export default function TradingSignalsPage() {
  const { t } = useLanguage();

  const signalComponents = [
    {
      title: t('marketInfo.tradingSignals.components.entryPoint.title'),
      icon: Target,
      description: t('marketInfo.tradingSignals.components.entryPoint.description'),
      details: t('marketInfo.tradingSignals.components.entryPoint.details'),
      importance: t('marketInfo.tradingSignals.components.entryPoint.importance')
    },
    {
      title: t('marketInfo.tradingSignals.components.stopLoss.title'),
      icon: Shield,
      description: t('marketInfo.tradingSignals.components.stopLoss.description'),
      details: t('marketInfo.tradingSignals.components.stopLoss.details'),
      importance: t('marketInfo.tradingSignals.components.stopLoss.importance')
    },
    {
      title: t('marketInfo.tradingSignals.components.takeProfit.title'),
      icon: Target,
      description: t('marketInfo.tradingSignals.components.takeProfit.description'),
      details: t('marketInfo.tradingSignals.components.takeProfit.details'),
      importance: t('marketInfo.tradingSignals.components.takeProfit.importance')
    },
    {
      title: t('marketInfo.tradingSignals.components.riskReward.title'),
      icon: BarChart,
      description: t('marketInfo.tradingSignals.components.riskReward.description'),
      details: t('marketInfo.tradingSignals.components.riskReward.details'),
      importance: t('marketInfo.tradingSignals.components.riskReward.importance')
    }
  ];

  const signalTypes = [
    {
      name: t('marketInfo.tradingSignals.types.technical.name'),
      description: t('marketInfo.tradingSignals.types.technical.description'),
      examples: [
        t('marketInfo.tradingSignals.types.technical.example1'),
        t('marketInfo.tradingSignals.types.technical.example2'),
        t('marketInfo.tradingSignals.types.technical.example3'),
        t('marketInfo.tradingSignals.types.technical.example4')
      ],
      accuracy: t('marketInfo.tradingSignals.types.technical.accuracy'),
      bestFor: t('marketInfo.tradingSignals.types.technical.bestFor'),
      timeframe: t('marketInfo.tradingSignals.types.technical.timeframe')
    },
    {
      name: t('marketInfo.tradingSignals.types.fundamental.name'),
      description: t('marketInfo.tradingSignals.types.fundamental.description'),
      examples: [
        t('marketInfo.tradingSignals.types.fundamental.example1'),
        t('marketInfo.tradingSignals.types.fundamental.example2'),
        t('marketInfo.tradingSignals.types.fundamental.example3'),
        t('marketInfo.tradingSignals.types.fundamental.example4')
      ],
      accuracy: t('marketInfo.tradingSignals.types.fundamental.accuracy'),
      bestFor: t('marketInfo.tradingSignals.types.fundamental.bestFor'),
      timeframe: t('marketInfo.tradingSignals.types.fundamental.timeframe')
    },
    {
      name: t('marketInfo.tradingSignals.types.algorithmic.name'),
      description: t('marketInfo.tradingSignals.types.algorithmic.description'),
      examples: [
        t('marketInfo.tradingSignals.types.algorithmic.example1'),
        t('marketInfo.tradingSignals.types.algorithmic.example2'),
        t('marketInfo.tradingSignals.types.algorithmic.example3'),
        t('marketInfo.tradingSignals.types.algorithmic.example4')
      ],
      accuracy: t('marketInfo.tradingSignals.types.algorithmic.accuracy'),
      bestFor: t('marketInfo.tradingSignals.types.algorithmic.bestFor'),
      timeframe: t('marketInfo.tradingSignals.types.algorithmic.timeframe')
    },
    {
      name: t('marketInfo.tradingSignals.types.priceAction.name'),
      description: t('marketInfo.tradingSignals.types.priceAction.description'),
      examples: [
        t('marketInfo.tradingSignals.types.priceAction.example1'),
        t('marketInfo.tradingSignals.types.priceAction.example2'),
        t('marketInfo.tradingSignals.types.priceAction.example3'),
        t('marketInfo.tradingSignals.types.priceAction.example4')
      ],
      accuracy: t('marketInfo.tradingSignals.types.priceAction.accuracy'),
      bestFor: t('marketInfo.tradingSignals.types.priceAction.bestFor'),
      timeframe: t('marketInfo.tradingSignals.types.priceAction.timeframe')
    }
  ];

  const signalQuality = [
    {
      factor: t('marketInfo.tradingSignals.quality.trackRecord.factor'),
      good: t('marketInfo.tradingSignals.quality.trackRecord.good'),
      bad: t('marketInfo.tradingSignals.quality.trackRecord.bad')
    },
    {
      factor: t('marketInfo.tradingSignals.quality.riskManagement.factor'),
      good: t('marketInfo.tradingSignals.quality.riskManagement.good'),
      bad: t('marketInfo.tradingSignals.quality.riskManagement.bad')
    },
    {
      factor: t('marketInfo.tradingSignals.quality.frequency.factor'),
      good: t('marketInfo.tradingSignals.quality.frequency.good'),
      bad: t('marketInfo.tradingSignals.quality.frequency.bad')
    },
    {
      factor: t('marketInfo.tradingSignals.quality.transparency.factor'),
      good: t('marketInfo.tradingSignals.quality.transparency.good'),
      bad: t('marketInfo.tradingSignals.quality.transparency.bad')
    },
    {
      factor: t('marketInfo.tradingSignals.quality.claims.factor'),
      good: t('marketInfo.tradingSignals.quality.claims.good'),
      bad: t('marketInfo.tradingSignals.quality.claims.bad')
    }
  ];

  const usingSignals = [
    {
      step: `1. ${t('marketInfo.tradingSignals.using.step1.title')}`,
      action: t('marketInfo.tradingSignals.using.step1.action'),
      tip: t('marketInfo.tradingSignals.using.step1.tip')
    },
    {
      step: `2. ${t('marketInfo.tradingSignals.using.step2.title')}`,
      action: t('marketInfo.tradingSignals.using.step2.action'),
      tip: t('marketInfo.tradingSignals.using.step2.tip')
    },
    {
      step: `3. ${t('marketInfo.tradingSignals.using.step3.title')}`,
      action: t('marketInfo.tradingSignals.using.step3.action'),
      tip: t('marketInfo.tradingSignals.using.step3.tip')
    },
    {
      step: `4. ${t('marketInfo.tradingSignals.using.step4.title')}`,
      action: t('marketInfo.tradingSignals.using.step4.action'),
      tip: t('marketInfo.tradingSignals.using.step4.tip')
    },
    {
      step: `5. ${t('marketInfo.tradingSignals.using.step5.title')}`,
      action: t('marketInfo.tradingSignals.using.step5.action'),
      tip: t('marketInfo.tradingSignals.using.step5.tip')
    },
    {
      step: `6. ${t('marketInfo.tradingSignals.using.step6.title')}`,
      action: t('marketInfo.tradingSignals.using.step6.action'),
      tip: t('marketInfo.tradingSignals.using.step6.tip')
    },
    {
      step: `7. ${t('marketInfo.tradingSignals.using.step7.title')}`,
      action: t('marketInfo.tradingSignals.using.step7.action'),
      tip: t('marketInfo.tradingSignals.using.step7.tip')
    },
    {
      step: `8. ${t('marketInfo.tradingSignals.using.step8.title')}`,
      action: t('marketInfo.tradingSignals.using.step8.action'),
      tip: t('marketInfo.tradingSignals.using.step8.tip')
    }
  ];

  const faqs = [
    {
      question: t('marketInfo.tradingSignals.faq.q1.question'),
      answer: t('marketInfo.tradingSignals.faq.q1.answer')
    },
    {
      question: t('marketInfo.tradingSignals.faq.q2.question'),
      answer: t('marketInfo.tradingSignals.faq.q2.answer')
    },
    {
      question: t('marketInfo.tradingSignals.faq.q3.question'),
      answer: t('marketInfo.tradingSignals.faq.q3.answer')
    },
    {
      question: t('marketInfo.tradingSignals.faq.q4.question'),
      answer: t('marketInfo.tradingSignals.faq.q4.answer')
    },
    {
      question: t('marketInfo.tradingSignals.faq.q5.question'),
      answer: t('marketInfo.tradingSignals.faq.q5.answer')
    },
    {
      question: t('marketInfo.tradingSignals.faq.q6.question'),
      answer: t('marketInfo.tradingSignals.faq.q6.answer')
    },
    {
      question: t('marketInfo.tradingSignals.faq.q7.question'),
      answer: t('marketInfo.tradingSignals.faq.q7.answer')
    }
  ];

  return (
    <LandingLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4" data-testid="badge-trading-signals">{t('marketInfo.tradingSignals.badge')}</Badge>
            <h1 className="text-4xl font-bold mb-4">{t('marketInfo.tradingSignals.title')}</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('marketInfo.tradingSignals.description')}
            </p>
          </div>

          {/* Signal Example */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Bell className="w-6 h-6 text-primary" />
                <div>
                  <CardTitle>{t('marketInfo.tradingSignals.example.title')}</CardTitle>
                  <CardDescription>{t('marketInfo.tradingSignals.example.description')}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b">
                  <div>
                    <p className="text-sm text-muted-foreground">{t('marketInfo.tradingSignals.example.instrument')}</p>
                    <p className="text-2xl font-bold">EUR/USD</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t('marketInfo.tradingSignals.example.direction')}</p>
                    <p className="text-2xl font-bold text-green-500">{t('marketInfo.tradingSignals.example.buy')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t('marketInfo.tradingSignals.example.timeframe')}</p>
                    <p className="text-2xl font-bold">H4</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t('marketInfo.tradingSignals.example.riskReward')}</p>
                    <p className="text-2xl font-bold text-primary">1:3</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{t('marketInfo.tradingSignals.example.entryPrice')}</p>
                    <p className="text-lg font-semibold">1.1050</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{t('marketInfo.tradingSignals.example.stopLoss')}</p>
                    <p className="text-lg font-semibold text-red-500">1.1000 {t('marketInfo.tradingSignals.example.stopLossPips')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{t('marketInfo.tradingSignals.example.takeProfit1')}</p>
                    <p className="text-lg font-semibold text-green-500">1.1100 {t('marketInfo.tradingSignals.example.takeProfit1Pips')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{t('marketInfo.tradingSignals.example.takeProfit2')}</p>
                    <p className="text-lg font-semibold text-green-500">1.1150 {t('marketInfo.tradingSignals.example.takeProfit2Pips')}</p>
                  </div>
                </div>

                <div className="pt-3 border-t">
                  <p className="text-sm font-medium mb-2">{t('marketInfo.tradingSignals.example.reasoningLabel')}</p>
                  <p className="text-sm text-muted-foreground">
                    {t('marketInfo.tradingSignals.example.reasoning')}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Badge>{t('marketInfo.tradingSignals.example.tag1')}</Badge>
                  <Badge variant="outline">{t('marketInfo.tradingSignals.example.tag2')}</Badge>
                  <Badge variant="outline">{t('marketInfo.tradingSignals.example.tag3')}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Signal Components */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">{t('marketInfo.tradingSignals.components.title')}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {signalComponents.map((component) => {
                const Icon = component.icon;
                return (
                  <Card key={component.title} data-testid={`card-component-${component.title.toLowerCase().replace(/\s+/g, '-')}`}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <CardTitle>{component.title}</CardTitle>
                            <Badge variant="outline">{component.importance}</Badge>
                          </div>
                          <CardDescription>{component.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{component.details}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Signal Types */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                <CardTitle>{t('marketInfo.tradingSignals.types.title')}</CardTitle>
              </div>
              <CardDescription>{t('marketInfo.tradingSignals.types.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {signalTypes.map((type, index) => (
                  <div key={index} className="border-l-4 border-primary pl-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{type.name}</h3>
                        <p className="text-sm text-muted-foreground">{type.description}</p>
                      </div>
                      <Badge>{type.accuracy}</Badge>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4 mt-3">
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">{t('marketInfo.tradingSignals.types.examples')}</p>
                        <ul className="space-y-1">
                          {type.examples.map((example, i) => (
                            <li key={i} className="text-sm flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-primary" />
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">{t('marketInfo.tradingSignals.types.bestFor')}</p>
                        <p className="text-sm mb-2">{type.bestFor}</p>
                        <p className="text-xs font-medium text-muted-foreground mb-1">{t('marketInfo.tradingSignals.types.timeframe')}</p>
                        <p className="text-sm">{type.timeframe}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Signal Quality Evaluation */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <CardTitle>{t('marketInfo.tradingSignals.quality.title')}</CardTitle>
              </div>
              <CardDescription>{t('marketInfo.tradingSignals.quality.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {signalQuality.map((item, index) => (
                  <div key={index} className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 border-l-4 border-green-500 bg-green-50 dark:bg-green-950/20 rounded">
                      <p className="font-semibold text-green-700 dark:text-green-400 mb-1">{t('marketInfo.tradingSignals.quality.goodLabel')} {item.factor}</p>
                      <p className="text-sm text-green-600 dark:text-green-500">{item.good}</p>
                    </div>
                    <div className="p-4 border-l-4 border-red-500 bg-red-50 dark:bg-red-950/20 rounded">
                      <p className="font-semibold text-red-700 dark:text-red-400 mb-1">{t('marketInfo.tradingSignals.quality.badLabel')}</p>
                      <p className="text-sm text-red-600 dark:text-red-500">{item.bad}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Using Signals */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>{t('marketInfo.tradingSignals.using.title')}</CardTitle>
              <CardDescription>{t('marketInfo.tradingSignals.using.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {usingSignals.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{item.step.replace(/^\d+\.\s/, '')}</h4>
                      <p className="text-sm text-muted-foreground mb-1">{item.action}</p>
                      <Alert className="mt-2">
                        <AlertDescription className="text-sm">
                          <strong>{t('marketInfo.tradingSignals.using.proTipLabel')}</strong> {item.tip}
                        </AlertDescription>
                      </Alert>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* FAQ */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                <CardTitle>{t('marketInfo.tradingSignals.faq.title')}</CardTitle>
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

          {/* Warning */}
          <Alert className="mb-8">
            <AlertTriangle className="w-4 h-4" />
            <AlertDescription>
              <strong>{t('marketInfo.tradingSignals.warning.label')}</strong> {t('marketInfo.tradingSignals.warning.text')}
            </AlertDescription>
          </Alert>

          {/* CTA */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">{t('marketInfo.tradingSignals.cta.title')}</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {t('marketInfo.tradingSignals.cta.description')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" data-testid="button-courses">
                {t('marketInfo.tradingSignals.cta.coursesButton')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" data-testid="button-start-trading">
                {t('marketInfo.tradingSignals.cta.tradingButton')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}
