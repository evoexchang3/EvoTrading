import { useState, useEffect, useRef } from "react";
import { useSiteConfig } from "@/contexts/SiteConfigContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Save, RefreshCw, Eye, AlertCircle, Settings, DollarSign, Award, Shield, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { VariantPreviewCard } from "@/components/admin/VariantPreviewCard";
import { LicenseManager } from "@/components/admin/LicenseManager";
import { LocationManager } from "@/components/admin/LocationManager";
import { TeamManager } from "@/components/admin/TeamManager";

const layoutVariants = [
  { value: "original", label: "Original", description: "Default platform design - clean & professional" },
  { value: "bloomberg-dark", label: "Bloomberg Dark", description: "Professional charcoal with blue accents" },
  { value: "modern-light", label: "Modern Light", description: "Clean white with subtle grays" },
  { value: "minimalist-corporate", label: "Minimalist Corporate", description: "Ultra-minimal with navy tones" },
  { value: "crypto-neon", label: "Crypto Neon", description: "Dark with neon green/purple" },
  { value: "financial-times", label: "Financial Times", description: "Newspaper-inspired sepia" },
  { value: "nordic-clean", label: "Nordic Clean", description: "Scandinavian minimalism" },
  { value: "charcoal-pro", label: "Charcoal Pro", description: "Deep charcoal with gold accents" },
  { value: "emerald-trader", label: "Emerald Trader", description: "Dark teal with emerald highlights" },
  { value: "navy-institutional", label: "Navy Institutional", description: "Deep navy with cream text" },
  { value: "sunset-trading", label: "Sunset Trading", description: "Warm orange/amber gradients" },
  { value: "midnight-premium", label: "Midnight Premium", description: "Near-black with purple accents" },
  { value: "arctic-minimal", label: "Arctic Minimal", description: "Cool blue-grays" },
  { value: "carbon-sleek", label: "Carbon Sleek", description: "Carbon fiber aesthetic" },
  { value: "sapphire-finance", label: "Sapphire Finance", description: "Royal blue with gold" },
  { value: "terracotta-warm", label: "Terracotta Warm", description: "Warm earth tones" }
];

const languages = [
  { code: "en", name: "English" },
  { code: "zh-CN", name: "Chinese (Simplified)" },
  { code: "ja", name: "Japanese" },
  { code: "de", name: "German" },
  { code: "fr", name: "French" },
  { code: "es", name: "Spanish" },
  { code: "ar", name: "Arabic" },
  { code: "ru", name: "Russian" },
  { code: "pt", name: "Portuguese" }
];

