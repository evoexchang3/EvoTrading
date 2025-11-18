import { LandingLayout } from "@/components/LandingLayout";
import { Badge } from "@/components/ui/badge";
import { useSiteConfig } from "@/contexts/SiteConfigContext";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Building2,
  Globe
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { VariantSection, VariantContainer, VariantGrid, VariantCard, VariantHeading, VariantText, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/variant";
import { SEO } from "@/components/SEO";
import { getPhoneUri } from "@/lib/phoneUtils";

export default function LocationsPage() {
  const { t } = useLanguage();
  const { config } = useSiteConfig();

  const locations = config.branding?.locations || [];

  const getLocationTypeColor = (type: string) => {
    switch (type) {
      case 'headquarters':
        return 'default';
      case 'branch':
        return 'secondary';
      case 'representative':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const getLocationTypeLabel = (type: string) => {
    switch (type) {
      case 'headquarters':
        return t('company.locations.type.headquarters') || 'Headquarters';
      case 'branch':
        return t('company.locations.type.branch') || 'Branch Office';
      case 'representative':
        return t('company.locations.type.representative') || 'Representative Office';
      default:
        return type;
    }
  };

  return (
    <LandingLayout>
      <SEO
        title={t('company.locations.seo.title') || 'Our Locations'}
        description={t('company.locations.seo.description') || 'Find our global offices and contact information'}
      />
      
      <VariantSection animation="page">
        <VariantContainer>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4" data-testid="badge-locations">
                <Globe className="w-3 h-3 mr-1" />
                {t('company.locations.badge') || 'Global Presence'}
              </Badge>
              <VariantHeading level="hero" as="h1" className="mb-4" data-testid="text-locations-title">
                {t('company.locations.title') || 'Our Locations'}
              </VariantHeading>
              <VariantText className="text-muted-foreground max-w-3xl mx-auto">
                {t('company.locations.description') || 'We maintain a global presence with offices strategically located to serve our clients worldwide.'}
              </VariantText>
            </div>

            {locations.length === 0 ? (
              <div className="text-center py-12">
                <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <VariantText className="text-muted-foreground">
                  {t('company.locations.noLocations') || 'No office locations available at this time.'}
                </VariantText>
              </div>
            ) : (
              <VariantGrid>
                {locations.map((location, index) => (
                  <VariantCard key={index} data-testid={`card-location-${index}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-1" data-testid={`text-location-name-${index}`}>
                            {location.name}
                          </CardTitle>
                          <Badge 
                            variant={getLocationTypeColor(location.type)} 
                            className="text-xs"
                            data-testid={`badge-location-type-${index}`}
                          >
                            {getLocationTypeLabel(location.type)}
                          </Badge>
                        </div>
                        <Building2 className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm" data-testid={`text-location-address-${index}`}>
                            {location.address}
                          </p>
                        </div>
                      </div>

                      {location.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <a 
                            href={getPhoneUri(location.phone)}
                            className="text-sm hover:text-primary transition-colors"
                            data-testid={`link-location-phone-${index}`}
                          >
                            {location.phone}
                          </a>
                        </div>
                      )}

                      {location.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <a 
                            href={`mailto:${location.email}`}
                            className="text-sm hover:text-primary transition-colors"
                            data-testid={`link-location-email-${index}`}
                          >
                            {location.email}
                          </a>
                        </div>
                      )}
                    </CardContent>
                  </VariantCard>
                ))}
              </VariantGrid>
            )}

            {config.branding?.legalEntity && (
              <div className="mt-12 p-6 border rounded-lg bg-muted/30">
                <VariantHeading level="heading" className="mb-4" data-testid="text-legal-entity-title">
                  {t('company.locations.legalEntity.title') || 'Legal Information'}
                </VariantHeading>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  {config.branding.legalEntity.registeredName && (
                    <div>
                      <span className="text-muted-foreground">{t('company.locations.legalEntity.name') || 'Registered Name'}:</span>
                      <span className="ml-2 font-medium" data-testid="text-legal-name">{config.branding.legalEntity.registeredName}</span>
                    </div>
                  )}
                  {config.branding.legalEntity.registrationNumber && (
                    <div>
                      <span className="text-muted-foreground">{t('company.locations.legalEntity.number') || 'Registration Number'}:</span>
                      <span className="ml-2 font-mono font-medium" data-testid="text-legal-number">{config.branding.legalEntity.registrationNumber}</span>
                    </div>
                  )}
                  {config.branding.legalEntity.registeredAddress && (
                    <div>
                      <span className="text-muted-foreground">{t('company.locations.legalEntity.address') || 'Registered Address'}:</span>
                      <span className="ml-2 font-medium" data-testid="text-legal-address">{config.branding.legalEntity.registeredAddress}</span>
                    </div>
                  )}
                  {config.branding.legalEntity.jurisdiction && (
                    <div>
                      <span className="text-muted-foreground">{t('company.locations.legalEntity.jurisdiction') || 'Jurisdiction'}:</span>
                      <span className="ml-2 font-medium" data-testid="text-legal-jurisdiction">{config.branding.legalEntity.jurisdiction}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </VariantContainer>
      </VariantSection>
    </LandingLayout>
  );
}
