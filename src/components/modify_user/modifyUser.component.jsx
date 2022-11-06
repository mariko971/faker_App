import React, { useState, useRef } from "react";
import "./modifyUser.style.scss";

import { toggleModifyUser } from "../utils";
import { modifyUser } from "../../api";

// COMPONENT TO FACILITATE EDITING/MODIFYING EXISTING USER DATA
const ModifyUser = ({
  isHidden,
  setIsHidden,
  selectedUser,
  setSelectedUser,
  page,
  app,
}) => {
  // input field elements ref
  const first_name_ref = useRef();
  const last_name_ref = useRef();
  const email_ref = useRef();

  // initial state of values to be modified
  const [changes, setChanges] = useState({
    firstName: selectedUser ? selectedUser.firstName : "",
    lastName: selectedUser ? selectedUser.lastName : "",
    email: selectedUser ? selectedUser.email : "",
  });

  //   function to record changes in the input fields
  const handleChange = (e) => {
    setChanges({
      firstName: first_name_ref.current.value,
      lastName: last_name_ref.current.value,
      email: email_ref.current.value,
    });
  };

  //   Function that applies changes made to our appData and resets the modifier
  const handleModifyUSer = (e) => {
    e.preventDefault();
    const app_data = modifyUser(changes, selectedUser._id);
    setChanges({});
    setSelectedUser();
    toggleModifyUser(isHidden, setIsHidden);
    app.setState({
      ...app.state,
      appData: app_data[page - 1],
    });
  };

  return (
    <div className="modifyUser">
      {/* Close modifier Icon */}
      <img
        src="/icon-close.svg"
        alt="close button"
        className="modifyUser_close-btn"
        onClick={() => setSelectedUser()}
      />

      {/* Form to edit the user details */}
      <form className="modifyUser_form">
        <h3>Edit user details</h3>
        <p>First Name: </p>
        <input
          type="text"
          id="first_name"
          name="firstName"
          ref={first_name_ref}
          defaultValue={selectedUser ? selectedUser.firstName : ""}
          onChange={handleChange}
          required
        />
        <p>Last Name: </p>
        <input
          type="text"
          id="last_name"
          name="lastName"
          ref={last_name_ref}
          defaultValue={selectedUser ? selectedUser.lastName : ""}
          onChange={handleChange}
          required
        />
        <p>Email: </p>
        <input
          type="email"
          id="email"
          name="email"
          ref={email_ref}
          defaultValue={selectedUser ? selectedUser.email : ""}
          onChange={handleChange}
          required
        />
        <button type="submit" onClick={handleModifyUSer}>
          SAVE CHANGES
        </button>
      </form>
    </div>
  );
};

export default ModifyUser;
