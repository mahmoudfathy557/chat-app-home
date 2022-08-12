import React from 'react'
import chatIcon from "../../images/new-gold-logo.png";
import OverlayTooltip from '../OverlayTooltip';

const UserReadyCard = ({removeUserFromReadyChatList,user,canRemoveUser}) => {
  return (
    <OverlayTooltip user={user}>
         <li
    className={canRemoveUser?"ready-chat-list-card tooltip.bs-tooltip-bottom  list-group-item rounded-circle":
    "  tooltip.bs-tooltip-bottom  list-group-item rounded-circle"
  }
  
    onClick={() => canRemoveUser? removeUserFromReadyChatList(user):null}
  >
    <img
      src={chatIcon}
      key={user.id}
      alt="icon"
      className=" user-card-img  "
    />
  </li>
    </OverlayTooltip>
 
  )
}

export default UserReadyCard