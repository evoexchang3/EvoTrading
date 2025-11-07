import { LandingLayout } from "@/components/LandingLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  MessageSquare, 
  Clock, 
  TrendingUp, 
  Users, 
  ChevronRight,
  Info,
  HelpCircle,
  Mail,
  Phone,
  FileText,
  CheckCircle,
  AlertCircle,
  Scale
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { VariantSection, VariantContainer, VariantGrid, VariantCard, VariantHeading, VariantText, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/variant";

export default function ComplaintsPage() {
  const { t } = useLanguage();

  const stats = [
    {
      label: t('company.complaints.stats.resolutionTime.label'),
      value: t('company.complaints.stats.resolutionTime.value'),
      description: t('company.complaints.stats.resolutionTime.description'),
      icon: Clock,
      testId: "stat-resolution-time"
    },
    {
      label: t('company.complaints.stats.successRate.label'),
      value: t('company.complaints.stats.successRate.value'),
      description: t('company.complaints.stats.successRate.description'),
      icon: TrendingUp,
      testId: "stat-success-rate"
    },
    {
      label: t('company.complaints.stats.channels.label'),
      value: t('company.complaints.stats.channels.value'),
      description: t('company.complaints.stats.channels.description'),
      icon: MessageSquare,
      testId: "stat-channels"
    },
    {
      label: t('company.complaints.stats.levels.label'),
      value: t('company.complaints.stats.levels.value'),
      description: t('company.complaints.stats.levels.description'),
      icon: Users,
      testId: "stat-levels"
    }
  ];

  const resolutionProcess = [
    {
      level: t('company.complaints.level1.title'),
      timeframe: t('company.complaints.level1.timeframe'),
      description: t('company.complaints.level1.description'),
      icon: MessageSquare,
      steps: [
        t('company.complaints.level1.step1'),
        t('company.complaints.level1.step2'),
        t('company.complaints.level1.step3'),
        t('company.complaints.level1.step4'),
        t('company.complaints.level1.step5')
      ],
      contacts: [
        { method: t('company.complaints.level1.contact1.method'), detail: t('company.complaints.level1.contact1.detail'), available: t('company.complaints.level1.contact1.available') },
        { method: t('company.complaints.level1.contact2.method'), detail: t('company.complaints.level1.contact2.detail'), available: t('company.complaints.level1.contact2.available') },
        { method: t('company.complaints.level1.contact3.method'), detail: t('company.complaints.level1.contact3.detail'), available: t('company.complaints.level1.contact3.available') },
        { method: t('company.complaints.level1.contact4.method'), detail: t('company.complaints.level1.contact4.detail'), available: t('company.complaints.level1.contact4.available') }
      ]
    },
    {
      level: t('company.complaints.level2.title'),
      timeframe: t('company.complaints.level2.timeframe'),
      description: t('company.complaints.level2.description'),
      icon: Users,
      steps: [
        t('company.complaints.level2.step1'),
        t('company.complaints.level2.step2'),
        t('company.complaints.level2.step3'),
        t('company.complaints.level2.step4'),
        t('company.complaints.level2.step5')
      ],
      contacts: [
        { method: t('company.complaints.level2.contact1.method'), detail: t('company.complaints.level2.contact1.detail'), available: t('company.complaints.level2.contact1.available') },
        { method: t('company.complaints.level2.contact2.method'), detail: t('company.complaints.level2.contact2.detail'), available: t('company.complaints.level2.contact2.available') },
        { method: t('company.complaints.level2.contact3.method'), detail: t('company.complaints.level2.contact3.detail'), available: t('company.complaints.level2.contact3.available') }
      ]
    },
    {
      level: t('company.complaints.level3.title'),
      timeframe: t('company.complaints.level3.timeframe'),
      description: t('company.complaints.level3.description'),
      icon: Scale,
      steps: [
        t('company.complaints.level3.step1'),
        t('company.complaints.level3.step2'),
        t('company.complaints.level3.step3'),
        t('company.complaints.level3.step4'),
        t('company.complaints.level3.step5')
      ],
      contacts: [
        { method: t('company.complaints.level3.contact1.method'), detail: t('company.complaints.level3.contact1.detail'), available: t('company.complaints.level3.contact1.available') },
        { method: t('company.complaints.level3.contact2.method'), detail: t('company.complaints.level3.contact2.detail'), available: t('company.complaints.level3.contact2.available') },
        { method: t('company.complaints.level3.contact3.method'), detail: t('company.complaints.level3.contact3.detail'), available: t('company.complaints.level3.contact3.available') }
      ]
    },
    {
      level: t('company.complaints.level4.title'),
      timeframe: t('company.complaints.level4.timeframe'),
      description: t('company.complaints.level4.description'),
      icon: FileText,
      steps: [
        t('company.complaints.level4.step1'),
        t('company.complaints.level4.step2'),
        t('company.complaints.level4.step3'),
        t('company.complaints.level4.step4'),
        t('company.complaints.level4.step5')
      ],
      contacts: [
        { method: t('company.complaints.level4.contact1.method'), detail: t('company.complaints.level4.contact1.detail'), available: t('company.complaints.level4.contact1.available') },
        { method: t('company.complaints.level4.contact2.method'), detail: t('company.complaints.level4.contact2.detail'), available: t('company.complaints.level4.contact2.available') },
        { method: t('company.complaints.level4.contact3.method'), detail: t('company.complaints.level4.contact3.detail'), available: t('company.complaints.level4.contact3.available') }
      ]
    }
  ];

  const escalationTimeline = [
    { stage: t('company.complaints.timeline.stage1.stage'), days: t('company.complaints.timeline.stage1.days'), action: t('company.complaints.timeline.stage1.action') },
    { stage: t('company.complaints.timeline.stage2.stage'), days: t('company.complaints.timeline.stage2.days'), action: t('company.complaints.timeline.stage2.action') },
    { stage: t('company.complaints.timeline.stage3.stage'), days: t('company.complaints.timeline.stage3.days'), action: t('company.complaints.timeline.stage3.action') },
    { stage: t('company.complaints.timeline.stage4.stage'), days: t('company.complaints.timeline.stage4.days'), action: t('company.complaints.timeline.stage4.action') },
    { stage: t('company.complaints.timeline.stage5.stage'), days: t('company.complaints.timeline.stage5.days'), action: t('company.complaints.timeline.stage5.action') },
    { stage: t('company.complaints.timeline.stage6.stage'), days: t('company.complaints.timeline.stage6.days'), action: t('company.complaints.timeline.stage6.action') }
  ];

  const complaintCategories = [
    {
      category: t('company.complaints.categories.tradingDisputes.category'),
      examples: [
        t('company.complaints.categories.tradingDisputes.example1'),
        t('company.complaints.categories.tradingDisputes.example2'),
        t('company.complaints.categories.tradingDisputes.example3'),
        t('company.complaints.categories.tradingDisputes.example4')
      ],
      typicalResolution: t('company.complaints.categories.tradingDisputes.resolution')
    },
    {
      category: t('company.complaints.categories.withdrawalIssues.category'),
      examples: [
        t('company.complaints.categories.withdrawalIssues.example1'),
        t('company.complaints.categories.withdrawalIssues.example2'),
        t('company.complaints.categories.withdrawalIssues.example3'),
        t('company.complaints.categories.withdrawalIssues.example4')
      ],
      typicalResolution: t('company.complaints.categories.withdrawalIssues.resolution')
    },
    {
      category: t('company.complaints.categories.accountAccess.category'),
      examples: [
        t('company.complaints.categories.accountAccess.example1'),
        t('company.complaints.categories.accountAccess.example2'),
        t('company.complaints.categories.accountAccess.example3'),
        t('company.complaints.categories.accountAccess.example4')
      ],
      typicalResolution: t('company.complaints.categories.accountAccess.resolution')
    },
    {
      category: t('company.complaints.categories.feesCharges.category'),
      examples: [
        t('company.complaints.categories.feesCharges.example1'),
        t('company.complaints.categories.feesCharges.example2'),
        t('company.complaints.categories.feesCharges.example3'),
        t('company.complaints.categories.feesCharges.example4')
      ],
      typicalResolution: t('company.complaints.categories.feesCharges.resolution')
    },
    {
      category: t('company.complaints.categories.customerService.category'),
      examples: [
        t('company.complaints.categories.customerService.example1'),
        t('company.complaints.categories.customerService.example2'),
        t('company.complaints.categories.customerService.example3'),
        t('company.complaints.categories.customerService.example4')
      ],
      typicalResolution: t('company.complaints.categories.customerService.resolution')
    }
  ];

  const faqs = [
    {
      question: t('company.complaints.faq.q1.question'),
      answer: t('company.complaints.faq.q1.answer')
    },
    {
      question: t('company.complaints.faq.q2.question'),
      answer: t('company.complaints.faq.q2.answer')
    },
    {
      question: t('company.complaints.faq.q3.question'),
      answer: t('company.complaints.faq.q3.answer')
    },
    {
      question: t('company.complaints.faq.q4.question'),
      answer: t('company.complaints.faq.q4.answer')
    },
    {
      question: t('company.complaints.faq.q5.question'),
      answer: t('company.complaints.faq.q5.answer')
    },
    {
      question: t('company.complaints.faq.q6.question'),
      answer: t('company.complaints.faq.q6.answer')
    },
    {
      question: t('company.complaints.faq.q7.question'),
      answer: t('company.complaints.faq.q7.answer')
    }
  ];

  return (
    <LandingLayout>
      <VariantSection animation="page">
        <VariantContainer>
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-12">
              <Badge className="mb-4" data-testid="badge-complaints">{t('company.complaints.badge')}</Badge>
              <VariantHeading level="hero" as="h1" className="mb-4">{t('company.complaints.title')}</VariantHeading>
              <VariantText className="text-muted-foreground max-w-3xl mx-auto">
                {t('company.complaints.description')}
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
          <Alert className="mb-12" data-testid="alert-complaints-rights">
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>{t('company.complaints.alert.title')}</strong> {t('company.complaints.alert.message')}
            </AlertDescription>
          </Alert>

          {/* Resolution Process */}
          <div className="mb-12">
            <VariantHeading level="heading" as="h2" className="mb-6">{t('company.complaints.resolutionProcess.title')}</VariantHeading>
            <div className="space-y-6">
              {resolutionProcess.map((level, index) => (
                <VariantCard key={index} data-testid={`card-level-${index}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <level.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{level.level}</CardTitle>
                          <CardDescription>{level.description}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline" className="ml-2">{level.timeframe}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-3">{t('company.complaints.resolutionProcess.processSteps')}</h4>
                      <div className="space-y-2">
                        {level.steps.map((step, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="font-semibold text-sm mb-3">{t('company.complaints.resolutionProcess.contactMethods')}</h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {level.contacts.map((contact, idx) => (
                          <div key={idx} className="bg-muted rounded-lg p-3">
                            <div className="font-medium text-sm mb-1">{contact.method}</div>
                            <div className="text-sm text-muted-foreground mb-1">{contact.detail}</div>
                            <div className="text-xs text-muted-foreground">{contact.available}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </VariantCard>
              ))}
            </div>
          </div>

          {/* Escalation Timeline */}
          <VariantCard className="mb-12" data-testid="card-timeline">
            <CardHeader>
              <CardTitle>{t('company.complaints.timeline.title')}</CardTitle>
              <CardDescription>{t('company.complaints.timeline.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {escalationTimeline.map((item, index) => (
                  <div key={index} className="flex items-center gap-4" data-testid={`timeline-${index}`}>
                    <div className="w-24 text-sm font-medium flex-shrink-0">{item.days}</div>
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 border-b pb-4">
                      <div className="font-semibold text-sm">{item.stage}</div>
                      <div className="text-sm text-muted-foreground">{item.action}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </VariantCard>

          {/* Complaint Categories */}
          <div className="mb-12">
            <VariantHeading level="heading" as="h2" className="mb-6">{t('company.complaints.categories.title')}</VariantHeading>
            <div className="grid md:grid-cols-2 gap-6">
              {complaintCategories.map((category, index) => (
                <VariantCard key={index} data-testid={`card-category-${index}`}>
                  <CardHeader>
                    <CardTitle className="text-lg">{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h4 className="text-sm font-semibold mb-2">{t('company.complaints.categories.commonExamples')}</h4>
                      <ul className="space-y-1">
                        {category.examples.map((example, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <AlertCircle className="w-3 h-3 text-muted-foreground flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-muted rounded-lg p-3">
                      <p className="text-sm">
                        <span className="font-semibold">{t('company.complaints.categories.typicalResolution')}</span>
                        {category.typicalResolution}
                      </p>
                    </div>
                  </CardContent>
                </VariantCard>
              ))}
            </div>
          </div>

          {/* Contact Card */}
          <VariantCard className="mb-12 bg-primary/5" data-testid="card-contact">
            <CardHeader>
              <CardTitle>{t('company.complaints.contactCard.title')}</CardTitle>
              <CardDescription>{t('company.complaints.contactCard.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-3 gap-4">
                <Button className="h-auto py-4 flex-col" data-testid="button-email-complaint">
                  <Mail className="w-6 h-6 mb-2" />
                  <span className="font-semibold">{t('company.complaints.contactCard.email.title')}</span>
                  <span className="text-xs mt-1">{t('company.complaints.contactCard.email.detail')}</span>
                </Button>
                <Button className="h-auto py-4 flex-col" data-testid="button-phone-complaint">
                  <Phone className="w-6 h-6 mb-2" />
                  <span className="font-semibold">{t('company.complaints.contactCard.phone.title')}</span>
                  <span className="text-xs mt-1">{t('company.complaints.contactCard.phone.detail')}</span>
                </Button>
                <Button className="h-auto py-4 flex-col" data-testid="button-form-complaint">
                  <FileText className="w-6 h-6 mb-2" />
                  <span className="font-semibold">{t('company.complaints.contactCard.form.title')}</span>
                  <span className="text-xs mt-1">{t('company.complaints.contactCard.form.detail')}</span>
                </Button>
              </div>
            </CardContent>
          </VariantCard>

          {/* FAQ Section */}
          <div>
            <VariantHeading level="heading" as="h2" className="mb-6">{t('company.complaints.faq.title')}</VariantHeading>
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
