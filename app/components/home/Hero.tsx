'use client'

import { motion } from 'framer-motion'

export function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <div className="inline-block mb-3 sm:mb-4">
        <span className="glass-effect px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-medium text-purple-300 border border-purple-500/30">
          ✨ Powered by Stable Diffusion XL
        </span>
      </div>
      
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
        Create Stunning{' '}
        <span className="text-gradient animate-gradient">
          AI Art
        </span>
        <br />
        in Seconds
      </h1>
      
      <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-3xl mx-auto px-4 sm:px-0 mb-2">
        Transform your ideas into beautiful images with AI. Free, fast, and unlimited.
      </p>
    </motion.div>
  )
}

