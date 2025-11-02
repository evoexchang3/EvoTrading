import { useState, useEffect } from "react";
import { useSiteConfig } from "@/contexts/SiteConfigContext";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, RefreshCw, Eye, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const layoutVariants = [
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
  const { config, loading, reloadConfig } = useSiteConfig();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [previewVariant, setPreviewVariant] = useState<string | null>(null);
  
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
    languageOverrides: {} as Record<string, { companyName: string; supportEmail: string }>
  });

  // Initialize form data from config
  useEffect(() => {
    if (!loading && config) {
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
        languageOverrides: config.branding.languageOverrides || {}
      });
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
          languageOverrides: formData.languageOverrides
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
        }
      };

      const response = await fetch("/api/admin/site-config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updatedConfig)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update configuration");
      }

      toast({
        title: "Configuration updated",
        description: "Site configuration has been saved successfully.",
      });

      // Reload config to get fresh data
      await reloadConfig();
      
      // Clear preview if active
      setPreviewVariant(null);
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
    // Apply preview CSS
    const existingLinks = document.querySelectorAll('link[data-layout-variant]');
    existingLinks.forEach(link => link.remove());
    
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `/layouts/variants/${variant}.css`;
    link.setAttribute('data-layout-variant', variant);
    document.head.appendChild(link);
    
    document.documentElement.setAttribute('data-layout', variant);
  };

  const handleClearPreview = () => {
    setPreviewVariant(null);
    // Restore active variant
    handlePreview(formData.activeVariant);
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
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="branding" data-testid="tab-branding">Branding</TabsTrigger>
          <TabsTrigger value="layout" data-testid="tab-layout">Layout</TabsTrigger>
          <TabsTrigger value="features" data-testid="tab-features">Features</TabsTrigger>
          <TabsTrigger value="languages" data-testid="tab-languages">Languages</TabsTrigger>
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
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {layoutVariants.map((variant) => (
                  <Card
                    key={variant.value}
                    className={`cursor-pointer transition-all hover-elevate ${
                      formData.activeVariant === variant.value ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setFormData({ ...formData, activeVariant: variant.value })}
                    data-testid={`card-layout-${variant.value}`}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center justify-between">
                        {variant.label}
                        {formData.activeVariant === variant.value && (
                          <Badge variant="default" className="ml-2">Active</Badge>
                        )}
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {variant.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePreview(variant.value);
                        }}
                        data-testid={`button-preview-${variant.value}`}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        Preview
                      </Button>
                    </CardContent>
                  </Card>
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
