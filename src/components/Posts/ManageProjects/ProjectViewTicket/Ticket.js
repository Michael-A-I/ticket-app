import React, { useContext, useEffect, useState } from "react"
import Page from "../../../ui/Page"
import PostViews from "../../PostViews"

import { useParams } from "react-router"
import StateContext from "../../../../context/StateContext"
import PostComments from "../../PostComments"
import CreatePostComments from "../../CreatePostComments"

function Ticket() {
  const { id } = useParams()

  const appState = useContext(StateContext)
  const token = appState.user.token

  const [post, setPost] = useState([])

  useEffect(() => {
    ticket()
  }, [])

  // get project data
  const ticket = async () => {
    console.log("project")
    const res = await fetch(`/api/projects/ticket/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      }
    })

    const ticket = await res.json()
    // console.log({ ticket })
    setPost(ticket)
  }

  // function to delete project
  const deletePost = async id => {
    console.log("deletePost")
    try {
      await fetch(`/api/projects/ticket/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  const [edit, setEdit] = useState(true)

  // function to submit project
  const handleSubmit = async (event, id) => {
    console.log("postView.js handleSubmit")

    event.preventDefault()
    const comment = event.target
    const updatePost = { title: comment[0].value, description: comment[1].value }
    console.log({ updatePost })
    try {
      console.log("PostsIndex.js token: " + token)
      await fetch(`/api/projects/ticket/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token
        },
        body: JSON.stringify(updatePost)
      })
      setEdit(!edit)
      /* refresh view */
      // props.getPost()
    } catch (error) {
      console.log(error)
    }
  }

  const [comments, setComments] = useState([])

  async function getComments() {
    console.log("getComments")

    try {
      // get comments
      const resComment = await fetch(`/api/projects/ticket/${id}/comments`, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token
        }
      })

      const { comments } = await resComment.json()
      console.log({ comments })
      setComments(comments)
    } catch (error) {
      return error
    }
  }

  const [postCommentClick, setPostCommentClick] = useState(false)

  const handlePostComment = () => {
    setPostCommentClick(!postCommentClick)
  }

  const handleCommentSubmit = async event => {
    event.preventDefault()
    console.log("handle submit")
    handlePostComment()
    const user = localStorage.getItem("id")
    const username = localStorage.getItem("username")
    const comment = event.target
    const email = localStorage.getItem("email")

    const comments = { text: comment[0].value, ticket: id, email: email }

    // console.log({ user, username })
    // console.log({ comments })

    try {
      const res = await fetch(`/api/projects/ticket/${id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token
        },
        body: JSON.stringify(comments)
      })
      // console.log({ comments })

      getComments()
    } catch (error) {
      return error
    }
  }

  const [base64, setBase64] = useState("")
  const handleStatusSubmit = async e => {
    e.preventDefault()
    console.log("handleSubmit Status")

    const target = e.target
    // console.log({ target })

    let body
    if (base64 != []) body = { status: target[0].value, priority: target[1].value, files: base64 }
    else body = { status: target[0].value, priority: target[1].value }

    // console.log(body)

    try {
      const res = await fetch(`/api/projects/ticket/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token
        },
        body: JSON.stringify(body)
      })

      const ticket = await res.json()
      // !NOT UPDATING IMAGE ON SUBMIT?
      // console.log("update")
      setPost(ticket)
      // console.log("update")
    } catch (error) {
      console.log(error)
    }
  }
  const [priority, setPriority] = useState()
  const [status, setStatus] = useState()

  const getStatus = async () => {
    try {
      const res = await fetch(`/api/projects/ticket/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token
        }
      })

      const { status, priority } = await res.json()

      setStatus(status)
      setPriority(priority)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Page>
        <h1>Ticket</h1>
        {/* post views */}
        <PostViews post={post} handleSubmit={handleSubmit} deletePost={deletePost} handleStatusSubmit={handleStatusSubmit} getStatus={getStatus} status={status} priority={priority} showStatus={true} setBase64={setBase64} base64={base64} />

        {/* comments for post views */}
        <div style={{ width: "1320px" }}>
          <PostComments comments={comments} getComments={getComments} setComments={setComments} />
        </div>

        {/* Post Comments Create */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50px", margin: "50px 0px 400px" }}>
          <CreatePostComments post={post} getComments={getComments} handleSubmit={handleCommentSubmit} postCommentClick={postCommentClick} handlePostComment={handlePostComment} />
        </div>
      </Page>
    </>
  )
}

export default Ticket
