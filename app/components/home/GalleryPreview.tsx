import Link from 'next/link'
import Image from 'next/image'
import { GeneratedImage } from '@/lib/supabase'

interface GalleryPreviewProps {
  images: GeneratedImage[]
  loading: boolean
}

export function GalleryPreview({ images, loading }: GalleryPreviewProps) {
  return (
    <div className="glass-effect rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl">
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <h3 className="text-white font-semibold text-xs sm:text-sm">Recent Generations</h3>
        <Link
          href="/gallery"
          className="text-purple-400 hover:text-purple-300 text-[10px] sm:text-xs font-medium transition-colors"
        >
          View All →
        </Link>
      </div>
      {loading ? (
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="relative rounded-lg sm:rounded-xl overflow-hidden glass-input"
              style={{ paddingBottom: '100%' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 animate-pulse" />
            </div>
          ))}
        </div>
      ) : images.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {images.map((image) => (
            <Link
              key={image.id}
              href="/gallery"
              className="relative rounded-lg sm:rounded-xl glass-input group cursor-pointer block touch-manipulation overflow-hidden"
            >
              <div className="relative w-full overflow-hidden rounded-lg sm:rounded-xl" style={{ paddingBottom: '100%' }}>
                <Image
                  src={image.image_url}
                  alt={image.prompt}
                  fill
                  className="absolute inset-0 object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 400px"
                />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="relative rounded-lg sm:rounded-xl overflow-hidden glass-input"
              style={{ paddingBottom: '100%' }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

