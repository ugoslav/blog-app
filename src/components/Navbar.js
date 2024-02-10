import React from 'react'

const Navbar = () => {
  
  return (
    <div id="navBar">
      <a href="/" id='nav-option'><h2>Home</h2></a>
      <a href='/blogs' id='nav-option'><h2>blogs</h2></a>
      {sessionStorage.getItem("user") ? <a href='/to-do' id='nav-option'><h2>To-do-list</h2></a>: null}
      {sessionStorage.getItem("user") ? <h2 id='nav-option'>Welcome {sessionStorage.getItem("user")}</h2> : <a href='/signin' id="nav-option"><h2>Sign-in</h2></a>}
      {sessionStorage.getItem("user") ? <a href='/' id='nav-option' onClick={() => sessionStorage.clear()}><h2>Logout</h2></a> : null}
    </div>
  )
}

export default Navbar