import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
 // const [newBlog, setNewBlog] = useState(null)
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

  // alert user
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

  const addBlog = async (event) => {
    event.preventDefault()

    // data for new blog
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }

    try {
      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      alertUser("new blog added", "notification")
    }
    catch (exception) {
      alertUser("error adding blog", "error")
    }

  }

  // form for adding a blog to the list and db
  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          type="text"
          value={newTitle}
          name="title"
          onChange={({target}) => setNewTitle(target.value)} />
      </div>
      <div>
        author:
        <input 
          type="text"
          value={newAuthor}
          name="author"
          onChange={({target}) => setNewAuthor(target.value)} />
      </div>
      <div>
        url:
        <input 
          type="text"
          value={newUrl}
          name="url"
          onChange={({target}) => setNewUrl(target.value)}/>
      </div>
      <button type="submit">create</button>
    </form>  
  )

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

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={notificationMessage} messageType={messageType} />

      {!user && loginForm()}
      {user && <div>
         <p>{user.name} logged in
          <button onClick={handleLogout}>logout</button></p>
        </div>
      }

      <h2>create new</h2>
      {user && blogForm()}


      <p>bloglist</p>
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