'use client'

import * as React from 'react'
import Textarea from 'react-textarea-autosize'
import { submitUserMessage } from '@/lib/chat/actions'
import { useActions, useUIState } from 'ai/rsc'
import { UserMessage } from './stocks/message'
import { type AI } from '@/lib/chat/actions'
import { Button } from '@/components/ui/button'
import { IconArrowElbow, IconPlus } from '@/components/ui/icons'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import { nanoid } from 'nanoid'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { getNoOfAttempts, setCookie } from '@/app/actions/serverActions'
import AttemptsModal from './attempts-modal'

export function PromptForm({
  input,
  setInput
}: {
  input: string
  setInput: (value: string) => void
}) {
  const router = useRouter()
  const { formRef, onKeyDown } = useEnterSubmit()
  const inputRef = React.useRef<HTMLTextAreaElement>(null)
  const [_, setMessages] = useUIState<typeof AI>()
  const { data: session } = useSession()
  const [prompts, setPrompts] = React.useState<number>(0)
  const [showModal, setShowModal] = React.useState<boolean>(false)

  const setAttempts = async () => {
    const attempts = await getNoOfAttempts()
    setPrompts(attempts)
  }

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
    const fetchAttempts = async () => {
      await setAttempts()
    }

    fetchAttempts()
  }, [prompts])

  const handleTextAreaClick = () => {
    if (!session?.user && prompts >= 3) router.push('/login')
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    //checking if the user is logged in or not
    if (!session?.user?.email) {
      const attempts = await getNoOfAttempts()
      if (attempts >= 3) {
        router.push('/login')
        return;
      } else {
        await setCookie()
        setPrompts(attempts + 1)
        setShowModal(true) 
      }
    }

    const value = input.trim()
    setInput('')
    console.log(input)
    if (!value) return

    setMessages(currentMessages => [
      ...currentMessages,
      {
        id: nanoid(),
        display: <UserMessage>{value}</UserMessage>
      }
    ])
    // Submit and get response message
    const responseMessage = await submitUserMessage(value);
    setMessages(currentMessages => [...currentMessages, responseMessage])
  }

  return (
    <>
      {showModal && <AttemptsModal attempts={prompts} onClose={() => setShowModal(false)} />}

      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background px-8 sm:rounded-md sm:border sm:px-12">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-[14px] size-8 rounded-full bg-background p-0 sm:left-4"
                onClick={() => {
                  router.push('/new')
                }}
              >
                <IconPlus />
                <span className="sr-only">New Chat</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>New Chat</TooltipContent>
          </Tooltip>
          <Textarea
            ref={inputRef}
            tabIndex={0}
            onKeyDown={onKeyDown}
            placeholder={!session?.user && prompts === 3 ? 'Login to use' : 'Send a message.'}
            className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
            autoFocus
            spellCheck={false}
            autoComplete="off"
            autoCorrect="on"
            name="message"
            rows={1}
            value={input}
            onClick={handleTextAreaClick}
            onChange={e => setInput(e.target.value)}
          />
          <div className="absolute right-0 top-[13px] sm:right-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button type="submit" size="icon" disabled={input === ''}>
                  <IconArrowElbow />
                  <span className="sr-only">Send message</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Send message</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </form>
    </>
  )
}
