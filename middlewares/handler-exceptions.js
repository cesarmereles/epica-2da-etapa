export const handlerException = (err,_req,res,_next)=>{
    res.status(500).json({error:err})
    //res.render("hubo un error",{error:err})

}