import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { useVariantClasses } from "@/layouts/shared/useVariant";

/**
 * Minimal hero layout with just text and buttons
 * Used by: modern-light, carbon-sleek, financial-times, midnight-premium
 */
export function HeroMinimal() {
  const { t } = useLanguage();
  const classes = useVariantClasses();

  return (
    <section className="relative overflow-hidden">
      <div className={`${classes.container} ${classes.spacing('section')}`}>
        <div className={`max-w-3xl ${classes.spacing('element')} ${classes.animation('hero')}`}>
          <h1 className={`${classes.textSize('hero')} font-bold tracking-tight`} data-testid="text-hero-title">
            {t('home.hero.title')}
          </h1>
          <p className={`${classes.textSize('body')} text-muted-foreground max-w-2xl`} data-testid="text-hero-subtitle">
            {t('home.hero.subtitle')}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/register">
              <Button size="lg" data-testid="button-hero-register">
                {t('home.hero.registerButton')}
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" data-testid="button-hero-login">
                {t('home.hero.loginButton')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
