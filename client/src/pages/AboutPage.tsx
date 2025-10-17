import { LandingLayout } from "@/components/LandingLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, TrendingUp, Users, Globe2, Award, Target } from "lucide-react";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/hooks/useLanguage";

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

  return (
    <LandingLayout>
      <SEO
        title={t("about.seo.title")}
        description={t("about.seo.description")}
        keywords={t("about.seo.keywords")}
      />
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold" data-testid="text-about-title">
              {t("about.hero.title")}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t("about.hero.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="text-mission-title">
                {t("about.mission.title")}
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                {t("about.mission.paragraph1")}
              </p>
              <p className="text-lg text-muted-foreground">
                {t("about.mission.paragraph2")}
              </p>
            </div>
            <div className="grid gap-4">
              <Card className="hover-elevate transition-all">
                <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{t("about.mission.regulated.title")}</CardTitle>
                    <CardDescription>{t("about.mission.regulated.description")}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
              <Card className="hover-elevate transition-all">
                <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{t("about.mission.clientFocused.title")}</CardTitle>
                    <CardDescription>{t("about.mission.clientFocused.description")}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-values-title">
              {t("about.values.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("about.values.subtitle")}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Card key={index} className="hover-elevate transition-all" data-testid={`card-value-${index}`}>
                <CardHeader>
                  <div className="mb-4">
                    <div className="inline-flex p-3 rounded-lg bg-primary/10">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-services-title">
              {t("about.services.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("about.services.subtitle")}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="hover-elevate transition-all">
              <CardHeader>
                <CardTitle className="text-xl">{t("about.services.forex.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {t("about.services.forex.description")}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all">
              <CardHeader>
                <CardTitle className="text-xl">{t("about.services.crypto.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {t("about.services.crypto.description")}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all">
              <CardHeader>
                <CardTitle className="text-xl">{t("about.services.commodities.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {t("about.services.commodities.description")}
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-team-title">
              {t("about.team.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("about.team.subtitle")}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <p className="text-center text-muted-foreground">
              {t("about.team.description")}
            </p>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
}
