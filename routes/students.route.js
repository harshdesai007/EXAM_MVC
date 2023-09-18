const { Router } = require("express");
const {
  Student_add,
  StudentImage,
  studentdata,
  getadmin,
} = require("../controllers/student.controller");
const {
  check_data,
  checkCookies,
} = require("../middlewares/student.middleware");
const multer = require("multer");
const user = require("../models/studentsignup");
const passport = require("passport");
const isAuth = require("../middlewares/Auth");

let router = Router();

let storage = multer.diskStorage({
  destination: "images",
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
}).array("profile");

router.post("/image", upload, StudentImage);

router.get("/", getadmin);

router.get("/upload", checkCookies, (req, res) => {
  res.render("imgupload");
});

router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/data", studentdata);

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", async (req, res) => {
  console.log(req.body);
  await user.create(req.body);
  res.cookie("user", req.body.username);
  res.send("checking ");
});

router.post("/add", check_data, Student_add);
router.get("/setcookie", (req, res) => {
  res.cookie("cookie", "pritiarray");
  res.send(" cookies ");
});

let count = 0;
router.get("/count", (req, res) => {
  count++;
  res.send(`total ${count}`);
});

router.get("/session", (req, res) => {
  if (req.session.visit) {
    req.session.visit++;
    res.send(`session ${req.session.visit}`);
  } else {
    req.session.visit = 1;
    res.send(`session ${req.session.visit}`);
  }
});

//  login
router.get("/login", (req, res) => {
  res.render("login");
});
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/student",
    failureRedirect: "/student/login",
  }),
  async (req, res) => {
    res.send("done");
  }
);

router.get("/getstudent", isAuth, (req, res) => {
  console.log(req.user);
  res.send(req.user);
});

router.get("/logout", (req, res) => {
  req.logOut((err) => {
    if (err) {
      console.log(err);
    }
  });
  res.send("logout");
});

router.get("/user", isAuth, (req, res) => {
  res.render("profile");
});

router.get("/userdetails", isAuth, (req, res) => {
  res.send(req.user);
});

router.get("/sendmail",(req, res) => {
  const mailoptions={
    from:"",
    to:"",
    subject:"",
    html:`<a href="localhost:7080/student/verify/${otp}">otp ${otp}</a>`
   }

    let otp=Match.floor(match.rendom()*10000)

    transport.sendmail(mailoptions,(err,info)=>{

       if (err) {
         console.log(err);
       }
       else{
         console.log(info);
       }
       res.send("test mailer successfully");
       
    });
});

router.get("/verify/:otp",(req,res)=>{

       if(otp=req.params.otp){
        res.send("otp match")
       }
       else{
        res.send("not match");
       }
    
  })

module.exports = router;
c