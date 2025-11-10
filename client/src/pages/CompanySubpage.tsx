import { LandingLayout } from "@/components/LandingLayout";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Award, TrendingUp, Users } from "lucide-react";
import { useVariant } from "@/layouts/shared/useVariant";
import { HeroRenderer } from "@/components/variant-rendering";

export default function CompanySubpage() {
  const variant = useVariant();
  const companySubpageConfig = variant.pages.companySubpage;

  const sections = [
    { title: "Our History", content: "Founded in 2015, we've grown to serve clients in over 150 countries..." },
    { title: "Regulatory Compliance", content: "Licensed and regulated by top-tier financial authorities worldwide..." },
    { title: "Security Measures", content: "State-of-the-art encryption and security protocols protect your data..." },
  ];

  const metrics = [
    { label: "Years of Service", value: "10+", icon: TrendingUp },
    { label: "Active Clients", value: "500K+", icon: Users },
    { label: "Trading Volume", value: "$10B+", icon: TrendingUp },
    { label: "Industry Awards", value: "25+", icon: Award },
  ];

  const timeline = [
    { year: "2015", event: "Company Founded" },
    { year: "2017", event: "Reached 50K Clients" },
    { year: "2020", event: "Global Expansion" },
    { year: "2023", event: "Market Leader" },
  ];

  const heroProps = {
    headline: "About Our Company",
    subheadline: "Leading the future of trading",
    cta: "Learn More",
    style: 'standard' as const,
  };

  // Document Style Layout
  const DocumentStyleLayout = () => (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <div className="prose prose-lg max-w-none">
        {sections.map((section, idx) => (
          <section key={idx} className="mb-12" data-testid={`section-${idx}`}>
            <h2 className="text-3xl font-bold mb-4">{section.title}</h2>
            <p className="text-muted-foreground leading-relaxed">{section.content}</p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </section>
        ))}
      </div>
    </div>
  );

  // Metrics Focused Layout
  const MetricsFocusedLayout = () => (
    <div className="container mx-auto py-16 px-4">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <Card key={idx} className="text-center" data-testid={`metric-${idx}`}>
              <CardHeader>
                <Icon className="w-10 h-10 mx-auto mb-3 text-primary" />
                <div className="text-4xl font-bold text-primary mb-2">{metric.value}</div>
                <CardTitle className="text-base">{metric.label}</CardTitle>
              </CardHeader>
            </Card>
          );
        })}
      </div>
      <div className="max-w-3xl mx-auto space-y-8">
        {sections.map((section, idx) => (
          <Card key={idx} data-testid={`content-${idx}`}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{section.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  // Timeline View Layout
  const TimelineViewLayout = () => (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Journey</h2>
          <p className="text-xl text-muted-foreground">Key milestones in our growth</p>
        </div>
        <div className="space-y-8">
          {timeline.map((item, idx) => (
            <div key={idx} className="flex gap-6" data-testid={`timeline-${idx}`}>
              <div className="flex-shrink-0 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  {item.year}
                </div>
                {idx < timeline.length - 1 && (
                  <div className="w-0.5 flex-1 bg-border my-2" style={{ minHeight: '60px' }} />
                )}
              </div>
              <Card className="flex-1">
                <CardHeader>
                  <CardTitle>{item.event}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">A significant milestone in our company's development and growth.</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        <div className="mt-16 space-y-6">
          {sections.map((section, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{section.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  // Card Sections Layout
  const CardSectionsLayout = () => (
    <div className="container mx-auto py-16 px-4">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section, idx) => (
          <Card key={idx} className="hover-elevate" data-testid={`card-${idx}`}>
            <CardHeader>
              <Shield className="w-10 h-10 text-primary mb-3" />
              <CardTitle>{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{section.content}</p>
            </CardContent>
          </Card>
        ))}
        {metrics.slice(0, 3).map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <Card key={idx + sections.length} className="text-center hover-elevate">
              <CardHeader>
                <Icon className="w-10 h-10 mx-auto mb-3 text-primary" />
                <div className="text-3xl font-bold text-primary mb-2">{metric.value}</div>
                <CardTitle className="text-sm">{metric.label}</CardTitle>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </div>
  );

  // Layout dispatcher
  const renderContent = () => {
    switch (companySubpageConfig.layout) {
      case 'document-style':
        return <DocumentStyleLayout />;
      
      case 'metrics-focused':
        return <MetricsFocusedLayout />;
      
      case 'timeline-view':
        return <TimelineViewLayout />;
      
      case 'card-sections':
        return <CardSectionsLayout />;
      
      default:
        return <DocumentStyleLayout />;
    }
  };

  return (
    <LandingLayout>
      <SEO
        title="Company Information"
        description="Learn about our company history and values"
      />
      <div className="min-h-screen">
        <HeroRenderer {...heroProps} />
        {renderContent()}
      </div>
    </LandingLayout>
  );
}
