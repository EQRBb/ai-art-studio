export interface Template {
  id: string
  name: string
  description: string
  prompt: string
  category: 'top-choice' | 'popular' | 'mixed' | 'artistic' | 'cinematic' | 'nature' | 'abstract'
  thumbnailUrl: string
  featured?: boolean
}

export const TEMPLATE_CATEGORIES = [
  { id: 'all', label: 'All Templates', icon: '🎨' },
  { id: 'top-choice', label: 'Top Choice', icon: '⭐' },
  { id: 'popular', label: 'Popular', icon: '🔥' },
  { id: 'mixed', label: 'Mixed Effects', icon: '✨' },
  { id: 'artistic', label: 'Artistic', icon: '🎭' },
  { id: 'cinematic', label: 'Cinematic', icon: '🎬' },
  { id: 'nature', label: 'Nature', icon: '🌿' },
  { id: 'abstract', label: 'Abstract', icon: '🌀' },
] as const

export const templates: Template[] = [
  // Top Choice Templates
  {
    id: 'wireframe',
    name: 'Wireframe',
    description: 'Transform into a 3D wireframe visualization',
    prompt: 'A stunning wireframe 3D visualization, geometric lines, technological aesthetic, black background with neon cyan and purple lines, futuristic digital art, highly detailed',
    category: 'top-choice',
    thumbnailUrl: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80',
    featured: true,
  },
  {
    id: 'building-explosion',
    name: 'Building Explosion',
    description: 'Dramatic explosion with cinematic effects',
    prompt: 'Cinematic explosion scene, dramatic lighting, debris flying, smoke and fire, action movie style, high contrast, professional photography, ultra detailed',
    category: 'top-choice',
    thumbnailUrl: 'https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=800&q=80',
    featured: true,
  },
  {
    id: 'face-punch',
    name: 'Face Punch',
    description: 'Epic action shot with motion blur',
    prompt: 'Action shot punch effect, motion blur, dramatic lighting, particles flying, intense expression, cinematic photography, high speed capture',
    category: 'top-choice',
    thumbnailUrl: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800&q=80',
    featured: true,
  },
  {
    id: 'turning-metal',
    name: 'Turning Metal',
    description: 'Metallic transformation effect',
    prompt: 'Transformation into liquid metal, chrome surface, reflective metallic texture, T-1000 style, futuristic sci-fi, highly polished metal, professional CGI',
    category: 'top-choice',
    thumbnailUrl: 'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=800&q=80',
    featured: true,
  },
  {
    id: '3d-rotation',
    name: '3D Rotation',
    description: 'Dynamic 3D rotation with depth',
    prompt: '3D rotation effect, multiple angles, depth of field, dramatic perspective, motion blur, cinematic camera movement, professional 3D render',
    category: 'top-choice',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=800&q=80',
  },
  {
    id: 'disintegration',
    name: 'Disintegration',
    description: 'Particle disintegration effect',
    prompt: 'Particle disintegration effect, body dissolving into particles, mystical energy, glowing particles, cinematic VFX, Thanos snap style, dramatic lighting',
    category: 'top-choice',
    thumbnailUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
  },

  // Popular Templates
  {
    id: 'cyberpunk-neon',
    name: 'Cyberpunk Neon',
    description: 'Futuristic neon cyberpunk style',
    prompt: 'Cyberpunk style portrait, neon lights, futuristic city background, purple and cyan lighting, blade runner aesthetic, rain effects, highly detailed',
    category: 'popular',
    thumbnailUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
  },
  {
    id: 'levitation',
    name: 'Levitation',
    description: 'Floating in air with magical energy',
    prompt: 'Levitation effect, floating in air, magical energy swirls, mystical atmosphere, glowing particles, dramatic upward lighting, fantasy art style',
    category: 'popular',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=800&q=80',
  },
  {
    id: 'fire-element',
    name: 'Fire Element',
    description: 'Engulfed in flames',
    prompt: 'Surrounded by fire element, flames dancing around, heat distortion, orange and red glow, dramatic lighting, action movie style, highly detailed fire effects',
    category: 'popular',
    thumbnailUrl: 'https://images.unsplash.com/photo-1553267751-1c148a7280a1?w=800&q=80',
  },
  {
    id: 'water-element',
    name: 'Water Element',
    description: 'Underwater or water manipulation',
    prompt: 'Water element manipulation, water swirling around, underwater atmosphere, blue and cyan tones, fluid dynamics, splash effects, professional photography',
    category: 'popular',
    thumbnailUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
  },

  // Mixed Effects
  {
    id: 'thunder-metal',
    name: 'Thunder + Metal',
    description: 'Metallic texture with lightning effects',
    prompt: 'Metallic transformation with thunder god lightning effects, electric arcs, chrome metal surface, blue electric energy, dramatic storm lighting, epic style',
    category: 'mixed',
    thumbnailUrl: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?w=800&q=80',
  },
  {
    id: 'metal-eyes',
    name: 'Metal + Eyes In',
    description: 'Metallic transformation with glowing eyes',
    prompt: 'Chrome metal transformation with glowing penetrating eyes effect, reflective metallic surface, intense eye glow, futuristic cyborg aesthetic',
    category: 'mixed',
    thumbnailUrl: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&q=80',
  },
  {
    id: 'explosion-disintegration',
    name: 'Explosion + Disintegration',
    description: 'Dramatic explosion with particle effects',
    prompt: 'Building explosion combined with particle disintegration, debris and particles flying, dramatic explosion lighting, cinematic destruction, VFX movie quality',
    category: 'mixed',
    thumbnailUrl: 'https://images.unsplash.com/photo-1574169208507-84376144848b?w=800&q=80',
  },

  // Artistic Templates
  {
    id: 'oil-painting',
    name: 'Oil Painting',
    description: 'Classical oil painting style',
    prompt: 'Oil painting style portrait, classical renaissance art, rich colors, visible brush strokes, dramatic chiaroscuro lighting, museum quality art',
    category: 'artistic',
    thumbnailUrl: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&q=80',
  },
  {
    id: 'watercolor',
    name: 'Watercolor',
    description: 'Soft watercolor painting effect',
    prompt: 'Watercolor painting style, soft flowing colors, artistic brush strokes, dreamy atmosphere, pastel color palette, traditional art medium',
    category: 'artistic',
    thumbnailUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80',
  },
  {
    id: 'ink-illustration',
    name: 'Ink Illustration',
    description: 'Black ink illustration style',
    prompt: 'Black ink illustration, detailed line work, manga style, high contrast, traditional Japanese ink art, dramatic shadows, artistic linework',
    category: 'artistic',
    thumbnailUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
  },

  // Cinematic Templates
  {
    id: 'film-noir',
    name: 'Film Noir',
    description: 'Classic black and white noir style',
    prompt: 'Film noir style, black and white, dramatic shadows, venetian blind lighting, 1940s detective movie aesthetic, high contrast, cinematic',
    category: 'cinematic',
    thumbnailUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80',
  },
  {
    id: 'action-hero',
    name: 'Action Hero',
    description: 'Epic action movie poster style',
    prompt: 'Action movie poster style, dramatic pose, explosion background, cinematic color grading, heroic lighting, movie blockbuster aesthetic, professional photography',
    category: 'cinematic',
    thumbnailUrl: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=800&q=80',
  },
  {
    id: 'sci-fi-corridor',
    name: 'Sci-Fi Corridor',
    description: 'Futuristic sci-fi environment',
    prompt: 'Futuristic sci-fi corridor, neon lighting, cyberpunk interior, high-tech environment, blade runner style, atmospheric fog, cinematic lighting',
    category: 'cinematic',
    thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
  },

  // Nature Templates
  {
    id: 'nature-bloom',
    name: 'Nature Bloom',
    description: 'Surrounded by blooming flowers',
    prompt: 'Nature bloom effect, surrounded by blooming flowers and vines, magical garden atmosphere, vibrant colors, natural lighting, fantasy nature art',
    category: 'nature',
    thumbnailUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80',
  },
  {
    id: 'sakura-petals',
    name: 'Sakura Petals',
    description: 'Cherry blossom petals floating',
    prompt: 'Cherry blossom petals falling, sakura tree background, pink petals in wind, soft romantic lighting, Japanese aesthetic, dreamy atmosphere',
    category: 'nature',
    thumbnailUrl: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&q=80',
  },
  {
    id: 'northern-lights',
    name: 'Northern Lights',
    description: 'Aurora borealis in background',
    prompt: 'Northern lights aurora borealis, green and purple sky, arctic atmosphere, mystical natural phenomenon, long exposure photography, dramatic night sky',
    category: 'nature',
    thumbnailUrl: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80',
  },

  // Abstract Templates
  {
    id: 'glitch-art',
    name: 'Glitch Art',
    description: 'Digital glitch and distortion',
    prompt: 'Digital glitch art effect, RGB color split, pixel sorting, data corruption aesthetic, cyberpunk glitch, VHS distortion, digital error art',
    category: 'abstract',
    thumbnailUrl: 'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=800&q=80',
  },
  {
    id: 'kaleidoscope',
    name: 'Kaleidoscope',
    description: 'Symmetrical kaleidoscope pattern',
    prompt: 'Kaleidoscope effect, symmetrical mandala pattern, vibrant colors, geometric patterns, psychedelic art, radial symmetry, mesmerizing design',
    category: 'abstract',
    thumbnailUrl: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&q=80',
  },
  {
    id: 'liquid-marble',
    name: 'Liquid Marble',
    description: 'Flowing liquid marble texture',
    prompt: 'Liquid marble texture, flowing acrylic paint, abstract fluid art, swirling colors, gold accents, luxury aesthetic, organic flowing shapes',
    category: 'abstract',
    thumbnailUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80',
  },
]

export function getTemplatesByCategory(category: string): Template[] {
  if (category === 'all') return templates
  return templates.filter(t => t.category === category)
}

export function getFeaturedTemplates(): Template[] {
  return templates.filter(t => t.featured)
}

export function getTemplateById(id: string): Template | undefined {
  return templates.find(t => t.id === id)
}

