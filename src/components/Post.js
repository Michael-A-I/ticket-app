import { React, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useParams } from "react-router-dom"

export function Post(props) {
  const [post, setPost] = useState({})
  const history = useNavigate()
  let { id } = useParams()

  useEffect(() => {
    async function Authorization() {
      try {
        const token = localStorage.getItem("token")
        console.log("Post.js token: " + token)
        const res = await fetch(`http://localhost:5000/posts/${id}`, {
          headers: {
            "x-access-token": token
          }
        })

        // console.log(typeof res)
        const post = await res.json()

        setPost(post)

        console.log(Array.isArray(post))
      } catch (error) {
        console.log("Post.js " + error)
      }
    }

    Authorization()
  }, [history])

  console.log(post)

  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.description}</p>
    </>
  )
}
