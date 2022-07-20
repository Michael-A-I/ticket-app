import { Link, useNavigate } from "react-router-dom"
import { useContext, useEffect } from "react"
import { useState } from "react"
import Navbar from "./Navbar/Navbar"
import "bootstrap/dist/css/bootstrap.min.css"
import "./css/Profile.css"
import Page from "./Page"
import { Button, Card, Container, Form, Row, Toast } from "react-bootstrap"
// import FlashMessage from "./react-flash-message"
/* context */
import StateContext from "../context/StateContext"
import UserFeed from "./UserFeed"
import Avatar from "./Avatar"
function Profile() {
  const navigate = useNavigate()
  const appState = useContext(StateContext)

  const [user, setUser] = useState([])

  const token = appState.user.token

  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    const response = await fetch("/api/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      }
    })

    const user = await response.json()

    setUser(user)
  }

  return (
    <>
      <Navbar />

      <Page title="Profile">
        <h1>Profile</h1>
        <Container>
          <Row>
            {/* Profile Card */}
            <Card>
              <Row>{localStorage.getItem("avatar") != "null" ? <Avatar width={"250px"} height={"200px"} /> : <img src={"/default-profile.jpg"} alt="profile-image" className="thumbnail" style={{ paddingTop: "10px" }} />}</Row>

              <Card.Body>
                <Card.Title>Username: {appState.user.username}</Card.Title>
                <Card.Text>Email: {appState.user.email}</Card.Text>
                <Card.Text>Joined on {appState.user.createdAt}</Card.Text>

                <Card.Text>Job Title: {user.title}</Card.Text>
                <Card.Text>Bio: {user.bio}</Card.Text>

                {console.log(user.title)}
                {console.log(user.bio)}

                <Link to="/profile/edit">Edit Profile</Link>
              </Card.Body>
            </Card>
          </Row>

          <Row>
            <UserFeed />
          </Row>
        </Container>
      </Page>
      {/* initial state show nothing */}
    </>
  )
}

export default Profile
