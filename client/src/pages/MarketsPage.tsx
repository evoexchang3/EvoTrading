import { Link } from "wouter";
import { LandingLayout } from "@/components/LandingLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { TrendingUp, TrendingDown, ArrowRight, DollarSign, Bitcoin, Gem } from "lucide-react";

export default function MarketsPage() {
  const { t } = useLanguage();

  const markets = [
    {
      id: 'forex',
      title: t('markets.forex.title'),
      description: t('markets.forex.description'),
      icon: DollarSign,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-950',
      pairs: [
        { symbol: 'EUR/USD', price: '1.0892', change: '+0.12%', isPositive: true },
        { symbol: 'GBP/USD', price: '1.2634', change: '-0.08%', isPositive: false },
        { symbol: 'USD/JPY', price: '149.82', change: '+0.25%', isPositive: true },
        { symbol: 'AUD/USD', price: '0.6523', change: '+0.18%', isPositive: true },
      ],
      stats: [
        { label: t('markets.forex.pairs'), value: '50+' },
        { label: t('markets.forex.spread'), value: '0.1' },
        { label: t('markets.forex.leverage'), value: '1:500' },
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
        { symbol: 'BTC/USD', price: '43,256', change: '+2.34%', isPositive: true },
        { symbol: 'ETH/USD', price: '2,287', change: '+1.89%', isPositive: true },
        { symbol: 'XRP/USD', price: '0.6234', change: '-0.45%', isPositive: false },
        { symbol: 'LTC/USD', price: '72.45', change: '+0.92%', isPositive: true },
      ],
      stats: [
        { label: t('markets.crypto.coins'), value: '30+' },
        { label: t('markets.crypto.availability'), value: '24/7' },
        { label: t('markets.crypto.minDeposit'), value: '$50' },
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
        { symbol: 'GOLD', price: '2,048', change: '+0.45%', isPositive: true },
        { symbol: 'SILVER', price: '24.56', change: '+0.32%', isPositive: true },
        { symbol: 'OIL', price: '78.92', change: '-0.15%', isPositive: false },
        { symbol: 'GAS', price: '3.245', change: '+1.12%', isPositive: true },
      ],
      stats: [
        { label: t('markets.commodities.products'), value: '20+' },
        { label: t('markets.commodities.spread'), value: '0.3' },
        { label: t('markets.commodities.contract'), value: 'CFD' },
      ],
    },
  ];

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

        {/* Markets Grid */}
        <section className="py-16" aria-label="Available trading markets">
          <div className="container mx-auto px-4">
            <div className="space-y-12">
              {markets.map((market, index) => {
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
                        <Link href={`/trading/${market.pairs[0].symbol}`}>
                          <Button variant="outline" size="sm" data-testid={`button-trade-${market.id}`}>
                            {t('markets.tradeBtnText')}
                          </Button>
                        </Link>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      {/* Live Prices */}
                      <div className="grid md:grid-cols-4 gap-4 mb-6">
                        {market.pairs.map((pair) => (
                          <div
                            key={pair.symbol}
                            className="p-4 rounded-lg bg-muted/50 hover-elevate"
                            data-testid={`price-card-${pair.symbol.toLowerCase().replace('/', '-')}`}
                          >
                            <div className="font-semibold text-sm mb-1" data-testid={`symbol-${pair.symbol}`}>
                              {pair.symbol}
                            </div>
                            <div className="text-2xl font-bold mb-1" data-testid={`price-${pair.symbol}`}>
                              {pair.price}
                            </div>
                            <div
                              className={`flex items-center gap-1 text-sm ${
                                pair.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                              }`}
                              data-testid={`change-${pair.symbol}`}
                            >
                              {pair.isPositive ? (
                                <TrendingUp className="w-4 h-4" aria-label="Price up" />
                              ) : (
                                <TrendingDown className="w-4 h-4" aria-label="Price down" />
                              )}
                              {pair.change}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Market Stats */}
                      <div className="grid md:grid-cols-3 gap-6 pt-6 border-t">
                        {market.stats.map((stat, idx) => (
                          <div key={idx} data-testid={`stat-${market.id}-${idx}`}>
                            <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
                            <div className="text-2xl font-bold">{stat.value}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-muted/20" aria-label="Start trading call to action">
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
