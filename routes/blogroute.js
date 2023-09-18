const {Router}=require("express");
const isAuth = require("../middlewares/Auth");

const blogRoute=Router();


blogRoute.get("/",(req, res)=>{

    res.render("blog")
});

blogRoute.post("/add",isAuth,async(req, res)=>{
     await blog.create(req.body);   
     req.body.userId=req.user.id;
          console.log(req.body);
          res.send("Done adding")

});

blogRoute.get("/data",async(req,res)=>{

       let blog = await blogs.find().populate("userId",)
});