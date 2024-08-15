const Workout = require('../models/WorkoutModels')
const mongoose = require('mongoose')

//get all workouts
const getWorkouts = async(req,res) => {
    const user_id = req.user._id
    const workouts = await Workout.find({user_id}).sort({createdAt : -1})
    console.log(workouts)
    res.status(200).json(workouts)
}

//get single workout
const getWorkout = async(req,res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such Workouts'})
    }
    const workouts = await Workout.findById(id)
    if(!workouts){
        return res.status(404).json({error:'No such Workouts'})
    }
    res.status(200).json(workouts)
}

//post a workout
const postWorkout = async(req,res) => {
    const {title,reps,load} = req.body;
    let emptyFields = [];
    if(!title){
        emptyFields.push('title')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(emptyFields.length>0){
        return res.status(400).json({error:"Please fill in all the fields",emptyFields})
    }
    try{
        const user_id = req.user._id
        const workout = await Workout.create({title,reps,load,user_id})
        res.status(200).json(workout)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

//delete a workout
const deleteWorkout = async(req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such Workouts'})
    }
    const workouts = await Workout.findByIdAndDelete(id)
    if(!workouts){
        return res.status(404).json({error:'No such Workouts'})
    }
    res.status(200).json({message : `Workout with Id ${workouts.id} is deleted`})
}

const updateWorkout = async(req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such Workouts'})
    }
    const workouts = await Workout.findOneAndUpdate({_id : id},{
        ...req.body
    })
    if(!workouts){
        return res.status(404).json({error:'No such Workouts'})
    }
    res.status(200).json(workouts)
}

module.exports = {
    getWorkouts,
    getWorkout,
    postWorkout,
    deleteWorkout,
    updateWorkout
}