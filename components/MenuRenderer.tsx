'use client'

import { useMemo, memo, useRef, useEffect, useState } from 'react'
import { MenuData, MenuCategory, MenuSection, MenuItem } from '@/lib/menu-parser'
import { SpecialOfferNotifications } from './SpecialOfferNotifications'

interface MenuRendererProps {
  menuData: MenuData
  accentColor?: string
}

export function MenuRenderer({ menuData, accentColor = 'anchor-gold' }: MenuRendererProps) {
  const [focusedItem, setFocusedItem] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  
  // Memoize schema generation to prevent re-creation on every render
  const menuSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": "https://the-anchor.pub/#menu",
    "name": "The Anchor Menu",
    "description": "Food and drink menu at The Anchor pub",
    "hasMenuSection": menuData.categories.map(category => ({
      "@type": "MenuSection",
      "name": category.title,
      "description": category.description,
      "hasMenuItem": category.sections.flatMap(section => 
        section.items.map(item => ({
          "@type": "MenuItem",
          "name": item.name,
          "description": item.description,
          "offers": {
            "@type": "Offer",
            "price": item.price.replace('£', ''),
            "priceCurrency": "GBP"
          },
          "suitableForDiet": item.vegetarian ? "https://schema.org/VegetarianDiet" : undefined
        }))
      )
    }))
  }), [menuData])

  // Keyboard navigation handler
  const handleKeyboardNavigation = (e: React.KeyboardEvent) => {
    const menuItems = menuRef.current?.querySelectorAll('[data-menu-item]')
    if (!menuItems || menuItems.length === 0) return
    
    const currentIndex = Array.from(menuItems).findIndex(
      item => item.getAttribute('data-item-id') === focusedItem
    )
    
    let nextIndex = currentIndex
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        nextIndex = currentIndex < menuItems.length - 1 ? currentIndex + 1 : 0
        break
      case 'ArrowUp':
        e.preventDefault()
        nextIndex = currentIndex > 0 ? currentIndex - 1 : menuItems.length - 1
        break
      case 'Home':
        e.preventDefault()
        nextIndex = 0
        break
      case 'End':
        e.preventDefault()
        nextIndex = menuItems.length - 1
        break
      default:
        return
    }
    
    const nextItem = menuItems[nextIndex] as HTMLElement
    nextItem.focus()
    setFocusedItem(nextItem.getAttribute('data-item-id'))
  }

  return (
    <>
      {/* Schema.org Menu markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuSchema) }}
      />
      {/* Kitchen Hours */}
      {menuData.kitchenHours && (
        <section className="section-spacing bg-anchor-gold/10">
          <div className="container mx-auto px-4 text-center">
            <p className="text-lg text-anchor-green font-semibold">
              Kitchen Hours: {Object.entries(menuData.kitchenHours).map(([day, hours], index) => (
                <span key={day}>
                  {index > 0 && ' | '}
                  {day} {hours}
                </span>
              ))}
            </p>
            <p className="text-gray-700 mt-2">
              Please order at the bar when you're ready
            </p>
          </div>
        </section>
      )}


      {/* Menu Categories */}
      <div 
        ref={menuRef}
        itemScope 
        itemType="https://schema.org/Menu"
        onKeyDown={handleKeyboardNavigation}
        role="region"
        aria-label="Restaurant menu"
      >
        {menuData.categories.map((category, categoryIndex) => (
          <section key={category.id} id={category.id} className={`section-spacing ${categoryIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`} itemScope itemType="https://schema.org/MenuSection">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center" itemProp="name">
                {category.emoji && <span className="mr-2">{category.emoji}</span>}
                {category.title}
              </h2>
              
              {category.description && (
                <p className="text-center text-lg text-gray-700 mb-8" itemProp="description">
                  {category.description}
                </p>
              )}

              {/* Special Offer Notifications for this section */}
              <SpecialOfferNotifications targetSection={category.id} />

              {category.sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className={`mb-8 ${section.highlight && category.id === 'cocktails' ? 'cocktails-featured' : ''}`}>
                  {section.title && (
                    <h3 className={`text-2xl font-bold mb-6 text-center ${section.highlight && category.id === 'cocktails' ? 'text-anchor-gold' : 'text-anchor-green'}`}>
                      {section.title}
                    </h3>
                  )}
                  
                  {section.description && (
                    <p className={`text-center mb-6 ${section.highlight && category.id === 'cocktails' ? 'text-lg text-gray-800 font-medium' : 'text-gray-700'}`}>
                      {section.description}
                    </p>
                  )}

                  {/* Grid Style */}
                  {section.style === 'grid' && (
                    <div className={`grid gap-6 ${section.highlight && category.id === 'cocktails' ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-2'}`} role="list">
                      {section.items.map((item, itemIndex) => (
                        <MenuItemCard 
                          key={itemIndex} 
                          item={item}
                          itemId={`${category.id}-${sectionIndex}-${itemIndex}`}
                          isFocused={focusedItem === `${category.id}-${sectionIndex}-${itemIndex}`}
                          onFocus={setFocusedItem}
                          isHighlighted={section.highlight && category.id === 'cocktails'}
                        />
                      ))}
                    </div>
                  )}

                  {/* List Style */}
                  {section.style === 'list' && (
                    <div className="bg-white rounded-2xl p-8 shadow-md">
                      <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto" role="list">
                        {section.items.map((item, itemIndex) => (
                          <MenuItemList 
                            key={itemIndex} 
                            item={item}
                            itemId={`${category.id}-${sectionIndex}-${itemIndex}`}
                            isFocused={focusedItem === `${category.id}-${sectionIndex}-${itemIndex}`}
                            onFocus={setFocusedItem}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
      </div>

      {/* Responsible Drinking Message */}
      {menuData.responsibleDrinking && (
        <section className="section-spacing bg-amber-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-anchor-green mb-4">
                {menuData.responsibleDrinking.title}
              </h3>
              <p className="text-gray-700">
                {menuData.responsibleDrinking.message}
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

interface MenuItemProps {
  item: MenuItem
  itemId: string
  isFocused: boolean
  onFocus: (id: string) => void
  isHighlighted?: boolean
}

const MenuItemCard = memo(function MenuItemCard({ item, itemId, isFocused, onFocus, isHighlighted }: MenuItemProps) {
  return (
    <div 
      className={`rounded-2xl shadow-md transition-all ${isFocused ? 'ring-2 ring-anchor-gold' : ''} ${
        isHighlighted 
          ? 'bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-300 p-6 hover:shadow-xl hover:scale-105 featured-cocktail' 
          : 'bg-white p-8'
      }`}
      itemScope 
      itemType="https://schema.org/MenuItem"
      role="listitem"
      // Removed tabIndex to improve keyboard navigation
      data-menu-item
      data-item-id={itemId}
      aria-label={`${item.name}, ${item.price}${item.vegetarian ? ', vegetarian' : ''}`}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className={`font-bold ${isHighlighted ? 'text-lg' : 'text-xl'} text-anchor-green`} itemProp="name">
          {item.name}
          {item.vegetarian && (
            <span className="text-anchor-gold text-sm font-bold bg-green-100 px-2 py-1 rounded ml-2">(V)</span>
          )}
        </h3>
        <span className={`font-bold whitespace-nowrap ml-4 ${isHighlighted ? 'text-2xl text-amber-600' : 'text-xl text-anchor-gold'}`} itemProp="offers" itemScope itemType="https://schema.org/Offer">
          <span itemProp="price" content={item.price.replace('£', '')}>{item.price}</span>
          <meta itemProp="priceCurrency" content="GBP" />
        </span>
      </div>
      {item.description && (
        <p className={`${isHighlighted ? 'text-gray-800 text-sm leading-relaxed' : 'text-gray-700'}`} itemProp="description">{item.description}</p>
      )}
      {item.vegetarian && (
        <meta itemProp="suitableForDiet" content="https://schema.org/VegetarianDiet" />
      )}
    </div>
  )
})

const MenuItemList = memo(function MenuItemList({ item, itemId, isFocused, onFocus }: MenuItemProps) {
  return (
    <div 
      className={`flex justify-between p-2 rounded transition-all ${isFocused ? 'bg-amber-50' : ''}`}
      itemScope 
      itemType="https://schema.org/MenuItem"
      role="listitem"
      // Removed tabIndex to improve keyboard navigation
      data-menu-item
      data-item-id={itemId}
      aria-label={`${item.name}, ${item.price}${item.vegetarian ? ', vegetarian' : ''}`}
    >
      <span itemProp="name">
        {item.name}
        {item.vegetarian && <span className="text-sm text-green-600 ml-1">(V)</span>}
      </span>
      <span className="text-anchor-gold font-semibold" itemProp="offers" itemScope itemType="https://schema.org/Offer">
        <span itemProp="price" content={item.price.replace('£', '')}>{item.price}</span>
        <meta itemProp="priceCurrency" content="GBP" />
      </span>
      {item.vegetarian && (
        <meta itemProp="suitableForDiet" content="https://schema.org/VegetarianDiet" />
      )}
    </div>
  )
})