import { useState } from "react"
import blogServices from "../services/blogs"

const Blog = ({ blog, setBlogs, blogs }) => {
    const [toggleInfo, setToggleInfo] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const handleToggleInfo = (change) => {
        setToggleInfo(change)
    }

    const addLike = () => {
        const changedBlog = {...blog, likes: blog.likes + 1, user: typeof blog.user === "object" ? blog.user.id : blog.user}

        blogServices
            .update(blog.id, changedBlog)
            .then(returnedBlog => {
                setBlogs(blogs.map(b => b.id !== blog.id ? b : returnedBlog))
      })
    }

    return (!toggleInfo ? (<div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={() => handleToggleInfo(true)}>View</button>
    </div>) : (<div style={blogStyle}>
        <button onClick={() => handleToggleInfo(false)}>Hide</button>
        <p>{blog.title}</p>
        <p>{blog.url}</p>
        <p>Likes: {blog.likes}</p> <button onClick={() => addLike()}>Like</button>
        <p>{blog.author}</p>
    </div >)
    )
}

export default Blog