'use client'

import { motion } from 'framer-motion'

export default function GenerationAnimation() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      {/* Animated Circle */}
      <div className="relative w-24 h-24 mb-6">
        {/* Outer rings */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border-2 border-purple-500/30"
            initial={{ scale: 1, opacity: 0 }}
            animate={{
              scale: [1, 1.5, 2],
              opacity: [0.5, 0.2, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.4,
              ease: 'easeOut',
            }}
          />
        ))}
        
        {/* Center spinning circle */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <div className="w-[72px] h-[72px] rounded-full bg-slate-950 flex items-center justify-center">
            <motion.svg
              className="w-9 h-9 text-purple-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </motion.svg>
          </div>
        </motion.div>
      </div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <motion.h3
          className="text-lg font-bold text-white mb-1.5"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          Creating Your Masterpiece
        </motion.h3>
        <p className="text-white/60 text-sm">
          This magical process takes ~30 seconds...
        </p>
      </motion.div>

      {/* Progress dots */}
      <div className="flex gap-1.5 mt-6">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-purple-500"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Steps indicator */}
      <div className="mt-6 text-center">
        <div className="flex items-center gap-1.5 text-xs text-white/50">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-green-500"
            animate={{
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
          />
          <span>Processing 30 inference steps...</span>
        </div>
      </div>
    </div>
  )
}
