import { MenuData, MenuCategory, MenuSection, MenuItem } from '@/lib/menu-parser'

interface MenuRendererProps {
  menuData: MenuData
  accentColor?: string
}

export function MenuRenderer({ menuData, accentColor = 'anchor-gold' }: MenuRendererProps) {
  return (
    <>
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
      {menuData.categories.map((category, categoryIndex) => (
        <section key={category.id} className={`section-spacing ${categoryIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
                {category.emoji && <span className="mr-2">{category.emoji}</span>}
                {category.title}
              </h2>
              
              {category.description && (
                <p className="text-center text-lg text-gray-700 mb-8">
                  {category.description}
                </p>
              )}

              {category.sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="mb-8">
                  {section.title && (
                    <h3 className="text-2xl font-bold text-anchor-green mb-6 text-center">
                      {section.title}
                    </h3>
                  )}
                  
                  {section.description && (
                    <p className="text-center text-gray-700 mb-6">
                      {section.description}
                    </p>
                  )}

                  {/* Grid Style */}
                  {section.style === 'grid' && (
                    <div className="grid md:grid-cols-2 gap-6">
                      {section.items.map((item, itemIndex) => (
                        <MenuItemCard key={itemIndex} item={item} />
                      ))}
                    </div>
                  )}

                  {/* List Style */}
                  {section.style === 'list' && (
                    <div className="bg-white rounded-2xl p-8 shadow-md">
                      <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                        {section.items.map((item, itemIndex) => (
                          <MenuItemList key={itemIndex} item={item} />
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

function MenuItemCard({ item }: { item: MenuItem }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-md">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-bold text-xl text-anchor-green">
          {item.name}
          {item.vegetarian && (
            <span className="text-anchor-gold text-sm font-bold bg-green-100 px-2 py-1 rounded ml-2">(V)</span>
          )}
        </h3>
        <span className="text-xl font-bold text-anchor-gold whitespace-nowrap ml-4">{item.price}</span>
      </div>
      {item.description && (
        <p className="text-gray-700">{item.description}</p>
      )}
    </div>
  )
}

function MenuItemList({ item }: { item: MenuItem }) {
  return (
    <div className="flex justify-between">
      <span>
        {item.name}
        {item.vegetarian && <span className="text-sm text-green-600 ml-1">(V)</span>}
      </span>
      <span className="text-anchor-gold font-semibold">{item.price}</span>
    </div>
  )
}