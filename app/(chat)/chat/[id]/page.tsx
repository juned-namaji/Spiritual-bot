import { type Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { auth } from '@/auth'
import { getChat, getMissingKeys } from '@/app/actions'
import { Chat } from '@/components/chat'
import { AI } from '@/lib/chat/serverActions'
import { Session } from '@/lib/types'

export interface ChatPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({
  params
}: ChatPageProps): Promise<Metadata> {
  const session = await auth()

  if (!session?.user) {
    return {}
  }

  const userId = session.user.email as string
  const chat = await getChat(params.id, userId)

  if (!chat || 'error' in chat || !chat.messages || chat.messages.length === 0) {
    return {}
  }

  // Extract first 5 words from the first message in chat
  const firstMessage = chat.messages[0]?.request ?? ''
  const firstFiveWords = firstMessage.split(' ').slice(0, 5).join(' ')

  return {
    title: firstFiveWords || 'Chat'
  }
}

export default async function ChatPage({ params }: ChatPageProps) {
  const session = (await auth()) as Session
  const missingKeys = await getMissingKeys()
  const chatId = params.id;

  if (!session?.user) {
    redirect(`/login?next=/chat/${chatId}`)
  }

  const userId = session.user.email as string
  const chat = await getChat(chatId, userId)

  if (!chat || 'error' in chat) {
    console.log("Error in chat/{id} ", chat?.error);
    return notFound()
  }

  if (chat?.userId !== session?.user?.email) {
    notFound()
  }

  return (
    <AI initialAIState={{ chatId: chatId, messages: chat?.messages }}>
      <Chat
        id={chatId}
        session={session}
        initialMessages={chat?.messages}
        missingKeys={missingKeys}
      />
    </AI>
  )
}
