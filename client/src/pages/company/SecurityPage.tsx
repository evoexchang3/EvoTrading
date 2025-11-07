import { LandingLayout } from "@/components/LandingLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Shield, 
  Lock, 
  Key, 
  Server, 
  Info, 
  HelpCircle,
  CheckCircle,
  AlertTriangle,
  Eye,
  FileCheck,
  Smartphone,
  Globe,
  Database,
  ShieldCheck
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useSiteConfig } from "@/contexts/SiteConfigContext";
import { VariantSection, VariantContainer, VariantGrid, VariantCard, VariantHeading, VariantText, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/variant";

export default function SecurityPage() {
  const { t } = useLanguage();
  const { config, loading } = useSiteConfig();
  
  const supportEmail = loading ? "support@tradingplatform.com" : (config.branding?.supportEmail || "support@tradingplatform.com");

  const stats = [
    {
      label: t('company.security.stats.encryption.label'),
      value: t('company.security.stats.encryption.value'),
      description: t('company.security.stats.encryption.description'),
      icon: Lock,
      testId: "stat-encryption"
    },
    {
      label: t('company.security.stats.2fa.label'),
      value: t('company.security.stats.2fa.value'),
      description: t('company.security.stats.2fa.description'),
      icon: Smartphone,
      testId: "stat-2fa"
    },
    {
      label: t('company.security.stats.audits.label'),
      value: t('company.security.stats.audits.value'),
      description: t('company.security.stats.audits.description'),
      icon: FileCheck,
      testId: "stat-audits"
    },
    {
      label: t('company.security.stats.dataCenters.label'),
      value: t('company.security.stats.dataCenters.value'),
      description: t('company.security.stats.dataCenters.description'),
      icon: Server,
      testId: "stat-datacenters"
    }
  ];

  const securityMeasures = [
    {
      title: t('company.security.measures.sslTls.title'),
      icon: Lock,
      description: t('company.security.measures.sslTls.description'),
      details: [
        {
          feature: t('company.security.measures.sslTls.tls13.feature'),
          description: t('company.security.measures.sslTls.tls13.description')
        },
        {
          feature: t('company.security.measures.sslTls.pfs.feature'),
          description: t('company.security.measures.sslTls.pfs.description')
        },
        {
          feature: t('company.security.measures.sslTls.certPinning.feature'),
          description: t('company.security.measures.sslTls.certPinning.description')
        },
        {
          feature: t('company.security.measures.sslTls.hsts.feature'),
          description: t('company.security.measures.sslTls.hsts.description')
        }
      ]
    },
    {
      title: t('company.security.measures.twoFactor.title'),
      icon: Smartphone,
      description: t('company.security.measures.twoFactor.description'),
      details: [
        {
          feature: t('company.security.measures.twoFactor.appBased.feature'),
          description: t('company.security.measures.twoFactor.appBased.description')
        },
        {
          feature: t('company.security.measures.twoFactor.smsCodes.feature'),
          description: t('company.security.measures.twoFactor.smsCodes.description')
        },
        {
          feature: t('company.security.measures.twoFactor.hardwareKeys.feature'),
          description: t('company.security.measures.twoFactor.hardwareKeys.description')
        },
        {
          feature: t('company.security.measures.twoFactor.biometric.feature'),
          description: t('company.security.measures.twoFactor.biometric.description')
        }
      ]
    },
    {
      title: t('company.security.measures.dataEncryption.title'),
      icon: Database,
      description: t('company.security.measures.dataEncryption.description'),
      details: [
        {
          feature: t('company.security.measures.dataEncryption.aes256.feature'),
          description: t('company.security.measures.dataEncryption.aes256.description')
        },
        {
          feature: t('company.security.measures.dataEncryption.fields.feature'),
          description: t('company.security.measures.dataEncryption.fields.description')
        },
        {
          feature: t('company.security.measures.dataEncryption.kms.feature'),
          description: t('company.security.measures.dataEncryption.kms.description')
        },
        {
          feature: t('company.security.measures.dataEncryption.backups.feature'),
          description: t('company.security.measures.dataEncryption.backups.description')
        }
      ]
    },
    {
      title: t('company.security.measures.threatProtection.title'),
      icon: Shield,
      description: t('company.security.measures.threatProtection.description'),
      details: [
        {
          feature: t('company.security.measures.threatProtection.waf.feature'),
          description: t('company.security.measures.threatProtection.waf.description')
        },
        {
          feature: t('company.security.measures.threatProtection.ddos.feature'),
          description: t('company.security.measures.threatProtection.ddos.description')
        },
        {
          feature: t('company.security.measures.threatProtection.ids.feature'),
          description: t('company.security.measures.threatProtection.ids.description')
        },
        {
          feature: t('company.security.measures.threatProtection.rateLimit.feature'),
          description: t('company.security.measures.threatProtection.rateLimit.description')
        }
      ]
    }
  ];

  const dataProtection = [
    {
      title: t('company.security.dataProtection.gdpr.title'),
      description: t('company.security.dataProtection.gdpr.description'),
      measures: [
        t('company.security.dataProtection.gdpr.measure1'),
        t('company.security.dataProtection.gdpr.measure2'),
        t('company.security.dataProtection.gdpr.measure3'),
        t('company.security.dataProtection.gdpr.measure4'),
        t('company.security.dataProtection.gdpr.measure5'),
        t('company.security.dataProtection.gdpr.measure6'),
        t('company.security.dataProtection.gdpr.measure7')
      ]
    },
    {
      title: t('company.security.dataProtection.handling.title'),
      description: t('company.security.dataProtection.handling.description'),
      measures: [
        t('company.security.dataProtection.handling.measure1'),
        t('company.security.dataProtection.handling.measure2'),
        t('company.security.dataProtection.handling.measure3'),
        t('company.security.dataProtection.handling.measure4'),
        t('company.security.dataProtection.handling.measure5'),
        t('company.security.dataProtection.handling.measure6')
      ]
    },
    {
      title: t('company.security.dataProtection.privacy.title'),
      description: t('company.security.dataProtection.privacy.description'),
      measures: [
        t('company.security.dataProtection.privacy.measure1'),
        t('company.security.dataProtection.privacy.measure2'),
        t('company.security.dataProtection.privacy.measure3'),
        t('company.security.dataProtection.privacy.measure4'),
        t('company.security.dataProtection.privacy.measure5'),
        t('company.security.dataProtection.privacy.measure6')
      ]
    }
  ];

  const userResponsibilities = [
    {
      practice: t('company.security.userPractices.passwords.title'),
      description: t('company.security.userPractices.passwords.description'),
      tips: [
        t('company.security.userPractices.passwords.tip1'),
        t('company.security.userPractices.passwords.tip2'),
        t('company.security.userPractices.passwords.tip3'),
        t('company.security.userPractices.passwords.tip4')
      ]
    },
    {
      practice: t('company.security.userPractices.enable2fa.title'),
      description: t('company.security.userPractices.enable2fa.description'),
      tips: [
        t('company.security.userPractices.enable2fa.tip1'),
        t('company.security.userPractices.enable2fa.tip2'),
        t('company.security.userPractices.enable2fa.tip3'),
        t('company.security.userPractices.enable2fa.tip4')
      ]
    },
    {
      practice: t('company.security.userPractices.phishing.title'),
      description: t('company.security.userPractices.phishing.description'),
      tips: [
        t('company.security.userPractices.phishing.tip1'),
        t('company.security.userPractices.phishing.tip2'),
        t('company.security.userPractices.phishing.tip3'),
        t('company.security.userPractices.phishing.tip4'),
        t('company.security.userPractices.phishing.tip5')
      ]
    },
    {
      practice: t('company.security.userPractices.devices.title'),
      description: t('company.security.userPractices.devices.description'),
      tips: [
        t('company.security.userPractices.devices.tip1'),
        t('company.security.userPractices.devices.tip2'),
        t('company.security.userPractices.devices.tip3'),
        t('company.security.userPractices.devices.tip4'),
        t('company.security.userPractices.devices.tip5')
      ]
    },
    {
      practice: t('company.security.userPractices.monitoring.title'),
      description: t('company.security.userPractices.monitoring.description'),
      tips: [
        t('company.security.userPractices.monitoring.tip1'),
        t('company.security.userPractices.monitoring.tip2'),
        t('company.security.userPractices.monitoring.tip3'),
        t('company.security.userPractices.monitoring.tip4'),
        t('company.security.userPractices.monitoring.tip5')
      ]
    },
    {
      practice: t('company.security.userPractices.thirdParty.title'),
      description: t('company.security.userPractices.thirdParty.description'),
      tips: [
        t('company.security.userPractices.thirdParty.tip1'),
        t('company.security.userPractices.thirdParty.tip2'),
        t('company.security.userPractices.thirdParty.tip3'),
        t('company.security.userPractices.thirdParty.tip4'),
        t('company.security.userPractices.thirdParty.tip5')
      ]
    }
  ];

  const faqs = [
    {
      question: t('company.security.faq.q1.question'),
      answer: t('company.security.faq.q1.answer')
    },
    {
      question: t('company.security.faq.q2.question'),
      answer: t('company.security.faq.q2.answer')
    },
    {
      question: t('company.security.faq.q3.question'),
      answer: t('company.security.faq.q3.answer')
    },
    {
      question: t('company.security.faq.q4.question'),
      answer: t('company.security.faq.q4.answer')
    },
    {
      question: t('company.security.faq.q5.question'),
      answer: t('company.security.faq.q5.answer')
    },
    {
      question: t('company.security.faq.q6.question'),
      answer: t('company.security.faq.q6.answer')
    },
    {
      question: t('company.security.faq.q7.question'),
      answer: t('company.security.faq.q7.answer')
    }
  ];

  return (
    <LandingLayout>
      <VariantSection animation="page">
        <VariantContainer>
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-12">
              <Badge className="mb-4" data-testid="badge-security">{t('company.security.badge')}</Badge>
              <VariantHeading level="hero" as="h1" className="mb-4">{t('company.security.title')}</VariantHeading>
              <VariantText className="text-muted-foreground max-w-3xl mx-auto">
                {t('company.security.description')}
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
          <Alert className="mb-12" data-testid="alert-security-notice">
            <ShieldCheck className="h-4 w-4" />
            <AlertDescription>
              <strong>{t('company.security.notice.title')}</strong> {t('company.security.notice.message')}
            </AlertDescription>
          </Alert>

          {/* Security Measures */}
          <div className="mb-12">
            <VariantHeading level="heading" as="h2" className="mb-6">{t('company.security.measures.title')}</VariantHeading>
            <div className="space-y-6">
              {securityMeasures.map((measure, index) => (
                <VariantCard key={index} data-testid={`card-measure-${index}`}>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <measure.icon className="w-5 h-5 text-primary" />
                      </div>
                      {measure.title}
                    </CardTitle>
                    <CardDescription>{measure.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {measure.details.map((detail, idx) => (
                        <div key={idx} className="border-l-2 border-primary/30 pl-4">
                          <h4 className="font-semibold text-sm mb-1">{detail.feature}</h4>
                          <p className="text-sm text-muted-foreground">{detail.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </VariantCard>
              ))}
            </div>
          </div>

          {/* Data Protection Compliance */}
          <div className="mb-12">
            <VariantHeading level="heading" as="h2" className="mb-6">{t('company.security.dataProtection.title')}</VariantHeading>
            <div className="space-y-6">
              {dataProtection.map((section, index) => (
                <VariantCard key={index} data-testid={`card-protection-${index}`}>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-3">
                      <FileCheck className="w-5 h-5 text-primary" />
                      {section.title}
                    </CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {section.measures.map((measure, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>{measure}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </VariantCard>
              ))}
            </div>
          </div>

          {/* User Security Practices */}
          <div className="mb-12">
            <VariantHeading level="heading" as="h2" className="mb-6">{t('company.security.userPractices.title')}</VariantHeading>
            <p className="text-muted-foreground mb-6">
              {t('company.security.userPractices.description')}
            </p>
            <div className="space-y-6">
              {userResponsibilities.map((practice, index) => (
                <VariantCard key={index} data-testid={`card-practice-${index}`}>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Eye className="w-4 h-4 text-primary" />
                      </div>
                      {practice.practice}
                    </CardTitle>
                    <CardDescription>{practice.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {practice.tips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </VariantCard>
              ))}
            </div>
          </div>

          {/* Security Contact */}
          <Alert className="mb-12 border-amber-500/50" data-testid="alert-report">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <AlertDescription>
              <div className="flex items-center justify-between">
                <span><strong>{t('company.security.reportAlert.title')}</strong> {t('company.security.reportAlert.message')}</span>
              </div>
            </AlertDescription>
          </Alert>

          {/* FAQ Section */}
          <div>
            <VariantHeading level="heading" as="h2" className="mb-6">{t('company.security.faq.title')}</VariantHeading>
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
