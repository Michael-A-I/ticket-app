import React, { useContext, useState } from "react"
import { Button, Col, FloatingLabel, Form, FormControl, InputGroup, Row } from "react-bootstrap"
import { useParams } from "react-router"
import StateContext from "../../../context/StateContext"
function CreatePostCommnet(props) {
  const [postCommentClick, setPostCommentClick] = useState(false)
  let { id } = useParams()
  const appState = useContext(StateContext)
  const token = appState.user.token

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

    const createComment = { text: comment[0].value, post: id }

    console.log(createComment)

    try {
      const res = await fetch(`/api/posts/${id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token
        },
        body: JSON.stringify(createComment)
      })
      console.log(props.comments)
      // props.setComments(prev => [...prev, createComment])
      props.getComments()
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

export default CreatePostCommnet
