import { useLanguage } from "@/contexts/LanguageContext";
import { Award, Users, Globe, TrendingUp } from "lucide-react";

export function StatsSection({ overlay = false }: { overlay?: boolean }) {
  const { t } = useLanguage();

  const stats = [
    { label: t('company.stats.years'), value: t('company.stats.yearsValue'), icon: Award },
    { label: t('company.stats.clients'), value: t('company.stats.clientsValue'), icon: Users },
    { label: t('company.stats.countries'), value: t('company.stats.countriesValue'), icon: Globe },
    { label: t('company.stats.volume'), value: t('company.stats.volumeValue'), icon: TrendingUp },
  ];

  if (overlay) {
    return (
      <div className="py-12 border-y bg-muted/50 backdrop-blur-sm" aria-label="Company statistics">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center" data-testid={`stat-${index}`}>
                  <Icon className="w-8 h-8 mx-auto mb-2 text-primary" aria-hidden="true" />
                  <div className="text-3xl font-bold mb-1" data-testid={`stat-value-${index}`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground" data-testid={`stat-label-${index}`}>
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 border-y bg-muted/10" aria-label="Company statistics">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center" data-testid={`stat-${index}`}>
                <Icon className="w-8 h-8 mx-auto mb-2 text-primary" aria-hidden="true" />
                <div className="text-3xl font-bold mb-1" data-testid={`stat-value-${index}`}>
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground" data-testid={`stat-label-${index}`}>
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
