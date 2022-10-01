// Initialize Userfront Core JS

import React, { useState } from "react"
import { Button, Card, Form } from "react-bootstrap"
import { Link } from "react-router-dom"
import Page from "../ui/Page"
import Userfront from "@userfront/core"
import Toasty from "../ui/Toasty"
import msgConext from "../ui/helpers/toastyMessages"

function SendReset() {
  const [login, setLogin] = useState({ email: "" })
  const [msg, setMsg] = useState({
    show: false,
    poisiton: "center",
    msg: "",
    context: "",
    title: ""
  })

  const handleSubmit = async e => {
    e.preventDefault()
    const email = `${login.email}`
    console.log(email)

    try {
      const response = await Userfront.sendResetLink(email)
      console.log({ response })
      setMsg({
        show: true,
        poisiton: "center",
        msg: `Email Sent ${login.email}`,
        title: "Error",
        context: msgConext.success
      })

      setLogin({ email: "" })
    } catch (err) {
      setMsg({
        show: true,
        poisiton: "center",
        msg: err.message,
        title: "Error",
        context: msgConext.danger
      })
    }
  }

  const handleChange = e => {
    e.preventDefault()
    const target = e.target
    console.log(target.name)
    setLogin({
      [target.name]: target.value
    })
  }

  return (
    <>
      <Page style={{ paddingLeft: "0px" }} title="Forgot Password">
        {msg == "Success" ? (
          console.log("Success")
        ) : (
          <div className="toast-display-center">
            <Toasty msg={msg} setMsg={setMsg} />
          </div>
        )}
        <div className="center-page">
          <Card style={{ width: "35rem", backgroundColor: "#36393f", marginTop: "100px" }}>
            <Card.Body>
              <Card.Title className="card-center-title">Password Reset</Card.Title>
              <Card.Subtitle className="card-sub-title">Kindly enter your email</Card.Subtitle>

              {/* Credentials */}
              <Form className="form-group-styles" onSubmit={e => handleSubmit(e)}>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                  <Form.Label>Email</Form.Label>
                  <Form.Control style={{ color: "white" }} name="email" type="email" value={login.email} placeholder="Enter email" required minLength={5} maxLength={30} onChange={e => handleChange(e)} />
                </Form.Group>

                <Button type="submit">Submit</Button>
                {/* Navigation */}
                <p className="form-footer">We will send a reset link to your email.</p>
                <p className="form-footer">
                  Go back to{" "}
                  <Link className="link-style" to="/login">
                    Login
                  </Link>
                </p>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Page>
    </>
  )
}
export default SendReset

//! check to see if user email exists in the database before sending the email.
