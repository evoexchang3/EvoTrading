import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const profileSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const { toast } = useToast();
  const { t } = useLanguage();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (data: ProfileFormData) => {
      return await apiRequest("PATCH", "/api/auth/profile", data);
    },
    onSuccess: (data) => {
      setUser(data.user);
      toast({
        title: t('profile.toast.success.title'),
        description: t('profile.toast.success.description'),
      });
    },
    onError: (error: any) => {
      toast({
        title: t('profile.toast.error.title'),
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    updateProfileMutation.mutate(data);
  };

  return (
    <div className="container max-w-4xl py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">{t('profile.title')}</h1>
        <p className="text-muted-foreground">{t('profile.description')}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('profile.personalInfo.title')}</CardTitle>
          <CardDescription>
            {t('profile.personalInfo.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('profile.firstName')}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          data-testid="input-firstname"
                          placeholder={t('profile.firstNamePlaceholder')}
                          disabled={updateProfileMutation.isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('profile.lastName')}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          data-testid="input-lastname"
                          placeholder={t('profile.lastNamePlaceholder')}
                          disabled={updateProfileMutation.isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('profile.email')}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        data-testid="input-email"
                        disabled={updateProfileMutation.isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('profile.phoneNumber')}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        data-testid="input-phone"
                        placeholder={t('profile.phoneNumberPlaceholder')}
                        disabled={updateProfileMutation.isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={updateProfileMutation.isPending}
                data-testid="button-save-profile"
              >
                {updateProfileMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('profile.saving')}
                  </>
                ) : (
                  t('profile.saveChanges')
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('profile.accountInfo.title')}</CardTitle>
          <CardDescription>
            {t('profile.accountInfo.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                {t('profile.username')}
              </div>
              <div className="font-medium" data-testid="text-username">
                {user?.username || t('profile.na')}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                {t('profile.accountId')}
              </div>
              <div className="font-mono text-sm" data-testid="text-account-id">
                {user?.id?.substring(0, 8) || t('profile.na')}...
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                {t('profile.emailVerified')}
              </div>
              <div className={user?.emailVerified ? "text-chart-1" : "text-chart-4"}>
                {user?.emailVerified ? t('common.yes') : t('common.no')}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                {t('profile.twoFactorEnabled')}
              </div>
              <div className={user?.twoFactorEnabled ? "text-chart-1" : "text-muted-foreground"}>
                {user?.twoFactorEnabled ? t('common.yes') : t('common.no')}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
