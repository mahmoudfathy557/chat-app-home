import React, { useRef, useState } from "react";
import ChatBox from "../../components/ChatBox/ChatBox";
import Conversation from "../../components/Coversation/Conversation";
import LogoSearch from "../../components/LogoSearch/LogoSearch";
import NavIcons from "../../components/NavIcons/NavIcons";
import "./Chat.css";
import { useEffect } from "react";
import { createChat, userChats } from "../../api/ChatRequests";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { getAllUsers } from "../../api/UserRequests";
 

const Chat = () => {
  const dispatch = useDispatch();
  const socket = useRef();
  const { user } = useSelector((state) => state.authReducer.authData);

  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await getAllUsers();
        setAllUsers(data);
      } catch (error) {
        console.log(error);
      }
    };

    // Get the chat in chat section
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
    getChats();
  }, [user._id]);

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("ws://localhost:8800");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log(data);
      setReceivedMessage(data);
    });
  }, []);

  const checkOnlineStatus = (client) => {

    const chatMember = client._id
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };


  const handleGetChat= async(client) => {
 console.log(user._id);
 console.log(client._id);
//  get chat when current user clicks on any other user's name on the chat list
const getChat = chats.filter(chat=>chat.members.includes(client._id) && chat.members.includes(user._id) )[0]
 if(getChat){
  // if chat exists, Get the chat
   setCurrentChat(getChat);
 }else{
  // Create a new chat if it doesn't exist 
  const chatMembers = {senderId:user._id,
    receiverId:client._id
  }

 const {data}=await createChat(chatMembers)  //{data} ==> new chat
 setCurrentChat(data);
 }
 
  }


 
  return (
    <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
        <LogoSearch />
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {allUsers.length > 0 &&
              allUsers.map((client, id) => {
                if (client._id !== user._id) {
                  return (
                    <div key={id} onClick={()=>handleGetChat(client)}>
                 
                      <Conversation
                      clientData={client}
               
                  online={checkOnlineStatus(client)}
                />
                    </div>
                  );
                }
              })}
       
          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          <NavIcons />
        </div>
        <ChatBox
          chat={currentChat}
          currentUser={user._id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
