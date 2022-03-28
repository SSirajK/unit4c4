require("dotenv").config()
const jwt = require("jsonwebtoken")

const verifyToken = (token) =>{
    return new Promise((resolve, reject) =>{
        jwt.verify(token, process.env.Secret_key, (err,decoded)=>{
            if(error){
                return reject(err)
            }
            return resolve(decoded)
        })
    })
}

const authenticate = async (req, res, next)=>{
    if(!req.headers.authorization){
        return res.status(401).send({message: "incorrect token"})
    }
    if(!req.headers.authorization.startsWith("Bearer ")){
        return res.status(401).send({message: "incorrect token"})
    }
    const token = req.headers.authorization.trim().split(" ")[1]
    let decoded;
    try {
        decoded = await verifyToken(token)
    } catch (err) {
        return res.status(401).send({message:err.message})
    }
    req.userID = decoded.user._id
    return next()
}
module.exports = authenticate;