import Blog from './Blog'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

const BlogList = ({ blogFormRef, createBlog, handleLogout, blogs, user, handleUpdate, handleDelete }) => {

return (
  <div>
    {user && <div>
      <p>{user.name} logged in
          <button onClick={handleLogout}>logout</button></p>
      <h2>create new</h2>
      <Togglable buttonLabel='add blog' blogFormRef={blogFormRef}>
          <BlogForm
            createBlog={createBlog}>
          </BlogForm>
      </Togglable>
      </div>
      }
    <h2>bloglist</h2>
    {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} handleUpdate={handleUpdate} handleDelete={handleDelete} />
     )}
    </div>  
)

}
export default BlogList