import { useState, useEffect } from 'react'

const Blog = ({ blog, handleUpdate }) => {

const [viewMoreOn, setViewMoreOn] = useState(false)
const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

const handleViewClick = () => {
  setViewMoreOn(true)
}

const handleHideClick = () => {
  setViewMoreOn(false)
}

const handleLikeClick = () => {
  console.log(blog)
  const updatedBlog = {
    id: blog.id,
    likes: blog.likes+1,
    author: blog.author,
    title: blog.title,
    url: blog.url
  }
  console.log(updatedBlog)

  handleUpdate(updatedBlog)
}

if (viewMoreOn) {
    return (
    <div style={blogStyle}>
        <div>
          <p>{blog.title}</p>
          <p>{blog.url}</p>
          <p>likes:  
            {blog.likes}
            <button onClick={handleLikeClick}>like</button>
          </p>
          <p>{blog.author}</p>
          <button onClick={handleHideClick}>hide</button>
        </div>
    </div>
  )}
  return (
    <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}
          <button onClick={handleViewClick}>view</button>
        </div>
    </div>
  )

 }

export default Blog