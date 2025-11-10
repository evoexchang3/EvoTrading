import { LandingLayout } from "@/components/LandingLayout";
import { Shield, TrendingUp, Users, Globe2, Award, Target } from "lucide-react";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/hooks/useLanguage";
import { useSiteConfig } from "@/contexts/SiteConfigContext";
import { useVariantContent } from "@/hooks/useVariantContent";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  const { config } = useSiteConfig();
  const { getPageContent } = useVariantContent();
  const aboutContent = getPageContent('about');

  const teamMembers = config.branding?.team || [];
  
  if (!aboutContent) {
    return null;
  }
  
  const iconList = [Shield, TrendingUp, Users, Globe2];
  const highlightIcons = [Award, Target];
  
  const values = aboutContent.values?.items?.map((item: {title: string; description: string}, index: number) => ({
    icon: iconList[index % iconList.length],
    ...item,
  })) || [];

  const missionHighlights = aboutContent.mission?.highlights?.map((item: {title: string; description: string}, index: number) => ({
    icon: highlightIcons[index % highlightIcons.length],
    ...item,
  })) || [];

  const services = aboutContent.services?.items || [];

  return (
    <LandingLayout>
      <SEO
        title={t("about.seo.title")}
        description={t("about.seo.description")}
        keywords={t("about.seo.keywords")}
      />
      
      {aboutContent.hero && (
        <VariantPageHeader
          title={aboutContent.hero.title}
          subtitle={aboutContent.hero.subtitle}
          titleTestId="text-about-title"
        />
      )}

      {aboutContent.mission && (
        <VariantSection>
          <VariantContainer>
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <VariantHeading level="heading" data-testid="text-mission-title">
                  {aboutContent.mission.title}
                </VariantHeading>
                <VariantText className="mb-6">
                  {aboutContent.mission.paragraph1}
                </VariantText>
                <VariantText>
                  {aboutContent.mission.paragraph2}
                </VariantText>
              </div>
              <div className="grid gap-4">
                {missionHighlights.map((item: {title: string; description: string; icon: any}, index: number) => {
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
      )}

      {aboutContent.values && (
        <VariantSection background="muted">
          <VariantContainer>
            <div className="text-center mb-12">
              <VariantHeading level="heading" data-testid="text-values-title">
                {aboutContent.values.title}
              </VariantHeading>
              <VariantText className="max-w-2xl mx-auto">
                {aboutContent.values.subtitle}
              </VariantText>
            </div>

            <VariantGrid>
              {values.map((value: {title: string; description: string; icon: any}, index: number) => {
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
      )}

      {aboutContent.services && (
        <VariantSection>
          <VariantContainer>
            <div className="text-center mb-12">
              <VariantHeading level="heading" data-testid="text-services-title">
                {aboutContent.services.title}
              </VariantHeading>
              <VariantText className="max-w-2xl mx-auto">
                {aboutContent.services.subtitle}
              </VariantText>
            </div>

            <VariantGrid>
              {services.map((service: {title: string; description: string}, index: number) => (
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
      )}

      {aboutContent.team && (
        <VariantSection background="muted">
          <VariantContainer>
            <div className="text-center mb-12">
              <VariantHeading level="heading" data-testid="text-team-title">
                {aboutContent.team.title}
              </VariantHeading>
              <VariantText className="max-w-2xl mx-auto">
                {aboutContent.team.subtitle}
              </VariantText>
            </div>

            {teamMembers.length > 0 ? (
              <VariantGrid>
                {teamMembers.map((member: {name: string; role: string; photo?: string; bio?: string}, index: number) => {
                  const initials = member.name
                    .split(' ')
                    .map((n: string) => n[0])
                    .join('')
                    .toUpperCase()
                    .slice(0, 2);

                  return (
                    <VariantCard key={index} data-testid={`card-team-${index}`}>
                      <CardHeader>
                        <div className="flex flex-col items-center text-center">
                          <Avatar className="w-24 h-24 mb-4">
                            {member.photo && <AvatarImage src={member.photo} alt={member.name} />}
                            <AvatarFallback>{initials}</AvatarFallback>
                          </Avatar>
                          <CardTitle data-testid={`text-team-name-${index}`}>{member.name}</CardTitle>
                          <CardDescription data-testid={`text-team-role-${index}`}>{member.role}</CardDescription>
                        </div>
                      </CardHeader>
                      {member.bio && (
                        <CardContent>
                          <VariantText className="text-center text-sm" data-testid={`text-team-bio-${index}`}>
                            {member.bio}
                          </VariantText>
                        </CardContent>
                      )}
                    </VariantCard>
                  );
                })}
              </VariantGrid>
            ) : (
              <div className="max-w-4xl mx-auto text-center">
                <VariantText>
                  {aboutContent.team.description}
                </VariantText>
              </div>
            )}
          </VariantContainer>
        </VariantSection>
      )}
    </LandingLayout>
  );
}
