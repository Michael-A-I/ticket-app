import React from "react"
import { Link } from "react-router-dom"

import "./css/Logo.css"

function Logo() {
  return (
    <>
      {/* Navbar Logo */}

      <div className="navbar-logo-container ">
        <Link style={{ textDecoration: "none" }} to="/dashboard">
          <i class="fa-solid fa-bug-slash " style={{ color: "white" }}></i>
        </Link>

        <Link style={{ textDecoration: "none" }} to="/dashboard">
          <h3 className="navbar-logo-title">Chatter</h3>
        </Link>
      </div>
    </>
  )
}

export default Logo
