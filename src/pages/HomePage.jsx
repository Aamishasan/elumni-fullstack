import React from 'react'
import ProtectedRoute from '../components/ProtectedRoute'
import { useEffect, useState } from 'react'
import api from '../api'

const HomePage = () => {
const [tasks, setTasks] = useState([])

  const [title, setTitle] = useState('')
  const [description, setContent] = useState('')
  const [date, setDate] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    // console.log(title, description, date)
    try {
    const res = await api.post('api/user/todo/', {title, description, date})
    getToDo();
    } catch (error) {
      alert('error')
    }
    // setTasks([...tasks, res.data])
    setTitle('')
    setContent('')
    setDate('')
  }
  useEffect(
    ()=>{
      getToDo();
    }
    ,[]
  )

  async function getToDo ()  {

    const res= await api.get ('api/user/todo/')
    setTasks(res.data)

  }

  return (
    <div>
      <h1>Your Tasks</h1>

      {
        tasks.map((task)=>{
          return (
            <div key={task.id} >
              <div>
                <h2>{task.title}</h2></div>
              
              <div>
                 <h3>{task.description}</h3>
                 {task.date}
              </div>
            </div>
          )
        })
      }


<form onSubmit={handleSubmit} >
        <h1>Add Task</h1>

        <h3>Title</h3>
      <input type="text" value={title}
        placeholder='please enter title of your next task'
        onChange={(e)=>{setTitle(e.target.value)}}
        />

          <h3>Description</h3>
        <textarea  value={description}
        placeholder='please enter details'
        onChange={(e)=>{setContent(e.target.value)}}
        />
        <h3>Date on which task must be completed</h3>

        <input type="date"
          value={date}
          onChange={(e)=>{setDate(e.target.value)}}
        />
<br />
<br />
        <button type="submit">Add Task</button>

      </form>



    </div>
  )
}

export default HomePage
