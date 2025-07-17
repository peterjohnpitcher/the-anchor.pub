// Google Tag Manager Event Tracking Utilities
// Centralised event tracking for The Anchor website

interface GTMEvent {
  event: string
  [key: string]: any
}

// Push event to dataLayer
export function pushToDataLayer(data: GTMEvent) {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push(data)
  }
}

// Page view tracking (for dynamic routes)
export function trackPageView(url: string, title: string) {
  pushToDataLayer({
    event: 'page_view',
    page_path: url,
    page_title: title,
    page_location: window.location.href
  })
}

// Event booking funnel
export function trackEventView(eventData: {
  eventId: string
  eventName: string
  eventDate: string
  eventCategory?: string
  eventPrice?: number
}) {
  pushToDataLayer({
    event: 'view_event',
    event_category: 'Event Engagement',
    event_label: eventData.eventName,
    event_id: eventData.eventId,
    event_date: eventData.eventDate,
    event_type: eventData.eventCategory,
    value: eventData.eventPrice
  })
}

export function trackEventBookingStart(eventData: {
  eventId: string
  eventName: string
  eventPrice?: number
}) {
  pushToDataLayer({
    event: 'begin_checkout',
    event_category: 'Event Booking',
    event_label: eventData.eventName,
    event_id: eventData.eventId,
    value: eventData.eventPrice,
    currency: 'GBP'
  })
}

export function trackEventBookingComplete(eventData: {
  eventId: string
  eventName: string
  seats: number
  totalValue?: number
}) {
  pushToDataLayer({
    event: 'purchase',
    event_category: 'Event Booking',
    event_label: eventData.eventName,
    event_id: eventData.eventId,
    quantity: eventData.seats,
    value: eventData.totalValue,
    currency: 'GBP'
  })
}

// Restaurant actions
export function trackTableBookingClick(source: string) {
  pushToDataLayer({
    event: 'table_booking_click',
    event_category: 'Restaurant',
    event_label: source,
    booking_method: 'external_ordertab'
  })
}

export function trackMenuView(menuType: 'food' | 'drinks' | 'sunday') {
  pushToDataLayer({
    event: 'view_menu',
    event_category: 'Restaurant',
    event_label: menuType,
    menu_type: menuType
  })
}

export function trackPhoneCall(context: string) {
  pushToDataLayer({
    event: 'phone_call',
    event_category: 'Contact',
    event_label: context,
    contact_method: 'phone'
  })
}

export function trackWhatsAppClick(context: string) {
  pushToDataLayer({
    event: 'whatsapp_click',
    event_category: 'Contact',
    event_label: context,
    contact_method: 'whatsapp'
  })
}

// Location/directions tracking
export function trackDirectionsClick(fromLocation: string) {
  pushToDataLayer({
    event: 'get_directions',
    event_category: 'Navigation',
    event_label: fromLocation,
    transport_method: 'driving'
  })
}

// Social proof tracking
export function trackReviewClick(platform: string) {
  pushToDataLayer({
    event: 'review_interaction',
    event_category: 'Social Proof',
    event_label: platform
  })
}

// Enhanced Ecommerce for future online ordering
export function trackAddToCart(item: {
  itemId: string
  itemName: string
  itemCategory: string
  price: number
  quantity: number
}) {
  pushToDataLayer({
    event: 'add_to_cart',
    ecommerce: {
      currency: 'GBP',
      value: item.price * item.quantity,
      items: [{
        item_id: item.itemId,
        item_name: item.itemName,
        item_category: item.itemCategory,
        price: item.price,
        quantity: item.quantity
      }]
    }
  })
}

// Custom events for business insights
export function trackOpeningHoursCheck() {
  pushToDataLayer({
    event: 'check_opening_hours',
    event_category: 'User Behaviour',
    event_label: 'Status Bar'
  })
}

export function trackWeatherView() {
  pushToDataLayer({
    event: 'weather_check',
    event_category: 'User Behaviour',
    event_label: 'Weather Widget'
  })
}

export function trackFlightStatusCheck(terminal: string) {
  pushToDataLayer({
    event: 'flight_status_check',
    event_category: 'Travel Features',
    event_label: terminal,
    terminal: terminal
  })
}

// Error tracking
export function trackError(errorType: string, errorMessage: string, context?: string) {
  pushToDataLayer({
    event: 'error',
    event_category: 'Site Errors',
    event_label: errorType,
    error_message: errorMessage,
    error_context: context
  })
}

// Form interactions
export function trackFormStart(formName: string) {
  pushToDataLayer({
    event: 'form_start',
    event_category: 'Form Interaction',
    event_label: formName
  })
}

export function trackFormComplete(formName: string) {
  pushToDataLayer({
    event: 'form_complete',
    event_category: 'Form Interaction',
    event_label: formName
  })
}

export function trackFormAbandon(formName: string, lastField?: string) {
  pushToDataLayer({
    event: 'form_abandon',
    event_category: 'Form Interaction',
    event_label: formName,
    last_field: lastField
  })
}