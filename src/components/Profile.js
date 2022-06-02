import { Link, useNavigate } from "react-router-dom"
import { useContext, useEffect } from "react"
import { useState } from "react"
import Navbar from "./Navbar"
import "bootstrap/dist/css/bootstrap.min.css"
import "./css/Profile.css"
import Page from "./Page"
import { Button, Card, Container, Form, Row, Toast } from "react-bootstrap"
// import FlashMessage from "./react-flash-message"
/* context */
import StateContext from "../context/StateContext"
function Profile() {
  const navigate = useNavigate()
  const appState = useContext(StateContext)

  return (
    <>
      <Navbar />

      <Page title="Profile">
        <h1>Profile</h1>
        <Container>
          <Row>
            {/* TODO: Style */}
            {/* Avatar */}
            <h1>{appState.user.avatar}</h1>
            {/* Username */}
            <h1>Username: {appState.user.username}</h1>
            {/* User Email */}
            <h1>Email: {appState.user.email}</h1>
            {/* Join Data */}
            <h1>Joined on {appState.user.createdAt}</h1>
            {/* Status */}

            <Link to="/profile/edit">Edit Profile</Link>
          </Row>

          <Row>TODO: Feed of user activity TODO: Follows, Followers</Row>
        </Container>
      </Page>
      {/* initial state show nothing */}
    </>
  )
}

export default Profile
