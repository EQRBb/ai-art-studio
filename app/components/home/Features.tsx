'use client'

import { motion } from 'framer-motion'
import { FEATURE_CARDS } from '@/app/constants'

export function Features() {
  return (
    <div className="border-t border-white/5">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 px-4">
            Why Choose <span className="text-gradient animate-gradient">AI Studio</span>
          </h2>
          <p className="text-sm sm:text-base text-white/60 max-w-2xl mx-auto px-4">
            Everything you need to create amazing AI-generated images
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {FEATURE_CARDS.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="glass-effect rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 shadow-xl hover:shadow-purple-500/20 transition-all group cursor-pointer"
            >
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{card.icon}</div>
              <h3 className="text-white font-bold text-base sm:text-lg lg:text-xl mb-2 sm:mb-3">{card.title}</h3>
              <p className="text-white/60 text-xs sm:text-sm mb-4 leading-relaxed">
                {card.description}
              </p>
              <div className="flex items-center gap-1.5 sm:gap-2 text-purple-400 hover:text-purple-300 text-xs sm:text-sm font-medium group-hover:gap-2 sm:group-hover:gap-3 transition-all">
                <span>{card.link}</span>
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

