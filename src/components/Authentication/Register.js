import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useState } from "react"
import Navbar from "../Navbar/Navbar"
import "bootstrap/dist/css/bootstrap.min.css"
import "./css/Register.css"
import Page from "../ui/Page"
import { Button, Card, Form, Toast } from "react-bootstrap"
// import FlashMessage from "./react-flash-message"

/* emailjs */
import emailjs from "@emailjs/browser"

function Register() {
  const navigate = useNavigate()

  const [message, setMessage] = useState()
  const [show, setShow] = useState(false)
  const [position, setPosition] = useState("top-center")

  async function handleRegister(e) {
    e.preventDefault()
    console.log("Register")
    const form = e.target

    const user = { firstName: form[0].value, lastName: form[1].value, email: form[2].value, password: form[3].value }
    console.log("Register User Post Data username: " + JSON.stringify(user))

    try {
      /* create user */
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(user)
      })
      confirm(user)
      const serverRes = await res.json()
      console.log("confirm(user)")

      /* send confirmation email */

      console.log(serverRes.message)
      /* if on submit server response is an Error then show error message */
      if (serverRes.message !== "Success") {
        setShow(true)
      }

      // setMessage(serverRes.message)
    } catch (error) {
      console.log(error)
    }
  }

  /* passing register form data -> send confirmation email */
  const confirm = async user => {
    console.log("confirm")
    console.log(user)
    try {
      const res = await fetch("http://localhost:5000/api/email/collect", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(user)
      })

      console.log(res)
    } catch (error) {
      console.log(error)
    }
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
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter First Name" required minLength={2} maxLength={25} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter Last Name" required minLength={2} maxLength={25} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" required minLength={5} maxLength={25} />
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
