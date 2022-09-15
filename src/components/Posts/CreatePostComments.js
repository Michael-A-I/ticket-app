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
    <>
      {props.postCommentClick ? (
        <Col xs={{ span: 9 }}>
          {" "}
          <Form onSubmit={props.handleSubmit} style={{ paddingTop: "30px" }}>
            <Form.Group>
              <InputGroup className="">
                <FloatingLabel controlId="floatingInput" label="Post Comment" className="mb-3">
                  <FormControl placeholder="comment" aria-label="comment" aria-describedby="basic-addon1" required />
                </FloatingLabel>
              </InputGroup>
            </Form.Group>
            <div style={{ border: "1px solid white", width: "fit-content", position: "relative", bottom: "22px" }}>
              <Button type="btn" class="btn btn-primary" onClick={props.handlePostComment}>
                Cancel
              </Button>
              <Button type="submit" class="btn btn-primary">
                Save
              </Button>
            </div>
          </Form>
        </Col>
      ) : (
        <div style={{ width: "80%", padding: "0px" }}>
          <Button style={{ width: "100%", margin: "0px" }} onClick={props.handlePostComment}>
            Add Comment
          </Button>
        </div>
      )}
    </>
  )
}

export default CreatePostCommnet
