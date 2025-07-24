// Cookie consent management utilities
import { getCookie, setCookie, deleteCookie } from 'cookies-next';

export type CookieCategory = 'necessary' | 'analytics' | 'marketing' | 'preferences';

export interface CookieConsent {
  necessary: boolean; // Always true
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
  timestamp: string;
}

const CONSENT_COOKIE_NAME = 'anchor-cookie-consent';
const CONSENT_DURATION_DAYS = 365;

// Default consent state - only necessary cookies
const DEFAULT_CONSENT: CookieConsent = {
  necessary: true,
  analytics: false,
  marketing: false,
  preferences: false,
  timestamp: new Date().toISOString()
};

export function getConsentStatus(): CookieConsent | null {
  try {
    const consent = getCookie(CONSENT_COOKIE_NAME);
    if (!consent) return null;
    
    const parsed = JSON.parse(consent as string);
    // Ensure necessary is always true
    parsed.necessary = true;
    return parsed;
  } catch (error) {
    console.error('Error parsing consent cookie:', error);
    return null;
  }
}

export function setConsentStatus(consent: Partial<CookieConsent>) {
  const currentConsent = getConsentStatus() || DEFAULT_CONSENT;
  const newConsent: CookieConsent = {
    ...currentConsent,
    ...consent,
    necessary: true, // Always true
    timestamp: new Date().toISOString()
  };

  setCookie(CONSENT_COOKIE_NAME, JSON.stringify(newConsent), {
    maxAge: 60 * 60 * 24 * CONSENT_DURATION_DAYS,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
  });

  // Update Google Tag Manager consent state
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', {
      'analytics_storage': newConsent.analytics ? 'granted' : 'denied',
      'ad_storage': newConsent.marketing ? 'granted' : 'denied',
      'personalization_storage': newConsent.preferences ? 'granted' : 'denied'
    });
  }

  // Trigger custom event for other components to react
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cookieConsentUpdate', { detail: newConsent }));
  }
}

export function acceptAllCookies() {
  setConsentStatus({
    analytics: true,
    marketing: true,
    preferences: true
  });
}

export function rejectAllCookies() {
  setConsentStatus({
    analytics: false,
    marketing: false,
    preferences: false
  });
  
  // Clean up existing non-necessary cookies
  cleanupCookies();
}

export function hasUserConsented(): boolean {
  return getConsentStatus() !== null;
}

export function canUseCookieCategory(category: CookieCategory): boolean {
  const consent = getConsentStatus();
  if (!consent) return category === 'necessary';
  return consent[category] === true;
}

// Helper to clean up cookies when consent is revoked
function cleanupCookies() {
  // List of known analytics/marketing cookies to remove
  const cookiesToRemove = [
    '_ga', '_gid', '_gat', '_gac_', // Google Analytics
    '_fbp', 'fr', // Facebook
    '_gcl_au', '_gcl_aw', // Google Ads
    'IDE', 'test_cookie', // DoubleClick
    '_twitter_sess', 'personalization_id' // Twitter
  ];

  cookiesToRemove.forEach(cookieName => {
    // Try to delete with different path/domain combinations
    deleteCookie(cookieName);
    deleteCookie(cookieName, { path: '/' });
    deleteCookie(cookieName, { domain: '.the-anchor.pub' });
    deleteCookie(cookieName, { domain: 'the-anchor.pub' });
  });
}

// Initialize Google consent mode with default state
export function initializeConsentMode() {
  if (typeof window === 'undefined' || !window.gtag) return;

  const consent = getConsentStatus();
  
  // Set default consent state
  window.gtag('consent', 'default', {
    'analytics_storage': consent?.analytics ? 'granted' : 'denied',
    'ad_storage': consent?.marketing ? 'granted' : 'denied',
    'personalization_storage': consent?.preferences ? 'granted' : 'denied',
    'functionality_storage': 'granted', // Necessary cookies
    'security_storage': 'granted', // Necessary cookies
    'wait_for_update': 500 // Wait 500ms for consent update
  });
}