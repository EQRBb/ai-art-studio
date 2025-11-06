'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

interface Testimonial {
  text: string
  author: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    text: "This image generator completely transformed how I create content for my social media. The quality is stunning and it's so intuitive!",
    author: "Sarah Mitchell",
    rating: 5
  },
  {
    text: "I've been using AI image tools for months, but this one stands out. The gallery feature makes it easy to organize and revisit my creations.",
    author: "Michael Chen",
    rating: 5
  },
  {
    text: "As a designer, I was skeptical at first, but the results are genuinely impressive. It's become an essential part of my creative workflow.",
    author: "Jessica Rodriguez",
    rating: 5
  },
  {
    text: "The speed and quality are unmatched. I can generate dozens of variations in minutes and the interface is so clean and responsive!",
    author: "David Thompson",
    rating: 5
  },
  {
    text: "Finally, an AI image tool that just works. No complicated settings, no confusing menus - just beautiful results every time.",
    author: "Emily Watson",
    rating: 5
  },
  {
    text: "I use this daily for my marketing campaigns. The ability to quickly generate professional-looking images has saved me countless hours and money.",
    author: "Robert Martinez",
    rating: 5
  },
  {
    text: "The quality of images is incredible! I've used several AI generators and this produces the most consistent, high-quality results.",
    author: "Amanda Park",
    rating: 5
  },
  {
    text: "What impressed me most is how well it understands prompts. Even complex descriptions come out exactly as I imagined them.",
    author: "Chris Anderson",
    rating: 5
  }
]

export function Testimonials() {
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set())
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const toggleCard = (index: number) => {
    const newExpanded = new Set(expandedCards)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedCards(newExpanded)
  }

  // Scroll to center on mount
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const scrollWidth = container.scrollWidth
      const clientWidth = container.clientWidth
      const centerPosition = (scrollWidth - clientWidth) / 2
      
      // Smooth scroll to center
      container.scrollTo({
        left: centerPosition,
        behavior: 'smooth'
      })
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
        >
      {/* Heading */}
      <motion.h3
        className="pb-6 text-2xl font-bold text-center text-white md:text-5xl"
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
        50,000+ users and counting!
      </motion.h3>

      {/* Scrollable testimonials container */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto relative gap-x-6 md:gap-x-8 justify-start py-6 pb-8 px-4 mx-auto mb-8 w-full text-base text-center text-white md:justify-start md:max-w-full snap-mandatory snap-x"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(139, 92, 246, 0.3) transparent',
          overflowY: 'visible'
        }}
      >
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col gap-y-3 justify-start items-center px-5 py-7 w-80 md:w-96 rounded-3xl border-2 min-w-[280px] snap-center backdrop-blur-xl shadow-lg relative"
            style={{
              background: 'rgba(30, 20, 50, 0.7)',
              borderColor: 'rgba(139, 92, 246, 0.6)',
            }}
            whileHover={{ 
              scale: 1.02, 
              y: -6,
              borderColor: 'rgba(168, 85, 247, 0.9)',
              boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)',
              zIndex: 10,
              transition: { duration: 0.2 }
            }}
          >
            {/* Star rating */}
            <div className="flex gap-1 mb-2">
              {[...Array(testimonial.rating)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 text-yellow-400"
                  style={{ filter: 'drop-shadow(0 0 2px rgba(251, 191, 36, 0.4))' }}
                >
                  <path
                    fillRule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
            </div>

            {/* Testimonial content */}
            <div className="flex flex-col w-full h-full min-h-[140px]">
              <div
                className={`flex-grow relative text-wrap text-white font-semibold leading-relaxed ${
                  expandedCards.has(index) ? '' : 'line-clamp-4 md:line-clamp-none'
                }`}
              >
                {testimonial.text}
              </div>

              {/* Read more button for mobile */}
              {testimonial.text.length > 80 && (
                <button
                  onClick={() => toggleCard(index)}
                  className="mt-2 text-sm text-center text-purple-400 hover:text-purple-300 md:hidden transition-colors"
                >
                  {expandedCards.has(index) ? 'Show less' : 'Read more'}
                </button>
              )}

              {/* Author */}
              <div className="mt-auto text-sm text-gray-400 pt-3">
                - {testimonial.author}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        div::-webkit-scrollbar {
          height: 8px;
        }
        div::-webkit-scrollbar-track {
          background: transparent;
        }
        div::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.3);
          border-radius: 4px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.5);
        }
      `}</style>
    </motion.div>
  )
}

