import React, { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';

const WorkoutForm = () => {
    const {dispatch} = useWorkoutsContext();
    const {user} = useAuthContext();
    const [title,setTitle] = useState('');
    const [load,setLoad] = useState('');
    const [reps,setReps] = useState('');
    const [error,setError] = useState('')
    const [emptyFields,setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!user){
            setError('You must be logged in')
            return;
        }
        const workout = {title,load,reps};
        const response = await fetch('/api/workout',{
            method:'POST',
            body:JSON.stringify(workout),
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${user.token}`

            }
        })
        const json = response.json();
        if(!response.ok){
            setError(json.error);//error is available in post method of backend code
            setEmptyFields(json.emptyFields);
        }
        if(response.ok){
            setTitle('')
            setReps('')
            setLoad('')
            setError(null);
            setEmptyFields([])
            console.log('new workout added');
            dispatch({type:'CREATE_WORKOUT',payload:json})
        }
    }
    return (
        <form className='create' onSubmit={handleSubmit}>
            <h3>Add a new Workout</h3>
            
            <label>Workout Title : </label>
            <input 
                type='text'
                onChange={(e)=>{setTitle(e.target.value)}}
                value={title}
                className={emptyFields && emptyFields.includes('title')?'error':''}
            />

            <label>Load (in kg) : </label>
            <input 
                type='number'
                onChange={(e)=>{setLoad(e.target.value)}}
                value={load}
                className={emptyFields && emptyFields.includes('load')?'error':''}
            />

            <label>Reps : </label>
            <input 
                type='number'
                onChange={(e)=>{setReps(e.target.value)}}
                value={reps}
                className={emptyFields && emptyFields.includes('reps')?'error':''}
            />
            <button>Add Workout</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default WorkoutForm