import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import React,{ useEffect } from 'react'


const Dashboard = () => {
        const navigate = useNavigate()
        axios.defaults.withCredentials = true;
        useEffect(()=>{
            axios.get('http://localhost:5000/auth/verify')
            .then(res=>{
                if(res.data.status){
                    navigate('/login')

                } else{
                }
            })
        })

    return (
    <div>Dashboard</div>
  )
}

export default Dashboard