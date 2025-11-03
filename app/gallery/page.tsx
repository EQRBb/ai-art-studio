'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { GeneratedImage } from '@/lib/supabase'
import { useImages } from '@/app/hooks/useImages'
import { GalleryGrid } from '@/app/components/gallery/GalleryGrid'
import { ImageModal } from '@/app/components/gallery/ImageModal'
import { EmptyState } from '@/app/components/gallery/EmptyState'
import { LoadingState } from '@/app/components/gallery/LoadingState'
import { ErrorState } from '@/app/components/gallery/ErrorState'

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null)
  const { images, loading, loadingMore, error, hasMore, loadMoreRef } = useImages()

  if (loading) {
    return <LoadingState />
  }

  if (error) {
    return <ErrorState error={error} />
  }

  return (
    <div className="relative min-h-screen">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-10"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3 px-4">
            Your{' '}
            <span className="text-gradient animate-gradient">
              Creative Gallery
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto mb-4 sm:mb-6 px-4">
            {images.length} {images.length === 1 ? 'masterpiece' : 'masterpieces'} created with AI
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs sm:text-sm rounded-lg sm:rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all hover:scale-105 shadow-lg font-medium"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create New
          </Link>
        </motion.div>

        {/* Gallery Grid */}
        {images.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <GalleryGrid images={images} onImageClick={setSelectedImage} />

            {/* Infinite Scroll Trigger & Loading Indicator */}
            {hasMore && (
              <div ref={loadMoreRef} className="flex justify-center py-12">
                {loadingMore && (
                  <div className="text-center">
                    <div className="w-10 h-10 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-3"></div>
                    <p className="text-white/70 text-sm">Loading more images...</p>
                  </div>
                )}
              </div>
            )}

            {/* End of Gallery Message */}
            {!hasMore && images.length > 0 && (
              <div className="text-center py-12">
                <div className="glass-effect inline-block px-6 py-3 rounded-xl">
                  <p className="text-white/70 text-sm">
                    🎨 You&apos;ve reached the end of our gallery
                  </p>
                </div>
              </div>
            )}
          </>
        )}

        {/* Image Modal */}
        <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />
      </div>
    </div>
  )
}
