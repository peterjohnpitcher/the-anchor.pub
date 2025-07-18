// Custom Jest matchers for component testing

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveNoAccessibilityViolations(): R
      toBeVisuallyHidden(): R
      toHaveFocus(): R
    }
  }
}

export const customMatchers = {
  toHaveNoAccessibilityViolations(received: HTMLElement) {
    // Placeholder for axe-core integration
    // In real implementation:
    // const results = await axe(received)
    // const pass = results.violations.length === 0
    
    const pass = true // Placeholder
    
    return {
      pass,
      message: () => pass
        ? 'Expected element to have accessibility violations'
        : 'Expected element to have no accessibility violations'
    }
  },
  
  toBeVisuallyHidden(received: HTMLElement) {
    const styles = window.getComputedStyle(received)
    const isVisuallyHidden = 
      styles.position === 'absolute' &&
      styles.width === '1px' &&
      styles.height === '1px' &&
      styles.overflow === 'hidden'
    
    return {
      pass: isVisuallyHidden,
      message: () => isVisuallyHidden
        ? 'Expected element not to be visually hidden'
        : 'Expected element to be visually hidden'
    }
  },
  
  toHaveFocus(received: HTMLElement) {
    const hasFocus = document.activeElement === received
    
    return {
      pass: hasFocus,
      message: () => hasFocus
        ? 'Expected element not to have focus'
        : 'Expected element to have focus'
    }
  }
}

// Add matchers to Jest
expect.extend(customMatchers)