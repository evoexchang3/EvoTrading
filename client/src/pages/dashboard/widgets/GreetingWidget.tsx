import { Skeleton } from "@/components/ui/skeleton";
import type { Client } from "@shared/schema";

interface GreetingWidgetProps {
  client?: Client;
  isLoading: boolean;
  t: (key: string, params?: Record<string, any>) => string;
  variant?: 'default' | 'minimal' | 'hero';
}

export function GreetingWidget({ client, isLoading, t, variant = 'default' }: GreetingWidgetProps) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t('dashboard.greeting.morning');
    if (hour < 18) return t('dashboard.greeting.afternoon');
    return t('dashboard.greeting.evening');
  };

  if (variant === 'hero') {
    return (
      <div className="text-center space-y-2">
        {isLoading ? (
          <>
            <Skeleton className="h-12 w-96 mx-auto mb-3" />
            <Skeleton className="h-6 w-64 mx-auto" />
          </>
        ) : (
          <>
            <h1 className="text-5xl font-light tracking-tight" data-testid="text-greeting">
              {getGreeting()}, {client?.firstName}
            </h1>
            <p className="text-xl text-muted-foreground font-light">
              {t('dashboard.welcome')}
            </p>
          </>
        )}
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className="space-y-1">
        {isLoading ? (
          <Skeleton className="h-7 w-48" />
        ) : (
          <h2 className="text-2xl font-normal" data-testid="text-greeting">
            {getGreeting()}, {client?.firstName}
          </h2>
        )}
      </div>
    );
  }

  return (
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
  );
}
