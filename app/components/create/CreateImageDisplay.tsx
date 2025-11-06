'use client'

import { useState } from 'react'
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
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="h-full"
      >
        <div className="glass-effect rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl h-full flex items-center justify-center">
          <GenerationDisplay
            loading={loading}
            generatedImage={generatedImage}
            generatedPrompt={generatedPrompt}
            fullWidth
            clickable
            onImageClick={handleImageClick}
          />
        </div>
      </motion.div>

      <ImageModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </>
  )
}

