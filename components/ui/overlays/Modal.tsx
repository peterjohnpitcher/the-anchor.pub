'use client'

import { forwardRef, useEffect, useRef, useState, Fragment } from 'react'
import { createPortal } from 'react-dom'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import type { BaseComponentProps } from '../types'

const modalVariants = cva(
  'relative bg-white rounded-lg shadow-xl mx-auto',
  {
    variants: {
      size: {
        sm: 'max-w-md w-full',
        md: 'max-w-lg w-full',
        lg: 'max-w-2xl w-full',
        xl: 'max-w-4xl w-full',
        fullscreen: 'max-w-full min-h-screen m-0 rounded-none'
      }
    },
    defaultVariants: {
      size: 'md'
    }
  }
)

const overlayVariants = cva(
  'fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto',
  {
    variants: {
      backdrop: {
        default: 'bg-black/50',
        blur: 'bg-black/30 backdrop-blur-sm',
        none: ''
      }
    },
    defaultVariants: {
      backdrop: 'default'
    }
  }
)

export interface ModalProps 
  extends BaseComponentProps,
    VariantProps<typeof modalVariants>,
    VariantProps<typeof overlayVariants> {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  description?: string
  closeOnEscape?: boolean
  closeOnBackdropClick?: boolean
  showCloseButton?: boolean
  initialFocus?: React.RefObject<HTMLElement>
  returnFocus?: boolean
  preventScroll?: boolean
  role?: 'dialog' | 'alertdialog'
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ 
    className,
    size,
    backdrop,
    open,
    onClose,
    children,
    title,
    description,
    closeOnEscape = true,
    closeOnBackdropClick = true,
    showCloseButton = true,
    initialFocus,
    returnFocus = true,
    preventScroll = true,
    role = 'dialog',
    id,
    testId,
    ...props 
  }, ref) => {
    const [mounted, setMounted] = useState(false)
    const modalRef = useRef<HTMLDivElement>(null)
    const previousActiveElement = useRef<HTMLElement | null>(null)
    const titleId = `${id || 'modal'}-title`
    const descriptionId = `${id || 'modal'}-description`

    // Mount on client only
    useEffect(() => {
      setMounted(true)
    }, [])

    // Handle escape key
    useEffect(() => {
      if (!open || !closeOnEscape) return

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose()
        }
      }

      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }, [open, onClose, closeOnEscape])

    // Focus management
    useEffect(() => {
      if (!open) return

      // Store current active element
      previousActiveElement.current = document.activeElement as HTMLElement

      // Focus initial element or modal
      const timer = setTimeout(() => {
        if (initialFocus?.current) {
          initialFocus.current.focus()
        } else {
          const firstFocusable = modalRef.current?.querySelector<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
          firstFocusable?.focus()
        }
      }, 100)

      return () => {
        clearTimeout(timer)
        // Return focus to previous element
        if (returnFocus && previousActiveElement.current) {
          previousActiveElement.current.focus()
        }
      }
    }, [open, initialFocus, returnFocus])

    // Prevent body scroll
    useEffect(() => {
      if (!open || !preventScroll) return

      const originalStyle = document.body.style.overflow
      document.body.style.overflow = 'hidden'

      return () => {
        document.body.style.overflow = originalStyle
      }
    }, [open, preventScroll])

    // Focus trap
    useEffect(() => {
      if (!open || !modalRef.current) return

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return

        const focusableElements = modalRef.current!.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        const focusableArray = Array.from(focusableElements)
        
        if (focusableArray.length === 0) return

        const firstFocusable = focusableArray[0]
        const lastFocusable = focusableArray[focusableArray.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault()
            lastFocusable.focus()
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault()
            firstFocusable.focus()
          }
        }
      }

      document.addEventListener('keydown', handleTabKey)
      return () => document.removeEventListener('keydown', handleTabKey)
    }, [open])

    if (!mounted || !open) return null

    return createPortal(
      <div
        className={cn(overlayVariants({ backdrop }))}
        onClick={closeOnBackdropClick ? () => onClose() : undefined}
        data-testid={testId}
      >
        <div
          ref={modalRef}
          className={cn(modalVariants({ size }), 'my-8', className)}
          onClick={(e) => e.stopPropagation()}
          role={role}
          aria-modal="true"
          aria-labelledby={title ? titleId : undefined}
          aria-describedby={description ? descriptionId : undefined}
          {...props}
        >
          {showCloseButton && (
            <button
              type="button"
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              onClick={onClose}
              aria-label="Close modal"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          {children}
        </div>
      </div>,
      document.body
    )
  }
)

Modal.displayName = 'Modal'

// Modal sub-components for consistent structure
export interface ModalHeaderProps extends BaseComponentProps {
  children: React.ReactNode
}

export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('px-6 pt-6 pb-4', className)}
      {...props}
    >
      {children}
    </div>
  )
)

ModalHeader.displayName = 'ModalHeader'

export interface ModalTitleProps extends BaseComponentProps {
  children: React.ReactNode
}

export const ModalTitle = forwardRef<HTMLHeadingElement, ModalTitleProps>(
  ({ className, children, id, ...props }, ref) => (
    <h2
      ref={ref}
      id={id}
      className={cn('text-lg font-semibold text-gray-900', className)}
      {...props}
    >
      {children}
    </h2>
  )
)

ModalTitle.displayName = 'ModalTitle'

export interface ModalDescriptionProps extends BaseComponentProps {
  children: React.ReactNode
}

export const ModalDescription = forwardRef<HTMLParagraphElement, ModalDescriptionProps>(
  ({ className, children, id, ...props }, ref) => (
    <p
      ref={ref}
      id={id}
      className={cn('mt-1 text-sm text-gray-600', className)}
      {...props}
    >
      {children}
    </p>
  )
)

ModalDescription.displayName = 'ModalDescription'

export interface ModalBodyProps extends BaseComponentProps {
  children: React.ReactNode
}

export const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('px-6 py-4', className)}
      {...props}
    >
      {children}
    </div>
  )
)

ModalBody.displayName = 'ModalBody'

export interface ModalFooterProps extends BaseComponentProps {
  children: React.ReactNode
}

export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-end gap-2 border-t border-gray-200 px-6 py-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)

ModalFooter.displayName = 'ModalFooter'