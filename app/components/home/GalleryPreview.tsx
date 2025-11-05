'use client'

import Link from 'next/link'
import Image from 'next/image'
import { GeneratedImage } from '@/lib/supabase'

interface GalleryPreviewProps {
  images: GeneratedImage[]
  loading: boolean
}

export function GalleryPreview({ images, loading }: GalleryPreviewProps) {
  const displayImages = images.slice(0, 15)

  return (
    <section className="w-full relative py-8 sm:py-12">
      {/* Header */}
      <div className="flex items-center justify-center mb-5 sm:mb-6 py-8  px-2">
        <h2 className="text-white text-center font-bold text-2xl sm:text-4xl tracking-tight">
          Community Gallery
        </h2>
      </div>

      {/* Gallery Container - Fixed Height with Overflow */}
      <div className="relative h-[600px] sm:h-[700px] md:h-[800px] overflow-hidden">
        {loading ? (
          // Loading State
          <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-2 space-y-2">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="break-inside-avoid mb-2 rounded-2xl overflow-hidden bg-white/[0.02]"
                style={{ 
                  height: `${150 + Math.random() * 200}px`,
                  animation: `shimmer 2s ease-in-out ${i * 0.1}s infinite`
                }}
              >
                <div className="w-full h-full bg-gradient-to-br from-purple-500/15 via-pink-500/15 to-blue-500/15" />
              </div>
            ))}
          </div>
        ) : displayImages.length > 0 ? (
          // Masonry Grid using CSS columns
          <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-2 space-y-2">
            {displayImages.map((image, index) => (
              <Link
                key={image.id}
                href="/gallery"
                className="group relative block break-inside-avoid mb-2 rounded-2xl overflow-hidden cursor-pointer"
                style={{
                  animation: `fadeIn 0.6s ease-out ${index * 0.05}s both`
                }}
              >
                <div className="relative w-full">
                  <Image
                    src={image.image_url}
                    alt={image.prompt}
                    width={400}
                    height={400}
                    className="w-full h-auto object-cover transition-all duration-700 ease-out group-hover:scale-105"
                    style={{ display: 'block' }}
                  />
                  
                  {/* Dark overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  
                  {/* Prompt on hover */}
                  <div className="absolute inset-0 p-3 sm:p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-xs sm:text-sm line-clamp-2 font-semibold leading-tight drop-shadow-2xl">
                      {image.prompt}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-2 space-y-2">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="break-inside-avoid mb-2 rounded-2xl overflow-hidden bg-white/[0.02]"
                style={{ height: `${150 + Math.random() * 200}px` }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-white/5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Gradient Overlay with Button */}
        <div className="absolute bottom-0 left-0 right-0 w-full grid justify-center items-center pb-8 pt-36 z-10 pointer-events-none">
          {/* Multi-layer gradient for smooth transition */}
          <div 
            className="absolute inset-0" 
            style={{
              background: 'linear-gradient(to top, rgba(10, 15, 30, 0.98) 0%, rgba(30, 27, 75, 0.85) 20%, rgba(88, 28, 135, 0.4) 50%, transparent 100%)'
            }}
          />
          
          {/* Backdrop blur effect */}
          <div 
            className="absolute inset-0" 
            style={{
              backdropFilter: 'blur(8px) brightness(0.7)',
              WebkitBackdropFilter: 'blur(8px) brightness(0.7)',
              maskImage: 'linear-gradient(to top, black 0%, black 30%, transparent 100%)'
            }}
          />
          
          {/* CTA Button */}
          {displayImages.length > 0 && (
            <Link
              href="/gallery"
              className="pointer-events-auto group relative inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 rounded-full transition-all duration-500 hover:scale-105 z-20"
              style={{
                boxShadow: '0 0 60px rgba(168, 85, 247, 0.5), 0 20px 40px rgba(0, 0, 0, 0.4)',
                transition: 'all 0.5s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 100px rgba(168, 85, 247, 0.8), 0 20px 60px rgba(236, 72, 153, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 60px rgba(168, 85, 247, 0.5), 0 20px 40px rgba(0, 0, 0, 0.4)'
              }}
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-fuchsia-600 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <span className="relative text-white font-semibold text-sm sm:text-base flex items-center gap-2">
                View all
                <span className="font-bold">Community Images</span>
                <svg 
                  className="w-4 h-4 transition-transform group-hover:translate-x-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          )}
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }
      `}</style>
    </section>
  )
}
