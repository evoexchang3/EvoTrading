import { LandingLayout } from "@/components/LandingLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, TrendingUp, Users, Globe2, Award, Target } from "lucide-react";
import { SEO } from "@/components/SEO";

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: "Security First",
      description: "We prioritize the security of your funds and data with bank-level encryption and compliance.",
    },
    {
      icon: TrendingUp,
      title: "Transparency",
      description: "Clear pricing, no hidden fees, and full disclosure of all trading conditions.",
    },
    {
      icon: Users,
      title: "Client Success",
      description: "Your trading success is our success. We provide tools and support to help you achieve your goals.",
    },
    {
      icon: Globe2,
      title: "Global Access",
      description: "Trade global markets 24/7 from anywhere in the world with our reliable platform.",
    },
  ];

  return (
    <LandingLayout>
      <SEO
        title="About Us"
        description="Learn about our professional trading platform. We provide traders worldwide with access to forex, cryptocurrencies, and commodities markets."
        keywords="about trading platform, regulated broker, trading company, forex broker"
      />
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold" data-testid="text-about-title">
              About Our Platform
            </h1>
            <p className="text-xl text-muted-foreground">
              A professional trading platform built for traders who demand excellence, 
              security, and transparency in every trade.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="text-mission-title">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                We are dedicated to providing traders worldwide with access to professional-grade 
                trading tools and markets. Our mission is to democratize trading by offering 
                institutional-quality infrastructure to retail traders.
              </p>
              <p className="text-lg text-muted-foreground">
                Founded by experienced traders and technologists, we understand the challenges 
                traders face. We've built a platform that addresses these challenges with 
                cutting-edge technology, comprehensive education, and unwavering support.
              </p>
            </div>
            <div className="grid gap-4">
              <Card className="hover-elevate transition-all">
                <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Regulated & Licensed</CardTitle>
                    <CardDescription>Fully compliant with international financial regulations</CardDescription>
                  </div>
                </CardHeader>
              </Card>
              <Card className="hover-elevate transition-all">
                <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Client-Focused</CardTitle>
                    <CardDescription>Your success drives everything we do</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-values-title">
              Our Core Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide every decision we make and every feature we build.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Card key={index} className="hover-elevate transition-all" data-testid={`card-value-${index}`}>
                <CardHeader>
                  <div className="mb-4">
                    <div className="inline-flex p-3 rounded-lg bg-primary/10">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-services-title">
              What We Offer
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive trading services across multiple asset classes.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="hover-elevate transition-all">
              <CardHeader>
                <CardTitle className="text-xl">Forex Trading</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Trade 50+ currency pairs with tight spreads and deep liquidity. 
                  Access major, minor, and exotic pairs 24/5.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all">
              <CardHeader>
                <CardTitle className="text-xl">Cryptocurrency</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Trade 100+ cryptocurrencies including Bitcoin, Ethereum, and altcoins. 
                  24/7 trading with competitive fees.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all">
              <CardHeader>
                <CardTitle className="text-xl">Commodities & Indices</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Access gold, silver, oil, and major stock indices. 
                  Diversify your portfolio with alternative assets.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-team-title">
              Leadership Team
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our team combines decades of experience in finance, technology, and trading.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <p className="text-center text-muted-foreground">
              Led by industry veterans with backgrounds from top financial institutions and technology companies, 
              our leadership team is committed to building the most reliable and user-friendly trading platform 
              in the industry. We're traders ourselves, and we build the platform we wish existed when we started.
            </p>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
}
