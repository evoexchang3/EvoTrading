import { LandingLayout } from "@/components/LandingLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { BookOpen, TrendingUp, Shield, BarChart3, Lightbulb, GraduationCap } from "lucide-react";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/hooks/useLanguage";

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
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold" data-testid="text-education-title">
              {t('education.hero.title')}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t('education.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Topics Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-topics-title">
              {t('education.topics.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('education.topics.subtitle')}
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
              {t('education.resources.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('education.resources.subtitle')}
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
              <CardTitle className="text-3xl md:text-4xl">{t('education.academy.title')}</CardTitle>
              <CardDescription className="text-lg opacity-90 text-primary-foreground">
                {t('education.academy.subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
                <div className="text-center space-y-2">
                  <h3 className="font-semibold">{t('education.academy.videoCourses.title')}</h3>
                  <p className="text-sm opacity-90">{t('education.academy.videoCourses.description')}</p>
                </div>
                <div className="text-center space-y-2">
                  <h3 className="font-semibold">{t('education.academy.liveWebinars.title')}</h3>
                  <p className="text-sm opacity-90">{t('education.academy.liveWebinars.description')}</p>
                </div>
                <div className="text-center space-y-2">
                  <h3 className="font-semibold">{t('education.academy.certifications.title')}</h3>
                  <p className="text-sm opacity-90">{t('education.academy.certifications.description')}</p>
                </div>
              </div>
              <div className="text-center pt-4">
                <Link href="/register">
                  <Button variant="secondary" size="lg" data-testid="button-get-started">
                    {t('education.academy.button')}
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
              {t('education.cta.title')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('education.cta.subtitle')}
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link href="/register">
                <Button size="lg" data-testid="button-create-account">
                  {t('education.cta.button')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
}
