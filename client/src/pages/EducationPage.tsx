import { LandingLayout } from "@/components/LandingLayout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { BookOpen, TrendingUp, Shield, BarChart3, Lightbulb, GraduationCap } from "lucide-react";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/hooks/useLanguage";
import {
  VariantSection,
  VariantContainer,
  VariantPageHeader,
  VariantHeading,
  VariantText,
  VariantGrid,
  VariantCard,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/variant";

export default function EducationPage() {
  const { t } = useLanguage();

  const topics = [
    {
      icon: BookOpen,
      title: t('education.topics.tradingBasics.title'),
      description: t('education.topics.tradingBasics.description'),
      content: t('education.topics.tradingBasics.content'),
    },
    {
      icon: TrendingUp,
      title: t('education.topics.technicalAnalysis.title'),
      description: t('education.topics.technicalAnalysis.description'),
      content: t('education.topics.technicalAnalysis.content'),
    },
    {
      icon: Shield,
      title: t('education.topics.riskManagement.title'),
      description: t('education.topics.riskManagement.description'),
      content: t('education.topics.riskManagement.content'),
    },
    {
      icon: BarChart3,
      title: t('education.topics.tradingStrategies.title'),
      description: t('education.topics.tradingStrategies.description'),
      content: t('education.topics.tradingStrategies.content'),
    },
    {
      icon: Lightbulb,
      title: t('education.topics.marketPsychology.title'),
      description: t('education.topics.marketPsychology.description'),
      content: t('education.topics.marketPsychology.content'),
    },
    {
      icon: GraduationCap,
      title: t('education.topics.advancedConcepts.title'),
      description: t('education.topics.advancedConcepts.description'),
      content: t('education.topics.advancedConcepts.content'),
    },
  ];

  const resources = [
    {
      title: t('education.resources.forexGuide.title'),
      description: t('education.resources.forexGuide.description'),
      level: t('education.resources.forexGuide.level'),
    },
    {
      title: t('education.resources.cryptoFundamentals.title'),
      description: t('education.resources.cryptoFundamentals.description'),
      level: t('education.resources.cryptoFundamentals.level'),
    },
    {
      title: t('education.resources.technicalMasterclass.title'),
      description: t('education.resources.technicalMasterclass.description'),
      level: t('education.resources.technicalMasterclass.level'),
    },
    {
      title: t('education.resources.riskEssentials.title'),
      description: t('education.resources.riskEssentials.description'),
      level: t('education.resources.riskEssentials.level'),
    },
    {
      title: t('education.resources.algoTrading.title'),
      description: t('education.resources.algoTrading.description'),
      level: t('education.resources.algoTrading.level'),
    },
  ];

  return (
    <LandingLayout>
      <SEO
        title={t('education.seo.title')}
        description={t('education.seo.description')}
        keywords={t('education.seo.keywords')}
      />
      
      <VariantPageHeader
        title={t('education.hero.title')}
        subtitle={t('education.hero.subtitle')}
        titleTestId="text-education-title"
      />

      <VariantSection>
        <VariantContainer>
          <div className="text-center mb-12">
            <VariantHeading level="heading" data-testid="text-topics-title">
              {t('education.topics.title')}
            </VariantHeading>
            <VariantText className="max-w-2xl mx-auto">
              {t('education.topics.subtitle')}
            </VariantText>
          </div>

          <VariantGrid>
            {topics.map((topic, index) => {
              const Icon = topic.icon;
              return (
                <VariantCard key={index} data-testid={`card-topic-${index}`}>
                  <CardHeader>
                    <div className="mb-4">
                      <div className="inline-flex p-3 rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <CardTitle>{topic.title}</CardTitle>
                    <CardDescription className="font-medium text-primary">{topic.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <VariantText>{topic.content}</VariantText>
                  </CardContent>
                </VariantCard>
              );
            })}
          </VariantGrid>
        </VariantContainer>
      </VariantSection>

      <VariantSection background="muted">
        <VariantContainer>
          <div className="text-center mb-12">
            <VariantHeading level="heading" data-testid="text-resources-title">
              {t('education.resources.title')}
            </VariantHeading>
            <VariantText className="max-w-2xl mx-auto">
              {t('education.resources.subtitle')}
            </VariantText>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {resources.map((resource, index) => (
              <VariantCard key={index} data-testid={`card-resource-${index}`}>
                <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
                  <div className="flex-1">
                    <CardTitle className="mb-2">{resource.title}</CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
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
              </VariantCard>
            ))}
          </div>
        </VariantContainer>
      </VariantSection>

      <VariantSection>
        <VariantContainer>
          <VariantCard className="bg-primary text-primary-foreground">
            <CardHeader className="text-center pb-8">
              <div className="inline-flex mx-auto p-4 rounded-full bg-primary-foreground/10">
                <GraduationCap className="h-8 w-8" />
              </div>
              <CardTitle>{t('education.academy.title')}</CardTitle>
              <CardDescription className="opacity-90 text-primary-foreground">
                {t('education.academy.subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <VariantGrid className="max-w-4xl mx-auto">
                <div className="text-center space-y-2">
                  <h3 className="font-semibold">{t('education.academy.videoCourses.title')}</h3>
                  <VariantText className="opacity-90">{t('education.academy.videoCourses.description')}</VariantText>
                </div>
                <div className="text-center space-y-2">
                  <h3 className="font-semibold">{t('education.academy.liveWebinars.title')}</h3>
                  <VariantText className="opacity-90">{t('education.academy.liveWebinars.description')}</VariantText>
                </div>
                <div className="text-center space-y-2">
                  <h3 className="font-semibold">{t('education.academy.certifications.title')}</h3>
                  <VariantText className="opacity-90">{t('education.academy.certifications.description')}</VariantText>
                </div>
              </VariantGrid>
              <div className="text-center pt-4">
                <Link href="/register">
                  <Button variant="secondary" size="lg" data-testid="button-get-started">
                    {t('education.academy.button')}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </VariantCard>
        </VariantContainer>
      </VariantSection>

      <VariantSection background="muted">
        <VariantContainer>
          <div className="max-w-3xl mx-auto text-center">
            <VariantHeading level="heading" data-testid="text-cta-title">
              {t('education.cta.title')}
            </VariantHeading>
            <VariantText className="mb-6">
              {t('education.cta.subtitle')}
            </VariantText>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/register">
                <Button size="lg" data-testid="button-create-account">
                  {t('education.cta.button')}
                </Button>
              </Link>
            </div>
          </div>
        </VariantContainer>
      </VariantSection>
    </LandingLayout>
  );
}
