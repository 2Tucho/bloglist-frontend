import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import BlogForm from "./components/BlogForm"
import LoginForm from "./components/LoginForm"
import Togglable from "./components/Togglable"

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState(null)
    const [loginVisible, setLoginVisible] = useState(false)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const addBlog = (blogObject) => {
        blogService
            .create(blogObject)
            .then(returnedBlog => {
                setBlogs(blogs.concat(returnedBlog))
                setSuccessMessage(`${blogObject.title} by ${user.name} added`)
                setTimeout(() => {
                    setSuccessMessage(null)
                }, 4000)
            })

    }

    const removeBlog = (id) => {
        blogService
            .deleteBlog(id)
            .then(setBlogs(blogs.filter(b => b.id !== id)))
    }

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username, password,
            })

            window.localStorage.setItem(
                "loggedBlogappUser", JSON.stringify(user)
            )
            setUser(user)
            setUsername("")
            setPassword("")
        } catch (exception) {
            setErrorMessage("Wrong credentials")
            setTimeout(() => {
                setErrorMessage(null)
            }, 4000)
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem("loggedBlogappUser")
        setUser(null)
    }

    const loginForm = () => {
        const hideWhenVisible = { display: loginVisible ? "none" : "" }
        const showWhenVisible = { display: loginVisible ? "" : "none" }

        return (
            <div>
                <div style={hideWhenVisible}>
                    <button onClick={() => setLoginVisible(true)}>log in</button>
                </div>
                <div style={showWhenVisible}>
                    <LoginForm
                        username={username}
                        password={password}
                        handleUsernameChange={({ target }) => setUsername(target.value)}
                        handlePasswordChange={({ target }) => setPassword(target.value)}
                        handleSubmit={handleLogin}
                    />
                    <button onClick={() => setLoginVisible(false)}>cancel</button>
                </div>
            </div>
        )
    }

    const handleLike = async (id) => {
        const blogToUpdate = blogs.find(b => b.id === id)
        const updatedBlog = {
            ...blogToUpdate,
            likes: blogToUpdate.likes + 1,
            user: typeof blogToUpdate.user === "object" ? blogToUpdate.user.id : blogToUpdate.user
        }
        const returnedBlog = await blogService.update(id, updatedBlog)
        setBlogs(blogs.map(b => b.id !== id ? b : returnedBlog))
    }

    return (
        <div>

            {user === null ?
                loginForm() :
                <div>
                    <p>{user.name} logged in</p><button onClick={() => handleLogout()}>logout</button>

                    {successMessage ? <p style={{ color: "green" }}>{successMessage}</p> : null}

                    <h2>Blogs</h2>
                    <Togglable buttonLabel="New blog">
                        <BlogForm createBlog={addBlog} />

                    </Togglable>


                    {blogs
                        .sort((a, b) => b.likes - a.likes)
                        .map(blog =>
                            <Blog key={blog.id} blog={blog} handleLike={handleLike} removeBlog={removeBlog} />
                        )
                    }

                </div>
            }

            {errorMessage ? <p style={{ color: "red" }}>{errorMessage}</p> : null}

        </div>
    )
}

export default App