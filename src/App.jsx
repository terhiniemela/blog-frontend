import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [messageType, setMessageType] = useState('')
  
  // fetching all the blogs first
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
    console.log("hello")
  }, [])

  // fetching user data from local storage if it exists
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      alertUser("user logged in", "notification")
    }
  }, [])

  // alert user with a notification
  const alertUser = (message, type) => {
    console.log("in alertuser")
    setMessageType(type)
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage(null)
      setMessageType(null)
    }, 5000)
  }

  // login handler
  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    if (!username || !password) {
      console.log("username or password missing")
      alertUser("username missing or pw", "error")
      setUsername('')
      setPassword('')
    }

    try {
        const user = await loginService.login({
          username, password,
      })
        blogService.setToken(user.token)
        setUser(user)
        setUsername('')
        setPassword('')
      } catch (exception) {
        console.log("error")
    }
  }

  // logout handler
  // logged user is stored in local storage so we need to remove the user from there
  const handleLogout = (event) => {
      
    if(user) {
      alertUser("log out successful", "notification")
      console.log("logout")
      window.localStorage.removeItem('loggedBlogAppUser')
      setUser(null)
      setUsername('')
      setPassword('')
    }
    else {
      alertUser("no one logged in", "error")
    }
  }

/*

  // form for login
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const blogForm = () => {
    const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
    const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>add blog</button>
        </div>
        <div style={showWhenVisible}>
        <BlogForm>
            addBlog={addBlog}
            handleTitleChange={({target}) => setNewTitle(target.value)}
            handleAuthorChange={({target}) => setNewAuthor(target.value)}
            handleUrlChange={({target}) => setNewUrl(target.value)}
            title={newTitle}
            author={newAuthor}
            url={newUrl}
        </BlogForm>
          <button onClick={() => setBlogFormVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  */

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
      alertUser("new blog added", "notification")
    }
    catch (exception) {
      alertUser("error adding blog", "error")
    }

  }

  /*
  // we want to only show the login when user is not logged in
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notificationMessage} messageType={messageType} />
        
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
      </div>
    )
  }
    */


  // otherwise user will be shown the logged in user, form for creating blog data
  // and a list of blogs
  return (
    <div>
      <h2>blogs</h2>

      <Notification message={notificationMessage} messageType={messageType} />

      {!user &&
      <Togglable buttonLabel='login'>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
      }

      {user && <div>
         <p>{user.name} logged in
          <button onClick={handleLogout}>logout</button></p>
        </div>
      }
      
      {user && <div>
      <h2>create new</h2>
      <Togglable buttonLabel='add blog'>
          <BlogForm
            handleSubmit={addBlog}
            handleTitleChange={({ target }) => setNewTitle(target.value)}
            handleAuthorChange={({ target }) => setNewAuthor(target.value)}
            handleUrlChange={({ target }) => setNewUrl(target.value)}
            title={newTitle}
            author={newAuthor}
            url={newUrl}>
          </BlogForm>
      </Togglable>
      </div>
      }

      <h2>bloglist</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

    </div>
  )
}

// component for showing notifications
const Notification = ({ message, messageType }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={messageType}>
      {message}
    </div>
  )
}

export default App