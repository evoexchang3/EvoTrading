import { LandingLayout } from "@/components/LandingLayout";
import { TrendingUp, Users, BarChart3, Bell, Shield, HelpCircle, ArrowRight, CheckCircle2, BookOpen, Video, LineChart, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLanguage } from "@/hooks/useLanguage";
import { VariantSection, VariantContainer, VariantHeading, VariantText, VariantGrid, VariantCard, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/variant";

export default function TradingAdvicePage() {
  const { t } = useLanguage();
  
  const services = [
    {
      title: t('customer.tradingAdvice.marketAnalysis.title'),
      icon: BarChart3,
      description: t('customer.tradingAdvice.marketAnalysis.description'),
      features: [
        t('customer.tradingAdvice.marketAnalysis.feature1'),
        t('customer.tradingAdvice.marketAnalysis.feature2'),
        t('customer.tradingAdvice.marketAnalysis.feature3'),
        t('customer.tradingAdvice.marketAnalysis.feature4'),
        t('customer.tradingAdvice.marketAnalysis.feature5'),
        t('customer.tradingAdvice.marketAnalysis.feature6')
      ],
      availability: {
        standard: t('customer.tradingAdvice.marketAnalysis.standard'),
        professional: t('customer.tradingAdvice.marketAnalysis.professional'),
        vip: t('customer.tradingAdvice.marketAnalysis.vip')
      }
    },
    {
      title: t('customer.tradingAdvice.tradingSignals.title'),
      icon: TrendingUp,
      description: t('customer.tradingAdvice.tradingSignals.description'),
      features: [
        t('customer.tradingAdvice.tradingSignals.feature1'),
        t('customer.tradingAdvice.tradingSignals.feature2'),
        t('customer.tradingAdvice.tradingSignals.feature3'),
        t('customer.tradingAdvice.tradingSignals.feature4'),
        t('customer.tradingAdvice.tradingSignals.feature5'),
        t('customer.tradingAdvice.tradingSignals.feature6')
      ],
      availability: {
        standard: t('customer.tradingAdvice.tradingSignals.standard'),
        professional: t('customer.tradingAdvice.tradingSignals.professional'),
        vip: t('customer.tradingAdvice.tradingSignals.vip')
      }
    },
    {
      title: t('customer.tradingAdvice.webinars.title'),
      icon: Users,
      description: t('customer.tradingAdvice.webinars.description'),
      features: [
        t('customer.tradingAdvice.webinars.feature1'),
        t('customer.tradingAdvice.webinars.feature2'),
        t('customer.tradingAdvice.webinars.feature3'),
        t('customer.tradingAdvice.webinars.feature4'),
        t('customer.tradingAdvice.webinars.feature5'),
        t('customer.tradingAdvice.webinars.feature6')
      ],
      availability: {
        standard: t('customer.tradingAdvice.webinars.standard'),
        professional: t('customer.tradingAdvice.webinars.professional'),
        vip: t('customer.tradingAdvice.webinars.vip')
      }
    },
    {
      title: t('customer.tradingAdvice.marketAlerts.title'),
      icon: Bell,
      description: t('customer.tradingAdvice.marketAlerts.description'),
      features: [
        t('customer.tradingAdvice.marketAlerts.feature1'),
        t('customer.tradingAdvice.marketAlerts.feature2'),
        t('customer.tradingAdvice.marketAlerts.feature3'),
        t('customer.tradingAdvice.marketAlerts.feature4'),
        t('customer.tradingAdvice.marketAlerts.feature5'),
        t('customer.tradingAdvice.marketAlerts.feature6')
      ],
      availability: {
        standard: t('customer.tradingAdvice.marketAlerts.standard'),
        professional: t('customer.tradingAdvice.marketAlerts.professional'),
        vip: t('customer.tradingAdvice.marketAlerts.vip')
      }
    }
  ];

  const signalPerformance = [
    { month: "January 2025", totalSignals: 87, winRate: "68%", avgRR: "1:2.4", pips: "+420" },
    { month: "December 2024", totalSignals: 92, winRate: "71%", avgRR: "1:2.6", pips: "+510" },
    { month: "November 2024", totalSignals: 89, winRate: "65%", avgRR: "1:2.2", pips: "+380" },
    { month: "October 2024", totalSignals: 95, winRate: "69%", avgRR: "1:2.5", pips: "+445" }
  ];

  const faqs = [
    {
      question: t('customer.tradingAdvice.faq.accuracy.question'),
      answer: t('customer.tradingAdvice.faq.accuracy.answer')
    },
    {
      question: t('customer.tradingAdvice.faq.relySolely.question'),
      answer: t('customer.tradingAdvice.faq.relySolely.answer')
    },
    {
      question: t('customer.tradingAdvice.faq.analysisContent.question'),
      answer: t('customer.tradingAdvice.faq.analysisContent.answer')
    },
    {
      question: t('customer.tradingAdvice.faq.receiveSignals.question'),
      answer: t('customer.tradingAdvice.faq.receiveSignals.answer')
    },
    {
      question: t('customer.tradingAdvice.faq.webinarType.question'),
      answer: t('customer.tradingAdvice.faq.webinarType.answer')
    },
    {
      question: t('customer.tradingAdvice.faq.signalFails.question'),
      answer: t('customer.tradingAdvice.faq.signalFails.answer')
    },
    {
      question: t('customer.tradingAdvice.faq.requestAnalysis.question'),
      answer: t('customer.tradingAdvice.faq.requestAnalysis.answer')
    }
  ];

  return (
    <LandingLayout>
      <VariantSection animation="page">
        <VariantContainer>
          <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <Badge className="mb-4" data-testid="badge-trading-advice">{t('customer.tradingAdvice.badge')}</Badge>
            <VariantHeading level="hero" as="h1" className="mb-4">{t('customer.tradingAdvice.title')}</VariantHeading>
            <VariantText className="text-muted-foreground max-w-3xl mx-auto">
              {t('customer.tradingAdvice.subtitle')}
            </VariantText>
          </div>

          {/* Performance Stats */}
          <VariantGrid className="mb-12">
            <VariantCard data-testid="card-stat-signals">
              <div className="text-3xl font-bold text-primary mb-1">363</div>
              <p className="text-sm text-muted-foreground">{t('customer.tradingAdvice.stats.signals')}</p>
            </VariantCard>
            <VariantCard data-testid="card-stat-winrate">
              <div className="text-3xl font-bold text-primary mb-1">68%</div>
              <p className="text-sm text-muted-foreground">{t('customer.tradingAdvice.stats.winRate')}</p>
            </VariantCard>
            <VariantCard data-testid="card-stat-ratio">
              <div className="text-3xl font-bold text-primary mb-1">1:2.4</div>
              <p className="text-sm text-muted-foreground">{t('customer.tradingAdvice.stats.riskReward')}</p>
            </VariantCard>
            <VariantCard data-testid="card-stat-pips">
              <div className="text-3xl font-bold text-primary mb-1">+1,755</div>
              <p className="text-sm text-muted-foreground">{t('customer.tradingAdvice.stats.pips')}</p>
            </VariantCard>
          </VariantGrid>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Card key={service.title} data-testid={`card-service-${service.title.toLowerCase().replace(/\s+/g, '-')}`}>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle>{service.title}</CardTitle>
                    </div>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">{t('customer.tradingAdvice.common.features')}</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h4 className="font-semibold text-sm mb-2">{t('customer.tradingAdvice.common.availabilityByAccount')}</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t('customer.tradingAdvice.common.standard')}</span>
                          <span className="font-medium">{service.availability.standard}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t('customer.tradingAdvice.common.professional')}</span>
                          <span className="font-medium">{service.availability.professional}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t('customer.tradingAdvice.common.vip')}</span>
                          <span className="font-medium text-primary">{service.availability.vip}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Signal Performance History */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center gap-2">
                <LineChart className="w-5 h-5 text-primary" />
                <CardTitle>{t('customer.tradingAdvice.performance.title')}</CardTitle>
              </div>
              <CardDescription>{t('customer.tradingAdvice.performance.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">{t('customer.tradingAdvice.performance.month')}</th>
                      <th className="text-center py-3 px-4 font-semibold">{t('customer.tradingAdvice.performance.totalSignals')}</th>
                      <th className="text-center py-3 px-4 font-semibold">{t('customer.tradingAdvice.performance.winRate')}</th>
                      <th className="text-center py-3 px-4 font-semibold">{t('customer.tradingAdvice.performance.avgRR')}</th>
                      <th className="text-center py-3 px-4 font-semibold">{t('customer.tradingAdvice.performance.totalPips')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {signalPerformance.map((month, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3 px-4 font-medium">{month.month}</td>
                        <td className="text-center py-3 px-4">{month.totalSignals}</td>
                        <td className="text-center py-3 px-4 font-medium text-primary">{month.winRate}</td>
                        <td className="text-center py-3 px-4">{month.avgRR}</td>
                        <td className="text-center py-3 px-4 font-medium text-primary">{month.pips}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                {t('customer.tradingAdvice.performance.disclaimer')}
              </p>
            </CardContent>
          </Card>

          {/* Educational Resources */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <CardTitle>{t('customer.tradingAdvice.resources.title')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Video className="w-8 h-8 text-primary mb-2" />
                  <h4 className="font-semibold">{t('customer.tradingAdvice.resources.videos.title')}</h4>
                  <p className="text-sm text-muted-foreground">{t('customer.tradingAdvice.resources.videos.description')}</p>
                </div>
                <div className="space-y-2">
                  <Users className="w-8 h-8 text-primary mb-2" />
                  <h4 className="font-semibold">{t('customer.tradingAdvice.resources.liveSessions.title')}</h4>
                  <p className="text-sm text-muted-foreground">{t('customer.tradingAdvice.resources.liveSessions.description')}</p>
                </div>
                <div className="space-y-2">
                  <BarChart3 className="w-8 h-8 text-primary mb-2" />
                  <h4 className="font-semibold">{t('customer.tradingAdvice.resources.guides.title')}</h4>
                  <p className="text-sm text-muted-foreground">{t('customer.tradingAdvice.resources.guides.description')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Risk Disclaimers */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-amber-500" />
                <div>
                  <CardTitle>{t('customer.tradingAdvice.disclaimers.title')}</CardTitle>
                  <CardDescription>{t('customer.tradingAdvice.disclaimers.description')}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>{t('customer.tradingAdvice.disclaimers.highRisk.title')}</strong> {t('customer.tradingAdvice.disclaimers.highRisk.description')}
                </AlertDescription>
              </Alert>

              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold mb-2">{t('customer.tradingAdvice.disclaimers.noGuarantee.title')}</h4>
                  <p className="text-muted-foreground">
                    {t('customer.tradingAdvice.disclaimers.noGuarantee.description')}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">{t('customer.tradingAdvice.disclaimers.notPersonalized.title')}</h4>
                  <p className="text-muted-foreground">
                    {t('customer.tradingAdvice.disclaimers.notPersonalized.description')}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">{t('customer.tradingAdvice.disclaimers.transparency.title')}</h4>
                  <p className="text-muted-foreground">
                    {t('customer.tradingAdvice.disclaimers.transparency.description')}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">{t('customer.tradingAdvice.disclaimers.marketConditions.title')}</h4>
                  <p className="text-muted-foreground">
                    {t('customer.tradingAdvice.disclaimers.marketConditions.description')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
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

          {/* Account Type Comparison */}
          <div className="bg-muted rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">{t('customer.tradingAdvice.accountComparison.title')}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t('customer.tradingAdvice.accountComparison.standard.title')}</CardTitle>
                  <CardDescription>{t('customer.tradingAdvice.accountComparison.standard.description')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>✓ {t('customer.tradingAdvice.accountComparison.standard.feature1')}</p>
                  <p>✓ {t('customer.tradingAdvice.accountComparison.standard.feature2')}</p>
                  <p>✓ {t('customer.tradingAdvice.accountComparison.standard.feature3')}</p>
                  <p>✓ {t('customer.tradingAdvice.accountComparison.standard.feature4')}</p>
                  <p>✓ {t('customer.tradingAdvice.accountComparison.standard.feature5')}</p>
                </CardContent>
              </Card>

              <Card className="border-primary">
                <CardHeader>
                  <Badge className="mb-2">{t('customer.tradingAdvice.accountComparison.professional.mostPopular')}</Badge>
                  <CardTitle>{t('customer.tradingAdvice.accountComparison.professional.title')}</CardTitle>
                  <CardDescription>{t('customer.tradingAdvice.accountComparison.professional.description')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>✓ {t('customer.tradingAdvice.accountComparison.professional.feature1')}</p>
                  <p>✓ {t('customer.tradingAdvice.accountComparison.professional.feature2')}</p>
                  <p>✓ {t('customer.tradingAdvice.accountComparison.professional.feature3')}</p>
                  <p>✓ {t('customer.tradingAdvice.accountComparison.professional.feature4')}</p>
                  <p>✓ {t('customer.tradingAdvice.accountComparison.professional.feature5')}</p>
                  <p>✓ {t('customer.tradingAdvice.accountComparison.professional.feature6')}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t('customer.tradingAdvice.accountComparison.vip.title')}</CardTitle>
                  <CardDescription>{t('customer.tradingAdvice.accountComparison.vip.description')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>✓ {t('customer.tradingAdvice.accountComparison.vip.feature1')}</p>
                  <p>✓ {t('customer.tradingAdvice.accountComparison.vip.feature2')}</p>
                  <p>✓ {t('customer.tradingAdvice.accountComparison.vip.feature3')}</p>
                  <p>✓ {t('customer.tradingAdvice.accountComparison.vip.feature4')}</p>
                  <p>✓ {t('customer.tradingAdvice.accountComparison.vip.feature5')}</p>
                  <p>✓ {t('customer.tradingAdvice.accountComparison.vip.feature6')}</p>
                  <p>✓ {t('customer.tradingAdvice.accountComparison.vip.feature7')}</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">{t('customer.tradingAdvice.cta.title')}</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {t('customer.tradingAdvice.cta.description')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" data-testid="button-get-signals">
                {t('customer.tradingAdvice.cta.getSignals')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" data-testid="button-view-performance">
                {t('customer.tradingAdvice.cta.viewPerformance')}
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap gap-6 justify-center text-sm text-muted-foreground">
              <span>✓ {t('customer.tradingAdvice.cta.winRate')}</span>
              <span>✓ {t('customer.tradingAdvice.cta.riskReward')}</span>
              <span>✓ {t('customer.tradingAdvice.cta.transparency')}</span>
            </div>
          </div>
          </div>
        </VariantContainer>
      </VariantSection>
    </LandingLayout>
  );
}
