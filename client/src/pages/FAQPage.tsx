import { useState, useMemo, useEffect } from "react";
import { LandingLayout } from "@/components/LandingLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/hooks/useLanguage";
import { useVariant } from "@/layouts/shared/useVariant";
import { Search } from "lucide-react";
import {
  VariantSection,
  VariantContainer,
  VariantPageHeader,
  VariantHeading,
  VariantText,
  VariantCard,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/variant";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
  featured?: boolean;
}

export default function FAQPage() {
  const { t } = useLanguage();
  const variant = useVariant();
  const faqConfig = variant.pages.faq;

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("");

  // Seed FAQ data
  const allFAQCategories = [
    {
      category: t('faq.category.accountRegistration'),
      questions: [
        {
          question: t('faq.accountRegistration.createAccount.question'),
          answer: t('faq.accountRegistration.createAccount.answer'),
          featured: true,
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
          featured: true,
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
          featured: true,
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
    {
      category: t('faq.category.support'),
      questions: [
        {
          question: t('faq.support.contactSupport.question'),
          answer: t('faq.support.contactSupport.answer'),
        },
        {
          question: t('faq.support.responseTime.question'),
          answer: t('faq.support.responseTime.answer'),
        },
      ],
    },
  ];

  // Derived data: visible categories based on categoryCount
  const visibleCategories = useMemo(() => {
    return allFAQCategories.slice(0, faqConfig.categoryCount);
  }, [faqConfig.categoryCount]);

  // Derived data: flattened questions with category metadata
  const allQuestions: FAQItem[] = useMemo(() => {
    return visibleCategories.flatMap((cat) =>
      cat.questions.map((q) => ({
        ...q,
        category: cat.category,
      }))
    );
  }, [visibleCategories]);

  // Derived data: featured questions
  const featuredQuestions = useMemo(() => {
    return allQuestions.filter((q) => q.featured);
  }, [allQuestions]);

  // Filtered questions based on search and category (works across all layouts)
  const filteredQuestions = useMemo(() => {
    return allQuestions.filter((q) => {
      const matchesCategory = !activeCategory || q.category === activeCategory;
      const matchesSearch = !searchQuery || 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allQuestions, searchQuery, activeCategory]);

  // Initialize active category (useEffect to avoid state mutation during render)
  useEffect(() => {
    if (!activeCategory && visibleCategories.length > 0) {
      setActiveCategory(visibleCategories[0].category);
    }
  }, [activeCategory, visibleCategories]);

  // Accordion Layout Renderer
  const renderAccordion = (questions: FAQItem[], categoryName?: string) => {
    return (
      <Accordion type="single" collapsible className="space-y-4">
        {questions.map((faq, index) => {
          const isHighlighted = faqConfig.highlight === 'inline' && faq.featured;
          return (
            <AccordionItem
              key={index}
              value={`${categoryName || 'all'}-${index}`}
              className={`border rounded-lg px-6 ${
                isHighlighted ? 'bg-primary/5 border-primary/30' : ''
              }`}
              data-testid={`accordion-item-${index}`}
            >
              <AccordionTrigger className="text-left font-medium hover:no-underline py-4">
                <div className="flex items-center gap-2">
                  {faq.question}
                  {isHighlighted && (
                    <Badge variant="default" data-testid={`badge-featured-${index}`}>
                      {t('faq.featured')}
                    </Badge>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    );
  };

  // Tabs Layout Renderer
  const renderTabs = (questions: FAQItem[]) => {
    return (
      <Tabs value={activeCategory} onValueChange={setActiveCategory} data-testid="tabs-faq">
        <TabsList className="mb-8 flex-wrap h-auto gap-2" data-testid="tabs-list">
          {visibleCategories.map((cat, idx) => (
            <TabsTrigger
              key={idx}
              value={cat.category}
              data-testid={`tab-trigger-${idx}`}
            >
              {cat.category}
            </TabsTrigger>
          ))}
        </TabsList>
        {visibleCategories.map((cat, idx) => {
          const categoryQuestions = questions.filter((q) => q.category === cat.category);
          return (
            <TabsContent key={idx} value={cat.category} data-testid={`tab-content-${idx}`}>
              {renderAccordion(categoryQuestions, cat.category)}
            </TabsContent>
          );
        })}
      </Tabs>
    );
  };

  // Cards Layout Renderer
  const renderCards = (questions: FAQItem[]) => {
    return (
      <div className="grid gap-6 md:grid-cols-2" data-testid="cards-faq">
        {questions.map((faq, index) => {
          const isHighlighted = faqConfig.highlight === 'inline' && faq.featured;
          return (
            <VariantCard
              key={index}
              className={isHighlighted ? 'border-primary/50 bg-primary/5' : ''}
              data-testid={`card-faq-${index}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                  {isHighlighted && (
                    <Badge variant="default" data-testid={`badge-featured-${index}`}>
                      {t('faq.featured')}
                    </Badge>
                  )}
                </div>
                {faqConfig.showCategories && (
                  <Badge variant="outline" className="w-fit mt-2" data-testid={`badge-category-${index}`}>
                    {faq.category}
                  </Badge>
                )}
              </CardHeader>
              <CardContent>
                <CardDescription className="whitespace-pre-line text-base">
                  {faq.answer}
                </CardDescription>
              </CardContent>
            </VariantCard>
          );
        })}
      </div>
    );
  };

  // Main Layout Dispatcher
  const renderLayout = () => {
    const shouldShowSearch = faqConfig.showSearch || faqConfig.organization === 'searchable';
    const mainQuestions = faqConfig.highlight === 'featured-top' 
      ? filteredQuestions.filter(q => !q.featured)
      : filteredQuestions;

    return (
      <div className="space-y-8">
        {/* Optional Search */}
        {shouldShowSearch && (
          <div className="max-w-2xl mx-auto" data-testid="search-container">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t('faq.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="input-search-faq"
              />
            </div>
          </div>
        )}

        {/* Optional Category Pills (for flat/searchable layouts) */}
        {faqConfig.showCategories && faqConfig.organization !== 'categorised' && faqConfig.layout !== 'tabs' && (
          <div className="flex flex-wrap gap-2 justify-center" data-testid="category-filters">
            <Button
              variant={!activeCategory ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory('')}
              data-testid="button-category-all"
            >
              {t('faq.allCategories')}
            </Button>
            {visibleCategories.map((cat, idx) => (
              <Button
                key={idx}
                variant={activeCategory === cat.category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(cat.category)}
                data-testid={`button-category-${idx}`}
              >
                {cat.category}
              </Button>
            ))}
          </div>
        )}

        {/* Featured Questions Section (featured-top highlight mode) */}
        {faqConfig.highlight === 'featured-top' && featuredQuestions.length > 0 && (
          <div className="mb-12" data-testid="section-featured">
            <VariantHeading level="heading" className="mb-6" data-testid="text-featured-title">
              {t('faq.featuredTitle')}
            </VariantHeading>
            {faqConfig.layout === 'cards' ? (
              renderCards(featuredQuestions)
            ) : (
              renderAccordion(featuredQuestions, 'featured')
            )}
          </div>
        )}

        {/* Main Content */}
        <div>
          {faqConfig.layout === 'tabs' ? (
            renderTabs(mainQuestions)
          ) : faqConfig.layout === 'cards' ? (
            <>
              {faqConfig.organization === 'categorised' ? (
                <div className="space-y-12">
                  {visibleCategories.map((cat, catIdx) => {
                    const categoryQuestions = mainQuestions.filter((q) => q.category === cat.category);
                    
                    if (categoryQuestions.length === 0) return null;
                    
                    return (
                      <div key={catIdx}>
                        <VariantHeading level="heading" className="mb-6" data-testid={`text-category-${catIdx}`}>
                          {cat.category}
                        </VariantHeading>
                        {renderCards(categoryQuestions)}
                      </div>
                    );
                  })}
                </div>
              ) : (
                renderCards(mainQuestions)
              )}
            </>
          ) : (
            <>
              {faqConfig.organization === 'categorised' ? (
                <div className="space-y-12">
                  {visibleCategories.map((cat, catIdx) => {
                    const categoryQuestions = mainQuestions.filter((q) => q.category === cat.category);
                    
                    if (categoryQuestions.length === 0) return null;
                    
                    return (
                      <div key={catIdx}>
                        <VariantHeading level="heading" className="mb-6" data-testid={`text-category-${catIdx}`}>
                          {cat.category}
                        </VariantHeading>
                        {renderAccordion(categoryQuestions, cat.category)}
                      </div>
                    );
                  })}
                </div>
              ) : (
                renderAccordion(mainQuestions)
              )}
            </>
          )}
        </div>
      </div>
    );
  };

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
          <div className="max-w-4xl mx-auto">
            {renderLayout()}
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
