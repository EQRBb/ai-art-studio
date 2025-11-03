'use client'

import { motion } from 'framer-motion'
import { GeneratedImage } from '@/lib/supabase'

interface GalleryGridProps {
  images: GeneratedImage[]
  onImageClick: (image: GeneratedImage) => void
}

export function GalleryGrid({ images, onImageClick }: GalleryGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {images.map((image, index) => (
        <motion.div
          key={image.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index < 15 ? index * 0.05 : 0 }}
        >
          <div
            className="glass-effect rounded-2xl group cursor-pointer hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-purple-500/30"
            onClick={() => onImageClick(image)}
          >
            <div className="relative w-full overflow-hidden rounded-t-2xl">
              <div className="relative w-full" style={{ paddingBottom: '100%' }}>
                <img
                  src={image.image_url}
                  alt={image.prompt}
                  loading={index < 8 ? 'eager' : 'lazy'}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ display: 'block' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white text-xs font-medium line-clamp-2">{image.prompt}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-3 glass-input">
              <div className="flex items-center justify-between text-[10px] text-white/60">
                <span>
                  {new Date(image.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

