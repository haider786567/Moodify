
const jwt = require("jsonwebtoken");
const redis = require("../config/cache")
async function identifyUser(req,res,next){
    const token = req.cookies.token
    if(!token){
        return res.status(404).json({
            message:"Invalid token"
        })
    }
    const TokenCheck = await redis.get(token)
        if(TokenCheck){
            return res.status(404).json({
                message:"token is not authorized Please register again"
            })
    
        }
    let decoded = null
    try{
        decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded
        next()

    }catch(err){
        return res.status(404).json({
            message:"token in valid"
        })

    }

}

module.exports = {
    identifyUser
}