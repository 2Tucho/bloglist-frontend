import { useState } from 'react'

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
                name="title"
                value={newBlog.title}
                onChange={handleBlogChange}
            />
        </div>
        <div>
            Author:
            <input
                name="author"
                value={newBlog.author}
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