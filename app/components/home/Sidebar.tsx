'use client'

import { motion } from 'framer-motion'
import { GenerationDisplay } from './GenerationDisplay'
import { GalleryPreview } from './GalleryPreview'
import { GeneratedImage } from '@/lib/supabase'

interface SidebarProps {
  loading: boolean
  generatedImage: string | null
  generatedPrompt: string
  recentImages: GeneratedImage[]
  recentImagesLoading: boolean
  promptInputRef: React.RefObject<HTMLTextAreaElement | null>
}

export function Sidebar({
  loading,
  generatedImage,
  generatedPrompt,
  recentImages,
  recentImagesLoading,
}: SidebarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-4 sm:space-y-6"
    >
      <GenerationDisplay
        loading={loading}
        generatedImage={generatedImage}
        generatedPrompt={generatedPrompt}
      />

      <GalleryPreview images={recentImages} loading={recentImagesLoading} />
    </motion.div>
  )
}

