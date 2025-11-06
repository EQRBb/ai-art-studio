'use client'

import { motion } from 'framer-motion'
import { Template } from '@/lib/templates'
import { useState } from 'react'
import Link from 'next/link'

interface TemplateCardProps {
  template: Template
  index?: number
}

export function TemplateCard({ template, index = 0 }: TemplateCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getCategoryBadge = () => {
    if (template.category === 'top-choice') {
      return (
        <span className="absolute top-3 left-3 px-2.5 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold rounded-full shadow-lg z-10">
          ⭐ Top Choice
        </span>
      )
    }
    if (template.category === 'mixed') {
      return (
        <span className="absolute top-3 left-3 px-2.5 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] font-bold rounded-full shadow-lg z-10">
          ✨ Mixed
        </span>
      )
    }
    if (template.category === 'popular') {
      return (
        <span className="absolute top-3 left-3 px-2.5 py-1 bg-gradient-to-r from-red-500 to-rose-500 text-white text-[10px] font-bold rounded-full shadow-lg z-10">
          🔥 Popular
        </span>
      )
    }
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index < 12 ? index * 0.05 : 0 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      <div className="relative aspect-square rounded-xl overflow-hidden bg-black/50 border border-white/10">
        {/* Category Badge */}
        {getCategoryBadge()}

        {/* Image */}
        <img
          src={template.thumbnailUrl}
          alt={template.name}
          loading={index < 6 ? 'eager' : 'lazy'}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Hover Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
        />

        {/* Bottom Content - Always Visible */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
          {/* Template Name - Always visible */}
          <h3 className="text-white font-semibold text-sm mb-1 line-clamp-1">
            {template.name}
          </h3>

          {/* Description - Show on hover */}
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: isHovered ? 1 : 0, 
              height: isHovered ? 'auto' : 0 
            }}
            transition={{ duration: 0.2 }}
            className="text-white/70 text-xs mb-3 line-clamp-2"
          >
            {template.description}
          </motion.p>

          {/* Generate Button - Show on hover */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: isHovered ? 1 : 0, 
              y: isHovered ? 0 : 10 
            }}
            transition={{ duration: 0.2, delay: 0.05 }}
          >
            <Link
              href={`/create?template=${template.id}`}
              className="inline-flex items-center justify-center w-full px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm font-semibold rounded-lg transition-all shadow-lg hover:shadow-purple-500/50"
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Generate
            </Link>
          </motion.div>
        </div>

        {/* Gradient overlay for bottom text readability - Always there */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
      </div>
    </motion.div>
  )
}

