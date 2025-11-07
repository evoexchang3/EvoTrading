import { LandingLayout } from "@/components/LandingLayout";
import { CreditCard, Building2, Smartphone, Bitcoin, HelpCircle, ArrowRight, Clock, DollarSign, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLanguage } from "@/hooks/useLanguage";
import { useSiteConfig } from "@/contexts/SiteConfigContext";
import { VariantSection, VariantContainer, VariantHeading, VariantText, VariantGrid, VariantCard, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/variant";

export default function PaymentMethodsPage() {
  const { t } = useLanguage();
  const { config, loading } = useSiteConfig();
  
  const allPaymentMethods = [
    {
      categoryId: 'bankTransfer',
      category: t('customer.paymentMethods.bankTransfer.category'),
      icon: Building2,
      description: t('customer.paymentMethods.bankTransfer.description'),
      recommended: true,
      methods: [
        {
          id: 'international',
          name: t('customer.paymentMethods.bankTransfer.international.name'),
          processingTime: t('customer.paymentMethods.bankTransfer.international.processingTime'),
          minDeposit: t('customer.paymentMethods.bankTransfer.international.minDeposit'),
          maxDeposit: t('customer.paymentMethods.bankTransfer.international.maxDeposit'),
          fees: t('customer.paymentMethods.bankTransfer.international.fees'),
          currencies: t('customer.paymentMethods.bankTransfer.international.currencies'),
          limits: t('customer.paymentMethods.bankTransfer.international.limits'),
          security: t('customer.paymentMethods.bankTransfer.international.security')
        },
        {
          id: 'local',
          name: t('customer.paymentMethods.bankTransfer.local.name'),
          processingTime: t('customer.paymentMethods.bankTransfer.local.processingTime'),
          minDeposit: t('customer.paymentMethods.bankTransfer.local.minDeposit'),
          maxDeposit: t('customer.paymentMethods.bankTransfer.local.maxDeposit'),
          fees: t('customer.paymentMethods.bankTransfer.local.fees'),
          currencies: t('customer.paymentMethods.bankTransfer.local.currencies'),
          limits: t('customer.paymentMethods.bankTransfer.local.limits'),
          security: t('customer.paymentMethods.bankTransfer.local.security')
        }
      ]
    },
    {
      categoryId: 'cards',
      category: t('customer.paymentMethods.cards.category'),
      icon: CreditCard,
      description: t('customer.paymentMethods.cards.description'),
      recommended: false,
      methods: [
        {
          id: 'visa',
          name: t('customer.paymentMethods.cards.visa.name'),
          processingTime: t('customer.paymentMethods.cards.visa.processingTime'),
          minDeposit: t('customer.paymentMethods.cards.visa.minDeposit'),
          maxDeposit: t('customer.paymentMethods.cards.visa.maxDeposit'),
          fees: t('customer.paymentMethods.cards.visa.fees'),
          currencies: t('customer.paymentMethods.cards.visa.currencies'),
          limits: t('customer.paymentMethods.cards.visa.limits'),
          security: t('customer.paymentMethods.cards.visa.security')
        },
        {
          id: 'mastercard',
          name: t('customer.paymentMethods.cards.mastercard.name') || 'Mastercard',
          processingTime: t('customer.paymentMethods.cards.visa.processingTime'),
          minDeposit: t('customer.paymentMethods.cards.visa.minDeposit'),
          maxDeposit: t('customer.paymentMethods.cards.visa.maxDeposit'),
          fees: t('customer.paymentMethods.cards.visa.fees'),
          currencies: t('customer.paymentMethods.cards.visa.currencies'),
          limits: t('customer.paymentMethods.cards.visa.limits'),
          security: t('customer.paymentMethods.cards.visa.security')
        },
        {
          id: 'debit',
          name: t('customer.paymentMethods.cards.debit.name'),
          processingTime: t('customer.paymentMethods.cards.debit.processingTime'),
          minDeposit: t('customer.paymentMethods.cards.debit.minDeposit'),
          maxDeposit: t('customer.paymentMethods.cards.debit.maxDeposit'),
          fees: t('customer.paymentMethods.cards.debit.fees'),
          currencies: t('customer.paymentMethods.cards.debit.currencies'),
          limits: t('customer.paymentMethods.cards.debit.limits'),
          security: t('customer.paymentMethods.cards.debit.security')
        }
      ]
    },
    {
      categoryId: 'ewallets',
      category: t('customer.paymentMethods.ewallets.category'),
      icon: Smartphone,
      description: t('customer.paymentMethods.ewallets.description'),
      recommended: false,
      methods: [
        {
          id: 'skrill',
          name: t('customer.paymentMethods.ewallets.skrill.name'),
          processingTime: t('customer.paymentMethods.ewallets.skrill.processingTime'),
          minDeposit: t('customer.paymentMethods.ewallets.skrill.minDeposit'),
          maxDeposit: t('customer.paymentMethods.ewallets.skrill.maxDeposit'),
          fees: t('customer.paymentMethods.ewallets.skrill.fees'),
          currencies: t('customer.paymentMethods.ewallets.skrill.currencies'),
          limits: t('customer.paymentMethods.ewallets.skrill.limits'),
          security: t('customer.paymentMethods.ewallets.skrill.security')
        },
        {
          id: 'neteller',
          name: t('customer.paymentMethods.ewallets.neteller.name'),
          processingTime: t('customer.paymentMethods.ewallets.neteller.processingTime'),
          minDeposit: t('customer.paymentMethods.ewallets.neteller.minDeposit'),
          maxDeposit: t('customer.paymentMethods.ewallets.neteller.maxDeposit'),
          fees: t('customer.paymentMethods.ewallets.neteller.fees'),
          currencies: t('customer.paymentMethods.ewallets.neteller.currencies'),
          limits: t('customer.paymentMethods.ewallets.neteller.limits'),
          security: t('customer.paymentMethods.ewallets.neteller.security')
        },
        {
          id: 'paypal',
          name: t('customer.paymentMethods.ewallets.paypal.name'),
          processingTime: t('customer.paymentMethods.ewallets.paypal.processingTime'),
          minDeposit: t('customer.paymentMethods.ewallets.paypal.minDeposit'),
          maxDeposit: t('customer.paymentMethods.ewallets.paypal.maxDeposit'),
          fees: t('customer.paymentMethods.ewallets.paypal.fees'),
          currencies: t('customer.paymentMethods.ewallets.paypal.currencies'),
          limits: t('customer.paymentMethods.ewallets.paypal.limits'),
          security: t('customer.paymentMethods.ewallets.paypal.security')
        }
      ]
    },
    {
      categoryId: 'crypto',
      category: t('customer.paymentMethods.crypto.category'),
      icon: Bitcoin,
      description: t('customer.paymentMethods.crypto.description'),
      recommended: false,
      methods: [
        {
          id: 'bitcoin',
          name: t('customer.paymentMethods.crypto.bitcoin.name'),
          processingTime: t('customer.paymentMethods.crypto.bitcoin.processingTime'),
          minDeposit: t('customer.paymentMethods.crypto.bitcoin.minDeposit'),
          maxDeposit: t('customer.paymentMethods.crypto.bitcoin.maxDeposit'),
          fees: t('customer.paymentMethods.crypto.bitcoin.fees'),
          currencies: t('customer.paymentMethods.crypto.bitcoin.currencies'),
          limits: t('customer.paymentMethods.crypto.bitcoin.limits'),
          security: t('customer.paymentMethods.crypto.bitcoin.security')
        },
        {
          id: 'ethereum',
          name: t('customer.paymentMethods.crypto.ethereum.name'),
          processingTime: t('customer.paymentMethods.crypto.ethereum.processingTime'),
          minDeposit: t('customer.paymentMethods.crypto.ethereum.minDeposit'),
          maxDeposit: t('customer.paymentMethods.crypto.ethereum.maxDeposit'),
          fees: t('customer.paymentMethods.crypto.ethereum.fees'),
          currencies: t('customer.paymentMethods.crypto.ethereum.currencies'),
          limits: t('customer.paymentMethods.crypto.ethereum.limits'),
          security: t('customer.paymentMethods.crypto.ethereum.security')
        },
        {
          id: 'usdt',
          name: t('customer.paymentMethods.crypto.usdt.name'),
          processingTime: t('customer.paymentMethods.crypto.usdt.processingTime'),
          minDeposit: t('customer.paymentMethods.crypto.usdt.minDeposit'),
          maxDeposit: t('customer.paymentMethods.crypto.usdt.maxDeposit'),
          fees: t('customer.paymentMethods.crypto.usdt.fees'),
          currencies: t('customer.paymentMethods.crypto.usdt.currencies'),
          limits: t('customer.paymentMethods.crypto.usdt.limits'),
          security: t('customer.paymentMethods.crypto.usdt.security')
        }
      ]
    }
  ];

  const paymentMethods = loading 
    ? allPaymentMethods 
    : allPaymentMethods
        .filter(category => {
          const categoryConfig = config.features?.paymentMethods?.[category.categoryId];
          return categoryConfig?.enabled === true;
        })
        .map(category => {
          const categoryConfig = config.features?.paymentMethods?.[category.categoryId];
          const filteredMethods = category.methods.filter(method => {
            return categoryConfig?.[method.id] === true;
          });
          
          return {
            ...category,
            methods: filteredMethods
          };
        })
        .filter(category => category.methods.length > 0);

  const faqs = [
    {
      question: t('customer.paymentMethods.faq.depositTime.question'),
      answer: t('customer.paymentMethods.faq.depositTime.answer')
    },
    {
      question: t('customer.paymentMethods.faq.fees.question'),
      answer: t('customer.paymentMethods.faq.fees.answer')
    },
    {
      question: t('customer.paymentMethods.faq.differentMethod.question'),
      answer: t('customer.paymentMethods.faq.differentMethod.answer')
    },
    {
      question: t('customer.paymentMethods.faq.withdrawalLimits.question'),
      answer: t('customer.paymentMethods.faq.withdrawalLimits.answer')
    },
    {
      question: t('customer.paymentMethods.faq.verification.question'),
      answer: t('customer.paymentMethods.faq.verification.answer')
    },
    {
      question: t('customer.paymentMethods.faq.fundSafety.question'),
      answer: t('customer.paymentMethods.faq.fundSafety.answer')
    }
  ];

  return (
    <LandingLayout>
      <VariantSection animation="page">
        <VariantContainer>
          <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <Badge className="mb-4" data-testid="badge-payment-methods">{t('customer.paymentMethods.badge')}</Badge>
            <VariantHeading level="hero" as="h1" className="mb-4">{t('customer.paymentMethods.title')}</VariantHeading>
            <VariantText className="text-muted-foreground max-w-3xl mx-auto">
              {t('customer.paymentMethods.subtitle')}
            </VariantText>
          </div>

          {/* Quick Summary Stats */}
          <VariantGrid className="mb-12">
            <VariantCard data-testid="card-stat-methods">
              <div className="text-3xl font-bold text-primary mb-1">12+</div>
              <p className="text-sm text-muted-foreground">{t('customer.paymentMethods.stats.methods')}</p>
            </VariantCard>
            <VariantCard data-testid="card-stat-currencies">
              <div className="text-3xl font-bold text-primary mb-1">40+</div>
              <p className="text-sm text-muted-foreground">{t('customer.paymentMethods.stats.currencies')}</p>
            </VariantCard>
            <VariantCard data-testid="card-stat-processing">
              <div className="text-3xl font-bold text-primary mb-1">&lt;1hr</div>
              <p className="text-sm text-muted-foreground">{t('customer.paymentMethods.stats.depositTime')}</p>
            </VariantCard>
            <VariantCard data-testid="card-stat-minimum">
              <div className="text-3xl font-bold text-primary mb-1">$10</div>
              <p className="text-sm text-muted-foreground">{t('customer.paymentMethods.stats.minDeposit')}</p>
            </VariantCard>
          </VariantGrid>

          {/* No Payment Methods Message */}
          {paymentMethods.length === 0 && (
            <Alert className="mb-12">
              <AlertDescription>
                <strong>No payment methods available</strong> - Please contact support for information about available deposit and withdrawal options.
              </AlertDescription>
            </Alert>
          )}

          {/* Payment Methods Details */}
          {paymentMethods.length > 0 && (
          <div className="space-y-8 mb-12">
            {paymentMethods.map((category) => {
              const Icon = category.icon;
              return (
                <VariantCard key={category.category} data-testid={`card-payment-${category.category.toLowerCase().replace(/\s+/g, '-')}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle>{category.category}</CardTitle>
                          <CardDescription>{category.description}</CardDescription>
                        </div>
                      </div>
                      {category.recommended && (
                        <Badge variant="default">{t('customer.paymentMethods.bankTransfer.recommended')}</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {category.methods.map((method) => (
                        <div key={method.name} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-4">
                            <h3 className="font-semibold text-lg">{method.name}</h3>
                            <Badge variant="outline" className="ml-2">
                              <Clock className="w-3 h-3 mr-1" />
                              {method.processingTime}
                            </Badge>
                          </div>
                          
                          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                            <div className="space-y-1">
                              <p className="text-muted-foreground flex items-center gap-1">
                                <DollarSign className="w-3 h-3" /> {t('customer.paymentMethods.fields.minMaxDeposit')}
                              </p>
                              <p className="font-medium">{method.minDeposit} / {method.maxDeposit}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-muted-foreground">{t('customer.paymentMethods.fields.fees')}</p>
                              <p className="font-medium">{method.fees}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-muted-foreground">{t('customer.paymentMethods.fields.currencies')}</p>
                              <p className="font-medium">{method.currencies}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-muted-foreground">{t('customer.paymentMethods.fields.transactionLimits')}</p>
                              <p className="font-medium">{method.limits}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-muted-foreground flex items-center gap-1">
                                <Shield className="w-3 h-3" /> {t('customer.paymentMethods.fields.security')}
                              </p>
                              <p className="font-medium">{method.security}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </VariantCard>
              );
            })}
          </div>
          )}

          {/* Step by Step Guide */}
          {paymentMethods.length > 0 && (
          <VariantCard className="mb-12">
            <CardHeader>
              <CardTitle>📝 {t('customer.paymentMethods.guide.title')}</CardTitle>
              <CardDescription>{t('customer.paymentMethods.guide.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
                  <div>
                    <h4 className="font-semibold mb-1">{t('customer.paymentMethods.guide.step1.title')}</h4>
                    <p className="text-sm text-muted-foreground">{t('customer.paymentMethods.guide.step1.description')}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
                  <div>
                    <h4 className="font-semibold mb-1">{t('customer.paymentMethods.guide.step2.title')}</h4>
                    <p className="text-sm text-muted-foreground">{t('customer.paymentMethods.guide.step2.description')}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
                  <div>
                    <h4 className="font-semibold mb-1">{t('customer.paymentMethods.guide.step3.title')}</h4>
                    <p className="text-sm text-muted-foreground">{t('customer.paymentMethods.guide.step3.description')}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">4</div>
                  <div>
                    <h4 className="font-semibold mb-1">{t('customer.paymentMethods.guide.step4.title')}</h4>
                    <p className="text-sm text-muted-foreground">{t('customer.paymentMethods.guide.step4.description')}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">5</div>
                  <div>
                    <h4 className="font-semibold mb-1">{t('customer.paymentMethods.guide.step5.title')}</h4>
                    <p className="text-sm text-muted-foreground">{t('customer.paymentMethods.guide.step5.description')}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </VariantCard>
          )}

          {/* Important Notices */}
          {paymentMethods.length > 0 && (
          <div className="space-y-4 mb-12">
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                <strong>{t('customer.paymentMethods.notice.security.title')}</strong> {t('customer.paymentMethods.notice.security.description')}
              </AlertDescription>
            </Alert>

            <Alert>
              <Clock className="h-4 w-4" />
              <AlertDescription>
                <strong>{t('customer.paymentMethods.notice.processing.title')}</strong> {t('customer.paymentMethods.notice.processing.description')}
              </AlertDescription>
            </Alert>
          </div>
          )}

          {/* FAQ Section */}
          {paymentMethods.length > 0 && (
          <VariantCard className="mb-12">
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
          </VariantCard>
          )}

          {/* CTA Section */}
          {paymentMethods.length > 0 && (
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">{t('customer.paymentMethods.cta.title')}</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {t('customer.paymentMethods.cta.description')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" data-testid="button-make-deposit">
                {t('customer.paymentMethods.cta.makeDeposit')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" data-testid="button-view-account-types">
                {t('customer.paymentMethods.cta.viewAccountTypes')}
              </Button>
            </div>
          </div>
          )}
          </div>
        </VariantContainer>
      </VariantSection>
    </LandingLayout>
  );
}
