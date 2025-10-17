import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Loader2, DollarSign, Bell, Layout, TrendingUp } from "lucide-react";
import type { UserPreference } from "@shared/schema";
import { useLanguage } from "@/hooks/useLanguage";

const settingsSchema = z.object({
  displayCurrency: z.string(),
  theme: z.string(),
  defaultLotSize: z.string(),
  notifications: z.object({
    trades: z.boolean(),
    deposits: z.boolean(),
    margin: z.boolean(),
  }),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

export default function SettingsPage() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("general");

  const { data: preferences, isLoading } = useQuery<UserPreference>({
    queryKey: ["/api/preferences"],
  });

  const form = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      displayCurrency: 'USD',
      theme: 'dark',
      defaultLotSize: '0.01',
      notifications: {
        trades: true,
        deposits: true,
        margin: true,
      },
    },
  });

  // Update form when preferences load
  useEffect(() => {
    if (preferences && !isLoading) {
      form.reset({
        displayCurrency: preferences.displayCurrency || 'USD',
        theme: preferences.theme || 'dark',
        defaultLotSize: preferences.defaultLotSize || '0.01',
        notifications: preferences.notifications || {
          trades: true,
          deposits: true,
          margin: true,
        },
      });
    }
  }, [preferences, isLoading, form]);

  const updatePreferencesMutation = useMutation({
    mutationFn: async (data: Partial<UserPreference>) => {
      return await apiRequest("PATCH", "/api/preferences", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/preferences"] });
      toast({
        title: t("settings.toast.success.title"),
        description: t("settings.toast.success.description"),
      });
    },
    onError: (error: any) => {
      toast({
        title: t("settings.toast.error.title"),
        description: error.message || t("settings.toast.error.description"),
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: SettingsFormData) => {
    updatePreferencesMutation.mutate({
      displayCurrency: data.displayCurrency,
      theme: data.theme,
      defaultLotSize: data.defaultLotSize,
      notifications: data.notifications,
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-6 p-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">{t("settings.title")}</h1>
        <p className="text-muted-foreground mt-1">
          {t("settings.description")}
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general" data-testid="tab-general">
            <Layout className="h-4 w-4 mr-2" />
            {t("settings.tabs.general")}
          </TabsTrigger>
          <TabsTrigger value="trading" data-testid="tab-trading">
            <TrendingUp className="h-4 w-4 mr-2" />
            {t("settings.tabs.trading")}
          </TabsTrigger>
          <TabsTrigger value="display" data-testid="tab-display">
            <DollarSign className="h-4 w-4 mr-2" />
            {t("settings.tabs.display")}
          </TabsTrigger>
          <TabsTrigger value="notifications" data-testid="tab-notifications">
            <Bell className="h-4 w-4 mr-2" />
            {t("settings.tabs.notifications")}
          </TabsTrigger>
        </TabsList>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("settings.appearance.title")}</CardTitle>
                  <CardDescription>
                    {t("settings.appearance.description")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="theme"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("settings.appearance.theme")}</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger data-testid="select-theme">
                              <SelectValue placeholder={t("settings.appearance.themePlaceholder")} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="dark">{t("settings.appearance.theme.dark")}</SelectItem>
                            <SelectItem value="light">{t("settings.appearance.theme.light")}</SelectItem>
                            <SelectItem value="system">{t("settings.appearance.theme.system")}</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          {t("settings.appearance.themeDescription")}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trading" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("settings.tradingDefaults.title")}</CardTitle>
                  <CardDescription>
                    {t("settings.tradingDefaults.description")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="defaultLotSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("settings.tradingDefaults.defaultLotSize")}</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            min="0.01"
                            max="100"
                            placeholder={t("settings.tradingDefaults.defaultLotSizePlaceholder")}
                            {...field}
                            data-testid="input-lot-size"
                          />
                        </FormControl>
                        <FormDescription>
                          {t("settings.tradingDefaults.defaultLotSizeDescription")}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="display" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("settings.currencyDisplay.title")}</CardTitle>
                  <CardDescription>
                    {t("settings.currencyDisplay.description")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="displayCurrency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("settings.currencyDisplay.displayCurrency")}</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger data-testid="select-currency">
                              <SelectValue placeholder={t("settings.currencyDisplay.displayCurrencyPlaceholder")} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="USD">{t("settings.currencyDisplay.usd")}</SelectItem>
                            <SelectItem value="EUR">{t("settings.currencyDisplay.eur")}</SelectItem>
                            <SelectItem value="GBP">{t("settings.currencyDisplay.gbp")}</SelectItem>
                            <SelectItem value="JPY">{t("settings.currencyDisplay.jpy")}</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          {t("settings.currencyDisplay.displayCurrencyDescription")}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("settings.notificationPreferences.title")}</CardTitle>
                  <CardDescription>
                    {t("settings.notificationPreferences.description")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="notifications.trades"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">{t("settings.notificationPreferences.tradeNotifications")}</FormLabel>
                          <FormDescription>
                            {t("settings.notificationPreferences.tradeNotificationsDescription")}
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="switch-trade-notifications"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="notifications.deposits"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">{t("settings.notificationPreferences.fundingNotifications")}</FormLabel>
                          <FormDescription>
                            {t("settings.notificationPreferences.fundingNotificationsDescription")}
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="switch-funding-notifications"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="notifications.margin"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">{t("settings.notificationPreferences.marginAlerts")}</FormLabel>
                          <FormDescription>
                            {t("settings.notificationPreferences.marginAlertsDescription")}
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="switch-margin-alerts"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                disabled={updatePreferencesMutation.isPending}
                data-testid="button-reset"
              >
                {t("settings.buttons.reset")}
              </Button>
              <Button
                type="submit"
                disabled={updatePreferencesMutation.isPending}
                data-testid="button-save"
              >
                {updatePreferencesMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("settings.buttons.saving")}
                  </>
                ) : (
                  t("settings.buttons.saveChanges")
                )}
              </Button>
            </div>
          </form>
        </Form>
      </Tabs>
    </div>
  );
}
