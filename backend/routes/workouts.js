const express = require('express')
const {getWorkouts,getWorkout,postWorkout,deleteWorkout,updateWorkout} = require('../controllers/workoutController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

//Get all Workouts
router.get('/',getWorkouts)

//get a single workout
router.get('/:id',getWorkout)

//Post a new Workout
router.post('/', postWorkout);

//Delete a workout
router.delete('/:id',deleteWorkout)

//update a single workout
router.patch('/:id',updateWorkout)

module.exports=router