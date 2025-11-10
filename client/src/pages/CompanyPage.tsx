import { Link } from "wouter";
import { LandingLayout } from "@/components/LandingLayout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { useVariantContent } from "@/hooks/useVariantContent";
import { useVariant } from "@/layouts/shared/useVariant";
import { HeroRenderer } from "@/components/variant-rendering";
import {
  Building2,
  Shield,
  Award,
  Users,
  Globe,
  FileText,
  Lock,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Target,
  Calendar,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function CompanyPage() {
  const { t } = useLanguage();
  const { getPageContent } = useVariantContent();
  const variant = useVariant();
  const companyContent = getPageContent('company');
  
  const companyConfig = variant.pages.company;

  if (!companyContent) {
    return null;
  }

  const companyLinks = [
    {
      title: t('company.links.regulatory.title'),
      description: t('company.links.regulatory.description'),
      href: '/company/regulatory',
      icon: Shield,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-950',
    },
    {
      title: t('company.links.safety.title'),
      description: t('company.links.safety.description'),
      href: '/company/safety-of-funds',
      icon: Lock,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-950',
    },
    {
      title: t('company.links.rates.title'),
      description: t('company.links.rates.description'),
      href: '/company/rates',
      icon: TrendingUp,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-950',
    },
    {
      title: t('company.links.security.title'),
      description: t('company.links.security.description'),
      href: '/company/security',
      icon: AlertCircle,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-950',
    },
    {
      title: t('company.links.status.title'),
      description: t('company.links.status.description'),
      href: '/company/platform-status',
      icon: CheckCircle,
      color: 'text-teal-600 dark:text-teal-400',
      bgColor: 'bg-teal-100 dark:bg-teal-950',
    },
    {
      title: t('company.links.complaints.title'),
      description: t('company.links.complaints.description'),
      href: '/company/complaints',
      icon: FileText,
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-100 dark:bg-red-950',
    },
  ];

  const stats = companyContent.stats ? [
    { label: t('company.stats.years'), value: companyContent.stats.years, icon: Award },
    { label: t('company.stats.clients'), value: companyContent.stats.clients, icon: Users },
    { label: t('company.stats.countries'), value: companyContent.stats.countries, icon: Globe },
    { label: t('company.stats.volume'), value: companyContent.stats.volume, icon: TrendingUp },
  ] : [];

  const valueIcons = [FileText, Shield, Award];
  const values = companyContent.values?.items?.map((item: {title: string; description: string}, index: number) => ({
    ...item,
    icon: valueIcons[index % valueIcons.length],
  })) || [];

  const team = [
    { name: "John Doe", role: "CEO", bio: "20+ years in financial markets", initials: "JD" },
    { name: "Sarah Miller", role: "CTO", bio: "Tech innovation leader", initials: "SM" },
    { name: "Robert Chen", role: "CFO", bio: "Financial strategy expert", initials: "RC" },
    { name: "Emily Kim", role: "COO", bio: "Operations excellence", initials: "EK" },
  ];

  const milestones = [
    { year: "2015", title: "Company Founded", description: "Started with a vision" },
    { year: "2017", title: "First 10K Users", description: "Reached major milestone" },
    { year: "2019", title: "Global Expansion", description: "Expanded to 50 countries" },
    { year: "2022", title: "Series B Funding", description: "$50M investment round" },
    { year: "2025", title: "Market Leader", description: "Leading position achieved" },
  ];

  // Hero props for HeroRenderer
  const heroProps = {
    headline: companyContent.hero?.title || t('company.hero.title'),
    subheadline: companyContent.hero?.subtitle || t('company.hero.subtitle'),
    cta: companyContent.hero?.cta || t('company.hero.cta'),
    style: 'standard' as const,
  };

  // Reusable sections
  const StatsSection = () => (
    <section className="py-12 border-y bg-muted/10" aria-label="Company statistics">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center" data-testid={`stat-${index}`}>
                <Icon className="w-8 h-8 mx-auto mb-2 text-primary" aria-hidden="true" />
                <div className="text-3xl font-bold mb-1" data-testid={`stat-value-${index}`}>{stat.value}</div>
                <div className="text-sm text-muted-foreground" data-testid={`stat-label-${index}`}>{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );

  const MissionSection = () => (
    <section className="py-16 bg-muted/20" aria-label="Mission">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Target className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h2 className="text-3xl font-bold mb-4" data-testid="heading-mission">Our Mission</h2>
            <p className="text-xl text-muted-foreground" data-testid="text-mission">
              Empowering traders worldwide with cutting-edge technology and unparalleled support.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4" data-testid="mission-statement">
              <h3 className="text-xl font-semibold">Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To democratize access to global financial markets through innovative technology and education.
              </p>
            </div>
            <div className="space-y-4" data-testid="vision-statement">
              <h3 className="text-xl font-semibold">Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                Become the world's most trusted and accessible trading platform for all experience levels.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const ValuesSection = () => (
    <section className="py-16 bg-muted/20" aria-label="Company values">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-values">
            {companyContent.values?.title || "Our Values"}
          </h2>
          <p className="text-lg text-muted-foreground" data-testid="text-values-description">
            {companyContent.values?.subtitle || "Core principles that guide everything we do"}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div key={index} className="text-center" data-testid={`value-${index}`}>
                <div className="p-4 rounded-full bg-primary/10 w-fit mx-auto mb-4">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2" data-testid={`heading-value-${index}`}>{value.title}</h3>
                <p className="text-muted-foreground" data-testid={`text-value-${index}-description`}>{value.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );

  const ValuesShowcaseSection = () => (
    <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" data-testid="heading-values-showcase">Our Core Values</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Principles backed by performance</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {values.map((value, index) => {
            const Icon = value.icon;
            const metrics = ["99.9%", "10+", "100%"];
            const metricLabels = ["Uptime", "Awards", "Compliance"];
            return (
              <Card key={index} className="text-center" data-testid={`value-showcase-${index}`}>
                <CardContent className="p-8">
                  <div className="p-4 rounded-full bg-primary/10 w-fit mx-auto mb-6">
                    <Icon className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground mb-6">{value.description}</p>
                  <div className="pt-6 border-t">
                    <div className="text-3xl font-bold text-primary mb-1">{metrics[index]}</div>
                    <div className="text-sm text-muted-foreground">{metricLabels[index]}</div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );

  const TimelineSection = ({ prominent = false }: { prominent?: boolean }) => {
    if (prominent) {
      return (
        <section className="py-20 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h2 className="text-4xl font-bold mb-4" data-testid="heading-timeline">Our Journey</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Key milestones in our growth</p>
            </div>
            <div className="max-w-5xl mx-auto space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-6" data-testid={`milestone-${index}`}>
                  <div className="flex-shrink-0 w-24 text-right">
                    <div className="text-3xl font-bold text-primary">{milestone.year}</div>
                  </div>
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-primary" />
                    {index < milestones.length - 1 && (
                      <div className="w-0.5 flex-1 bg-border my-2" style={{ minHeight: '80px' }} />
                    )}
                  </div>
                  <Card className="flex-1">
                    <CardHeader>
                      <CardTitle>{milestone.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    return (
      <section className="py-12 border-y">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2" data-testid="heading-timeline">Our Journey</h2>
          </div>
          <div className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="text-center" data-testid={`milestone-${index}`}>
                <div className="text-2xl font-bold text-primary mb-2">{milestone.year}</div>
                <div className="text-sm font-semibold mb-1">{milestone.title}</div>
                <div className="text-xs text-muted-foreground">{milestone.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const TeamSection = ({ spotlight = false }: { spotlight?: boolean }) => {
    if (spotlight) {
      const featured = team[0];
      const others = team.slice(1);
      return (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h2 className="text-3xl font-bold mb-4" data-testid="heading-team">Leadership Team</h2>
              <p className="text-lg text-muted-foreground">Meet the people driving our success</p>
            </div>
            <Card className="max-w-3xl mx-auto mb-12" data-testid="featured-leader">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <Avatar className="w-32 h-32">
                    <AvatarFallback className="text-3xl">{featured.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold mb-2">{featured.name}</h3>
                    <p className="text-primary font-semibold mb-4">{featured.role}</p>
                    <p className="text-muted-foreground">{featured.bio}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {others.map((member, index) => (
                <Card key={index} data-testid={`team-member-${index + 1}`}>
                  <CardHeader className="text-center">
                    <Avatar className="w-20 h-20 mx-auto mb-4">
                      <AvatarFallback className="text-xl">{member.initials}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <p className="text-sm text-primary">{member.role}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground text-center">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      );
    }

    return (
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h2 className="text-3xl font-bold mb-4" data-testid="heading-team">Leadership Team</h2>
            <p className="text-lg text-muted-foreground">Expert leadership driving innovation</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="text-center" data-testid={`team-member-${index}`}>
                <CardHeader>
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarFallback className="text-2xl">{member.initials}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <p className="text-sm text-primary">{member.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const ResourceLinksSection = () => (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-info">
            {companyContent.info?.title || "Company Information"}
          </h2>
          <p className="text-lg text-muted-foreground" data-testid="text-info-description">
            {companyContent.info?.subtitle || "Learn more about our company"}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companyLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <Card className="h-full hover-elevate cursor-pointer" data-testid={`card-${item.href.split('/').pop()}`}>
                  <CardHeader>
                    <div className={`p-3 rounded-lg ${item.bgColor} w-fit mb-3`}>
                      <Icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <CardTitle data-testid={`heading-${item.href.split('/').pop()}`}>{item.title}</CardTitle>
                    <CardDescription data-testid={`text-${item.href.split('/').pop()}-description`}>
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-primary">
                      {t('company.learnMore')}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );

  const CTASection = () => (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <Building2 className="w-16 h-16 mx-auto mb-6 text-primary" />
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-cta">
            {companyContent.cta?.title || "Get in Touch"}
          </h2>
          <p className="text-lg text-muted-foreground mb-8" data-testid="text-cta-description">
            {companyContent.cta?.subtitle || "Questions? We're here to help"}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" data-testid="button-contact">
                {companyContent.cta?.button || "Contact Us"}
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" data-testid="button-about">
                {companyContent.cta?.about || "Learn More"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );

  // Layout dispatcher
  const renderContent = () => {
    switch (companyConfig.layout) {
      case 'mission-led':
        return (
          <>
            <MissionSection />
            <StatsSection />
            <ValuesSection />
            <ResourceLinksSection />
            <CTASection />
          </>
        );
      
      case 'values-led':
        return (
          <>
            <ValuesSection />
            <MissionSection />
            <StatsSection />
            <ResourceLinksSection />
            <CTASection />
          </>
        );
      
      case 'values-showcase':
        return (
          <>
            <ValuesShowcaseSection />
            <StatsSection />
            <ResourceLinksSection />
            <CTASection />
          </>
        );
      
      case 'timeline-focus':
        return (
          <>
            <TimelineSection prominent />
            <MissionSection />
            <StatsSection />
            <CTASection />
          </>
        );
      
      case 'timeline-led':
        return (
          <>
            <TimelineSection prominent />
            <StatsSection />
            <ValuesSection />
            <ResourceLinksSection />
            <CTASection />
          </>
        );
      
      case 'team-spotlight':
        return (
          <>
            <TeamSection spotlight />
            <MissionSection />
            <ResourceLinksSection />
            <CTASection />
          </>
        );
      
      case 'team-led':
        return (
          <>
            <TeamSection />
            <ValuesSection />
            <StatsSection />
            <ResourceLinksSection />
            <CTASection />
          </>
        );
      
      default:
        return (
          <>
            <StatsSection />
            <ResourceLinksSection />
            <ValuesSection />
            <CTASection />
          </>
        );
    }
  };

  return (
    <LandingLayout>
      <SEO
        title={companyContent.hero?.title || t('company.hero.title')}
        description={companyContent.hero?.subtitle || t('company.hero.subtitle')}
      />
      <div className="min-h-screen">
        <HeroRenderer {...heroProps} />
        {renderContent()}
      </div>
    </LandingLayout>
  );
}
