'use client'

import { RefObject } from 'react'
import { motion } from 'framer-motion'
import { AutoResizeTextarea } from '@/app/components/ui/AutoResizeTextarea'
import { Button } from '@/app/components/ui/Button'

interface CreatePromptFormProps {
  promptInputRef: RefObject<HTMLTextAreaElement | null>
  prompt: string
  setPrompt: (prompt: string) => void
  loading: boolean
  error: string
  handleGenerate: () => void
}

export function CreatePromptForm({
  promptInputRef,
  prompt,
  setPrompt,
  loading,
  error,
  handleGenerate,
}: CreatePromptFormProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="lg:sticky lg:top-24 lg:self-start h-full"
    >
      <div className="glass-effect rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl h-full flex flex-col">
        <h2 className="text-white font-semibold text-lg sm:text-xl mb-4">
          Describe Your Vision
        </h2>

        {/* Prompt Input */}
        <div className="space-y-4">
          <AutoResizeTextarea
            ref={promptInputRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.ctrlKey || e.metaKey) && !loading && prompt.trim()) {
                e.preventDefault()
                handleGenerate()
              }
            }}
            placeholder="A majestic lion in a mystical forest with glowing mushrooms..."
            disabled={loading}
            rows={6}
            className="w-full"
          />

          <Button
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            isLoading={loading}
            className="w-full text-sm sm:text-base h-12 sm:h-14"
          >
            {loading ? 'Generating...' : 'Generate Image'}
          </Button>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 sm:p-4 glass-effect bg-red-500/10 border-red-500/30 rounded-lg text-red-200 text-xs sm:text-sm"
          >
            {error}
          </motion.div>
        )}

        {/* Tips Section */}
        <div className="mt-6 p-4 glass-input rounded-lg flex-1 flex flex-col justify-center">
          <h3 className="text-white/80 font-medium text-sm mb-2">💡 Tips for better results:</h3>
          <ul className="text-white/60 text-xs sm:text-sm space-y-1.5">
            <li>• Be specific about style, colors, and mood</li>
            <li>• Include details about lighting and atmosphere</li>
            <li>• Mention artistic styles or references</li>
            <li>• Use descriptive adjectives</li>
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

