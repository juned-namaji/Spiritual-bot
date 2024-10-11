import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'

export function EmptyScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">
        <h1 className="text-lg font-semibold">
          Welcome to the Spiritual Knowledge AI Chatbot!
        </h1>
        <p className="leading-normal text-muted-foreground">
          This AI chatbot is your guide to spiritual wisdom, drawing insights
          from sacred texts and spiritual teachings.
        </p>
        <p className="leading-normal text-muted-foreground">
          Powered by{' '}
          <ExternalLink href="https://nextjs.org">Next.js</ExternalLink>, the{' '}
          <ExternalLink href="https://sdk.vercel.ai">
            Vercel AI SDK
          </ExternalLink>
          , and{' '}
          <ExternalLink href="https://vercel.com/storage/kv">
            Vercel KV
          </ExternalLink>
          , this chatbot offers deep spiritual guidance and knowledge
          through a conversational interface.
        </p>
        <p className="leading-normal text-muted-foreground">
          Ask any spiritual questions, and the model will provide wisdom
          based on profound sources like the Bhagavad Gita and other spiritual
          teachings. Dive deeper into your spiritual journey today!
        </p>
      </div>
    </div>
  )
}
