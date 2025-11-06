'use client'

import { RefObject, useState, useEffect, useCallback, useRef } from 'react'
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
  // Undo/Redo state
  const [history, setHistory] = useState<string[]>([''])
  const [historyIndex, setHistoryIndex] = useState(0)
  const isUndoRedoRef = useRef(false)
  const historyRef = useRef(history)
  const historyIndexRef = useRef(historyIndex)

  // Keep refs in sync
  useEffect(() => {
    historyRef.current = history
    historyIndexRef.current = historyIndex
  }, [history, historyIndex])

  // Update history when prompt changes (but not from undo/redo)
  useEffect(() => {
    if (isUndoRedoRef.current) {
      isUndoRedoRef.current = false
      return
    }

    const currentHistory = historyRef.current
    const currentIndex = historyIndexRef.current

    if (prompt !== currentHistory[currentIndex]) {
      const newHistory = currentHistory.slice(0, currentIndex + 1)
      newHistory.push(prompt)
      // Limit history to last 50 entries
      const finalHistory = newHistory.length > 50 ? newHistory.slice(-50) : newHistory
      setHistoryIndex(finalHistory.length - 1)
      setHistory(finalHistory)
    }
  }, [prompt])

  const handleClear = useCallback(() => {
    setPrompt('')
    promptInputRef.current?.focus()
  }, [setPrompt, promptInputRef])

  const handleUndo = useCallback((e: React.KeyboardEvent) => {
    if (historyIndex > 0) {
      e.preventDefault()
      const newIndex = historyIndex - 1
      isUndoRedoRef.current = true
      setHistoryIndex(newIndex)
      setPrompt(history[newIndex])
    }
  }, [history, historyIndex, setPrompt])

  const handleRedo = useCallback((e: React.KeyboardEvent) => {
    if (historyIndex < history.length - 1) {
      e.preventDefault()
      const newIndex = historyIndex + 1
      isUndoRedoRef.current = true
      setHistoryIndex(newIndex)
      setPrompt(history[newIndex])
    }
  }, [history, historyIndex, setPrompt])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Escape key to clear
    if (e.key === 'Escape' && !loading && prompt.trim()) {
      e.preventDefault()
      handleClear()
      return
    }

    // Ctrl/Cmd + Enter to generate
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey) && !loading && prompt.trim()) {
      e.preventDefault()
      handleGenerate()
      return
    }

    // Undo/Redo support
    if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key === 'z') {
      handleUndo(e)
      return
    }

    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'z') {
      handleRedo(e)
      return
    }
  }, [loading, prompt, handleClear, handleGenerate, handleUndo, handleRedo])

  const handlePaste = useCallback((e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const pastedText = e.clipboardData.getData('text')
    // Trim whitespace from pasted content
    if (pastedText !== pastedText.trim()) {
      e.preventDefault()
      const currentValue = promptInputRef.current?.value || prompt
      const selectionStart = promptInputRef.current?.selectionStart || 0
      const selectionEnd = promptInputRef.current?.selectionEnd || 0
      const newValue = 
        currentValue.slice(0, selectionStart) + 
        pastedText.trim() + 
        currentValue.slice(selectionEnd)
      setPrompt(newValue)
      // Restore cursor position after state update
      setTimeout(() => {
        if (promptInputRef.current) {
          const newCursorPos = selectionStart + pastedText.trim().length
          promptInputRef.current.setSelectionRange(newCursorPos, newCursorPos)
        }
      }, 0)
    }
  }, [prompt, promptInputRef, setPrompt])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      <div className="glass-effect rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl">
        {/* Horizontal Input Container */}
        <div 
          className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-end"
          aria-label="Image generation prompt"
        >
          {/* Textarea - Takes most of the space */}
          <div className="flex-1 min-w-0">
            <AutoResizeTextarea
              ref={promptInputRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              placeholder="Describe the image you want to create, in any language"
              disabled={loading}
              rows={3}
              className="w-full min-h-[100px] sm:min-h-[120px] text-base sm:text-lg max-h-[300px]"
            />
          </div>

          {/* Action Buttons - Horizontal on mobile, vertical on desktop */}
          <div className="flex sm:flex-col gap-2 sm:gap-2 shrink-0">
            {/* Clear Button - Only show if there's text */}
            <motion.button
              animate={{ 
                opacity: prompt.trim() && !loading ? 1 : 0,
                scale: prompt.trim() && !loading ? 1 : 0.9
              }}
              transition={{ 
                duration: 0.25, 
                ease: [0.4, 0, 0.2, 1]
              }}
              onClick={handleClear}
              style={{
                pointerEvents: prompt.trim() && !loading ? 'auto' : 'none'
              }}
              className="glass-button h-11 sm:h-11 px-4 sm:px-6 flex items-center justify-center gap-2 text-white/80 hover:text-white hover:bg-white/15 transition-colors rounded-xl text-sm sm:text-base font-medium"
              aria-label="Clear prompt"
              aria-hidden={!prompt.trim() || loading}
              tabIndex={prompt.trim() && !loading ? 0 : -1}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
              >
                <path
                  d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="hidden sm:inline">Clear</span>
            </motion.button>

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              isLoading={loading}
              className="h-11 sm:h-11 px-6 sm:px-8 text-base sm:text-lg font-bold min-w-[120px] sm:min-w-[140px]"
            >
              {loading ? 'Generating...' : 'Generate'}
            </Button>
          </div>
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

        {/* Helper Text */}
        <div className="mt-3 flex items-center justify-between text-xs sm:text-sm text-white/50">
          <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
            <span>Press Ctrl/Cmd + Enter to generate</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Esc to clear</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Ctrl/Cmd + Z to undo</span>
          </div>
          <span className="hidden sm:inline">
            {prompt.length > 0 && (
              <span className={prompt.length > 1000 ? 'text-yellow-400' : 'text-white/50'}>
                {prompt.length} {prompt.length === 1 ? 'character' : 'characters'}
              </span>
            )}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
