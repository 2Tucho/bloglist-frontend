import { useState } from "react"
import PropTypes from "prop-types"

const Blog = ({ blog, handleLike, removeBlog }) => {
    const [toggleInfo, setToggleInfo] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5
    }

    const handleToggleInfo = (change) => {
        setToggleInfo(change)
    }

    return (!toggleInfo ? (<div style={blogStyle} className="classBlog">
        {blog.title} {blog.author}
        <button onClick={() => handleToggleInfo(true)}>View</button>
    </div>) : (<div style={blogStyle} className="classBlog">
        <button onClick={() => handleToggleInfo(false)}>Hide</button>
        <p>{blog.title}</p>
        <p>{blog.url}</p>
        <p>Likes: {blog.likes}</p> <button onClick={() => handleLike(blog.id)}>Like</button>
        <p>{blog.author}</p>
        <button onClick={() => removeBlog(blog.id)}>Remove</button>
    </div >)
    )
}

Blog.displayName = "Blog"

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    handleLike: PropTypes.func.isRequired,
    removeBlog: PropTypes.func.isRequired
}

export default Blog