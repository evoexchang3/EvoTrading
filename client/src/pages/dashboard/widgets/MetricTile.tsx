import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/currencyUtils";
import { LucideIcon } from "lucide-react";

interface MetricTileProps {
  title: string;
  value: string | number;
  subtitle?: React.ReactNode;
  icon?: LucideIcon;
  isLoading?: boolean;
  variant?: 'default' | 'minimal' | 'dense';
  className?: string;
  testId?: string;
}

export function MetricTile({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  isLoading,
  variant = 'default',
  className = '',
  testId
}: MetricTileProps) {
  
  if (variant === 'minimal') {
    return (
      <Card className={`border-none shadow-none bg-card/50 ${className}`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-normal text-muted-foreground tracking-wider uppercase">
              {title}
            </CardTitle>
            {Icon && <Icon className="h-5 w-5 text-muted-foreground/50" />}
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-16 w-48" />
          ) : (
            <>
              <div className="text-5xl font-light tracking-tight" data-testid={testId}>
                {value}
              </div>
              {subtitle && (
                <p className="text-sm text-muted-foreground mt-3 font-light">
                  {subtitle}
                </p>
              )}
            </>
          )}
        </CardContent>
      </Card>
    );
  }

  if (variant === 'dense') {
    return (
      <Card className={className}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs font-semibold uppercase tracking-wide">{title}</CardTitle>
          {Icon && <Icon className="h-3 w-3 text-muted-foreground" />}
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-6 w-24" />
          ) : (
            <>
              <div className="text-xl font-bold" data-testid={testId}>
                {value}
              </div>
              {subtitle && (
                <p className="text-xs text-muted-foreground mt-1">
                  {subtitle}
                </p>
              )}
            </>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-8 w-32" />
        ) : (
          <>
            <div className="text-2xl font-bold" data-testid={testId}>
              {value}
            </div>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-1">
                {subtitle}
              </p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
