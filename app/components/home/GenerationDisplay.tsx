'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import GenerationAnimation from '@/app/components/GenerationAnimation'

interface GenerationDisplayProps {
  loading: boolean
  generatedImage: string | null
  generatedPrompt: string
  fullWidth?: boolean // Optional prop for full width display
  clickable?: boolean // Optional prop to make image clickable
  onImageClick?: () => void // Optional callback when image is clicked
}

export function GenerationDisplay({ loading, generatedImage, generatedPrompt, fullWidth = false, clickable = false, onImageClick }: GenerationDisplayProps) {
  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="loading"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`${fullWidth ? 'w-full rounded-lg glass-input' : 'glass-effect rounded-xl sm:rounded-2xl shadow-2xl max-w-2xl mx-auto'}`}
        >
          <div className={`relative w-full ${fullWidth ? 'rounded-lg overflow-hidden' : ''}`} style={{ paddingBottom: '100%' }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <GenerationAnimation />
            </div>
          </div>
        </motion.div>
      )}

      {generatedImage && !loading && (
        <motion.div
          key="result"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className={`${fullWidth ? 'w-full overflow-hidden rounded-lg glass-input' : 'glass-effect rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl max-w-2xl mx-auto'} group`}
        >
          {clickable && onImageClick ? (
            <div
              onClick={onImageClick}
              className="block relative w-full overflow-hidden cursor-pointer"
              style={{ paddingBottom: '100%' }}
            >
              <Image
                src={generatedImage}
                alt={generatedPrompt}
                fill
                className="absolute inset-0 object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                sizes={fullWidth ? "(max-width: 1024px) 90vw, 640px" : "(max-width: 1024px) 90vw, 768px"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-white text-xs sm:text-sm font-medium mb-1.5">Prompt:</p>
                  <p className="text-white/80 text-xs sm:text-sm">{generatedPrompt}</p>
                </div>
              </div>
            </div>
          ) : clickable ? (
            <Link
              href="/gallery"
              className="block relative w-full overflow-hidden cursor-pointer"
              style={{ paddingBottom: '100%' }}
            >
              <Image
                src={generatedImage}
                alt={generatedPrompt}
                fill
                className="absolute inset-0 object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                sizes={fullWidth ? "(max-width: 1024px) 90vw, 640px" : "(max-width: 1024px) 90vw, 768px"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-white text-xs sm:text-sm font-medium mb-1.5">Prompt:</p>
                  <p className="text-white/80 text-xs sm:text-sm">{generatedPrompt}</p>
                </div>
              </div>
            </Link>
          ) : (
            <div className={`relative w-full overflow-hidden ${fullWidth ? 'rounded-t-lg' : ''}`} style={{ paddingBottom: '100%' }}> 
              <Image
                src={generatedImage}
                alt={generatedPrompt}
                fill
                className="absolute inset-0 object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                sizes={fullWidth ? "(max-width: 1024px) 90vw, 640px" : "(max-width: 1024px) 90vw, 768px"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-white text-xs sm:text-sm font-medium mb-1.5">Prompt:</p>
                  <p className="text-white/80 text-xs sm:text-sm">{generatedPrompt}</p>
                </div>
              </div>
            </div>
          )}
          <div className="p-3 sm:p-4 flex items-center justify-between glass-input border-t border-white/10">
            <span className="text-white/70 text-xs sm:text-sm">✨ Saved to gallery</span>
            <Link
              href="/gallery"
              className="glass-button px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-white text-xs sm:text-sm font-medium transition-all hover:bg-white/10"
            >
              View Gallery →
            </Link>
          </div>
        </motion.div>
      )}

      {!loading && !generatedImage && (
        <motion.div
          key="placeholder"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${fullWidth ? 'w-full overflow-hidden rounded-lg glass-input' : 'glass-effect rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl max-w-2xl mx-auto'}`}
        >
          <div className={`relative w-full bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20 overflow-hidden ${fullWidth ? 'rounded-lg' : ''}`} style={{ paddingBottom: '100%' }}>
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 animate-pulse" />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-8 relative z-10">
              <svg className="w-20 h-20 sm:w-24 sm:h-24 text-white/30 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
                <p className="text-white/70 text-base sm:text-lg font-medium mb-2">Ready to Create</p>
                <p className="text-white/50 text-sm sm:text-base">Enter a prompt {fullWidth ? 'on the left' : 'above'} and click Generate</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

