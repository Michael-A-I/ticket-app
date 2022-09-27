import React, { useContext, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { Button, Card, Col, FloatingLabel, Form, Row } from "react-bootstrap"
import { handleDate } from "../../helper/helper"
import CreateAnswer from "../Answers/CreateAnswer"
import CreatePostCommnets from "./CreatePostComments"
import PostComments from "./PostComments"
import { Editor } from "@tinymce/tinymce-react"
import msgConext from "../ui/helpers/toastyMessages"

/* Context */
import StateContext from "../../context/StateContext"
import { useNavigate, useParams } from "react-router"
import Status from "./Status"
import Priority from "./Priority"
import Thumb from "../ui/Thumb"
import ImageView from "./ImageView"

import "./css/PostView.css"
import Toasty from "../ui/Toasty"

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
  const navigate = useNavigate()

  const [msg, setMsg] = useState({
    show: false,
    poisiton: "center",
    msg: "",
    context: "",
    title: ""
  })

  useEffect(() => {
    fileToBase64()
  }, [files])

  const fileToBase64 = () => {
    console.log("fileToBase64")
    console.log(files)
    // clear values in state.
    props.setBase64("")

    files.map((file, index) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        if (fileReader.readyState === 2) {
          // Base64 conversion load in array
          const response = fileReader.result
          // loop and set values in state
          props.setBase64(prev => [...prev, response])
        }
      }
    })
  }

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

  const archive = async () => {
    const confirm = window.confirm("Archiving Project will automatically complete project and tickets")

    if (!confirm) {
      setMsg({
        show: true,
        poisiton: "center",
        msg: "Archive Cancelled",
        title: "Error",
        context: msgConext.warning
      })
      return
    }

    try {
      console.log("archived")
      // change backend attr. to

      const body = { archived: true }

      const response = await fetch(`/api/projects/${id}/archived`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token
        },
        body: JSON.stringify(body)
      })
      const msg = await response.json()

      msgHandler(msg)
      const sleep = ms => new Promise(r => setTimeout(r, ms))
      await sleep(1500)

      navigate("/projects/index")
    } catch (error) {
      errHandler(error)
    }
  }

  const msgHandler = msg => {
    if (msg.err || msg.error) {
      setMsg({
        show: true,
        poisiton: "center",
        msg: msg.err,
        title: "Error",
        context: msgConext.danger
      })
    } else {
      setMsg({
        show: true,
        poisiton: "center",
        msg: msg.msg,
        title: "OK",
        context: msgConext.success
      })
    }
  }

  const errHandler = err => {
    console.log(err)
    setMsg({
      show: true,
      poisiton: "center",
      msg: err.message,
      title: "Error",
      context: msgConext.danger
    })
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Toasty msg={msg} setMsg={setMsg} />
      </div>

      <Row style={{ width: "100%" }}>
        {edit ? (
          <Card>
            {console.log(props.post)}
            <Card.Body style={{ margin: "20px", height: "100%" }}>
              {/* {following ? <Button onClick={handleUnFollow}>Followed</Button> : <Button onClick={handleFollow}>Follow</Button>} */}

              <Row>
                <Col>
                  <Card.Title style={{ fontSize: "20px" }}>{props.post.title}</Card.Title>
                </Col>
                <Col>
                  <Button variant="warning" onClick={() => archive()} style={{ width: "150px", borderRadius: "15px", float: "right" }}>
                    Archive
                  </Button>
                </Col>
              </Row>

              <Card.Text style={{ whiteSpace: "pre-line" }} dangerouslySetInnerHTML={{ __html: props.post.description }}></Card.Text>
              <Row>{props.post.file != undefined ? <img src={props.post.file} className="img-thumbnail mt-2" style={{ height: "100px", width: "150px" }} /> : ""}</Row>
              {/* User */}
              <Row>
                {props.post.assigned ? <Row style={{ width: "100%" }}>{props.post.assigned.image == undefined ? <img src="/default-profile.jpg" className="img-thumbnail mt-2" style={{ height: "40px", width: "50px", float: "left" }} /> : <img src={props.post.assigned.image} className="img-thumbnail mt-2" style={{ height: "40px", width: "50px", float: "left" }} />}</Row> : ""}{" "}
                {props.post && props.post.assigned != undefined ? (
                  <div style={{ display: "flex", alignItems: "first baseline" }}>
                    <p style={{ fontSize: "14px" }}>Assigned:</p>
                    <p style={{ fontSize: "14px", marginLeft: "10px" }}>
                      {props.post.assigned.firstName}
                      {props.post.assigned.lastName}
                    </p>
                  </div>
                ) : (
                  <p>undefined</p>
                )}
              </Row>
              <Row>
                {props.post.createdBy ? <Row style={{ width: "100%" }}>{props.post.createdBy.image == undefined ? <img src="/default-profile.jpg" className="img-thumbnail mt-2" style={{ height: "40px", width: "50px", float: "left" }} /> : <img src={props.post.createdBy.image} className="img-thumbnail mt-2" style={{ height: "40px", width: "50px", float: "left" }} />}</Row> : ""}
                {props.post && props.post.assigned != undefined ? (
                  <div style={{ display: "flex", alignItems: "first baseline" }}>
                    <p style={{ fontSize: "14px" }}>Created By:</p>
                    <p style={{ fontSize: "14px", marginLeft: "10px" }}>
                      {props.post.assigned.firstName}
                      {props.post.assigned.lastName}
                    </p>
                  </div>
                ) : (
                  <p>undefined</p>
                )}
                {props.post.updatedAt != props.post.createdAt ? <Card.Text>updated {handleDate(props.post.updatedAt)}</Card.Text> : <Card.Text>created {handleDate(props.post.updatedAt)}</Card.Text>}
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
                  <Row className="postview-status">
                    <Col>
                      <Status handleStatusSubmit={props.handleStatusSubmit} getStatus={props.getStatus} status={props.status} return={true} />
                      <Priority handleStatusSubmit={props.handleStatusSubmit} getStatus={props.getStatus} priority={props.priority} return={true} />
                    </Col>
                    <Col>
                      {/* IMAGE VIEW */}
                      {props.post.files ? <ImageView files={props.post.files} /> : ""}

                      <Form.Label>File Upload</Form.Label>

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
                    </Col>
                  </Row>
                  {/* Image View */}
                  {/* File upload */}
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    {/* Image upload */}
                    {/* //! Ability to post multiple images */}

                    {/* {files.map(file => {
                })} */}
                  </Form.Group>

                  <Button type="submit">Submit</Button>
                </Form>
              ) : (
                ""
              )}

              {props.projectViewImg ? (
                <Form onSubmit={e => props.handleProjectViewImgSubmit(e)}>
                  <Row className="postview-status">
                    <Col></Col>
                    <Col>
                      {/* IMAGE VIEW */}
                      {props.post.files ? <ImageView files={props.post.files} /> : ""}
                      <Form.Label style={{ display: "block" }}>File Upload</Form.Label>

                      {files.length > 0 ? (
                        files.map((file, index) => {
                          return <Thumb file={files[index]} />
                        })
                      ) : (
                        <p>"No File Data"</p>
                      )}

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
                    </Col>
                  </Row>
                  {/* Image View */}
                  {/* File upload */}
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    {/* Image upload */}
                    {/* //! Ability to post multiple images */}

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
    </>
  )
}

export default PostView

/* 
get data from db
set initial value of page upload to set following state

onclick change value of state to change ui and update back end

on page refresh get data from db and set initial state. 
*/
