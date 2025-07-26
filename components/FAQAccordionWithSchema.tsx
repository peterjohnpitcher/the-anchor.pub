'use client'

import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

interface FAQAccordionWithSchemaProps {
  title?: string
  faqs: FAQItem[]
  className?: string
  renderSchema?: boolean
}

export function FAQAccordionWithSchema({ 
  title = "Frequently Asked Questions", 
  faqs, 
  className = "",
  renderSchema = true
}: FAQAccordionWithSchemaProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  // Generate FAQ schema
  const faqSchema = renderSchema ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null

  return (
    <>
      {/* Inject FAQ schema - only if renderSchema is true */}
      {renderSchema && faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      
      <section className={`section-spacing ${className}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-anchor-green mb-8 text-center">
              {title}
            </h2>
            
            {/* Removed microdata markup to prevent duplicate schemas */}
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <button
                    onClick={() => toggleQuestion(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none focus:bg-gray-50 focus:ring-2 focus:ring-anchor-gold focus:ring-inset"
                    aria-expanded={openIndex === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <h3 className="font-bold text-lg text-anchor-green pr-4">
                      {faq.question}
                    </h3>
                    <svg 
                      className={`w-5 h-5 text-anchor-gold flex-shrink-0 transition-transform duration-200 ${
                        openIndex === index ? 'transform rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M19 9l-7 7-7-7" 
                      />
                    </svg>
                  </button>
                  
                  <div
                    id={`faq-answer-${index}`}
                    className={`px-6 overflow-hidden transition-all duration-200 ${
                      openIndex === index ? 'pb-4' : 'max-h-0'
                    }`}
                    style={{
                      maxHeight: openIndex === index ? '500px' : '0',
                    }}
                  >
                    <p className="text-gray-700">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}