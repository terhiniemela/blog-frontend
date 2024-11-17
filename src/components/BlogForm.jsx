import { useState } from 'react'
//import blogService from '../services/blogs'


// form for adding a blog to the list and db
const BlogForm = ({handleSubmit, handleTitleChange, handleAuthorChange,
                    handleUrlChange, title, author, url}) => {
/*    
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

    // try to add new blog and update the state of blogs
    // notification of successful or unsuccessful operation
    try {
      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      //alertUser("new blog added", "notification")
    }
    catch (exception) {
      //alertUser("error adding blog", "error")
    }

}
*/
return (
    <form onSubmit={handleSubmit}>
      <div>
        title:
        <input
          type="text"
          value={title}
          onChange={handleTitleChange} />
      </div>
      <div>
        author:
        <input 
          type="text"
          value={author}
          onChange={handleAuthorChange} />
      </div>
      <div>
        url:
        <input 
          type="text"
          value={url}
          onChange={handleUrlChange}/>
      </div>
      <button type="submit">create</button>
    </form>  
  )
}

  export default BlogForm