import { faker } from "@faker-js/faker";
import { json_Data } from "./DATA";

// function that paginates the response data from fetchUsers
export const paginateUsersData = (data) => {
  let arr = [...data];
  const len = arr.length;
  const maxPerPg = 6;
  const pages = Math.ceil(len / maxPerPg);
  let current = 0;
  let page_num = 1;
  let paginatedUsers = [];
  for (let i = 0; i < pages; i++) {
    paginatedUsers.push({
      page: page_num,
      per_page: maxPerPg,
      total_pages: pages,
      data: arr.splice(current, current + maxPerPg),
    });
    page_num++;
  }
  return paginatedUsers;
};

// Function to simulate user login
export const userLogin = () => {
  let index = Math.floor(Math.random() * json_Data.length);
  const response = {
    data: {
      status: "success",
      user: json_Data[index],
    },
  };
  return JSON.stringify(response);
};

//Function that fetches users from fakerJS
export const fetchUsers = (page = 0) => {
  const paginated_Data = paginateUsersData(json_Data);
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => resolve(JSON.stringify(paginated_Data[page])), 800);
    } catch (error) {
      reject(error);
    }
  });
};

// function that fetches data to load the next page
export const fetchNextpage = async (page) => {
  const next = await fetchUsers(page).then((result) => result);
  return next;
};

// CREATES AND ADDS  NEW USER
export const createUser = (newUser) => {
  const usersData = json_Data;
  return new Promise((resolve, reject) => {
    try {
      // generate unique id and avatar from fakerJS
      const newId = faker.datatype.uuid();
      const avatar = faker.image.avatar();
      // create the new user with data collected from form and add it to the users database
      newUser = { ...newUser, _id: newId, avatar };
      usersData.push(newUser);
      //response & async operation simulation
      setTimeout(() => {
        resolve({
          data: { status: "success", result: paginateUsersData(usersData) },
        });
      }, 3000);
    } catch (error) {
      setTimeout(() => {
        reject({ data: { status: "fail", error: error } });
      }, 3000);
    }
  });
};

// modifyUser function to facilitate updating user details
export const modifyUser = (changes, id) => {
  const { firstName, lastName, email } = changes;
  //get user by id
  let userIndex = json_Data.findIndex((e) => e._id === id);
  //modify user info
  let user = json_Data[userIndex];
  json_Data[userIndex] = { ...user, firstName, lastName, email };
  //save changes
  return paginateUsersData(json_Data);
};

//  function deleteUser: deletes a single user by id
export const deleteUser = (id) => {
  for (let user in json_Data) {
    if (id === json_Data[user]._id) {
      json_Data.splice(parseInt(user), 1);
      break;
    }
  }
  return paginateUsersData(json_Data);
};

//  function deleteUsers : Deletes multiple users from an array of selected userIDs
export const deleteUsers = (arr) => {
  let newUsers;
  for (let id of arr) {
    newUsers = deleteUser(id);
  }
  return newUsers;
};
