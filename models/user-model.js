import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

let listOfUsers = [];
const createNewUser = async ({ name, email, password }) => {
  if (!name || !email || !password) return null;
  //TODO CON LA LIBRERIA BCRYPT GENERAMOS TEXTO ENCRIPTADOS PARA EL PASSWORD
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = { id: uuid(), name, email, password: hashedPassword };

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
