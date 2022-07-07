import React, { useContext, useEffect, useState } from "react"
import { Button, Card, Form, Row } from "react-bootstrap"
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
  const [edit, setEdit] = useState(true)

  const answerDelete = async answerID => {
    console.log("answerDelete")

    try {
      const res = await fetch(`/posts/${answerID}/answers/delete`, {
        method: "Delete",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token
        }
      })

      props.getAnswerComments()
      // props.getAnswers()
    } catch (error) {
      return error
    }
  }

  const answerEdit = () => {
    console.log("answerEdit")

    /* 
    if answer id event is equal to answer id
    then change answer to a submittable form.
    */
    setEdit(!edit)
  }

  const handleSubmit = async (event, answerID) => {
    console.log("handleSubmit")

    event.preventDefault()
    /* 
    if answer id event is equal to answer id
    then change answer to a submittable form.
    */
    const comment = event.target
    const updateAnswer = { text: comment[0].value }
    try {
      const res = await fetch(`/posts/${answerID}/answers/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token
        },
        body: JSON.stringify(updateAnswer)
      })

      // props.getAnswers()
      props.getAnswerComments()

      setEdit(!edit)
    } catch (error) {
      return error
    }
  }

  if (props.postAnswer == undefined) {
    console.log(props.postAnswer)
    // props.getAnswerComments()
    // props.getAnswers()
    return <p>Loading...</p>
  }

  return (
    <>
      <h1>Answers</h1>

      {props.postAnswer.map((answer, index) => (
        <>
          {edit ? (
            <>
              <Card key={answer._id}>
                <Card.Body>
                  <Card.Title>Answer</Card.Title>
                  <Card.Text>{answer.name}</Card.Text>
                  <Card.Text>{answer.text}</Card.Text>
                  {/* s3 bucket */}
                  {answer.user && answer.user.image == undefined ? <img src="/default-profile.jpg" alt={`aa`} className="thumbnail" style={{ height: "25px", width: "25px" }} /> : <img src={`${answer.user.image}`} alt={`aa`} className="thumbnail" style={{ height: "25px", width: "25px" }} />}
                  {answer.user && answer.user._id == appState.user.id ? (
                    <>
                      <Button variant="warning" onClick={answerEdit}>
                        Edit
                      </Button>
                      <Button variant="danger" onClick={() => answerDelete(answer._id)}>
                        Delete
                      </Button>
                    </>
                  ) : (
                    ""
                  )}
                </Card.Body>
              </Card>
            </>
          ) : (
            <>
              <Card key={answer._id}>
                <Card.Body>
                  <Card.Title>Answer Edit</Card.Title>
                  <Card.Text>{answer.name}</Card.Text>
                  <Form onSubmit={e => handleSubmit(e, answer._id)}>
                    <Form.Control type="text" placeholder={`${answer.text}`} />

                    <Button type="submit" variant="primary">
                      Save
                    </Button>
                    <Button variant="warning" onClick={answerEdit}>
                      Cancel
                    </Button>
                    <Button variant="danger" onClick={() => answerDelete(answer._id)}>
                      Delete
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </>
          )}

          {/* get answers */}
          <AnswerCommentsView comments={props.postAnswer[index].comments} keyvalue={answer._id} getAnswerComments={props.getAnswerComments} />
          {/* Add Comment Form */}
          <AnswerComments postId={props.postsID} answerId={answer._id} getAnswerComments={props.getAnswerComments} />
        </>
      ))}
    </>
  )
}

export default Answer
