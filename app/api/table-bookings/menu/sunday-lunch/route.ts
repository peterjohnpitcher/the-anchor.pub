import { NextResponse } from 'next/server'
import { createApiErrorResponse, logError } from '@/lib/error-handling'

const API_KEY = process.env.ANCHOR_API_KEY
const API_BASE_URL = 'https://management.orangejelly.co.uk/api'

// Cache Sunday lunch menu for 1 hour since it doesn't change frequently
let menuCache: { data: any; timestamp: number } | null = null
const CACHE_DURATION = 60 * 60 * 1000 // 1 hour in milliseconds

export async function GET(request: Request) {
  if (!API_KEY) {
    console.error('ANCHOR_API_KEY is not set in environment variables')
    return createApiErrorResponse('Service temporarily unavailable. Please try again later.', 503)
  }

  try {
    // Check cache first
    if (menuCache && Date.now() - menuCache.timestamp < CACHE_DURATION) {
      console.log('Returning cached Sunday lunch menu')
      return NextResponse.json(menuCache.data)
    }

    const response = await fetch(
      `${API_BASE_URL}/table-bookings/menu/sunday-lunch`,
      {
        headers: {
          'X-API-Key': API_KEY
        }
      }
    )

    if (!response.ok) {
      console.error(`Sunday lunch menu API error: ${response.status} ${response.statusText}`)
      
      if (response.status === 401) {
        console.error('Authentication failed - API key may be invalid or lack permissions')
        return createApiErrorResponse('Service temporarily unavailable. Please try again later.', 503)
      }
      
      if (response.status === 404) {
        // Return default/fallback menu structure matching simplified API format
        const fallbackMenu = {
          menu_date: new Date().toISOString().split('T')[0],
          mains: [
            {
              id: "main-uuid-1",
              name: "Roast Beef",
              description: "Traditional roast beef served with all the trimmings",
              price: 13.99,
              dietary_info: [],
              allergens: [],
              is_available: true
            },
            {
              id: "main-uuid-2",
              name: "Roast Chicken",
              description: "Free-range chicken with sage and onion stuffing",
              price: 12.99,
              dietary_info: [],
              allergens: ["gluten"],
              is_available: true
            },
            {
              id: "main-uuid-3",
              name: "Roast Pork",
              description: "Slow roasted pork with crackling and apple sauce",
              price: 13.99,
              dietary_info: [],
              allergens: [],
              is_available: true
            },
            {
              id: "main-uuid-4",
              name: "Vegetarian Wellington",
              description: "Seasonal vegetables wrapped in golden puff pastry",
              price: 11.99,
              dietary_info: ["vegetarian"],
              allergens: ["gluten"],
              is_available: true
            }
          ],
          sides: [
            {
              id: "side-uuid-1",
              name: "Herb & Garlic Roast Potatoes",
              description: "Crispy roasted potatoes with herbs",
              price: 0,
              dietary_info: ["vegan", "gluten_free"],
              allergens: [],
              included: true,
              is_available: true
            },
            {
              id: "side-uuid-2",
              name: "Seasonal Vegetables",
              description: "Fresh seasonal vegetables",
              price: 0,
              dietary_info: ["vegan", "gluten_free"],
              allergens: [],
              included: true,
              is_available: true
            },
            {
              id: "side-uuid-3",
              name: "Yorkshire Pudding",
              description: "Traditional Yorkshire pudding",
              price: 0,
              dietary_info: ["vegetarian"],
              allergens: ["gluten", "eggs", "milk"],
              included: true,
              is_available: true
            },
            {
              id: "side-uuid-4",
              name: "Gravy",
              description: "Rich meat gravy (vegetarian available)",
              price: 0,
              dietary_info: [],
              allergens: [],
              included: true,
              is_available: true
            },
            {
              id: "side-uuid-5",
              name: "Cauliflower Cheese",
              description: "Creamy mature cheddar sauce, baked until golden and bubbling",
              price: 3.99,
              dietary_info: ["vegetarian"],
              allergens: ["milk"],
              included: false,
              is_available: true
            }
          ],
          cutoff_time: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // Tomorrow at same time
        }
        
        // Cache the fallback menu
        menuCache = {
          data: fallbackMenu,
          timestamp: Date.now()
        }
        
        return NextResponse.json(fallbackMenu)
      }
      
      const errorText = await response.text()
      console.error('Error response:', errorText)
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    
    // Cache successful response
    menuCache = {
      data,
      timestamp: Date.now()
    }
    
    return NextResponse.json(data)
  } catch (error) {
    logError('api/table-bookings/menu/sunday-lunch', error)
    
    // Return cached data if available, even if expired
    if (menuCache) {
      console.log('Returning stale cached menu due to error')
      return NextResponse.json(menuCache.data)
    }
    
    return createApiErrorResponse(
      'We couldn\'t load the Sunday lunch menu. Please call us at 01753 682707 for menu information.',
      503
    )
  }
}