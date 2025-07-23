'use client'

import { Button } from '@/components/ui'
import { pushToDataLayer } from '@/lib/gtm-events'

interface BlogShareButtonsProps {
  postTitle: string
  postSlug: string
}

export function BlogShareButtons({ postTitle, postSlug }: BlogShareButtonsProps) {
  const shareUrl = `https://the-anchor.pub/blog/${postSlug}`
  
  const handleTwitterShare = () => {
    pushToDataLayer({
      event: 'social_click',
      event_category: 'Social Media',
      event_label: 'blog_share',
      social_platform: 'twitter',
      social_url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(postTitle)}&url=${encodeURIComponent(shareUrl)}`,
      click_source: 'blog_share',
      blog_post: postTitle
    })
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(postTitle)}&url=${encodeURIComponent(shareUrl)}`, '_blank')
  }
  
  const handleFacebookShare = () => {
    pushToDataLayer({
      event: 'social_click',
      event_category: 'Social Media',
      event_label: 'blog_share',
      social_platform: 'facebook',
      social_url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      click_source: 'blog_share',
      blog_post: postTitle
    })
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')
  }

  return (
    <div className="flex gap-4">
      <Button 
        variant="secondary" 
        size="sm"
        onClick={handleTwitterShare}
      >
        Share on Twitter
      </Button>
      <Button 
        variant="secondary" 
        size="sm"
        onClick={handleFacebookShare}
      >
        Share on Facebook
      </Button>
    </div>
  )
}