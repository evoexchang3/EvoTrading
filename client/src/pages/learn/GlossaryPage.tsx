import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Book, Search, BookOpen, TrendingUp, Star, Filter } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/hooks/useLanguage";

export default function GlossaryPage() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const glossaryTerms = [
    { key: "askPrice", categoryKey: "Basics", difficultyKey: "Beginner" },
    { key: "bidPrice", categoryKey: "Basics", difficultyKey: "Beginner" },
    { key: "spread", categoryKey: "Basics", difficultyKey: "Beginner" },
    { key: "pip", categoryKey: "Basics", difficultyKey: "Beginner" },
    { key: "lot", categoryKey: "Basics", difficultyKey: "Beginner" },
    { key: "leverage", categoryKey: "Risk", difficultyKey: "Beginner" },
    { key: "margin", categoryKey: "Risk", difficultyKey: "Beginner" },
    { key: "stopLoss", categoryKey: "Orders", difficultyKey: "Beginner" },
    { key: "takeProfit", categoryKey: "Orders", difficultyKey: "Beginner" },
    { key: "longPosition", categoryKey: "Trading", difficultyKey: "Beginner" },
    { key: "shortPosition", categoryKey: "Trading", difficultyKey: "Beginner" },
    { key: "supportLevel", categoryKey: "Technical", difficultyKey: "Beginner" },
    { key: "resistanceLevel", categoryKey: "Technical", difficultyKey: "Beginner" },
    { key: "bullish", categoryKey: "Trading", difficultyKey: "Beginner" },
    { key: "bearish", categoryKey: "Trading", difficultyKey: "Beginner" },
    { key: "candlestick", categoryKey: "Technical", difficultyKey: "Beginner" },
    { key: "trend", categoryKey: "Technical", difficultyKey: "Beginner" },
    { key: "volatility", categoryKey: "Analysis", difficultyKey: "Beginner" },
    { key: "liquidity", categoryKey: "Basics", difficultyKey: "Beginner" },
    { key: "slippage", categoryKey: "Trading", difficultyKey: "Intermediate" },
    { key: "swap", categoryKey: "Trading", difficultyKey: "Intermediate" },
    { key: "drawdown", categoryKey: "Risk", difficultyKey: "Intermediate" },
    { key: "equity", categoryKey: "Risk", difficultyKey: "Intermediate" },
    { key: "freeMargin", categoryKey: "Risk", difficultyKey: "Intermediate" },
    { key: "marginCall", categoryKey: "Risk", difficultyKey: "Intermediate" },
    { key: "stopOut", categoryKey: "Risk", difficultyKey: "Intermediate" },
    { key: "scalping", categoryKey: "Strategies", difficultyKey: "Advanced" },
    { key: "swingTrading", categoryKey: "Strategies", difficultyKey: "Intermediate" },
    { key: "dayTrading", categoryKey: "Strategies", difficultyKey: "Intermediate" },
    { key: "technicalAnalysis", categoryKey: "Analysis", difficultyKey: "Beginner" },
    { key: "fundamentalAnalysis", categoryKey: "Analysis", difficultyKey: "Intermediate" },
    { key: "rsi", categoryKey: "Indicators", difficultyKey: "Intermediate" },
    { key: "macd", categoryKey: "Indicators", difficultyKey: "Intermediate" },
    { key: "movingAverage", categoryKey: "Indicators", difficultyKey: "Beginner" },
    { key: "fibonacciRetracement", categoryKey: "Technical", difficultyKey: "Advanced" },
    { key: "breakout", categoryKey: "Technical", difficultyKey: "Intermediate" },
    { key: "consolidation", categoryKey: "Technical", difficultyKey: "Intermediate" },
    { key: "reversal", categoryKey: "Technical", difficultyKey: "Intermediate" },
    { key: "riskRewardRatio", categoryKey: "Risk", difficultyKey: "Beginner" },
    { key: "orderFlow", categoryKey: "Advanced", difficultyKey: "Advanced" },
    { key: "smartMoney", categoryKey: "Advanced", difficultyKey: "Advanced" },
    { key: "elliottWave", categoryKey: "Advanced", difficultyKey: "Advanced" },
    { key: "harmonicPatterns", categoryKey: "Advanced", difficultyKey: "Advanced" },
    { key: "correlation", categoryKey: "Analysis", difficultyKey: "Advanced" },
    { key: "hedging", categoryKey: "Strategies", difficultyKey: "Advanced" },
    { key: "pivotPoints", categoryKey: "Technical", difficultyKey: "Intermediate" },
    { key: "bollingerBands", categoryKey: "Indicators", difficultyKey: "Intermediate" },
    { key: "atr", categoryKey: "Indicators", difficultyKey: "Intermediate" },
    { key: "carryTrade", categoryKey: "Strategies", difficultyKey: "Advanced" }
  ].map(item => ({
    term: t(`education.glossary.terms.${item.key}.term`),
    definition: t(`education.glossary.terms.${item.key}.definition`),
    category: t(`education.glossary.terms.${item.key}.category`),
    difficulty: t(`education.glossary.terms.${item.key}.difficulty`),
    categoryKey: item.categoryKey,
    difficultyKey: item.difficultyKey
  }));

  const categories = [
    { name: t('education.glossary.categories.allTerms'), value: "all", count: glossaryTerms.length },
    { name: t('education.glossary.categories.basics'), value: "Basics", count: glossaryTerms.filter(t => t.categoryKey === "Basics").length },
    { name: t('education.glossary.categories.technical'), value: "Technical", count: glossaryTerms.filter(t => t.categoryKey === "Technical").length },
    { name: t('education.glossary.categories.indicators'), value: "Indicators", count: glossaryTerms.filter(t => t.categoryKey === "Indicators").length },
    { name: t('education.glossary.categories.risk'), value: "Risk", count: glossaryTerms.filter(t => t.categoryKey === "Risk").length },
    { name: t('education.glossary.categories.strategies'), value: "Strategies", count: glossaryTerms.filter(t => t.categoryKey === "Strategies").length },
    { name: t('education.glossary.categories.orders'), value: "Orders", count: glossaryTerms.filter(t => t.categoryKey === "Orders").length },
    { name: t('education.glossary.categories.analysis'), value: "Analysis", count: glossaryTerms.filter(t => t.categoryKey === "Analysis").length },
    { name: t('education.glossary.categories.advanced'), value: "Advanced", count: glossaryTerms.filter(t => t.categoryKey === "Advanced").length }
  ];

  const filteredTerms = glossaryTerms.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.categoryKey === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const groupedTerms = filteredTerms.reduce((acc, item) => {
    const firstLetter = item.term[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(item);
    return acc;
  }, {} as Record<string, typeof glossaryTerms>);

  const faqs = [
    {
      question: t('education.glossary.faq.q1.question'),
      answer: t('education.glossary.faq.q1.answer')
    },
    {
      question: t('education.glossary.faq.q2.question'),
      answer: t('education.glossary.faq.q2.answer')
    },
    {
      question: t('education.glossary.faq.q3.question'),
      answer: t('education.glossary.faq.q3.answer')
    },
    {
      question: t('education.glossary.faq.q4.question'),
      answer: t('education.glossary.faq.q4.answer')
    },
    {
      question: t('education.glossary.faq.q5.question'),
      answer: t('education.glossary.faq.q5.answer')
    },
    {
      question: t('education.glossary.faq.q6.question'),
      answer: t('education.glossary.faq.q6.answer')
    },
    {
      question: t('education.glossary.faq.q7.question'),
      answer: t('education.glossary.faq.q7.answer')
    }
  ];

  const usageTips = [
    { tip: t('education.glossary.usageTips.tip1'), icon: Search },
    { tip: t('education.glossary.usageTips.tip2'), icon: Filter },
    { tip: t('education.glossary.usageTips.tip3'), icon: Star },
    { tip: t('education.glossary.usageTips.tip4'), icon: BookOpen },
    { tip: t('education.glossary.usageTips.tip5'), icon: TrendingUp }
  ];

  const beginnerCount = glossaryTerms.filter(t => t.difficultyKey === "Beginner").length;
  const intermediateCount = glossaryTerms.filter(t => t.difficultyKey === "Intermediate").length;
  const advancedCount = glossaryTerms.filter(t => t.difficultyKey === "Advanced").length;

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <Badge className="mb-2" data-testid="badge-glossary">{t('education.glossary.badge')}</Badge>
            <h1 className="text-3xl font-bold">{t('education.glossary.title')}</h1>
            <p className="text-muted-foreground">{t('education.glossary.description')}</p>
          </div>
          <Book className="w-8 h-8 text-muted-foreground" />
        </div>

        {/* Stats Overview */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card data-testid="card-stat-total">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Book className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('education.glossary.stats.totalTerms')}</p>
                  <p className="text-2xl font-bold" data-testid="text-total-terms">{glossaryTerms.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-stat-beginner">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <Star className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('education.glossary.stats.beginner')}</p>
                  <p className="text-2xl font-bold" data-testid="text-beginner-terms">{beginnerCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-stat-intermediate">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-amber-500/10 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('education.glossary.stats.intermediate')}</p>
                  <p className="text-2xl font-bold" data-testid="text-intermediate-terms">{intermediateCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-stat-advanced">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-red-500/10 rounded-lg">
                  <BookOpen className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('education.glossary.stats.advanced')}</p>
                  <p className="text-2xl font-bold" data-testid="text-advanced-terms">{advancedCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Usage Tips */}
        <Card data-testid="card-usage-tips">
          <CardHeader>
            <CardTitle>{t('education.glossary.usageTips.title')}</CardTitle>
            <CardDescription>{t('education.glossary.usageTips.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {usageTips.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                  <item.icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm">{item.tip}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Search and Filter */}
        <Card data-testid="card-search">
          <CardHeader>
            <CardTitle>{t('education.glossary.search.title')}</CardTitle>
            <CardDescription>{t('education.glossary.search.description')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={t('education.glossary.search.placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                data-testid="input-search-term"
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <Badge
                  key={cat.value}
                  variant={selectedCategory === cat.value ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(cat.value)}
                  data-testid={`filter-${cat.value}`}
                >
                  {cat.name} ({cat.count})
                </Badge>
              ))}
            </div>

            {searchTerm && (
              <p className="text-sm text-muted-foreground">
                {t('education.glossary.search.found', { 
                  count: filteredTerms.length, 
                  plural: filteredTerms.length !== 1 ? 's' : '',
                  searchTerm: searchTerm 
                })}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Terms Display */}
        <Tabs defaultValue="alphabetical" className="w-full">
          <TabsList className="grid w-full sm:w-auto grid-cols-2">
            <TabsTrigger value="alphabetical" data-testid="tab-alphabetical">{t('education.glossary.tabs.alphabetical')}</TabsTrigger>
            <TabsTrigger value="category" data-testid="tab-category">{t('education.glossary.tabs.byCategory')}</TabsTrigger>
          </TabsList>

          <TabsContent value="alphabetical" className="space-y-6 mt-6">
            {Object.keys(groupedTerms).sort().map((letter) => (
              <div key={letter} className="space-y-3" data-testid={`section-letter-${letter}`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                    {letter}
                  </div>
                  <div className="h-px flex-1 bg-border" />
                </div>
                
                <div className="grid gap-3">
                  {groupedTerms[letter].map((item, index) => (
                    <Card key={index} data-testid={`card-term-${item.term.toLowerCase().replace(/\s+/g, '-')}`}>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-3 flex-wrap">
                          <CardTitle className="text-lg">{item.term}</CardTitle>
                          <div className="flex gap-2">
                            <Badge variant="outline" className="text-xs">
                              {item.category}
                            </Badge>
                            <Badge 
                              variant={
                                item.difficultyKey === 'Beginner' ? 'default' :
                                item.difficultyKey === 'Intermediate' ? 'secondary' :
                                'outline'
                              }
                              className="text-xs"
                            >
                              {item.difficulty}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{item.definition}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="category" className="space-y-6 mt-6">
            {categories.filter(c => c.value !== "all" && glossaryTerms.some(t => t.categoryKey === c.value)).map((cat) => (
              <div key={cat.value} className="space-y-3" data-testid={`section-category-${cat.value}`}>
                <div className="flex items-center gap-3">
                  <div className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold">
                    {cat.name}
                  </div>
                  <div className="h-px flex-1 bg-border" />
                  <Badge variant="outline">{t('education.glossary.search.termsCounted', { count: cat.count })}</Badge>
                </div>
                
                <div className="grid gap-3">
                  {glossaryTerms
                    .filter(t => t.categoryKey === cat.value)
                    .map((item, index) => (
                      <Card key={index} data-testid={`card-term-cat-${item.term.toLowerCase().replace(/\s+/g, '-')}`}>
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between gap-3 flex-wrap">
                            <CardTitle className="text-lg">{item.term}</CardTitle>
                            <Badge 
                              variant={
                                item.difficultyKey === 'Beginner' ? 'default' :
                                item.difficultyKey === 'Intermediate' ? 'secondary' :
                                'outline'
                              }
                              className="text-xs"
                            >
                              {item.difficulty}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">{item.definition}</p>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>

        {filteredTerms.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground" data-testid="text-no-results">
                {t('education.glossary.noResults', { searchTerm: searchTerm })}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Related Learning Resources */}
        <Card data-testid="card-learning-resources">
          <CardHeader>
            <CardTitle>{t('education.glossary.learningResources.title')}</CardTitle>
            <CardDescription>{t('education.glossary.learningResources.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg hover-elevate cursor-pointer" data-testid="link-beginner-course">
                <h4 className="font-semibold mb-2">{t('education.glossary.learningResources.beginnerCourse.title')}</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  {t('education.glossary.learningResources.beginnerCourse.description')}
                </p>
                <Badge>{t('education.glossary.learningResources.beginnerCourse.duration', { count: beginnerCount })}</Badge>
              </div>

              <div className="p-4 border rounded-lg hover-elevate cursor-pointer" data-testid="link-advanced-course">
                <h4 className="font-semibold mb-2">{t('education.glossary.learningResources.advancedCourse.title')}</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  {t('education.glossary.learningResources.advancedCourse.description')}
                </p>
                <Badge>{t('education.glossary.learningResources.advancedCourse.duration', { count: advancedCount })}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQs */}
        <Card data-testid="card-faqs">
          <CardHeader>
            <CardTitle>{t('education.glossary.faq.title')}</CardTitle>
            <CardDescription>{t('education.glossary.faq.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} data-testid={`faq-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
