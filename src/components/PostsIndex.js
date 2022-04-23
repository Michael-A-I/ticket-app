import { React, useEffect, useState } from "react"
import { propTypes } from "react-bootstrap/esm/Image"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import "./css/PostIndex.css"
// import Authorization from "../helper/Authorization"

export function PostsIndex(props) {
  const [posts, setPosts] = useState([])
  const history = useNavigate()

  useEffect(() => {
    Authorization()
    getPosts()
  }, [history])

  async function Authorization() {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch("/isUserAuth", {
        headers: {
          "x-access-token": token
        }
      })
      const data = await res.json()
      console.log(data.isLoggedIn)
      console.log("Is person logged in? = " + JSON.stringify(data))

      // user data passed through application
      /* If user is already authenticated and they try to acess page */
      return data.isLoggedIn ? null : history("/login")
    } catch (error) {
      console.log("islogged in?:" + error)
    }
  }

  async function getPosts() {
    try {
      const token = localStorage.getItem("token")
      console.log("PostsIndex.js token: " + token)
      const res = await fetch("/posts/index", {
        headers: {
          "x-access-token": token
        }
      })

      // console.log(typeof res)
      const posts = await res.json()

      setPosts(posts)

      console.log(Array.isArray(posts))
    } catch (error) {
      console.log("PostsIndex.js " + error)
    }
  }

  async function handleDelete(id) {
    try {
      const token = localStorage.getItem("token")
      console.log("PostsIndex.js token: " + token)
      const res = await fetch(`/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token
        }
      })

      getPosts()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div className="post__container">
        <div className="post__wrapper">
          <h1 className="post__title">{props.title}</h1>

          <h2 className="post__title">Posts</h2>
          {posts.map(post => (
            <div>
              <div className="card" key={post._id}>
                <div className="card-header">
                  <h1>{post.title}</h1>
                </div>
                <div className="card-body">
                  <p>{post.description}</p>
                  {/* <p>{post._id}</p> */}
                </div>
              </div>
              <Link to={`/posts/${post._id}`}>
                <button className="btn btn-primary btn-sm">Go to post</button>
              </Link>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(post._id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
