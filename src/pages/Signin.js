import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signin = ({Signin}) => {
  const navigate = useNavigate()
  const [name,setName] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage , setErrorMessage] = useState("")
  const [users,setUsers] = useState(null)

  const submitHandler = (e) => {
    e.preventDefault()
    const completeData = axios.get('http://localhost:3001/users')

    completeData.then((info) => {
      setUsers(info.data)
    })

    if (users){
      let flag = 0
      users.forEach(person => {
        if (person.name === name)
        {
          flag = 1                                                           //Flag = 1 only if the user's name pre-exists
          if (person.password === password)
          {
            Signin(person.name)
            navigate("/")
          }
          else{
            setErrorMessage("Wrong password")
            setTimeout(() => {
              setErrorMessage("")
            },3000)
          }
        }
      })
      if(flag === 0)                                                          //Flag = 0 indicates the user's name doesnt exist
      {
        setErrorMessage("You are not registered.Register yourself first")
        setTimeout(() => {
          setErrorMessage("")
        }, 10000);
      }
    }
  }


  return (
    <div id="signin-form">

      <div>
        <h2>Enter your credentials...</h2>
      </div>

      <form onSubmit={submitHandler}>
        <div>
          {errorMessage ? <h2>{errorMessage}</h2>: null}
        </div>
        <div>
          <h3>name:</h3><input type="text" placeholder="Type your name here..." value={name} onChange={(e) => setName(e.target.value)} style={{width: "400px",height: "20px"}}></input>
        </div>
        <div>
          <h3>password:</h3><input type="password" placeholder="type your password here..." value={password} onChange={(e) => setPassword(e.target.value)} style={{width: "400px",height: "20px"}}></input>
        </div>
        <div>
          <button type="submit" style={{marginTop: "20px",width: "405px",height: "30px",backgroundColor: "pink",fontSize: "large"}}>Login</button>
        </div>
      </form>
    
      <h4>Not registered? <a href='/signup' style={{color: 'red', textDecoration: 'none'}}>Register</a> here</h4>
    </div>
  )


}

export default Signin