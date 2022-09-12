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
    res.render("users/login.ejs",{
        // if msg exists pass it in as msg
        message: req.query.message ? req.query.message :null
    })
})

//  POST /users/login -> accept a payload of form data and use it to log user in
router.post("/login", async (req, res)=>{
    // res.send("log in user")
    // console.log(req.body)
    try{
        // look user in db via their email
        const user = await db.user.findOne({
            where: {
                email: req.body.email
            }
        })
        const noLoginMessage = "Incorrect user name or password"
            // iif user not found send back to login form
        if (!user) {
            console.log ("user not found")
            res.redirect ("/users/login?message=" + noLoginMessage)
            // if found but entered wrong password send back to login from
        } else if ( user.password !== req.body){
            console.log ("wrong password")
            res.redirect ("/users/login?message=" + noLoginMessage)
        } else {
             // if user found & pw match what is stored in dbthen log in user
         console.log("log in the user")
         res.cookie("userId", user.id)
         res.redirect("/")
        }

    }catch(err){
        console.log(err)
        res.send('server error')
    }
})
// GET/users/logout -> log out a user by clearing stored cookie
router.get("/logout", (req, res)=>{
    // res.send("log user out")
    // clear userid cookie
    res.clearCookie("userId")
    // redirect to home page
    res.redirect("/")
})




module.exports = router