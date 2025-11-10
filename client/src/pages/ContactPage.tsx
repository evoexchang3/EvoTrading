import { LandingLayout } from "@/components/LandingLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Clock, MessageSquare, Phone, Globe } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/hooks/useLanguage";
import { useSiteConfig } from "@/contexts/SiteConfigContext";
import { useVariantContent } from "@/hooks/useVariantContent";
import { useVariant } from "@/layouts/shared/useVariant";
import {
  VariantSection,
  VariantContainer,
  VariantPageHeader,
  VariantCard,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/variant";

export default function ContactPage() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { config, loading } = useSiteConfig();
  const { getPageContent } = useVariantContent();
  const variant = useVariant();
  const contactContent = getPageContent('contact');
  
  if (!contactContent) {
    return null;
  }
  
  const contactConfig = variant.pages.contact;
  const supportEmail = loading ? "support@tradingplatform.com" : (config.branding?.supportEmail || "support@tradingplatform.com");
  
  const contactSchema = z.object({
    name: z.string().min(2, t('contact.form.name.error')),
    email: z.string().email(t('contact.form.email.error')),
    subject: z.string().min(5, t('contact.form.subject.error')),
    message: z.string().min(20, t('contact.form.message.error')),
  });

  type ContactFormData = z.infer<typeof contactSchema>;
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Contact form submitted:", data);
      return data;
    },
    onSuccess: () => {
      toast({
        title: t('contact.toast.success.title'),
        description: t('contact.toast.success.description'),
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: t('contact.toast.error.title'),
        description: t('contact.toast.error.description'),
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  const infoIcons = [Mail, Clock, MapPin, MessageSquare];
  const contactInfo = contactContent.info?.items?.map((item: {title: string; description: string}, index: number) => ({
    ...item,
    icon: infoIcons[index % infoIcons.length],
  })) || [];

  // Contact Form Section Component
  const ContactFormSection = () => {
    const isTwoColumn = contactConfig.formStructure === 'two-column';
    
    return (
      <VariantCard data-testid="card-contact-form">
        <CardHeader>
          <CardTitle>{contactContent.form?.title}</CardTitle>
          <CardDescription>
            {contactContent.form?.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Two-column layout for name and email when enabled */}
            {isTwoColumn ? (
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('contact.form.name.label')}</Label>
                  <Input
                    id="name"
                    {...form.register("name")}
                    placeholder={t('contact.form.name.placeholder')}
                    disabled={contactMutation.isPending}
                    data-testid="input-name"
                  />
                  {form.formState.errors.name && (
                    <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t('contact.form.email.label')}</Label>
                  <Input
                    id="email"
                    type="email"
                    {...form.register("email")}
                    placeholder={t('contact.form.email.placeholder')}
                    disabled={contactMutation.isPending}
                    data-testid="input-email"
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
                  )}
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">{t('contact.form.name.label')}</Label>
                  <Input
                    id="name"
                    {...form.register("name")}
                    placeholder={t('contact.form.name.placeholder')}
                    disabled={contactMutation.isPending}
                    data-testid="input-name"
                  />
                  {form.formState.errors.name && (
                    <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t('contact.form.email.label')}</Label>
                  <Input
                    id="email"
                    type="email"
                    {...form.register("email")}
                    placeholder={t('contact.form.email.placeholder')}
                    disabled={contactMutation.isPending}
                    data-testid="input-email"
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
                  )}
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="subject">{t('contact.form.subject.label')}</Label>
              <Input
                id="subject"
                {...form.register("subject")}
                placeholder={t('contact.form.subject.placeholder')}
                disabled={contactMutation.isPending}
                data-testid="input-subject"
              />
              {form.formState.errors.subject && (
                <p className="text-sm text-destructive">{form.formState.errors.subject.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">{t('contact.form.message.label')}</Label>
              <Textarea
                id="message"
                {...form.register("message")}
                placeholder={t('contact.form.message.placeholder')}
                rows={6}
                disabled={contactMutation.isPending}
                data-testid="input-message"
              />
              {form.formState.errors.message && (
                <p className="text-sm text-destructive">{form.formState.errors.message.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={contactMutation.isPending}
              data-testid="button-send-message"
            >
              {contactMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('contact.form.submitting')}
                </>
              ) : (
                t('contact.form.submitButton')
              )}
            </Button>
          </form>
        </CardContent>
      </VariantCard>
    );
  };

  // Contact Info Section Component
  const ContactInfoSection = () => {
    return (
      <div className="space-y-6" data-testid="section-contact-info">
        {/* Basic contact info cards */}
        {contactInfo.map((info: {title: string; description: string; icon: any}, index: number) => {
          const Icon = info.icon;
          return (
            <VariantCard key={index} data-testid={`card-info-${index}`}>
              <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>{info.title}</CardTitle>
                  <CardDescription className="mt-1 whitespace-pre-line">
                    {info.description}
                  </CardDescription>
                </div>
              </CardHeader>
            </VariantCard>
          );
        })}

        {/* Optional: Office Hours */}
        {contactConfig.showHours && (
          <VariantCard data-testid="card-office-hours">
            <CardHeader className="flex flex-row items-center gap-4 space-y-0">
              <div className="p-3 rounded-lg bg-primary/10">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>{t('contact.hours.title')}</CardTitle>
                <CardDescription className="mt-1 whitespace-pre-line">
                  {t('contact.hours.description')}
                </CardDescription>
              </div>
            </CardHeader>
          </VariantCard>
        )}

        {/* Optional: Office Locations */}
        {contactConfig.showOffices && (
          <VariantCard data-testid="card-offices">
            <CardHeader className="flex flex-row items-center gap-4 space-y-0">
              <div className="p-3 rounded-lg bg-primary/10">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>{t('contact.offices.title')}</CardTitle>
                <CardDescription className="mt-1 whitespace-pre-line">
                  {t('contact.offices.description')}
                </CardDescription>
              </div>
            </CardHeader>
          </VariantCard>
        )}

        {/* Optional: Social Media */}
        {contactConfig.showSocial && (
          <VariantCard data-testid="card-social">
            <CardHeader className="flex flex-row items-center gap-4 space-y-0">
              <div className="p-3 rounded-lg bg-primary/10">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>{t('contact.social.title')}</CardTitle>
                <CardDescription className="mt-1 whitespace-pre-line">
                  {t('contact.social.description')}
                </CardDescription>
              </div>
            </CardHeader>
          </VariantCard>
        )}

        {/* Optional: Map */}
        {contactConfig.showMap && (
          <VariantCard data-testid="card-map">
            <CardHeader>
              <CardTitle>{t('contact.map.title')}</CardTitle>
              <CardDescription>
                {t('contact.map.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">{t('contact.map.placeholder')}</p>
              </div>
            </CardContent>
          </VariantCard>
        )}
      </div>
    );
  };

  // Layout Renderer - dispatches based on layout type
  const renderLayout = () => {
    switch (contactConfig.layout) {
      case 'info-first':
        // Contact info leads on left, form on right
        return (
          <div className="grid gap-12 lg:grid-cols-2">
            <ContactInfoSection />
            <ContactFormSection />
          </div>
        );

      case 'split':
        // Equal 50/50 split with different visual treatment
        return (
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="bg-muted/30 p-8 rounded-lg">
              <ContactFormSection />
            </div>
            <div className="bg-background p-8 rounded-lg border">
              <ContactInfoSection />
            </div>
          </div>
        );

      case 'form-first':
      default:
        // Form prominently featured on left, info on right
        return (
          <div className="grid gap-12 lg:grid-cols-2">
            <ContactFormSection />
            <ContactInfoSection />
          </div>
        );
    }
  };

  return (
    <LandingLayout>
      <SEO
        title={t('contact.seo.title')}
        description={t('contact.seo.description')}
        keywords={t('contact.seo.keywords')}
      />
      
      {contactContent.hero && (
        <VariantPageHeader
          title={contactContent.hero.title}
          subtitle={contactContent.hero.subtitle}
          titleTestId="text-contact-title"
        />
      )}

      <VariantSection>
        <VariantContainer>
          {renderLayout()}
        </VariantContainer>
      </VariantSection>

      {contactContent.cta && (
        <VariantSection background="muted">
          <VariantContainer>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">{contactContent.cta.headline}</h2>
              <p className="text-lg text-muted-foreground mb-8">{contactContent.cta.description}</p>
              {contactContent.cta.buttonText && (
                <Button size="lg" data-testid="button-cta">
                  {contactContent.cta.buttonText}
                </Button>
              )}
            </div>
          </VariantContainer>
        </VariantSection>
      )}
    </LandingLayout>
  );
}
