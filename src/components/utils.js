//Utility fuinction for handling addUser form submission
export const handleClick = (e, app, createUser) => {
  e.preventDefault();
  // DOM Elements for input data
  const first_name = document.getElementById("first_name");
  const last_name = document.getElementById("last_name");
  const email = document.getElementById("email");

  // New object with the new user's info
  const newUser = {
    firstName: first_name.value,
    lastName: last_name.value,
    email: email.value,
  };

  // Create new user and update the application
  const addUser = async () => {
    const newState = await createUser(newUser).then((res) => res);
    app.setState({
      ...app.state,
      appData: newState.data.result[0],
    });
  };

  addUser();

  // Reset the form
  first_name.value = "";
  last_name.value = "";
  email.value = "";
};

// Function to toggle the add new user form

export const toggleAddUSer = (isHidden, setIsHidden) => {
  const addUserform = document.querySelector(".addUser");
  if (isHidden) {
    addUserform.style.display = "flex";
    setIsHidden(!isHidden);
  } else {
    addUserform.style.display = "none";
    setIsHidden(!isHidden);
  }
};

// Function to toggle the modify user form

export const toggleModifyUser = (isHidden, setIsHidden) => {
  const modifyUserForm = document.querySelector(".modifyUser");
  if (isHidden) {
    modifyUserForm.style.display = "flex";
    setIsHidden(!isHidden);
  } else {
    modifyUserForm.style.display = "none";
    setIsHidden(!isHidden);
  }
};

//function to toggle pages
export const togglePages = (direction, getPage, page, totalPages) => {
  let newPage;
  const toggle = async () => {
    if (direction === "next" && page < totalPages) {
      const newPg = await getPage(page).then((res) => res);
      return newPg;
    } else if (direction === "previous" && page > 1) {
      const newPg = await getPage(page - 2).then((res) => res);
      return newPg;
    }
  };
  newPage = toggle().then((res) => res);
  return newPage;
};

//function to get a specific user
export const getUser = (appData, userId) => {
  let selectedUser;
  const usersArr = appData.data;
  for (let user of usersArr) {
    if (user._id === userId) {
      selectedUser = user;
      break;
    }
  }
  return selectedUser;
};
