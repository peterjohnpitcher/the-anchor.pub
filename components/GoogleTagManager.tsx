'use client'

import { useEffect } from 'react'
import Script from 'next/script'

interface GoogleTagManagerProps {
  gtmId: string
}

export function GoogleTagManager({ gtmId }: GoogleTagManagerProps) {
  useEffect(() => {
    // Push initial dataLayer values
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    })
  }, [])

  if (!gtmId) return null

  return (
    <>
      {/* Google Tag Manager Script */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `,
        }}
      />
    </>
  )
}

// GTM noscript component for body
export function GoogleTagManagerNoscript({ gtmId }: GoogleTagManagerProps) {
  if (!gtmId) return null

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  )
}

// Type definitions for dataLayer
declare global {
  interface Window {
    dataLayer: any[]
  }
}