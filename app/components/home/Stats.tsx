'use client'

import { motion } from 'framer-motion'

const stats = [
  { value: '1M+', label: 'Images Generated' },
  { value: '50K+', label: 'Happy Users' },
  { value: '4.9/5', label: 'User Rating' },
  { value: '30s', label: 'Avg Generation' },
]

export function Stats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-8 sm:mt-12"
    >
      <div className="glass-effect rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient animate-gradient mb-1 sm:mb-2">
                {stat.value}
              </div>
              <div className="text-[10px] sm:text-xs text-white/60 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

