import { useLanguage } from "@/contexts/LanguageContext";
import { Target } from "lucide-react";

export function MissionSection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-muted/20" aria-label="Mission and vision">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Target className="w-12 h-12 mx-auto mb-4 text-primary" aria-hidden="true" />
            <h2 className="text-3xl font-bold mb-4" data-testid="heading-mission">
              {t('company.mission.title')}
            </h2>
            <p className="text-xl text-muted-foreground" data-testid="text-mission-description">
              {t('company.mission.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4" data-testid="mission-statement">
              <h3 className="text-xl font-semibold">{t('company.mission.ourMission')}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('company.mission.missionStatement')}
              </p>
            </div>
            <div className="space-y-4" data-testid="vision-statement">
              <h3 className="text-xl font-semibold">{t('company.mission.ourVision')}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('company.mission.visionStatement')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
