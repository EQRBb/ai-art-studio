import { useState, useCallback, useEffect } from 'react'
import { GeneratedImage } from '@/lib/supabase'

interface UseImageGenerationReturn {
  prompt: string
  setPrompt: (prompt: string) => void
  loading: boolean
  error: string
  generatedImage: string | null
  generatedPrompt: string
  handleGenerate: () => Promise<void>
  refreshRecentImages: () => Promise<void>
  recentImages: GeneratedImage[]
  recentImagesLoading: boolean
}

export function useImageGeneration(): UseImageGenerationReturn {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('')
  const [recentImages, setRecentImages] = useState<GeneratedImage[]>([])
  const [recentImagesLoading, setRecentImagesLoading] = useState(true)

  const refreshRecentImages = useCallback(async () => {
    try {
      setRecentImagesLoading(true)
      const response = await fetch('/api/images?limit=4&offset=0')
      if (response.ok) {
        const data = await response.json()
        setRecentImages(data.images)
      }
    } catch (refreshErr) {
      console.error('Failed to refresh recent images:', refreshErr)
    } finally {
      setRecentImagesLoading(false)
    }
  }, [])

  // Fetch recent images on mount
  useEffect(() => {
    void refreshRecentImages()
  }, [refreshRecentImages])

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt')
      return
    }

    console.log('🚀 Starting generation with prompt:', prompt)
    setLoading(true)
    setError('')
    setGeneratedImage(null)
    setGeneratedPrompt('')

    try {
      console.log('📡 Sending request to /api/generate...')
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })

      console.log('📥 Response status:', response.status)
      
      const data = await response.json()
      console.log('📦 Response data:', data)

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate image')
      }

      console.log('✅ Generation successful! Image URL:', data.image_url)
      setGeneratedImage(data.image_url)
      setGeneratedPrompt(prompt)
      
      await refreshRecentImages()
    } catch (err) {
      console.error('❌ Generation error:', err)
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return {
    prompt,
    setPrompt,
    loading,
    error,
    generatedImage,
    generatedPrompt,
    handleGenerate,
    refreshRecentImages,
    recentImages,
    recentImagesLoading,
  }
}

