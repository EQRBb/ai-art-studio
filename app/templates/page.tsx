'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { templates, getTemplatesByCategory } from '@/lib/templates'
import { TemplatesGrid, CategoryFilter } from '@/app/components/templates'

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredTemplates = getTemplatesByCategory(selectedCategory)

  return (
    <div className="relative min-h-screen">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 px-4">
            <span className="text-gradient animate-gradient">
              AI Templates
            </span>
          </h1>
          <p className="text-white/70 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4 mb-2">
            Choose from our curated collection of stunning AI art styles and effects.
            From cinematic visuals to artistic masterpieces.
          </p>
          <p className="text-white/50 text-xs sm:text-sm">
            {filteredTemplates.length} {filteredTemplates.length === 1 ? 'template' : 'templates'} available
          </p>
        </motion.div>

        {/* Category Filter */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Templates Grid */}
        {filteredTemplates.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-effect max-w-2xl mx-auto p-8 sm:p-12 rounded-xl sm:rounded-2xl text-center"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">No Templates Found</h2>
            <p className="text-white/70 text-sm">
              Try selecting a different category
            </p>
          </motion.div>
        ) : (
          <TemplatesGrid templates={filteredTemplates} />
        )}

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <div className="glass-effect inline-block px-6 py-4 rounded-xl">
            <p className="text-white/70 text-xs sm:text-sm">
              💡 <span className="font-semibold text-white">Pro Tip:</span> Click any template to start creating with that style instantly
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

