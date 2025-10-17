import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle, TrendingUp, TrendingDown, Activity, Wallet, Link as LinkIcon } from "lucide-react";
import { Link } from "wouter";
import { formatCurrency } from "@/lib/currencyUtils";
import { useLanguage } from "@/hooks/useLanguage";
import type { Client, Account } from "@shared/schema";

export default function DashboardPage() {
  const { t } = useLanguage();
  const { data: client, isLoading: clientLoading } = useQuery<Client>({
    queryKey: ["/api/auth/me"],
  });

  const { data: account, isLoading: accountLoading } = useQuery<Account>({
    queryKey: ["/api/account"],
  });

  const { data: preferences } = useQuery<{ displayCurrency?: string }>({
    queryKey: ["/api/preferences"],
  });

  const displayCurrency = preferences?.displayCurrency || 'USD';
  const isLoading = clientLoading || accountLoading;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t('dashboard.greeting.morning');
    if (hour < 18) return t('dashboard.greeting.afternoon');
    return t('dashboard.greeting.evening');
  };

  const marginLevel = account ? parseFloat(account.marginLevel || '0') : 0;
  const showMarginWarning = marginLevel > 0 && marginLevel < 150;
  const balance = account ? parseFloat(account.balance) : 0;
  const equity = account ? parseFloat(account.equity) : 0;
  const margin = account ? parseFloat(account.margin) : 0;
  const freeMargin = account ? parseFloat(account.freeMargin) : 0;
  const profitLoss = equity - balance;

  return (
    <div className="flex h-full flex-col gap-6 p-6">
      {/* Welcome Section */}
      <div>
        {isLoading ? (
          <>
            <Skeleton className="h-9 w-64 mb-2" />
            <Skeleton className="h-5 w-96" />
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold" data-testid="text-greeting">
              {getGreeting()}, {client?.firstName}
            </h1>
            <p className="text-muted-foreground mt-1">
              {t('dashboard.welcome')}
            </p>
          </>
        )}
      </div>

      {/* Margin Warning */}
      {showMarginWarning && (
        <Alert className="border-chart-4 bg-chart-4/10">
          <AlertTriangle className="h-4 w-4 text-chart-4" />
          <AlertDescription className="text-chart-4">
            {t('dashboard.margin.warning', { marginLevel: marginLevel.toFixed(2) })}
          </AlertDescription>
        </Alert>
      )}

      {/* Account Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Balance Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('dashboard.balance.title')}</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-32" />
            ) : (
              <>
                <div className="text-2xl font-bold" data-testid="text-balance">
                  {formatCurrency(balance, displayCurrency)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {t('dashboard.balance.account', { accountNumber: account?.accountNumber || 'N/A' })}
                </p>
              </>
            )}
          </CardContent>
        </Card>

        {/* Equity Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('dashboard.equity.title')}</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-32" />
            ) : (
              <>
                <div className="text-2xl font-bold" data-testid="text-equity">
                  {formatCurrency(equity, displayCurrency)}
                </div>
                <p className={`text-xs mt-1 flex items-center gap-1 ${profitLoss >= 0 ? 'text-chart-1' : 'text-chart-2'}`}>
                  {profitLoss >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {profitLoss >= 0 ? '+' : ''}{formatCurrency(Math.abs(profitLoss), displayCurrency)}
                </p>
              </>
            )}
          </CardContent>
        </Card>

        {/* Margin Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('dashboard.margin.used')}</CardTitle>
            <AlertTriangle className={`h-4 w-4 ${showMarginWarning ? 'text-chart-4' : 'text-muted-foreground'}`} />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-32" />
            ) : (
              <>
                <div className="text-2xl font-bold" data-testid="text-margin">
                  {formatCurrency(margin, displayCurrency)}
                </div>
                <p className={`text-xs mt-1 ${showMarginWarning ? 'text-chart-4 font-medium' : 'text-muted-foreground'}`}>
                  {t('dashboard.margin.level', { marginLevel: marginLevel > 0 ? marginLevel.toFixed(2) : 'N/A' })}
                </p>
              </>
            )}
          </CardContent>
        </Card>

        {/* Free Margin Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('dashboard.freeMargin.title')}</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-32" />
            ) : (
              <>
                <div className="text-2xl font-bold" data-testid="text-free-margin">
                  {formatCurrency(freeMargin, displayCurrency)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {t('dashboard.freeMargin.available')}
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover-elevate transition-all">
          <CardHeader>
            <CardTitle className="text-lg">{t('dashboard.quickActions.startTrading.title')}</CardTitle>
            <CardDescription>
              {t('dashboard.quickActions.startTrading.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/trading">
              <Button className="w-full" data-testid="button-start-trading">
                <LinkIcon className="mr-2 h-4 w-4" />
                {t('dashboard.quickActions.startTrading.button')}
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover-elevate transition-all">
          <CardHeader>
            <CardTitle className="text-lg">{t('dashboard.quickActions.fundAccount.title')}</CardTitle>
            <CardDescription>
              {t('dashboard.quickActions.fundAccount.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/deposits">
              <Button variant="outline" className="w-full" data-testid="button-deposit">
                <Wallet className="mr-2 h-4 w-4" />
                {t('dashboard.quickActions.fundAccount.button')}
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover-elevate transition-all">
          <CardHeader>
            <CardTitle className="text-lg">{t('dashboard.quickActions.withdrawals.title')}</CardTitle>
            <CardDescription>
              {t('dashboard.quickActions.withdrawals.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/withdrawals">
              <Button variant="outline" className="w-full" data-testid="button-withdraw">
                <TrendingDown className="mr-2 h-4 w-4" />
                {t('dashboard.quickActions.withdrawals.button')}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>{t('dashboard.recentActivity.title')}</CardTitle>
          <CardDescription>
            {t('dashboard.recentActivity.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
            <p className="text-sm text-muted-foreground">{t('dashboard.recentActivity.noActivity')}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
