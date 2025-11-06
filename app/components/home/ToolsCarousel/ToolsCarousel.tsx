'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface Tool {
  id: string
  title: string
  description: string
  badge: string
  buttonText: string
  route: string
  providers?: string[]
  imageUrl: string
}

const tools: Tool[] = [
  {
    id: 'generator',
    title: 'Image Generator',
    description: 'Create high-quality images from your ideas using our intuitive generator.',
    badge: 'Generator',
    buttonText: 'Try Generator',
    route: '/create',
    imageUrl: '/images/carousel/generator.jpg'
  },
  {
    id: 'community-gallery',
    title: 'Community Gallery',
    description: 'Explore a vibrant collection of images created by people just like you.',
    badge: 'Gallery',
    buttonText: 'View Gallery',
    route: '/gallery',
    imageUrl: '/images/carousel/galery.jpg'
  },
  {
    id: 'teamleates',
    title: 'Teamleates',
    description: 'Browse templates for inspiration and a quick start to your creations.',
    badge: 'Teamleates',
    buttonText: 'Browse Templates',
    route: '/templates',
    imageUrl: '/images/carousel/faq.jpg'
  }
]

export function ToolsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const router = useRouter()

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
      className="relative px-4 py-12 md:py-16 lg:py-24 overflow-x-hidden"
    >
      {/* Section Title */}
      <motion.h2
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-8 md:mb-12 lg:mb-20"
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
      <div className="hidden md:block relative h-[550px] lg:h-[650px] xl:h-[700px] mb-8 mt-4 md:mt-8">
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
                  <ToolCard tool={tool} isCenter={position === 'center'} router={router} />
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
      <div className="md:hidden mt-4">
      

        {/* Mobile Cards */}
        <div className="-mx-4 px-4 overflow-x-auto snap-x snap-mandatory flex gap-4 pb-4">
          {tools.map((tool, index) => (
            <div
              key={tool.id}
              className="snap-center flex-shrink-0 w-[85%]"
            >
              <ToolCard tool={tool} isCenter={currentIndex === index} isMobile router={router} />
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
  router: any
}

function ToolCard({ tool, isCenter, isMobile = false, router }: ToolCardProps) {
  const handleClick = () => {
    if (tool.route.startsWith('#')) {
      // Scroll to anchor
      const element = document.querySelector(tool.route)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } else {
      // Navigate to route
      router.push(tool.route)
    }
  }
  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden"
      whileHover={isCenter ? { y: -5 } : {}}
      transition={{ duration: 0.3 }}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
        {/* Image */}
        <Image
          src={tool.imageUrl}
          alt={tool.title}
          fill
          className="object-cover"
          priority={isCenter}
        />
        
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
        <div className="mt-6 mb-4 text-center px-4 space-y-4">
          <p className="text-white text-base md:text-lg font-normal leading-relaxed">
            {tool.description}
          </p>
          
          {/* CTA Button */}
          <motion.button
            onClick={handleClick}
            className="relative text-white text-base px-8 py-3.5 rounded-full font-medium overflow-hidden group border border-white/20 hover:border-purple-400/50 transition-all cursor-pointer"
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

