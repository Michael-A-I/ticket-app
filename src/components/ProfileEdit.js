import { Link, useNavigate } from "react-router-dom"
import { useContext, useEffect } from "react"
import { useState } from "react"
import Navbar from "./Navbar"
import "bootstrap/dist/css/bootstrap.min.css"
import "./css/ProfileEdit.css"
import Page from "./Page"
import { Button, Card, Container, FloatingLabel, Form, Row, Toast } from "react-bootstrap"
import StateContext from "../context/StateContext"
import ProfileEditNav from "./ui/ProfileEditNav"
import "./ui/css/ProfileEditNav.css"

function ProfileEdit() {
  const navigate = useNavigate()
  const appState = useContext(StateContext)
  const [message, setMessage] = useState()
  const [show, setShow] = useState(false)
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [user, setUser] = useState({})
  const [userState, setUserState] = useState({ title: user.title, bio: user.bio })

  const [position, setPosition] = useState("top-center")
  const token = appState.user.token

  /* Load User Info */

  useEffect(() => {
    userInfo()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    console.log("Register")
    const form = e.target
    // console.log(form[0].value, form[1].value, form[2].value)
    const user = { title: form[2].value, bio: form[3].value }
    console.log("Register User Post Data username: " + user.username)

    try {
      const res = await fetch("/profile/edit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token
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

  const userInfo = async () => {
    try {
      const res = await fetch("/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token
        }
      })

      const user = await res.json()

      setUserState({ title: user.title, bio: user.bio })
    } catch (error) {
      console.log(error)
    }
  }

  const handleChangeTITLE = e => {
    const value = e.target.value

    setUserState(prev => ({ ...prev, title: value }))
  }

  const handleChangeBIO = e => {
    const value = e.target.value

    setUserState(prev => ({ ...prev, bio: value }))
  }

  async function handlePassword(e) {
    e.preventDefault()
    if (passwordsMatch()) {
      console.log("passwords match on submit")

      const user = e.target
      const userPassword = { password: user[0].value }

      const res = await fetch("/profile/edit/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token
        },
        body: JSON.stringify(userPassword)
      })

      const response = await res.json()

      console.log(response)
    } else {
      console.log("passwords do not match on submit")
    }
  }

  const toggleShow = () => {
    setShow(!show)
  }

  const passwordsMatch = () => {
    if (password == passwordConfirm) {
      console.log("passwords match")
      return true
    } else {
      return false
    }
  }

  return (
    <>
      <Navbar />
      <Container id="bootstrap-overrides">
        <Page title="Register">
          <ProfileEditNav></ProfileEditNav>
          {/* Profile Edit Form */}
          <Row>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                {<Form.Control type="email" placeholder={appState.user.email} value={appState.user.email} disabled />}

                <Form.Text className="text-muted">can not change email</Form.Text>
              </Form.Group>

              {
                <Form.Group className="mb-3">
                  <FloatingLabel controlId="" label={"Name: " + appState.user.username}>
                    <Form.Control disabled type="input" placeholder={appState.user.username} value={appState.user.username} />
                  </FloatingLabel>
                </Form.Group>
              }
              {console.log(user)}
              <Form.Group className="mb-3">
                <FloatingLabel controlId="floatingPassword" label="Job Title">
                  <Form.Control type="input" value={userState.title} onChange={e => handleChangeTITLE(e)} placeholder="Job Title" />
                </FloatingLabel>
              </Form.Group>

              <Form.Group className="mb-3">
                <FloatingLabel controlId="floatingPassword" label="Biography">
                  <Form.Control as="textarea" value={userState.bio} onChange={e => handleChangeBIO(e)} placeholder="Biography" />
                </FloatingLabel>
              </Form.Group>

              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Form>
          </Row>
          <Row>
            <Form onSubmit={handlePassword}>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control required type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" />
                </FloatingLabel>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <FloatingLabel controlId="floatingPassword" label="Confirm Password">
                  <Form.Control required type="password" onChange={e => setPasswordConfirm(e.target.value)} placeholder="Password" />
                </FloatingLabel>
              </Form.Group>

              <Button variant="primary" type="submit">
                Change Password{" "}
              </Button>
            </Form>
          </Row>
        </Page>
      </Container>
      {/* initial state show nothing */}
    </>
  )
}

export default ProfileEdit
