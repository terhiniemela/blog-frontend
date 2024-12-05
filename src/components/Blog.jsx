
import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, handleUpdate, handleDelete }) => {

  const [viewMoreOn, setViewMoreOn] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleViewClick = (event) => {
    event.preventDefault()
    console.log('blog:', blog)
    console.log('user:', user)
    setViewMoreOn(true)
  }

  const handleHideClick = () => {
    setViewMoreOn(false)
  }

  const handleLikeClick = (event) => {
    console.log(blog)
    event.preventDefault()

    const updatedBlog = {
      id: blog.id,
      likes: blog.likes+1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      user: blog.user.id
    }
    console.log(updatedBlog)

    handleUpdate(updatedBlog)
  }

  const handleDeleteClick = (event) => {

    event.preventDefault()
    handleDelete(blog)
  }

  if (viewMoreOn) {
    return (
      <div style={blogStyle}>
        <div>
          <p>{blog.title} {blog.author}<button onClick={handleHideClick}>hide</button></p>
          <p>{blog.url}</p>
          <p>likes:
            {blog.likes}
            <button onClick={handleLikeClick}>like</button>
          </p>
          <p>{blog.user.name}</p>
          {user && user.username === blog.user.username &&
          <p><button onClick={handleDeleteClick}>delete</button></p>
          }
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

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleUpdate: PropTypes.func.isRequired
}

export default Blog