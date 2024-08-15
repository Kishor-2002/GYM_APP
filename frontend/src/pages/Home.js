import React, { useEffect } from 'react'
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import {useAuthContext} from '../hooks/useAuthContext'

const Home = () => {
    const {workouts,dispatch} = useWorkoutsContext();
    const {user} = useAuthContext()

    useEffect(()=>{
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workout/',{
                headers:{
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            if(response.ok){
                dispatch({type:'SET_WORKOUTS',payload:json})
            }
        }
        if(user)
            fetchWorkouts();
    },[dispatch])
    return (
        <div className="home">
            <div className="workouts">
                {console.log("workouts "+ workouts)}
                {workouts && workouts.map((workout)=>(
                    <WorkoutDetails key={workout._id} workout={workout} />
                    // <p key={workout._id}>{workout.title}</p>
                    //started in http://localhost:3000/api/workout
                ))} 
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home