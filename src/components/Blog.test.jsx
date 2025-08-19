import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

test("renders title and author by default", () => {
    const blog = {
        title: "Ardiente amor",
        author: "Café Quijano",
        url: "www.cafequijano.com",
        likes: 234,
        user: "6874d188e327452890fcf9b0",
        id: "6874dfecb4b5294ebb401c5d"
    }

    const setBlogs = vi.fn()

    const { container } = render(<Blog blog={blog} setBlogs={setBlogs} blogs={[blog]} />)

    const div = container.querySelector(".classBlog")
    expect(div).toHaveTextContent(
        "Ardiente amor Café Quijano"
    )
})

test("shows URL and likes when View button is clicked", async () => {
    const blog = {
        title: "Ardiente amor",
        author: "Café Quijano",
        url: "www.cafequijano.com",
        likes: 234,
        user: "6874d188e327452890fcf9b0",
        id: "6874dfecb4b5294ebb401c5d"
    }

    const setBlogs = vi.fn()

    const { container } = render(<Blog blog={blog} setBlogs={setBlogs} blogs={[blog]} />)

    const user = userEvent.setup()
    const button = screen.getByText("View")
    await user.click(button)

    screen.debug()

    expect(container).toHaveTextContent(
        "www.cafequijano.com"
    )
    expect(container).toHaveTextContent(
        234
    )
})