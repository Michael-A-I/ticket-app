import React, { Component, useState } from "react"
import { Link } from "react-router-dom"
import "./css/Auth.css"

function Auth() {
  const [click, setClick] = useState(false)

  const handleClick = () => {
    setClick(!click)
  }
  const closeClick = () => {
    setClick(false)
  }

  return (
    <>
      <div className="authentication-right">
        <ul className="nav-menu-authentication">
          <li onClick={handleClick} className="nav-item-authentication">
            <Link className="nav-links-authentication" to="/login">
              Login
            </Link>
          </li>
          <li onClick={handleClick} className="nav-item-authentication">
            <Link className="nav-links-authentication" to="/register">
              Register
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Auth
