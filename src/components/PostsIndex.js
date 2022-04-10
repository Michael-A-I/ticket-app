import { React, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import "./css/PostIndex.css"

export function PostsIndex() {
  const history = useNavigate()
  const [posts, setPosts] = useState([])

  useEffect(() => {
    getPosts()
  }, [history])

  async function getPosts() {
    try {
      const token = localStorage.getItem("token")
      console.log("PostsIndex.js token: " + token)
      const res = await fetch("http://localhost:5000/posts/index", {
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
      const res = await fetch(`http://localhost:5000/posts/${id}`, {
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
      <h1 className="post__title">Posts</h1>
      <div className="post__container">
        <div className="post__wrapper">
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
