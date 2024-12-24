// 5.13: blogilistan testit, step1
// Tee testi, joka varmistaa että blogin näyttävä komponentti
// renderöi blogin titlen ja authorin mutta ei renderöi oletusarvoisesti
// urlia eikä likejen määrää. Mikäli toteutit tehtävän 5.7,
// niin pelkkä titlen renderöinnin testaus riittää.

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'
import { expect } from 'vitest'

// 5.13
test('blog component renders blog title and author but not likes or url', () => {
  const blog = {
    'id': '5a422b891b54a676234d17fa',
    'title': 'First class tests',
    'author': 'Robert C. Martin',
    'url': 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
    'likes': 10
  }
  render(<Blog blog={blog} />)

  // checking that the title is included in the render, exact: false because there is also other than text in the render
  const titleElement = screen.getByText('First class tests Robert C. Martin', { exact: false } )
  // checking that the url&likes are not included, queryByText doesn't throw an error when it doesn't find the content
  const urlElement = screen.queryByText('http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html')
  const likesElement = screen.queryByText('likes: 10')

  expect(titleElement).toBeDefined()
  expect(urlElement).toBeNull()
  expect(likesElement).toBeNull()
})

// 5.14
// when user clicks to see all information, the system shows all the information after that
test('all information in view after click', async () => {
  const blog = {
    'id': '5a422b891b54a676234d17fa',
    'title': 'First class tests',
    'author': 'Robert C. Martin',
    'url': 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
    'likes': 10,
    'user': {
      username: 'veryangryduck',
      name: 'iko'
    }
  }
  // creating user event session where user clicks the view button once and should see
  // all the blog information after that, including url, likes and username for creator
  const mockHandler = vi.fn()
  const mockUpdateHandler = vi.fn()

  render(<Blog blog={blog} handleViewClick={mockHandler} handleUpdate={mockUpdateHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const urlElement = screen.findByText('http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html')
  const likesElement = screen.findByText('likes: 10')
  const userElement = screen.findByText('iko')

  expect(urlElement).toBeDefined()
  expect(likesElement).toBeDefined()
  expect(userElement).toBeDefined()
})

// 5.15
test('if like button is clicked twice then event handler is called twice', async () => {

  const blog = {
    'id': '5a422b891b54a676234d17fa',
    'title': 'First class tests',
    'author': 'Robert C. Martin',
    'url': 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
    'likes': 10,
    'user': {
      username: 'veryangryduck',
      name: 'iko'
    }
  }

  // creating a mock event handler and user session where user clicks view and then
  // like button two times, and we check that the event handler for like is called twice
  const mockHandler = vi.fn()

  render(<Blog blog={blog} handleUpdate={mockHandler} />)

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)

})