import { LandingLayout } from "@/components/LandingLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, TrendingUp, Users, Globe2, Award, Target } from "lucide-react";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/hooks/useLanguage";
import { useVariantClasses } from "@/layouts/shared/useVariant";

export default function AboutPage() {
  const { t } = useLanguage();
  const classes = useVariantClasses();
  
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
      <section className={`${classes.spacing('section')} bg-gradient-to-br from-primary/10 via-background to-background`}>
        <div className={classes.container}>
          <div className={`max-w-3xl mx-auto text-center ${classes.spacing('element')} ${classes.animation('hero')}`}>
            <h1 className={`${classes.textSize('hero')} font-bold`} data-testid="text-about-title">
              {t("about.hero.title")}
            </h1>
            <p className={`${classes.textSize('body')} text-muted-foreground`}>
              {t("about.hero.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className={classes.spacing('section')}>
        <div className={classes.container}>
          <div className={`grid gap-12 lg:grid-cols-2 items-center ${classes.animation('page')}`}>
            <div>
              <h2 className={`${classes.textSize('heading')} font-bold mb-6`} data-testid="text-mission-title">
                {t("about.mission.title")}
              </h2>
              <p className={`${classes.textSize('body')} text-muted-foreground mb-6`}>
                {t("about.mission.paragraph1")}
              </p>
              <p className={`${classes.textSize('body')} text-muted-foreground`}>
                {t("about.mission.paragraph2")}
              </p>
            </div>
            <div className="grid gap-4">
              <Card className={`${classes.card} ${classes.hover('card')}`}>
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
              <Card className={`${classes.card} ${classes.hover('card')}`}>
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
      <section className={`${classes.spacing('section')} bg-muted/30`}>
        <div className={classes.container}>
          <div className={`text-center ${classes.spacing('element')}`}>
            <h2 className={`${classes.textSize('heading')} font-bold`} data-testid="text-values-title">
              {t("about.values.title")}
            </h2>
            <p className={`${classes.textSize('body')} text-muted-foreground max-w-2xl mx-auto`}>
              {t("about.values.subtitle")}
            </p>
          </div>

          <div className={classes.grid}>
            {values.map((value, index) => (
              <Card key={index} className={`${classes.card} ${classes.hover('card')}`} data-testid={`card-value-${index}`}>
                <CardHeader>
                  <div className="mb-4">
                    <div className="inline-flex p-3 rounded-lg bg-primary/10">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <CardTitle className={classes.textSize('heading')}>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className={classes.textSize('body')}>{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={classes.spacing('section')}>
        <div className={classes.container}>
          <div className={`text-center ${classes.spacing('element')}`}>
            <h2 className={`${classes.textSize('heading')} font-bold`} data-testid="text-services-title">
              {t("about.services.title")}
            </h2>
            <p className={`${classes.textSize('body')} text-muted-foreground max-w-2xl mx-auto`}>
              {t("about.services.subtitle")}
            </p>
          </div>

          <div className={classes.grid}>
            <Card className={`${classes.card} ${classes.hover('card')}`}>
              <CardHeader>
                <CardTitle className={classes.textSize('heading')}>{t("about.services.forex.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className={classes.textSize('body')}>
                  {t("about.services.forex.description")}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className={`${classes.card} ${classes.hover('card')}`}>
              <CardHeader>
                <CardTitle className={classes.textSize('heading')}>{t("about.services.crypto.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className={classes.textSize('body')}>
                  {t("about.services.crypto.description")}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className={`${classes.card} ${classes.hover('card')}`}>
              <CardHeader>
                <CardTitle className={classes.textSize('heading')}>{t("about.services.commodities.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className={classes.textSize('body')}>
                  {t("about.services.commodities.description")}
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={`${classes.spacing('section')} bg-muted/30`}>
        <div className={classes.container}>
          <div className={`text-center ${classes.spacing('element')}`}>
            <h2 className={`${classes.textSize('heading')} font-bold`} data-testid="text-team-title">
              {t("about.team.title")}
            </h2>
            <p className={`${classes.textSize('body')} text-muted-foreground max-w-2xl mx-auto`}>
              {t("about.team.subtitle")}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <p className={`text-center ${classes.textSize('body')} text-muted-foreground`}>
              {t("about.team.description")}
            </p>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
}
