import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Shield, Key, Smartphone, Clock, AlertTriangle, CheckCircle2 } from "lucide-react";

type PasswordForm = z.infer<typeof passwordSchemaBase>;

const passwordSchemaBase = z.object({
  currentPassword: z.string(),
  newPassword: z.string(),
  confirmPassword: z.string(),
});

export default function AccountSecurityPage() {
  const { t } = useLanguage();

  const passwordSchema = passwordSchemaBase.extend({
    currentPassword: z.string().min(1, t('security.password.errors.currentRequired')),
    newPassword: z.string().min(8, t('security.password.errors.newMinLength')),
    confirmPassword: z.string().min(1, t('security.password.errors.confirmRequired')),
  }).refine((data) => data.newPassword === data.confirmPassword, {
    message: t('security.password.errors.mismatch'),
    path: ["confirmPassword"],
  });
  const { toast } = useToast();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const passwordForm = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { data: sessions } = useQuery({
    queryKey: ['/api/auth/sessions'],
  });

  const changePasswordMutation = useMutation({
    mutationFn: async (data: PasswordForm) => {
      return apiRequest("POST", "/api/auth/change-password", data);
    },
    onSuccess: () => {
      toast({
        title: t('security.password.successTitle'),
        description: t('security.password.successMessage'),
      });
      passwordForm.reset();
    },
    onError: () => {
      toast({
        title: t('security.password.errorTitle'),
        description: t('security.password.errorMessage'),
        variant: "destructive",
      });
    },
  });

  const toggle2FAMutation = useMutation({
    mutationFn: async (enabled: boolean) => {
      return apiRequest("POST", "/api/auth/2fa/toggle", { enabled });
    },
    onSuccess: (_, enabled) => {
      setTwoFactorEnabled(enabled);
      toast({
        title: enabled ? t('security.twoFactor.enabledTitle') : t('security.twoFactor.disabledTitle'),
        description: enabled ? t('security.twoFactor.enabledMessage') : t('security.twoFactor.disabledMessage'),
      });
      queryClient.invalidateQueries({ queryKey: ['/api/user'] });
    },
  });

  const onPasswordSubmit = (data: PasswordForm) => {
    changePasswordMutation.mutate(data);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2" data-testid="heading-security">
          {t('security.title')}
        </h1>
        <p className="text-muted-foreground" data-testid="text-security-description">
          {t('security.subtitle')}
        </p>
      </div>

      {/* Security Overview */}
      <Card data-testid="card-security-overview">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-950">
              <Shield className="w-6 h-6 text-green-600 dark:text-green-400" aria-hidden="true" />
            </div>
            <div>
              <CardTitle data-testid="heading-overview">{t('security.overview.title')}</CardTitle>
              <CardDescription data-testid="text-overview-description">
                {t('security.overview.subtitle')}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" aria-label={t('security.aria.enabled')} />
                <span className="text-sm">{t('security.overview.strongPassword')}</span>
              </div>
              <Badge variant="secondary" data-testid="badge-password-strength">
                {t('security.overview.active')}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {twoFactorEnabled ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" aria-label={t('security.aria.enabled')} />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" aria-label={t('security.aria.disabled')} />
                )}
                <span className="text-sm">{t('security.overview.twoFactor')}</span>
              </div>
              <Badge variant={twoFactorEnabled ? "secondary" : "outline"} data-testid="badge-2fa-status">
                {twoFactorEnabled ? t('security.overview.active') : t('security.overview.inactive')}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card data-testid="card-change-password">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950">
              <Key className="w-6 h-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
            </div>
            <div>
              <CardTitle data-testid="heading-password">{t('security.password.title')}</CardTitle>
              <CardDescription data-testid="text-password-description">
                {t('security.password.subtitle')}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...passwordForm}>
            <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
              <FormField
                control={passwordForm.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('security.password.currentLabel')}</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        data-testid="input-current-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={passwordForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('security.password.newLabel')}</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        data-testid="input-new-password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {t('security.password.requirement')}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={passwordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('security.password.confirmLabel')}</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        data-testid="input-confirm-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={changePasswordMutation.isPending}
                data-testid="button-change-password"
              >
                {changePasswordMutation.isPending ? t('security.password.updating') : t('security.password.update')}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card data-testid="card-2fa">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-950">
              <Smartphone className="w-6 h-6 text-purple-600 dark:text-purple-400" aria-hidden="true" />
            </div>
            <div>
              <CardTitle data-testid="heading-2fa">{t('security.twoFactor.title')}</CardTitle>
              <CardDescription data-testid="text-2fa-description">
                {t('security.twoFactor.subtitle')}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">{t('security.twoFactor.status')}</p>
              <p className="text-sm text-muted-foreground">
                {twoFactorEnabled ? t('security.twoFactor.statusEnabled') : t('security.twoFactor.statusDisabled')}
              </p>
            </div>
            <Switch
              checked={twoFactorEnabled}
              onCheckedChange={(checked) => toggle2FAMutation.mutate(checked)}
              disabled={toggle2FAMutation.isPending}
              data-testid="switch-2fa"
              aria-label={t('security.aria.toggle2FA')}
            />
          </div>
          <Separator />
          <div className="text-sm text-muted-foreground">
            <p className="mb-2 font-medium">{t('security.twoFactor.howItWorks')}</p>
            <ul className="list-disc list-inside space-y-1">
              <li>{t('security.twoFactor.step1')}</li>
              <li>{t('security.twoFactor.step2')}</li>
              <li>{t('security.twoFactor.step3')}</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card data-testid="card-sessions">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-950">
              <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" aria-hidden="true" />
            </div>
            <div>
              <CardTitle data-testid="heading-sessions">{t('security.sessions.title')}</CardTitle>
              <CardDescription data-testid="text-sessions-description">
                {t('security.sessions.subtitle')}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            <p>{t('security.sessions.currentDevice')}</p>
            <p className="mt-2">{t('security.sessions.comingSoon')}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
