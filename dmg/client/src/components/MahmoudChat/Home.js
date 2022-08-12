import React, { useState } from "react";
import { Link } from "react-router-dom";
import chatIcon from "../../images/new-gold-logo.png";
import "./Home.css";
import { FaComment} from "react-icons/fa";
import LiveChatContainer from "../LiveChatContainer";
import ReadyChatContainer from "../ReadyChatContainer";

export default function Home() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [showLauncher, setShowLauncher] = useState(false);
  const [showAsideChat, setShowAsideChat] = useState(false);
  // search filter
  const [users, setUsers] = useState([
    { id: 0, name: "mahmoud", title: "web master" },
    { id: 1, name: "said", title: "sr web master" },
    { id: 2, name: "samia", title: "sr digital master" },
  ]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  // readyChatList
  const [readyChatList, setReadyChatList] = useState([]);

  // show Live  chat sidebar
  const [showLiveChatSidebar, setShowLiveChatSidebar] = useState(false);

  const sortData = (searchValue) => {
    setSearchInput(searchValue);
    let tempUsers = [...users];
    if (searchValue.length > 0) {
      tempUsers = tempUsers.filter((item) => {
        let tempSearch = searchValue.toLowerCase();
        let tempTitle = item.name.toLowerCase().slice(0, searchValue.length);
        if (tempSearch === tempTitle) {
          return item;
        }
      });
    }
    setFilteredUsers(tempUsers);
  };

  const addUserToReadyChatList = (user) => {
    const oldUser = readyChatList.find((oldUser) => oldUser.id === user.id);

    if (!oldUser) {
      setReadyChatList([...readyChatList, user]);
    }
  };

  const removeUserFromReadyChatList = (user) => {
    const isUser = readyChatList.find((oldUser) => oldUser.id === user.id);

    if (isUser) {
      let tempUsers = [...readyChatList];
      tempUsers = tempUsers.filter((oldUser) => oldUser.id !== user.id);
      console.log(tempUsers);
      setReadyChatList(tempUsers);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowLiveChatSidebar(true);
  };

  return (
    <div className="home-container">

        {/* chat icon */}
      <div
        className="chat-icon"
        onClick={() => {
          if (showLauncher && showAsideChat) {
            setShowAsideChat(false);
          }
          if (showLiveChatSidebar) {
            setShowLiveChatSidebar(false);
          }

          setShowLauncher((val) => !val);
        }}
      >
        <img src={chatIcon} width={40} alt="chat icon" />
      </div>

      {/* show + sign to open chat sidebar */}
      {showLauncher && (
        <div
          className="launcher"
          onClick={() => setShowAsideChat((val) => !val)}
        >
          +
        </div>
      )}

{/* chat sidebar */}
      {showAsideChat && (
        <aside className="d-flex  flex-column   ">
          <div className="p-3 d-flex">
            <FaComment className="aside-fa-comment-icon" />
          </div>

          {/* Live Chat  */}
          {showLiveChatSidebar ? (
            <LiveChatContainer
             setShowLiveChatSidebar={setShowLiveChatSidebar}
              readyChatList={readyChatList} 
             />
           
          ) : (
            // Get Ready Chat 
            <ReadyChatContainer 
            handleSubmit={handleSubmit}
            sortData={sortData}
            readyChatList={readyChatList}
            removeUserFromReadyChatList={removeUserFromReadyChatList}
            searchInput={searchInput}
            filteredUsers={filteredUsers}
            addUserToReadyChatList={addUserToReadyChatList}
            />
          
          )}
        </aside>
      )}

     
    </div>
  );
}
