const express =require("express")
const router = express.Router()
const db= require("../models")

// GET /users/new -> renders form to create a new user
router.get("/new", (req, res)=>{
    // res.send('show a new user form')
    res.render("users/new.ejs")
})

// POST /users -> create a new user in the db
router.post("/", async (req, res)=>{
    // console.log(req.body)
    // res.send('create a new user in db')
    try{
         // create a new user
         const newUser = await db.user.create(req.body)
        // store as cookie in browser
        res.cookie("userId", newUser.id)
        // redirect to the home page
        res.redirect("/")
    }catch(err){
        console.log(err)
        res.send("server error")
    } 
})

// LOGGING IN
//  GET /users/login -> show a login form to user
router.get("/login", (req, res)=>{
    // res.send("show log in form")
    res.render("users/login.ejs")
})

//  POST /users/login -> accept a payload of form data and use it to log user in
router.post("/login", (req, res)=>{
    res.send("log in user")
    console.log(req.body)
})
// GET/users/logout -> log out a user by clearing stored cookie
router.get("/logout", (req, res)=>{
    res.send("log user out")
})




module.exports = router