import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LandingLayout } from "@/components/LandingLayout";
import { SEO } from "@/components/SEO";
import { 
  TrendingUp, 
  Shield, 
  Clock, 
  DollarSign, 
  BarChart3, 
  Lock,
  Zap,
  Globe2,
  CheckCircle2
} from "lucide-react";

export default function HomePage() {
  const features = [
    {
      icon: Zap,
      title: "Fast Execution",
      description: "Lightning-fast trade execution with minimal latency and slippage protection.",
    },
    {
      icon: Shield,
      title: "Secure & Regulated",
      description: "Fully regulated platform with bank-level security and compliance.",
    },
    {
      icon: Clock,
      title: "24/7 Trading",
      description: "Trade forex, crypto, and commodities around the clock, any day of the year.",
    },
    {
      icon: DollarSign,
      title: "Transparent Fees",
      description: "Clear, competitive pricing with no hidden fees or surprise charges.",
    },
    {
      icon: BarChart3,
      title: "Advanced Tools",
      description: "Professional charting, technical analysis, and risk management tools.",
    },
    {
      icon: Globe2,
      title: "Global Markets",
      description: "Access to forex, cryptocurrencies, commodities, and indices worldwide.",
    },
  ];

  const benefits = [
    "Institutional-grade trading infrastructure",
    "Multi-language support (EN, DE, CZ)",
    "Dedicated customer support 24/7",
    "Educational resources and trading academy",
    "Mobile and desktop platforms",
    "Secure wallet and instant withdrawals",
  ];

  return (
    <LandingLayout>
      <SEO
        title="Trade Global Markets with Confidence"
        description="Professional trading platform for forex, cryptocurrencies, and commodities. Regulated, secure, and trusted by traders worldwide."
        keywords="forex trading, crypto trading, commodities trading, online trading platform, regulated broker"
        ogTitle="Trading Platform - Professional Forex, Crypto & Commodities Trading"
        ogDescription="Join thousands of traders worldwide. Trade forex, crypto, and commodities with our secure, regulated platform."
      />
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background"></div>
        
        <div className="container relative mx-auto px-4 py-20 md:py-32">
          <div className="mx-auto max-w-4xl text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight" data-testid="text-hero-title">
              Trade Global Markets with Confidence
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-hero-subtitle">
              Professional trading platform for forex, cryptocurrencies, and commodities. 
              Regulated, secure, and trusted by traders worldwide.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="text-base" data-testid="button-hero-register">
                  Create Free Account
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="text-base" data-testid="button-hero-login">
                  Login to Platform
                </Button>
              </Link>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-6 pt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-green-500" />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span>Regulated & Licensed</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>AML/KYC Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-features-title">
              Why Choose Our Platform
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built for traders who demand speed, security, and transparency in every trade.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="hover-elevate transition-all" data-testid={`card-feature-${index}`}>
                <CardHeader>
                  <div className="mb-4">
                    <div className="inline-flex p-3 rounded-lg bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="text-benefits-title">
                Built for Professional Traders
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our platform combines cutting-edge technology with comprehensive market access, 
                giving you everything you need to trade successfully.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3" data-testid={`benefit-${index}`}>
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="hover-elevate transition-all">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-4xl font-bold text-primary">50+</CardTitle>
                  <CardDescription>Currency Pairs</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover-elevate transition-all">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-4xl font-bold text-primary">100+</CardTitle>
                  <CardDescription>Crypto Assets</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover-elevate transition-all">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-4xl font-bold text-primary">24/7</CardTitle>
                  <CardDescription>Customer Support</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover-elevate transition-all">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-4xl font-bold text-primary">0.01s</CardTitle>
                  <CardDescription>Avg. Execution Time</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-cta-title">
            Ready to Start Trading?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of traders who trust our platform for their trading needs. 
            Create your account in minutes and start trading today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/register">
              <Button size="lg" variant="secondary" className="text-base" data-testid="button-cta-register">
                Create Free Account
              </Button>
            </Link>
            <Link href="/education">
              <Button size="lg" variant="outline" className="text-base border-primary-foreground/20 bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground" data-testid="button-cta-learn">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
}
