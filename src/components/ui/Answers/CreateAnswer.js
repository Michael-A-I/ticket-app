import React, { useContext, useState } from "react"
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap"
import { useParams } from "react-router"
import StateContext from "../../../context/StateContext"

function CreateAnswer(props) {
  let { id } = useParams()
  const appState = useContext(StateContext)
  const token = appState.user.token
  const [answer, setAnswer] = useState("")
  /* Post Answer to Database */

  const handleAnswersSubmit = async event => {
    event.preventDefault()
    console.log("handle submit")

    const comment = event.target
    const createComment = { text: comment[0].value, post: id }
    console.log(createComment)

    try {
      await fetch(`/api/posts/${id}/answers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token
        },
        body: JSON.stringify(createComment)
      })

      /* refresh answers view */
      props.getAnswerComments()
      setAnswer("")
    } catch (error) {
      return error
    }
  }

  const handleChange = e => {
    const text = e.target.value
    setAnswer(text)
  }

  return (
    <Row ref={props.myRef}>
      <Col xs={{ span: 10, offset: 1 }}>
        {" "}
        <Form onSubmit={handleAnswersSubmit}>
          <FloatingLabel controlId="floatingInput" label="Answer" className="mb-3">
            <Form.Control required as="textarea" placeholder="Leave a answer here" value={answer} onChange={e => handleChange(e)} style={{ height: "100px" }} />
          </FloatingLabel>

          <div class="text-right">
            <Button type="submit" class="btn btn-primary">
              Post Answer
            </Button>
          </div>
        </Form>
      </Col>
      <div class="row">
        <div class="col-sm-4 col-sm-offset-4"></div>
      </div>
    </Row>
    /* Answers View
      Answers Comments
      Answerts input
    */
  )
}

export default CreateAnswer
