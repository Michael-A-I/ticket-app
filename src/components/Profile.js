import { React, useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Navbar } from "./Navbar"
import moment from "moment"
import { handleDate } from "../helper/helper"
import "./css/Profile.css"

/* React Component */
export function Profile() {
  let { id } = useParams()
  // const [userComments, setUserComments] = useState()
  // const [userPosts, setUserPosts] = useState()
  const [comments, setComments] = useState([])
  const [posts, setPosts] = useState([])

  const [view, setView] = useState(false)
  console.log(id)
  useEffect(() => {
    async function Authorization() {
      try {
        const token = localStorage.getItem("token")

        // get comments
        const user = await fetch(`http://localhost:5000/u/${id}`, {
          headers: {
            "x-access-token": token
          }
        })

        const userData = await user.json()

        console.log(userData)

        setComments(userData.comments.comments)
        setPosts(userData.posts.posts)
      } catch (error) {
        return error
      }
    }

    Authorization()
  }, [])

  function handleView() {
    setView(!view)
    console.log("handleview " + view)
  }

  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit"
  })

  console.log(comments)
  console.log(posts)

  return (
    <>
      <Navbar />

      {view ? <h1>Posts</h1> : <h1>Comments</h1>}

      {view ? (
        <button className="btn btn-warning btn-sm" onClick={handleView}>
          Comments View
        </button>
      ) : (
        <button className="btn btn-warning btn-sm" onClick={handleView}>
          Posts View
        </button>
      )}

      {!view ? (
        <div>
          {comments.map(comment => (
            <div className="card">
              <div className="card-header">
                <h1 className="card-title">{comment.postName}</h1>
              </div>
              <div className="card-body">
                <p className="card-description">Comment: {comment.text}</p>
                <Link to={`/posts/${comment.post}`}>
                  <button className="btn btn-primary">Go to Post</button>
                </Link>

                <p>{handleDate(comment.createdAt)}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {posts.map(post => (
            <div className="card">
              <div className="card-header">
                <h1 className="card-title">{post.title}</h1>
              </div>
              <div className="card-body">
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
        </div>
      )}
    </>
  )
}
