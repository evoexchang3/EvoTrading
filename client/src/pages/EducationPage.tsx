import { LandingLayout } from "@/components/LandingLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { BookOpen, TrendingUp, Shield, BarChart3, Lightbulb, GraduationCap } from "lucide-react";
import { SEO } from "@/components/SEO";

export default function EducationPage() {
  const topics = [
    {
      icon: BookOpen,
      title: "Trading Basics",
      description: "Understanding Markets",
      content: "Learn the fundamentals of financial markets, how they work, and the basics of trading different asset classes including forex, crypto, and commodities.",
    },
    {
      icon: TrendingUp,
      title: "Technical Analysis",
      description: "Chart Patterns & Indicators",
      content: "Master chart patterns, technical indicators, and price action analysis to identify trading opportunities and make informed decisions.",
    },
    {
      icon: Shield,
      title: "Risk Management",
      description: "Protect Your Capital",
      content: "Learn essential risk management techniques including position sizing, stop-loss strategies, and portfolio diversification to protect your trading capital.",
    },
    {
      icon: BarChart3,
      title: "Trading Strategies",
      description: "Develop Your Edge",
      content: "Explore various trading strategies from day trading to swing trading, and learn how to develop a strategy that fits your goals and risk tolerance.",
    },
    {
      icon: Lightbulb,
      title: "Market Psychology",
      description: "Trading Mindset",
      content: "Understand the psychological aspects of trading, emotional control, and how to develop the mental discipline required for consistent success.",
    },
    {
      icon: GraduationCap,
      title: "Advanced Concepts",
      description: "Professional Techniques",
      content: "Dive into advanced topics including algorithmic trading, options strategies, and institutional trading methods for experienced traders.",
    },
  ];

  const resources = [
    {
      title: "Forex Trading Guide",
      description: "Complete guide to forex trading covering currency pairs, pips, lots, and leverage.",
      level: "Beginner",
    },
    {
      title: "Cryptocurrency Fundamentals",
      description: "Understanding blockchain technology, crypto markets, and digital asset trading.",
      level: "Beginner",
    },
    {
      title: "Technical Analysis Masterclass",
      description: "In-depth course on chart patterns, indicators, and technical trading strategies.",
      level: "Intermediate",
    },
    {
      title: "Risk Management Essentials",
      description: "Protecting your capital with proper risk management and position sizing.",
      level: "Beginner",
    },
    {
      title: "Algorithmic Trading",
      description: "Introduction to automated trading systems and strategy development.",
      level: "Advanced",
    },
  ];

  return (
    <LandingLayout>
      <SEO
        title="Trading Education & Learning Center"
        description="Learn trading from basics to advanced strategies. Free educational resources, guides, and tutorials for forex, crypto, and commodities trading."
        keywords="trading education, learn forex, crypto trading course, trading strategies, technical analysis"
      />
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold" data-testid="text-education-title">
              Trading Education Center
            </h1>
            <p className="text-xl text-muted-foreground">
              Learn from comprehensive guides, tutorials, and courses designed to help you 
              become a successful trader, regardless of your experience level.
            </p>
          </div>
        </div>
      </section>

      {/* Topics Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-topics-title">
              What You'll Learn
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive education covering every aspect of trading from basics to advanced strategies.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic, index) => (
              <Card key={index} className="hover-elevate transition-all" data-testid={`card-topic-${index}`}>
                <CardHeader>
                  <div className="mb-4">
                    <div className="inline-flex p-3 rounded-lg bg-primary/10">
                      <topic.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{topic.title}</CardTitle>
                  <CardDescription className="font-medium text-primary">{topic.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{topic.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Resources */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-resources-title">
              Educational Resources
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Structured learning materials for traders at every level.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {resources.map((resource, index) => (
              <Card key={index} className="hover-elevate transition-all" data-testid={`card-resource-${index}`}>
                <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{resource.title}</CardTitle>
                    <CardDescription className="text-base">{resource.description}</CardDescription>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                      resource.level === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                      resource.level === 'Intermediate' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                      'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
                    }`}>
                      {resource.level}
                    </span>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trading Academy Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="hover-elevate transition-all bg-primary text-primary-foreground">
            <CardHeader className="text-center space-y-4 pb-8">
              <div className="inline-flex mx-auto p-4 rounded-full bg-primary-foreground/10">
                <GraduationCap className="h-8 w-8" />
              </div>
              <CardTitle className="text-3xl md:text-4xl">Trading Academy Coming Soon</CardTitle>
              <CardDescription className="text-lg opacity-90 text-primary-foreground">
                Our comprehensive Trading Academy is currently in development and will feature:
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
                <div className="text-center space-y-2">
                  <h3 className="font-semibold">Video Courses</h3>
                  <p className="text-sm opacity-90">Step-by-step video tutorials</p>
                </div>
                <div className="text-center space-y-2">
                  <h3 className="font-semibold">Live Webinars</h3>
                  <p className="text-sm opacity-90">Interactive sessions with experts</p>
                </div>
                <div className="text-center space-y-2">
                  <h3 className="font-semibold">Certifications</h3>
                  <p className="text-sm opacity-90">Earn trading certificates</p>
                </div>
              </div>
              <div className="text-center pt-4">
                <Link href="/register">
                  <Button variant="secondary" size="lg" data-testid="button-get-started">
                    Get Started with Trading
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold" data-testid="text-cta-title">
              Ready to Apply Your Knowledge?
            </h2>
            <p className="text-lg text-muted-foreground">
              Open a free account and start trading with the skills you've learned.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link href="/register">
                <Button size="lg" data-testid="button-create-account">
                  Create Free Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
}
