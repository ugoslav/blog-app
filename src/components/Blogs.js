import axios from 'axios'
import React from 'react'

const BlogDisplay = ({content , likes, id , data , setBlogs}) => {

  const likeHandler = (id) => {
    axios.get('http://localhost:3002/blogs').then(response => {

      let blogToBeModified = response.data.find(item => item.id === id)

      let modifiedBlog = {...blogToBeModified, likes: blogToBeModified.likes + 1}
      
      axios.put(`http://localhost:3002/blogs/${id}`,modifiedBlog).then(response => {
        setBlogs(data.map(item => item.id !== id ? item : response.data))
      })
    })
  }

  return(
    <div id="blog" onClick={() => likeHandler(id)}>
      <h2>{content}</h2>
      <h2 style={{color: "deeppink",paddingRight: "60px"}}>{likes}</h2>
    </div>
  )
}

const Blogs = ({blogsObject , setBlogs}) => {
  const data = blogsObject.sort((a,b) => b.likes - a.likes).slice(0,6)

  return (
    <div id="blog-section">
      <h1 style={{textAlign: "center",fontFamily: "cursive",backgroundColor: "rgb(352,255,190"}}>Some nice blogs...<span style={{fontSize: "small",color: "green"}}>(click on the blogs to like)</span></h1>

      <div id="division-line"></div>

      <div id="blogs">
        {data.map(blog => {
          return <BlogDisplay key={blog.id} content={blog.content} likes={blog.likes} id={blog.id} data={data} setBlogs={setBlogs}/>
        })}
      </div>
    </div>
  )
}

export default Blogs