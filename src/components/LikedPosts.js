import { React, useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Navbar } from "./Navbar"
import moment from "moment"
import { handleDate } from "../helper/helper"
import "./css/Profile.css"

export function LikedPosts(props) {
  const [posts, setPosts] = useState([])
  let { id } = useParams()

  useEffect(() => {
    async function Authorization() {
      try {
        const token = localStorage.getItem("token")

        // get comments
        const posts = await fetch("/posts/index", {
          headers: {
            "x-access-token": token
          }
        })

        const postsData = await posts.json()

        const sortByLiked = postsData.sort((a, b) => {
          return b.numberOfLikes - a.numberOfLikes
        })

        console.log(postsData)

        setPosts(sortByLiked)
      } catch (error) {
        return error
      }
    }

    Authorization()
  }, [])

  return (
    <>
      <h1 className="post__title">{props.title}</h1>
      {posts.map(post => (
        <div className="card">
          <div className="card-header">
            <h1 className="card-title">{post.title}</h1>
          </div>
          <div className="card-body">
            <p className="card-description">Likes: {post.numberOfLikes}</p>

            <p className="card-description">{post.description}</p>
            <div>
              <Link to={`/posts/${post._id}`}>
                <button className="btn btn-primary">Go to Post</button>
              </Link>
              <p>
                created by {post.name} @ {handleDate(post.createdAt)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
