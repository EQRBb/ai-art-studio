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
      className="text-center pt-4 sm:pt-6 md:pt-8 lg:pt-10 pb-12 sm:pb-16 md:pb-20 lg:pb-24 px-4"
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
      
      {/* CTA Button with enhanced animations */}
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
          className="relative text-white text-base sm:text-lg md:text-xl px-10 sm:px-14 md:px-20 py-5 sm:py-6 md:py-7 rounded-2xl font-bold shadow-2xl overflow-hidden group cursor-pointer"
          onClick={() => router.push('/create')}
          whileHover={{ 
            scale: 1.08,
            y: -5
          }}
          whileTap={{ scale: 0.98 }}
          style={{
            background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.9) 0%, rgba(236, 72, 153, 0.9) 50%, rgba(59, 130, 246, 0.9) 100%)',
          }}
        >
          {/* Animated gradient border */}
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-75 blur-xl"
            animate={{
              background: [
                "linear-gradient(45deg, #a855f7, #ec4899, #3b82f6, #a855f7)",
                "linear-gradient(90deg, #ec4899, #3b82f6, #a855f7, #ec4899)",
                "linear-gradient(135deg, #3b82f6, #a855f7, #ec4899, #3b82f6)",
                "linear-gradient(180deg, #a855f7, #ec4899, #3b82f6, #a855f7)",
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
            }}
            animate={{
              x: ['-100%', '200%']
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Main background with glass effect */}
          <div className="absolute inset-[2px] rounded-2xl backdrop-blur-xl"
            style={{
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.8) 0%, rgba(236, 72, 153, 0.8) 50%, rgba(59, 130, 246, 0.8) 100%)',
            }}
          />

          {/* Pulsing glow effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            animate={{
              boxShadow: [
                "0 0 20px rgba(168, 85, 247, 0.5), 0 0 40px rgba(236, 72, 153, 0.3)",
                "0 0 40px rgba(168, 85, 247, 0.8), 0 0 80px rgba(236, 72, 153, 0.5)",
                "0 0 20px rgba(168, 85, 247, 0.5), 0 0 40px rgba(236, 72, 153, 0.3)"
              ]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Button text */}
          <span className="relative z-10 flex items-center gap-3 select-none font-extrabold tracking-wide">
            <motion.span
              className="text-2xl"
              animate={{ 
                rotate: [0, 15, -15, 0],
                scale: [1, 1.2, 1.2, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              ✨
            </motion.span>
            Get Started
            <motion.span
              className="text-xl"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </span>
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

