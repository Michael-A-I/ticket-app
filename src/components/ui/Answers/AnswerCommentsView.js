import React, { useEffect, useState, useRef, useContext } from "react"
import { Button, Form, Row } from "react-bootstrap"
import { useNavigate, useParams } from "react-router"
// import "./css/PostComments.css"

/* Context */
import StateContext from "../../../context/StateContext"
import { handleDate } from "../../../helper/helper"

function AnswerCommentsView(props) {
  let { id } = useParams()
  const appState = useContext(StateContext)
  const token = appState.user.token

  const [commentId, setCommentID] = useState(null)
  const [edit, setEdit] = useState([])

  const editMouseOver = (event, key, user) => {
    console.log("editMouseOver")
    console.log(user)
    console.log(appState.user.id)

    /* only allow user the created comment to edit */
    if (user != appState.user.id) {
      return
    }

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
      console.log("refresh view")
      //! refresh answers after delete
      props.getAnswerComments()
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
    try {
      await fetch(`/posts/${id}/comments`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token
        },
        body: JSON.stringify(createComment)
      })
      console.log("after fetch")
    } catch (error) {
      console.log(error)
    }
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
    //! refresh answers after delete
    props.getAnswerComments()
    console.log("edit after update " + edit)
  }

  return (
    <>
      {console.log("Post Answer from Answer Comoments View:" + props.comments.text)}

      {props.comments.map((comment, index) => (
        <Row>
          {console.log(comment.user)}
          {commentId == comment._id || edit.includes(comment._id) ? (
            edit.includes(comment._id) ? (
              <>
                <p> {comment.name}</p>
                <Form onSubmit={e => updateComment(e, comment._id) & afterUpdate(comment._id)}>
                  <Form.Control type="text" placeholder={`${comment.text}`} />
                  {comment.user && comment.user.image == undefined ? <img src="/default-profile.jpg" alt={`aa`} className="thumbnail" style={{ height: "25px", width: "50px" }} /> : <img src={`${comment.user.image}`} alt={`aa`} className="thumbnail" style={{ height: "25px", width: "50px" }} />}

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
                <p> {comment.name}</p>
                {comment.user && comment.user.image == undefined ? <img src="/default-profile.jpg" alt={`aa`} className="thumbnail" style={{ height: "25px", width: "50px" }} /> : <img src={`${comment.user.image}`} alt={`aa`} className="thumbnail" style={{ height: "25px", width: "50px" }} />}

                <p className="comments-style" key={comment._id} keyvalue={comment._id} onMouseLeave={editMouseLeave} onClick={() => editOnClick(comment._id)}>
                  {comment.text}
                </p>

                <p> {handleDate(comment.updatedAt)}</p>
              </>
            )
          ) : (
            <>
              <p> {comment.name}</p>
              {comment.user && comment.user.image == undefined ? <img src="/default-profile.jpg" alt={`aa`} className="thumbnail" style={{ height: "25px", width: "50px" }} /> : <img src={`${comment.user.image}`} alt={`aa`} className="thumbnail" style={{ height: "25px", width: "50px" }} />}

              <p key={comment._id} keyvalue={comment._id} onMouseOver={e => editMouseOver(e, comment._id, comment.user._id)}>
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
export default AnswerCommentsView

/* 
? when should you use arror function in jsx 
! seems like whenever I need to ender properties into the function arrow function is needed. 

?arrow functions VS regular functions - what is the difference?

*/
