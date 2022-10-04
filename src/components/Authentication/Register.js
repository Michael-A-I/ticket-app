import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useState } from "react"
import Navbar from "../Navbar/Navbar"
import "bootstrap/dist/css/bootstrap.min.css"
import "./css/Register.css"
import Page from "../ui/Page"
import { Button, Card, Form, Toast } from "react-bootstrap"
// import FlashMessage from "./react-flash-message"

/* Toasty Alerts */
import Toasty from "../ui/Toasty"
import msgConext from "../ui/helpers/toastyMessages"

/* Userfront */
import Userfront from "@userfront/core"
Userfront.init("pn4qd8qb")

function Register() {
  const navigate = useNavigate()

  const [message, setMessage] = useState()
  const [show, setShow] = useState(false)
  const [position, setPosition] = useState("top-center")
  const [register, setRegister] = useState({ email: "", firstName: "", lastName: "", password: "", confirmPassword: "" })

  const [msg, setMsg] = useState({
    show: false,
    poisiton: "center",
    msg: "",
    context: "",
    title: ""
  })

  const handleChange = event => {
    event.preventDefault()

    const target = event.target
    console.log(target.name)
    console.log(target.value)

    setRegister(prev => ({ ...prev, [target.name]: target.value }))
  }

  async function handleSubmit(e) {
    /* Send data to  */
    e.preventDefault()
    console.log("Register")
    const form = e.target

    try {
      const formData = {
        method: "password",
        email: register.email,
        password: register.password,
        name: register.firstName,
        lastName: register.lastName,
        data: {
          firstName: register.firstName,
          lastName: register.lastName,
          email: register.email
        }
      }

      // !userfront registration
      const udata = await Userfront.signup(formData)

      // appned userfront data to backend
      formData.data.userId = udata.userId
      formData.data.username = udata.username

      const dataToDb = formData.data

      // !mongoose registration

      const res = await fetch(
        "/api/register",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(dataToDb)
        },
        console.log(dataToDb)
      )

      //! /* ! add check to make sure Userfront and BE BOTH succeed */
      const serverRes = await res.json()
      console.log("confirm(user)")
      /* send confirmation email */
      console.log(serverRes.message)
      /* if on submit server response is an Error then show error message */
      if (serverRes.message !== "Success") {
        setShow(true)
      }
      setMessage(serverRes.message)
    } catch (err) {
      console.log(err)

      setMsg({
        show: true,
        poisiton: "center",
        msg: err.message,
        title: "Error",
        context: msgConext.danger
      })
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

  return (
    <>
      {console.log(register)}{" "}
      <Page style={{ paddingLeft: "0px" }} title="Register">
        {message === "Success" ? (
          navigate("/login")
        ) : (
          <div className="toast-display-center">
            <Toasty msg={msg} setMsg={setMsg} />
          </div>
        )}
        <div className="center-page">
          <Card style={{ width: "35rem", backgroundColor: "#36393f", marginTop: "100px" }}>
            <Card.Body>
              <Card.Title className="card-center-title">Create an Account</Card.Title>

              <Form className="form-group-styles" onSubmit={e => handleSubmit(e)}>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control style={{ color: "white" }} name="firstName" type="text" required minLength={2} maxLength={25} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control style={{ color: "white" }} name="lastName" type="text" required minLength={2} maxLength={25} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control style={{ color: "white" }} name="email" type="email" required onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control style={{ color: "white" }} name="password" type="password" required minLength={5} maxLength={100} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control style={{ color: "white" }} name="confirmPassword" type="password" required minLength={5} maxLength={100} onChange={handleChange} />
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
