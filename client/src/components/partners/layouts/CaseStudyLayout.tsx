import { TrendingUp, Users, DollarSign, BarChart3 } from 'lucide-react';
import { useLanguage } from "@/hooks/useLanguage";
import {
  VariantSection,
  VariantContainer,
  VariantHeading,
  VariantText,
  VariantCard,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/variant";

export function CaseStudyLayout() {
  const { t } = useLanguage();

  // Case study data - in a real implementation, this would come from config/content
  const caseStudy = {
    title: t('partners.caseStudy.title') || 'Partner Success: From $0 to $100K in 18 Months',
    subtitle: t('partners.caseStudy.subtitle') || 'How one partner built a thriving affiliate business',
    partner: {
      name: 'Alex Martinez',
      role: 'Financial Educator & Content Creator',
      location: 'Miami, FL',
    },
    challenge: t('partners.caseStudy.challenge') || 'Alex wanted to monetize his trading education platform but struggled to find a reliable partner program with fair commissions and good support.',
    solution: t('partners.caseStudy.solution') || 'By joining our partner program, Alex integrated our trading platform into his educational content, providing real value to his audience while earning competitive commissions.',
    results: [
      {
        icon: DollarSign,
        metric: '$100K+',
        label: t('partners.caseStudy.results.totalEarnings') || 'Total Earnings',
      },
      {
        icon: Users,
        metric: '2,500+',
        label: t('partners.caseStudy.results.referrals') || 'Referrals',
      },
      {
        icon: TrendingUp,
        metric: '45%',
        label: t('partners.caseStudy.results.monthlyGrowth') || 'Monthly Growth',
      },
      {
        icon: BarChart3,
        metric: '18',
        label: t('partners.caseStudy.results.months') || 'Months',
      },
    ],
    testimonial: t('partners.caseStudy.testimonial') || 'The partner program exceeded all my expectations. The support team is responsive, the commission structure is transparent, and my audience loves the platform.',
  };

  return (
    <VariantSection>
      <VariantContainer>
        <div className="text-center mb-12">
          <VariantHeading level="heading" data-testid="text-case-study-title">
            {caseStudy.title}
          </VariantHeading>
          <VariantText className="text-muted-foreground max-w-2xl mx-auto">
            {caseStudy.subtitle}
          </VariantText>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Partner Info */}
          <VariantCard>
            <CardHeader>
              <CardTitle>{caseStudy.partner.name}</CardTitle>
              <CardDescription>{caseStudy.partner.role} • {caseStudy.partner.location}</CardDescription>
            </CardHeader>
          </VariantCard>

          {/* Challenge & Solution */}
          <div className="grid md:grid-cols-2 gap-6">
            <VariantCard>
              <CardHeader>
                <CardTitle className="text-lg">The Challenge</CardTitle>
              </CardHeader>
              <CardContent>
                <VariantText>{caseStudy.challenge}</VariantText>
              </CardContent>
            </VariantCard>

            <VariantCard>
              <CardHeader>
                <CardTitle className="text-lg">The Solution</CardTitle>
              </CardHeader>
              <CardContent>
                <VariantText>{caseStudy.solution}</VariantText>
              </CardContent>
            </VariantCard>
          </div>

          {/* Results */}
          <div>
            <h3 className="text-2xl font-bold text-center mb-6" data-testid="text-results-title">
              {t('partners.caseStudy.resultsTitle') || 'The Results'}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {caseStudy.results.map((result, index) => {
                const Icon = result.icon;
                return (
                  <VariantCard key={index} data-testid={`metric-${index}`}>
                    <CardHeader className="text-center space-y-2">
                      <div className="inline-flex mx-auto p-3 rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="text-3xl font-bold text-primary">{result.metric}</div>
                      <VariantText className="text-sm">{result.label}</VariantText>
                    </CardHeader>
                  </VariantCard>
                );
              })}
            </div>
          </div>

          {/* Testimonial */}
          <VariantCard className="bg-primary text-primary-foreground">
            <CardContent className="py-8">
              <blockquote className="text-xl italic text-center">
                "{caseStudy.testimonial}"
              </blockquote>
              <p className="text-center mt-4 font-semibold">— {caseStudy.partner.name}</p>
            </CardContent>
          </VariantCard>
        </div>
      </VariantContainer>
    </VariantSection>
  );
}
