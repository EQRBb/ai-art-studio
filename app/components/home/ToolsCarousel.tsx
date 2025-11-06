'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

interface Tool {
  id: string
  title: string
  description: string
  badge: string
  buttonText: string
  providers?: string[]
  imagePlaceholder: string
}

const tools: Tool[] = [
  {
    id: 'ai-image',
    title: 'AI Image Generation',
    description: 'Turn your ideas into stunning visuals with cutting-edge AI models',
    badge: 'AI Image',
    buttonText: 'Explore AI Image',
    providers: ['Stable Diffusion XL', 'FLUX', 'Midjourney v6'],
    imagePlaceholder: 'bg-gradient-to-br from-purple-600 via-pink-500 to-purple-700'
  },
  {
    id: 'ai-upscale',
    title: 'AI Upscaling',
    description: 'Enhance your images to 4K quality with advanced AI upscaling',
    badge: 'AI Upscale',
    buttonText: 'Explore AI Upscale',
    providers: ['Real-ESRGAN', 'GFPGAN', 'CodeFormer'],
    imagePlaceholder: 'bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-700'
  },
  {
    id: 'ai-enhance',
    title: 'AI Enhancement',
    description: 'Perfect your images with intelligent enhancement and restoration',
    badge: 'AI Enhance',
    buttonText: 'Explore AI Enhance',
    providers: ['DeepAI', 'Remini', 'Let\'s Enhance'],
    imagePlaceholder: 'bg-gradient-to-br from-pink-600 via-rose-500 to-pink-700'
  }
]

export function ToolsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % tools.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + tools.length) % tools.length)
  }

  const getSlidePosition = (index: number) => {
    const diff = index - currentIndex
    if (diff === 0) return 'center'
    if (diff === 1 || diff === -(tools.length - 1)) return 'right'
    if (diff === -1 || diff === tools.length - 1) return 'left'
    return 'hidden'
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative px-4 py-12 md:py-16 lg:py-20"
    >
      {/* Section Title */}
      <motion.h2
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-6 md:mb-10 lg:mb-16"
        animate={{
          textShadow: [
            "0 0 20px rgba(168, 85, 247, 0.3)",
            "0 0 30px rgba(168, 85, 247, 0.5)",
            "0 0 20px rgba(168, 85, 247, 0.3)"
          ]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        Advanced AI Tools,
        <br />
        <span className="text-gradient animate-gradient">Built for Creators</span>
      </motion.h2>

      {/* Desktop Carousel */}
      <div className="hidden md:block relative h-[500px] lg:h-[600px] mb-8">
        <div className="relative w-full h-full flex items-center justify-center">
         
          {tools.map((tool, index) => {
            const position = getSlidePosition(index)
            
            return (
              <motion.div
                key={tool.id}
                className="absolute top-1/2 left-1/2"
                initial={false}
                animate={{
                  x: position === 'center' ? '-50%' : position === 'left' ? '-125%' : '25%',
                  y: '-50%',
                  scale: position === 'center' ? 1 : 0.75,
                  opacity: position === 'center' ? 1 : 0.5,
                  zIndex: position === 'center' ? 30 : 20,
                }}
                transition={{
                  duration: 0.5,
                  ease: 'easeInOut'
                }}
                style={{
                  width: '59%',
                  display: position === 'hidden' ? 'none' : 'block'
                }}
              >
                <ToolCard tool={tool} isCenter={position === 'center'} />
              </motion.div>
            )
          })}

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-[10%] top-1/2 -translate-y-1/2 z-40 text-white hover:text-purple-400 transition-colors p-4 group"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-10 group-hover:scale-110 transition-transform" viewBox="0 0 15 27" fill="none">
              <path d="M13.5 25.5L1.5 13.5L13.5 1.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-[10%] top-1/2 -translate-y-1/2 z-40 text-white hover:text-purple-400 transition-colors p-4 group"
            aria-label="Next slide"
          >
            <svg className="w-6 h-10 group-hover:scale-110 transition-transform" viewBox="0 0 15 27" fill="none">
              <path d="M1.5 25.5L13.5 13.5L1.5 1.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Carousel */}
      <div className="md:hidden">
        {/* Tab buttons */}
        <div className="flex justify-around mb-6 gap-2">
          {tools.map((tool, index) => (
            <button
              key={tool.id}
              onClick={() => setCurrentIndex(index)}
              className={`text-sm font-light uppercase tracking-wider transition-all duration-300 px-4 py-2 rounded-lg ${
                currentIndex === index
                  ? 'text-white opacity-100 glass-effect'
                  : 'text-white/40 opacity-60'
              }`}
            >
              {tool.badge}
            </button>
          ))}
        </div>

        {/* Mobile Cards */}
        <div className="overflow-x-auto snap-x snap-mandatory flex gap-4 pb-4">
          {tools.map((tool, index) => (
            <div
              key={tool.id}
              className="snap-center flex-shrink-0 w-[85%]"
            >
              <ToolCard tool={tool} isCenter={currentIndex === index} isMobile />
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

interface ToolCardProps {
  tool: Tool
  isCenter: boolean
  isMobile?: boolean
}

function ToolCard({ tool, isCenter, isMobile = false }: ToolCardProps) {
  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden"
      whileHover={isCenter ? { y: -5 } : {}}
      transition={{ duration: 0.3 }}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
        {/* Placeholder Image with gradient */}
        <div className={`w-full h-full ${tool.imagePlaceholder}`} />
        
        {/* Bottom blur effect */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Badge */}
        <div className="absolute top-4 left-4 z-10">
          <div className="glass-effect px-4 py-2 rounded-xl backdrop-blur-xl border border-white/20">
            <span className="text-white text-sm font-medium uppercase tracking-wider">
              {tool.badge}
            </span>
          </div>
        </div>

        {/* Provider Logos */}
        {tool.providers && (
          <div className="absolute bottom-4 left-4 right-4 z-10">
            <div className="flex flex-wrap gap-2">
              {tool.providers.map((provider, index) => (
                <div
                  key={index}
                  className="glass-effect px-3 py-1.5 rounded-lg backdrop-blur-md border border-white/10"
                >
                  <span className="text-white/90 text-xs font-medium">
                    {provider}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Content - Only visible on center slide */}
      {(isCenter || isMobile) && (
        <div className="mt-6 text-center px-4 space-y-4">
          <p className="text-white text-base md:text-lg font-normal leading-relaxed">
            {tool.description}
          </p>
          
          {/* CTA Button */}
          <motion.button
            className="relative text-white text-base px-8 py-3.5 rounded-full font-medium overflow-hidden group border border-white/20 hover:border-purple-400/50 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            style={{
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)',
            }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-500/20 to-purple-600/20 blur-xl" />
            </div>

            {/* Button content */}
            <span className="relative z-10 flex items-center justify-center gap-2">
              {tool.buttonText}
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </motion.button>
        </div>
      )}
    </motion.div>
  )
}

