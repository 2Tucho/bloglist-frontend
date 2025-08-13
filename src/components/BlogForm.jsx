import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [newBlog, setNewBlog] = useState({
        title: "",
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
            url: newBlog.url
        })
        setNewBlog("")
    }

    return <form onSubmit={addBlog}>
        <div>
            Title:
            <input
                name="title"
                value={newBlog.title}
                onChange={handleBlogChange}
            />
        </div>
        <div>
            URL:
            <input
                name="url"
                value={newBlog.url}
                onChange={handleBlogChange}
            />
        </div>

        <button type="submit">create</button>
    </form>

}

export default BlogForm