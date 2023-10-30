const posts = 
[
    {
        title:"Seguridad Informática",
        description:"curso sobre seguridad informática y virus informáticos",
        image:"https://blog.hubspot.es/hubfs/media/queesseguridadinformatica.jpeg"
    },
    {
        title:"Seguridad Informática",
        description:"curso sobre seguridad informática y virus informáticos",
        image:"https://blog.hubspot.es/hubfs/media/queesseguridadinformatica.jpeg"
    }

]
// process.exit(1)


export const ctrolGetAllPost = (req,res) => {
    //throw new Error("Error de conexion a BASE DE DATOS")
    //res.status(200).send('metodo GET') 
    try {
        //!SI EL POST ENVIADO NO CONTIENE DATOS DEVUELVE 204 SIN CONTENIDO
        if(posts.length < 1){
            return res.sendStatus(204)
        }
        res.status(200).json(posts)    
    } catch (error) {
        console.log(error); 
        res.sendStatus(500)
    }
    
}

export const ctrolCreatePost = (req,res)=>{
    req
    // posts.push({
    //     title:"",
    //     description:"",
    //     image:" "
    // })
    
    res.sendStatus(201);
}
//forma tipo commonjs 
//export {miFuncion} 