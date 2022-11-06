import React from "react";
import "./addUser.style.scss";
import { createUser } from "../../api";
import { handleClick, toggleAddUSer } from "../utils";

// FORM FOR ADDING A NEW USER

const AddUser = ({ isHidden, setIsHidden, app }) => {
  return (
    <div className="addUser">
      {/* Close button to opt out of the form */}
      <img
        src="/icon-close.svg"
        alt="close button"
        className="addUser_close-btn"
        onClick={() => toggleAddUSer(isHidden, setIsHidden)}
      />

      {/* Add user form */}
      <form className="addUser_form">
        <h3>Enter user details</h3>
        <p>First Name: </p>
        <input type="text" id="first_name" name="first_name" required />
        <p>Last Name: </p>
        <input type="text" id="last_name" name="last_name" required />
        <p>Email: </p>
        <input type="email" id="email" name="email" required />

        {/* button to trigger the proces to create a new user */}
        <button
          type="submit"
          onClick={(e) => {
            handleClick(e, app, createUser);
            toggleAddUSer(isHidden, setIsHidden);
          }}
        >
          ADD USER
        </button>
      </form>
    </div>
  );
};

export default AddUser;
