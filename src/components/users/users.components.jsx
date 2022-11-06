import React, { useState } from "react";
import "./users.style.scss";

import User from "./user.component";
import AddUser from "../add_user/addUser.component";
import ModifyUser from "../modify_user/modifyUser.component";
import { toggleAddUSer, togglePages } from "../utils";
import { fetchNextpage, deleteUsers } from "../../api";

const Users = ({ appData, app }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [isHidden, setIsHidden] = useState(true);
  const { page, total_pages, data } = appData;

  // Handle deletion of multiple users
  const handleDeleteUsers = () => {
    let app_data = deleteUsers(selectedUsers);
    setSelectedUsers([]);
    app.setState({
      ...app.state,
      appData: app_data[page - 1] ? app_data[page - 1] : app_data[0],
    });
  };

  return (
    <div className="users">
      {/* Add user component */}
      <AddUser isHidden={isHidden} setIsHidden={setIsHidden} app={app} />
      {/* modify user component */}
      {selectedUser ? (
        <ModifyUser
          isHidden={isHidden}
          setIsHidden={setIsHidden}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          page={page}
          app={app}
        />
      ) : null}

      {/* header */}
      <header className="users__header">
        <h2 className="users__header_title"> Users</h2>

        {/* add user button */}
        <button
          className="users__header_btn"
          onClick={() => toggleAddUSer(isHidden, setIsHidden)}
        >
          + Add user
        </button>

        {/* delete users button */}
        {selectedUsers.length ? (
          <button
            className="users__header_btn users__header_btn-del"
            onClick={handleDeleteUsers}
          >
            Delete selected
          </button>
        ) : null}
      </header>
      {/* main body */}
      <main className="users__main">
        <ul className="users__main_header">
          <li></li>
          <li className="users__main_header-title">Avatar</li>
          <li className="users__main_header-title">Name</li>
          <li className="users__main_header-title">Email</li>
        </ul>
        <ul className="users__main_list">
          {data.map((user) => {
            return (
              <User
                user={user}
                key={user._id}
                setSelectedUser={setSelectedUser}
                app={app}
                page={page}
                setSelectedUsers={setSelectedUsers}
                selectedUsers={selectedUsers}
              />
            );
          })}
        </ul>

        {/* Component footer */}
        <footer className="users__main_footer">
          <button
            onClick={async () => {
              if (page === 1) {
                return;
              }
              let newPage = await togglePages(
                "previous",
                fetchNextpage,
                page,
                total_pages
              ).then((res) => res);
              app.setState({
                ...app.state,
                appData: JSON.parse(newPage),
              });
            }}
          >
            Previous
          </button>
          <p>{`Page ${page} of ${total_pages}`}</p>
          <button
            onClick={async () => {
              if (page === total_pages) {
                return;
              }
              let newPage = await togglePages(
                "next",
                fetchNextpage,
                page,
                total_pages
              ).then((res) => res);
              app.setState({
                ...app.state,
                appData: JSON.parse(newPage),
              });
            }}
          >
            Next
          </button>
        </footer>
      </main>
    </div>
  );
};

export default Users;
