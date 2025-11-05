'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation';

export function Hero() {
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center py-12 sm:py-16 md:py-20 lg:py-24 px-4"
    >
      {/* Badge with floating animation */}
      <motion.div 
        className="inline-block mb-6 sm:mb-8"
        animate={{ 
          y: [0, -10, 0],
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <span className="glass-effect px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium text-purple-300 border border-purple-500/30 shadow-lg shadow-purple-500/20">
          ✨ Powered by Stable Diffusion XL
        </span>
      </motion.div>
      
      {/* Main heading with stagger animation */}
      <motion.h1 
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 sm:mb-8 md:mb-10 leading-tight"
        animate={{
          textShadow: [
            "0 0 20px rgba(168, 85, 247, 0.4)",
            "0 0 40px rgba(168, 85, 247, 0.6)",
            "0 0 20px rgba(168, 85, 247, 0.4)"
          ]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        Create Stunning{' '}
        <span className="text-gradient animate-gradient">
          AI Art
        </span>
        <br />
        in Seconds
      </motion.h1>
      
      {/* Description */}
      <motion.p 
        className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 max-w-4xl mx-auto px-4 sm:px-0 mb-10 sm:mb-12 md:mb-16 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Transform your ideas into beautiful images with AI. Free, fast, and unlimited.
      </motion.p>
      
      {/* CTA Button with pulse and hover animations */}
      <motion.div
        className="flex justify-center items-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
        }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <motion.button 
          className="glass-button text-white text-base sm:text-lg md:text-xl px-8 sm:px-12 md:px-16 py-4 sm:py-5 md:py-6 rounded-2xl font-semibold shadow-2xl relative overflow-hidden group"
          onClick={() => router.push('/create')}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 0 40px rgba(168, 85, 247, 0.6)"
          }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              "0 10px 40px rgba(168, 85, 247, 0.3)",
              "0 10px 60px rgba(168, 85, 247, 0.5)",
              "0 10px 40px rgba(168, 85, 247, 0.3)"
            ]
          }}
          transition={{
            boxShadow: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          <span className="relative z-10 flex items-center gap-2 cursor-default select-none">
            Get Started
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-600/50 to-pink-600/50"
            animate={{
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.button>
      </motion.div>
      
      {/* Additional decorative elements with animations */}
      <motion.div
        className="mt-8 sm:mt-12 md:mt-16 flex justify-center gap-2 opacity-50"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-2 h-2 rounded-full bg-purple-400"></div>
        <div className="w-2 h-2 rounded-full bg-pink-400"></div>
        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
      </motion.div>
    </motion.div>
  )
}

