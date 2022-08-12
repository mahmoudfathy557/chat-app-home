import React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import ChatUsers from "./ChatUsers";
import UserCard from "./Sidebar/UserCard";

const ReadyChatContainer = ({
  handleSubmit,
  sortData,
  readyChatList,
  removeUserFromReadyChatList,
  searchInput,
  filteredUsers,
  addUserToReadyChatList
}) => {
  return (
    <Form
      className="chat-form d-flex flex-column justify-content-between"
      onSubmit={handleSubmit}
    >
      <div className="upper-form">
        <InputGroup>
          <InputGroup.Text id="inputGroupPrepend" className="bg-warning">
            <FaSearch className="text-white" />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search"
            onChange={(e) => {
              sortData(e.target.value);
            }}
            aria-describedby="inputGroupPrepend"
          />
        </InputGroup>

        {/* readyChatList */}
        <ChatUsers
          canRemoveUser={true}
          readyChatList={readyChatList}
          removeUserFromReadyChatList={removeUserFromReadyChatList}
        />

        {/* filtered users */}
        <ul
          className={
            readyChatList.length > 0
              ? "users-list  p-0 m-0 mt-2"
              : "users-list-longer p-0 m-0 mt-2  "
          }
        >
          {searchInput.length > 0 ? (
            filteredUsers.length > 0 ? (
              filteredUsers.map((user, id) => {
                return (
                  <UserCard
                    user={user}
                    name={user.name}
                    title={user.title}
                    key={id}
                    addUserToReadyChatList={addUserToReadyChatList}
                  />
                );
              })
            ) : (
              <p>no results found !</p>
            )
          ) : null}
        </ul>
      </div>

      <Button
        type="submit"
        className="bg-warning border-0 mx-3 mb-2 "
        disabled={readyChatList.length > 0 ? false : true}
      >
        Start Chat!
      </Button>
    </Form>
  );
};

export default ReadyChatContainer;
