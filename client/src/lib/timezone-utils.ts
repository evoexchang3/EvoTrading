import { formatInTimeZone, toZonedTime } from 'date-fns-tz';
import { format } from 'date-fns';

/**
 * Timezone utility functions for converting chart timestamps
 */

/**
 * Detects the user's browser timezone using the Intl API
 * @returns IANA timezone string (e.g., "America/New_York")
 */
export function detectBrowserTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch (error) {
    console.warn('Failed to detect browser timezone:', error);
    return 'UTC';
  }
}

/**
 * Converts a UTC timestamp for display in a specific timezone
 * Uses differential offset calculation: shift by (target offset - browser offset)
 * 
 * @param utcTimestamp - Unix timestamp in seconds (UTC from backend)
 * @param targetTimezone - IANA timezone string (e.g., "America/New_York")
 * @returns Adjusted timestamp for chart display
 */
export function convertUTCToTimezone(
  utcTimestamp: number,
  targetTimezone: string
): number {
  try {
    const utcMs = utcTimestamp * 1000;
    const utcDate = new Date(utcMs);
    
    // Get UTC offset for target timezone (in minutes)
    const targetDateStr = formatInTimeZone(utcDate, targetTimezone, "yyyy-MM-dd'T'HH:mm:ssXXX");
    const targetDate = new Date(targetDateStr);
    const targetOffsetMs = utcDate.getTime() - targetDate.getTime();
    
    // Get UTC offset for browser timezone (in minutes)  
    const browserOffsetMs = utcDate.getTimezoneOffset() * 60 * 1000;
    
    // Calculate differential offset
    const offsetDiffMs = targetOffsetMs - browserOffsetMs;
    
    // Apply differential offset to UTC timestamp
    const shiftedMs = utcMs + offsetDiffMs;
    
    return Math.floor(shiftedMs / 1000);
  } catch (error) {
    console.warn(`Failed to convert timestamp to ${targetTimezone}:`, error);
    return utcTimestamp;
  }
}

/**
 * Converts an array of UTC timestamps to a specific timezone
 * @param utcTimestamps - Array of Unix timestamps in seconds
 * @param targetTimezone - IANA timezone string
 * @returns Array of adjusted timestamps
 */
export function convertTimestampsToTimezone(
  utcTimestamps: number[],
  targetTimezone: string
): number[] {
  if (targetTimezone === 'UTC') {
    return utcTimestamps;
  }
  
  return utcTimestamps.map(ts => convertUTCToTimezone(ts, targetTimezone));
}

/**
 * Formats a timestamp in the target timezone
 * @param utcTimestamp - Unix timestamp in seconds
 * @param targetTimezone - IANA timezone string
 * @param formatString - date-fns format string (default: 'yyyy-MM-dd HH:mm:ss')
 * @returns Formatted date string
 */
export function formatTimestampInTimezone(
  utcTimestamp: number,
  targetTimezone: string,
  formatString: string = 'yyyy-MM-dd HH:mm:ss'
): string {
  try {
    const utcDate = new Date(utcTimestamp * 1000);
    return formatInTimeZone(utcDate, targetTimezone, formatString);
  } catch (error) {
    console.warn(`Failed to format timestamp in ${targetTimezone}:`, error);
    return format(new Date(utcTimestamp * 1000), formatString);
  }
}

/**
 * Gets the timezone abbreviation (e.g., "EST", "PST") for display
 * @param timezone - IANA timezone string
 * @returns Timezone abbreviation or offset
 */
export function getTimezoneAbbreviation(timezone: string): string {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      timeZoneName: 'short'
    });
    
    const parts = formatter.formatToParts(now);
    const tzPart = parts.find(part => part.type === 'timeZoneName');
    
    return tzPart?.value || timezone;
  } catch (error) {
    console.warn(`Failed to get timezone abbreviation for ${timezone}:`, error);
    return timezone;
  }
}

/**
 * Converts chart data timestamps from UTC to user timezone
 * @param chartData - Array of chart data points with time property
 * @param targetTimezone - IANA timezone string
 * @returns Chart data with adjusted timestamps
 */
export function convertChartDataToTimezone<T extends { time: number }>(
  chartData: T[],
  targetTimezone: string
): T[] {
  if (targetTimezone === 'UTC' || !chartData.length) {
    return chartData;
  }
  
  return chartData.map(dataPoint => ({
    ...dataPoint,
    time: convertUTCToTimezone(dataPoint.time, targetTimezone)
  }));
}

/**
 * Checks if a timezone string is valid
 * @param timezone - IANA timezone string to validate
 * @returns true if valid, false otherwise
 */
export function isValidTimezone(timezone: string): boolean {
  try {
    Intl.DateTimeFormat(undefined, { timeZone: timezone });
    return true;
  } catch (error) {
    return false;
  }
}
