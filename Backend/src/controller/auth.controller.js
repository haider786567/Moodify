const userModel = require("../model/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const redis = require("../config/cache")

async function Register(req,res,next){
    try{

        const {username,email,password}= req.body;
        const isAlreadyExist = await userModel.findOne({
            $or:[
                {
                    email
                },
                {
                    username
                }
            ]
    
        })
        if(isAlreadyExist){
            const error = new Error("User already exist")
            error.status = 400
            return next(error)
            
        }
        const hash = await bcrypt.hash(password ,10)
        const user = await userModel.create({
            username,
            email,
            password:hash
        })
        const token = jwt.sign({
            id:user._id,
            username:user.username
        },process.env.JWT_SECRET,{expiresIn:"1d"})
        console.log(req.cookies.token);
        res.cookie("token",token)
        res.status(200).json({
            message:"register Succesfully",
            user:{
                id: user._id,
                username: user.username,
                email: user.email
            }
        })
    }
    catch(err){
        err.status = 500
        next(err)


    }



}
async function Login(req,res,next ){
    try{


        const {username,email,password}= req.body
        const user = await userModel.findOne({
            $or:[
                {email},
                {username}
            ]
        })
        if(!user){
            const error = new Error("User not found")
            error.status = 404
            return next(error)
        }
        const isPasswordMatched =await  bcrypt.compare(password,user.password)
        if(!isPasswordMatched){
            const error = new Error("Invalid credentials")
            error.status = 404
            return next(error)
            
        }
        const token = jwt.sign({
            id:user._id,
            username:user.username
    
        },process.env.JWT_SECRET,{expiresIn:"1d"})
        res.cookie("token",token)
        res.status(200).json({
            message:"login succesfully",
            user:{
                id: user._id,
                username: user.username,
                email: user.email
            }
        })
    }catch(err){
        err.status = 500
        next(err)
    }

}
async function Logout(req,res){
    const token = req.cookies.token
    res.clearCookie("token")
    await redis.set(token,Date.now().toString(),"EX", 60*60)
    res.status(200).json({
        message:"Logout Succesfully"
    })
    

}
async function getme(req,res){
    const user =  await userModel.findById(req.user.id).select("-password")
    res.status(200).json({
        message:"fetched",
        user
    })
}
module.exports = {
    Register,
    Login,
    Logout,
    getme
}