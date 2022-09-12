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
        res.redirect("/")
    }catch(err){
        console.log(err)
        res.send("server error")
    } 
})


module.exports = router