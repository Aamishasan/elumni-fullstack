import React, { useState } from 'react'
import api from '../api'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();
  
  const handleSubmit = async (event) => {
    event.preventDefault()
    // console.log(username, password)
  
    try {
      // const res = await api.post('api/token/', {username, password})
      const res = await axios.post('http://127.0.0.1:8000/api/token/', {username, password})
      

      localStorage.setItem('access_token', res.data.access)
      localStorage.setItem('refresh_token', res.data.refresh);
      navigate('/');
    }
     catch (error)
      {
      alert(error)
    }
  
  }
  
  return (

    <>
      <form onSubmit={handleSubmit} >
        <h1>Login</h1>

        <h3>User Name</h3>
      <input type="text" value={username}
        placeholder='please enter your username'
        onChange={(e)=>{setUsername(e.target.value)}}
        />

          <h3>Password</h3>
        <input type="password" value={password}
        placeholder='please enter your password'
        onChange={(e)=>{setPassword(e.target.value)}}
        />

<br />
<br />
        <button type="submit">Login</button>

      </form>
    </>
  )
}

export default Login
