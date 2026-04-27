
import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'



export default function Login() {
    let [email, setEmail] = useState("")
    let [pswd,setPassword] = useState("")
    let chalo=useNavigate()
    async function login_func(){
        try {
            if(!email || !pswd){
                toast.error("All Fields are Required")
                return
            }
            let res = await axios.post("http://localhost:5003/login",{
                email :email,
                password:pswd
            })
            localStorage.setItem("user_data",JSON.stringify({"token":res.data.token,"user_info":res.data.user}))
            toast.success(res.data.msg)
            chalo("/show")
        } catch (error) {
            toast.error(error.response?.data.message)
            
        }
    }

  return (
    <div className="container">
        <ToastContainer/>
        <h1>Login Your Account</h1>
        <p>Enter Your Email</p>
        <input type="email" className='form-control my-3' onChange={(e)=>setEmail(e.target.value)} value = {email} />

        <p>Enter Your Password </p>
        <input type="password" className='form-control my-3' onChange={(e)=>setPassword(e.target.value)} value = {pswd} />
        <button className='btn btn-primary my-3' onClick={login_func}>Login</button>
        <br />
        <Link to ="/cr">Create Your Account</Link>
    </div>
  )
}
