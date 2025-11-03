import { useRef, useEffect, forwardRef, TextareaHTMLAttributes } from 'react'

interface AutoResizeTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string
}

export const AutoResizeTextarea = forwardRef<HTMLTextAreaElement, AutoResizeTextareaProps>(
  ({ value, className = '', ...props }, ref) => {
    const internalRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
      const textarea = (ref && typeof ref === 'object' && ref.current) || internalRef.current
      if (textarea) {
        textarea.style.height = 'auto'
        textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`
      }
    }, [value, ref])

    // Merge refs properly
    const setRefs = (element: HTMLTextAreaElement | null) => {
      internalRef.current = element
      if (typeof ref === 'function') {
        ref(element)
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = element
      }
    }

    return (
      <textarea
        ref={setRefs}
        value={value}
        {...props}
        className={`glass-input flex-1 px-4 py-3 rounded-xl text-white text-sm placeholder-white/50 focus:outline-none transition-all resize-none min-h-[48px] max-h-[200px] ${className}`}
      />
    )
  }
)

AutoResizeTextarea.displayName = 'AutoResizeTextarea'

