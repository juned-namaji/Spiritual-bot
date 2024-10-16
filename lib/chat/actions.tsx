import {
  BotMessage,
  UserMessage
} from '@/components/stocks/message'
import { Chat } from '@/lib/types'

export const getUIStateFromAIState = (aiState: Chat) => {
  
  return aiState.messages
    .filter(message => message.request !== "" && message.request != null)
    .map((message) => ({
      id: `${aiState.chatId}`,
      key: message._id,
      display: (
        <div key={message.timestamp}>
          <BotMessage content={message.request} />
          <br/>
          <UserMessage>{message.response}</UserMessage>
        </div>
      )
    }))
}
