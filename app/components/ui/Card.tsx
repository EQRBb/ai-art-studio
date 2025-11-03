'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface CardProps {
  children: ReactNode
  className?: string
  animated?: boolean
  delay?: number
}

export function Card({ children, className = '', animated = false, delay = 0 }: CardProps) {
  const cardClasses = `glass-effect rounded-2xl shadow-xl ${className}`

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay }}
        className={cardClasses}
      >
        {children}
      </motion.div>
    )
  }

  return <div className={cardClasses}>{children}</div>
}

