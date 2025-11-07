import { LandingLayout } from "@/components/LandingLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Shield, 
  Lock, 
  DollarSign, 
  Building2, 
  Info, 
  CheckCircle,
  AlertTriangle,
  HelpCircle,
  Landmark,
  ShieldCheck,
  TrendingDown,
  FileCheck
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { VariantSection, VariantContainer, VariantGrid, VariantCard, VariantHeading, VariantText, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/variant";

export default function SafetyOfFundsPage() {
  const { t } = useLanguage();

  const stats = [
    {
      label: t('company.safetyOfFunds.stats.segregated.label'),
      value: t('company.safetyOfFunds.stats.segregated.value'),
      description: t('company.safetyOfFunds.stats.segregated.description'),
      icon: Lock,
      testId: "stat-segregated"
    },
    {
      label: t('company.safetyOfFunds.stats.insurance.label'),
      value: t('company.safetyOfFunds.stats.insurance.value'),
      description: t('company.safetyOfFunds.stats.insurance.description'),
      icon: Shield,
      testId: "stat-insurance"
    },
    {
      label: t('company.safetyOfFunds.stats.banks.label'),
      value: t('company.safetyOfFunds.stats.banks.value'),
      description: t('company.safetyOfFunds.stats.banks.description'),
      icon: Building2,
      testId: "stat-banks"
    },
    {
      label: t('company.safetyOfFunds.stats.protection.label'),
      value: t('company.safetyOfFunds.stats.protection.value'),
      description: t('company.safetyOfFunds.stats.protection.description'),
      icon: ShieldCheck,
      testId: "stat-protection"
    }
  ];

  const segregationDetails = {
    overview: t('company.safetyOfFunds.segregation.overview'),
    process: [
      {
        step: t('company.safetyOfFunds.segregation.process.step1.step'),
        description: t('company.safetyOfFunds.segregation.process.step1.description')
      },
      {
        step: t('company.safetyOfFunds.segregation.process.step2.step'),
        description: t('company.safetyOfFunds.segregation.process.step2.description')
      },
      {
        step: t('company.safetyOfFunds.segregation.process.step3.step'),
        description: t('company.safetyOfFunds.segregation.process.step3.description')
      },
      {
        step: t('company.safetyOfFunds.segregation.process.step4.step'),
        description: t('company.safetyOfFunds.segregation.process.step4.description')
      }
    ],
    banks: [
      {
        name: t('company.safetyOfFunds.segregation.bank1.name'),
        country: t('company.safetyOfFunds.segregation.bank1.country'),
        accountType: t('company.safetyOfFunds.segregation.bank1.accountType'),
        tier: t('company.safetyOfFunds.segregation.bank1.tier'),
        protection: t('company.safetyOfFunds.segregation.bank1.protection')
      },
      {
        name: t('company.safetyOfFunds.segregation.bank2.name'),
        country: t('company.safetyOfFunds.segregation.bank2.country'),
        accountType: t('company.safetyOfFunds.segregation.bank2.accountType'),
        tier: t('company.safetyOfFunds.segregation.bank2.tier'),
        protection: t('company.safetyOfFunds.segregation.bank2.protection')
      },
      {
        name: t('company.safetyOfFunds.segregation.bank3.name'),
        country: t('company.safetyOfFunds.segregation.bank3.country'),
        accountType: t('company.safetyOfFunds.segregation.bank3.accountType'),
        tier: t('company.safetyOfFunds.segregation.bank3.tier'),
        protection: t('company.safetyOfFunds.segregation.bank3.protection')
      },
      {
        name: t('company.safetyOfFunds.segregation.bank4.name'),
        country: t('company.safetyOfFunds.segregation.bank4.country'),
        accountType: t('company.safetyOfFunds.segregation.bank4.accountType'),
        tier: t('company.safetyOfFunds.segregation.bank4.tier'),
        protection: t('company.safetyOfFunds.segregation.bank4.protection')
      }
    ]
  };

  const compensationSchemes = [
    {
      scheme: t('company.safetyOfFunds.compensation.fscs.scheme'),
      jurisdiction: t('company.safetyOfFunds.compensation.fscs.jurisdiction'),
      coverage: t('company.safetyOfFunds.compensation.fscs.coverage'),
      description: t('company.safetyOfFunds.compensation.fscs.description'),
      eligibility: [
        t('company.safetyOfFunds.compensation.fscs.eligibility1'),
        t('company.safetyOfFunds.compensation.fscs.eligibility2'),
        t('company.safetyOfFunds.compensation.fscs.eligibility3'),
        t('company.safetyOfFunds.compensation.fscs.eligibility4')
      ],
      claimProcess: t('company.safetyOfFunds.compensation.fscs.claimProcess')
    },
    {
      scheme: t('company.safetyOfFunds.compensation.icf.scheme'),
      jurisdiction: t('company.safetyOfFunds.compensation.icf.jurisdiction'),
      coverage: t('company.safetyOfFunds.compensation.icf.coverage'),
      description: t('company.safetyOfFunds.compensation.icf.description'),
      eligibility: [
        t('company.safetyOfFunds.compensation.icf.eligibility1'),
        t('company.safetyOfFunds.compensation.icf.eligibility2'),
        t('company.safetyOfFunds.compensation.icf.eligibility3'),
        t('company.safetyOfFunds.compensation.icf.eligibility4')
      ],
      claimProcess: t('company.safetyOfFunds.compensation.icf.claimProcess')
    },
    {
      scheme: t('company.safetyOfFunds.compensation.afca.scheme'),
      jurisdiction: t('company.safetyOfFunds.compensation.afca.jurisdiction'),
      coverage: t('company.safetyOfFunds.compensation.afca.coverage'),
      description: t('company.safetyOfFunds.compensation.afca.description'),
      eligibility: [
        t('company.safetyOfFunds.compensation.afca.eligibility1'),
        t('company.safetyOfFunds.compensation.afca.eligibility2'),
        t('company.safetyOfFunds.compensation.afca.eligibility3'),
        t('company.safetyOfFunds.compensation.afca.eligibility4')
      ],
      claimProcess: t('company.safetyOfFunds.compensation.afca.claimProcess')
    }
  ];

  const negativeBalanceProtection = {
    overview: t('company.safetyOfFunds.nbp.overview'),
    coverage: [
      {
        clientType: t('company.safetyOfFunds.nbp.retail.clientType'),
        protection: t('company.safetyOfFunds.nbp.retail.protection'),
        details: t('company.safetyOfFunds.nbp.retail.details')
      },
      {
        clientType: t('company.safetyOfFunds.nbp.professional.clientType'),
        protection: t('company.safetyOfFunds.nbp.professional.protection'),
        details: t('company.safetyOfFunds.nbp.professional.details')
      },
      {
        clientType: t('company.safetyOfFunds.nbp.institutional.clientType'),
        protection: t('company.safetyOfFunds.nbp.institutional.protection'),
        details: t('company.safetyOfFunds.nbp.institutional.details')
      }
    ],
    conditions: [
      t('company.safetyOfFunds.nbp.condition1'),
      t('company.safetyOfFunds.nbp.condition2'),
      t('company.safetyOfFunds.nbp.condition3'),
      t('company.safetyOfFunds.nbp.condition4')
    ],
    examples: [
      {
        scenario: t('company.safetyOfFunds.nbp.example1.scenario'),
        situation: t('company.safetyOfFunds.nbp.example1.situation'),
        outcome: t('company.safetyOfFunds.nbp.example1.outcome')
      },
      {
        scenario: t('company.safetyOfFunds.nbp.example2.scenario'),
        situation: t('company.safetyOfFunds.nbp.example2.situation'),
        outcome: t('company.safetyOfFunds.nbp.example2.outcome')
      }
    ]
  };

  const faqs = [
    {
      question: t('company.safetyOfFunds.faq.q1.question'),
      answer: t('company.safetyOfFunds.faq.q1.answer')
    },
    {
      question: t('company.safetyOfFunds.faq.q2.question'),
      answer: t('company.safetyOfFunds.faq.q2.answer')
    },
    {
      question: t('company.safetyOfFunds.faq.q3.question'),
      answer: t('company.safetyOfFunds.faq.q3.answer')
    },
    {
      question: t('company.safetyOfFunds.faq.q4.question'),
      answer: t('company.safetyOfFunds.faq.q4.answer')
    },
    {
      question: t('company.safetyOfFunds.faq.q5.question'),
      answer: t('company.safetyOfFunds.faq.q5.answer')
    },
    {
      question: t('company.safetyOfFunds.faq.q6.question'),
      answer: t('company.safetyOfFunds.faq.q6.answer')
    },
    {
      question: t('company.safetyOfFunds.faq.q7.question'),
      answer: t('company.safetyOfFunds.faq.q7.answer')
    }
  ];

  return (
    <LandingLayout>
      <VariantSection animation="page">
        <VariantContainer>
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-12">
              <Badge className="mb-4" data-testid="badge-safety">{t('company.safetyOfFunds.badge')}</Badge>
              <VariantHeading level="hero" as="h1" className="mb-4">{t('company.safetyOfFunds.title')}</VariantHeading>
              <VariantText className="text-muted-foreground max-w-3xl mx-auto">
                {t('company.safetyOfFunds.description')}
              </VariantText>
            </div>

            {/* Stats Cards */}
            <VariantGrid className="mb-12">
              {stats.map((stat) => (
                <VariantCard key={stat.label} data-testid={stat.testId}>
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm font-medium mb-1">{stat.label}</div>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </VariantCard>
              ))}
            </VariantGrid>

          {/* Important Notice */}
          <Alert className="mb-12" data-testid="alert-segregation-notice">
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>{t('company.safetyOfFunds.alert.title')}</strong> {t('company.safetyOfFunds.alert.message')}
            </AlertDescription>
          </Alert>

          {/* Segregation Explanation */}
          <div className="mb-12">
            <VariantHeading level="heading" as="h2" className="mb-6">{t('company.safetyOfFunds.segregation.title')}</VariantHeading>
            <Card className="mb-6" data-testid="card-segregation-overview">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-primary" />
                  {t('company.safetyOfFunds.segregation.subtitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">{segregationDetails.overview}</p>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">{t('company.safetyOfFunds.segregation.processTitle')}</h3>
                  {segregationDetails.process.map((item, index) => (
                    <div key={index} className="flex gap-4" data-testid={`segregation-step-${index}`}>
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{item.step}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Bank Partners */}
            <VariantHeading level="heading" as="h3" className="mb-4">{t('company.safetyOfFunds.segregation.bankPartnersTitle')}</VariantHeading>
            <div className="grid md:grid-cols-2 gap-4">
              {segregationDetails.banks.map((bank, index) => (
                <Card key={index} data-testid={`card-bank-${index}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-1">{bank.name}</CardTitle>
                        <CardDescription>{bank.country}</CardDescription>
                      </div>
                      <Badge variant="outline">{bank.tier}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="text-sm">
                      <span className="text-muted-foreground">{t('company.safetyOfFunds.segregation.accountTypeLabel')}</span>
                      <p className="font-medium">{bank.accountType}</p>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">{t('company.safetyOfFunds.segregation.protectionLabel')}</span>
                      <p className="font-medium">{bank.protection}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Compensation Schemes */}
          <div className="mb-12">
            <VariantHeading level="heading" as="h2" className="mb-6">{t('company.safetyOfFunds.compensation.title')}</VariantHeading>
            <div className="space-y-6">
              {compensationSchemes.map((scheme, index) => (
                <Card key={index} data-testid={`card-compensation-${index}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-1">{scheme.scheme}</CardTitle>
                        <CardDescription>{scheme.jurisdiction}</CardDescription>
                      </div>
                      <Badge className="ml-2">{scheme.coverage}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{scheme.description}</p>
                    
                    <div>
                      <h4 className="font-semibold text-sm mb-2">{t('company.safetyOfFunds.compensation.eligibilityTitle')}</h4>
                      <ul className="space-y-1">
                        {scheme.eligibility.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-muted rounded-lg p-3">
                      <p className="text-sm">
                        <span className="font-semibold">{t('company.safetyOfFunds.compensation.claimProcessLabel')} </span>
                        {scheme.claimProcess}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Negative Balance Protection */}
          <div className="mb-12">
            <VariantHeading level="heading" as="h2" className="mb-6">{t('company.safetyOfFunds.nbp.title')}</VariantHeading>
            <Card className="mb-6" data-testid="card-nbp-overview">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-primary" />
                  {t('company.safetyOfFunds.nbp.subtitle')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">{negativeBalanceProtection.overview}</p>

                <div>
                  <h3 className="font-semibold mb-4">{t('company.safetyOfFunds.nbp.coverageTitle')}</h3>
                  <div className="space-y-3">
                    {negativeBalanceProtection.coverage.map((item, index) => (
                      <div key={index} className="border rounded-lg p-4" data-testid={`nbp-coverage-${index}`}>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{item.clientType}</h4>
                          <Badge variant={item.protection.includes('Full') ? 'default' : 'outline'}>
                            {item.protection.includes('Full') ? t('company.safetyOfFunds.nbp.protectedBadge') : t('company.safetyOfFunds.nbp.notProtectedBadge')}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.details}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">{t('company.safetyOfFunds.nbp.conditionsTitle')}</h3>
                  <ul className="space-y-2">
                    {negativeBalanceProtection.conditions.map((condition, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                        <span>{condition}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">{t('company.safetyOfFunds.nbp.examplesTitle')}</h3>
                  <div className="space-y-3">
                    {negativeBalanceProtection.examples.map((example, idx) => (
                      <div key={idx} className="bg-muted rounded-lg p-4">
                        <h4 className="font-semibold text-sm mb-2">{example.scenario}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{example.situation}</p>
                        <p className="text-sm">
                          <span className="font-semibold">{t('company.safetyOfFunds.nbp.outcomeLabel')} </span>
                          {example.outcome}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Warning Alert */}
          <Alert className="mb-12 border-amber-500/50" data-testid="alert-warning">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <AlertDescription>
              <strong>{t('company.safetyOfFunds.warning.title')}</strong> {t('company.safetyOfFunds.warning.message')}
            </AlertDescription>
          </Alert>

          {/* FAQ Section */}
          <div>
            <VariantHeading level="heading" as="h2" className="mb-6">{t('company.safetyOfFunds.faq.title')}</VariantHeading>
            <Accordion type="single" collapsible className="w-full" data-testid="accordion-faq">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left" data-testid={`faq-question-${index}`}>
                    <div className="flex items-start gap-3">
                      <HelpCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pl-8" data-testid={`faq-answer-${index}`}>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          </div>
        </VariantContainer>
      </VariantSection>
    </LandingLayout>
  );
}
