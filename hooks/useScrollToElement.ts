import { useCallback } from 'react'

export const HEADER_HEIGHT = 80 // Height of fixed navigation header

export function useScrollToElement() {
  const scrollToElement = useCallback((elementId: string) => {
    const element = document.getElementById(elementId)
    if (element) {
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - HEADER_HEIGHT
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }, [])

  return scrollToElement
}

// Utility function for non-hook contexts
export function scrollToElementWithOffset(elementId: string) {
  const element = document.getElementById(elementId)
  if (element) {
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - HEADER_HEIGHT
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}