import { useState } from "react"
import PropTypes from "prop-types"

const BlogForm = ({ createBlog }) => {
    const [newBlog, setNewBlog] = useState({
        title: "",
        author: "",
        url: ""
    })

    const handleBlogChange = (event) => {
        setNewBlog({
            ...newBlog,
            [event.target.name]: event.target.value
        })
    }

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: newBlog.title,
            author: newBlog.author,
            url: newBlog.url
        })
        setNewBlog({
            title: "",
            author: "",
            url: ""
        })
    }

    return <form onSubmit={addBlog}>
        <div>
            Title:
            <input
                id="blogTitle"
                name="title"
                value={newBlog.title}
                onChange={handleBlogChange}
            />
        </div>
        <div>
            Author:
            <input
                id="blogAuthor"
                name="author"
                value={newBlog.author}
                onChange={handleBlogChange}
            />
        </div>
        <div>
            URL:
            <input
                id="blogUrl"
                name="url"
                value={newBlog.url}
                onChange={handleBlogChange}
            />
        </div>

        <button type="submit">Create</button>
    </form>

}

BlogForm.displayName = "BlogForm"

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
}

export default BlogForm