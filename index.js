// req packages
require("dotenv").config()
const express = require("express")
const ejsLayouts = require("express-ejs-layouts")
const cookieParser = require("cookie-parser")
const db = require("./models")

// config express/app middlewares
const app = express()
const PORT = process.env.port || 3000
app.set("view engine", "ejs")
app.use(ejsLayouts)
app.use(express.urlencoded ({extended: false}))
app.use(cookieParser())

// custom middleware for cookies
app.use(async (req, res, next) =>{
    // console.log("hello from mw 🐸")
    // if there is a cookie on incoming req
    if(req.cookies.userId){
        // look up userin db
        const user = await db.user.findbyPk(req.cookies.userId)
        // mount user on res.local
        res.locals.user = user
    }else{
          // if no user or cookie: set user to null in res.local
          res.locals.user= null
    }
    // move on to next route or middleware
    next()
})

// routes
app.get ("/", (req, res)=>{
    res.render("home.ejs")
    console.log("incoming cookie 🍪", req.cookies)
})

// controllers
app.use("/users", require ("./controllers/users"))

// listen on a port
app.listen(PORT, ()=> console.log (`hamsters are running on port: ${PORT} 🐹`))