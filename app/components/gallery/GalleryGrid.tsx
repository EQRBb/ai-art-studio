'use client'

import { motion } from 'framer-motion'
import { GeneratedImage } from '@/lib/supabase'
import { useState } from 'react'

interface GalleryGridProps {
  images: GeneratedImage[]
  onImageClick: (image: GeneratedImage) => void
}

export function GalleryGrid({ images, onImageClick }: GalleryGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-2.5 md:gap-3 auto-rows-[180px]">
      {images.map((image, index) => (
        <GalleryCard
          key={image.id}
          image={image}
          index={index}
          onClick={() => onImageClick(image)}
        />
      ))}
    </div>
  )
}

interface GalleryCardProps {
  image: GeneratedImage
  index: number
  onClick: () => void
}

function GalleryCard({ image, index, onClick }: GalleryCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Create varied heights using a pattern based on index
  // This creates a visually pleasing staggered grid
  const getRowSpan = (idx: number) => {
    const pattern = idx % 7
    if (pattern === 0 || pattern === 4) return 'row-span-2' // tall
    if (pattern === 2 || pattern === 5) return 'row-span-3' // extra tall
    return 'row-span-2' // default medium
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index < 12 ? index * 0.05 : 0 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`group relative cursor-pointer ${getRowSpan(index)}`}
    >
      <div className="relative h-full rounded-xl overflow-hidden bg-black/50 border border-white/10">
        {/* Date Badge */}
        <span className="absolute top-3 right-3 px-2.5 py-1 bg-black/60 backdrop-blur-sm text-white text-[10px] font-medium rounded-full shadow-lg z-10">
          {new Date(image.created_at).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          })}
        </span>

        {/* Image */}
        <img
          src={image.image_url}
          alt={image.prompt}
          loading={index < 6 ? 'eager' : 'lazy'}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Hover Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
        />

        {/* Bottom Content - Always Visible */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
          {/* Prompt Title - Always visible */}
          <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
            {image.prompt}
          </h3>

          {/* View Details Button - Show on hover */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: isHovered ? 1 : 0, 
              y: isHovered ? 0 : 10 
            }}
            transition={{ duration: 0.2, delay: 0.05 }}
          >
            <button
              onClick={onClick}
              className="inline-flex items-center justify-center w-full px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm font-semibold rounded-lg transition-all shadow-lg hover:shadow-purple-500/50"
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View Details
            </button>
          </motion.div>
        </div>

        {/* Gradient overlay for bottom text readability - Always there */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
      </div>
    </motion.div>
  )
}

