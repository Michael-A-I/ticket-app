// TODO: most recent posts.

import { React, useEffect, useState, useContext } from "react"
import { useParams, Link } from "react-router-dom"
import { Navbar } from "./Navbar"
import moment from "moment"
import { handleDate } from "../helper/helper"
import { handleTimestamp } from "../helper/helper"
import { UserContext } from "../context/UserContext"

import "./css/Profile.css"

export function PostsFollowed(props) {
  const [posts, setPosts] = useState([])
  const { user } = useContext(UserContext)
  console.log(user)
  let { id } = useParams()

  useEffect(() => {
    async function Authorization() {
      try {
        const token = localStorage.getItem("token")

        /* Route to get array of objects of posts user has followed */

        const res = await fetch(`https://ticket-app-serverside.herokuapp.com/posts/${user.id}/following`, {
          headers: {
            "x-access-token": token
          }
        })

        const postsData = await res.json()

        console.log(postsData)
        for (let index = 0; index < postsData.length; index++) {
          console.log(handleTimestamp(postsData[index].updatedAt))
        }

        const sortByRecent = postsData.sort((a, b) => {
          return handleTimestamp(b.updatedAt) - handleTimestamp(a.updatedAt)
        })

        console.log(sortByRecent)

        setPosts(sortByRecent)
      } catch (error) {
        return error
      }
    }

    Authorization()
  }, [])

  return (
    <>
      <h1 className="post__title">{props.title}</h1>
      {posts.length > 0 ? (
        posts.map(post => (
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
        ))
      ) : (
        <h2>No posts are being followed</h2>
      )}

      {console.log(posts)}
    </>
  )
}
