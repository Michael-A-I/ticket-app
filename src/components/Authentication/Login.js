import { useNavigate, Navigate, Link } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import Navbar from "../Navbar/Navbar"
import { Button, Card, Form, Toast } from "react-bootstrap"
import StateContext from "../../context/StateContext"

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
  /* context */
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  console.log({ loggedIn: appState.loggedIn, initialLogin: appState.initialLogin })

  const token = appState.user.token
  const [login, setLogin] = useState({ email: "", password: "" })
  const navigate = useNavigate()

  const handleChange = event => {
    console.log("handleChange")
    event.preventDefault()
    const target = event.target

    setLogin(prev => ({ ...prev, [target.name]: target.value }))
  }

  async function handleSubmit(event) {
    console.log("handleSubmit")
    event.preventDefault()

    console.log({ handleSubmit: appState.initialLogin })

    try {
      const data = await Userfront.login({
        method: "password",
        email: login.email,
        password: login.password
      })

      const token = `Bearer ${Userfront.tokens.accessToken}`

      /* User Details */
      const user = Userfront.user
      const email = user.email
      const avatar = user.image
      const createdAt = user.createdAt
      const updatedAt = user.updatedAt
      const username = user.username
      const name = user.name
      const id = user.userId

      // const roles = user.authorization.pn4qd8qb.roles
      const firstName = user.data.firstName
      const lastName = user.data.lastName

      logID(email)

      if (data.message == "OK") {
        //   console.log("build local storage")
        const update = new Date(handleTimestamp(updatedAt)).toDateString()
        const created = new Date(handleTimestamp(createdAt)).toDateString()

        //   console.log(email)
        localStorage.setItem("token", token)
        //   localStorage.setItem("roles", roles)
        localStorage.setItem("initialLogin", true)

        localStorage.setItem("avatar", avatar)
        // localStorage.setItem("id", data.id)
        localStorage.setItem("email", email)
        localStorage.setItem("createdAt", created)
        localStorage.setItem("updatedAt", update)

        localStorage.setItem("username", username)
        localStorage.setItem("name", name)
        localStorage.setItem("firstName", firstName)
        localStorage.setItem("lastName", lastName)
        localStorage.setItem("userfrontId", id)

        appDispatch({ type: "login" })
        appDispatch({ type: "setToken", value: token })
        appDispatch({ type: "setUser", value: name })
        appDispatch({ type: "setFirst", value: firstName })
        appDispatch({ type: "setLast", value: lastName })
        appDispatch({ type: "initialLogin", value: true })
        appDispatch({ type: "message", show: true, msg: data.message, title: msgConext.good, context: msgConext.success })
      }
    } catch (err) {
      console.log("err")
      console.log(err.message)
      appDispatch({ type: "message", show: true, msg: err.message, title: msgConext.bad, context: msgConext.danger })
    }
  }

  async function demoLogin(event) {
    console.log("handleSubmit")
    event.preventDefault()

    console.log(login)

    try {
      const data = await Userfront.login({
        method: "password",
        email: "testadmin@testadmin.com",
        password: "testadmin@testadmin.com"
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
      const id = user.userId

      // const roles = user.authorization.pn4qd8qb.roles
      const firstName = user.data.firstName
      const lastName = user.data.lastName

      console.log(user)

      console.log(email)
      logID(email)
      console.log(data.message)
      if (data.message == "OK") {
        //   console.log("build local storage")
        const update = new Date(handleTimestamp(updatedAt)).toDateString()
        const created = new Date(handleTimestamp(createdAt)).toDateString()

        //   console.log(email)
        localStorage.setItem("token", token)
        //   localStorage.setItem("roles", roles)

        localStorage.setItem("avatar", avatar)
        // localStorage.setItem("id", data.id)
        localStorage.setItem("email", email)
        localStorage.setItem("createdAt", created)
        localStorage.setItem("updatedAt", update)

        localStorage.setItem("username", username)
        localStorage.setItem("name", name)
        localStorage.setItem("firstName", firstName)
        localStorage.setItem("lastName", lastName)
        localStorage.setItem("userfrontId", id)

        appDispatch({ type: "setToken", value: token })
        appDispatch({ type: "setUser", value: name })
        appDispatch({ type: "setFirst", value: firstName })
        appDispatch({ type: "setLast", value: lastName })
        appDispatch({ type: "message", show: true, msg: data.message, title: msgConext.good, context: msgConext.danger })
        appDispatch({ type: "login" })
      }
      console.log(data.message)
      /*
         if user autheticats set Success authentication message
       */
    } catch (err) {
      console.log("err")
      console.log(err.message)
      appDispatch({ type: "message", show: true, msg: err.message, title: msgConext.bad, context: msgConext.danger })
    }
  }

  const logID = async email => {
    await fetch(`/api/login/test`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })

    console.log({ token })
  }

  useEffect(() => {
    if (appState.loggedIn) {
      navigate("/dashboard")
    }
  }, [])

  return (
    <>
      <Page style={{ paddingLeft: "0px" }} title="Login">
        {console.log(appState.loggedIn)}

        <div className="center-page">
          <Card style={{ width: "35rem", backgroundColor: "#36393f", marginTop: "100px" }}>
            <Card.Body>
              <Card.Title className="card-center-title">Welcome!</Card.Title>
              <Card.Subtitle className="card-sub-title">Kindly enter you login credentials.</Card.Subtitle>

              {/* Credentials */}
              <Form className="form-group-styles" onSubmit={e => handleSubmit(e)}>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                  <Form.Label>Email</Form.Label>
                  <Form.Control style={{ color: "white" }} name="email" type="email" value={login.email} required minLength={5} maxLength={30} onChange={e => handleChange(e)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control style={{ color: "white" }} name="password" type="password" value={login.password} required minLength={5} maxLength={30} onChange={e => handleChange(e)} />
                </Form.Group>
                <Button style={{ margin: "10px 0px 10px 0px" }} type="submit">
                  Submit
                </Button>
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
                  <Link className="link-style" to="#" onClick={e => demoLogin(e)}>
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
