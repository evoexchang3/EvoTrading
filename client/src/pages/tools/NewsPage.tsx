import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Newspaper, ExternalLink, TrendingUp, HelpCircle, BookOpen, Target, AlertTriangle, Zap, Download, Bell, ThumbsUp, ThumbsDown, Minus as MinusIcon } from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useQuery } from "@tanstack/react-query";
import { type NewsArticle } from "@shared/schema";
import { format } from "date-fns";
import { useLanguage } from "@/hooks/useLanguage";

export default function NewsPage() {
  const { t } = useLanguage();
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sentimentFilter, setSentimentFilter] = useState("all");

  const { data: news = [], isLoading } = useQuery<NewsArticle[]>({
    queryKey: ['/api/news', categoryFilter, sentimentFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (categoryFilter && categoryFilter !== 'all') params.append('category', categoryFilter);
      if (sentimentFilter && sentimentFilter !== 'all') params.append('sentiment', sentimentFilter);
      params.append('limit', '20');
      
      const url = `/api/news${params.toString() ? '?' + params.toString() : ''}`;
      const res = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      
      if (!res.ok) throw new Error(t('tools.news.errors.fetchFailed'));
      return res.json();
    },
    refetchInterval: 1000 * 60 * 30, // Refetch every 30 minutes
  });

  const newsInterpretation = [
    {
      newsType: t('tools.news.interpretation.centralBanks.type'),
      impact: t('tools.news.interpretation.centralBanks.impact'),
      howToRead: t('tools.news.interpretation.centralBanks.howToRead'),
      tradingAction: t('tools.news.interpretation.centralBanks.tradingAction')
    },
    {
      newsType: t('tools.news.interpretation.employment.type'),
      impact: t('tools.news.interpretation.employment.impact'),
      howToRead: t('tools.news.interpretation.employment.howToRead'),
      tradingAction: t('tools.news.interpretation.employment.tradingAction')
    },
    {
      newsType: t('tools.news.interpretation.inflation.type'),
      impact: t('tools.news.interpretation.inflation.impact'),
      howToRead: t('tools.news.interpretation.inflation.howToRead'),
      tradingAction: t('tools.news.interpretation.inflation.tradingAction')
    },
    {
      newsType: t('tools.news.interpretation.gdp.type'),
      impact: t('tools.news.interpretation.gdp.impact'),
      howToRead: t('tools.news.interpretation.gdp.howToRead'),
      tradingAction: t('tools.news.interpretation.gdp.tradingAction')
    },
    {
      newsType: t('tools.news.interpretation.geopolitical.type'),
      impact: t('tools.news.interpretation.geopolitical.impact'),
      howToRead: t('tools.news.interpretation.geopolitical.howToRead'),
      tradingAction: t('tools.news.interpretation.geopolitical.tradingAction')
    }
  ];

  const tradingStrategies = [
    {
      strategy: t('tools.news.strategies.surprise.name'),
      when: t('tools.news.strategies.surprise.when'),
      setup: t('tools.news.strategies.surprise.setup'),
      execution: t('tools.news.strategies.surprise.execution'),
      riskManagement: t('tools.news.strategies.surprise.risk')
    },
    {
      strategy: t('tools.news.strategies.fade.name'),
      when: t('tools.news.strategies.fade.when'),
      setup: t('tools.news.strategies.fade.setup'),
      execution: t('tools.news.strategies.fade.execution'),
      riskManagement: t('tools.news.strategies.fade.risk')
    },
    {
      strategy: t('tools.news.strategies.preposition.name'),
      when: t('tools.news.strategies.preposition.when'),
      setup: t('tools.news.strategies.preposition.setup'),
      execution: t('tools.news.strategies.preposition.execution'),
      riskManagement: t('tools.news.strategies.preposition.risk')
    },
    {
      strategy: t('tools.news.strategies.confluence.name'),
      when: t('tools.news.strategies.confluence.when'),
      setup: t('tools.news.strategies.confluence.setup'),
      execution: t('tools.news.strategies.confluence.execution'),
      riskManagement: t('tools.news.strategies.confluence.risk')
    }
  ];

  const proTips = [
    {
      tip: t('tools.news.proTips.tip1.title'),
      detail: t('tools.news.proTips.tip1.detail')
    },
    {
      tip: t('tools.news.proTips.tip2.title'),
      detail: t('tools.news.proTips.tip2.detail')
    },
    {
      tip: t('tools.news.proTips.tip3.title'),
      detail: t('tools.news.proTips.tip3.detail')
    },
    {
      tip: t('tools.news.proTips.tip4.title'),
      detail: t('tools.news.proTips.tip4.detail')
    },
    {
      tip: t('tools.news.proTips.tip5.title'),
      detail: t('tools.news.proTips.tip5.detail')
    },
    {
      tip: t('tools.news.proTips.tip6.title'),
      detail: t('tools.news.proTips.tip6.detail')
    }
  ];

  const faqs = [
    {
      question: t('tools.news.faq.q1.question'),
      answer: t('tools.news.faq.q1.answer')
    },
    {
      question: t('tools.news.faq.q2.question'),
      answer: t('tools.news.faq.q2.answer')
    },
    {
      question: t('tools.news.faq.q3.question'),
      answer: t('tools.news.faq.q3.answer')
    },
    {
      question: t('tools.news.faq.q4.question'),
      answer: t('tools.news.faq.q4.answer')
    },
    {
      question: t('tools.news.faq.q5.question'),
      answer: t('tools.news.faq.q5.answer')
    },
    {
      question: t('tools.news.faq.q6.question'),
      answer: t('tools.news.faq.q6.answer')
    },
    {
      question: t('tools.news.faq.q7.question'),
      answer: t('tools.news.faq.q7.answer')
    }
  ];

  const getSentimentIcon = (sentiment: string | null) => {
    switch (sentiment?.toLowerCase()) {
      case 'positive':
      case 'bullish':
        return <ThumbsUp className="w-3 h-3" />;
      case 'negative':
      case 'bearish':
        return <ThumbsDown className="w-3 h-3" />;
      default:
        return <MinusIcon className="w-3 h-3" />;
    }
  };

  const getSentimentColor = (sentiment: string | null) => {
    switch (sentiment?.toLowerCase()) {
      case 'positive':
      case 'bullish':
        return "default";
      case 'negative':
      case 'bearish':
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold" data-testid="heading-market-news">{t('tools.news.title')}</h1>
            <p className="text-muted-foreground">{t('tools.news.description')}</p>
          </div>
          <Newspaper className="w-8 h-8 text-muted-foreground" />
        </div>

        {/* Quick Stats */}
        <div className="grid sm:grid-cols-4 gap-4">
          <Card data-testid="card-stat-high-impact-news">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-destructive mb-1">3</div>
              <p className="text-sm text-muted-foreground">{t('tools.news.stats.highImpactToday')}</p>
            </CardContent>
          </Card>
          <Card data-testid="card-stat-update-frequency">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-1">5min</div>
              <p className="text-sm text-muted-foreground">{t('tools.news.stats.autoRefreshRate')}</p>
            </CardContent>
          </Card>
          <Card data-testid="card-stat-sources">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-1">12+</div>
              <p className="text-sm text-muted-foreground">{t('tools.news.stats.trustedSources')}</p>
            </CardContent>
          </Card>
          <Card data-testid="card-stat-categories">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-1">5</div>
              <p className="text-sm text-muted-foreground">{t('tools.news.stats.newsCategories')}</p>
            </CardContent>
          </Card>
        </div>

        {/* News Filter */}
        <div className="flex gap-4 items-center">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]" data-testid="select-news-category">
              <SelectValue placeholder={t('tools.news.filter.category')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('tools.news.filter.allCategories')}</SelectItem>
              <SelectItem value="forex">{t('tools.news.filter.forex')}</SelectItem>
              <SelectItem value="crypto">{t('tools.news.filter.crypto')}</SelectItem>
              <SelectItem value="commodities">{t('tools.news.filter.commodities')}</SelectItem>
              <SelectItem value="stocks">{t('tools.news.filter.stocks')}</SelectItem>
              <SelectItem value="general">{t('tools.news.filter.general')}</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sentimentFilter} onValueChange={setSentimentFilter}>
            <SelectTrigger className="w-[180px]" data-testid="select-news-sentiment">
              <SelectValue placeholder={t('tools.news.filter.sentiment')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('tools.news.filter.allSentiment')}</SelectItem>
              <SelectItem value="positive">{t('tools.news.filter.positive')}</SelectItem>
              <SelectItem value="negative">{t('tools.news.filter.negative')}</SelectItem>
              <SelectItem value="neutral">{t('tools.news.filter.neutral')}</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TrendingUp className="w-4 h-4" />
            <span>{t('tools.news.autoRefresh')}</span>
          </div>

          <Button variant="outline" className="ml-auto gap-2" data-testid="button-news-alerts">
            <Bell className="w-4 h-4" />
            {t('tools.news.setupAlerts')}
          </Button>
        </div>

        {/* News Feed */}
        <Card>
          <CardHeader>
            <CardTitle>{t('tools.news.feed.title')}</CardTitle>
            <CardDescription>
              {isLoading ? t('tools.news.feed.loading') : t('tools.news.feed.showing', { count: news.length, type: news.length === 1 ? t('tools.news.feed.article') : t('tools.news.feed.articles') })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-muted-foreground">{t('tools.news.feed.loadingMarketNews')}</div>
              </div>
            ) : news.length === 0 ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-muted-foreground">{t('tools.news.feed.noArticles')}</div>
              </div>
            ) : (
              <div className="space-y-4">
                {news.map((article, index) => (
                  <div key={article.id || index} className="p-4 rounded-lg border hover-elevate" data-testid={`card-news-${index}`}>
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {article.sentiment && (
                            <Badge variant={getSentimentColor(article.sentiment)} className="gap-1">
                              {getSentimentIcon(article.sentiment)}
                              {article.sentiment}
                            </Badge>
                          )}
                          {article.category && (
                            <Badge variant="outline">{article.category}</Badge>
                          )}
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(article.publishedAt), 'MMM dd, HH:mm')}
                          </span>
                        </div>
                        <h3 className="font-semibold text-lg mb-1">{article.title}</h3>
                        <p className="text-sm text-muted-foreground">{article.source}</p>
                      </div>
                      <a 
                        href={article.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-shrink-0"
                        data-testid={`link-news-${index}`}
                      >
                        <ExternalLink className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
                      </a>
                    </div>
                    {article.summary && (
                      <p className="text-sm text-muted-foreground mb-2">{article.summary}</p>
                    )}
                    {article.symbols && article.symbols.length > 0 && (
                      <div className="flex gap-1 flex-wrap">
                        {article.symbols.map((symbol, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">{symbol}</Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* News Interpretation Guide */}
        <Card data-testid="card-news-interpretation">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <CardTitle>{t('tools.news.interpretation.title')}</CardTitle>
            </div>
            <CardDescription>{t('tools.news.interpretation.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {newsInterpretation.map((item, index) => (
                <div key={index} className="border-l-4 border-primary pl-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.newsType}</h3>
                      <Badge variant="destructive" className="mt-1">{item.impact}</Badge>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm font-medium mb-2">{t('tools.news.interpretation.howToRead')}</p>
                      <p className="text-sm text-muted-foreground whitespace-pre-line">{item.howToRead}</p>
                    </div>
                    <Alert>
                      <AlertDescription className="text-sm">
                        <strong className="text-primary">{t('tools.news.interpretation.tradingAction')}</strong> {item.tradingAction}
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Trading Strategies */}
        <Card data-testid="card-trading-strategies">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              <CardTitle>{t('tools.news.strategies.title')}</CardTitle>
            </div>
            <CardDescription>{t('tools.news.strategies.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {tradingStrategies.map((strategy, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">{strategy.strategy}</h3>
                  <div className="space-y-3">
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="p-3 bg-muted rounded">
                        <p className="text-xs font-medium mb-1">{t('tools.news.strategies.whenToUse')}</p>
                        <p className="text-sm text-muted-foreground">{strategy.when}</p>
                      </div>
                      <div className="p-3 bg-muted rounded">
                        <p className="text-xs font-medium mb-1">{t('tools.news.strategies.setup')}</p>
                        <p className="text-sm text-muted-foreground">{strategy.setup}</p>
                      </div>
                    </div>
                    <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                      <p className="text-sm font-medium mb-1">{t('tools.news.strategies.executionExample')}</p>
                      <p className="text-sm text-muted-foreground">{strategy.execution}</p>
                    </div>
                    <Alert>
                      <AlertDescription className="text-sm">
                        <strong>{t('tools.news.strategies.riskManagement')}</strong> {strategy.riskManagement}
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pro Tips */}
        <Card data-testid="card-pro-tips">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              <CardTitle>{t('tools.news.proTips.title')}</CardTitle>
            </div>
            <CardDescription>{t('tools.news.proTips.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {proTips.map((item, index) => (
                <div key={index} className="p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    {item.tip}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.detail}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Export & Alert Features */}
        <Card data-testid="card-export-functionality">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Download className="w-5 h-5 text-primary" />
              <CardTitle>{t('tools.news.export.title')}</CardTitle>
            </div>
            <CardDescription>{t('tools.news.export.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">{t('tools.news.export.customAlerts.title')}</h3>
                <p className="text-sm text-muted-foreground mb-3">{t('tools.news.export.customAlerts.description')}</p>
                <Button variant="outline" size="sm" data-testid="button-setup-news-alerts">{t('tools.news.export.customAlerts.button')}</Button>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">{t('tools.news.export.digest.title')}</h3>
                <p className="text-sm text-muted-foreground mb-3">{t('tools.news.export.digest.description')}</p>
                <Button variant="outline" size="sm" data-testid="button-subscribe-digest">{t('tools.news.export.digest.button')}</Button>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">{t('tools.news.export.save.title')}</h3>
                <p className="text-sm text-muted-foreground mb-3">{t('tools.news.export.save.description')}</p>
                <Button variant="outline" size="sm" data-testid="button-saved-news">{t('tools.news.export.save.button')}</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card data-testid="card-faq">
          <CardHeader>
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-primary" />
              <CardTitle>{t('tools.news.faq.title')}</CardTitle>
            </div>
            <CardDescription>{t('tools.news.faq.description')}</CardDescription>
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
      </div>
    </DashboardLayout>
  );
}
