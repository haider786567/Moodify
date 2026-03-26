const mongoose = require("mongoose")

function ConnectToDb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(res=>{
        console.log("db is connected");
    })
}
module.exports = ConnectToDb