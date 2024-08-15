require('dotenv').config()
const express=require('express')
const mongoose = require('mongoose')
const workoutRoutes=require('./routes/workouts')
const userRoutes=require('./routes/user')

const app = express()

// middleware - called before '/
app.use(express.json()) // it gets the JSON body where the type of the request in mentioned
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

//routes
// app.get('/',(req,res)=>{
//     res.json({msg:"welome"})
// })

//Registering the routes
app.use('/api/user',userRoutes)
app.use('/api/workout',workoutRoutes)

//Connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        //listen for requests
        app.listen(process.env.PORT,()=>{
            console.log("Connected to DB & Listening on port 4000")
        })
    })
    .catch((err)=>{console.log(err)})

