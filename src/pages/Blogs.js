import React, { useEffect , useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'

const BlogDisplay = ({blogdata , user , setBlogdata}) => {

  const likeHandler = (id) => {
    const blogToBeModified = blogdata.find(item => item.id === id)
    const modifiedBlog = {...blogToBeModified,likes: blogToBeModified.likes + 1}
    axios
      .put(`http://localhost:3002/blogs/${id}`,modifiedBlog)
      .then(response => {
        setBlogdata(blogdata.map(blog => blog.id !== id ? blog : response.data))
      })
  }

  const editHandler = (id) => {
    const input = prompt('Modify the text as you please...')
    const blogToBeModified = blogdata.find(item => item.id === id)
    const modifiedBlog = {...blogToBeModified , content: input , likes: 0}
    axios
      .put(`http://localhost:3002/blogs/${id}`,modifiedBlog)
      .then(response => {
        setBlogdata(blogdata.map(blog => blog.id !== id ? blog : response.data))
      })
  }

  const deleteHandler = (id) => {
    axios.delete(`http://localhost:3002/blogs/${id}`)
    setBlogdata(blogdata.filter(item => item.id !== id))
  }

  return(
    <>
      {blogdata.map(blog => {
        return <h2 key={blog.id}>{blog.content} <span style={{"color": "green"}}>likes</span> - {blog.likes} <button onClick={() => likeHandler(blog.id)}>like</button>{user === blog.author ? <div><button onClick={() => editHandler(blog.id)}>edit</button><button onClick={() => deleteHandler(blog.id)}>delete</button></div> : null}</h2>
      })}
    </>
  )
}

const Blogs = ({user}) => {
  const [blogdata, setBlogdata] = useState([])
  const [newBlog , setNewBlog] = useState("")

  useEffect(() => {
    axios
      .get('http://localhost:3002/blogs')
      .then(response => {
        setBlogdata(response.data)
      })
  },[])

  const submitHandler = (e) => {
    e.preventDefault()
    const newBlogObject = {
      content: newBlog,
      author: user,
      likes: 0
    }
    axios
      .post('http://localhost:3002/blogs', newBlogObject)
      .then(response => {
        setBlogdata(blogdata.concat(response.data))
        setNewBlog("")
      })
  }

  return (
    <div>
      <Navbar/>
      <div>
        Add a new blog:
        <form onSubmit={submitHandler}>
          <input value={newBlog} onChange={(e) => setNewBlog(e.target.value)}></input>
          <button type="submit">submit</button>
        </form>
        <div>
          {blogdata.length !== 0 ? <BlogDisplay blogdata={blogdata} user={user} setBlogdata={setBlogdata}/> : <h2>Wait a second...</h2>}
        </div>
      </div>
    </div>
  )
}

export default Blogs