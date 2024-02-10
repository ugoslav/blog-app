import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {
  const navigate = useNavigate()
  const [name , setName] = useState("")
  const [password , setPassword] = useState("")

  const submitHandler = (e) => {
    e.preventDefault()

    const newUserObject = {
      name , password
    }

    axios
      .post('http://localhost:3001/users' , newUserObject)
      .then(response => {
        navigate('/signin')        
      })
  }
  return (
    <div id='signin-form'>
      <div>
        <h2>Registration form</h2>
      </div>

      <form onSubmit={submitHandler}>
        <div>
          <h3>name:</h3><input type="text" placeholder="Type your name here..." value={name} onChange={(e) => setName(e.target.value)} style={{width: "400px",height: "20px"}}></input>
        </div>
        <div>
          <h3>password:</h3><input type="password" placeholder="type your password here..." value={password} onChange={(e) => setPassword(e.target.value)} style={{width: "400px",height: "20px"}}></input>
        </div>
        <div>
          <button type="submit" style={{marginTop: "20px",marginBottom: "20px",width: "405px",height: "30px",backgroundColor: 'pink',fontSize: "large"}}>Add me</button>
        </div>
      </form>
    </div>
  )
}

export default Signup