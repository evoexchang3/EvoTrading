import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowLeft } from "lucide-react";
import { LandingLayout } from "@/components/LandingLayout";
import { useLanguage } from "@/hooks/useLanguage";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotPasswordRequest = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const { t } = useLanguage();
  const { toast } = useToast();

  const form = useForm<ForgotPasswordRequest>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: async (data: ForgotPasswordRequest) => {
      return await apiRequest("POST", "/api/auth/forgot-password", data);
    },
    onSuccess: () => {
      toast({
        title: t('auth.forgotPassword.success.title'),
        description: t('auth.forgotPassword.success.description'),
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: t('auth.forgotPassword.error.title'),
        description: error.message || t('auth.forgotPassword.error.description'),
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ForgotPasswordRequest) => {
    forgotPasswordMutation.mutate(data);
  };

  return (
    <LandingLayout>
      <div className="flex min-h-[calc(100vh-16rem)] items-center justify-center p-4">
        <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold">
            {t('auth.forgotPassword.title')}
          </CardTitle>
          <CardDescription>
            {t('auth.forgotPassword.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('auth.forgotPassword.email')}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        data-testid="input-email"
                        placeholder={t('auth.forgotPassword.emailPlaceholder')}
                        disabled={forgotPasswordMutation.isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={forgotPasswordMutation.isPending}
                data-testid="button-reset-password"
              >
                {forgotPasswordMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('auth.forgotPassword.sending')}
                  </>
                ) : (
                  t('auth.forgotPassword.submitButton')
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/login">
            <span className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary cursor-pointer" data-testid="link-back-to-login">
              <ArrowLeft className="h-4 w-4" />
              {t('auth.forgotPassword.backToLogin')}
            </span>
          </Link>
        </CardFooter>
      </Card>
      </div>
    </LandingLayout>
  );
}
