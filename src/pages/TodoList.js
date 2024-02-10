import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'

const TodoList = ({user}) => {
  const [todolist , setTodolist] = useState([])
  const [todoNote , setTodoNote] = useState("")

  useEffect(() => {
    axios
      .get('http://localhost:3004/todo')
      .then((response) => {
        setTodolist(response.data.filter(item => item.author === user))
      })
  },[])

  const submitHandler = (e) => {
    e.preventDefault()
    const newTodoObject = {
      content: todoNote,
      author: user
    }
    axios.post('http://localhost:3004/todo',newTodoObject).then(response => {
      setTodolist(todolist.concat(response.data))
      setTodoNote("")
    })
  }

  const deleteHandler = (id) => {
    axios.delete(`http://localhost:3004/todo/${id}`)
    setTodolist(todolist.filter(item => item.id !== id))
  }
  
  return (
    <div>
      <Navbar />
      <h1 style={{color: "red"}}>To do list</h1>
      <form onSubmit={submitHandler}>
        <input value={todoNote} onChange={(e) => setTodoNote(e.target.value)}></input>
        <button type="submit">add note</button>
      </form>
      {todolist.map(item => {
        return <h2 key={item.id}>{item.content} <button onClick={() => deleteHandler(item.id)}>delete</button></h2>
      })}
    </div>
  )
}

export default TodoList