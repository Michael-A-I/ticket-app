import { useNavigate, Navigate, Link } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import Navbar from "./Navbar"
import { Button, Card, Form, Toast } from "react-bootstrap"

/* Validation */
import { Formik } from "formik"
import * as yup from "yup"

import DispatchContext from "../context/DispatchContext"
// import StateContext from "../context/StateContext"

import Page from "./Page"
/* CSS */
import "./css/Login.css"

/* helper */
import { handleTimestamp } from "../helper/helper"

function Login() {
  // const [login, setLogin] = useState()
  const [message, setMessage] = useState("")
  const [show, setShow] = useState(false)
  const [position, setPosition] = useState("top-center")

  const [validationErrors, setValidationErrors] = useState()
  const navigate = useNavigate()

  const appDispatch = useContext(DispatchContext)
  // const appState = useContext(StateContext)

  /* useEffect(() => {
    return appState.loggedIn ? navigate("/general") : null
  }, [navigate])
 */
  async function handleLogin(values) {
    console.log(values)
    console.log("handleLogin")

    /* 
      LEGACY CODE EXAMPLE
       const form = e.target
       const user = { username: form[0].value, password: form[1].value }
   */

    const user = values

    console.log(user)
    /* 
      send login information to database and authenticat user 
    */
    try {
      const res = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(user)
      })

      const data = await res.json()

      if (data.message == "Success") {
        /* 
          set local storage
        */

        const date = new Date(handleTimestamp(data.created)).toDateString()
        localStorage.setItem("token", data.token)
        localStorage.setItem("username", data.user)
        localStorage.setItem("avatar", data.avatar)
        localStorage.setItem("id", data.id)
        /* # */
        localStorage.setItem("email", data.email)
        localStorage.setItem("createdAt", date)

        /* # */

        appDispatch({ type: "login" })
        /* 
          set state local storage 
        */
      }
      console.log(data.message)
      /*
         if user autheticats set Success authentication message
       */
      setShow(!show)
      setMessage(data.message)
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
    username: yup.string().required("enter username!"),
    password: yup.string().required("enter password!")
  })

  return (
    <>
      <Navbar />
      <Page>
        {console.log(message)}
        {message == "Success" ? (
          navigate("/general")
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
                validateOnChange={false}
                onSubmit={values => handleLogin(values)}
                initialValues={{
                  username: "",
                  password: ""
                }}
              >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                  <Form className="form-group-styles" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                      <Form.Label>Username</Form.Label>
                      <Form.Control type="text" placeholder="Enter Username" name="username" value={values.username} onChange={handleChange} isValid={touched.username && !errors.username} isInvalid={!!errors.username} />
                      {/* {console.log(errors)}
                      {console.log(touched)}
                      {console.log(values)} */}
                      {console.log("errors.password " + !!errors.password)}
                      {console.log(validationErrors)}

                      <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
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
