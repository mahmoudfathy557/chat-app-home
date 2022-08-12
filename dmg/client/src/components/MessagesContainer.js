import React from 'react'
 
import Messages from './Messages/Messages';
 
 
 
const MessagesContainer = ({messages,name}) => {
    
  return (
    <Messages messages={messages} name={name} />
      


  )
}

export default MessagesContainer