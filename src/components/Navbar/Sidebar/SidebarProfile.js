import React, { useState } from "react"
import Container from "react-bootstrap/Container"
import "./css/SidebarProfilie.css"

function SidebarProfile(props) {
  const userVar = localStorage.getItem("firstName")
  const [user, setUser] = useState(userVar)

  return (
    <Container className="sidebar-profile-container" style={{ height: "30%", zIndex: "1000" }}>
      <div className="sidebar-profile-icon">
        <i class="fa-solid fa-user"></i>
      </div>
      <div className="sidebar-profile-text">
        <p>{`Welcome,`}</p>
        <p>{`${user}`}</p>
      </div>
    </Container>
  )
}

export default SidebarProfile
