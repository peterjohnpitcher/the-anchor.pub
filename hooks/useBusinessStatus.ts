/**
 * React Hook for Business Status with Smart Polling
 * 
 * Features:
 * - Pauses polling when tab is hidden (Page Visibility API)
 * - Respects Retry-After header on rate limiting
 * - Shows last known good data when API fails
 * - Uses API timestamp for "last updated" display
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import type { APIResponse, StatusBarDisplay } from '@/lib/status-bar-utils';
import { getStatusBarDisplay } from '@/lib/status-bar-utils';

interface UseBusinessStatusOptions {
  refreshInterval?: number;  // Default: 60000 (1 minute)
  pauseWhenHidden?: boolean; // Default: true
  showCountdown?: boolean;   // Default: true
  debug?: boolean;           // Default: false
}

interface UseBusinessStatusReturn {
  data: APIResponse | null;
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
    refreshInterval = 60000,  // 60 seconds
    pauseWhenHidden = true,
    showCountdown = true,
    debug = false
  } = options;

  const [data, setData] = useState<APIResponse | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [retryAfter, setRetryAfter] = useState<number>(0);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isDocumentVisible = useRef(true);

  const fetchStatus = useCallback(async () => {
    // Skip if we're still in rate limit period
    if (retryAfter > Date.now()) {
      return;
    }

    try {
      const response = await fetch('/api/business/hours');
      
      // Handle rate limiting
      if (response.status === 429) {
        const retryAfterHeader = response.headers.get('Retry-After');
        if (retryAfterHeader) {
          const retrySeconds = parseInt(retryAfterHeader, 10);
          setRetryAfter(Date.now() + (retrySeconds * 1000));
        } else {
          // Default backoff if no Retry-After header
          setRetryAfter(Date.now() + 60000);
        }
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      // API returns bare object, not wrapped in { success, data }
      const result = await response.json();
      
      setData(result);
      // Use the API's timestamp, not client time
      setLastUpdate(result.currentStatus?.timestamp || new Date().toISOString());
      setError(null);
      setRetryAfter(0);
    } catch (err) {
      console.error('Failed to fetch business status:', err);
      setError(err instanceof Error ? err : new Error('Unknown error'));
      // Keep showing last successful data
    } finally {
      setIsLoading(false);
    }
  }, [retryAfter]);

  // Set up polling
  useEffect(() => {
    // Initial fetch
    fetchStatus();

    // Set up interval
    const startPolling = () => {
      // Clear any existing interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(() => {
        // Only fetch if document is visible (or pauseWhenHidden is false)
        if (!pauseWhenHidden || isDocumentVisible.current) {
          fetchStatus();
        }
      }, refreshInterval);
    };

    startPolling();

    // Clean up on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [fetchStatus, refreshInterval, pauseWhenHidden]);

  // Page Visibility API
  useEffect(() => {
    if (!pauseWhenHidden) return;

    const handleVisibilityChange = () => {
      isDocumentVisible.current = !document.hidden;
      
      // When tab becomes visible again, fetch immediately
      if (isDocumentVisible.current && data) {
        // Check if data is stale (older than 2 minutes)
        const lastUpdateTime = lastUpdate ? new Date(lastUpdate).getTime() : 0;
        const isStale = Date.now() - lastUpdateTime > 120000;
        
        if (isStale) {
          fetchStatus();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Also listen for focus events as a fallback
    const handleFocus = () => {
      isDocumentVisible.current = true;
      
      // Check staleness and refetch if needed
      const lastUpdateTime = lastUpdate ? new Date(lastUpdate).getTime() : 0;
      const isStale = Date.now() - lastUpdateTime > 120000;
      
      if (isStale) {
        fetchStatus();
      }
    };
    
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [pauseWhenHidden, data, lastUpdate, fetchStatus]);

  // Calculate derived values
  const status = getStatusBarDisplay(data, { showCountdown, debug });
  
  // Check if data is stale (older than 2 minutes)
  const isStale = lastUpdate 
    ? Date.now() - new Date(lastUpdate).getTime() > 120000 
    : false;

  return {
    data,
    status,
    lastUpdate,
    isStale,
    isLoading,
    error,
    refetch: fetchStatus
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