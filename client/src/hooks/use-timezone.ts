import { useQuery } from '@tanstack/react-query';
import { detectBrowserTimezone } from '@/lib/timezone-utils';

interface UserPreferences {
  timezone: string;
  autoDetectTimezone: boolean;
  displayCurrency: string;
  theme: string;
  defaultLotSize: string;
  layoutConfig: any;
  favorites: string[];
  notifications: any;
}

/**
 * Hook to get the effective timezone for the current user
 * Respects autoDetectTimezone setting and falls back to UTC
 */
export function useTimezone() {
  const { data: preferences, isLoading } = useQuery<UserPreferences>({
    queryKey: ['/api/preferences'],
  });

  // Determine effective timezone
  const effectiveTimezone = (() => {
    if (!preferences) return 'UTC';
    
    if (preferences.autoDetectTimezone) {
      return detectBrowserTimezone();
    }
    
    return preferences.timezone || 'UTC';
  })();

  return {
    timezone: effectiveTimezone,
    userPreferences: preferences,
    isLoading,
    isAutoDetect: preferences?.autoDetectTimezone ?? true,
  };
}
