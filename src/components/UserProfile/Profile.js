import { Link, useNavigate } from "react-router-dom"
import { useContext, useEffect } from "react"
import { useState } from "react"
import Navbar from "../Navbar/Navbar"
import "bootstrap/dist/css/bootstrap.min.css"
import "./css/Profile.css"
import Page from "../ui/Page"
import { Button, Card, Container, Form, Row, Toast } from "react-bootstrap"
// import FlashMessage from "./react-flash-message"
/* context */
import StateContext from "../../context/StateContext"
import UserFeed from "./UserFeed"
import Avatar from "./Avatar"
function Profile() {
  const navigate = useNavigate()

  const appState = useContext(StateContext)
  const token = appState.user.token

  const [user, setUser] = useState([])

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
      <Page title="Profile">
        <div className="profile_wrap">
          <div style={{ width: "100%", display: "flex", margin: "25px 100px 50px 0px", justifyContent: "space-between", alignItems: "center" }}>
            <h1>Profile</h1>
          </div>

          <Row>
            {/* Profile Card */}
            <Card style={{ width: "90%", border: "1px solid black", boxShadow: "2.5px 4.5px rgb(64, 78, 237)" }}>
              <Row style={{ margin: "0px 0px 0px 2%;" }}>{localStorage.getItem("avatar") != "null" ? <Avatar width={"250px"} height={"200px"} /> : <img src={"/default-profile.jpg"} alt="profile-image" className="thumbnail" style={{ paddingTop: "10px" }} />}</Row>

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
        </div>
      </Page>
      {/* initial state show nothing */}
    </>
  )
}

export default Profile
