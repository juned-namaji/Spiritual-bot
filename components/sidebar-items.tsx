'use client'

import { Chat } from '@/lib/types'
import { AnimatePresence, motion } from 'framer-motion'
import { removeChat, shareChat } from '@/app/actions'
import { SidebarActions } from '@/components/sidebar-actions'
import { SidebarItem } from '@/components/sidebar-item'
import Link from 'next/link'

interface SidebarItemsProps {
  chats?: Chat[]
}

export function SidebarItems({ chats }: SidebarItemsProps) {
  console.log(chats);
  if (!chats?.length) return null

  return (
    <AnimatePresence>
      {chats.map((chat) => (
        <motion.div
          key={chat.roomId}
          exit={{
            opacity: 0,
            height: 0
          }}
        >
          <SidebarItem chat={chat}>
            <Link href={`/chat/${chat.roomId}`}>
              <span className="text-lg font-semibold">{chat.title}</span>
            </Link>
            <SidebarActions
              chat={chat}
              removeChat={removeChat}
              shareChat={shareChat}
            />
          </SidebarItem>
        </motion.div>
      ))}
    </AnimatePresence>
  )
}
