import React, { useEffect, useState, useRef, useContext } from "react"
import { Button, Form, Row } from "react-bootstrap"
import { useNavigate, useParams } from "react-router"
import "./css/PostComments.css"

/* Context */
import StateContext from "../../context/StateContext"
import { handleDate } from "../../helper/helper"
import { propTypes } from "react-bootstrap/esm/Image"

function PostComments(props) {
  let { id } = useParams()
  const appState = useContext(StateContext)
  const token = appState.user.token
  const history = useNavigate()
  const [commentId, setCommentID] = useState(null)
  const [edit, setEdit] = useState([])

  const [commentValue, setCommentValue] = useState([])
  useEffect(() => {
    setCommentValue(props.comments)
  }, [props.comments])
  useEffect(() => props.getComments(), [history])

  /* Logic for comments  */

  /* Logic for comments UI */

  const editMouseOver = (event, key, user) => {
    console.log("mouse over")

    /* only allow user the created comment to edit */
    if (user != appState.user.id) {
      return
    }

    const selectedIndex = event.target.getAttribute("keyvalue")

    if (key == selectedIndex) {
      setCommentID(key)
    }
  }

  const editMouseLeave = event => {
    console.log("mouse leave")
    console.log(event)

    const selectedIndex = event.target.getAttribute("keyvalue")
    // setCommentID(null)
    console.log(commentId)
    setCommentID(null)

    // setEdit(false)
  }
  console.log(commentId)

  const editOnClick = id => {
    console.log(" edit on click")
    console.log(id)
    setEdit(prev => [...prev, id])
    console.log("edit" + edit)
  }

  const initalvalue = props.comments
  const cancelEdit = id => {
    console.log(id)
    /* return array without comment._id  set comment out of edit mode*/
    setEdit(prev => prev.filter(pre => pre !== id))
    props.setComments(initalvalue)
    props.getComments()
  }

  const deleteComment = async id => {
    console.log("delete comment: " + id)
    try {
      const res = await fetch(`/api/posts/${id}/comments`, {
        method: "Delete",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token
        }
      })

      props.getComments()
    } catch (error) {
      return error
    }
  }
  const test = e => {
    e.preventDefault()
    // alert("yo")
  }
  const updateComment = async (event, id) => {
    event.preventDefault()
    const comment = event.target
    const createComment = { text: comment[0].value }

    const res = await fetch(`/api/project/${id}/comments`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      },
      body: JSON.stringify(createComment)
    })

    const comments = await res.json()
  }

  const afterUpdate = (event, id) => {
    // event.preventDefault()

    setEdit(prev =>
      prev.filter(function (pre) {
        return pre != id
      })
    )

    props.getComments()
    console.log("edit after update " + edit)
  }

  const handleChange = (event, index) => {
    console.log(index)
    // props.comments[index].text = event.target
    // console.log(props.comments[index].text)
    // console.log(props.comments[index])
    // console.log(event.target.value)

    const newComments = props.comments

    newComments.splice(index, 1, { ...newComments[index], text: event.target.value })
    console.log([...newComments])
    setCommentValue([...newComments])
    // props.getComments()

    // props.setComments(prev => [...prev])
  }
  return (
    <>
      {/* <pre>{JSON.stringify(props.comments[0].user.image)}</pre> */}
      <div style={{ border: "1px solid black", height: "747px", paddingTop: "0px", overflow: "scroll" }}>
        {props.comments.map((comment, index) => (
          <Row>
            {console.log("edit after click JSX " + edit)}
            {commentId == comment._id || edit.includes(comment._id) ? (
              edit.includes(comment._id) ? (
                <>
                  <p> {comment.name}</p>
                  {comment.user.image == undefined ? <img src="/default-profile.jpg" alt="profile-image" className="thumbnail" style={{ height: "25px", width: "50px" }} /> : <img src={`${comment.user.image}`} alt="profile-image" className="thumbnail" style={{ height: "25px", width: "50px" }} />}

                  {/*! run function after fetch */}
                  <Form onSubmit={e => test(e) & updateComment(e, comment._id) & afterUpdate(e, comment._id)}>
                    {console.log(comment.ticket)}
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                      <Form.Control style={{ padding: "10px", wordWrap: "break-word" }} required as="textarea" rows={3} value={commentValue[index].text} onChange={e => handleChange(e, index)} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Save
                    </Button>

                    <Button variant="warning" onClick={() => cancelEdit(comment._id)}>
                      Cancel
                    </Button>
                    <Button variant="danger" onClick={() => deleteComment(comment._id)}>
                      Delete
                    </Button>
                  </Form>
                  <p> {handleDate(comment.updatedAt)}</p>
                </>
              ) : (
                <>
                  {/* mouseover */}
                  <div>
                    <div style={{ border: "2px solid black", borderRadius: "5px", margin: "5px", padding: "15px", background: "rgb(229, 229, 229)" }}>
                      {comment.user.image == undefined ? <img src="/default-profile.jpg" alt="profile-image" className="thumbnail" style={{ height: "35px", width: "55px" }} /> : <img src={`${comment.user.image}`} alt="profile-image" className="thumbnail" style={{ height: "25px", width: "50px" }} />}
                      <p> {comment.name}</p>
                      <p> {handleDate(comment.updatedAt)}</p>
                      <div>
                        <p style={{ padding: "10px", wordWrap: "break-word" }} className="comments-style" key={comment._id} keyvalue={comment._id} onMouseLeave={editMouseLeave} onClick={() => editOnClick(comment._id)}>
                          {comment.text}
                          <i style={{ float: "right", paddingRight: "15px", marginTop: "3px" }} class="fa-solid fa-pen"></i>
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )
            ) : (
              <>
                {/* start */}
                <div>
                  <div style={{ border: "1px solid black", borderRadius: "5px", margin: "5px", padding: "15px", background: "white" }}>
                    {comment.user.image == undefined ? <img src="/default-profile.jpg" alt="profile-image" className="thumbnail" style={{ height: "35px", width: "55px" }} /> : <img src={`${comment.user.image}`} alt="profile-image" className="thumbnail" style={{ height: "25px", width: "50px" }} />}
                    <p> {comment.name}</p>
                    <p> {handleDate(comment.updatedAt)}</p>

                    <p style={{ margin: "5px", padding: "10px", wordWrap: "break-word" }} key={comment._id} keyvalue={comment._id} onMouseOver={e => editMouseOver(e, comment._id, comment.user._id)}>
                      {comment.text}
                    </p>
                  </div>
                </div>
              </>
            )}
          </Row>
        ))}
      </div>
    </>
  )
}

export default PostComments

/* 
? when should you use arror function in jsx 
! seems like whenever I need to ender properties into the function arrow function is needed. 

?arrow functions VS regular functions - what is the difference?

*/
