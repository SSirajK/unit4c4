const User = require("../models/user.model")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const generateToken = (user) =>{
    return jwt.sign({user},process.env.Secret_key)
}
const register = async (req, res) =>{
    try {
        let user = await User.findOne({email: req.body.email})
        if(user){
            return res.status(401).send({message: "Email already exists"})
        }
        user = await User.create(req.body)
        const token = generateToken(user)
        return res.status(200).send({user, token})
    } catch (err) {
        return res.status(401).send({message: err.message})
    }
}

const login = async (req, res) => {
    try {
        const user = await User.findOne({email:req.body.email})
        if(!user){
            return res.status(401).send({message: "Wrong email or password"})
        }
        const pas = user.checkPassword(req.body.password)
        if(!pas){
            return res.status(401).send({message: "Wrong email or password"})
        }
        const token = generateToken(user)
        return res.status(200).send({user, token})
    } catch (err) {
        return res.status(401).send({message: err.message})
    }
}

module.exports = {register, login, generateToken}