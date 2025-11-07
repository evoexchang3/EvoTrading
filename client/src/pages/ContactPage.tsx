import { LandingLayout } from "@/components/LandingLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Clock, MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/hooks/useLanguage";
import { useSiteConfig } from "@/contexts/SiteConfigContext";
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

  const contactInfo = [
    {
      icon: Mail,
      title: t('contact.info.emailSupport.title'),
      description: supportEmail,
    },
    {
      icon: Clock,
      title: t('contact.info.supportHours.title'),
      description: t('contact.info.supportHours.value'),
    },
    {
      icon: MapPin,
      title: t('contact.info.officeAddress.title'),
      description: `${t('contact.info.officeAddress.line1')}\n${t('contact.info.officeAddress.line2')}`,
    },
    {
      icon: MessageSquare,
      title: t('contact.info.liveChat.title'),
      description: t('contact.info.liveChat.value'),
    },
  ];

  return (
    <LandingLayout>
      <SEO
        title={t('contact.seo.title')}
        description={t('contact.seo.description')}
        keywords={t('contact.seo.keywords')}
      />
      
      <VariantPageHeader
        title={t('contact.hero.title')}
        subtitle={t('contact.hero.subtitle')}
        titleTestId="text-contact-title"
      />

      <VariantSection>
        <VariantContainer>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <VariantCard>
                <CardHeader>
                  <CardTitle>{t('contact.form.title')}</CardTitle>
                  <CardDescription>
                    {t('contact.form.description')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <VariantCard key={index}>
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
            </div>
          </div>
        </VariantContainer>
      </VariantSection>
    </LandingLayout>
  );
}
