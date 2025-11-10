import { LandingLayout } from "@/components/LandingLayout";
import { Shield, TrendingUp, Users, Globe2, Award, Target, Calendar, ChevronRight } from "lucide-react";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/hooks/useLanguage";
import { useSiteConfig } from "@/contexts/SiteConfigContext";
import { useVariantContent } from "@/hooks/useVariantContent";
import { useVariant } from "@/layouts/shared/useVariant";
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
  const variant = useVariant();
  const aboutContent = getPageContent('about');
  const aboutConfig = variant.pages.about;

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

  const mockTimeline = [
    { year: '2020', title: 'Founded', description: 'Company established with a vision to revolutionize trading' },
    { year: '2021', title: 'First 10K Users', description: 'Reached our first major milestone of active traders' },
    { year: '2023', title: 'Global Expansion', description: 'Expanded operations to multiple countries worldwide' },
    { year: '2024', title: 'Industry Leader', description: 'Recognized as a leading platform in the industry' },
  ];

  const renderTimeline = () => {
    if (!aboutConfig.showTimeline) {
      return null;
    }

    return (
      <VariantSection key="timeline">
        <VariantContainer>
          <div className="text-center mb-12">
            <VariantHeading level="heading" data-testid="text-timeline-title">
              Our Journey
            </VariantHeading>
            <VariantText className="max-w-2xl mx-auto">
              Milestones that shaped our company
            </VariantText>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {mockTimeline.map((milestone, index) => (
                <div key={index} className="flex gap-6" data-testid={`timeline-item-${index}`}>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border-2 border-primary">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    {index < mockTimeline.length - 1 && (
                      <div className="w-0.5 h-full min-h-[4rem] bg-border mt-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl font-bold text-primary" data-testid={`text-timeline-year-${index}`}>
                        {milestone.year}
                      </span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      <VariantHeading level="subheading" className="m-0" data-testid={`text-timeline-title-${index}`}>
                        {milestone.title}
                      </VariantHeading>
                    </div>
                    <VariantText data-testid={`text-timeline-description-${index}`}>
                      {milestone.description}
                    </VariantText>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </VariantContainer>
      </VariantSection>
    );
  };

  const renderMission = () => {
    if (!aboutConfig.showMission || !aboutContent.mission) {
      return null;
    }

    return (
      <VariantSection key="mission">
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
    );
  };

  const renderValues = () => {
    if (!aboutConfig.showValues || !aboutContent.values) {
      return null;
    }

    const valuesStyle = aboutConfig.valuesStyle;

    return (
      <VariantSection key="values" background="muted">
        <VariantContainer>
          <div className="text-center mb-12">
            <VariantHeading level="heading" data-testid="text-values-title">
              {aboutContent.values.title}
            </VariantHeading>
            <VariantText className="max-w-2xl mx-auto">
              {aboutContent.values.subtitle}
            </VariantText>
          </div>

          {valuesStyle === 'cards' && (
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
          )}

          {valuesStyle === 'icons' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {values.map((value: {title: string; description: string; icon: any}, index: number) => {
                const Icon = value.icon;
                return (
                  <div key={index} className="text-center" data-testid={`card-value-${index}`}>
                    <div className="inline-flex p-4 rounded-lg bg-primary/10 mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                );
              })}
            </div>
          )}

          {valuesStyle === 'minimal' && (
            <div className="max-w-3xl mx-auto space-y-6">
              {values.map((value: {title: string; description: string; icon: any}, index: number) => {
                const Icon = value.icon;
                return (
                  <div key={index} className="flex gap-4 items-start" data-testid={`card-value-${index}`}>
                    <Icon className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </VariantContainer>
      </VariantSection>
    );
  };

  const renderServices = () => {
    if (!aboutContent.services) {
      return null;
    }

    return (
      <VariantSection key="services">
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
    );
  };

  const renderTeam = () => {
    if (!aboutConfig.showTeam || !aboutContent.team) {
      return null;
    }

    const displayedTeamMembers = teamMembers.slice(0, aboutConfig.teamMemberCount);
    const teamPresentation = aboutConfig.teamPresentation;

    const renderTeamMemberCard = (member: {name: string; role: string; photo?: string; bio?: string}, index: number, isSpotlight = false) => {
      const initials = member.name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

      if (isSpotlight) {
        return (
          <VariantCard key={index} data-testid={`card-team-${index}`}>
            <CardHeader>
              <div className="flex gap-6 items-start">
                <Avatar className="w-32 h-32 flex-shrink-0">
                  {member.photo && <AvatarImage src={member.photo} alt={member.name} />}
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-2xl mb-2" data-testid={`text-team-name-${index}`}>
                    {member.name}
                  </CardTitle>
                  <CardDescription className="text-base mb-4" data-testid={`text-team-role-${index}`}>
                    {member.role}
                  </CardDescription>
                  {member.bio && (
                    <VariantText data-testid={`text-team-bio-${index}`}>
                      {member.bio}
                    </VariantText>
                  )}
                </div>
              </div>
            </CardHeader>
          </VariantCard>
        );
      }

      return (
        <VariantCard key={index} data-testid={`card-team-${index}`} className="flex-shrink-0">
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
    };

    return (
      <VariantSection key="team" background="muted">
        <VariantContainer>
          <div className="text-center mb-12">
            <VariantHeading level="heading" data-testid="text-team-title">
              {aboutContent.team.title}
            </VariantHeading>
            <VariantText className="max-w-2xl mx-auto">
              {aboutContent.team.subtitle}
            </VariantText>
          </div>

          {displayedTeamMembers.length > 0 ? (
            <>
              {teamPresentation === 'grid' && (
                <VariantGrid>
                  {displayedTeamMembers.map((member, index) => renderTeamMemberCard(member, index, false))}
                </VariantGrid>
              )}

              {teamPresentation === 'carousel' && (
                <div className="overflow-x-auto pb-4 -mx-4 px-4">
                  <div className="flex gap-6" style={{ minWidth: 'min-content' }}>
                    {displayedTeamMembers.map((member, index) => (
                      <div key={index} style={{ width: '300px' }}>
                        {renderTeamMemberCard(member, index, false)}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {teamPresentation === 'spotlight-list' && (
                <div className="max-w-4xl mx-auto space-y-6">
                  {displayedTeamMembers.map((member, index) => renderTeamMemberCard(member, index, true))}
                </div>
              )}
            </>
          ) : (
            <div className="max-w-4xl mx-auto text-center">
              <VariantText>
                {aboutContent.team.description}
              </VariantText>
            </div>
          )}
        </VariantContainer>
      </VariantSection>
    );
  };

  const sectionMap: Record<string, () => JSX.Element | null> = {
    timeline: renderTimeline,
    mission: renderMission,
    values: renderValues,
    services: renderServices,
    team: renderTeam,
  };

  const layoutOrder: Record<string, string[]> = {
    'mission-first': ['mission', 'values', 'services', 'team'],
    'values-first': ['values', 'mission', 'services', 'team'],
    'team-first': ['team', 'mission', 'values', 'services'],
    'timeline-led': ['timeline', 'mission', 'values', 'team', 'services'],
  };

  const sectionOrder = layoutOrder[aboutConfig.layout] || layoutOrder['mission-first'];

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

      {sectionOrder.map((sectionKey) => {
        const renderFunction = sectionMap[sectionKey];
        return renderFunction ? renderFunction() : null;
      })}
    </LandingLayout>
  );
}
