import { React, useEffect, useState, useContext } from "react"
import { useParams, Link } from "react-router-dom"
import { Navbar } from "./Navbar"
import moment from "moment"
import { handleDate } from "../helper/helper"
import { Posts } from "./Posts"
import "./css/Profile.css"
import { UserContext } from "../context/UserContext"

export function Comments(props) {
  let { id } = useParams()
  const [comments, setComments] = useState([])
  const { user } = useContext(UserContext)

  useEffect(() => {
    async function getComments() {
      try {
        const token = localStorage.getItem("token")

        // get comments
        const res = await fetch(`/u/comments/${user.id}`, {
          headers: {
            "x-access-token": token
          }
        })
        /* resolve promise */
        const userData = await res.json()

        const userCommentsData = userData.comments
        console.log(userCommentsData)
        setComments(userCommentsData)
      } catch (error) {
        return error
      }
    }

    getComments()
  }, [])

  return (
    <>
      <h1 className="post__title">{props.title}</h1>
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
    </>
  )
}
