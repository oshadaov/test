import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


const HomeReal = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials =true
  const handleLogout = () =>{
    axios.get('http://localhost:5000/auth/logout')
    .then(res => {
      if(res.data.status){
        navigate('/login')
      }
    }).catch(err => {
      console.log(err)
    })
  }
  return (
    <div>Home
      <br/>

<button><Link to="/dashboard">Dashboard</Link></button>
<br/>
<button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default HomeReal