import { React, useEffect, useState, useContext } from "react"
import { useParams, Link } from "react-router-dom"
import { Navbar } from "./Navbar"
import moment from "moment"
import { handleDate } from "../helper/helper"
import { UserContext } from "../context/UserContext"

import "./css/Profile.css"

export function Posts(props) {
  const [posts, setPosts] = useState([])
  const { user } = useContext(UserContext)

  useEffect(() => {
    console.log("Posts.js")
    async function getPosts() {
      try {
        const token = localStorage.getItem("token")

        // get comments
        const res = await fetch(`https://ticket-app-serverside.herokuapp.com/u/posts/${user.id}`, {
          headers: {
            "x-access-token": token
          }
        })
        /* resolve promise */
        const userData = await res.json()

        const userPostData = userData.posts
        console.log(userData)
        setPosts(userPostData)
      } catch (error) {
        console.log(error)
      }
    }

    getPosts()
  }, [])

  return (
    <>
      <h1 className="post__title">{props.title}</h1>
      {posts !== [] ? (
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
    </>
  )
}
