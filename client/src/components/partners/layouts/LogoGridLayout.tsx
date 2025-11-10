import { useLanguage } from "@/hooks/useLanguage";
import {
  VariantSection,
  VariantContainer,
  VariantHeading,
  VariantText,
} from "@/components/variant";

export function LogoGridLayout() {
  const { t } = useLanguage();

  // Partner logos - in a real implementation, these would come from config/content
  const partners = [
    { name: 'TechCorp', id: 'partner-1' },
    { name: 'FinanceHub', id: 'partner-2' },
    { name: 'TradePro', id: 'partner-3' },
    { name: 'MarketLeader', id: 'partner-4' },
    { name: 'GlobalTrade', id: 'partner-5' },
    { name: 'InvestCo', id: 'partner-6' },
    { name: 'TradingEdge', id: 'partner-7' },
    { name: 'FXMaster', id: 'partner-8' },
  ];

  return (
    <VariantSection>
      <VariantContainer>
        <div className="text-center mb-12">
          <VariantHeading level="heading" data-testid="text-partners-grid-title">
            {t('partners.network.title') || 'Our Partner Network'}
          </VariantHeading>
          <VariantText className="text-muted-foreground max-w-2xl mx-auto">
            {t('partners.network.subtitle') || 'Join successful partners from around the world'}
          </VariantText>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="flex items-center justify-center p-6 rounded-lg bg-muted/50 hover-elevate w-full h-24"
              data-testid={`logo-${partner.id}`}
            >
              <span className="text-lg font-semibold text-muted-foreground">
                {partner.name}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <VariantText className="text-muted-foreground">
            {t('partners.network.footer') || 'Trusted by 1,000+ partners worldwide'}
          </VariantText>
        </div>
      </VariantContainer>
    </VariantSection>
  );
}
