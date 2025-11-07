import { LandingLayout } from "@/components/LandingLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Shield, 
  CheckCircle, 
  FileText, 
  Globe, 
  Info, 
  Award,
  Building,
  AlertTriangle,
  Scale,
  ExternalLink,
  HelpCircle
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { VariantSection, VariantContainer, VariantGrid, VariantCard, VariantHeading, VariantText } from "@/components/variant";

export default function RegulatoryPage() {
  const { t } = useLanguage();

  const stats = [
    {
      label: t('company.regulatory.stats.jurisdictions.label'),
      value: t('company.regulatory.stats.jurisdictions.value'),
      description: t('company.regulatory.stats.jurisdictions.description'),
      icon: Globe,
      testId: "stat-jurisdictions"
    },
    {
      label: t('company.regulatory.stats.years.label'),
      value: t('company.regulatory.stats.years.value'),
      description: t('company.regulatory.stats.years.description'),
      icon: Award,
      testId: "stat-years"
    },
    {
      label: t('company.regulatory.stats.regulators.label'),
      value: t('company.regulatory.stats.regulators.value'),
      description: t('company.regulatory.stats.regulators.description'),
      icon: Building,
      testId: "stat-regulators"
    },
    {
      label: t('company.regulatory.stats.compliance.label'),
      value: t('company.regulatory.stats.compliance.value'),
      description: t('company.regulatory.stats.compliance.description'),
      icon: CheckCircle,
      testId: "stat-compliance"
    }
  ];

  const regulatoryBodies = [
    {
      name: t('company.regulatory.fca.name'),
      country: t('company.regulatory.fca.country'),
      license: t('company.regulatory.fca.license'),
      type: t('company.regulatory.fca.type'),
      description: t('company.regulatory.fca.description'),
      requirements: [
        t('company.regulatory.fca.req1'),
        t('company.regulatory.fca.req2'),
        t('company.regulatory.fca.req3'),
        t('company.regulatory.fca.req4')
      ]
    },
    {
      name: t('company.regulatory.cysec.name'),
      country: t('company.regulatory.cysec.country'),
      license: t('company.regulatory.cysec.license'),
      type: t('company.regulatory.cysec.type'),
      description: t('company.regulatory.cysec.description'),
      requirements: [
        t('company.regulatory.cysec.req1'),
        t('company.regulatory.cysec.req2'),
        t('company.regulatory.cysec.req3'),
        t('company.regulatory.cysec.req4')
      ]
    },
    {
      name: t('company.regulatory.asic.name'),
      country: t('company.regulatory.asic.country'),
      license: t('company.regulatory.asic.license'),
      type: t('company.regulatory.asic.type'),
      description: t('company.regulatory.asic.description'),
      requirements: [
        t('company.regulatory.asic.req1'),
        t('company.regulatory.asic.req2'),
        t('company.regulatory.asic.req3'),
        t('company.regulatory.asic.req4')
      ]
    },
    {
      name: t('company.regulatory.fsca.name'),
      country: t('company.regulatory.fsca.country'),
      license: t('company.regulatory.fsca.license'),
      type: t('company.regulatory.fsca.type'),
      description: t('company.regulatory.fsca.description'),
      requirements: [
        t('company.regulatory.fsca.req1'),
        t('company.regulatory.fsca.req2'),
        t('company.regulatory.fsca.req3'),
        t('company.regulatory.fsca.req4')
      ]
    },
    {
      name: t('company.regulatory.fsa.name'),
      country: t('company.regulatory.fsa.country'),
      license: t('company.regulatory.fsa.license'),
      type: t('company.regulatory.fsa.type'),
      description: t('company.regulatory.fsa.description'),
      requirements: [
        t('company.regulatory.fsa.req1'),
        t('company.regulatory.fsa.req2'),
        t('company.regulatory.fsa.req3'),
        t('company.regulatory.fsa.req4')
      ]
    },
    {
      name: t('company.regulatory.dfsa.name'),
      country: t('company.regulatory.dfsa.country'),
      license: t('company.regulatory.dfsa.license'),
      type: t('company.regulatory.dfsa.type'),
      description: t('company.regulatory.dfsa.description'),
      requirements: [
        t('company.regulatory.dfsa.req1'),
        t('company.regulatory.dfsa.req2'),
        t('company.regulatory.dfsa.req3'),
        t('company.regulatory.dfsa.req4')
      ]
    }
  ];

  const complianceFramework = [
    {
      title: t('company.regulatory.compliance.aml.title'),
      description: t('company.regulatory.compliance.aml.description'),
      measures: [
        t('company.regulatory.compliance.aml.measure1'),
        t('company.regulatory.compliance.aml.measure2'),
        t('company.regulatory.compliance.aml.measure3'),
        t('company.regulatory.compliance.aml.measure4'),
        t('company.regulatory.compliance.aml.measure5')
      ]
    },
    {
      title: t('company.regulatory.compliance.kyc.title'),
      description: t('company.regulatory.compliance.kyc.description'),
      measures: [
        t('company.regulatory.compliance.kyc.measure1'),
        t('company.regulatory.compliance.kyc.measure2'),
        t('company.regulatory.compliance.kyc.measure3'),
        t('company.regulatory.compliance.kyc.measure4'),
        t('company.regulatory.compliance.kyc.measure5')
      ]
    },
    {
      title: t('company.regulatory.compliance.privacy.title'),
      description: t('company.regulatory.compliance.privacy.description'),
      measures: [
        t('company.regulatory.compliance.privacy.measure1'),
        t('company.regulatory.compliance.privacy.measure2'),
        t('company.regulatory.compliance.privacy.measure3'),
        t('company.regulatory.compliance.privacy.measure4'),
        t('company.regulatory.compliance.privacy.measure5')
      ]
    },
    {
      title: t('company.regulatory.compliance.execution.title'),
      description: t('company.regulatory.compliance.execution.description'),
      measures: [
        t('company.regulatory.compliance.execution.measure1'),
        t('company.regulatory.compliance.execution.measure2'),
        t('company.regulatory.compliance.execution.measure3'),
        t('company.regulatory.compliance.execution.measure4'),
        t('company.regulatory.compliance.execution.measure5')
      ]
    }
  ];

  const auditReporting = [
    {
      type: t('company.regulatory.audit.financial.type'),
      frequency: t('company.regulatory.audit.financial.frequency'),
      auditor: t('company.regulatory.audit.financial.auditor'),
      lastCompleted: t('company.regulatory.audit.financial.lastCompleted'),
      nextDue: t('company.regulatory.audit.financial.nextDue'),
      scope: t('company.regulatory.audit.financial.scope')
    },
    {
      type: t('company.regulatory.audit.compliance.type'),
      frequency: t('company.regulatory.audit.compliance.frequency'),
      auditor: t('company.regulatory.audit.compliance.auditor'),
      lastCompleted: t('company.regulatory.audit.compliance.lastCompleted'),
      nextDue: t('company.regulatory.audit.compliance.nextDue'),
      scope: t('company.regulatory.audit.compliance.scope')
    },
    {
      type: t('company.regulatory.audit.security.type'),
      frequency: t('company.regulatory.audit.security.frequency'),
      auditor: t('company.regulatory.audit.security.auditor'),
      lastCompleted: t('company.regulatory.audit.security.lastCompleted'),
      nextDue: t('company.regulatory.audit.security.nextDue'),
      scope: t('company.regulatory.audit.security.scope')
    },
    {
      type: t('company.regulatory.audit.penetration.type'),
      frequency: t('company.regulatory.audit.penetration.frequency'),
      auditor: t('company.regulatory.audit.penetration.auditor'),
      lastCompleted: t('company.regulatory.audit.penetration.lastCompleted'),
      nextDue: t('company.regulatory.audit.penetration.nextDue'),
      scope: t('company.regulatory.audit.penetration.scope')
    }
  ];

  const faqs = [
    {
      question: t('company.regulatory.faq.q1.question'),
      answer: t('company.regulatory.faq.q1.answer')
    },
    {
      question: t('company.regulatory.faq.q2.question'),
      answer: t('company.regulatory.faq.q2.answer')
    },
    {
      question: t('company.regulatory.faq.q3.question'),
      answer: t('company.regulatory.faq.q3.answer')
    },
    {
      question: t('company.regulatory.faq.q4.question'),
      answer: t('company.regulatory.faq.q4.answer')
    },
    {
      question: t('company.regulatory.faq.q5.question'),
      answer: t('company.regulatory.faq.q5.answer')
    },
    {
      question: t('company.regulatory.faq.q6.question'),
      answer: t('company.regulatory.faq.q6.answer')
    },
    {
      question: t('company.regulatory.faq.q7.question'),
      answer: t('company.regulatory.faq.q7.answer')
    }
  ];

  return (
    <LandingLayout>
      <VariantSection animation="page">
        <VariantContainer>
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-12">
              <Badge className="mb-4" data-testid="badge-regulatory">{t('company.regulatory.badge')}</Badge>
              <VariantHeading level="hero" as="h1" className="mb-4">{t('company.regulatory.title')}</VariantHeading>
              <VariantText className="text-muted-foreground max-w-3xl mx-auto">
                {t('company.regulatory.description')}
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
          <Alert className="mb-12" data-testid="alert-regulation-notice">
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>{t('company.regulatory.alert.important')}</strong> {t('company.regulatory.alert.message')}
            </AlertDescription>
          </Alert>

          {/* Regulatory Bodies */}
          <div className="mb-12">
            <VariantHeading level="heading" as="h2" className="mb-6">{t('company.regulatory.licenses.title')}</VariantHeading>
            <div className="grid md:grid-cols-2 gap-6">
              {regulatoryBodies.map((regulator, index) => (
                <Card key={index} data-testid={`card-regulator-${index}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-1">{regulator.name}</CardTitle>
                        <CardDescription>{regulator.country}</CardDescription>
                      </div>
                      <Badge variant="outline" className="ml-2">{regulator.type}</Badge>
                    </div>
                    <div className="bg-muted rounded-md p-3 mt-3">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-mono font-semibold" data-testid={`text-license-${index}`}>{regulator.license}</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6 ml-auto" data-testid={`button-verify-${index}`}>
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{regulator.description}</p>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">{t('company.regulatory.licenses.keyRequirements')}</h4>
                      <ul className="space-y-1">
                        {regulator.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Compliance Framework */}
          <div className="mb-12">
            <VariantHeading level="heading" as="h2" className="mb-6">{t('company.regulatory.compliance.title')}</VariantHeading>
            <div className="grid md:grid-cols-2 gap-6">
              {complianceFramework.map((framework, index) => (
                <Card key={index} data-testid={`card-compliance-${index}`}>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Scale className="w-5 h-5 text-primary" />
                      {framework.title}
                    </CardTitle>
                    <CardDescription>{framework.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {framework.measures.map((measure, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                          <span>{measure}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Audit & Reporting */}
          <Card className="mb-12" data-testid="card-audit-reporting">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                {t('company.regulatory.audit.title')}
              </CardTitle>
              <CardDescription>
                {t('company.regulatory.audit.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {auditReporting.map((audit, index) => (
                  <div key={index} className="border rounded-lg p-4" data-testid={`audit-${index}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{audit.type}</h4>
                        <p className="text-sm text-muted-foreground">{audit.auditor}</p>
                      </div>
                      <Badge variant="outline">{audit.frequency}</Badge>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">{t('company.regulatory.audit.lastCompleted')}</span>
                        <span className="ml-2 font-medium">{audit.lastCompleted}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{t('company.regulatory.audit.nextDue')}</span>
                        <span className="ml-2 font-medium">{audit.nextDue}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3">{audit.scope}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Warning Alert */}
          <Alert className="mb-12 border-amber-500/50" data-testid="alert-warning">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <AlertDescription>
              <strong>{t('company.regulatory.warning.title')}</strong> {t('company.regulatory.warning.message')}
            </AlertDescription>
          </Alert>

          {/* FAQ Section */}
          <div>
            <VariantHeading level="heading" as="h2" className="mb-6">{t('company.regulatory.faq.title')}</VariantHeading>
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
