import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const UserModel = model("User", UserSchema);
let listOfUsers = [];
export const createNewUser = async ({ name, email, password }) => {
  if (!name || !email || !password) return null;
  //TODO CON LA LIBRERIA BCRYPT GENERAMOS TEXTO ENCRIPTADOS PARA EL PASSWORD
  const hashedPassword = await bcrypt.hash(password, 10);

  //TODO  isAdmin: name === "cesar" SI NAME=CESAR ENTONCES ISADMIN ES TRUE SI ES FALSO

  const newUser = {
    name,
    email,
    password: hashedPassword,
    isAdmin: name === "cesar",
  };

  //*ESTA FORMA ES PARA CREAR UN REGISTRO USANDO MONGO
  /* 
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      isAdmin: name === "cesar",
    })
    await newUser.save()
  */

  //listOfUsers.push(newUser);
  //*ESTA FORMA PARA CREAR UN REGISTRO UTILIZANDO MONGOOSE
  const user = await UserModel.create(newUser);
  return user;
};

//*PARA OBTENER UN SOLO USUARIO
export const getUserById = async (id) => {
  //const user = listOfUsers.find((user) => user.id === id);
  const user = await UserModel.findById(id);
  return user;
};

//*PARA OBTENER TODOS LOS USUARIOS
//const allUser = await UserModel.find()

export const getUserByEmail = async (email) => {
  //const user = listOfUsers.find((user) => user.email === email);
  const user = await UserModel.findOne({ email });
  return user;
};

export const loginUser = async ({ email, password }) => {
  const user = await getUserByEmail({ email });
  if (!user) return null;
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  return user;
};

//*PARA ACTUALIZAR
export const updateUser = async (id, datos) => {
  const user = await UserModel.findByIdAndUpdate(id, datos, { new: true });
  return user;
};

//*PARA ELIMINAR
export const deleteUser = async (id) => {
  await UserModel.findByIdAndDelete(id);
};

export const userModel = {
  create: createNewUser,
  findUserId: getUserById,
  findUserEmail: getUserByEmail,
  update: updateUser,
  detroy: deleteUser,
};
