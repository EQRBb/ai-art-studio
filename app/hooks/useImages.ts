import { useState, useEffect, useRef, useCallback } from 'react'
import { GeneratedImage } from '@/lib/supabase'
import { IMAGES_PER_PAGE } from '@/app/constants'

interface UseImagesReturn {
  images: GeneratedImage[]
  loading: boolean
  loadingMore: boolean
  error: string
  hasMore: boolean
  fetchImages: (offset: number, isInitial?: boolean) => Promise<void>
  loadMoreRef: React.RefObject<HTMLDivElement>
}

export function useImages(): UseImagesReturn {
  const [images, setImages] = useState<GeneratedImage[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState('')
  const [hasMore, setHasMore] = useState(true)
  const [offset, setOffset] = useState(0)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  const fetchImages = useCallback(async (currentOffset: number, isInitial = false) => {
    try {
      if (isInitial) {
        setLoading(true)
      } else {
        setLoadingMore(true)
      }

      const response = await fetch(`/api/images?limit=${IMAGES_PER_PAGE}&offset=${currentOffset}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch images')
      }

      const data = await response.json()

      if (isInitial) {
        setImages(data.images)
      } else {
        setImages(prev => [...prev, ...data.images])
      }

      setHasMore(data.hasMore)
      setOffset(currentOffset + IMAGES_PER_PAGE)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load images')
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }, [])

  useEffect(() => {
    void fetchImages(0, true)
  }, [fetchImages])

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (loading || !hasMore) return

    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingMore && hasMore) {
          void fetchImages(offset)
        }
      },
      { threshold: 0.1 }
    )

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [loading, loadingMore, hasMore, offset, fetchImages])

  return {
    images,
    loading,
    loadingMore,
    error,
    hasMore,
    fetchImages,
    loadMoreRef,
  }
}

