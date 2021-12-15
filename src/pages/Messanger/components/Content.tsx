import React from 'react'
import { Button } from '../../../components/Button'
import Input from '../../../components/Input'
import { Message } from '../../../reducer'
import socket from '../../../socket'

interface ContentProps {
  addStoreMsg({from, text}: Message): void
  userName: string
  roomId: string
  messages: any
}

const Content: React.FC<ContentProps> = ({userName, roomId, messages, addStoreMsg}) => {
  const [messagesD, setMessagesD] = React.useState<any[]>([])
  const [userMsg, setUserMsg] = React.useState<string>('')

  const submitHandler = () => {
    if (userMsg.length < 1) return;
    addStoreMsg({from: userName, text: userMsg})
    socket.emit('ROOM:NEW_MESSAGE', {userName, roomId, text: userMsg})
    setUserMsg('')
  } 

  React.useEffect(() => { 
    if (messages.length === 0) return;
    const newMsgs: any = []
    messages.forEach((msg: any) => newMsgs.push({from: msg.from || msg.userName, text: msg.text}))
    setMessagesD(newMsgs)
  }, [messages])

  return (
    <div className="messanger__container-content">
      <Messages 
        messages={messagesD}
      />
      <Form 
        value={userMsg}
        changeInputHandler={(e) => setUserMsg(e.target.value)}
        submitBtnHandler={submitHandler}
      />
    </div>
  )
}

export default Content



interface FormProps {
  value: string
  changeInputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  submitBtnHandler: () => void 
}

const Form: React.FC<FormProps> = ({value, changeInputHandler, submitBtnHandler}) => (
  <div className="messanger__container-content-form">
    <Input 
      value={value}
      placeholder='сообщение..'
      onChange={changeInputHandler} 
      onKeyEnter={submitBtnHandler}
    />
    <Button 
      icon='send' 
      onClick={submitBtnHandler} 
    />
  </div>
)



interface MessagesProps {
  messages: Message[]
}

const Messages: React.FC<MessagesProps> = ({messages}) => (
  <div className="messages">
    {messages.map((msg, index) => (
      <MessageComponent key={`${index}`} text={msg.text} from={msg.from} />
    ))}
  </div>
)



const MessageComponent: React.FC<Message> = ({text, from}) => (
  <div className="message">
    <div className="message-text">{text}</div>
    <div className="message-from">{from}</div>
  </div>
)