import React, { useContext, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { Button, Card, Col, FloatingLabel, Form, Row } from "react-bootstrap"
import { handleDate } from "../../helper/helper"
import CreateAnswer from "../Answers/CreateAnswer"
import CreatePostCommnets from "./CreatePostComments"
import PostComments from "./PostComments"
import { Editor } from "@tinymce/tinymce-react"

/* Context */
import StateContext from "../../context/StateContext"
import { useParams } from "react-router"
import Status from "./Status"
import Priority from "./Priority"
import Thumb from "../ui/Thumb"

function PostView(props) {
  /* state context */
  const appState = useContext(StateContext)
  const token = appState.user.token
  const [edit, setEdit] = useState(true)
  const [liked, setLiked] = useState()
  const [following, setFollowing] = useState()
  const { id } = useParams()
  const editorRef = useRef(null)
  const [files, setFiles] = useState([])

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent())
    }
  }

  useEffect(() => {
    setPostState({ title: props.post.title, description: props.post.description })
    // hasUserLiked()
    // checkFollow()
  }, [props.post.title, props.post.description])

  const editPost = () => {
    console.log("editPost")
    setEdit(!edit)
  }

  const deletePost = async id => {
    console.log("deletePost")

    try {
      console.log("PostsIndex.js token: " + token)
      await fetch(`/api/posts/${id}`, {
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
      props.getPost()
    } catch (error) {
      console.log(error)
    }
  }

  // check to see if user id is in db
  const checkFollow = async () => {
    const res = await fetch(`/api/posts/${id}/followcheck`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      }
    })
    const follow = await res.json()
    // console.log("Check Follow")
    setFollowing(follow)

    console.log("Check Follow" + follow)
  }
  // add user id to db

  const handleFollow = async () => {
    console.log("follow")
    setFollowing(true)
    const res = await fetch(`/api/posts/${id}/follow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      },
      body: JSON.stringify({ hasUserFollowed: appState.user.id })
    })

    const state = await res.json()
  }

  // remove user id from db
  const handleUnFollow = async () => {
    console.log("unfollow")
    setFollowing(false)
    const res = await fetch(`/api/posts/${id}/unfollow`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      },
      body: JSON.stringify({ hasUserFollowed: appState.user.id })
    })

    const state = await res.json()
  }

  const handleLike = async () => {
    setLiked(!liked)

    console.log("like")
    const res = await fetch(`/api/posts/${id}/like`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      },
      body: JSON.stringify({ hasUserFollowed: appState.user.id })
    })

    const state = await res.json()
  }

  const handleUnLike = async () => {
    console.log("unlike")
    setLiked(!liked)

    const res = await fetch(`/api/posts/${id}/unlike`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      },
      body: JSON.stringify({ hasUserFollowed: appState.user.id })
    })

    const state = await res.json()
  }

  const hasUserLiked = async () => {
    /* Persistance */
    console.log("hasUserLiked")

    const res = await fetch(`/api/posts/${id}/hasUserLiked`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      }
    })

    const state = await res.json()

    setLiked(state.hasLiked)
  }
  const [postState, setPostState] = useState({ title: props.post.title, description: props.post.description })

  const handleEditPostState = e => {
    if (e.target.id == "title") {
      const title = e.target.value
      setPostState(prev => ({ ...prev, title: title }))
    }
    if (e.target.id == "description") {
      const description = e.target.value
      setPostState(prev => ({ ...prev, description: description }))
    }
  }

  const handleEditCancel = () => {
    // setPostState(prev => ({ ...prev }))
    setEdit(!edit)
  }

  return (
    <Row>
      {edit ? (
        <Card>
          {console.log(props.post.title)}

          <Card.Body>
            {/* {following ? <Button onClick={handleUnFollow}>Followed</Button> : <Button onClick={handleFollow}>Follow</Button>} */}

            <Card.Title>{props.post.title}</Card.Title>
            <Card.Text style={{ whiteSpace: "pre-line" }} dangerouslySetInnerHTML={{ __html: props.post.description }}></Card.Text>
            {props.post.updatedAt != props.post.createdAt ? <Card.Text>updated at {handleDate(props.post.updatedAt)}</Card.Text> : <Card.Text>created at {handleDate(props.post.updatedAt)}</Card.Text>}
            <Row>{props.post.file != undefined ? <img src={props.post.file} className="img-thumbnail mt-2" style={{ height: "100px", width: "150px" }} /> : ""}</Row>
            {/* User */}
            <Row>
              {props.post && props.post.user != undefined ? <p>{props.post.user.username}</p> : ""}

              {props.post.user == undefined ? <img src="/default-profile.jpg" className="img-thumbnail mt-2" style={{ height: "40px", width: "50px" }} /> : <img src={props.post.user.image} className="img-thumbnail mt-2" style={{ height: "40px", width: "50px" }} />}
            </Row>
            {/* Conditional to fix issue with props.post.user._id returning undefined */}
            {props.post.user && props.post.user._id == appState.user.id ? (
              <>
                <Button variant="primary" onClick={props.executeScroll}>
                  Answer Post
                </Button>
                <Button variant="warning" onClick={editPost}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => props.deletePost(props.post._id)}>
                  Delete
                </Button>
              </>
            ) : (
              ""
            )}

            {/* {liked ? <i class="fa-solid fa-heart" onClick={handleUnLike} style={{ color: "red", background: "grey" }}></i> : <i class="fa-solid fa-heart" onClick={handleLike} style={{ color: "white", background: "grey" }}></i>} */}

            {props.showStatus ? (
              <Form onSubmit={e => props.handleStatusSubmit(e)}>
                <Status handleStatusSubmit={props.handleStatusSubmit} getStatus={props.getStatus} status={props.status} return={true} />

                <Priority handleStatusSubmit={props.handleStatusSubmit} getStatus={props.getStatus} priority={props.priority} return={true} />
                {/* File upload */}
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>File Upload</Form.Label>
                  {/* Image upload */}
                  {/* //! Ability to post multiple images */}
                  <input
                    id="file"
                    name="file"
                    type="file"
                    onChange={event => {
                      // from computer load files into state for thumbnail
                      setFiles([...event.target.files])

                      // read contents of specified blob or file, turns to base 64 encoded string.

                      //https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
                    }}
                    className="form-control"
                    multiple
                  />

                  {files.map((file, index) => {
                    return <Thumb file={files[index]} />
                  })}

                  {/* {files.map(file => {
                })} */}
                </Form.Group>

                <Button type="submit">Submit</Button>
              </Form>
            ) : (
              ""
            )}
          </Card.Body>
        </Card>
      ) : (
        <Card>
          {/* EDIT MODE, POST  */}
          {console.log(postState.title)}

          <Card.Body>
            <Form onSubmit={e => props.handleSubmit(e, props.post._id)}>
              <Form.Label>Title</Form.Label>
              {/* Title */}
              <Form.Control id="title" control="input" size="lg" type="text" placeholder={`${props.post.title}`} value={postState.title} name="title" onChange={e => handleEditPostState(e)} />
              <Form.Label>Description</Form.Label>
              {/* Description */}
              {props.post.description == undefined ? null : (
                <Editor
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue="Write Project/Bug specifications here"
                  init={{
                    height: 500,
                    menubar: false,
                    plugins: ["advlist autolink lists link image charmap print preview anchor", "searchreplace visualblocks code fullscreen", "insertdatetime media table paste code help wordcount"],
                    toolbar: "undo redo | formatselect | " + "bold italic backcolor | alignleft aligncenter " + "alignright alignjustify | bullist numlist outdent indent | " + "removeformat | help",
                    content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                  }}
                  value={postState.description}
                  onChange={e => handleEditPostState(e)}
                />
              )}

              {props.post && props.post.updatedAt != props.post.createdAt ? <Card.Text>updated at {handleDate(props.post.updatedAt)}</Card.Text> : <Card.Text>created at {handleDate(props.post.updatedAt)}</Card.Text>}
              {/* File upload */}
              {props.post.file ? <img src={props.post.file} className="img-thumbnail mt-2" height={200} width={200} /> : ""}
              <Button type="submit" variant="primary">
                Save
              </Button>
              <Button variant="warning" onClick={handleEditCancel}>
                Cancel
              </Button>
              <Button variant="danger" onClick={() => props.deletePost(props.post._id)}>
                Delete
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}
    </Row>
  )
}

export default PostView

/* 
get data from db
set initial value of page upload to set following state

onclick change value of state to change ui and update back end

on page refresh get data from db and set initial state. 
*/
