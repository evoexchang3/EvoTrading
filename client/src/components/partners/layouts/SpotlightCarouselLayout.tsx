import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
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
} from "@/components/variant";
import { Button } from "@/components/ui/button";

export function SpotlightCarouselLayout() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Featured partners - in a real implementation, these would come from config/content
  const featuredPartners = [
    {
      id: 1,
      name: 'Sarah Johnson',
      company: 'TradingPro Academy',
      testimonial: t('partners.testimonials.partner1.quote') || 'The partnership program has transformed my business. Excellent support and competitive commissions.',
      earnings: '$50K+',
      duration: '2 years',
    },
    {
      id: 2,
      name: 'Michael Chen',
      company: 'FX Education Hub',
      testimonial: t('partners.testimonials.partner2.quote') || 'Best decision I made was joining this program. The recurring income model is fantastic.',
      earnings: '$75K+',
      duration: '3 years',
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      company: 'Global Trading Network',
      testimonial: t('partners.testimonials.partner3.quote') || 'Outstanding program with great marketing materials and dedicated support team.',
      earnings: '$100K+',
      duration: '4 years',
    },
  ];

  const nextPartner = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredPartners.length);
  };

  const prevPartner = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredPartners.length) % featuredPartners.length);
  };

  const currentPartner = featuredPartners[currentIndex];

  return (
    <VariantSection background="muted">
      <VariantContainer>
        <div className="text-center mb-12">
          <VariantHeading level="heading" data-testid="text-spotlight-title">
            {t('partners.spotlight.title') || 'Partner Success Stories'}
          </VariantHeading>
          <VariantText className="text-muted-foreground max-w-2xl mx-auto">
            {t('partners.spotlight.subtitle') || 'See how our partners are succeeding'}
          </VariantText>
        </div>

        <div className="max-w-4xl mx-auto">
          <VariantCard className="relative" data-testid={`spotlight-partner-${currentPartner.id}`}>
            <CardHeader className="text-center pb-8">
              <div className="inline-flex mx-auto p-4 rounded-full bg-primary/10 mb-4">
                <Quote className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">{currentPartner.name}</CardTitle>
              <VariantText className="text-muted-foreground">{currentPartner.company}</VariantText>
            </CardHeader>
            <CardContent className="space-y-6">
              <blockquote className="text-lg italic text-center">
                "{currentPartner.testimonial}"
              </blockquote>
              
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-primary">{currentPartner.earnings}</div>
                  <VariantText className="text-sm text-muted-foreground">Total Earnings</VariantText>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-primary">{currentPartner.duration}</div>
                  <VariantText className="text-sm text-muted-foreground">Partnership</VariantText>
                </div>
              </div>
            </CardContent>
          </VariantCard>

          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevPartner}
              data-testid="button-spotlight-prev"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="flex gap-2">
              {featuredPartners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-muted-foreground/30'
                  }`}
                  data-testid={`button-spotlight-indicator-${index}`}
                  aria-label={`Go to partner ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextPartner}
              data-testid="button-spotlight-next"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </VariantContainer>
    </VariantSection>
  );
}
