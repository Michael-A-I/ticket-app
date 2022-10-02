import React, { useState } from "react"
import { Row } from "react-bootstrap"
import { Link } from "react-router-dom"

import "./css/ProfileEditNav.css"

function ProfileEditNav(props) {
  const [clickValue, setClickValue] = useState()
  const handleClick = value => {
    setClickValue(value)
    console.log(value)
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
        <Row style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", maxWidth: "500px" }}>
          {clickValue === "Profile" ? (
            <Link style={{ margin: "20px auto", border: "1px solid #404eed", textDecoration: "none", background: "#404eed", display: "flex", justifyContent: "center", alignItems: "center", color: "white", borderRadius: "5px" }} to={"/profile/edit"} onClick={() => handleClick("Profile")} style={{ color: "yellow" }} className="profile-edit-button">
              Profile
            </Link>
          ) : (
            <Link style={{ margin: "20px auto", border: "1px solid #404eed", textDecoration: "none", background: "#404eed", display: "flex", justifyContent: "center", alignItems: "center", color: "white", borderRadius: "5px" }} to={"/profile/edit"} onClick={() => handleClick("Profile")} value="Profile" className="profile-edit-button">
              Profile
            </Link>
          )}

          {clickValue === "Avatar" ? (
            <Link style={{ margin: "20px auto", border: "1px solid #404eed", textDecoration: "none", background: "#404eed", display: "flex", justifyContent: "center", alignItems: "center", color: "white", borderRadius: "5px" }} to={"/avatar/edit"} onClick={() => handleClick("Avatar")} style={{ color: "yellow" }} className="profile-edit-button">
              Avatar
            </Link>
          ) : (
            <Link style={{ margin: "20px auto", border: "1px solid #404eed", textDecoration: "none", background: "#404eed", display: "flex", justifyContent: "center", alignItems: "center", color: "white", borderRadius: "5px" }} to={"/avatar/edit"} onClick={() => handleClick("Avatar")} value="Avatar" className="profile-edit-button">
              Avatar
            </Link>
          )}
        </Row>
      </div>
    </>
  )
}

export default ProfileEditNav
