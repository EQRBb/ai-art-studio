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
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.98 }}
        transition={{ 
          duration: 0.5, 
          ease: [0.16, 1, 0.3, 1] 
        }}
        className="w-full"
      >
        <div className="glass-effect rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-2xl max-w-4xl mx-auto">
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

