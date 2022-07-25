import React, { useRef } from "react"
import { Link } from "react-router-dom"
import "./css/SidebarItems.css"

function SidebarItems() {
  return (
    <>
      <Link to="/dashboard" className="nav-link-item">
        <div className="nav-link-icon">
          <i class="fa-solid fa-table-columns"></i>
        </div>
        <p className="nav-link-text">Dashboard</p>
      </Link>
      <Link to="/#" className="nav-link-item">
        <div className="nav-link-icon">
          <i class="fa-solid fa-table-columns"></i>
        </div>
        <p className="nav-link-text">Manage Role Assignment</p>
      </Link>
      <Link to="/#" className="nav-link-item">
        <div className="nav-link-icon">
          <i class="fa-solid fa-table-columns"></i>
        </div>
        <p className="nav-link-text">Manage Project Users</p>
      </Link>{" "}
      <Link to="/#" className="nav-link-item">
        <div className="nav-link-icon">
          <i class="fa-solid fa-table-columns"></i>
        </div>
        <p className="nav-link-text">Manage Tickets</p>
      </Link>{" "}
      <Link to="/#" className="nav-link-item">
        <div className="nav-link-icon">
          <i class="fa-solid fa-table-columns"></i>
        </div>
        <p className="nav-link-text">My Tickets</p>
      </Link>{" "}
      <Link to="/#" className="nav-link-item">
        <div className="nav-link-icon">
          <i class="fa-solid fa-table-columns"></i>
        </div>
        <p className="nav-link-text">User Profile</p>
      </Link>
    </>
  )
}

export default SidebarItems
