'use client'

import { Template } from '@/lib/templates'
import { TemplateCard } from './TemplateCard'

interface TemplatesGridProps {
  templates: Template[]
}

export function TemplatesGrid({ templates }: TemplatesGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
      {templates.map((template, index) => (
        <TemplateCard key={template.id} template={template} index={index} />
      ))}
    </div>
  )
}

