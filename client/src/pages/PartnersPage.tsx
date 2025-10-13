import { LandingLayout } from "@/components/LandingLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Users, DollarSign, TrendingUp, Award, CheckCircle2 } from "lucide-react";
import { SEO } from "@/components/SEO";

export default function PartnersPage() {
  const benefits = [
    {
      icon: DollarSign,
      title: "Competitive Commissions",
      description: "Earn up to 30% revenue share on referred client trading activity.",
    },
    {
      icon: TrendingUp,
      title: "Recurring Income",
      description: "Build a steady passive income stream with lifetime commissions.",
    },
    {
      icon: Award,
      title: "Marketing Support",
      description: "Access professional marketing materials, banners, and promotional tools.",
    },
    {
      icon: Users,
      title: "Dedicated Manager",
      description: "Get personal support from a dedicated affiliate manager.",
    },
  ];

  const programFeatures = [
    "Real-time tracking and reporting dashboard",
    "Multiple payment options (bank transfer, crypto)",
    "No minimum payout threshold",
    "Sub-affiliate program available",
    "Custom landing pages and tracking links",
    "Regular promotional campaigns and bonuses",
  ];

  return (
    <LandingLayout>
      <SEO
        title="Partners & Affiliates Program"
        description="Join our affiliate program and earn competitive commissions. Up to 30% revenue share, dedicated support, and professional marketing tools."
        keywords="trading affiliate program, broker partnership, affiliate marketing, trading referral"
      />
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold" data-testid="text-partners-title">
              Partner & Affiliate Program
            </h1>
            <p className="text-xl text-muted-foreground">
              Join our affiliate program and earn competitive commissions by referring traders to our platform.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-benefits-title">
              Why Partner With Us
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Lucrative rewards, powerful tools, and ongoing support to help you succeed.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <Card key={index} className="hover-elevate transition-all" data-testid={`card-benefit-${index}`}>
                <CardHeader>
                  <div className="mb-4">
                    <div className="inline-flex p-3 rounded-lg bg-primary/10">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{benefit.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Commission Structure */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-commission-title">
                Commission Structure
              </h2>
              <p className="text-lg text-muted-foreground">
                Transparent and competitive commission rates based on trading volume.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="hover-elevate transition-all">
                <CardHeader className="text-center space-y-4">
                  <CardTitle className="text-lg">Starter</CardTitle>
                  <div>
                    <p className="text-4xl font-bold text-primary">15%</p>
                    <p className="text-sm text-muted-foreground mt-2">Revenue Share</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    For affiliates with 0-10 active traders
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-elevate transition-all border-primary">
                <CardHeader className="text-center space-y-4">
                  <CardTitle className="text-lg">Professional</CardTitle>
                  <div>
                    <p className="text-4xl font-bold text-primary">25%</p>
                    <p className="text-sm text-muted-foreground mt-2">Revenue Share</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    For affiliates with 11-50 active traders
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-elevate transition-all">
                <CardHeader className="text-center space-y-4">
                  <CardTitle className="text-lg">Elite</CardTitle>
                  <div>
                    <p className="text-4xl font-bold text-primary">30%</p>
                    <p className="text-sm text-muted-foreground mt-2">Revenue Share</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    For affiliates with 50+ active traders
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Program Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="text-features-title">
                Program Features
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Everything you need to promote our platform and maximize your earnings.
              </p>
              <ul className="space-y-4">
                {programFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3" data-testid={`feature-${index}`}>
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Card className="hover-elevate transition-all bg-primary text-primary-foreground">
              <CardHeader className="space-y-4">
                <CardTitle className="text-2xl">How It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/20 flex-shrink-0">
                      <span className="text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Sign Up</h3>
                      <p className="text-sm opacity-90">Create your affiliate account and get approved within 24 hours.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/20 flex-shrink-0">
                      <span className="text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Promote</h3>
                      <p className="text-sm opacity-90">Share your unique referral link using our marketing materials.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/20 flex-shrink-0">
                      <span className="text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Earn</h3>
                      <p className="text-sm opacity-90">Receive commissions for every referred trader's activity.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold" data-testid="text-cta-title">
              Ready to Become a Partner?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join our affiliate program today and start earning competitive commissions.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link href="/contact">
                <Button size="lg" data-testid="button-apply-now">
                  Apply Now
                </Button>
              </Link>
              <Link href="/register">
                <Button size="lg" variant="outline" data-testid="button-learn-more">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
}
