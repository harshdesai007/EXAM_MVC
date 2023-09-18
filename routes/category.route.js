const {Router}=require("express")

const cateroute=Router()

cateroute.post("/",async(req, res,)=>{
    await category.create(req.body)
})


module.exports =cateroute;