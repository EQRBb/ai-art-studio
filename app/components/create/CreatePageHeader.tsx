'use client'

import { motion } from 'framer-motion'

export function CreatePageHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-8 sm:mb-12"
    >
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
        Create{' '}
        <span className="text-gradient animate-gradient">
          AI Art
        </span>
      </h1>
      <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
        Generate stunning images from text descriptions using AI
      </p>
    </motion.div>
  )
}

