import { LandingLayout } from "@/components/LandingLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, HelpCircle, ArrowRight, Shield, Zap, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLanguage } from "@/hooks/useLanguage";
import { useSiteConfig } from "@/contexts/SiteConfigContext";
import { VariantSection, VariantContainer, VariantHeading, VariantText } from "@/components/variant";

export default function AccountTypesPage() {
  const { t } = useLanguage();
  const { config, loading } = useSiteConfig();
  
  const allAccountTypes = [
    {
      id: 'standard',
      name: t('customer.accountTypes.standard.name'),
      description: t('customer.accountTypes.standard.description'),
      minDeposit: t('customer.accountTypes.standard.minDeposit'),
      leverage: t('customer.accountTypes.standard.leverage'),
      spreads: t('customer.accountTypes.standard.spreads'),
      features: [
        t('customer.accountTypes.standard.feature1'),
        t('customer.accountTypes.standard.feature2'),
        t('customer.accountTypes.standard.feature3'),
        t('customer.accountTypes.standard.feature4'),
        t('customer.accountTypes.standard.feature5'),
        t('customer.accountTypes.standard.feature6'),
        t('customer.accountTypes.standard.feature7'),
        t('customer.accountTypes.standard.feature8')
      ],
      ideal: [
        t('customer.accountTypes.standard.ideal1'),
        t('customer.accountTypes.standard.ideal2'),
        t('customer.accountTypes.standard.ideal3')
      ],
      popular: false,
      color: "blue"
    },
    {
      id: 'professional',
      name: t('customer.accountTypes.professional.name'),
      description: t('customer.accountTypes.professional.description'),
      minDeposit: t('customer.accountTypes.professional.minDeposit'),
      leverage: t('customer.accountTypes.professional.leverage'),
      spreads: t('customer.accountTypes.professional.spreads'),
      features: [
        t('customer.accountTypes.professional.feature1'),
        t('customer.accountTypes.professional.feature2'),
        t('customer.accountTypes.professional.feature3'),
        t('customer.accountTypes.professional.feature4'),
        t('customer.accountTypes.professional.feature5'),
        t('customer.accountTypes.professional.feature6'),
        t('customer.accountTypes.professional.feature7'),
        t('customer.accountTypes.professional.feature8'),
        t('customer.accountTypes.professional.feature9')
      ],
      ideal: [
        t('customer.accountTypes.professional.ideal1'),
        t('customer.accountTypes.professional.ideal2'),
        t('customer.accountTypes.professional.ideal3')
      ],
      popular: true,
      color: "primary"
    },
    {
      id: 'vip',
      name: t('customer.accountTypes.vip.name'),
      description: t('customer.accountTypes.vip.description'),
      minDeposit: t('customer.accountTypes.vip.minDeposit'),
      leverage: t('customer.accountTypes.vip.leverage'),
      spreads: t('customer.accountTypes.vip.spreads'),
      features: [
        t('customer.accountTypes.vip.feature1'),
        t('customer.accountTypes.vip.feature2'),
        t('customer.accountTypes.vip.feature3'),
        t('customer.accountTypes.vip.feature4'),
        t('customer.accountTypes.vip.feature5'),
        t('customer.accountTypes.vip.feature6'),
        t('customer.accountTypes.vip.feature7'),
        t('customer.accountTypes.vip.feature8'),
        t('customer.accountTypes.vip.feature9'),
        t('customer.accountTypes.vip.feature10'),
        t('customer.accountTypes.vip.feature11')
      ],
      ideal: [
        t('customer.accountTypes.vip.ideal1'),
        t('customer.accountTypes.vip.ideal2'),
        t('customer.accountTypes.vip.ideal3')
      ],
      popular: false,
      color: "amber"
    }
  ];

  const accountTypes = loading 
    ? allAccountTypes 
    : allAccountTypes.filter(account => {
        const accountConfig = config.features?.accountTypes?.[account.id];
        return accountConfig?.enabled === true && accountConfig?.visible === true;
      });

  const faqs = [
    {
      question: t('customer.accountTypes.faq.upgrade.question'),
      answer: t('customer.accountTypes.faq.upgrade.answer')
    },
    {
      question: t('customer.accountTypes.faq.executionSpeed.question'),
      answer: t('customer.accountTypes.faq.executionSpeed.answer')
    },
    {
      question: t('customer.accountTypes.faq.fees.question'),
      answer: t('customer.accountTypes.faq.fees.answer')
    },
    {
      question: t('customer.accountTypes.faq.multipleAccounts.question'),
      answer: t('customer.accountTypes.faq.multipleAccounts.answer')
    },
    {
      question: t('customer.accountTypes.faq.minBalance.question'),
      answer: t('customer.accountTypes.faq.minBalance.answer')
    },
    {
      question: t('customer.accountTypes.faq.verification.question'),
      answer: t('customer.accountTypes.faq.verification.answer')
    }
  ];

  return (
    <LandingLayout>
      <VariantSection animation="page">
        <VariantContainer>
          <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <Badge className="mb-4" data-testid="badge-account-types">{t('customer.accountTypes.badge')}</Badge>
            <VariantHeading level="hero" as="h1" className="mb-4">{t('customer.accountTypes.title')}</VariantHeading>
            <VariantText className="text-muted-foreground max-w-3xl mx-auto">
              {t('customer.accountTypes.subtitle')}
            </VariantText>
          </div>

          {/* Who This Is For */}
          <div className="bg-muted rounded-lg p-6 mb-12">
            <h2 className="text-xl font-semibold mb-4">{t('customer.accountTypes.whoFor.title')}</h2>
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-medium mb-1">{t('customer.accountTypes.whoFor.newTraders.title')}</p>
                <p className="text-muted-foreground">{t('customer.accountTypes.whoFor.newTraders.description')}</p>
              </div>
              <div>
                <p className="font-medium mb-1">{t('customer.accountTypes.whoFor.existingClients.title')}</p>
                <p className="text-muted-foreground">{t('customer.accountTypes.whoFor.existingClients.description')}</p>
              </div>
              <div>
                <p className="font-medium mb-1">{t('customer.accountTypes.whoFor.institutional.title')}</p>
                <p className="text-muted-foreground">{t('customer.accountTypes.whoFor.institutional.description')}</p>
              </div>
            </div>
          </div>

          {/* No Account Types Message */}
          {accountTypes.length === 0 && (
            <Alert className="mb-12">
              <AlertDescription>
                <strong>No account types available</strong> - Please contact support for more information about available account options.
              </AlertDescription>
            </Alert>
          )}

          {/* Account Cards */}
          {accountTypes.length > 0 && (
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {accountTypes.map((account) => (
              <Card 
                key={account.name} 
                className={account.popular ? "border-primary shadow-lg relative" : ""}
                data-testid={`card-account-${account.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {account.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">{t('customer.accountTypes.mostPopular')}</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{account.name}</CardTitle>
                  <CardDescription className="text-base">{account.description}</CardDescription>
                  <div className="pt-4">
                    <div className="text-3xl font-bold">{account.minDeposit}</div>
                    <p className="text-sm text-muted-foreground">{t('customer.accountTypes.standard.minDepositLabel')}</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">{t('customer.accountTypes.keyFeatures')}</h4>
                    <ul className="space-y-2">
                      {account.features.slice(0, 6).map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-sm mb-2">{t('customer.accountTypes.idealFor')}</h4>
                    <div className="flex flex-wrap gap-2">
                      {account.ideal.map((type, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full" variant={account.popular ? "default" : "outline"} data-testid={`button-open-${account.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    {t('customer.accountTypes.openAccount', { accountName: account.name })}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          )}

          {/* Detailed Comparison Table */}
          {accountTypes.length > 0 && (
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>{t('customer.accountTypes.comparison.title')}</CardTitle>
              <CardDescription>{t('customer.accountTypes.comparison.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">{t('customer.accountTypes.comparison.feature')}</th>
                      <th className="text-center py-3 px-4 font-semibold">{t('customer.accountTypes.comparison.standard')}</th>
                      <th className="text-center py-3 px-4 font-semibold">{t('customer.accountTypes.comparison.professional')}</th>
                      <th className="text-center py-3 px-4 font-semibold">{t('customer.accountTypes.comparison.vip')}</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">{t('customer.accountTypes.comparison.minDeposit')}</td>
                      <td className="text-center py-3 px-4">$100</td>
                      <td className="text-center py-3 px-4">$5,000</td>
                      <td className="text-center py-3 px-4">$50,000</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">{t('customer.accountTypes.comparison.maxLeverage')}</td>
                      <td className="text-center py-3 px-4">1:100</td>
                      <td className="text-center py-3 px-4">1:500</td>
                      <td className="text-center py-3 px-4">1:500</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">{t('customer.accountTypes.comparison.eurusdSpreads')}</td>
                      <td className="text-center py-3 px-4">1.2 pips</td>
                      <td className="text-center py-3 px-4">0.8 pips</td>
                      <td className="text-center py-3 px-4">0.3 pips</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">{t('customer.accountTypes.comparison.commission')}</td>
                      <td className="text-center py-3 px-4">$0</td>
                      <td className="text-center py-3 px-4">$3.50</td>
                      <td className="text-center py-3 px-4">Custom</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">{t('customer.accountTypes.comparison.executionSpeed')}</td>
                      <td className="text-center py-3 px-4">0.05s</td>
                      <td className="text-center py-3 px-4">0.05s</td>
                      <td className="text-center py-3 px-4">0.05s</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">{t('customer.accountTypes.comparison.accountManager')}</td>
                      <td className="text-center py-3 px-4">-</td>
                      <td className="text-center py-3 px-4"><Check className="w-5 h-5 mx-auto text-primary" /></td>
                      <td className="text-center py-3 px-4"><Check className="w-5 h-5 mx-auto text-primary" /></td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">{t('customer.accountTypes.comparison.tradingSignals')}</td>
                      <td className="text-center py-3 px-4">{t('customer.accountTypes.comparison.tradingSignals.basic')}</td>
                      <td className="text-center py-3 px-4"><Check className="w-5 h-5 mx-auto text-primary" /></td>
                      <td className="text-center py-3 px-4"><Check className="w-5 h-5 mx-auto text-primary" /></td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">{t('customer.accountTypes.comparison.withdrawalProcessing')}</td>
                      <td className="text-center py-3 px-4">{t('customer.accountTypes.comparison.withdrawalProcessing.standard')}</td>
                      <td className="text-center py-3 px-4">{t('customer.accountTypes.comparison.withdrawalProcessing.professional')}</td>
                      <td className="text-center py-3 px-4">{t('customer.accountTypes.comparison.withdrawalProcessing.vip')}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">{t('customer.accountTypes.comparison.marketResearch')}</td>
                      <td className="text-center py-3 px-4">{t('customer.accountTypes.comparison.marketResearch.standard')}</td>
                      <td className="text-center py-3 px-4">{t('customer.accountTypes.comparison.marketResearch.professional')}</td>
                      <td className="text-center py-3 px-4">{t('customer.accountTypes.comparison.marketResearch.vip')}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">{t('customer.accountTypes.comparison.customerSupport')}</td>
                      <td className="text-center py-3 px-4">{t('customer.accountTypes.comparison.customerSupport.standard')}</td>
                      <td className="text-center py-3 px-4">{t('customer.accountTypes.comparison.customerSupport.professional')}</td>
                      <td className="text-center py-3 px-4">{t('customer.accountTypes.comparison.customerSupport.vip')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          )}

          {/* Account Selector Guide */}
          {accountTypes.length > 0 && (
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>{t('customer.accountTypes.selector.title')}</CardTitle>
              <CardDescription>{t('customer.accountTypes.selector.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-4 border rounded-lg">
                  <Shield className="w-8 h-8 text-blue-500 mb-3" />
                  <h3 className="font-semibold mb-2">{t('customer.accountTypes.selector.capital.title')}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{t('customer.accountTypes.selector.capital.description')}</p>
                  <div className="space-y-2 text-sm">
                    <p>• {t('customer.accountTypes.selector.capital.range1')}</p>
                    <p>• {t('customer.accountTypes.selector.capital.range2')}</p>
                    <p>• {t('customer.accountTypes.selector.capital.range3')}</p>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <Zap className="w-8 h-8 text-amber-500 mb-3" />
                  <h3 className="font-semibold mb-2">{t('customer.accountTypes.selector.experience.title')}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{t('customer.accountTypes.selector.experience.description')}</p>
                  <div className="space-y-2 text-sm">
                    <p>• {t('customer.accountTypes.selector.experience.beginner')}</p>
                    <p>• {t('customer.accountTypes.selector.experience.intermediate')}</p>
                    <p>• {t('customer.accountTypes.selector.experience.advanced')}</p>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <TrendingUp className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-semibold mb-2">{t('customer.accountTypes.selector.volume.title')}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{t('customer.accountTypes.selector.volume.description')}</p>
                  <div className="space-y-2 text-sm">
                    <p>• {t('customer.accountTypes.selector.volume.low')}</p>
                    <p>• {t('customer.accountTypes.selector.volume.medium')}</p>
                    <p>• {t('customer.accountTypes.selector.volume.high')}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          )}

          {/* FAQ Section */}
          {accountTypes.length > 0 && (
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
          )}

          {/* Next Steps CTA */}
          {accountTypes.length > 0 && (
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">{t('customer.accountTypes.cta.title')}</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {t('customer.accountTypes.cta.description')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" data-testid="button-open-account">
                {t('customer.accountTypes.cta.openAccount')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" data-testid="button-verification-guide">
                {t('customer.accountTypes.cta.verificationGuide')}
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap gap-6 justify-center text-sm text-muted-foreground">
              <span>✓ {t('customer.accountTypes.cta.opensIn5Min')}</span>
              <span>✓ {t('customer.accountTypes.cta.noHiddenFees')}</span>
              <span>✓ {t('customer.accountTypes.cta.freeUpgrade')}</span>
            </div>
          </div>
          )}
          </div>
        </VariantContainer>
      </VariantSection>
    </LandingLayout>
  );
}
