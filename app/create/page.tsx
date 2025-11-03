'use client'

import { useRef } from 'react'
import { useImageGeneration } from '@/app/hooks/useImageGeneration'
import {
  CreatePageHeader,
  CreatePromptForm,
  CreateImageDisplay,
} from '@/app/components/create'

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
  } = useImageGeneration()

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Page Header */}
        <CreatePageHeader />

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-stretch">
          {/* Left Side - Input Form */}
          <CreatePromptForm
            promptInputRef={promptInputRef}
            prompt={prompt}
            setPrompt={setPrompt}
            loading={loading}
            error={error}
            handleGenerate={handleGenerate}
          />

          {/* Right Side - Generated Image */}
          <CreateImageDisplay
            loading={loading}
            generatedImage={generatedImage}
            generatedPrompt={generatedPrompt}
          />
        </div>
      </div>
    </div>
  )
}

