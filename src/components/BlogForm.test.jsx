import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import BlogForm from './BlogForm'
import { expect } from 'vitest'

// 5.16
test('blog form props are correct', async () => {
    const user = userEvent.setup()
    const createBlog = vi.fn()

    render(<BlogForm createBlog={createBlog} />)

    const titleInput = screen.getByPlaceholderText('title here')
    const authorInput = screen.getByPlaceholderText('author here')
    const urlInput = screen.getByPlaceholderText('url here')
    const createButton = screen.getByText('create')

    // gatherin user input data from different fields
    // gathering multiple inputs requires await
    await user.type(titleInput, 'creative blog title')
    await user.type(authorInput, 'cool author name')
    await user.type(urlInput, 'http://www.google.com')
    await user.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('creative blog title')
    expect(createBlog.mock.calls[0][0].author).toBe('cool author name')
    expect(createBlog.mock.calls[0][0].url).toBe('http://www.google.com')
  
})