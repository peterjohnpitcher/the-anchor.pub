/**
 * React Hook for Business Status with Smart Polling
 * 
 * Features:
 * - Pauses polling when tab is hidden (Page Visibility API)
 * - Respects Retry-After header on rate limiting
 * - Shows last known good data when API fails
 * - Uses API timestamp for "last updated" display
 */

import { useEffect } from 'react';
import type { APIResponse, StatusBarDisplay } from '@/lib/status-bar-utils';
import { getStatusBarDisplay } from '@/lib/status-bar-utils';
import { useBusinessHours } from './useBusinessHours';
import type { BusinessHours } from '@/lib/api';

interface UseBusinessStatusOptions {
  refreshInterval?: number;  // Default: 60000 (1 minute)
  pauseWhenHidden?: boolean; // Default: true
  showCountdown?: boolean;   // Default: true
  debug?: boolean;           // Default: false
}

interface UseBusinessStatusReturn {
  data: BusinessHours | null;
  status: StatusBarDisplay;
  lastUpdate: string | null;
  isStale: boolean;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useBusinessStatus(
  options: UseBusinessStatusOptions = {}
): UseBusinessStatusReturn {
  const {
    refreshInterval = 60 * 1000,
    pauseWhenHidden = true,
    showCountdown = true,
    debug = false
  } = options;

  const businessHours = useBusinessHours({
    apiEndpoint: '/api/business/hours',
    refreshInterval
  });

  const { hours, loading, error, isStale, refresh } = businessHours;

  useEffect(() => {
    if (!pauseWhenHidden) return;
    if (typeof document === 'undefined') return;

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        refresh();
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [pauseWhenHidden, refresh]);

  const status = getStatusBarDisplay(hours as unknown as APIResponse | null, {
    showCountdown,
    debug
  });

  const lastUpdate = hours?.currentStatus?.timestamp || hours?.lastUpdated || null;

  return {
    data: hours,
    status,
    lastUpdate,
    isStale,
    isLoading: loading,
    error,
    refetch: () => refresh()
  };
}

/**
 * Example usage in a component:
 * 
 * ```tsx
 * function StatusBar() {
 *   const { status, isStale, lastUpdate } = useBusinessStatus();
 *   
 *   return (
 *     <div aria-live="polite">
 *       <span className={status.stripColor}>{status.stripText}</span>
 *       {isStale && lastUpdate && (
 *         <span className="text-xs">
 *           Last updated: {formatRelativeTime(lastUpdate)}
 *         </span>
 *       )}
 *       {status.bookingEnabled && (
 *         <button>Book a Table</button>
 *       )}
 *     </div>
 *   );
 * }
 * ```
 */
