import React, { useEffect, useState, useRef, useContext } from "react"
import { Button, Form, Row } from "react-bootstrap"
import { useNavigate, useParams } from "react-router"
import "./css/PostComments.css"

/* Context */
import StateContext from "../../../context/StateContext"
import { handleDate } from "../../../helper/helper"

function PostComments(props) {
  let { id } = useParams()
  const appState = useContext(StateContext)
  const token = appState.user.token
  const history = useNavigate()
  const [commentId, setCommentID] = useState(null)
  const [edit, setEdit] = useState([])

  useEffect(() => props.getComments(), [history])

  /* Logic for comments  */

  /* Logic for comments UI */

  const editMouseOver = (event, key) => {
    console.log("mouse over")

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

  const cancelEdit = id => {
    console.log(id)
    /* return array without comment._id  set comment out of edit mode*/
    setEdit(prev => prev.filter(pre => pre !== id))
  }

  const deleteComment = async id => {
    console.log("delete comment: " + id)
    try {
      const res = await fetch(`/posts/${id}/comments`, {
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

  const updateComment = async (event, id) => {
    event.preventDefault()
    const comment = event.target
    const createComment = { text: comment[0].value }
    console.log(createComment)

    /* return array without comment._id  set comment out of edit mode*/

    // await fetchUpdateComment(createComment)
    await fetch(`/posts/${id}/comments`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      },
      body: JSON.stringify(createComment)
    })

    console.log("after fetch")
  }

  const afterUpdate = id => {
    console.log("after update id: ")
    console.log(id)
    setEdit(
      prev =>
        prev.filter(function (pre) {
          return pre != id
        })
      // console.log("edit after update " + edit)
    )
    // setEdit([])
    props.getComments()
    console.log("edit after update " + edit)
  }

  return (
    <>
      {/* <pre>{JSON.stringify(props.comments)}</pre> */}
      {props.comments.map((comment, index) => (
        <Row>
          {console.log("edit after click JSX " + edit)}
          {commentId == comment._id || edit.includes(comment._id) ? (
            edit.includes(comment._id) ? (
              <>
                <p> {comment.name}</p>
                {/*! run function after fetch */}
                <Form onSubmit={e => updateComment(e, comment._id) & afterUpdate(comment._id)}>
                  <Form.Control type="text" placeholder={`${comment.text}`} />

                  <Button type="submit">Save</Button>

                  <Button onClick={() => cancelEdit(comment._id)}>Cancel</Button>
                  <Button onClick={() => deleteComment(comment._id)}>Delete</Button>
                </Form>
                <p> {handleDate(comment.updatedAt)}</p>
              </>
            ) : (
              <>
                <p> {comment.name}</p>

                <p key={comment._id} keyvalue={comment._id} onMouseLeave={editMouseLeave} onClick={() => editOnClick(comment._id)}>
                  {comment.text} changed
                </p>

                <p> {handleDate(comment.updatedAt)}</p>
              </>
            )
          ) : (
            <>
              <p> {comment.name}</p>
              <p className="comments-style" key={comment._id} keyvalue={comment._id} onMouseOver={e => editMouseOver(e, comment._id)}>
                {comment.text}
              </p>
              <p> {handleDate(comment.updatedAt)}</p>
            </>
          )}
        </Row>
      ))}
    </>
  )
}

export default PostComments

/* 
? when should you use arror function in jsx 
! seems like whenever I need to ender properties into the function arrow function is needed. 

?arrow functions VS regular functions - what is the difference?

*/
