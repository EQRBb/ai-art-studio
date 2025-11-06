'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FAQ_ITEMS } from '@/app/constants'

export function FAQ() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  return (
    <section className="w-full relative py-8 sm:py-12 px-3 sm:px-4 md:px-6">
      <motion.div
        id="faq"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-4xl mx-auto"
      >
        {/* Section Heading */}
        <motion.h2
          className="text-2xl sm:text-4xl font-bold text-center text-white mb-8 sm:mb-12"
          animate={{
            textShadow: [
              "0 0 15px rgba(168, 85, 247, 0.2)",
              "0 0 25px rgba(168, 85, 247, 0.4)",
              "0 0 15px rgba(168, 85, 247, 0.2)"
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Frequently Asked Questions
        </motion.h2>

        {/* FAQ Items */}
        <div className="space-y-3 sm:space-y-4">
          {FAQ_ITEMS.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl sm:rounded-3xl border-2 backdrop-blur-xl shadow-lg relative overflow-hidden"
              style={{
                background: 'rgba(30, 20, 50, 0.7)',
                borderColor: 'rgba(139, 92, 246, 0.6)',
              }}
              whileHover={{
                scale: 1.01,
                y: -4,
                borderColor: 'rgba(168, 85, 247, 0.9)',
                boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)',
                transition: { duration: 0.2 }
              }}
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                className="w-full text-left p-4 sm:p-6 transition-all flex items-start sm:items-center justify-between group gap-4"
              >
                <span className="text-white text-sm sm:text-lg font-semibold pr-2 leading-relaxed">
                  {faq.question}
                </span>
                <motion.svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 flex-shrink-0 mt-0.5 sm:mt-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{
                    filter: 'drop-shadow(0 0 4px rgba(168, 85, 247, 0.4))'
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </motion.svg>
              </button>
              
              <AnimatePresence>
                {expandedFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-0">
                      <div className="text-white/70 text-sm sm:text-base leading-relaxed border-t border-white/10 pt-4">
                        {faq.answer}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Decorative elements */}
        <motion.div
          className="flex justify-center gap-2 mt-8 sm:mt-12 opacity-50"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-2 h-2 rounded-full bg-purple-400"></div>
          <div className="w-2 h-2 rounded-full bg-pink-400"></div>
          <div className="w-2 h-2 rounded-full bg-blue-400"></div>
        </motion.div>
      </motion.div>
    </section>
  )
}

