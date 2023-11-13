import express from "express";

import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import { env } from "./setting/envs.js";
import { starConnection } from "./setting/database.js";

import { postRouter } from "./routes/post-routes.js";
import { userRouter } from "./routes/user-routes.js";

import { validarPost } from "./middlewares/validar-create-post.js";

import { middlewareAutentication } from "./middlewares/middleware-autentication.js";
import { middlewareAutorization } from "./middlewares/middleware-authorization.js";

const app = express();

//* ----------------------------------------------
//TODO ESTOS SON MIDDLEWARE COMUNES
//!USANDO MORGAN ES LOGGER SE INSTALA NPM I MORGAN
app.use(morgan("dev"));
app.use(cors());
app.use(helmet());
//!PARA INSTALAR NPM I CORS HELMET
//!CORS: PERMITE REALIZAR PETICIONES A OTROS SERVIDORES
//!HELMET: SON COMO PARCHES DE SEGURIDAD
//*------------------------------------------------

//!ESTO ES UN MIDDLEWARE-ESTO SE EJECUTA ANTES
//!DE QUE LLEGUE A LA RUTA (GET-POST-ETC)

/* 
 LO QUE HACE ES DECIRLE A EXPRESS QUE TIENE UN BODY Y QUE
 VA A INTERPRETAR UN JSON
*/
//* CON ESTA INSTRUCCION FUNCIONA EL BODY
app.use(express.json());

//*CON ESTO INDICO DONDE VAN A ESTAR LOS ARCHIVOS ESTATICOS
app.use(express.static("public"));

//* CON ESTA INSTRUCCION PARA QUE FUNCIONE LOS FORM HTML
app.use(express.urlencoded({ extended: false }));

//app.use(validarPost);

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.use("/post", middlewareAutentication, middlewareAutorization, postRouter);
app.use("/user", userRouter);

//todo SERVIDOR EN ESCUCHA
app.listen(env.PORT, async () => {
  //*MIENTRAS ESCUCHO EL SERVIDOR INICIO LA CONEXION A BD
  await starConnection();
  console.log(`server on port ${env.PORT} `);
});

// GET --> Obtener recursos
// POST --> Crear recursos
// PATCH --> Editar recursos ya creados de forma parcial
// DELETE --> Eliminar recursos
// PUT --> Editar un recursos si existe y sino, lo crea.
