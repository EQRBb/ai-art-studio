'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-effect max-w-2xl mx-auto p-6 sm:p-10 rounded-xl sm:rounded-2xl text-center"
    >
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5">
        <svg className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-2.5 px-4">Your Gallery is Empty</h2>
      <p className="text-white/70 text-xs sm:text-sm mb-5 sm:mb-6 px-4">
        Start creating amazing AI-generated images to fill your gallery!
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs sm:text-sm rounded-lg sm:rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all hover:scale-105 shadow-lg font-semibold touch-manipulation"
      >
        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Generate Your First Image
      </Link>
    </motion.div>
  )
}

