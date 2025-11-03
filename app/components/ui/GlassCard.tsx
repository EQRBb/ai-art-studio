import { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  padding?: 'sm' | 'md' | 'lg'
}

const paddingClasses = {
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
}

export function GlassCard({ children, className = '', padding = 'md' }: GlassCardProps) {
  return (
    <div className={`glass-effect rounded-2xl ${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  )
}

