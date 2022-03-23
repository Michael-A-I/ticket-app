import { React, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"

export function PostsIndex() {
  const history = useNavigate()
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function Authorization() {
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

    Authorization()
  }, [history])

  console.log(posts)

  return (
    <>
      <h1>Posts</h1>

      {posts.map(post => (
        <div>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
          <p>{post._id}</p>
          <Link to={`/posts/${post._id}`}>Post</Link>
        </div>
      ))}
    </>
  )
}
