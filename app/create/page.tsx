'use client'

import { useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useImageGeneration } from '@/app/hooks/useImageGeneration'
import {
  CreatePageHeader,
  CreatePromptForm,
  CreateImageDisplay,
} from '@/app/components/create'
import { GalleryPreview } from '../components/home/GalleryPreview'
import { FAQ } from '../components/home/FAQ'

export default function CreatePage() {
  const promptInputRef = useRef<HTMLTextAreaElement>(null)
  const {
    prompt,
    setPrompt,
    loading,
    error,
    generatedImage,
    generatedPrompt,
    handleGenerate,
    recentImages,
    recentImagesLoading,
  } = useImageGeneration()

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Page Header */}
        <CreatePageHeader />
        
        {/* Generated Image Display - Only show when loading or image exists */}
        <AnimatePresence mode="wait">
          {(loading || generatedImage) && (
            <div key="image-display" className="mb-6 sm:mb-8">
              <CreateImageDisplay
                loading={loading}
                generatedImage={generatedImage}
                generatedPrompt={generatedPrompt}
              />
            </div>
          )}
        </AnimatePresence>
        
        {/* Horizontal Prompt Form - Full Width */}
        <div className="mb-6 sm:mb-8">
          <CreatePromptForm
            promptInputRef={promptInputRef}
            prompt={prompt}
            setPrompt={setPrompt}
            loading={loading}
            error={error}
            handleGenerate={handleGenerate}
          />
        </div>

        
        
      </div>  <GalleryPreview images={recentImages} loading={recentImagesLoading} />
        <FAQ />
    </div>
  )
}

