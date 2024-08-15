const User = require('../models/userModels')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id:_id},process.env.SECRET,{expiresIn:'3d'})
}

//login
const loginUser = async(req,res) =>{
    const {email,password} = req.body

    try{
        const user = await User.login(email,password)

        //creaying token, un & password validated at the mongodb level
        const token = createToken(user._id)
        res.status(200).json({email,token})
    }catch (error){
        res.status(400).json({error:error.message})
    }
    // res.status(200).json({mssg: 'login user'})
}

//signup
const signupUser = async(req,res) =>{
    const {email,password} = req.body;

    try{
        const user = await User.signup(email,password)

        //creayting token
        const token = createToken(user._id)
        res.status(200).json({email,token})
    }catch (error){
        res.status(400).json({error:error.message})
    }
    
}

module.exports= {signupUser,loginUser}