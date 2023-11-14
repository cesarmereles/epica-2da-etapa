import express from "express";

import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import * as url from "url";
import fileUpload from "express-fileupload";
import { createTransport } from "nodemailer";

import path from "node:path";
import fs from "node:fs/promises";
//*__dirname ESTO SIGNIFICA DONDE ESTA UBICADO EL ARCHIVO APP.JS
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

import { env } from "./setting/envs.js";

import { postRouter } from "./routes/post-routes.js";
import { userRouter } from "./routes/user-routes.js";

import { validarPost } from "./middlewares/validar-create-post.js";

import { middlewareAutentication } from "./middlewares/middleware-autentication.js";
import { middlewareAutorization } from "./middlewares/middleware-authorization.js";
import { startConnection } from "./setting/database.js";

const app = express();

//* ----------------------------------------------
//TODO ESTOS SON MIDDLEWARE COMUNES
//!USANDO MORGAN ES LOGGER SE INSTALA NPM I MORGAN
app.use(morgan("dev"));
app.use(cors());
app.use(helmet());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./temp/",
  })
);
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

//*ESTE POST UPLOAD PARA SUBIR IMAGENES
app.post("/upload", async (req, res) => {
  console.log(req.files);

  const { image } = req.files;

  fs.mkdir(path.join(__dirname, "uploads"), { recursive: true });

  await image.mv(path.join(__dirname, "uploads", image.name));

  fs.rm(path.join(__dirname, "temp"), { recursive: true });

  res.send("uploads");
});

app.use("/post", middlewareAutentication, middlewareAutorization, postRouter);
//app.use("/post", postRouter);
app.use("/user", userRouter);

const tranporter = createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  secure: true,
  auth: {
    user: "cesarmereles@gmail.com",
    pass: env.MAIL_PASSWORD,
  },
});
//*ENVIAR UN EMAIL
app.post("/send-email", async (req, res) => {
  try {
    const { destinatario, motivo, mensaje } = req.body;
    const response = await tranporter.sendMail({
      from: "cesarmereles@gmail.com",
      to: destinatario,
      subject: motivo,
      text: mensaje,
    });
    res.send("send email");
  } catch (error) {
    console.log(error);
    res.status(500).send("error");
  }
});

//todo SERVIDOR EN ESCUCHA
app.listen(env.PORT, async () => {
  await startConnection();
  console.log(`server on port ${env.PORT} `);
});

// GET --> Obtener recursos
// POST --> Crear recursos
// PATCH --> Editar recursos ya creados de forma parcial
// DELETE --> Eliminar recursos
// PUT --> Editar un recursos si existe y sino, lo crea.
