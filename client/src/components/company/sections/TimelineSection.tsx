import { useLanguage } from "@/contexts/LanguageContext";
import { Calendar, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TimelineSection({ prominent = false }: { prominent?: boolean }) {
  const { t } = useLanguage();

  const milestones = [
    {
      year: "2015",
      title: t('company.timeline.milestone1.title'),
      description: t('company.timeline.milestone1.description'),
    },
    {
      year: "2017",
      title: t('company.timeline.milestone2.title'),
      description: t('company.timeline.milestone2.description'),
    },
    {
      year: "2019",
      title: t('company.timeline.milestone3.title'),
      description: t('company.timeline.milestone3.description'),
    },
    {
      year: "2022",
      title: t('company.timeline.milestone4.title'),
      description: t('company.timeline.milestone4.description'),
    },
    {
      year: "2025",
      title: t('company.timeline.milestone5.title'),
      description: t('company.timeline.milestone5.description'),
    },
  ];

  if (prominent) {
    return (
      <section className="py-20 bg-gradient-to-b from-background to-muted/20" aria-label="Company timeline">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Calendar className="w-12 h-12 mx-auto mb-4 text-primary" aria-hidden="true" />
            <h2 className="text-4xl font-bold mb-4" data-testid="heading-timeline">
              {t('company.timeline.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-timeline-description">
              {t('company.timeline.subtitle')}
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-6" data-testid={`milestone-${index}`}>
                <div className="flex-shrink-0 w-24 text-right">
                  <div className="text-3xl font-bold text-primary" data-testid={`milestone-year-${index}`}>
                    {milestone.year}
                  </div>
                </div>
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-primary" />
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 flex-1 bg-border my-2" style={{ minHeight: '80px' }} />
                  )}
                </div>
                <Card className="flex-1">
                  <CardHeader>
                    <CardTitle data-testid={`milestone-title-${index}`}>{milestone.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground" data-testid={`milestone-description-${index}`}>
                      {milestone.description}
                    </p>
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
    <section className="py-12 border-y" aria-label="Company milestones">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2" data-testid="heading-timeline">
            {t('company.timeline.title')}
          </h2>
        </div>

        <div className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {milestones.map((milestone, index) => (
            <div key={index} className="text-center" data-testid={`milestone-${index}`}>
              <div className="text-2xl font-bold text-primary mb-2" data-testid={`milestone-year-${index}`}>
                {milestone.year}
              </div>
              <div className="text-sm font-semibold mb-1" data-testid={`milestone-title-${index}`}>
                {milestone.title}
              </div>
              <div className="text-xs text-muted-foreground" data-testid={`milestone-description-${index}`}>
                {milestone.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
