import { LandingLayout } from "@/components/LandingLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useVariantClasses } from "@/layouts/shared/useVariant";

export default function ContactPage() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { config, loading } = useSiteConfig();
  const classes = useVariantClasses();
  
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

  return (
    <LandingLayout>
      <SEO
        title={t('contact.seo.title')}
        description={t('contact.seo.description')}
        keywords={t('contact.seo.keywords')}
      />
      {/* Hero Section */}
      <section className={`${classes.spacing('section')} bg-gradient-to-br from-primary/10 via-background to-background`}>
        <div className={classes.container}>
          <div className={`max-w-3xl mx-auto text-center ${classes.spacing('element')} ${classes.animation('hero')}`}>
            <h1 className={`${classes.textSize('hero')} font-bold`} data-testid="text-contact-title">
              {t('contact.hero.title')}
            </h1>
            <p className={`${classes.textSize('body')} text-muted-foreground`}>
              {t('contact.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className={classes.spacing('section')}>
        <div className={classes.container}>
          <div className={`grid gap-12 lg:grid-cols-2 ${classes.animation('page')}`}>
            {/* Contact Form */}
            <div>
              <Card className={`${classes.card} ${classes.hover('card')}`}>
                <CardHeader>
                  <CardTitle className={classes.textSize('heading')}>{t('contact.form.title')}</CardTitle>
                  <CardDescription className={classes.textSize('body')}>
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
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card className={`${classes.card} ${classes.hover('card')}`}>
                <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{t('contact.info.emailSupport.title')}</CardTitle>
                    <CardDescription className={`${classes.textSize('body')} mt-1`}>
                      {supportEmail}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>

              <Card className={`${classes.card} ${classes.hover('card')}`}>
                <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{t('contact.info.supportHours.title')}</CardTitle>
                    <CardDescription className={`${classes.textSize('body')} mt-1`}>
                      {t('contact.info.supportHours.value')}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>

              <Card className={`${classes.card} ${classes.hover('card')}`}>
                <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{t('contact.info.officeAddress.title')}</CardTitle>
                    <CardDescription className={`${classes.textSize('body')} mt-1`}>
                      {t('contact.info.officeAddress.line1')}
                      <br />
                      {t('contact.info.officeAddress.line2')}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>

              <Card className={`${classes.card} ${classes.hover('card')}`}>
                <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{t('contact.info.liveChat.title')}</CardTitle>
                    <CardDescription className={`${classes.textSize('body')} mt-1`}>
                      {t('contact.info.liveChat.value')}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
}
