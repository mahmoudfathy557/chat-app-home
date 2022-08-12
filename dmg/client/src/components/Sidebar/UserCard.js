import React from 'react'
import { ModalTitle } from 'react-bootstrap';
// import "./Join.css";
import chatIcon from "../../images/new-gold-logo.png";

const UserCard = ({user,name,title,addUserToReadyChatList,}) => {
  return (
    <li className="user-card d-flex align-items-center bg-none p-2"
    onClick={()=>addUserToReadyChatList(user)}
    >
    <img
      src={chatIcon}
      className="user-card-img rounded-circle"
      alt="user"
    />
    <div className="user-info ms-2 text-left  ">
      <h4 className="user-info-h p-0 m-0 text-start text-capitalize fw-bold  ">{name}</h4>
      <p className="user-info-p p-0 m-0 text-start text-capitalize    ">{title}</p>
    </div>
  </li>
  )
}

export default UserCard