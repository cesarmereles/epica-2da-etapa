import { v4 as uuid } from "uuid";

let listOfUsers = [];
const createNewUser = ({ name, email, password }) => {
  if (!name || !email || !password) return null;
  
  const newUser = { id: uuid(), name, email, password };
  
  listOfUsers.push(newUser);
  
  return newUser;
};

const getUserById = (id) => {
  const user = listOfUsers.find((user) => user.id === id);
  return user;
};

const getUserByEmail = (email) => {
  const user = listOfUsers.find((user) => user.email === email);
  return user;
};

export const userModel = {
  create: createNewUser,
  findUserId: getUserById,
  findUserEmail: getUserByEmail,
};
