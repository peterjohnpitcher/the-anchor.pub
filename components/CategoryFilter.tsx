'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { getEventCategories, type EventCategory } from '@/lib/api'

export function CategoryFilter() {
  const [categories, setCategories] = useState<EventCategory[]>([])
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const router = useRouter()
  const currentCategory = searchParams.get('category')

  useEffect(() => {
    async function fetchCategories() {
      try {
        const cats = await getEventCategories()
        setCategories(cats)
      } catch (error) {
        console.error('Failed to load categories:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchCategories()
  }, [])

  const handleCategoryChange = (categorySlug: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (categorySlug) {
      params.set('category', categorySlug)
    } else {
      params.delete('category')
    }
    
    router.push(`/whats-on${params.toString() ? `?${params.toString()}` : ''}`)
  }

  if (loading) {
    return (
      <div className="flex justify-center gap-2 mb-8">
        <div className="h-10 w-24 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="h-10 w-32 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="h-10 w-28 bg-gray-200 rounded-full animate-pulse"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      <button
        onClick={() => handleCategoryChange(null)}
        className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
          !currentCategory 
            ? 'bg-anchor-green text-white' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All Events
      </button>
      
      {categories.filter(cat => cat.is_active && cat.event_count > 0).map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryChange(category.slug)}
          className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
            currentCategory === category.slug
              ? 'text-white'
              : 'text-gray-700 hover:opacity-80'
          }`}
          style={{
            backgroundColor: currentCategory === category.slug 
              ? category.color 
              : `${category.color}20`,
            color: currentCategory === category.slug 
              ? 'white' 
              : category.color
          }}
        >
          {category.icon && <span className="mr-1">{category.icon}</span>}
          {category.name}
          <span className="ml-2 text-sm opacity-80">({category.event_count})</span>
        </button>
      ))}
    </div>
  )
}