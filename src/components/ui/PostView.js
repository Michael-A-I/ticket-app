import React, { useState } from "react"
import { Button, Card, Col, FloatingLabel, Form, Row } from "react-bootstrap"
import { handleDate } from "../../helper/helper"
import CreateAnswer from "./Answers/CreateAnswer"
import CreatePostCommnets from "./PostView/CreatePostComments"
import PostComments from "./PostView/PostComments"

function PostView(props) {
  return (
    <Row>
      <Card>
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Card.Body>
          <Card.Title>{props.post.title}</Card.Title>
          <Card.Text>{props.post.description}</Card.Text>
          {props.post.updatedAt != props.post.createdAt ? <Card.Text>updated at {handleDate(props.post.updatedAt)}</Card.Text> : <Card.Text>created at {handleDate(props.post.updatedAt)}</Card.Text>}

          <Button variant="primary" onClick={props.executeScroll}>
            Answer Post
          </Button>
        </Card.Body>
      </Card>
    </Row>
  )
}

export default PostView
