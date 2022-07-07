import React, { useState } from "react"
import { Row } from "react-bootstrap"
import { Link } from "react-router-dom"

import "./css/ProfileEditNav.css"

function ProfileEditNav() {
  const [clickValue, setClickValue] = useState()
  const handleClick = value => {
    setClickValue(value)
    console.log(value)
  }

  return (
    <>
      <Row className="profile-edit-nav">
        {clickValue === "Profile" ? (
          <Link to={"/profile/edit"} onClick={() => handleClick("Profile")} style={{ color: "yellow" }} className="profile-edit-button">
            Profile
          </Link>
        ) : (
          <Link to={"/profile/edit"} onClick={() => handleClick("Profile")} value="Profile" className="profile-edit-button">
            Profile
          </Link>
        )}

        {clickValue === "Avatar" ? (
          <Link to={"/avatar/edit"} onClick={() => handleClick("Avatar")} style={{ color: "yellow" }} className="profile-edit-button">
            Avatar
          </Link>
        ) : (
          <Link to={"/avatar/edit"} onClick={() => handleClick("Avatar")} value="Avatar" className="profile-edit-button">
            Avatar
          </Link>
        )}
      </Row>
    </>
  )
}

export default ProfileEditNav
