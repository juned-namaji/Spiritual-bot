import React from 'react'

import { cn } from '@/lib/utils'
import { ExternalLink } from '@/components/external-link'

export function FooterText({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'px-2 text-center text-xs leading-normal text-muted-foreground',
        className
      )}
      {...props}
    >
      This AI chatbot provides spiritual knowledge. Please use the information for reflection only, and avoid misinterpretation. Built with{' '}
      <ExternalLink href="https://nextjs.org">Next.js</ExternalLink> and{' '}
      <ExternalLink href="https://github.com/vercel/ai">
        Vercel AI SDK
      </ExternalLink>
      .
    </p>
  )
}