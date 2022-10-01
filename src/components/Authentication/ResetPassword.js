import React, { useContext, useState } from "react"
import { Button, Card, Form, Toast } from "react-bootstrap"
import Page from "../ui/Page"
import Userfront from "@userfront/core"
import StateContext from "../../context/StateContext"
import msg from "./helpers/msg"
import Toasty from "../ui/Toasty"
function ResetPassword() {
  Userfront.init("demo1234")

  const appState = useContext(StateContext)
  const token = appState.user.token

  /* State */
  const [password, setPassword] = useState({ password: "", confirmPassword: "" })
  const [errorHandling, setErrorHandling] = useState({
    show: false,
    toggleShow: () => {
      setErrorHandling(!errorHandling.show)
    },
    poisiton: "center",
    msg: ""
  })

  const handleChange = event => {
    event.preventDefault()

    const target = event.target
    console.log(target.name)

    setPassword({
      [target.name]: target.value
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    /* confirm passwords are the same */
    if (password.password !== password.confirmPassword) {
      setErrorHandling(prev => ({ ...prev, show: true, msg: msg.noMatch }))
      return <Toasty show={errorHandling.show} toggleShow={errorHandling.toggleShow} position={errorHandling.position} msg={errorHandling.msg} />
    }
    try {
      Userfront.resetPassword({
        password: password.password
      })
    } catch (error) {
      setErrorHandling(prev => ({ ...prev, show: true, msg: error }))
      return <Toasty show={errorHandling.show} toggleShow={errorHandling.toggleShow} position={errorHandling.position} msg={errorHandling.msg} />
    }
  }

  const getEmail = async () => {
    const response = await fetch("/api/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      }
    })

    Userfront.sendResetLink("viewer@example.com")
  }

  return (
    <>
      <Page style={{ paddingLeft: "0px" }} title="Password Reset">
        <div className="center-page">
          <Card style={{ width: "35rem", backgroundColor: "#36393f", marginTop: "100px" }}>
            <Card.Body>
              <Card.Title className="card-center-title">Enter New Password</Card.Title>
              <Form className="form-group-styles" onSubmit={e => handleSubmit(e)}>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control style={{ color: "white" }} name="password" type="password" value={password.password} placeholder="Password" required minLength={5} maxLength={25} onChange={e => handleChange(e)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control style={{ color: "white" }} name="confirmPassword" type="password" value={password.passwordConfirm} placeholder="Confirm Password" required minLength={5} maxLength={25} onChange={e => handleChange(e)} />
                </Form.Group>
                <Button type="submit">Sumbit</Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Page>
    </>
  )
}

export default ResetPassword
