import { useNavigate, Navigate, Link } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import Navbar from "../Navbar/Navbar"
import { Button, Card, Form, Toast } from "react-bootstrap"

/* Validation */
import { Formik } from "formik"
import * as yup from "yup"

import DispatchContext from "../../context/DispatchContext"
// import StateContext from "../context/StateContext"

import Page from "../ui/Page"
/* CSS */
import "./css/Login.css"

/* helper */
import { handleTimestamp } from "../../helper/helper"

function Login() {
  // const [login, setLogin] = useState()
  const [message, setMessage] = useState("")
  const [show, setShow] = useState(false)
  const [position, setPosition] = useState("top-center")

  const [validationErrors, setValidationErrors] = useState()
  const navigate = useNavigate()

  const appDispatch = useContext(DispatchContext)

  async function handleLogin(values) {
    console.log(values)
    console.log("handleLogin")

    const user = values

    console.log(user)

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(user)
      })

      const data = await res.json()

      console.log(data)

      if (data.message == "Success") {
        const date = new Date(handleTimestamp(data.created)).toDateString()
        localStorage.setItem("token", data.token)
        localStorage.setItem("username", data.user)
        localStorage.setItem("avatar", data.avatar)
        localStorage.setItem("id", data.id)
        localStorage.setItem("email", data.email)
        localStorage.setItem("createdAt", date)

        appDispatch({ type: "login" })
        appDispatch({ type: "setToken" })
        appDispatch({ type: "setUser", value: data.user })

        setMessage(data.message)
      }
      console.log(data.message)
      /*
         if user autheticats set Success authentication message
       */
      console.log(message)
    } catch (error) {
      setMessage(error)
    }
  }

  const toggleShow = () => {
    setShow(!show)
  }

  /* Validation Schema yup */
  const schema = yup.object().shape({
    email: yup.string().required("enter email!"),
    password: yup.string().required("enter password!")
  })

  return (
    <>
      <Page>
        {console.log(message)}
        {message == "Success" ? (
          navigate("/dashboard")
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
              <Card.Title className="card-center-title">Welcom Back!</Card.Title>
              <Card.Subtitle className="card-sub-title">Nice to see you again!</Card.Subtitle>
              <Formik
                validationSchema={schema}
                validateOnBlur={false}
                validateOnChange={true}
                onSubmit={values => handleLogin(values)}
                initialValues={{
                  email: "",
                  password: ""
                }}
              >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                  <Form className="form-group-styles" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="text" placeholder="Enter email" name="email" value={values.email} onChange={handleChange} isValid={touched.email && !errors.email} isInvalid={!!errors.email} />

                      <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGroupPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" name="password" value={values.password} onChange={handleChange} isValid={touched.password && !errors.password} isInvalid={!!errors.password} />
                      <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit">Sumbit</Button>

                    <p className="form-footer">
                      Need an account?{" "}
                      <Link className="link-style" to="/register">
                        Register
                      </Link>
                    </p>

                    <p className="form-footer">
                      Want to just try website out?{" "}
                      <Link className="link-style" to="/register">
                        Login as test admin
                      </Link>
                    </p>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </div>
      </Page>
    </>
  )
}

export default Login
