/**
 * Utility for generating Twitter card metadata
 */

import { Metadata } from 'next'

interface TwitterMetadataOptions {
  title: string
  description: string
  images?: string[]
  card?: 'summary' | 'summary_large_image'
}

/**
 * Generates Twitter card metadata for a page
 * @param options - Twitter metadata options
 * @returns Twitter metadata object
 */
export function getTwitterMetadata(options: TwitterMetadataOptions): NonNullable<Metadata['twitter']> {
  const {
    title,
    description,
    images = ['/images/venue/the-anchor-pub-exterior-stanwell-moor.jpg'],
    card = 'summary_large_image'
  } = options

  return {
    card,
    title: title.length > 70 ? `${title.substring(0, 67)}...` : title,
    description: description.length > 200 ? `${description.substring(0, 197)}...` : description,
    images,
    site: '@TheAnchorStanwell', // Update this with actual Twitter handle
    creator: '@TheAnchorStanwell'
  }
}

/**
 * Default Twitter metadata for pages without specific metadata
 */
export const defaultTwitterMetadata: NonNullable<Metadata['twitter']> = {
  card: 'summary_large_image',
  title: 'The Anchor Pub - Near Heathrow Airport',
  description: 'Traditional pub with modern entertainment. Drag shows, quiz nights, great food & more.',
  images: ['/images/venue/the-anchor-pub-exterior-stanwell-moor.jpg'],
  site: '@TheAnchorStanwell',
  creator: '@TheAnchorStanwell'
}