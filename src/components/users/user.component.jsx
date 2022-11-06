import React from "react";
import "./user.style.scss";

import { deleteUser } from "../../api";

// COMPONENT TO DISPLAY INDIVIDUAL USER DETAILS
const User = ({
  user,
  setSelectedUser,
  app,
  page,
  setSelectedUsers,
  selectedUsers,
}) => {
  // Function for selecting multiple users from list and passing userIDs to the selectedUsers array.
  const handleSelect = (e) => {
    if (e.target.checked) {
      setSelectedUsers([...selectedUsers, e.target.value]);
    } else {
      let filteredUsers = selectedUsers.filter((id) => id !== e.target.value);
      setSelectedUsers(filteredUsers);
    }
  };

  // function that handles deleting of a single user
  const handleDeleteUser = (id) => {
    let app_data = deleteUser(id);
    app.setState({
      ...app.state,
      appData: app_data[page - 1] ? app_data[page - 1] : app_data[0],
    });
  };

  return (
    <li className="user">
      {/* Checkbox feature that allows selection of user/users */}
      <input
        type="checkbox"
        className="user_checkbox"
        value={user._id}
        onChange={(e) => handleSelect(e)}
      />
      {/* User details */}
      <img src={user.avatar} alt="avatar" className="user_avatar" />
      <p className="user_name">{`${user.firstName} ${user.lastName}`}</p>
      <p className="user_email">{user.email}</p>

      {/* Delete Icon */}
      <img
        src="/delete.svg"
        alt="delete"
        className="user_delete"
        onClick={() => handleDeleteUser(user._id)}
      />

      {/* Edit Icon */}
      <img
        src="/pencil.png"
        alt="edit"
        className="user_edit"
        onClick={() => {
          setSelectedUser(user);
        }}
      />
    </li>
  );
};

export default User;
