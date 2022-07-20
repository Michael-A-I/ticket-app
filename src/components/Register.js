import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useState } from "react"
import Navbar from "./Navbar/Navbar"
import "bootstrap/dist/css/bootstrap.min.css"
import "./css/Register.css"
import Page from "./Page"
import { Button, Card, Form, Toast } from "react-bootstrap"
// import FlashMessage from "./react-flash-message"

function Register() {
  const navigate = useNavigate()

  const [message, setMessage] = useState()
  const [show, setShow] = useState(false)
  const [position, setPosition] = useState("top-center")

  async function handleRegister(e) {
    e.preventDefault()
    console.log("Register")
    const form = e.target
    // console.log(form[0].value, form[1].value, form[2].value)
    const user = { username: form[0].value, email: form[1].value, password: form[2].value }
    console.log("Register User Post Data username: " + user.username)

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(user)
      })

      const serverRes = await res.json()
      console.log(serverRes.message)
      /* if on submit server response is an Error then show error message */
      if (serverRes.message !== "Success") {
        setShow(true)
      }

      setMessage(serverRes.message)
    } catch (error) {}
  }

  const toggleShow = () => {
    setShow(!show)
  }

  return (
    <>
      <Page title="Register">
        {message === "Success" ? (
          navigate("/login")
        ) : (
          <div className="toast-display-center">
            <Toast show={show} onClose={toggleShow} bg="danger" position={position} style={{ position: "absolute", zIndex: "999" }} delay={3000} autohide>
              <Toast.Header>
                <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                <strong className="me-auto">Error</strong>
                {/* <small>11 mins ago</small> */}
              </Toast.Header>
              <Toast.Body>{message}</Toast.Body>
            </Toast>
          </div>
        )}
        <div className="center-page">
          <Card style={{ width: "35rem", backgroundColor: "#36393f" }}>
            <Card.Body>
              <Card.Title className="card-center-title">Create an Account</Card.Title>

              <Form className="form-group-styles" onSubmit={e => handleRegister(e)}>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="username" placeholder="Enter username" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button type="submit">Sumbit</Button>

                <p className="form-footer">
                  Already have an account{" "}
                  <Link className="link-style" to="/login">
                    Login
                  </Link>
                </p>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Page>
      {/* initial state show nothing */}
    </>
  )
}

export default Register
