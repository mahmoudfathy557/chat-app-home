import React from 'react'
import UserReadyCard from './Sidebar/UserReadyCard';

const ChatUsers = ({readyChatList,removeUserFromReadyChatList,canRemoveUser}) => {

    if(readyChatList.length > 0){
       return (
    
        <ul className="list-group list-group-horizontal">
          {readyChatList.map((user) => {
            return (
              <UserReadyCard
                key={user.id}
                user={user}
                canRemoveUser={canRemoveUser}
                removeUserFromReadyChatList={
                  removeUserFromReadyChatList
                }
              />
            );
          })}
        </ul>
      
  )   
    }else {return null}

}

export default ChatUsers