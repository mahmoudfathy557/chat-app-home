import React, { useState, useEffect } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FaChevronLeft } from "react-icons/fa";
import { ImAttachment } from "react-icons/im";
import io from "socket.io-client";
import ChatUsers from "./ChatUsers";
import MessagesContainer from "./MessagesContainer";

const socket = io("http://localhost:5000");

const LiveChatContainer = ({ setShowLiveChatSidebar, readyChatList }) => {
 
  const [name, setName] = useState('');

  const [messages, setMessages] = useState(
      []
  );
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState("");

  useEffect(() => {
    let tempName=Date.now()
  
    setName(tempName.toString());
    
    socket.emit('join', { name:tempName, room:'dmg' }, (error) => {
      if(error) {
        alert(error);
      }
    });

   

    
  }, [ ]);

  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
   
  }, [  ])
  

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message);
      setMessage("");
    }
  };

  return (
    <div className="chat-container  ">
      {/* back btn */}
      <div className="row">
        <div
          className=" back-btn cursor-pointer d-flex justify-content-start align-items-center ms-2"
          onClick={() => setShowLiveChatSidebar(false)}
        >
          <FaChevronLeft />
          <p className=" my-auto">back</p>
        </div>
      </div>
      {/* chat users */}
      <div className="row">
        <ChatUsers readyChatList={readyChatList} canRemoveUser={false} />
      </div>

      {/* chat messages */}
      <div className="row">
        <MessagesContainer messages={messages} name={name} />
      </div>

      {/* input field */}
      <div className="row">
        <InputGroup>
          <div className="cursor-pointer bg-warning p-2">
            <label htmlFor="file-input" className="cursor-pointer">
              <ImAttachment className="cursor-pointer text-white" />
            </label>

            <input id="file-input" type="file" className="d-none" />
          </div>
          <Form.Control
            type="text"
            placeholder="Message"
            value={message}
            aria-describedby="inputGroupPrepend"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            onKeyPress={(event) =>
              event.key === "Enter" ? sendMessage(event) : null
            }
            required
          />

          <Button
            variant="warning"
            className="bg-warning text-white"
            onClick={(e) => sendMessage(e)}
          >
            Submit
          </Button>
        </InputGroup>
      </div>
    </div>
  );
};

export default LiveChatContainer;
