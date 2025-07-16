'use client'

import { useState, useEffect, useRef, KeyboardEvent } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { getEventCategories, type EventCategory } from '@/lib/api'
import { analytics } from '@/lib/analytics'

export function CategoryFilter() {
  const [categories, setCategories] = useState<EventCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [focusedIndex, setFocusedIndex] = useState<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const searchParams = useSearchParams()
  const router = useRouter()
  const currentCategory = searchParams.get('category')

  useEffect(() => {
    async function fetchCategories() {
      try {
        const cats = await getEventCategories()
        setCategories(cats)
      } catch (error) {
        // Failed to load categories
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
      // Track category filter
      const category = categories.find(cat => cat.slug === categorySlug)
      analytics.filter('category', category?.name || categorySlug)
    } else {
      params.delete('category')
      // Track clearing filter
      analytics.filter('category', 'all')
    }
    
    router.push(`/whats-on${params.toString() ? `?${params.toString()}` : ''}`)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const activeCategories = categories.filter(cat => cat.is_active && cat.event_count > 0)
    const totalItems = activeCategories.length + 1 // +1 for "All Events"

    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault()
        setFocusedIndex((prev) => (prev + 1) % totalItems)
        break
      case 'ArrowLeft':
        e.preventDefault()
        setFocusedIndex((prev) => (prev - 1 + totalItems) % totalItems)
        break
      case 'Home':
        e.preventDefault()
        setFocusedIndex(0)
        break
      case 'End':
        e.preventDefault()
        setFocusedIndex(totalItems - 1)
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (focusedIndex === 0) {
          handleCategoryChange(null)
        } else {
          const category = activeCategories[focusedIndex - 1]
          if (category) {
            handleCategoryChange(category.slug)
          }
        }
        break
    }
  }

  // Focus the button when focusedIndex changes
  useEffect(() => {
    if (containerRef.current) {
      const buttons = containerRef.current.querySelectorAll('button')
      const button = buttons[focusedIndex]
      if (button) {
        button.focus()
      }
    }
  }, [focusedIndex])

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
    <div 
      ref={containerRef}
      className="flex flex-wrap justify-center gap-2 mb-8"
      role="tablist"
      aria-label="Event category filter"
      onKeyDown={handleKeyDown}
    >
      <button
        role="tab"
        aria-selected={!currentCategory}
        aria-controls="events-list"
        tabIndex={focusedIndex === 0 ? 0 : -1}
        onClick={() => handleCategoryChange(null)}
        className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
          !currentCategory 
            ? 'bg-anchor-green text-white' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-anchor-gold`}
      >
        All Events
      </button>
      
      {categories.filter(cat => cat.is_active && cat.event_count > 0).map((category, index) => (
        <button
          key={category.id}
          role="tab"
          aria-selected={currentCategory === category.slug}
          aria-controls="events-list"
          tabIndex={focusedIndex === index + 1 ? 0 : -1}
          onClick={() => handleCategoryChange(category.slug)}
          className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
            currentCategory === category.slug
              ? 'text-white'
              : 'text-gray-700 hover:opacity-80'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-anchor-gold`}
          style={{
            backgroundColor: currentCategory === category.slug 
              ? category.color 
              : `${category.color}20`,
            color: currentCategory === category.slug 
              ? 'white' 
              : category.color
          }}
          aria-label={`Filter by ${category.name} category (${category.event_count} events)`}
        >
          {category.icon && <span className="mr-1" aria-hidden="true">{category.icon}</span>}
          {category.name}
          <span className="ml-2 text-sm opacity-80" aria-label={`${category.event_count} events`}>({category.event_count})</span>
        </button>
      ))}
    </div>
  )
}