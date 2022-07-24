import { useNavigate, Navigate, Link } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import Navbar from "../Navbar/Navbar"
import { Button, Card, Form, Toast } from "react-bootstrap"

/* Validation */
// import { Formik } from "formik"
// import * as yup from "yup"

import DispatchContext from "../../context/DispatchContext"
// import StateContext from "../context/StateContext"

import Page from "../ui/Page"
/* CSS */
import "./css/Login.css"

/* helper */
import { handleTimestamp } from "../../helper/helper"
import Userfront from "@userfront/core"

import Toasty from "../ui/Toasty"
import msgConext from "../ui/helpers/toastyMessages"

// Initialize Userfront Core JS
Userfront.init("pn4qd8qb")

function Login() {
  const [message, setMessage] = useState("")
  const [login, setLogin] = useState({ email: "", password: "" })
  const [msg, setMsg] = useState({
    show: false,
    poisiton: "center",
    msg: "",
    context: "",
    title: ""
  })

  const navigate = useNavigate()

  const appDispatch = useContext(DispatchContext)

  const handleChange = event => {
    console.log("handleChange")
    event.preventDefault()
    const target = event.target

    setLogin(prev => ({ ...prev, [target.name]: target.value }))
  }

  async function handleSubmit(event) {
    console.log("handleSubmit")
    event.preventDefault()

    console.log(login)

    try {
      const data = await Userfront.login({
        method: "password",
        email: login.email,
        password: login.password
      })

      console.log(JSON.stringify(data.message))

      const token = `Bearer ${Userfront.tokens.accessToken}`

      /* User Details */
      const user = Userfront.user
      const email = user.email
      const avatar = user.image
      const createdAt = user.createdAt
      const updatedAt = user.updatedAt
      const username = user.username
      const name = user.name
      // const roles = user.authorization.pn4qd8qb.roles
      const firstName = user.data.firstName
      const lastName = user.data.lastName

      console.log(user)

      console.log(email)
      console.log(data.message)
      if (data.message == "OK") {
        //   console.log("build local storage")
        const update = new Date(handleTimestamp(updatedAt)).toDateString()
        const created = new Date(handleTimestamp(createdAt)).toDateString()

        //   console.log(email)
        localStorage.setItem("token", token)
        //   localStorage.setItem("roles", roles)

        localStorage.setItem("avatar", avatar)
        //   localStorage.setItem("id", data.id)
        localStorage.setItem("email", email)
        localStorage.setItem("createdAt", created)
        localStorage.setItem("updatedAt", update)

        localStorage.setItem("username", username)
        localStorage.setItem("name", name)
        localStorage.setItem("firstName", firstName)
        localStorage.setItem("lastName", lastName)

        //   appDispatch({ type: "login" })
        //   appDispatch({ type: "setToken", value: token })
        //   appDispatch({ type: "setUser", value: data.user })

        //   setMessage(data.message)
      }
      console.log(data.message)
      /*
         if user autheticats set Success authentication message
       */
      console.log(message)
    } catch (err) {
      console.log("err")
      console.log(err.message)
      setMsg({
        show: true,
        poisiton: "center",
        msg: err.message,
        title: "Error",
        context: msgConext.danger
      })
    }
  }

  return (
    <>
      <Page>
        {console.log(login)}
        {console.log(msg)}

        {message == "Success" ? (
          navigate("/dashboard")
        ) : (
          <div className="toast-display-center">
            <Toasty msg={msg} setMsg={setMsg} />
          </div>
        )}
        <div className="center-page">
          <Card style={{ width: "35rem", backgroundColor: "#36393f" }}>
            <Card.Body>
              <Card.Title className="card-center-title">Welcom Back!</Card.Title>
              <Card.Subtitle className="card-sub-title">Nice to see you again!</Card.Subtitle>

              {/* Credentials */}
              <Form className="form-group-styles" onSubmit={e => handleSubmit(e)}>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                  <Form.Label>Email</Form.Label>
                  <Form.Control name="email" type="email" value={login.email} placeholder="Enter email" required minLength={5} maxLength={25} onChange={e => handleChange(e)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control name="password" type="password" value={login.password} placeholder="Enter password" required minLength={5} maxLength={25} onChange={e => handleChange(e)} />
                </Form.Group>
                <Button type="submit">Submit</Button>
                {/* Navigation */}
                <p className="form-footer">
                  Forgot your{" "}
                  <Link className="link-style" to="/forgotpassword">
                    Password?
                  </Link>
                </p>

                <p className="form-footer">
                  Need an account?{" "}
                  <Link className="link-style" to="/register">
                    Register
                  </Link>
                </p>

                <p className="form-footer">
                  Sign in as{" "}
                  <Link className="link-style" to="/#">
                    Demo User
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

export default Login
