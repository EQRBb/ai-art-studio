'use client'

import { useRef } from 'react'
import { Hero } from './components/home/Hero'
import { GenerationForm } from './components/home/GenerationForm'
import { FAQ } from './components/home/FAQ'
import { Features } from './components/home/Features'
import { Sidebar } from './components/home/Sidebar'
import { useImageGeneration } from './hooks/useImageGeneration'
import { Stats } from './components/home/Stats'
import { GalleryPreview } from './components/home/GalleryPreview'
import { Testimonials } from './components/home/Testimonials'
import { ToolsCarousel } from './components/home/ToolsCarousel/ToolsCarousel'

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
      </div>

      {/* Tools Carousel - Full Width */}
      <ToolsCarousel />

      {/* Testimonials Section */}
      <Testimonials />

      <GalleryPreview images={recentImages} loading={recentImagesLoading} />
      
      {/* FAQ Section */}
      <FAQ />
      
      {/* Features Section */}
      <Features />
    </div>
  )
}
