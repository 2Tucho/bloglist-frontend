import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"
import { expect } from "vitest"

const blog = {
    title: "Ardiente amor",
    author: "Café Quijano",
    url: "www.cafequijano.com",
    likes: 234,
    user: "6874d188e327452890fcf9b0",
    id: "6874dfecb4b5294ebb401c5d"
}

test("renders title and author by default", () => {
    const mockHandler = vi.fn()

    const { container } = render(<Blog blog={blog} />)

    const div = container.querySelector(".classBlog")
    expect(div).toHaveTextContent(
        "Ardiente amor Café Quijano"
    )
})

test("shows URL and likes when View button is clicked", async () => {
    const mockHandler = vi.fn()

    const { container } = render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const button = screen.getByText("View")
    await user.click(button)

    expect(container).toHaveTextContent(
        "www.cafequijano.com"
    )
    expect(container).toHaveTextContent(
        234
    )
})

test("when Like button is clicked it calls the event controller", async () => {
    const mockHandleLike = vi.fn()

    render(<Blog blog={blog} handleLike={mockHandleLike} />)

    const user = userEvent.setup()
    const viewButton = screen.getByText("View")

    await user.click(viewButton)
    const likeButton = screen.getByText("Like")

    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandleLike).toHaveBeenCalledTimes(2)
})