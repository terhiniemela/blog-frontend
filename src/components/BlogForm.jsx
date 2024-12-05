import { useState } from 'react'
import PropTypes from 'prop-types'

// form for adding a blog to the list and db
const BlogForm = ({ createBlog }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  // adding and creating blog

  const addBlog = async (event) => {
    event.preventDefault()

    // data for new blog
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }
    createBlog(newBlog)

    // try to add new blog and update the state of blogs
    // notification of successful or unsuccessful operation
    try {
      //alertUser("new blog added", "notification")
    }
    catch (exception) {
      //alertUser("error adding blog", "error")
    }

  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          type="text"
          value={newTitle}
          onChange={({ target }) => setNewTitle(target.value)} />
      </div>
      <div>
        author:
        <input
          type="text"
          value={newAuthor}
          onChange={({ target }) => setNewAuthor(target.value)} />
      </div>
      <div>
        url:
        <input
          type="text"
          value={newUrl}
          onChange={({ target }) => setNewUrl(target.value)}/>
      </div>
      <button type="submit">create</button>
    </form>
  )
}

BlogForm.PropTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm