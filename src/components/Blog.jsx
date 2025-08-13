import { useState } from "react"

const Blog = ({ blog }) => {
    const [toggleInfo, setToggleInfo] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const handleToggleInfo = (change) => {
        console.log(change)
        setToggleInfo(change)
    }

    return (!toggleInfo ? (<div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={() => handleToggleInfo(true)}>View</button>
    </div>) : (<div style={blogStyle}>
        <button onClick={() => handleToggleInfo(false)}>Hide</button>
        <p>{blog.title}</p>
        <p>{blog.url}</p>
        <p>Likes: {blog.likes}</p> <button>Like</button>
        <p>{blog.author}</p>
    </div >)
    )
}

export default Blog