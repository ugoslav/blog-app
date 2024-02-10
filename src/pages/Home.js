import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Blogs from '../components/Blogs'
import News from '../components/News'
import Footer from '../components/Footer'
import axios from 'axios'

const Home = () => {
  const [blogs, setBlogs] = useState(null)
  const [news, setNews] = useState(null)

  useEffect(() => {
    axios
      .get('http://localhost:3002/blogs')
      .then(info => setBlogs(info.data))
    axios
      .get('http://localhost:3003/news')
      .then(info => setNews(info.data))
  },[])

  return (
    <div>
      <Navbar/>
      {blogs ? <Blogs blogsObject={blogs} setBlogs={setBlogs}/>: <h2>Wait just a second ...</h2>}
      {news ? <News newsObject={news} /> : null}
      {blogs ? <Footer />: null }
    </div>
  )
}

export default Home