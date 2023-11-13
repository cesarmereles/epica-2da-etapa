import { Sequelize } from "sequelize";
import { env } from "../setting/envs.js";

const { DB } = env;

//*ESTE METODO LO EJECUTAMOS EN LOS MODELOS
export const sequelize = new Sequelize(DB.NAME, DB.USER, DB.PASS, {
  host: DB.HOST,
  port: DB.PORT,
  dialect: "mysql",
});

//*LA CONEXION LO HACEMOS EN LA APLICACION PRINCIPAL APP.JS
export async function starConnection() {
  await sequelize.sync({ force: false });
  console.log("conexion exitosa");
}
//!codigo copiado de otra comision
// export async function startConnection() {
//   await sequelize.sync({ force: false });
//   console.log("Database connected");
// }
