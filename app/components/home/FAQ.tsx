'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FAQ_ITEMS } from '@/app/constants'

export function FAQ() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="glass-effect rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-xl"
    >
      <div className="flex items-center gap-2 mb-4 sm:mb-5">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-white font-bold text-base sm:text-lg">
          Common Questions
        </h2>
      </div>
      
      <div className="space-y-1 sm:space-y-2">
        {FAQ_ITEMS.slice(0, 3).map((faq, index) => (
          <div key={index} className="border-b border-white/5 last:border-0">
            <button
              onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
              className="w-full text-left p-2.5 sm:p-3 rounded-lg transition-all hover:bg-white/5 flex items-center justify-between group"
            >
              <span className="text-white text-xs sm:text-sm font-medium pr-3">
                {faq.question}
              </span>
              <motion.svg
                className="w-4 h-4 text-purple-400 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </button>
            <AnimatePresence>
              {expandedFaq === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-2.5 sm:px-3 pb-2.5 sm:pb-3 text-white/60 text-xs sm:text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

