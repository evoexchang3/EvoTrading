import { LandingLayout } from "@/components/LandingLayout";
import { TrendingUp, BarChart3, Activity, HelpCircle, ArrowRight, BookOpen, Target, LineChart, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLanguage } from "@/hooks/useLanguage";
import { VariantSection, VariantContainer, VariantHeading, VariantText, VariantGrid, VariantCard, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/variant";

export default function TechnicalAnalysisPage() {
  const { t } = useLanguage();

  const concepts = [
    {
      title: t('marketInfo.technicalAnalysis.concepts.chartPatterns.title'),
      icon: BarChart3,
      description: t('marketInfo.technicalAnalysis.concepts.chartPatterns.description'),
      examples: [
        {
          name: t('marketInfo.technicalAnalysis.concepts.chartPatterns.headAndShoulders.name'),
          type: t('marketInfo.technicalAnalysis.concepts.chartPatterns.headAndShoulders.type'),
          reliability: t('marketInfo.technicalAnalysis.concepts.chartPatterns.headAndShoulders.reliability'),
          timeframe: t('marketInfo.technicalAnalysis.concepts.chartPatterns.headAndShoulders.timeframe')
        },
        {
          name: t('marketInfo.technicalAnalysis.concepts.chartPatterns.doubleTopBottom.name'),
          type: t('marketInfo.technicalAnalysis.concepts.chartPatterns.doubleTopBottom.type'),
          reliability: t('marketInfo.technicalAnalysis.concepts.chartPatterns.doubleTopBottom.reliability'),
          timeframe: t('marketInfo.technicalAnalysis.concepts.chartPatterns.doubleTopBottom.timeframe')
        },
        {
          name: t('marketInfo.technicalAnalysis.concepts.chartPatterns.triangles.name'),
          type: t('marketInfo.technicalAnalysis.concepts.chartPatterns.triangles.type'),
          reliability: t('marketInfo.technicalAnalysis.concepts.chartPatterns.triangles.reliability'),
          timeframe: t('marketInfo.technicalAnalysis.concepts.chartPatterns.triangles.timeframe')
        },
        {
          name: t('marketInfo.technicalAnalysis.concepts.chartPatterns.flags.name'),
          type: t('marketInfo.technicalAnalysis.concepts.chartPatterns.flags.type'),
          reliability: t('marketInfo.technicalAnalysis.concepts.chartPatterns.flags.reliability'),
          timeframe: t('marketInfo.technicalAnalysis.concepts.chartPatterns.flags.timeframe')
        },
        {
          name: t('marketInfo.technicalAnalysis.concepts.chartPatterns.cupAndHandle.name'),
          type: t('marketInfo.technicalAnalysis.concepts.chartPatterns.cupAndHandle.type'),
          reliability: t('marketInfo.technicalAnalysis.concepts.chartPatterns.cupAndHandle.reliability'),
          timeframe: t('marketInfo.technicalAnalysis.concepts.chartPatterns.cupAndHandle.timeframe')
        }
      ]
    },
    {
      title: t('marketInfo.technicalAnalysis.concepts.technicalIndicators.title'),
      icon: Activity,
      description: t('marketInfo.technicalAnalysis.concepts.technicalIndicators.description'),
      examples: [
        {
          name: t('marketInfo.technicalAnalysis.concepts.technicalIndicators.movingAverages.name'),
          type: t('marketInfo.technicalAnalysis.concepts.technicalIndicators.movingAverages.type'),
          reliability: t('marketInfo.technicalAnalysis.concepts.technicalIndicators.movingAverages.reliability'),
          timeframe: t('marketInfo.technicalAnalysis.concepts.technicalIndicators.movingAverages.timeframe')
        },
        {
          name: t('marketInfo.technicalAnalysis.concepts.technicalIndicators.rsi.name'),
          type: t('marketInfo.technicalAnalysis.concepts.technicalIndicators.rsi.type'),
          reliability: t('marketInfo.technicalAnalysis.concepts.technicalIndicators.rsi.reliability'),
          timeframe: t('marketInfo.technicalAnalysis.concepts.technicalIndicators.rsi.timeframe')
        },
        {
          name: t('marketInfo.technicalAnalysis.concepts.technicalIndicators.macd.name'),
          type: t('marketInfo.technicalAnalysis.concepts.technicalIndicators.macd.type'),
          reliability: t('marketInfo.technicalAnalysis.concepts.technicalIndicators.macd.reliability'),
          timeframe: t('marketInfo.technicalAnalysis.concepts.technicalIndicators.macd.timeframe')
        },
        {
          name: t('marketInfo.technicalAnalysis.concepts.technicalIndicators.bollingerBands.name'),
          type: t('marketInfo.technicalAnalysis.concepts.technicalIndicators.bollingerBands.type'),
          reliability: t('marketInfo.technicalAnalysis.concepts.technicalIndicators.bollingerBands.reliability'),
          timeframe: t('marketInfo.technicalAnalysis.concepts.technicalIndicators.bollingerBands.timeframe')
        },
        {
          name: t('marketInfo.technicalAnalysis.concepts.technicalIndicators.stochastic.name'),
          type: t('marketInfo.technicalAnalysis.concepts.technicalIndicators.stochastic.type'),
          reliability: t('marketInfo.technicalAnalysis.concepts.technicalIndicators.stochastic.reliability'),
          timeframe: t('marketInfo.technicalAnalysis.concepts.technicalIndicators.stochastic.timeframe')
        },
        {
          name: t('marketInfo.technicalAnalysis.concepts.technicalIndicators.fibonacci.name'),
          type: t('marketInfo.technicalAnalysis.concepts.technicalIndicators.fibonacci.type'),
          reliability: t('marketInfo.technicalAnalysis.concepts.technicalIndicators.fibonacci.reliability'),
          timeframe: t('marketInfo.technicalAnalysis.concepts.technicalIndicators.fibonacci.timeframe')
        }
      ]
    },
    {
      title: t('marketInfo.technicalAnalysis.concepts.supportResistance.title'),
      icon: TrendingUp,
      description: t('marketInfo.technicalAnalysis.concepts.supportResistance.description'),
      examples: [
        {
          name: t('marketInfo.technicalAnalysis.concepts.supportResistance.horizontal.name'),
          type: t('marketInfo.technicalAnalysis.concepts.supportResistance.horizontal.type'),
          reliability: t('marketInfo.technicalAnalysis.concepts.supportResistance.horizontal.reliability'),
          timeframe: t('marketInfo.technicalAnalysis.concepts.supportResistance.horizontal.timeframe')
        },
        {
          name: t('marketInfo.technicalAnalysis.concepts.supportResistance.trendLines.name'),
          type: t('marketInfo.technicalAnalysis.concepts.supportResistance.trendLines.type'),
          reliability: t('marketInfo.technicalAnalysis.concepts.supportResistance.trendLines.reliability'),
          timeframe: t('marketInfo.technicalAnalysis.concepts.supportResistance.trendLines.timeframe')
        },
        {
          name: t('marketInfo.technicalAnalysis.concepts.supportResistance.fibonacciRetracements.name'),
          type: t('marketInfo.technicalAnalysis.concepts.supportResistance.fibonacciRetracements.type'),
          reliability: t('marketInfo.technicalAnalysis.concepts.supportResistance.fibonacciRetracements.reliability'),
          timeframe: t('marketInfo.technicalAnalysis.concepts.supportResistance.fibonacciRetracements.timeframe')
        },
        {
          name: t('marketInfo.technicalAnalysis.concepts.supportResistance.pivotPoints.name'),
          type: t('marketInfo.technicalAnalysis.concepts.supportResistance.pivotPoints.type'),
          reliability: t('marketInfo.technicalAnalysis.concepts.supportResistance.pivotPoints.reliability'),
          timeframe: t('marketInfo.technicalAnalysis.concepts.supportResistance.pivotPoints.timeframe')
        },
        {
          name: t('marketInfo.technicalAnalysis.concepts.supportResistance.psychological.name'),
          type: t('marketInfo.technicalAnalysis.concepts.supportResistance.psychological.type'),
          reliability: t('marketInfo.technicalAnalysis.concepts.supportResistance.psychological.reliability'),
          timeframe: t('marketInfo.technicalAnalysis.concepts.supportResistance.psychological.timeframe')
        }
      ]
    }
  ];

  const tradingStrategies = [
    {
      name: t('marketInfo.technicalAnalysis.strategies.trendFollowing.name'),
      description: t('marketInfo.technicalAnalysis.strategies.trendFollowing.description'),
      setup: t('marketInfo.technicalAnalysis.strategies.trendFollowing.setup'),
      entry: t('marketInfo.technicalAnalysis.strategies.trendFollowing.entry'),
      stopLoss: t('marketInfo.technicalAnalysis.strategies.trendFollowing.stopLoss'),
      takeProfit: t('marketInfo.technicalAnalysis.strategies.trendFollowing.takeProfit'),
      winRate: t('marketInfo.technicalAnalysis.strategies.trendFollowing.winRate'),
      rrRatio: t('marketInfo.technicalAnalysis.strategies.trendFollowing.rrRatio')
    },
    {
      name: t('marketInfo.technicalAnalysis.strategies.supportResistanceBounce.name'),
      description: t('marketInfo.technicalAnalysis.strategies.supportResistanceBounce.description'),
      setup: t('marketInfo.technicalAnalysis.strategies.supportResistanceBounce.setup'),
      entry: t('marketInfo.technicalAnalysis.strategies.supportResistanceBounce.entry'),
      stopLoss: t('marketInfo.technicalAnalysis.strategies.supportResistanceBounce.stopLoss'),
      takeProfit: t('marketInfo.technicalAnalysis.strategies.supportResistanceBounce.takeProfit'),
      winRate: t('marketInfo.technicalAnalysis.strategies.supportResistanceBounce.winRate'),
      rrRatio: t('marketInfo.technicalAnalysis.strategies.supportResistanceBounce.rrRatio')
    },
    {
      name: t('marketInfo.technicalAnalysis.strategies.breakout.name'),
      description: t('marketInfo.technicalAnalysis.strategies.breakout.description'),
      setup: t('marketInfo.technicalAnalysis.strategies.breakout.setup'),
      entry: t('marketInfo.technicalAnalysis.strategies.breakout.entry'),
      stopLoss: t('marketInfo.technicalAnalysis.strategies.breakout.stopLoss'),
      takeProfit: t('marketInfo.technicalAnalysis.strategies.breakout.takeProfit'),
      winRate: t('marketInfo.technicalAnalysis.strategies.breakout.winRate'),
      rrRatio: t('marketInfo.technicalAnalysis.strategies.breakout.rrRatio')
    }
  ];

  const commonMistakes = [
    {
      mistake: t('marketInfo.technicalAnalysis.mistakes.singleIndicator.mistake'),
      why: t('marketInfo.technicalAnalysis.mistakes.singleIndicator.why'),
      solution: t('marketInfo.technicalAnalysis.mistakes.singleIndicator.solution')
    },
    {
      mistake: t('marketInfo.technicalAnalysis.mistakes.counterTrend.mistake'),
      why: t('marketInfo.technicalAnalysis.mistakes.counterTrend.why'),
      solution: t('marketInfo.technicalAnalysis.mistakes.counterTrend.solution')
    },
    {
      mistake: t('marketInfo.technicalAnalysis.mistakes.higherTimeframes.mistake'),
      why: t('marketInfo.technicalAnalysis.mistakes.higherTimeframes.why'),
      solution: t('marketInfo.technicalAnalysis.mistakes.higherTimeframes.solution')
    },
    {
      mistake: t('marketInfo.technicalAnalysis.mistakes.noConfirmation.mistake'),
      why: t('marketInfo.technicalAnalysis.mistakes.noConfirmation.why'),
      solution: t('marketInfo.technicalAnalysis.mistakes.noConfirmation.solution')
    },
    {
      mistake: t('marketInfo.technicalAnalysis.mistakes.tooManyIndicators.mistake'),
      why: t('marketInfo.technicalAnalysis.mistakes.tooManyIndicators.why'),
      solution: t('marketInfo.technicalAnalysis.mistakes.tooManyIndicators.solution')
    }
  ];

  const faqs = [
    {
      question: t('marketInfo.technicalAnalysis.faq.q1.question'),
      answer: t('marketInfo.technicalAnalysis.faq.q1.answer')
    },
    {
      question: t('marketInfo.technicalAnalysis.faq.q2.question'),
      answer: t('marketInfo.technicalAnalysis.faq.q2.answer')
    },
    {
      question: t('marketInfo.technicalAnalysis.faq.q3.question'),
      answer: t('marketInfo.technicalAnalysis.faq.q3.answer')
    },
    {
      question: t('marketInfo.technicalAnalysis.faq.q4.question'),
      answer: t('marketInfo.technicalAnalysis.faq.q4.answer')
    },
    {
      question: t('marketInfo.technicalAnalysis.faq.q5.question'),
      answer: t('marketInfo.technicalAnalysis.faq.q5.answer')
    },
    {
      question: t('marketInfo.technicalAnalysis.faq.q6.question'),
      answer: t('marketInfo.technicalAnalysis.faq.q6.answer')
    },
    {
      question: t('marketInfo.technicalAnalysis.faq.q7.question'),
      answer: t('marketInfo.technicalAnalysis.faq.q7.answer')
    }
  ];

  return (
    <LandingLayout>
      <VariantSection animation="page">
        <VariantContainer>
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <Badge className="mb-4" data-testid="badge-technical-analysis">{t('marketInfo.technicalAnalysis.badge')}</Badge>
              <VariantHeading level="hero" as="h1" className="mb-4">{t('marketInfo.technicalAnalysis.title')}</VariantHeading>
              <VariantText className="text-muted-foreground max-w-3xl mx-auto">
                {t('marketInfo.technicalAnalysis.description')}
              </VariantText>
            </div>

            {/* Quick Stats */}
            <VariantGrid className="mb-12">
              <VariantCard data-testid="card-stat-patterns">
                <div className="text-3xl font-bold text-primary mb-1">{t('marketInfo.technicalAnalysis.stats.patterns')}</div>
                <p className="text-sm text-muted-foreground">{t('marketInfo.technicalAnalysis.stats.patternsLabel')}</p>
              </VariantCard>
              <VariantCard data-testid="card-stat-indicators">
                <div className="text-3xl font-bold text-primary mb-1">{t('marketInfo.technicalAnalysis.stats.indicators')}</div>
                <p className="text-sm text-muted-foreground">{t('marketInfo.technicalAnalysis.stats.indicatorsLabel')}</p>
              </VariantCard>
              <VariantCard data-testid="card-stat-strategies">
                <div className="text-3xl font-bold text-primary mb-1">{t('marketInfo.technicalAnalysis.stats.strategies')}</div>
                <p className="text-sm text-muted-foreground">{t('marketInfo.technicalAnalysis.stats.strategiesLabel')}</p>
              </VariantCard>
              <VariantCard data-testid="card-stat-accuracy">
                <div className="text-3xl font-bold text-primary mb-1">{t('marketInfo.technicalAnalysis.stats.accuracy')}</div>
                <p className="text-sm text-muted-foreground">{t('marketInfo.technicalAnalysis.stats.accuracyLabel')}</p>
              </VariantCard>
            </VariantGrid>

          {/* Core Concepts */}
          <div className="space-y-8 mb-12">
            {concepts.map((concept) => {
              const Icon = concept.icon;
              return (
                <Card key={concept.title} data-testid={`card-concept-${concept.title.toLowerCase().replace(/\s+/g, '-')}`}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle>{concept.title}</CardTitle>
                        <CardDescription>{concept.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {concept.examples.map((example, index) => (
                        <div key={index} className="p-4 border rounded-lg hover-elevate">
                          <h3 className="font-semibold mb-2">{example.name}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{example.type}</p>
                          <div className="flex justify-between text-xs">
                            <span className="text-primary font-medium">{example.reliability}</span>
                            <span className="text-muted-foreground">{example.timeframe}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Trading Strategies */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                <CardTitle>{t('marketInfo.technicalAnalysis.strategies.title')}</CardTitle>
              </div>
              <CardDescription>{t('marketInfo.technicalAnalysis.strategies.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {tradingStrategies.map((strategy, index) => (
                  <div key={index} className="border-l-4 border-primary pl-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">{strategy.name}</h3>
                      <div className="flex gap-4 text-sm">
                        <Badge variant="outline">{t('marketInfo.technicalAnalysis.strategies.winRate', { rate: strategy.winRate })}</Badge>
                        <Badge variant="outline">{t('marketInfo.technicalAnalysis.strategies.rrRatio', { ratio: strategy.rrRatio })}</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{strategy.description}</p>
                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium mb-1">{t('marketInfo.technicalAnalysis.strategies.setup')}</p>
                        <p className="text-muted-foreground">{strategy.setup}</p>
                      </div>
                      <div>
                        <p className="font-medium mb-1">{t('marketInfo.technicalAnalysis.strategies.entry')}</p>
                        <p className="text-muted-foreground">{strategy.entry}</p>
                      </div>
                      <div>
                        <p className="font-medium mb-1">{t('marketInfo.technicalAnalysis.strategies.stopLoss')}</p>
                        <p className="text-muted-foreground">{strategy.stopLoss}</p>
                      </div>
                      <div>
                        <p className="font-medium mb-1">{t('marketInfo.technicalAnalysis.strategies.takeProfit')}</p>
                        <p className="text-muted-foreground">{strategy.takeProfit}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Common Mistakes */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <CardTitle>{t('marketInfo.technicalAnalysis.mistakes.title')}</CardTitle>
              </div>
              <CardDescription>{t('marketInfo.technicalAnalysis.mistakes.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {commonMistakes.map((item, index) => (
                  <div key={index} className="border-l-4 border-amber-500 pl-4">
                    <h4 className="font-semibold text-amber-600 dark:text-amber-500 mb-1">
                      {index + 1}. {item.mistake}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong>{t('marketInfo.technicalAnalysis.mistakes.whyWrong')}</strong> {item.why}
                    </p>
                    <p className="text-sm text-primary">
                      <strong>{t('marketInfo.technicalAnalysis.mistakes.solution')}</strong> {item.solution}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* How to Use Guide */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <CardTitle>{t('marketInfo.technicalAnalysis.gettingStarted.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">1</div>
                  <p><strong>{t('marketInfo.technicalAnalysis.gettingStarted.step1')}</strong></p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">2</div>
                  <p><strong>{t('marketInfo.technicalAnalysis.gettingStarted.step2')}</strong></p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">3</div>
                  <p><strong>{t('marketInfo.technicalAnalysis.gettingStarted.step3')}</strong></p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">4</div>
                  <p><strong>{t('marketInfo.technicalAnalysis.gettingStarted.step4')}</strong></p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">5</div>
                  <p><strong>{t('marketInfo.technicalAnalysis.gettingStarted.step5')}</strong></p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">6</div>
                  <p><strong>{t('marketInfo.technicalAnalysis.gettingStarted.step6')}</strong></p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <LineChart className="w-5 h-5 text-primary" />
                  <CardTitle>{t('marketInfo.technicalAnalysis.multiTimeframe.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <Alert>
                  <AlertDescription>
                    {t('marketInfo.technicalAnalysis.multiTimeframe.alert')}
                  </AlertDescription>
                </Alert>
                <div>
                  <p className="font-medium mb-2">{t('marketInfo.technicalAnalysis.multiTimeframe.approach')}</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-primary">•</span>
                      <span><strong>{t('marketInfo.technicalAnalysis.multiTimeframe.daily')}</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-primary">•</span>
                      <span><strong>{t('marketInfo.technicalAnalysis.multiTimeframe.h1')}</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-primary">•</span>
                      <span><strong>{t('marketInfo.technicalAnalysis.multiTimeframe.m15')}</strong></span>
                    </li>
                  </ul>
                </div>
                <p className="text-muted-foreground italic">
                  {t('marketInfo.technicalAnalysis.multiTimeframe.example')}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* FAQ */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                <CardTitle>{t('marketInfo.technicalAnalysis.faq.title')}</CardTitle>
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
            <h2 className="text-2xl font-bold mb-4">{t('marketInfo.technicalAnalysis.cta.title')}</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {t('marketInfo.technicalAnalysis.cta.description')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" data-testid="button-start-trading">
                {t('marketInfo.technicalAnalysis.cta.button')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" data-testid="button-learn-more">
                {t('marketInfo.technicalAnalysis.cta.learnMore')}
              </Button>
            </div>
          </div>
          </div>
        </VariantContainer>
      </VariantSection>
    </LandingLayout>
  );
}
