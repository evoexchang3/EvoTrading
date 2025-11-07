import { LandingLayout } from "@/components/LandingLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/hooks/useLanguage";
import {
  VariantSection,
  VariantContainer,
  VariantPageHeader,
  VariantHeading,
  VariantText,
} from "@/components/variant";

export default function FAQPage() {
  const { t } = useLanguage();

  const faqCategories = [
    {
      category: t('faq.category.accountRegistration'),
      questions: [
        {
          question: t('faq.accountRegistration.createAccount.question'),
          answer: t('faq.accountRegistration.createAccount.answer'),
        },
        {
          question: t('faq.accountRegistration.kycDocuments.question'),
          answer: t('faq.accountRegistration.kycDocuments.answer'),
        },
        {
          question: t('faq.accountRegistration.multipleAccounts.question'),
          answer: t('faq.accountRegistration.multipleAccounts.answer'),
        },
      ],
    },
    {
      category: t('faq.category.depositsWithdrawals'),
      questions: [
        {
          question: t('faq.depositsWithdrawals.depositMethods.question'),
          answer: t('faq.depositsWithdrawals.depositMethods.answer'),
        },
        {
          question: t('faq.depositsWithdrawals.withdrawalTime.question'),
          answer: t('faq.depositsWithdrawals.withdrawalTime.answer'),
        },
        {
          question: t('faq.depositsWithdrawals.withdrawalFees.question'),
          answer: t('faq.depositsWithdrawals.withdrawalFees.answer'),
        },
        {
          question: t('faq.depositsWithdrawals.minimumWithdrawal.question'),
          answer: t('faq.depositsWithdrawals.minimumWithdrawal.answer'),
        },
      ],
    },
    {
      category: t('faq.category.trading'),
      questions: [
        {
          question: t('faq.trading.markets.question'),
          answer: t('faq.trading.markets.answer'),
        },
        {
          question: t('faq.trading.hours.question'),
          answer: t('faq.trading.hours.answer'),
        },
        {
          question: t('faq.trading.leverage.question'),
          answer: t('faq.trading.leverage.answer'),
        },
        {
          question: t('faq.trading.spreadsCommissions.question'),
          answer: t('faq.trading.spreadsCommissions.answer'),
        },
      ],
    },
    {
      category: t('faq.category.securitySafety'),
      questions: [
        {
          question: t('faq.securitySafety.moneyProtection.question'),
          answer: t('faq.securitySafety.moneyProtection.answer'),
        },
        {
          question: t('faq.securitySafety.twoFactor.question'),
          answer: t('faq.securitySafety.twoFactor.answer'),
        },
        {
          question: t('faq.securitySafety.forgotPassword.question'),
          answer: t('faq.securitySafety.forgotPassword.answer'),
        },
        {
          question: t('faq.securitySafety.dataPrivacy.question'),
          answer: t('faq.securitySafety.dataPrivacy.answer'),
        },
      ],
    },
    {
      category: t('faq.category.platformTechnical'),
      questions: [
        {
          question: t('faq.platformTechnical.mobileApp.question'),
          answer: t('faq.platformTechnical.mobileApp.answer'),
        },
        {
          question: t('faq.platformTechnical.technicalIssues.question'),
          answer: t('faq.platformTechnical.technicalIssues.answer'),
        },
        {
          question: t('faq.platformTechnical.automatedTrading.question'),
          answer: t('faq.platformTechnical.automatedTrading.answer'),
        },
      ],
    },
  ];

  return (
    <LandingLayout>
      <SEO
        title={t('faq.seo.title')}
        description={t('faq.seo.description')}
        keywords={t('faq.seo.keywords')}
      />
      
      <VariantPageHeader
        title={t('faq.hero.title')}
        subtitle={t('faq.hero.subtitle')}
        titleTestId="text-faq-title"
      />

      <VariantSection>
        <VariantContainer>
          <div className="max-w-4xl mx-auto space-y-12">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <VariantHeading level="heading" className="mb-6" data-testid={`text-category-${categoryIndex}`}>
                  {category.category}
                </VariantHeading>
                <Accordion type="single" collapsible className="space-y-4">
                  {category.questions.map((faq, questionIndex) => (
                    <AccordionItem
                      key={`${categoryIndex}-${questionIndex}`}
                      value={`${categoryIndex}-${questionIndex}`}
                      className="border rounded-lg px-6"
                      data-testid={`accordion-item-${categoryIndex}-${questionIndex}`}
                    >
                      <AccordionTrigger className="text-left font-medium hover:no-underline py-4">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </VariantContainer>
      </VariantSection>

      <VariantSection background="muted">
        <VariantContainer>
          <div className="max-w-3xl mx-auto text-center">
            <VariantHeading level="heading" data-testid="text-contact-cta-title">
              {t('faq.cta.title')}
            </VariantHeading>
            <VariantText className="mb-6">
              {t('faq.cta.description')}
            </VariantText>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/contact" className="inline-block">
                <Button data-testid="button-contact-us">
                  {t('faq.cta.button')}
                </Button>
              </a>
            </div>
          </div>
        </VariantContainer>
      </VariantSection>
    </LandingLayout>
  );
}
