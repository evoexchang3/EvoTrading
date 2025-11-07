import { LandingLayout } from "@/components/LandingLayout";
import { Shield, TrendingUp, Users, Globe2, Award, Target } from "lucide-react";
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

export default function AboutPage() {
  const { t } = useLanguage();
  
  const values = [
    {
      icon: Shield,
      title: t("about.values.security.title"),
      description: t("about.values.security.description"),
    },
    {
      icon: TrendingUp,
      title: t("about.values.transparency.title"),
      description: t("about.values.transparency.description"),
    },
    {
      icon: Users,
      title: t("about.values.clientSuccess.title"),
      description: t("about.values.clientSuccess.description"),
    },
    {
      icon: Globe2,
      title: t("about.values.globalAccess.title"),
      description: t("about.values.globalAccess.description"),
    },
  ];

  const missionHighlights = [
    {
      icon: Award,
      title: t("about.mission.regulated.title"),
      description: t("about.mission.regulated.description"),
    },
    {
      icon: Target,
      title: t("about.mission.clientFocused.title"),
      description: t("about.mission.clientFocused.description"),
    },
  ];

  const services = [
    {
      title: t("about.services.forex.title"),
      description: t("about.services.forex.description"),
    },
    {
      title: t("about.services.crypto.title"),
      description: t("about.services.crypto.description"),
    },
    {
      title: t("about.services.commodities.title"),
      description: t("about.services.commodities.description"),
    },
  ];

  return (
    <LandingLayout>
      <SEO
        title={t("about.seo.title")}
        description={t("about.seo.description")}
        keywords={t("about.seo.keywords")}
      />
      
      <VariantPageHeader
        title={t("about.hero.title")}
        subtitle={t("about.hero.subtitle")}
        titleTestId="text-about-title"
      />

      <VariantSection>
        <VariantContainer>
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <VariantHeading level="heading" data-testid="text-mission-title">
                {t("about.mission.title")}
              </VariantHeading>
              <VariantText className="mb-6">
                {t("about.mission.paragraph1")}
              </VariantText>
              <VariantText>
                {t("about.mission.paragraph2")}
              </VariantText>
            </div>
            <div className="grid gap-4">
              {missionHighlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <VariantCard key={index}>
                    <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle>{item.title}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </div>
                    </CardHeader>
                  </VariantCard>
                );
              })}
            </div>
          </div>
        </VariantContainer>
      </VariantSection>

      <VariantSection background="muted">
        <VariantContainer>
          <div className="text-center mb-12">
            <VariantHeading level="heading" data-testid="text-values-title">
              {t("about.values.title")}
            </VariantHeading>
            <VariantText className="max-w-2xl mx-auto">
              {t("about.values.subtitle")}
            </VariantText>
          </div>

          <VariantGrid>
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <VariantCard key={index} data-testid={`card-value-${index}`}>
                  <CardHeader>
                    <div className="mb-4">
                      <div className="inline-flex p-3 rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <CardTitle>{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{value.description}</CardDescription>
                  </CardContent>
                </VariantCard>
              );
            })}
          </VariantGrid>
        </VariantContainer>
      </VariantSection>

      <VariantSection>
        <VariantContainer>
          <div className="text-center mb-12">
            <VariantHeading level="heading" data-testid="text-services-title">
              {t("about.services.title")}
            </VariantHeading>
            <VariantText className="max-w-2xl mx-auto">
              {t("about.services.subtitle")}
            </VariantText>
          </div>

          <VariantGrid>
            {services.map((service, index) => (
              <VariantCard key={index}>
                <CardHeader>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
              </VariantCard>
            ))}
          </VariantGrid>
        </VariantContainer>
      </VariantSection>

      <VariantSection background="muted">
        <VariantContainer>
          <div className="text-center">
            <VariantHeading level="heading" data-testid="text-team-title">
              {t("about.team.title")}
            </VariantHeading>
            <VariantText className="max-w-2xl mx-auto mb-6">
              {t("about.team.subtitle")}
            </VariantText>
            <div className="max-w-4xl mx-auto">
              <VariantText className="text-center">
                {t("about.team.description")}
              </VariantText>
            </div>
          </div>
        </VariantContainer>
      </VariantSection>
    </LandingLayout>
  );
}
