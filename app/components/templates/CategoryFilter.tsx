'use client'

import { motion } from 'framer-motion'
import { TEMPLATE_CATEGORIES } from '@/lib/templates'

interface CategoryFilterProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-8 sm:mb-10">
      {TEMPLATE_CATEGORIES.map((category, index) => {
        const isSelected = selectedCategory === category.id
        return (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`
              relative px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl
              text-xs sm:text-sm font-medium transition-all duration-300
              ${isSelected
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30 scale-105'
                : 'glass-effect text-white/70 hover:text-white hover:bg-white/10'
              }
            `}
          >
            <span className="relative z-10 flex items-center gap-1.5">
              <span className="text-sm sm:text-base">{category.icon}</span>
              <span>{category.label}</span>
            </span>
          </button>
        )
      })}
    </div>
  )
}

