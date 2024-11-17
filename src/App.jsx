import { useState, useEffect, useRef } from 'react'
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
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [messageType, setMessageType] = useState('')
  const blogFormRef = useRef()
  
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

  // adding and creating blog 
  // this will be passed to the blog form component as props
  const addBlog = (newBlog) => {
    // try to add new blog and update the state of blogs
    // notification of successful or unsuccessful operation

    blogService
      .create(newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        blogFormRef.current.toggleVisibility()
        alertUser("new blog added", "notification")}
      )
  }

  
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
      <Togglable buttonLabel='add blog' ref={blogFormRef}>
          <BlogForm
            createBlog={addBlog}>
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