import { motion, AnimatePresence } from 'framer-motion'
import { AutoResizeTextarea } from '@/app/components/ui/AutoResizeTextarea'
import { Button } from '@/app/components/ui/Button'
import { POPULAR_TAGS } from '@/app/constants'

interface GenerationFormProps {
  prompt: string
  setPrompt: (prompt: string) => void
  loading: boolean
  error: string
  onGenerate: () => void
  promptInputRef: React.RefObject<HTMLTextAreaElement | null>
}

export function GenerationForm({
  prompt,
  setPrompt,
  loading,
  error,
  onGenerate,
  promptInputRef,
}: GenerationFormProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <div className="glass-effect rounded-xl sm:rounded-2xl p-1.5 sm:p-2 shadow-2xl">
        <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-end">
          <AutoResizeTextarea
            ref={promptInputRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.ctrlKey || e.metaKey) && !loading && prompt.trim()) {
                e.preventDefault()
                onGenerate()
              }
            }}
            placeholder="Describe what you want..."
            disabled={loading}
            rows={1}
          />
          <div className="flex sm:block justify-center sm:justify-end h-[44px] sm:h-[48px]">
            <Button
              onClick={onGenerate}
              disabled={loading || !prompt.trim()}
              isLoading={loading}
              className="w-full sm:w-auto text-xs sm:text-sm px-6 sm:px-8 h-[44px] sm:h-[48px]"
            >
              {loading ? 'Generating...' : 'Generate'}
            </Button>
          </div>
        </div>
      </div>

      {/* Popular Tags */}
      <div className="mt-3 sm:mt-4 flex items-start sm:items-center gap-2 flex-wrap">
        <span className="text-[10px] sm:text-xs text-white/60 pt-1 sm:pt-0">Popular:</span>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {POPULAR_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setPrompt(tag)}
              className="glass-button px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs text-white/80 hover:text-white rounded-full transition-all touch-manipulation"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-3 sm:mt-4 p-2.5 sm:p-3 glass-effect bg-red-500/10 border-red-500/30 rounded-lg sm:rounded-xl text-red-200 text-xs sm:text-sm text-center"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

