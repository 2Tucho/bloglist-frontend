import { render } from "@testing-library/react"
import Blog from "./Blog"

test("renders content", () => {
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