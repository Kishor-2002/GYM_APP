const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    }
})

//static signup method
userSchema.statics.signup = async function (email,password){        //use funcrtion keyword instead of arrow function while using this class
    if(!email || !password){
        throw Error('All fields must be required')
    }
    if(!validator.isEmail(email)){
        throw Error('Enter a valid email')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Please enter a strong password')
    }
    const exists = await this.findOne({email})

    if(exists){
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10); //the more the no., more the timme will be taken for the hackers to hack it and users will also take some time to login - Higher values make the hashing process slower but more secure against brute-force attacks.
    
    const hash = await bcrypt.hash(password,salt);
    const user = await this.create({email,password:hash})
    return user;
}

userSchema.statics.login = async function(email,password){
    if(!email || !password){
        throw Error('All fields must be required')
    }

    const user = await this.findOne({email})
    if(!user){
        throw Error('Incorrect Email')
    }

    const match = await bcrypt.compare(password,user.password)
    if(!match){
        throw Error('Incorrect Password')
    }
    return user
}

module.exports = mongoose.model('User',userSchema)

//npm install bcrypt - used to encrypt the password before saving to the DB
// npm install validator - validates char of signup