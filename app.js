import express from "express";

import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { postRouter } from "./routes/post-routes.js";
import { validarPost } from "./middlewares/validar-create-post.js";

// import { ctrolGetAllPost, ctrolCreatePost } from "./post-controllers.js";
// import { handlerException } from "./handler-exceptions.js";

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

app.use(validarPost);

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

//todo LAS RUTAS ESTAN EN EL ROUTER
// app.get("/post", ctrolGetAllPost, handlerException);
// app.post("/post", ctrolCreatePost);
// app.patch('/',(req,res)=>{
//     res.send('metodo PATCH')
// })
// app.put('/',(req,res)=>{
//     res.send('metodo PUT')
// })
// app.delete('/',(req,res)=>{
//     res.send('metodo DELETE')
// })

app.use("/post", postRouter);

//todo SERVIDOR EN ESCUCHA
app.listen(3000);
console.log("server on port 3000");

// GET --> Obtener recursos
// POST --> Crear recursos
// PATCH --> Editar recursos ya creados de forma parcial
// DELETE --> Eliminar recursos
// PUT --> Editar un recursos si existe y sino, lo crea.
