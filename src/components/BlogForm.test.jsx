import { render, screen } from "@testing-library/react"
import BlogForm from "./BlogForm"
import userEvent from "@testing-library/user-event"
import { expect } from "vitest"

const blog = {
    title: "Ardiente amor",
    author: "Café Quijano",
    url: "www.cafequijano.com",
}

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    const { container } = render(<BlogForm createBlog={createBlog} />)

    const inputTitle = container.querySelector("#blogTitle")
    const inputAuthor = container.querySelector("#blogAuthor")
    const inputUrl = container.querySelector("#blogUrl")
    const sendButton = screen.getByText("Create")

    await user.type(inputTitle, blog.title)
    await user.type(inputAuthor, blog.author)
    await user.type(inputUrl, blog.url)
    await user.click(sendButton)

    expect(createBlog).toHaveBeenCalledTimes(1)
    console.log(createBlog.mock.calls)
    expect(createBlog.mock.calls[0][0].title).toBe("Ardiente amor")
    expect(createBlog.mock.calls[0][0].author).toBe("Café Quijano")
    expect(createBlog.mock.calls[0][0].url).toBe("www.cafequijano.com")
})