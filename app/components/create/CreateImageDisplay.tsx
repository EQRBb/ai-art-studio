'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { GenerationDisplay } from '@/app/components/home/GenerationDisplay'
import { ImageModal } from '@/app/components/gallery/ImageModal'
import { GeneratedImage } from '@/lib/supabase'

interface CreateImageDisplayProps {
  loading: boolean
  generatedImage: string | null
  generatedPrompt: string
}

export function CreateImageDisplay({
  loading,
  generatedImage,
  generatedPrompt,
}: CreateImageDisplayProps) {
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  // Smoothly bring the generation area into view when generation starts
  useEffect(() => {
    if (!loading) return
    const el = containerRef.current
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - 120
    window.scrollTo({ top: y, behavior: 'smooth' })
  }, [loading])

  // Also ensure the final image is centered when it appears
  useEffect(() => {
    if (!generatedImage || loading) return
    const el = containerRef.current
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - 120
    window.scrollTo({ top: y, behavior: 'smooth' })
  }, [generatedImage, loading])

  const handleImageClick = () => {
    if (generatedImage && generatedPrompt) {
      // Create a mock GeneratedImage object for the modal
      const mockImage: GeneratedImage = {
        id: `temp-${Date.now()}`,
        prompt: generatedPrompt,
        image_url: generatedImage,
        created_at: new Date().toISOString(),
      }
      setSelectedImage(mockImage)
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 90, damping: 18, delay: 0.1 }}
        className="relative h-full scroll-mt-32"
        ref={containerRef}
      >
        <div className="relative group h-full">
          {/* soft background glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-6 rounded-3xl bg-gradient-to-b from-fuchsia-500/10 via-sky-400/10 to-emerald-400/10 blur-2xl"
          />

          <div className="relative glass-effect rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-2xl w-full max-w-4xl mx-auto transition-all duration-300 hover:shadow-emerald-500/10">
            {/* header with prompt + status */}
            <div className="flex items-center justify-between px-4 sm:px-6 pt-4 sm:pt-6">
              <span
                className="text-xs sm:text-sm text-white/70 truncate max-w-[75%]"
                title={generatedPrompt || ''}
              >
                {generatedPrompt || ''}
              </span>
              <span
                className={`ml-3 inline-flex items-center rounded-full px-2.5 py-1 text-[10px] sm:text-xs font-medium ring-1 ring-inset ${
                  loading
                    ? 'bg-amber-400/10 text-amber-300 ring-amber-300/20'
                    : 'bg-emerald-400/10 text-emerald-300 ring-emerald-300/20'
                }`}
              >
                {loading ? 'Generating…' : 'Preview'}
              </span>
            </div>

            {/* content */}
            <div className="p-3 sm:p-6">
              <div className="relative rounded-xl overflow-hidden ring-1 ring-white/10 bg-black/20 grid place-items-center max-h-[70vh] sm:max-h-[75vh] [&_img]:max-h-[70vh] sm:[&_img]:max-h-[75vh] [&_img]:h-auto [&_img]:w-auto [&_canvas]:max-h-[70vh] sm:[&_canvas]:max-h-[75vh]">
                <GenerationDisplay
                  loading={loading}
                  generatedImage={generatedImage}
                  generatedPrompt={generatedPrompt}
                  fullWidth
                  clickable
                  onImageClick={handleImageClick}
                />

                {/* subtle sheen on hover */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                >
                  <div className="absolute -inset-x-10 -top-1/2 h-full rotate-12 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <ImageModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </>
  )
}

