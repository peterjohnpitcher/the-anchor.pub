'use client'

import { useEffect } from 'react'
import Script from 'next/script'

interface GTMProviderProps {
  gtmId: string
  children: React.ReactNode
}

export function GTMProvider({ gtmId, children }: GTMProviderProps) {
  useEffect(() => {
    if (!gtmId) return

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || []
    
    // Push initial GTM event
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    })

    // Log for debugging
    console.log('GTM Provider initialized with ID:', gtmId)
    console.log('DataLayer:', window.dataLayer)
  }, [gtmId])

  if (!gtmId) return <>{children}</>

  return (
    <>
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
      {children}
    </>
  )
}

// Separate noscript component for body
export function GTMNoscript({ gtmId }: { gtmId: string }) {
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