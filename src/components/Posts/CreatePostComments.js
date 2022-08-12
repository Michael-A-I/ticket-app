import React, { useContext, useState } from "react"
import { Button, Col, FloatingLabel, Form, FormControl, InputGroup, Row } from "react-bootstrap"
import { useParams } from "react-router"
import StateContext from "../../context/StateContext"
function CreatePostCommnet(props) {
  let { id } = useParams()
  const appState = useContext(StateContext)
  const token = appState.user.token

  /* CRUD post comments */
  return (
    <Row>
      {props.postCommentClick ? (
        <Col xs={{ span: 10, offset: 1 }}>
          {" "}
          <Form onSubmit={props.handleSubmit}>
            <Form.Group>
              <InputGroup className="">
                <FloatingLabel controlId="floatingInput" label="Post Comment" className="mb-3">
                  <FormControl placeholder="comment" aria-label="comment" aria-describedby="basic-addon1" required />
                </FloatingLabel>
              </InputGroup>
            </Form.Group>
            <Button type="btn" class="btn btn-primary" onClick={props.handlePostComment}>
              Cancel
            </Button>
            <Button type="submit" class="btn btn-primary">
              Save
            </Button>
          </Form>
        </Col>
      ) : (
        <Button onClick={props.handlePostComment}>Add Comment</Button>
      )}
    </Row>
  )
}

export default CreatePostCommnet
