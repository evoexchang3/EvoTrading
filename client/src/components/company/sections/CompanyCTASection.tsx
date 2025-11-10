import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";

export function CompanyCTASection() {
  const { t } = useLanguage();

  return (
    <section className="py-16" aria-label="Contact us">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <Building2 className="w-16 h-16 mx-auto mb-6 text-primary" aria-hidden="true" />
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-cta">
            {t('company.cta.title')}
          </h2>
          <p className="text-lg text-muted-foreground mb-8" data-testid="text-cta-description">
            {t('company.cta.subtitle')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" data-testid="button-contact">
                {t('company.cta.button')}
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" data-testid="button-about">
                {t('company.cta.about')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
