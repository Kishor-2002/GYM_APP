import React from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import {formatDistanceToNow} from 'date-fns/formatDistanceToNow'
import { useAuthContext } from '../hooks/useAuthContext';

const WorkoutDetails = ({workout}) => {
  const {dispatch} = useWorkoutsContext()
  const {user} = useAuthContext();
  const date = new Date(workout.createdAt);

  const handleDelete=async()=>{
    if(!user){
      return;
  }
    const response = await fetch('/api/workout/'+workout._id,{
      method:'DELETE',
      headers:{
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()
    if(response.ok){
      dispatch({type:'DELETE_WORKOUT',payload : json})
    }
  }
  return (
    <div className='workout-details'>
        <h4>{workout.title}</h4>
        <p><strong>Load in kg(s) : </strong>{workout.load}</p>
        <p><strong>Reps : </strong>{workout.reps}</p>
        {/* <p>{workout.createdAt}</p> */}
        <p>{formatDistanceToNow(date,{addSuffix:true})}</p>
        <span className='material-symbols-outlined' onClick={handleDelete}>delete</span>
    </div>
  )
}

export default WorkoutDetails