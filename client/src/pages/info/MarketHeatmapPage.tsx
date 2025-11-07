import { LandingLayout } from "@/components/LandingLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Grid3x3, TrendingUp, TrendingDown, Eye, HelpCircle, ArrowRight, Activity, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLanguage } from "@/hooks/useLanguage";
import { VariantSection, VariantContainer, VariantHeading, VariantText, VariantGrid, VariantCard } from "@/components/variant";

export default function MarketHeatmapPage() {
  const { t } = useLanguage();

  const heatmapTypes = [
    {
      title: t('marketInfo.marketHeatmap.types.currencyStrength.title'),
      icon: TrendingUp,
      description: t('marketInfo.marketHeatmap.types.currencyStrength.description'),
      features: [
        t('marketInfo.marketHeatmap.types.currencyStrength.feature1'),
        t('marketInfo.marketHeatmap.types.currencyStrength.feature2'),
        t('marketInfo.marketHeatmap.types.currencyStrength.feature3'),
        t('marketInfo.marketHeatmap.types.currencyStrength.feature4')
      ],
      useCase: t('marketInfo.marketHeatmap.types.currencyStrength.useCase'),
      updateFrequency: t('marketInfo.marketHeatmap.types.currencyStrength.updateFrequency'),
      bestTimeframe: t('marketInfo.marketHeatmap.types.currencyStrength.bestTimeframe')
    },
    {
      title: t('marketInfo.marketHeatmap.types.assetClass.title'),
      icon: Grid3x3,
      description: t('marketInfo.marketHeatmap.types.assetClass.description'),
      features: [
        t('marketInfo.marketHeatmap.types.assetClass.feature1'),
        t('marketInfo.marketHeatmap.types.assetClass.feature2'),
        t('marketInfo.marketHeatmap.types.assetClass.feature3'),
        t('marketInfo.marketHeatmap.types.assetClass.feature4')
      ],
      useCase: t('marketInfo.marketHeatmap.types.assetClass.useCase'),
      updateFrequency: t('marketInfo.marketHeatmap.types.assetClass.updateFrequency'),
      bestTimeframe: t('marketInfo.marketHeatmap.types.assetClass.bestTimeframe')
    },
    {
      title: t('marketInfo.marketHeatmap.types.volatility.title'),
      icon: TrendingDown,
      description: t('marketInfo.marketHeatmap.types.volatility.description'),
      features: [
        t('marketInfo.marketHeatmap.types.volatility.feature1'),
        t('marketInfo.marketHeatmap.types.volatility.feature2'),
        t('marketInfo.marketHeatmap.types.volatility.feature3'),
        t('marketInfo.marketHeatmap.types.volatility.feature4')
      ],
      useCase: t('marketInfo.marketHeatmap.types.volatility.useCase'),
      updateFrequency: t('marketInfo.marketHeatmap.types.volatility.updateFrequency'),
      bestTimeframe: t('marketInfo.marketHeatmap.types.volatility.bestTimeframe')
    },
    {
      title: t('marketInfo.marketHeatmap.types.session.title'),
      icon: Activity,
      description: t('marketInfo.marketHeatmap.types.session.description'),
      features: [
        t('marketInfo.marketHeatmap.types.session.feature1'),
        t('marketInfo.marketHeatmap.types.session.feature2'),
        t('marketInfo.marketHeatmap.types.session.feature3'),
        t('marketInfo.marketHeatmap.types.session.feature4')
      ],
      useCase: t('marketInfo.marketHeatmap.types.session.useCase'),
      updateFrequency: t('marketInfo.marketHeatmap.types.session.updateFrequency'),
      bestTimeframe: t('marketInfo.marketHeatmap.types.session.bestTimeframe')
    }
  ];

  const interpretation = [
    {
      scenario: t('marketInfo.marketHeatmap.interpretation.strongGreen.scenario'),
      meaning: t('marketInfo.marketHeatmap.interpretation.strongGreen.meaning'),
      action: t('marketInfo.marketHeatmap.interpretation.strongGreen.action'),
      probability: t('marketInfo.marketHeatmap.interpretation.strongGreen.probability')
    },
    {
      scenario: t('marketInfo.marketHeatmap.interpretation.strongRed.scenario'),
      meaning: t('marketInfo.marketHeatmap.interpretation.strongRed.meaning'),
      action: t('marketInfo.marketHeatmap.interpretation.strongRed.action'),
      probability: t('marketInfo.marketHeatmap.interpretation.strongRed.probability')
    },
    {
      scenario: t('marketInfo.marketHeatmap.interpretation.mixed.scenario'),
      meaning: t('marketInfo.marketHeatmap.interpretation.mixed.meaning'),
      action: t('marketInfo.marketHeatmap.interpretation.mixed.action'),
      probability: t('marketInfo.marketHeatmap.interpretation.mixed.probability')
    },
    {
      scenario: t('marketInfo.marketHeatmap.interpretation.single.scenario'),
      meaning: t('marketInfo.marketHeatmap.interpretation.single.meaning'),
      action: t('marketInfo.marketHeatmap.interpretation.single.action'),
      probability: t('marketInfo.marketHeatmap.interpretation.single.probability')
    },
    {
      scenario: t('marketInfo.marketHeatmap.interpretation.sudden.scenario'),
      meaning: t('marketInfo.marketHeatmap.interpretation.sudden.meaning'),
      action: t('marketInfo.marketHeatmap.interpretation.sudden.action'),
      probability: t('marketInfo.marketHeatmap.interpretation.sudden.probability')
    },
    {
      scenario: t('marketInfo.marketHeatmap.interpretation.divergence.scenario'),
      meaning: t('marketInfo.marketHeatmap.interpretation.divergence.meaning'),
      action: t('marketInfo.marketHeatmap.interpretation.divergence.action'),
      probability: t('marketInfo.marketHeatmap.interpretation.divergence.probability')
    }
  ];

  const practicalStrategies = [
    {
      strategy: t('marketInfo.marketHeatmap.strategies.relativeStrength.strategy'),
      description: t('marketInfo.marketHeatmap.strategies.relativeStrength.description'),
      steps: [
        t('marketInfo.marketHeatmap.strategies.relativeStrength.step1'),
        t('marketInfo.marketHeatmap.strategies.relativeStrength.step2'),
        t('marketInfo.marketHeatmap.strategies.relativeStrength.step3'),
        t('marketInfo.marketHeatmap.strategies.relativeStrength.step4'),
        t('marketInfo.marketHeatmap.strategies.relativeStrength.step5'),
        t('marketInfo.marketHeatmap.strategies.relativeStrength.step6')
      ],
      winRate: t('marketInfo.marketHeatmap.strategies.relativeStrength.winRate'),
      riskReward: t('marketInfo.marketHeatmap.strategies.relativeStrength.riskReward')
    },
    {
      strategy: t('marketInfo.marketHeatmap.strategies.volatility.strategy'),
      description: t('marketInfo.marketHeatmap.strategies.volatility.description'),
      steps: [
        t('marketInfo.marketHeatmap.strategies.volatility.step1'),
        t('marketInfo.marketHeatmap.strategies.volatility.step2'),
        t('marketInfo.marketHeatmap.strategies.volatility.step3'),
        t('marketInfo.marketHeatmap.strategies.volatility.step4'),
        t('marketInfo.marketHeatmap.strategies.volatility.step5'),
        t('marketInfo.marketHeatmap.strategies.volatility.step6')
      ],
      winRate: t('marketInfo.marketHeatmap.strategies.volatility.winRate'),
      riskReward: t('marketInfo.marketHeatmap.strategies.volatility.riskReward')
    },
    {
      strategy: t('marketInfo.marketHeatmap.strategies.session.strategy'),
      description: t('marketInfo.marketHeatmap.strategies.session.description'),
      steps: [
        t('marketInfo.marketHeatmap.strategies.session.step1'),
        t('marketInfo.marketHeatmap.strategies.session.step2'),
        t('marketInfo.marketHeatmap.strategies.session.step3'),
        t('marketInfo.marketHeatmap.strategies.session.step4'),
        t('marketInfo.marketHeatmap.strategies.session.step5'),
        t('marketInfo.marketHeatmap.strategies.session.step6')
      ],
      winRate: t('marketInfo.marketHeatmap.strategies.session.winRate'),
      riskReward: t('marketInfo.marketHeatmap.strategies.session.riskReward')
    }
  ];

  const tips = [
    {
      tip: t('marketInfo.marketHeatmap.tips.combine.tip'),
      detail: t('marketInfo.marketHeatmap.tips.combine.detail')
    },
    {
      tip: t('marketInfo.marketHeatmap.tips.timeframes.tip'),
      detail: t('marketInfo.marketHeatmap.tips.timeframes.detail')
    },
    {
      tip: t('marketInfo.marketHeatmap.tips.neutral.tip'),
      detail: t('marketInfo.marketHeatmap.tips.neutral.detail')
    },
    {
      tip: t('marketInfo.marketHeatmap.tips.sentiment.tip'),
      detail: t('marketInfo.marketHeatmap.tips.sentiment.detail')
    },
    {
      tip: t('marketInfo.marketHeatmap.tips.timing.tip'),
      detail: t('marketInfo.marketHeatmap.tips.timing.detail')
    },
    {
      tip: t('marketInfo.marketHeatmap.tips.correlation.tip'),
      detail: t('marketInfo.marketHeatmap.tips.correlation.detail')
    }
  ];

  const faqs = [
    {
      question: t('marketInfo.marketHeatmap.faq.q1.question'),
      answer: t('marketInfo.marketHeatmap.faq.q1.answer')
    },
    {
      question: t('marketInfo.marketHeatmap.faq.q2.question'),
      answer: t('marketInfo.marketHeatmap.faq.q2.answer')
    },
    {
      question: t('marketInfo.marketHeatmap.faq.q3.question'),
      answer: t('marketInfo.marketHeatmap.faq.q3.answer')
    },
    {
      question: t('marketInfo.marketHeatmap.faq.q4.question'),
      answer: t('marketInfo.marketHeatmap.faq.q4.answer')
    },
    {
      question: t('marketInfo.marketHeatmap.faq.q5.question'),
      answer: t('marketInfo.marketHeatmap.faq.q5.answer')
    },
    {
      question: t('marketInfo.marketHeatmap.faq.q6.question'),
      answer: t('marketInfo.marketHeatmap.faq.q6.answer')
    },
    {
      question: t('marketInfo.marketHeatmap.faq.q7.question'),
      answer: t('marketInfo.marketHeatmap.faq.q7.answer')
    }
  ];

  return (
    <LandingLayout>
      <VariantSection animation="page">
        <VariantContainer>
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <Badge className="mb-4" data-testid="badge-market-heatmap">{t('marketInfo.marketHeatmap.badge')}</Badge>
              <VariantHeading level="hero" as="h1" className="mb-4">{t('marketInfo.marketHeatmap.title')}</VariantHeading>
              <VariantText className="text-muted-foreground max-w-3xl mx-auto">
                {t('marketInfo.marketHeatmap.description')}
              </VariantText>
            </div>

            {/* Quick Stats */}
            <VariantGrid className="mb-12">
              <VariantCard data-testid="card-stat-currencies">
                <div className="text-3xl font-bold text-primary mb-1">{t('marketInfo.marketHeatmap.stats.currencies')}</div>
                <p className="text-sm text-muted-foreground">{t('marketInfo.marketHeatmap.stats.currenciesLabel')}</p>
              </VariantCard>
              <VariantCard data-testid="card-stat-pairs">
                <div className="text-3xl font-bold text-primary mb-1">{t('marketInfo.marketHeatmap.stats.pairs')}</div>
                <p className="text-sm text-muted-foreground">{t('marketInfo.marketHeatmap.stats.pairsLabel')}</p>
              </VariantCard>
              <VariantCard data-testid="card-stat-update">
                <div className="text-3xl font-bold text-primary mb-1">{t('marketInfo.marketHeatmap.stats.updates')}</div>
                <p className="text-sm text-muted-foreground">{t('marketInfo.marketHeatmap.stats.updatesLabel')}</p>
              </VariantCard>
              <VariantCard data-testid="card-stat-sessions">
                <div className="text-3xl font-bold text-primary mb-1">{t('marketInfo.marketHeatmap.stats.sessions')}</div>
                <p className="text-sm text-muted-foreground">{t('marketInfo.marketHeatmap.stats.sessionsLabel')}</p>
              </VariantCard>
            </VariantGrid>

          {/* Heatmap Types */}
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
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <CardTitle>{type.title}</CardTitle>
                          <Badge variant="outline">{type.updateFrequency}</Badge>
                        </div>
                        <CardDescription>{type.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2 text-sm">{t('marketInfo.marketHeatmap.interpretation.keyFeatures')}</h3>
                        <ul className="space-y-1">
                          {type.features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                              <span className="text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-4 bg-muted rounded-lg">
                        <h3 className="font-semibold mb-2 text-sm">{t('marketInfo.marketHeatmap.interpretation.practicalUse')}</h3>
                        <p className="text-sm text-muted-foreground">{type.useCase}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge>{type.bestTimeframe}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Interpretation Guide */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-primary" />
                <CardTitle>{t('marketInfo.marketHeatmap.interpretation.title')}</CardTitle>
              </div>
              <CardDescription>{t('marketInfo.marketHeatmap.interpretation.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {interpretation.map((item, index) => (
                  <div key={index} className="border-l-4 border-primary pl-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">{item.scenario}</h3>
                      <Badge>{item.probability}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      <strong>{t('marketInfo.marketHeatmap.interpretation.meaning')}</strong> {item.meaning}
                    </p>
                    <Alert>
                      <AlertDescription className="text-sm">
                        <strong>{t('marketInfo.marketHeatmap.interpretation.tradingAction')}</strong> {item.action}
                      </AlertDescription>
                    </Alert>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Trading Strategies */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                <CardTitle>{t('marketInfo.marketHeatmap.strategies.title')}</CardTitle>
              </div>
              <CardDescription>{t('marketInfo.marketHeatmap.strategies.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {practicalStrategies.map((strat, index) => (
                  <div key={index} className="border-l-4 border-primary pl-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{strat.strategy}</h3>
                        <p className="text-sm text-muted-foreground">{strat.description}</p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Badge variant="outline">Win: {strat.winRate}</Badge>
                        <Badge variant="outline">R:R: {strat.riskReward}</Badge>
                      </div>
                    </div>
                    <div className="mt-3 bg-muted rounded-lg p-4">
                      <h4 className="font-semibold text-sm mb-2">{t('marketInfo.marketHeatmap.strategies.stepByStep')}</h4>
                      <ol className="space-y-2">
                        {strat.steps.map((step, i) => (
                          <li key={i} className="flex gap-3 text-sm">
                            <span className="font-bold text-primary">{i + 1}.</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pro Tips */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>{t('marketInfo.marketHeatmap.tips.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                {tips.map((item, index) => (
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

          {/* FAQ */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                <CardTitle>{t('marketInfo.marketHeatmap.faq.title')}</CardTitle>
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
            <h2 className="text-2xl font-bold mb-4">{t('marketInfo.marketHeatmap.cta.title')}</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {t('marketInfo.marketHeatmap.cta.description')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" data-testid="button-view-heatmap">
                {t('marketInfo.marketHeatmap.cta.viewButton')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" data-testid="button-start-trading">
                {t('marketInfo.marketHeatmap.cta.tradingButton')}
              </Button>
            </div>
          </div>
          </div>
        </VariantContainer>
      </VariantSection>
    </LandingLayout>
  );
}
