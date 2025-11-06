'use client'

import { useRef, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { AnimatePresence } from 'framer-motion'
import { useImageGeneration } from '@/app/hooks/useImageGeneration'
import {
  CreatePageHeader,
  CreatePromptForm,
  CreateImageDisplay,
} from '@/app/components/create'
import { GalleryPreview } from '../components/home/GalleryPreview'
import { FAQ } from '../components/home/FAQ'
import { getTemplateById } from '@/lib/templates'

function CreatePageContent() {
  const searchParams = useSearchParams()
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

  // Load template if template ID is in URL
  useEffect(() => {
    const templateId = searchParams.get('template')
    if (templateId) {
      const template = getTemplateById(templateId)
      if (template) {
        setPrompt(template.prompt)
        // Focus the input after a short delay to ensure it's rendered
        setTimeout(() => {
          promptInputRef.current?.focus()
        }, 100)
      }
    }
  }, [searchParams, setPrompt])

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Page Header */}
        <CreatePageHeader />

        {/* Browse Templates Button */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <a
            href="/templates"
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 glass-effect hover:bg-white/10 text-white text-sm sm:text-base font-medium rounded-xl transition-all hover:scale-105 border border-white/20 shadow-lg"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            <span>Browse Templates</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
        
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

export default function CreatePage() {
  return (
    <Suspense fallback={null}>
      <CreatePageContent />
    </Suspense>
  )
}

