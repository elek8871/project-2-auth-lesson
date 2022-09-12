// req packages
require("dotenv").config()
const express = require("express")
const ejsLayouts = require("express-ejs-layouts")

// config express/app middlewares
const app = express()
const PORT = process.env.port || 3000
app.set("view engine", "ejs")
app.use(ejsLayouts)

// routes
app.get ("/", (req, res)=>{
    res.render("home.ejs")
})

// listen on a port
app.listen(PORT, ()=> console.log (`hamsters are running on port: ${PORT} 🐹`))