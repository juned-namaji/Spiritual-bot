'use server';

import {
  createAI,
  createStreamableUI,
  getMutableAIState,
  getAIState,
  streamUI,
  createStreamableValue
} from 'ai/rsc'
import {
  spinner,
  SystemMessage,
  BotCard,
  BotMessage,
} from '@/components/stocks'
import {
  formatNumber,
  runAsyncFnWithoutBlocking,
  sleep,
  nanoid
} from '@/lib/utils'
import { saveChat } from '@/app/actions'
import { SpinnerMessage, UserMessage } from '@/components/stocks/message'
import { Chat, Message } from '@/lib/types'
import { auth } from '@/auth'
import { getUIStateFromAIState } from './actions';

// async function confirmPurchase(symbol: string, price: number, amount: number) {
//   const aiState = getMutableAIState<typeof AI>()

//   const purchasing = createStreamableUI(
//     <div className="inline-flex items-start gap-1 md:items-center">
//       {spinner}
//       <p className="mb-2">
//         Purchasing {amount} ${symbol}...
//       </p>
//     </div>
//   )

//   const systemMessage = createStreamableUI(null)

//   runAsyncFnWithoutBlocking(async () => {
//     await sleep(1000)

//     purchasing.update(
//       <div className="inline-flex items-start gap-1 md:items-center">
//         {spinner}
//         <p className="mb-2">
//           Purchasing {amount} ${symbol}... working on it...
//         </p>
//       </div>
//     )

//     await sleep(1000)

//     purchasing.done(
//       <div>
//         <p className="mb-2">
//           You have successfully purchased {amount} ${symbol}. Total cost:{' '}
//           {formatNumber(amount * price)}
//         </p>
//       </div>
//     )

//     systemMessage.done(
//       <SystemMessage>
//         You have purchased {amount} shares of {symbol} at ${price}. Total cost ={' '}
//         {formatNumber(amount * price)}.
//       </SystemMessage>
//     )

//     aiState.done({
//       ...aiState.get(),
//       messages: [
//         ...aiState.get().messages,
//         {
//           id: nanoid(),
//           role: 'system',
//           content: `[User has purchased ${amount} shares of ${symbol} at ${price}. Total cost = ${
//             amount * price
//           }]`
//         }
//       ]
//     })
//   })

//   return {
//     purchasingUI: purchasing.value,
//     newMessage: {
//       id: nanoid(),
//       display: systemMessage.value
//     }
//   }
// }

export const submitUserMessage = async (message: string) => {
  try {
    const res = await fetch(`https://paragon-m3ntisui0-utkarshs-projects-f544751f.vercel.app/query/${message}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!res.ok) {
      throw new Error('Failed to send message to the server');
    }

    const data = await res.json();
    return {
      id: nanoid(),
      key: new Date().toISOString(),
      display: <BotMessage content={data[0].text} />, 
      response :  data[0].text,
    }
  } catch (error) {
    console.error('Error:', error);
    return {
      id: nanoid(),
      key: new Date().toISOString(),
      display: <UserMessage>{'Error getting response from server.'}</UserMessage>,
      response :'Error getting response from server.',
    };
  }
};

export type AIState = {
  chatId: string
  messages: Message[]
}

export type UIState = {
  id: string
  key: string
  display: React.ReactNode
}[]

export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage,
    // confirmPurchase
  },
  initialUIState: [],
  initialAIState: { chatId: nanoid(), messages: [] },
  onGetUIState: async () => {

    const session = await auth()

    if (session && session.user) {
      const aiState = getAIState() as Chat

      if (aiState) {
        const uiState = getUIStateFromAIState(aiState)
        return uiState
      }
    } else {
      return
    }
  },
  onSetAIState: async ({ state }) => {
    const session = await auth()

    if (session && session?.user) {
      const { chatId, messages } = state

      const createdAt = new Date()
      const userId = session.user.id as string
      const path = `/chat/${chatId}`

      const firstMessageContent = messages[0].content as string
      const title = firstMessageContent.substring(0, 100)

      const chat: Chat = {
        id: chatId,
        title,
        userId,
        createdAt,
        messages,
        path
      }

      await saveChat(chat)
    } else {
      return
    }
  }
})