require("dotenv").config()
const ConnectToDb = require("./src/config/database")
ConnectToDb()

const app = require("./src/app")
const { Redis } = require("ioredis")
app.listen(3000, ()=>{
    console.log("server is running");
})
