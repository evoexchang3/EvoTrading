import { LandingLayout } from "@/components/LandingLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/hooks/useLanguage";
import { useVariantClasses } from "@/layouts/shared/useVariant";

export default function FAQPage() {
  const { t } = useLanguage();
  const classes = useVariantClasses();

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
      {/* Hero Section */}
      <section className={`${classes.spacing('section')} bg-gradient-to-br from-primary/10 via-background to-background`}>
        <div className={classes.container}>
          <div className={`max-w-3xl mx-auto text-center ${classes.spacing('element')} ${classes.animation('hero')}`}>
            <h1 className={`${classes.textSize('hero')} font-bold`} data-testid="text-faq-title">
              {t('faq.hero.title')}
            </h1>
            <p className={`${classes.textSize('body')} text-muted-foreground`}>
              {t('faq.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className={classes.spacing('section')}>
        <div className={classes.container}>
          <div className={`max-w-4xl mx-auto ${classes.spacing('element')} ${classes.animation('page')}`}>
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h2 className={`${classes.textSize('heading')} font-bold mb-6`} data-testid={`text-category-${categoryIndex}`}>
                  {category.category}
                </h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {category.questions.map((faq, questionIndex) => (
                    <AccordionItem
                      key={`${categoryIndex}-${questionIndex}`}
                      value={`${categoryIndex}-${questionIndex}`}
                      className={`border rounded-lg px-6 ${classes.hover('card')}`}
                      data-testid={`accordion-item-${categoryIndex}-${questionIndex}`}
                    >
                      <AccordionTrigger className={`text-left font-medium hover:no-underline py-4 ${classes.textSize('body')}`}>
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className={`${classes.textSize('body')} text-muted-foreground pb-4`}>
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className={`${classes.spacing('section')} bg-muted/30`}>
        <div className={classes.container}>
          <div className={`max-w-3xl mx-auto text-center ${classes.spacing('element')}`}>
            <h2 className={`${classes.textSize('heading')} font-bold`} data-testid="text-contact-cta-title">
              {t('faq.cta.title')}
            </h2>
            <p className={`${classes.textSize('body')} text-muted-foreground`}>
              {t('faq.cta.description')}
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <a href="/contact" className="inline-block">
                <button className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground ${classes.hover('button')} min-h-9 px-4 py-2`} data-testid="button-contact-us">
                  {t('faq.cta.button')}
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
}
