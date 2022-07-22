import React, { useContext, useState } from "react"
import { Button, Col, FloatingLabel, Form, FormControl, InputGroup, Row } from "react-bootstrap"
import { useParams } from "react-router"
import StateContext from "../../context/StateContext"

function AnswerComments(props) {
  const [postCommentClick, setPostCommentClick] = useState(false)
  let { id } = useParams()
  let commentId = props.answerId
  const postId = props.postId
  const appState = useContext(StateContext)
  const token = appState.user.token

  const handlePostComment = () => {
    setPostCommentClick(!postCommentClick)
  }

  const handleCommentSubmit = async event => {
    // event.preventDefault()
    console.log("handle submit")
    handlePostComment()
    // const user = localStorage.getItem()
    const comment = event.target
    const createComment = { text: comment[0].value }
    console.log(createComment)
    console.log(props.answerID)
    console.log(id)

    try {
      await fetch(`/api/posts/${id}/answer/${commentId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token
        },
        body: JSON.stringify(createComment)
      })

      //! refresh answer comments view on save
      props.getAnswerComments()
      // !
    } catch (error) {
      return error
    }
  }

  /* CRUD post comments */
  return (
    <Row>
      {postCommentClick ? (
        <Col xs={{ span: 10, offset: 1 }}>
          {" "}
          <Form onSubmit={handleCommentSubmit}>
            <Form.Group>
              <InputGroup className="">
                <FloatingLabel controlId="floatingInput" label="Post Comment" className="mb-3">
                  <FormControl placeholder="comment" aria-label="comment" aria-describedby="basic-addon1" required />
                </FloatingLabel>
              </InputGroup>
            </Form.Group>
            <Button type="btn" class="btn btn-primary" onClick={handlePostComment}>
              Cancel
            </Button>
            <Button type="submit" class="btn btn-primary">
              Save
            </Button>
          </Form>
        </Col>
      ) : (
        <Button onClick={handlePostComment}>Add Comment</Button>
      )}
    </Row>
  )
}

export default AnswerComments
