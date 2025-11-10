import { LandingLayout } from "@/components/LandingLayout";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";
import { TrendingUp, BarChart3, Globe, DollarSign, Zap } from "lucide-react";
import { useVariant } from "@/layouts/shared/useVariant";
import { HeroRenderer } from "@/components/variant-rendering";

export default function MarketInfoPage() {
  const variant = useVariant();
  const marketInfoConfig = variant.pages.marketInfo;

  const markets = [
    { name: "Forex", icon: DollarSign, pairs: "70+", spread: "From 0.8 pips", description: "Major, minor, and exotic currency pairs" },
    { name: "Crypto", icon: Zap, pairs: "50+", spread: "From 0.1%", description: "Bitcoin, Ethereum, and altcoins" },
    { name: "Commodities", icon: BarChart3, pairs: "30+", spread: "Variable", description: "Gold, oil, and agricultural products" },
  ];

  const heroProps = {
    headline: "Market Information",
    subheadline: "Trade global markets with confidence",
    cta: "Explore Markets",
    style: 'standard' as const,
  };

  // Data Heavy Layout
  const DataHeavyLayout = () => (
    <div className="container mx-auto py-16 px-4">
      <div className="grid lg:grid-cols-3 gap-8">
        {markets.map((market, idx) => {
          const Icon = market.icon;
          return (
            <Card key={idx} data-testid={`market-${idx}`}>
              <CardHeader>
                <Icon className="w-12 h-12 text-primary mb-4" />
                <CardTitle>{market.name}</CardTitle>
                <CardDescription>{market.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Instruments</span>
                    <span className="font-semibold">{market.pairs}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Spread</span>
                    <span className="font-semibold">{market.spread}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">Leverage</span>
                    <span className="font-semibold">Up to 1:500</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-sm text-muted-foreground">Trading Hours</span>
                    <span className="font-semibold">24/5</span>
                  </div>
                  <Link href="/markets">
                    <Button className="w-full mt-4" data-testid={`button-view-markets-${idx}`}>View Markets</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );

  // Data Driven Layout
  const DataDrivenLayout = () => (
    <div className="container mx-auto py-16 px-4">
      <Tabs defaultValue="forex" className="max-w-6xl mx-auto">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          {markets.map((market, idx) => (
            <TabsTrigger key={idx} value={market.name.toLowerCase()} data-testid={`tab-${market.name.toLowerCase()}`}>
              {market.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {markets.map((market, idx) => {
          const Icon = market.icon;
          return (
            <TabsContent key={idx} value={market.name.toLowerCase()}>
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <Icon className="w-10 h-10 text-primary mb-3" />
                    <CardTitle className="text-2xl">{market.name} Trading</CardTitle>
                    <CardDescription>{market.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Available Pairs:</span>
                        <Badge variant="secondary">{market.pairs}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Typical Spread:</span>
                        <Badge variant="secondary">{market.spread}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Key Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        <span>Low spreads and fast execution</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        <span>Advanced charting tools</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        <span>Risk management features</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );

  // Educational Layout
  const EducationalLayout = () => (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Understanding Markets</h2>
        <p className="text-lg text-muted-foreground">Learn about different trading markets</p>
      </div>
      <div className="space-y-8">
        {markets.map((market, idx) => {
          const Icon = market.icon;
          return (
            <Card key={idx} data-testid={`market-${idx}`}>
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{market.name} Market</CardTitle>
                </div>
                <CardDescription className="text-base">{market.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <p className="text-muted-foreground mb-4">
                    The {market.name} market offers traders access to {market.pairs} trading instruments with competitive spreads starting {market.spread}. This market is ideal for both beginners and experienced traders.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mt-6">
                    <div className="p-4 rounded-lg bg-muted/50">
                      <h4 className="font-semibold mb-2">Best For</h4>
                      <p className="text-sm text-muted-foreground">Traders seeking liquidity and volatility</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <h4 className="font-semibold mb-2">Trading Hours</h4>
                      <p className="text-sm text-muted-foreground">24 hours, 5 days a week</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );

  // Beginner Friendly Layout
  const BeginnerFriendlyLayout = () => (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Start Trading Today</h2>
        <p className="text-lg text-muted-foreground">Simple guide to our markets</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {markets.map((market, idx) => {
          const Icon = market.icon;
          return (
            <Card key={idx} className="text-center hover-elevate" data-testid={`market-${idx}`}>
              <CardHeader>
                <Icon className="w-16 h-16 mx-auto mb-4 text-primary" />
                <CardTitle className="text-xl">{market.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{market.description}</p>
                <div className="mb-4">
                  <Badge variant="outline" className="text-lg">{market.pairs}</Badge>
                </div>
                <Link href="/markets">
                  <Button className="w-full" data-testid={`button-learn-more-${idx}`}>Learn More</Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <Card className="max-w-2xl mx-auto bg-primary/5">
        <CardHeader>
          <CardTitle>New to Trading?</CardTitle>
          <CardDescription>Start with our educational resources</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/education">
            <Button size="lg" data-testid="button-visit-education">Visit Education Center</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );

  // Tool Interactive Layout
  const ToolInteractiveLayout = () => (
    <div className="container mx-auto py-16 px-4">
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-3xl font-bold mb-6">Market Selector</h2>
          <p className="text-lg text-muted-foreground mb-8">Choose a market to see details</p>
          <div className="space-y-4">
            {markets.map((market, idx) => {
              const Icon = market.icon;
              return (
                <Card key={idx} className="hover-elevate cursor-pointer" data-testid={`selector-${idx}`}>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Icon className="w-8 h-8 text-primary" />
                      <div>
                        <CardTitle>{market.name}</CardTitle>
                        <CardDescription>{market.pairs} instruments</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
        <div>
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Market Details</CardTitle>
              <CardDescription>Select a market to view information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Trading Conditions</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Competitive spreads</li>
                    <li>• Fast execution</li>
                    <li>• High leverage available</li>
                    <li>• 24/5 trading</li>
                  </ul>
                </div>
                <Link href="/register">
                  <Button className="w-full mt-4" data-testid="button-tool-open-account">Open Account</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  // Layout dispatcher
  const renderContent = () => {
    switch (marketInfoConfig.layout) {
      case 'data-heavy':
        return <DataHeavyLayout />;
      
      case 'data-driven':
        return <DataDrivenLayout />;
      
      case 'educational':
        return <EducationalLayout />;
      
      case 'beginner-friendly':
        return <BeginnerFriendlyLayout />;
      
      case 'tool-interactive':
        return <ToolInteractiveLayout />;
      
      default:
        return <EducationalLayout />;
    }
  };

  return (
    <LandingLayout>
      <SEO
        title="Market Information"
        description="Learn about trading markets and instruments"
      />
      <div className="min-h-screen">
        <HeroRenderer {...heroProps} />
        {renderContent()}
      </div>
    </LandingLayout>
  );
}
