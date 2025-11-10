import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import {
  VariantSection,
  VariantContainer,
  VariantHeading,
  VariantText,
} from "@/components/variant";

export function CTASection() {
  const { t } = useLanguage();

  return (
    <VariantSection background="muted">
      <VariantContainer>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <VariantHeading level="heading" data-testid="text-cta-title">
            {t('partners.cta.title')}
          </VariantHeading>
          <VariantText className="text-muted-foreground">
            {t('partners.cta.subtitle')}
          </VariantText>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link href="/contact">
              <Button size="lg" data-testid="button-apply-now">
                {t('partners.cta.applyButton')}
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline" data-testid="button-learn-more">
                {t('partners.cta.learnMoreButton')}
              </Button>
            </Link>
          </div>
        </div>
      </VariantContainer>
    </VariantSection>
  );
}
