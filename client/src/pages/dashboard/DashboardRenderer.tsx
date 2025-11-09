/**
 * Dashboard Renderer
 * Composes dashboard widgets based on variant configuration
 */

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, TrendingUp, TrendingDown, Activity, Wallet, Link as LinkIcon } from "lucide-react";
import { formatCurrency } from "@/lib/currencyUtils";
import { useLanguage } from "@/hooks/useLanguage";
import { GreetingWidget } from "./widgets/GreetingWidget";
import { MetricTile } from "./widgets/MetricTile";
import { QuickActionCard } from "./widgets/QuickActionCard";
import { getDashboardConfig, DashboardSection } from "./configs/variantDashboardConfig";
import type { Client, Account } from "@shared/schema";

interface DashboardRendererProps {
  client?: Client;
  account?: Account;
  displayCurrency: string;
  isLoading: boolean;
  variantId: string;
}

export function DashboardRenderer({ client, account, displayCurrency, isLoading, variantId }: DashboardRendererProps) {
  const { t } = useLanguage();
  const config = getDashboardConfig(variantId);

  // Calculate metrics
  const marginLevel = account ? parseFloat(account.marginLevel || '0') : 0;
  const showMarginWarning = marginLevel > 0 && marginLevel < 150;
  const balance = account ? parseFloat(account.balance) : 0;
  const equity = account ? parseFloat(account.equity) : 0;
  const margin = account ? parseFloat(account.margin) : 0;
  const freeMargin = account ? parseFloat(account.freeMargin) : 0;
  const profitLoss = equity - balance;

  const cardVariant = config.modifiers?.cardVariant || 'default';
  const greetingVariant: 'default' | 'minimal' | 'hero' = 
    config.modifiers?.greetingVariant === 'hero' ? 'hero' :
    config.modifiers?.greetingVariant === 'minimal' ? 'minimal' : 'default';

  // Widget registry - maps widget IDs to actual components
  const widgetRegistry: Record<string, React.ReactNode> = {
    greeting: (
      <GreetingWidget
        client={client}
        isLoading={isLoading}
        t={t}
        variant={greetingVariant}
      />
    ),
    marginWarning: showMarginWarning ? (
      <Alert className="border-chart-4 bg-chart-4/10">
        <AlertTriangle className="h-4 w-4 text-chart-4" />
        <AlertDescription className="text-chart-4">
          {t('dashboard.margin.warning', { marginLevel: marginLevel.toFixed(2) })}
        </AlertDescription>
      </Alert>
    ) : null,
    balance: (
      <MetricTile
        title={t('dashboard.balance.title')}
        value={formatCurrency(balance, displayCurrency)}
        subtitle={t('dashboard.balance.account', { accountNumber: account?.accountNumber || 'N/A' })}
        icon={Wallet}
        isLoading={isLoading}
        variant={cardVariant}
        testId="text-balance"
      />
    ),
    equity: (
      <MetricTile
        title={t('dashboard.equity.title')}
        value={formatCurrency(equity, displayCurrency)}
        subtitle={
          <span className={`flex items-center gap-1 ${profitLoss >= 0 ? 'text-chart-1' : 'text-chart-2'}`}>
            {profitLoss >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {profitLoss >= 0 ? '+' : ''}{formatCurrency(Math.abs(profitLoss), displayCurrency)}
          </span>
        }
        icon={Activity}
        isLoading={isLoading}
        variant={cardVariant}
        testId="text-equity"
      />
    ),
    margin: (
      <MetricTile
        title={t('dashboard.margin.used')}
        value={formatCurrency(margin, displayCurrency)}
        subtitle={t('dashboard.margin.level', { marginLevel: marginLevel > 0 ? marginLevel.toFixed(2) : 'N/A' })}
        icon={AlertTriangle}
        isLoading={isLoading}
        variant={cardVariant}
        testId="text-margin"
        className={showMarginWarning ? 'border-chart-4' : ''}
      />
    ),
    freeMargin: (
      <MetricTile
        title={t('dashboard.freeMargin.title')}
        value={formatCurrency(freeMargin, displayCurrency)}
        subtitle={t('dashboard.freeMargin.available')}
        icon={TrendingUp}
        isLoading={isLoading}
        variant={cardVariant}
        testId="text-free-margin"
      />
    ),
    startTrading: (
      <QuickActionCard
        title={t('dashboard.quickActions.startTrading.title')}
        description={t('dashboard.quickActions.startTrading.description')}
        buttonLabel={t('dashboard.quickActions.startTrading.button')}
        href="/trading"
        icon={LinkIcon}
        variant="default"
        testId="button-start-trading"
      />
    ),
    deposit: (
      <QuickActionCard
        title={t('dashboard.quickActions.fundAccount.title')}
        description={t('dashboard.quickActions.fundAccount.description')}
        buttonLabel={t('dashboard.quickActions.fundAccount.button')}
        href="/deposits"
        icon={Wallet}
        variant="outline"
        testId="button-deposit"
      />
    ),
    withdraw: (
      <QuickActionCard
        title={t('dashboard.quickActions.withdrawals.title')}
        description={t('dashboard.quickActions.withdrawals.description')}
        buttonLabel={t('dashboard.quickActions.withdrawals.button')}
        href="/withdrawals"
        icon={TrendingDown}
        variant="outline"
        testId="button-withdraw"
      />
    ),
    recentActivity: (
      <Card>
        <CardHeader>
          <CardTitle>{t('dashboard.recentActivity.title')}</CardTitle>
          <CardDescription>{t('dashboard.recentActivity.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
            <p className="text-sm text-muted-foreground">{t('dashboard.recentActivity.noActivity')}</p>
          </div>
        </CardContent>
      </Card>
    ),
  };

  // Render a section based on layout type
  const renderSection = (section: DashboardSection) => {
    const hiddenWidgets = config.hiddenWidgets || [];
    const widgets = section.widgets
      .filter(w => !hiddenWidgets.includes(w))
      .map(w => widgetRegistry[w])
      .filter(Boolean);

    if (widgets.length === 0) return null;

    const gapClasses = {
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
    };

    const gap = gapClasses[section.gap || 'md'];

    if (section.layout === 'grid') {
      const cols = section.columns || 1;
      const gridClasses: Record<number, string> = {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
      };
      return (
        <div key={section.id} className={`grid ${gridClasses[cols] || gridClasses[1]} ${gap} ${section.className || ''}`}>
          {widgets}
        </div>
      );
    }

    // Stack layout (default)
    return (
      <div key={section.id} className={`flex flex-col ${gap} ${section.className || ''}`}>
        {widgets}
      </div>
    );
  };

  // Container layout classes
  const maxWidthClasses: Record<string, string> = {
    '1200px': 'max-w-7xl',
    '1400px': 'max-w-[1400px]',
    '1600px': 'max-w-[1600px]',
    'full': 'max-w-full',
  };

  const alignClasses: Record<string, string> = {
    left: 'mr-auto',
    center: 'mx-auto',
    right: 'ml-auto',
  };

  const containerMaxWidth = maxWidthClasses[config.layout.maxWidth || '1400px'] || maxWidthClasses['1400px'];
  const containerAlign = alignClasses[config.layout.align || 'left'] || alignClasses['left'];
  const containerGap = config.layout.gap === 'sm' ? 'gap-4' : config.layout.gap === 'lg' ? 'gap-8' : 'gap-6';

  return (
    <div className={`flex h-full flex-col ${containerGap} p-6 w-full ${containerMaxWidth} ${containerAlign}`}>
      {/* Margin Warning (shown globally if needed) */}
      {showMarginWarning && !config.sections.some(s => s.widgets.includes('marginWarning')) && widgetRegistry.marginWarning}
      
      {/* Render all sections */}
      {config.sections.map(section => renderSection(section))}
    </div>
  );
}
