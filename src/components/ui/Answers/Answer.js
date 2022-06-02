import React, { useContext, useEffect, useState } from "react"
import { Button, Card, Row } from "react-bootstrap"
import { useNavigate, useParams } from "react-router"
import AnswerComments from "../Answers/AnswerComments"
import StateContext from "../../../context/StateContext"
import AnswerCommentsView from "../Answers/AnswerCommentsView"

function Answer(props) {
  let { id } = useParams()
  const appState = useContext(StateContext)
  const token = appState.user.token
  const history = useNavigate()

  useEffect(() => {}, [history])

  return (
    <>
      <h1>Answers</h1>
      ------------------------------------------------------------------------------------------------------------
      {console.log("answer" + props.postAnswer)}
      {props.postAnswer.map((answer, index) => (
        <>
          <Card key={answer._id}>
            {console.log(answer._id)}
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <Card.Body>
              <Card.Title>Answer</Card.Title>
              <Card.Text>{answer.name}</Card.Text>
              <Card.Text>{answer.text}</Card.Text>

              <Button variant="warning">Edit</Button>
              <Button variant="danger">Delete</Button>
            </Card.Body>
          </Card>
          {/* get answers */}
          <AnswerCommentsView comments={props.postAnswer[index].comments} keyvalue={answer._id} getAnswerComments={props.getAnswerComments} />
          <AnswerComments postId={props.postsID} answerId={answer._id} getAnswerComments={props.getAnswerComments} />
        </>
      ))}
    </>
  )
}

export default Answer
