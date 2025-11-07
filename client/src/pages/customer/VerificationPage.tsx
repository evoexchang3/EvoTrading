import { LandingLayout } from "@/components/LandingLayout";
import { FileText, Camera, CheckCircle2, Clock, HelpCircle, ArrowRight, AlertTriangle, Shield, FileCheck, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLanguage } from "@/hooks/useLanguage";
import { VariantSection, VariantContainer, VariantHeading, VariantText, VariantGrid, VariantCard, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/variant";

export default function VerificationPage() {
  const { t } = useLanguage();
  
  const steps = [
    {
      number: 1,
      title: t('customer.verification.step1.title'),
      description: t('customer.verification.step1.description'),
      icon: FileText,
      time: t('customer.verification.step1.time'),
      details: t('customer.verification.step1.details')
    },
    {
      number: 2,
      title: t('customer.verification.step2.title'),
      description: t('customer.verification.step2.description'),
      icon: Camera,
      time: t('customer.verification.step2.time'),
      details: t('customer.verification.step2.details')
    },
    {
      number: 3,
      title: t('customer.verification.step3.title'),
      description: t('customer.verification.step3.description'),
      icon: FileText,
      time: t('customer.verification.step3.time'),
      details: t('customer.verification.step3.details')
    },
    {
      number: 4,
      title: t('customer.verification.step4.title'),
      description: t('customer.verification.step4.description'),
      icon: CheckCircle2,
      time: t('customer.verification.step4.time'),
      details: t('customer.verification.step4.details')
    }
  ];

  const requirements = {
    identityDocuments: [
      { name: t('customer.verification.identityDocs.passport'), accepted: true, note: t('customer.verification.identityDocs.passport.note') },
      { name: t('customer.verification.identityDocs.nationalId'), accepted: true, note: t('customer.verification.identityDocs.nationalId.note') },
      { name: t('customer.verification.identityDocs.driversLicense'), accepted: true, note: t('customer.verification.identityDocs.driversLicense.note') },
      { name: t('customer.verification.identityDocs.militaryId'), accepted: true, note: t('customer.verification.identityDocs.militaryId.note') }
    ],
    proofOfAddress: [
      { name: t('customer.verification.addressDocs.utility'), accepted: true, note: t('customer.verification.addressDocs.utility.note') },
      { name: t('customer.verification.addressDocs.bank'), accepted: true, note: t('customer.verification.addressDocs.bank.note') },
      { name: t('customer.verification.addressDocs.government'), accepted: true, note: t('customer.verification.addressDocs.government.note') },
      { name: t('customer.verification.addressDocs.creditCard'), accepted: true, note: t('customer.verification.addressDocs.creditCard.note') },
      { name: t('customer.verification.addressDocs.rental'), accepted: true, note: t('customer.verification.addressDocs.rental.note') },
      { name: t('customer.verification.addressDocs.mortgage'), accepted: true, note: t('customer.verification.addressDocs.mortgage.note') }
    ],
    photoGuidelines: [
      t('customer.verification.photoGuidelines.1'),
      t('customer.verification.photoGuidelines.2'),
      t('customer.verification.photoGuidelines.3'),
      t('customer.verification.photoGuidelines.4'),
      t('customer.verification.photoGuidelines.5'),
      t('customer.verification.photoGuidelines.6'),
      t('customer.verification.photoGuidelines.7'),
      t('customer.verification.photoGuidelines.8')
    ]
  };

  const commonIssues = [
    {
      issue: t('customer.verification.commonIssues.expired.issue'),
      solution: t('customer.verification.commonIssues.expired.solution'),
      prevention: t('customer.verification.commonIssues.expired.prevention')
    },
    {
      issue: t('customer.verification.commonIssues.poorQuality.issue'),
      solution: t('customer.verification.commonIssues.poorQuality.solution'),
      prevention: t('customer.verification.commonIssues.poorQuality.prevention')
    },
    {
      issue: t('customer.verification.commonIssues.addressMismatch.issue'),
      solution: t('customer.verification.commonIssues.addressMismatch.solution'),
      prevention: t('customer.verification.commonIssues.addressMismatch.prevention')
    },
    {
      issue: t('customer.verification.commonIssues.tooOld.issue'),
      solution: t('customer.verification.commonIssues.tooOld.solution'),
      prevention: t('customer.verification.commonIssues.tooOld.prevention')
    },
    {
      issue: t('customer.verification.commonIssues.missingPages.issue'),
      solution: t('customer.verification.commonIssues.missingPages.solution'),
      prevention: t('customer.verification.commonIssues.missingPages.prevention')
    }
  ];

  const faqs = [
    {
      question: t('customer.verification.faq.required.question'),
      answer: t('customer.verification.faq.required.answer')
    },
    {
      question: t('customer.verification.faq.howLong.question'),
      answer: t('customer.verification.faq.howLong.answer')
    },
    {
      question: t('customer.verification.faq.tradeBeforeVerify.question'),
      answer: t('customer.verification.faq.tradeBeforeVerify.answer')
    },
    {
      question: t('customer.verification.faq.rejected.question'),
      answer: t('customer.verification.faq.rejected.answer')
    },
    {
      question: t('customer.verification.faq.secure.question'),
      answer: t('customer.verification.faq.secure.answer')
    },
    {
      question: t('customer.verification.faq.changeAddress.question'),
      answer: t('customer.verification.faq.changeAddress.answer')
    },
    {
      question: t('customer.verification.faq.thirdParty.question'),
      answer: t('customer.verification.faq.thirdParty.answer')
    }
  ];

  return (
    <LandingLayout>
      <VariantSection animation="page">
        <VariantContainer>
          <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <Badge className="mb-4" data-testid="badge-verification">{t('customer.verification.badge')}</Badge>
            <VariantHeading level="hero" as="h1" className="mb-4">{t('customer.verification.title')}</VariantHeading>
            <VariantText className="text-muted-foreground max-w-3xl mx-auto">
              {t('customer.verification.subtitle')}
            </VariantText>
          </div>

          {/* Timeline Progress */}
          <div className="bg-muted rounded-lg p-6 mb-12">
            <h2 className="text-xl font-semibold mb-6 text-center">{t('customer.verification.timeline.title')}</h2>
            <div className="flex justify-between items-center max-w-4xl mx-auto">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-2">
                      {step.number}
                    </div>
                    <p className="text-xs text-center font-medium max-w-[100px]">{step.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{step.time}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-12 h-0.5 bg-border mx-2 hidden md:block" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Steps */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{t('customer.verification.processDetails.title')}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <Card key={step.number} data-testid={`card-step-${step.number}`}>
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                          {step.number}
                        </div>
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                      <CardDescription>{step.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">{step.details}</p>
                      <div className="flex items-center gap-2 text-sm font-medium text-primary">
                        <Clock className="w-4 h-4" />
                        <span>{t('customer.verification.estimatedTime', { time: step.time })}</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Document Requirements */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-primary" />
                  <CardTitle>{t('customer.verification.identityDocs.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {requirements.identityDocuments.map((doc, index) => (
                    <li key={index} className="flex items-start gap-3 p-2 rounded-lg hover-elevate">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{doc.note}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-primary" />
                  <CardTitle>{t('customer.verification.addressDocs.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {requirements.proofOfAddress.map((doc, index) => (
                    <li key={index} className="flex items-start gap-3 p-2 rounded-lg hover-elevate">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{doc.note}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <Alert className="mt-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    {t('customer.verification.addressDocs.dateRequirement')}
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>

          {/* Photo Guidelines */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-primary" />
                <CardTitle>{t('customer.verification.photoGuidelines.title')}</CardTitle>
              </div>
              <CardDescription>{t('customer.verification.photoGuidelines.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="grid sm:grid-cols-2 gap-3">
                {requirements.photoGuidelines.map((guideline, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{guideline}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  {t('customer.verification.photoGuidelines.proTips.title')}
                </h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• {t('customer.verification.photoGuidelines.proTips.1')}</li>
                  <li>• {t('customer.verification.photoGuidelines.proTips.2')}</li>
                  <li>• {t('customer.verification.photoGuidelines.proTips.3')}</li>
                  <li>• {t('customer.verification.photoGuidelines.proTips.4')}</li>
                  <li>• {t('customer.verification.photoGuidelines.proTips.5')}</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Common Issues & Solutions */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <CardTitle>{t('customer.verification.commonIssues.title')}</CardTitle>
              </div>
              <CardDescription>{t('customer.verification.commonIssues.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {commonIssues.map((item, index) => (
                  <div key={index} className="border-l-4 border-amber-500 pl-4 py-2">
                    <h4 className="font-semibold text-amber-600 dark:text-amber-500 mb-1">{item.issue}</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong>{t('customer.verification.commonIssues.solution')}</strong> {item.solution}
                    </p>
                    <p className="text-sm text-primary">
                      <strong>{t('customer.verification.commonIssues.prevention')}</strong> {item.prevention}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Why Verification */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader>
                <Shield className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-lg">{t('customer.verification.whyVerify.regulatory.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t('customer.verification.whyVerify.regulatory.description')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-lg">{t('customer.verification.whyVerify.security.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t('customer.verification.whyVerify.security.description')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-lg">{t('customer.verification.whyVerify.features.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t('customer.verification.whyVerify.features.description')}
                </p>
              </CardContent>
            </Card>
          </div>

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

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">{t('customer.verification.cta.title')}</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {t('customer.verification.cta.description')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" data-testid="button-start-verification">
                {t('customer.verification.cta.beginVerification')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" data-testid="button-contact-support">
                {t('customer.verification.cta.contactSupport')}
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap gap-6 justify-center text-sm text-muted-foreground">
              <span>✓ {t('customer.verification.cta.secureEncrypted')}</span>
              <span>✓ {t('customer.verification.cta.approval24h')}</span>
              <span>✓ {t('customer.verification.cta.noHiddenRequirements')}</span>
            </div>
          </div>
          </div>
        </VariantContainer>
      </VariantSection>
    </LandingLayout>
  );
}
