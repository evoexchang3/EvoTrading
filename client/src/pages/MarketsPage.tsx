import { Link } from "wouter";
import { LandingLayout } from "@/components/LandingLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { useVariant } from "@/layouts/shared/useVariant";
import { TrendingUp, TrendingDown, ArrowRight, DollarSign, Bitcoin, Gem } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface MarketPair {
  symbol: string;
  price: string;
  change: string;
  isPositive: boolean;
  spread?: string;
  leverage?: string;
  region?: 'Americas' | 'Europe' | 'Asia';
  popularity?: number;
}

interface MarketStat {
  label: string;
  value: string;
  type: 'spread' | 'leverage' | 'other';
}

interface MarketCategory {
  id: string;
  title: string;
  description: string;
  icon: typeof DollarSign;
  color: string;
  bgColor: string;
  pairs: MarketPair[];
  stats: MarketStat[];
}

export default function MarketsPage() {
  const { t } = useLanguage();
  const variant = useVariant();
  const marketsConfig = variant.pages.markets;

  const markets: MarketCategory[] = [
    {
      id: 'forex',
      title: t('markets.forex.title'),
      description: t('markets.forex.description'),
      icon: DollarSign,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-950',
      pairs: [
        { symbol: 'EUR/USD', price: '1.0892', change: '+0.12%', isPositive: true, spread: '0.1', leverage: '1:500', region: 'Europe', popularity: 95 },
        { symbol: 'GBP/USD', price: '1.2634', change: '-0.08%', isPositive: false, spread: '0.2', leverage: '1:500', region: 'Europe', popularity: 88 },
        { symbol: 'USD/JPY', price: '149.82', change: '+0.25%', isPositive: true, spread: '0.1', leverage: '1:500', region: 'Asia', popularity: 92 },
        { symbol: 'AUD/USD', price: '0.6523', change: '+0.18%', isPositive: true, spread: '0.3', leverage: '1:400', region: 'Asia', popularity: 75 },
      ],
      stats: [
        { label: t('markets.forex.pairs'), value: '50+', type: 'other' },
        { label: t('markets.forex.spread'), value: '0.1', type: 'spread' },
        { label: t('markets.forex.leverage'), value: '1:500', type: 'leverage' },
      ],
    },
    {
      id: 'crypto',
      title: t('markets.crypto.title'),
      description: t('markets.crypto.description'),
      icon: Bitcoin,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-950',
      pairs: [
        { symbol: 'BTC/USD', price: '43,256', change: '+2.34%', isPositive: true, spread: '10', leverage: '1:100', region: 'Americas', popularity: 100 },
        { symbol: 'ETH/USD', price: '2,287', change: '+1.89%', isPositive: true, spread: '5', leverage: '1:100', region: 'Americas', popularity: 98 },
        { symbol: 'XRP/USD', price: '0.6234', change: '-0.45%', isPositive: false, spread: '2', leverage: '1:50', region: 'Americas', popularity: 82 },
        { symbol: 'LTC/USD', price: '72.45', change: '+0.92%', isPositive: true, spread: '3', leverage: '1:75', region: 'Americas', popularity: 70 },
      ],
      stats: [
        { label: t('markets.crypto.coins'), value: '30+', type: 'other' },
        { label: t('markets.crypto.availability'), value: '24/7', type: 'other' },
        { label: t('markets.crypto.minDeposit'), value: '$50', type: 'other' },
      ],
    },
    {
      id: 'commodities',
      title: t('markets.commodities.title'),
      description: t('markets.commodities.description'),
      icon: Gem,
      color: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-100 dark:bg-yellow-950',
      pairs: [
        { symbol: 'GOLD', price: '2,048', change: '+0.45%', isPositive: true, spread: '0.5', leverage: '1:200', region: 'Americas', popularity: 90 },
        { symbol: 'SILVER', price: '24.56', change: '+0.32%', isPositive: true, spread: '0.3', leverage: '1:200', region: 'Americas', popularity: 78 },
        { symbol: 'OIL', price: '78.92', change: '-0.15%', isPositive: false, spread: '0.4', leverage: '1:100', region: 'Europe', popularity: 85 },
        { symbol: 'GAS', price: '3.245', change: '+1.12%', isPositive: true, spread: '0.2', leverage: '1:100', region: 'Americas', popularity: 68 },
      ],
      stats: [
        { label: t('markets.commodities.products'), value: '20+', type: 'other' },
        { label: t('markets.commodities.spread'), value: '0.3', type: 'spread' },
        { label: t('markets.commodities.contract'), value: 'CFD', type: 'other' },
      ],
    },
  ];

  // Grouping Functions
  const getGroupedMarkets = () => {
    switch (marketsConfig.grouping) {
      case 'by-region':
        return groupByRegion();
      case 'popularity-weighted':
        return groupByPopularity();
      case 'by-type':
      default:
        return markets;
    }
  };

  const groupByRegion = () => {
    const regions = ['Americas', 'Europe', 'Asia'] as const;
    return regions.map(region => {
      const allPairs: MarketPair[] = [];
      markets.forEach(market => {
        const regionalPairs = market.pairs.filter(pair => pair.region === region);
        allPairs.push(...regionalPairs);
      });

      return {
        id: region.toLowerCase(),
        title: region,
        description: `Markets available in ${region}`,
        icon: DollarSign,
        color: 'text-blue-600 dark:text-blue-400',
        bgColor: 'bg-blue-100 dark:bg-blue-950',
        pairs: allPairs,
        stats: [
          { label: 'Markets', value: `${allPairs.length}`, type: 'other' },
          { label: 'Region', value: region, type: 'other' },
        ],
      };
    }).filter(region => region.pairs.length > 0);
  };

  const groupByPopularity = () => {
    const allPairs: MarketPair[] = [];
    
    markets.forEach(market => {
      market.pairs.forEach(pair => {
        allPairs.push(pair);
      });
    });

    allPairs.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));

    return [{
      id: 'popular',
      title: 'Popular Markets',
      description: 'Most traded instruments across all categories',
      icon: TrendingUp,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-950',
      pairs: allPairs,
      stats: [
        { label: 'Total Markets', value: `${allPairs.length}`, type: 'other' },
        { label: 'Sorted By', value: 'Popularity', type: 'other' },
      ],
    }];
  };

  // Mini Chart Component (placeholder)
  const MiniChart = ({ isPositive }: { isPositive: boolean }) => {
    return (
      <div className="h-8 w-16 flex items-end gap-0.5" aria-label="Price trend indicator">
        {[40, 60, 35, 70, 45, 80, 55].map((height, i) => (
          <div
            key={i}
            className={`flex-1 rounded-sm ${
              isPositive
                ? 'bg-green-500/30 dark:bg-green-400/30'
                : 'bg-red-500/30 dark:bg-red-400/30'
            }`}
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    );
  };

  // Price Card Component (for cards layout)
  const PriceCard = ({ pair, marketId }: { pair: MarketPair; marketId: string }) => {
    const spacingClass = marketsConfig.compactView ? 'p-3' : 'p-4';
    const textSizeClass = marketsConfig.compactView ? 'text-xl' : 'text-2xl';
    
    return (
      <div
        className={`${spacingClass} rounded-lg bg-muted/50 hover-elevate`}
        data-testid={`price-card-${pair.symbol.toLowerCase().replace('/', '-')}`}
      >
        <div className="font-semibold text-sm mb-1" data-testid={`symbol-${pair.symbol}`}>
          {pair.symbol}
        </div>
        <div className={`${textSizeClass} font-bold mb-1`} data-testid={`price-${pair.symbol}`}>
          {pair.price}
        </div>
        <div
          className={`flex items-center gap-1 text-sm ${
            pair.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          }`}
          data-testid={`change-${pair.symbol}`}
        >
          {pair.isPositive ? (
            <TrendingUp className="w-4 h-4" aria-label={t('markets.aria.priceUp')} />
          ) : (
            <TrendingDown className="w-4 h-4" aria-label={t('markets.aria.priceDown')} />
          )}
          {pair.change}
        </div>
        {marketsConfig.showCharts && (
          <div className="mt-2">
            <MiniChart isPositive={pair.isPositive} />
          </div>
        )}
      </div>
    );
  };

  // Render Functions for Each Layout Type
  const renderTable = (groupedMarkets: MarketCategory[]) => {
    return (
      <div className="space-y-8">
        {groupedMarkets.map((market) => {
          const Icon = market.icon;
          return (
            <Card key={market.id} data-testid={`card-market-${market.id}`}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${market.bgColor}`}>
                    <Icon className={`w-8 h-8 ${market.color}`} aria-hidden="true" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl" data-testid={`heading-${market.id}`}>
                      {market.title}
                    </CardTitle>
                    <CardDescription data-testid={`text-${market.id}-description`}>
                      {market.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Change</TableHead>
                      {marketsConfig.showCharts && <TableHead>Trend</TableHead>}
                      {marketsConfig.showSpread && <TableHead>Spread</TableHead>}
                      {marketsConfig.showLeverage && <TableHead>Leverage</TableHead>}
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {market.pairs.map((pair) => (
                      <TableRow key={pair.symbol} data-testid={`row-${pair.symbol.toLowerCase().replace('/', '-')}`}>
                        <TableCell className="font-semibold" data-testid={`symbol-${pair.symbol}`}>
                          {pair.symbol}
                        </TableCell>
                        <TableCell className="font-bold" data-testid={`price-${pair.symbol}`}>
                          {pair.price}
                        </TableCell>
                        <TableCell data-testid={`change-${pair.symbol}`}>
                          <div
                            className={`flex items-center gap-1 ${
                              pair.isPositive
                                ? 'text-green-600 dark:text-green-400'
                                : 'text-red-600 dark:text-red-400'
                            }`}
                          >
                            {pair.isPositive ? (
                              <TrendingUp className="w-4 h-4" aria-label={t('markets.aria.priceUp')} />
                            ) : (
                              <TrendingDown className="w-4 h-4" aria-label={t('markets.aria.priceDown')} />
                            )}
                            {pair.change}
                          </div>
                        </TableCell>
                        {marketsConfig.showCharts && (
                          <TableCell>
                            <MiniChart isPositive={pair.isPositive} />
                          </TableCell>
                        )}
                        {marketsConfig.showSpread && <TableCell>{pair.spread || 'N/A'}</TableCell>}
                        {marketsConfig.showLeverage && <TableCell>{pair.leverage || 'N/A'}</TableCell>}
                        <TableCell>
                          <Link href={`/trading/${pair.symbol.replace('/', '-')}`}>
                            <Button size="sm" variant="outline" data-testid={`button-trade-${pair.symbol.toLowerCase().replace('/', '-')}`}>
                              Trade
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };

  const renderCards = (groupedMarkets: MarketCategory[]) => {
    const gridClass = marketsConfig.compactView ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-4';
    const spacingClass = marketsConfig.compactView ? 'space-y-8' : 'space-y-12';
    
    return (
      <div className={spacingClass}>
        {groupedMarkets.map((market) => {
          const Icon = market.icon;
          return (
            <Card key={market.id} className="overflow-hidden" data-testid={`card-market-${market.id}`}>
              <CardHeader className="bg-muted/30">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${market.bgColor}`}>
                      <Icon className={`w-8 h-8 ${market.color}`} aria-hidden="true" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl" data-testid={`heading-${market.id}`}>
                        {market.title}
                      </CardTitle>
                      <CardDescription className="mt-1" data-testid={`text-${market.id}-description`}>
                        {market.description}
                      </CardDescription>
                    </div>
                  </div>
                  <Link href={`/trading/${market.pairs[0].symbol.replace('/', '-')}`}>
                    <Button variant="outline" size="sm" data-testid={`button-trade-${market.id}`}>
                      {t('markets.tradeBtnText')}
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className={`grid gap-4 mb-6 ${gridClass}`}>
                  {market.pairs.map((pair) => (
                    <PriceCard key={pair.symbol} pair={pair} marketId={market.id} />
                  ))}
                </div>

                {/* Market Stats */}
                <div className={`grid ${marketsConfig.compactView ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-6 pt-6 border-t`}>
                  {market.stats.map((stat, idx) => {
                    // Filter stats based on config using explicit type metadata
                    if (!marketsConfig.showSpread && stat.type === 'spread') return null;
                    if (!marketsConfig.showLeverage && stat.type === 'leverage') return null;
                    
                    return (
                      <div key={idx} data-testid={`stat-${market.id}-${idx}`}>
                        <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
                        <div className="text-2xl font-bold">{stat.value}</div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };

  const renderAccordion = (groupedMarkets: MarketCategory[]) => {
    return (
      <Accordion type="single" collapsible className="space-y-4" defaultValue={groupedMarkets[0]?.id}>
        {groupedMarkets.map((market) => {
          const Icon = market.icon;
          return (
            <AccordionItem
              key={market.id}
              value={market.id}
              className="border rounded-lg overflow-hidden"
              data-testid={`accordion-item-${market.id}`}
            >
              <AccordionTrigger className="px-6 hover:no-underline hover:bg-muted/50">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${market.bgColor}`}>
                    <Icon className={`w-6 h-6 ${market.color}`} aria-hidden="true" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-lg" data-testid={`heading-${market.id}`}>
                      {market.title}
                    </div>
                    <div className="text-sm text-muted-foreground" data-testid={`text-${market.id}-description`}>
                      {market.description}
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid md:grid-cols-4 gap-4 mb-6">
                  {market.pairs.map((pair) => (
                    <PriceCard key={pair.symbol} pair={pair} marketId={market.id} />
                  ))}
                </div>
                
                {/* Market Stats */}
                <div className="grid md:grid-cols-3 gap-6 pt-6 border-t">
                  {market.stats.map((stat, idx) => {
                    if (!marketsConfig.showSpread && stat.type === 'spread') return null;
                    if (!marketsConfig.showLeverage && stat.type === 'leverage') return null;
                    
                    return (
                      <div key={idx} data-testid={`stat-${market.id}-${idx}`}>
                        <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
                        <div className="text-2xl font-bold">{stat.value}</div>
                      </div>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    );
  };

  const renderTabs = (groupedMarkets: MarketCategory[]) => {
    return (
      <Tabs defaultValue={groupedMarkets[0]?.id} className="w-full">
        <TabsList className="w-full justify-start mb-8 flex-wrap h-auto" data-testid="tabs-markets">
          {groupedMarkets.map((market) => {
            const Icon = market.icon;
            return (
              <TabsTrigger
                key={market.id}
                value={market.id}
                className="gap-2"
                data-testid={`tab-trigger-${market.id}`}
              >
                <Icon className="w-4 h-4" />
                {market.title}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {groupedMarkets.map((market) => {
          const Icon = market.icon;
          return (
            <TabsContent key={market.id} value={market.id} data-testid={`tab-content-${market.id}`}>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${market.bgColor}`}>
                      <Icon className={`w-8 h-8 ${market.color}`} aria-hidden="true" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl" data-testid={`heading-${market.id}`}>
                        {market.title}
                      </CardTitle>
                      <CardDescription data-testid={`text-${market.id}-description`}>
                        {market.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4 mb-6">
                    {market.pairs.map((pair) => (
                      <PriceCard key={pair.symbol} pair={pair} marketId={market.id} />
                    ))}
                  </div>

                  {/* Market Stats */}
                  <div className="grid md:grid-cols-3 gap-6 pt-6 border-t">
                    {market.stats.map((stat, idx) => {
                      if (!marketsConfig.showSpread && stat.type === 'spread') return null;
                      if (!marketsConfig.showLeverage && stat.type === 'leverage') return null;
                      
                      return (
                        <div key={idx} data-testid={`stat-${market.id}-${idx}`}>
                          <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
                          <div className="text-2xl font-bold">{stat.value}</div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          );
        })}
      </Tabs>
    );
  };

  const groupedMarkets = getGroupedMarkets();

  return (
    <LandingLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4" variant="secondary" data-testid="badge-markets">
                {t('markets.hero.badge')}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="heading-hero">
                {t('markets.hero.title')}
              </h1>
              <p className="text-xl text-muted-foreground mb-8" data-testid="text-hero-description">
                {t('markets.hero.subtitle')}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/register">
                  <Button size="lg" data-testid="button-start-trading">
                    {t('markets.hero.cta')}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/info/market-heatmap">
                  <Button size="lg" variant="outline" data-testid="button-market-heatmap">
                    {t('markets.hero.viewHeatmap')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Markets Section - Dynamic Layout */}
        <section className="py-16" aria-label={t('markets.aria.marketsList')}>
          <div className="container mx-auto px-4">
            {marketsConfig.layout === 'table' && renderTable(groupedMarkets)}
            {marketsConfig.layout === 'cards' && renderCards(groupedMarkets)}
            {marketsConfig.layout === 'accordion' && renderAccordion(groupedMarkets)}
            {marketsConfig.layout === 'tabs' && renderTabs(groupedMarkets)}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-muted/20" aria-label={t('markets.aria.ctaSection')}>
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4" data-testid="heading-cta">
                {t('markets.cta.title')}
              </h2>
              <p className="text-lg text-muted-foreground mb-8" data-testid="text-cta-description">
                {t('markets.cta.subtitle')}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/register">
                  <Button size="lg" data-testid="button-cta-register">
                    {t('markets.cta.button')}
                  </Button>
                </Link>
                <Link href="/customer/account-types">
                  <Button size="lg" variant="outline" data-testid="button-account-types">
                    {t('markets.cta.compareAccounts')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </LandingLayout>
  );
}
