import React, { useContext, useEffect, useState } from "react"
import Page from "../../../ui/Page"
import PostViews from "../../PostViews"

import { useNavigate, useParams } from "react-router"
import StateContext from "../../../../context/StateContext"
import PostComments from "../../PostComments"
import CreatePostComments from "../../CreatePostComments"
import Assigned from "./Assigned"
import ProjectTickets from "./ProjectTickets"
import { Col, Row } from "reactstrap"
import { Button } from "react-bootstrap"

function ProjectView() {
  const { id } = useParams()
  const appState = useContext(StateContext)
  const token = appState.user.token
  const navigate = useNavigate()
  const [base64, setBase64] = useState()
  const [post, setPost] = useState([])

  useEffect(() => {
    project()
  }, [])
  // get project data
  const project = async () => {
    console.log("project")
    const res = await fetch(`/api/projects/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      }
    })

    const project = await res.json()
    console.log({ project })
    setPost(project)
  }

  // function to delete project
  const deletePost = async id => {
    console.log("deletePost")
    try {
      await fetch(`/api/projects/${id}`, {
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

    try {
      console.log("PostsIndex.js token: " + token)
      await fetch(`/api/posts/${id}/edit`, {
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
      const resComment = await fetch(`/api/project/${id}/comments`, {
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

    const comments = { text: comment[0].value, project: id, email: email }

    console.log({ user, username })
    console.log({ comments })

    try {
      const res = await fetch(`/api/project/${id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token
        },
        body: JSON.stringify(comments)
      })
      console.log({ comments })
      // props.setComments(prev => [...prev, createComment])
      getComments()
    } catch (error) {
      return error
    }
  }

  const handleProjectViewImgSubmit = async e => {
    e.preventDefault()
    console.log("handleSubmit Status")

    const target = e.target

    const body = { files: base64 }
    console.log({ body })

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token
        },
        body: JSON.stringify(body)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const [status, setStatus] = useState()
  const getStatus = async () => {
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token
        }
      })

      const { done } = await res.json()

      console.log(done)
      setStatus(done)
    } catch (error) {
      console.log(error)
    }
  }

  const createTicket = async () => {
    console.log("createTicket")
    navigate(`/projects/tickets/${id}/createtickets`)
  }

  return (
    <>
      <Page>
        <Row style={{ paddingTop: "25px" }}>
          <Col>
            <h1>ProjectView</h1>
          </Col>
          <Col>
            <Button onClick={() => createTicket()} style={{ width: "250px", float: "right" }}>
              Create Ticket
            </Button>
          </Col>
        </Row>

        <PostViews post={post} deletePost={deletePost} handleProjectViewImgSubmit={handleProjectViewImgSubmit} getStatus={getStatus} status={status} showStatus={false} setBase64={setBase64} base64={base64} projectViewImg={true} />

        <PostComments comments={comments} getComments={getComments} />

        {/* Post Comments Create */}

        <div style={{ width: "100%", height: "154px", display: "flex", placeContent: "center", alignItems: "center" }}>
          <CreatePostComments post={post} getComments={getComments} handleSubmit={handleCommentSubmit} postCommentClick={postCommentClick} handlePostComment={handlePostComment} />
        </div>

        <div style={{ border: "1px solid black", borderRadius: "5px" }}>
          <ProjectTickets />
        </div>

        {/* post views */}

        {/* comments for post views */}
      </Page>
    </>
  )
}

export default ProjectView
