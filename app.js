import express from "express"
import { ctrolGetAllPost,ctrolCreatePost } from "./mis-funciones.js"

const app = express()

//!ESTO ES UN MIDDLEWARE-ESTO SE EJECUTA ANTES
//!DE QUE LLEGUE A LA RUTA (GET-POST-ETC)
/* 
 LO QUE HACE ES DECIRLE A EXPRESS QUE TIENE UN BODY Y QUE
 VA A INTERPRETAR UN JSON
*/
//TODO CON ESTA INSTRUCCION FUNCIONA EL BODY
app.use(express.json())

//TODO CON ESTA INSTRUCCION PARA QUE FUNCIONE LOS FORM HTML
app.use(express.urlencoded({extended:false}))

//TODO MIDDLEWARE PERSONALIZADO
app.use((req,res,next)=>{
    next();
})

app.get('/post',ctrolGetAllPost)
app.post('/post',ctrolCreatePost)
// app.patch('/',(req,res)=>{
//     res.send('metodo PATCH')
// })
// app.put('/',(req,res)=>{
//     res.send('metodo PUT')
// })
// app.delete('/',(req,res)=>{
//     res.send('metodo DELETE')
// })

//todo SERVIDOR EN ESCUCHA
app.listen(3000)
console.log("server on port 3000")

// GET --> Obtener recursos
// POST --> Crear recursos
// PATCH --> Editar recursos ya creados de forma parcial
// DELETE --> Eliminar recursos
// PUT --> Editar un recursos si existe y sino, lo crea.