export default function AdminConfigPage() {
  const { config, loading, reloadConfig, updateConfig } = useSiteConfig();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [previewVariant, setPreviewVariant] = useState<string | null>(null);
  const initialized = useRef(false);
  
  // Form state
  const [formData, setFormData] = useState({
    companyName: "",
    supportEmail: "",
    activeVariant: "",
    stickyHeader: true,
    showFooter: true,
    accountTypes: {
      standard: { enabled: true, visible: true },
      professional: { enabled: true, visible: true },
      vip: { enabled: true, visible: true }
    },
    paymentMethods: {
      bankTransfer: { enabled: true },
      cards: { enabled: true },
      ewallets: { enabled: true },
      crypto: { enabled: true }
    },
    languageOverrides: {} as Record<string, { companyName?: string; supportEmail?: string }>,
    // Extended branding fields
    legalEntity: {
      registeredName: "" as string | undefined,
      registrationNumber: "" as string | undefined,
      registeredAddress: "" as string | undefined,
      jurisdiction: "" as string | undefined
    },
    licenses: [] as Array<{
      authority: string;
      licenseNumber: string;
      status: 'active' | 'pending' | 'suspended';
      issueDate?: string;
      expiryDate?: string;
    }>,
    locations: [] as Array<{
      name: string;
      type: 'headquarters' | 'branch' | 'representative';
      address: string;
      phone?: string;
      email?: string;
    }>,
    team: [] as Array<{
      name: string;
      role: string;
      bio?: string;
      photo?: string;
    }>,
    // Advanced config state
    advanced: {
      hedgingAllowed: true,
      scalpingAllowed: true,
      marginCallLevel: 80,
      stopOutLevel: 50,
      requireEmailVerification: true,
      requirePhoneVerification: false,
      minimumAge: 18,
      enforce2FAForWithdrawals: true,
      minDepositBank: 100,
      minWithdrawal: 50,
      autoApproveDeposits: true,
      manualReviewThreshold: 5000,
      welcomeBonusEnabled: true,
      bonusPercentage: 100,
      maxBonus: 500,
      referralProgramEnabled: true,
      riskWarningText: "Trading involves risk of loss. Only trade with money you can afford to lose.",
      showWarningOnLogin: true,
      showWarningOnDeposit: true,
      gdprCompliant: true,
      selfExclusionAvailable: true,
      demoAccountsEnabled: true,
      demoInitialBalance: 10000,
      demoAllowReset: true,
      demoExpiryDays: 90
    }
  });

  // Initialize form data from config
  useEffect(() => {
    if (!loading && config && !initialized.current) {
      setFormData({
        companyName: config.branding.companyName,
        supportEmail: config.branding.supportEmail,
        activeVariant: config.layout.activeVariant,
        stickyHeader: config.layout.stickyHeader,
        showFooter: config.layout.showFooter,
        accountTypes: config.features.accountTypes,
        paymentMethods: {
          bankTransfer: { enabled: config.features.paymentMethods.bankTransfer.enabled },
          cards: { enabled: config.features.paymentMethods.cards.enabled },
          ewallets: { enabled: config.features.paymentMethods.ewallets.enabled },
          crypto: { enabled: config.features.paymentMethods.crypto.enabled }
        },
        languageOverrides: config.branding.languageOverrides || {},
        legalEntity: {
          registeredName: config.branding.legalEntity?.registeredName || "",
          registrationNumber: config.branding.legalEntity?.registrationNumber || "",
          registeredAddress: config.branding.legalEntity?.registeredAddress || "",
          jurisdiction: config.branding.legalEntity?.jurisdiction || ""
        },
        licenses: config.branding.licenses || [],
        locations: config.branding.locations || [],
        team: config.branding.team || [],
        advanced: {
          hedgingAllowed: config.tradingSettings?.restrictions?.hedgingAllowed ?? true,
          scalpingAllowed: config.tradingSettings?.restrictions?.scalping?.allowed ?? true,
          marginCallLevel: config.tradingSettings?.riskManagement?.marginCallLevel ?? 80,
          stopOutLevel: config.tradingSettings?.riskManagement?.stopOutLevel ?? 50,
          requireEmailVerification: config.accountSettings?.registration?.requireEmailVerification ?? true,
          requirePhoneVerification: config.accountSettings?.registration?.requirePhoneVerification ?? false,
          minimumAge: config.accountSettings?.registration?.minimumAge ?? 18,
          enforce2FAForWithdrawals: config.accountSettings?.security?.twoFactorAuth?.enforcedForWithdrawals ?? true,
          minDepositBank: config.funding?.deposits?.minAmounts?.bankTransfer ?? 100,
          minWithdrawal: config.funding?.withdrawals?.minAmount ?? 50,
          autoApproveDeposits: config.funding?.deposits?.processing?.autoApprove ?? true,
          manualReviewThreshold: config.funding?.withdrawals?.verification?.manualReviewThreshold ?? 5000,
          welcomeBonusEnabled: config.promotions?.welcomeBonus?.enabled ?? true,
          bonusPercentage: config.promotions?.welcomeBonus?.percentage ?? 100,
          maxBonus: config.promotions?.welcomeBonus?.maxBonus ?? 500,
          referralProgramEnabled: config.promotions?.referralProgram?.enabled ?? true,
          riskWarningText: config.compliance?.riskWarnings?.customText ?? "Trading involves risk of loss.",
          showWarningOnLogin: config.compliance?.riskWarnings?.showOnLogin ?? true,
          showWarningOnDeposit: config.compliance?.riskWarnings?.showOnDeposit ?? true,
          gdprCompliant: config.compliance?.dataProtection?.gdprCompliant ?? true,
          selfExclusionAvailable: config.compliance?.responsibleTrading?.selfExclusionAvailable ?? true,
          demoAccountsEnabled: config.demoAccounts?.enabled ?? true,
          demoInitialBalance: config.demoAccounts?.settings?.initialBalance ?? 10000,
          demoAllowReset: config.demoAccounts?.settings?.allowReset ?? true,
          demoExpiryDays: config.demoAccounts?.settings?.expiryDays ?? 90
        }
      });
      initialized.current = true;
    }
  }, [config, loading]);

  const handleSave = async () => {
    try {
      setSaving(true);

      // Build updated config
      const updatedConfig = {
        ...config,
        branding: {
          ...config.branding,
          companyName: formData.companyName,
          supportEmail: formData.supportEmail,
          languageOverrides: formData.languageOverrides,
          legalEntity: formData.legalEntity,
          licenses: formData.licenses,
          locations: formData.locations,
          team: formData.team
        },
        layout: {
          ...config.layout,
          activeVariant: formData.activeVariant,
          stickyHeader: formData.stickyHeader,
          showFooter: formData.showFooter
        },
        features: {
          ...config.features,
          accountTypes: formData.accountTypes,
          paymentMethods: {
            ...config.features.paymentMethods,
            bankTransfer: { ...config.features.paymentMethods.bankTransfer, enabled: formData.paymentMethods.bankTransfer.enabled },
            cards: { ...config.features.paymentMethods.cards, enabled: formData.paymentMethods.cards.enabled },
            ewallets: { ...config.features.paymentMethods.ewallets, enabled: formData.paymentMethods.ewallets.enabled },
            crypto: { ...config.features.paymentMethods.crypto, enabled: formData.paymentMethods.crypto.enabled }
          }
        },
        tradingSettings: {
          ...config.tradingSettings,
          restrictions: {
            ...config.tradingSettings?.restrictions,
            hedgingAllowed: formData.advanced.hedgingAllowed,
            scalping: {
              ...config.tradingSettings?.restrictions?.scalping,
              allowed: formData.advanced.scalpingAllowed
            }
          },
          riskManagement: {
            ...config.tradingSettings?.riskManagement,
            marginCallLevel: formData.advanced.marginCallLevel,
            stopOutLevel: formData.advanced.stopOutLevel
          }
        },
        accountSettings: {
          ...config.accountSettings,
          registration: {
            ...config.accountSettings?.registration,
            requireEmailVerification: formData.advanced.requireEmailVerification,
            requirePhoneVerification: formData.advanced.requirePhoneVerification,
            minimumAge: formData.advanced.minimumAge
          },
          security: {
            ...config.accountSettings?.security,
            twoFactorAuth: {
              ...config.accountSettings?.security?.twoFactorAuth,
              enforcedForWithdrawals: formData.advanced.enforce2FAForWithdrawals
            }
          }
        },
        funding: {
          ...config.funding,
          deposits: {
            ...config.funding?.deposits,
            minAmounts: {
              ...config.funding?.deposits?.minAmounts,
              bankTransfer: formData.advanced.minDepositBank
            },
            processing: {
              ...config.funding?.deposits?.processing,
              autoApprove: formData.advanced.autoApproveDeposits
            }
          },
          withdrawals: {
            ...config.funding?.withdrawals,
            minAmount: formData.advanced.minWithdrawal,
            verification: {
              ...config.funding?.withdrawals?.verification,
              manualReviewThreshold: formData.advanced.manualReviewThreshold
            }
          }
        },
        promotions: {
          ...config.promotions,
          welcomeBonus: {
            ...config.promotions?.welcomeBonus,
            enabled: formData.advanced.welcomeBonusEnabled,
            percentage: formData.advanced.bonusPercentage,
            maxBonus: formData.advanced.maxBonus
          },
          referralProgram: {
            ...config.promotions?.referralProgram,
            enabled: formData.advanced.referralProgramEnabled
          }
        },
        compliance: {
          ...config.compliance,
          riskWarnings: {
            ...config.compliance?.riskWarnings,
            customText: formData.advanced.riskWarningText,
            showOnLogin: formData.advanced.showWarningOnLogin,
            showOnDeposit: formData.advanced.showWarningOnDeposit
          },
          dataProtection: {
            ...config.compliance?.dataProtection,
            gdprCompliant: formData.advanced.gdprCompliant
          },
          responsibleTrading: {
            ...config.compliance?.responsibleTrading,
            selfExclusionAvailable: formData.advanced.selfExclusionAvailable
          }
        },
        demoAccounts: {
          ...config.demoAccounts,
          enabled: formData.advanced.demoAccountsEnabled,
          settings: {
            ...config.demoAccounts?.settings,
            initialBalance: formData.advanced.demoInitialBalance,
            allowReset: formData.advanced.demoAllowReset,
            expiryDays: formData.advanced.demoExpiryDays
          }
        }
      };

      const savedConfig = await apiRequest("PUT", "/api/admin/site-config", updatedConfig);

      toast({
        title: "Configuration updated",
        description: "Site configuration has been saved successfully.",
      });

      // Update context directly with saved config (more efficient than reload)
      updateConfig(savedConfig);
      initialized.current = false;
      
      // Clear preview if active
      if (previewVariant) {
        handleClearPreview();
      }
    } catch (error) {
      toast({
        title: "Update failed",
        description: error instanceof Error ? error.message : "Failed to update configuration",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handlePreview = (variant: string) => {
    setPreviewVariant(variant);
    
    // Update URL with preview parameter (context will handle the rest)
    const url = new URL(window.location.href);
    url.searchParams.set('preview', variant);
    window.history.pushState({}, '', url.toString());
    
    // Dispatch event to notify context
    window.dispatchEvent(new Event('previewchange'));
  };

  const handleClearPreview = () => {
    setPreviewVariant(null);
    
    // Remove preview parameter from URL
    const url = new URL(window.location.href);
    url.searchParams.delete('preview');
    window.history.pushState({}, '', url.toString());
    
    // Dispatch event to notify context
    window.dispatchEvent(new Event('previewchange'));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Site Configuration</h1>
        <p className="text-muted-foreground">
          Customize branding, layout, and features without code changes
        </p>
      </div>

      {previewVariant && (
        <Card className="mb-4 border-primary">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span className="text-sm">
                Previewing <strong>{layoutVariants.find(v => v.value === previewVariant)?.label}</strong>
              </span>
            </div>
            <Button size="sm" variant="outline" onClick={handleClearPreview} data-testid="button-clear-preview">
              Clear Preview
            </Button>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="branding" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="branding" data-testid="tab-branding">Branding</TabsTrigger>
          <TabsTrigger value="layout" data-testid="tab-layout">Layout</TabsTrigger>
          <TabsTrigger value="features" data-testid="tab-features">Features</TabsTrigger>
          <TabsTrigger value="languages" data-testid="tab-languages">Languages</TabsTrigger>
          <TabsTrigger value="advanced" data-testid="tab-advanced">Advanced</TabsTrigger>
        </TabsList>

        {/* Branding Tab */}
        <TabsContent value="branding" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Default Branding</CardTitle>
              <CardDescription>
                Default company name and support email (used when no language override exists)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="Trading Platform"
                  data-testid="input-company-name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supportEmail">Support Email</Label>
                <Input
                  id="supportEmail"
                  type="email"
                  value={formData.supportEmail}
                  onChange={(e) => setFormData({ ...formData, supportEmail: e.target.value })}
                  placeholder="support@tradingplatform.com"
                  data-testid="input-support-email"
                />
              </div>
            </CardContent>
          </Card>

          {/* Legal Entity */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                <div>
                  <CardTitle>Legal Entity</CardTitle>
                  <CardDescription>
                    Company registration and legal information
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="registeredName">Registered Name</Label>
                  <Input
                    id="registeredName"
                    value={formData.legalEntity.registeredName}
                    onChange={(e) => setFormData({
                      ...formData,
                      legalEntity: { ...formData.legalEntity, registeredName: e.target.value }
                    })}
                    placeholder="Trading Platform Ltd."
                    data-testid="input-registered-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registrationNumber">Registration Number</Label>
                  <Input
                    id="registrationNumber"
                    value={formData.legalEntity.registrationNumber}
                    onChange={(e) => setFormData({
                      ...formData,
                      legalEntity: { ...formData.legalEntity, registrationNumber: e.target.value }
                    })}
                    placeholder="12345678"
                    data-testid="input-registration-number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registeredAddress">Registered Address</Label>
                  <Input
                    id="registeredAddress"
                    value={formData.legalEntity.registeredAddress}
                    onChange={(e) => setFormData({
                      ...formData,
                      legalEntity: { ...formData.legalEntity, registeredAddress: e.target.value }
                    })}
                    placeholder="123 Business Street, City, Country"
                    data-testid="input-registered-address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jurisdiction">Jurisdiction</Label>
                  <Input
                    id="jurisdiction"
                    value={formData.legalEntity.jurisdiction}
                    onChange={(e) => setFormData({
                      ...formData,
                      legalEntity: { ...formData.legalEntity, jurisdiction: e.target.value }
                    })}
                    placeholder="United Kingdom"
                    data-testid="input-jurisdiction"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Licenses */}
          <Card>
            <CardHeader>
              <CardTitle>Regulatory Licenses</CardTitle>
              <CardDescription>
                Manage regulatory licenses and authorizations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LicenseManager
                licenses={formData.licenses}
                onChange={(licenses) => setFormData({ ...formData, licenses })}
              />
            </CardContent>
          </Card>

          {/* Locations */}
          <Card>
            <CardHeader>
              <CardTitle>Office Locations</CardTitle>
              <CardDescription>
                Manage headquarters and branch offices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LocationManager
                locations={formData.locations}
                onChange={(locations) => setFormData({ ...formData, locations })}
              />
            </CardContent>
          </Card>

          {/* Team */}
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>
                Manage leadership and key team members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TeamManager
                team={formData.team}
                onChange={(team) => setFormData({ ...formData, team })}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Layout Tab */}
        <TabsContent value="layout" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Visual Theme</CardTitle>
              <CardDescription>
                Choose a pre-built layout variant or preview themes before applying
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {layoutVariants.map((variant) => (
                  <VariantPreviewCard
                    key={variant.value}
                    variant={variant}
                    isActive={formData.activeVariant === variant.value}
                    onSelect={() => setFormData({ ...formData, activeVariant: variant.value })}
                    onPreview={() => handlePreview(variant.value)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Layout Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Sticky Header</Label>
                  <p className="text-sm text-muted-foreground">
                    Keep header visible when scrolling
                  </p>
                </div>
                <Switch
                  checked={formData.stickyHeader}
                  onCheckedChange={(checked) => setFormData({ ...formData, stickyHeader: checked })}
                  data-testid="switch-sticky-header"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Show Footer</Label>
                  <p className="text-sm text-muted-foreground">
                    Display footer on public pages
                  </p>
                </div>
                <Switch
                  checked={formData.showFooter}
                  onCheckedChange={(checked) => setFormData({ ...formData, showFooter: checked })}
                  data-testid="switch-show-footer"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Features Tab */}
        <TabsContent value="features" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Types</CardTitle>
              <CardDescription>
                Control which account types are available to users
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(formData.accountTypes).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div>
                    <Label className="capitalize">{key} Account</Label>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <Label className="text-sm text-muted-foreground">Enabled</Label>
                      <Switch
                        checked={value.enabled}
                        onCheckedChange={(checked) => setFormData({
                          ...formData,
                          accountTypes: {
                            ...formData.accountTypes,
                            [key]: { ...value, enabled: checked }
                          }
                        })}
                        data-testid={`switch-account-${key}-enabled`}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Label className="text-sm text-muted-foreground">Visible</Label>
                      <Switch
                        checked={value.visible}
                        onCheckedChange={(checked) => setFormData({
                          ...formData,
                          accountTypes: {
                            ...formData.accountTypes,
                            [key]: { ...value, visible: checked }
                          }
                        })}
                        data-testid={`switch-account-${key}-visible`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>
                Enable or disable payment method categories
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(formData.paymentMethods).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <Label className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
                  <Switch
                    checked={value.enabled}
                    onCheckedChange={(checked) => setFormData({
                      ...formData,
                      paymentMethods: {
                        ...formData.paymentMethods,
                        [key]: { enabled: checked }
                      }
                    })}
                    data-testid={`switch-payment-${key}`}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Languages Tab */}
        <TabsContent value="languages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Language-Specific Branding</CardTitle>
              <CardDescription>
                Override company name and support email for specific languages
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {languages.filter(l => l.code !== 'en').map((language) => (
                <div key={language.code} className="border-b pb-6 last:border-0">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary">{language.code}</Badge>
                    <h3 className="font-semibold">{language.name}</h3>
                  </div>
                  <div className="space-y-4 ml-4">
                    <div className="space-y-2">
                      <Label htmlFor={`${language.code}-company`}>Company Name</Label>
                      <Input
                        id={`${language.code}-company`}
                        value={formData.languageOverrides[language.code]?.companyName || ""}
                        onChange={(e) => setFormData({
                          ...formData,
                          languageOverrides: {
                            ...formData.languageOverrides,
                            [language.code]: {
                              ...formData.languageOverrides[language.code],
                              companyName: e.target.value
                            }
                          }
                        })}
                        placeholder={`Leave empty to use default (${formData.companyName})`}
                        data-testid={`input-lang-${language.code}-company`}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`${language.code}-email`}>Support Email</Label>
                      <Input
                        id={`${language.code}-email`}
                        type="email"
                        value={formData.languageOverrides[language.code]?.supportEmail || ""}
                        onChange={(e) => setFormData({
                          ...formData,
                          languageOverrides: {
                            ...formData.languageOverrides,
                            [language.code]: {
                              ...formData.languageOverrides[language.code],
                              supportEmail: e.target.value
                            }
                          }
                        })}
                        placeholder={`Leave empty to use default (${formData.supportEmail})`}
                        data-testid={`input-lang-${language.code}-email`}
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="bg-muted p-4 rounded-lg flex gap-2">
                <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Language overrides allow you to display different company names or support emails based on the user's selected language. Leave fields empty to use the default values.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Configuration Tab */}
        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Configuration</CardTitle>
              <CardDescription>
                Extended platform settings for trading, accounts, funding, compliance, and more
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="multiple" className="w-full">
                {/* Trading Settings */}
                <AccordionItem value="trading">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      <span>Trading Settings</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Hedging Allowed</Label>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={formData.advanced.hedgingAllowed}
                            onCheckedChange={(checked) => setFormData({...formData, advanced: {...formData.advanced, hedgingAllowed: checked}})}
                            data-testid="switch-hedging"
                          />
                          <span className="text-sm text-muted-foreground">Allow opposite positions on same instrument</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Scalping Allowed</Label>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={formData.advanced.scalpingAllowed}
                            onCheckedChange={(checked) => setFormData({...formData, advanced: {...formData.advanced, scalpingAllowed: checked}})}
                            data-testid="switch-scalping"
                          />
                          <span className="text-sm text-muted-foreground">Allow rapid position opening/closing</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Margin Call Level (%)</Label>
                        <Input
                          type="number"
                          value={formData.advanced.marginCallLevel}
                          onChange={(e) => setFormData({...formData, advanced: {...formData.advanced, marginCallLevel: parseInt(e.target.value) || 80}})}
                          placeholder="80"
                          data-testid="input-margin-call"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Stop Out Level (%)</Label>
                        <Input
                          type="number"
                          value={formData.advanced.stopOutLevel}
                          onChange={(e) => setFormData({...formData, advanced: {...formData.advanced, stopOutLevel: parseInt(e.target.value) || 50}})}
                          placeholder="50"
                          data-testid="input-stop-out"
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Account Settings */}
                <AccordionItem value="accounts">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      <span>Account & Registration</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Require Email Verification</Label>
                        <Switch
                          checked={formData.advanced.requireEmailVerification}
                          onCheckedChange={(checked) => setFormData({...formData, advanced: {...formData.advanced, requireEmailVerification: checked}})}
                          data-testid="switch-email-verification"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Require Phone Verification</Label>
                        <Switch
                          checked={formData.advanced.requirePhoneVerification}
                          onCheckedChange={(checked) => setFormData({...formData, advanced: {...formData.advanced, requirePhoneVerification: checked}})}
                          data-testid="switch-phone-verification"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Minimum Age</Label>
                        <Input
                          type="number"
                          value={formData.advanced.minimumAge}
                          onChange={(e) => setFormData({...formData, advanced: {...formData.advanced, minimumAge: parseInt(e.target.value) || 18}})}
                          placeholder="18"
                          data-testid="input-minimum-age"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>2FA Required for Withdrawals</Label>
                        <Switch
                          checked={formData.advanced.enforce2FAForWithdrawals}
                          onCheckedChange={(checked) => setFormData({...formData, advanced: {...formData.advanced, enforce2FAForWithdrawals: checked}})}
                          data-testid="switch-2fa-withdrawals"
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Funding */}
                <AccordionItem value="funding">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      <span>Funding & Withdrawals</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Min Deposit (Bank Transfer)</Label>
                        <Input
                          type="number"
                          value={formData.advanced.minDepositBank}
                          onChange={(e) => setFormData({...formData, advanced: {...formData.advanced, minDepositBank: parseInt(e.target.value) || 100}})}
                          placeholder="100"
                          data-testid="input-min-deposit-bank"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Min Withdrawal Amount</Label>
                        <Input
                          type="number"
                          value={formData.advanced.minWithdrawal}
                          onChange={(e) => setFormData({...formData, advanced: {...formData.advanced, minWithdrawal: parseInt(e.target.value) || 50}})}
                          placeholder="50"
                          data-testid="input-min-withdrawal"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Auto-approve Deposits</Label>
                        <Switch
                          checked={formData.advanced.autoApproveDeposits}
                          onCheckedChange={(checked) => setFormData({...formData, advanced: {...formData.advanced, autoApproveDeposits: checked}})}
                          data-testid="switch-auto-approve"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Manual Review Threshold</Label>
                        <Input
                          type="number"
                          value={formData.advanced.manualReviewThreshold}
                          onChange={(e) => setFormData({...formData, advanced: {...formData.advanced, manualReviewThreshold: parseInt(e.target.value) || 5000}})}
                          placeholder="5000"
                          data-testid="input-review-threshold"
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Promotions */}
                <AccordionItem value="promotions">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      <span>Promotions & Bonuses</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Welcome Bonus Enabled</Label>
                        <Switch
                          checked={formData.advanced.welcomeBonusEnabled}
                          onCheckedChange={(checked) => setFormData({...formData, advanced: {...formData.advanced, welcomeBonusEnabled: checked}})}
                          data-testid="switch-welcome-bonus"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Bonus Percentage (%)</Label>
                        <Input
                          type="number"
                          value={formData.advanced.bonusPercentage}
                          onChange={(e) => setFormData({...formData, advanced: {...formData.advanced, bonusPercentage: parseInt(e.target.value) || 100}})}
                          placeholder="100"
                          data-testid="input-bonus-percentage"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Max Bonus Amount</Label>
                        <Input
                          type="number"
                          value={formData.advanced.maxBonus}
                          onChange={(e) => setFormData({...formData, advanced: {...formData.advanced, maxBonus: parseInt(e.target.value) || 500}})}
                          placeholder="500"
                          data-testid="input-max-bonus"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Referral Program Enabled</Label>
                        <Switch
                          checked={formData.advanced.referralProgramEnabled}
                          onCheckedChange={(checked) => setFormData({...formData, advanced: {...formData.advanced, referralProgramEnabled: checked}})}
                          data-testid="switch-referral"
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Compliance */}
                <AccordionItem value="compliance">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      <span>Compliance & Legal</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Risk Warning Text</Label>
                        <Textarea
                          value={formData.advanced.riskWarningText}
                          onChange={(e) => setFormData({...formData, advanced: {...formData.advanced, riskWarningText: e.target.value}})}
                          placeholder="Enter custom risk warning"
                          rows={3}
                          data-testid="textarea-risk-warning"
                        />
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label>Show on Login</Label>
                          <Switch
                            checked={formData.advanced.showWarningOnLogin}
                            onCheckedChange={(checked) => setFormData({...formData, advanced: {...formData.advanced, showWarningOnLogin: checked}})}
                            data-testid="switch-warning-login"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Show on Deposit</Label>
                          <Switch
                            checked={formData.advanced.showWarningOnDeposit}
                            onCheckedChange={(checked) => setFormData({...formData, advanced: {...formData.advanced, showWarningOnDeposit: checked}})}
                            data-testid="switch-warning-deposit"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>GDPR Compliant</Label>
                          <Switch
                            checked={formData.advanced.gdprCompliant}
                            onCheckedChange={(checked) => setFormData({...formData, advanced: {...formData.advanced, gdprCompliant: checked}})}
                            data-testid="switch-gdpr"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Self-Exclusion Available</Label>
                          <Switch
                            checked={formData.advanced.selfExclusionAvailable}
                            onCheckedChange={(checked) => setFormData({...formData, advanced: {...formData.advanced, selfExclusionAvailable: checked}})}
                            data-testid="switch-self-exclusion"
                          />
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Demo Accounts */}
                <AccordionItem value="demo">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      <span>Demo Accounts</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Demo Accounts Enabled</Label>
                        <Switch
                          checked={formData.advanced.demoAccountsEnabled}
                          onCheckedChange={(checked) => setFormData({...formData, advanced: {...formData.advanced, demoAccountsEnabled: checked}})}
                          data-testid="switch-demo-enabled"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Initial Balance</Label>
                        <Input
                          type="number"
                          value={formData.advanced.demoInitialBalance}
                          onChange={(e) => setFormData({...formData, advanced: {...formData.advanced, demoInitialBalance: parseInt(e.target.value) || 10000}})}
                          placeholder="10000"
                          data-testid="input-demo-balance"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Allow Reset</Label>
                        <Switch
                          checked={formData.advanced.demoAllowReset}
                          onCheckedChange={(checked) => setFormData({...formData, advanced: {...formData.advanced, demoAllowReset: checked}})}
                          data-testid="switch-demo-reset"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Expiry Days</Label>
                        <Input
                          type="number"
                          value={formData.advanced.demoExpiryDays}
                          onChange={(e) => setFormData({...formData, advanced: {...formData.advanced, demoExpiryDays: parseInt(e.target.value) || 90}})}
                          placeholder="90"
                          data-testid="input-demo-expiry"
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg flex gap-2 mt-4">
                <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5" />
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  Advanced settings control platform behavior across trading, accounts, funding, promotions, compliance, and demo accounts. 
                  Changes to these settings may affect user experience, platform operations, and regulatory compliance. Always test changes thoroughly before applying to production.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end gap-2 mt-6">
        <Button
          variant="outline"
          onClick={() => reloadConfig()}
          disabled={saving}
          data-testid="button-reload"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Reload
        </Button>
        <Button
          onClick={handleSave}
          disabled={saving}
          data-testid="button-save"
        >
          {saving ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Configuration
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
