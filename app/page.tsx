'use client'

import { useRef } from 'react'
import { Hero } from './components/home/Hero'
import { GenerationForm } from './components/home/GenerationForm'
import { FAQ } from './components/home/FAQ'
import { Features } from './components/home/Features'
import { Sidebar } from './components/home/Sidebar'
import { useImageGeneration } from './hooks/useImageGeneration'
import { Stats } from './components/home/Stats'

export default function Home() {
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
    <div className="relative">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Hero Title */}
        <Hero />

        {/* Stats Bar */}
        <Stats />

        {/* Main Content - Centered Flow */}
        <div className="mt-8 sm:mt-12 space-y-6 sm:space-y-8">
          {/* Generation Area - Centered with larger width */}
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Input Form */}
            <GenerationForm
              prompt={prompt}
              setPrompt={setPrompt}
              loading={loading}
              error={error}
              onGenerate={handleGenerate}
              promptInputRef={promptInputRef}
            />

            {/* Generated Image Display - Directly Below Input */}
            <Sidebar
              loading={loading}
              generatedImage={generatedImage}
              generatedPrompt={generatedPrompt}
              recentImages={recentImages}
              recentImagesLoading={recentImagesLoading}
              promptInputRef={promptInputRef}
            />
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto">
            <FAQ />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <Features />
    </div>
  )
}
