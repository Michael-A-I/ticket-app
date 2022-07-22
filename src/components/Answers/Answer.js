import React, { useContext, useEffect, useState } from "react"
import { Button, Card, Form, Row } from "react-bootstrap"
import { useNavigate, useParams } from "react-router"
import AnswerComments from "../Answers/AnswerComments"
import StateContext from "../../context/StateContext"
import AnswerCommentsView from "../Answers/AnswerCommentsView"

function Answer(props) {
  let { id } = useParams()
  const appState = useContext(StateContext)
  const token = appState.user.token
  const history = useNavigate()

  useEffect(() => {
    setAnswerText(props.postAnswer)
  }, [props.postAnswer])

  const [edit, setEdit] = useState([])

  const answerDelete = async answerID => {
    console.log("answerDelete")

    try {
      const res = await fetch(`/api/posts/${answerID}/answers/delete`, {
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

  const answerEdit = (answerID, event) => {
    console.log("answerEdit")

    setEdit(prev => [...prev, answerID])
  }

  const cancelAnswerEdit = answerID => {
    console.log("answerEdit")

    const arr = edit

    const cancelAnswerArr = arr.filter(item => !answerID.includes(item))

    setEdit(cancelAnswerArr)
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
      const res = await fetch(`/api/posts/${answerID}/answers/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token
        },
        body: JSON.stringify(updateAnswer)
      })

      // props.getAnswers()
      props.getAnswerComments()

      setEdit("")
    } catch (error) {
      return error
    }
  }

  const [answerText, setAnswerText] = useState(props.postAnswer)

  const handleEditAnswerState = (e, index) => {
    const text = e.target.value
    setAnswerText(prev => [...prev, (prev[index].text = text)])
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
          {/* <pre>{JSON.stringify(props.postAnswer)}</pre> */}
          {!edit.includes(answer._id) ? (
            <>
              <Card key={answer._id}>
                {console.log(edit.state)}
                <Card.Body>
                  <Card.Title>Answer</Card.Title>
                  <Card.Text>{answer.name}</Card.Text>
                  <Card.Text>{answer.text}</Card.Text>
                  {/* s3 bucket? */}
                  {answer.user && answer.user.image == undefined ? <img src="/default-profile.jpg" alt={`aa`} className="thumbnail" style={{ height: "25px", width: "25px" }} /> : <img src={`${answer.user.image}`} alt={`aa`} className="thumbnail" style={{ height: "25px", width: "25px" }} />}
                  {answer.user && answer.user._id == appState.user.id ? (
                    <>
                      <Button variant="warning" onClick={() => answerEdit(answer._id)}>
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
                {/* Edit Mode, Answsers  */}
                <Card.Body>
                  <Card.Title>Answer Edit</Card.Title>
                  <Card.Text>{answer.name}</Card.Text>
                  <Form onSubmit={e => handleSubmit(e, answer._id)}>
                    <Form.Control as="textarea" style={{ height: "auto" }} placeholder={`${answer.text}`} value={answerText[index].text} onChange={e => handleEditAnswerState(e, index)} />

                    <Button type="submit" variant="primary">
                      Save
                    </Button>
                    <Button variant="warning" onClick={() => cancelAnswerEdit(answer._id)}>
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
