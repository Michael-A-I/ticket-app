import React, { useContext, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import StateContext from "../../../context/StateContext"
import "./css/SidebarItems.css"

function SidebarItems() {
  const appState = useContext(StateContext)
  const token = appState.user.token

  useEffect(() => {
    getUser()
  })

  const [id, setId] = useState()

  const email = localStorage.getItem("email")

  const getUser = async () => {
    const res = await fetch(`/api/getUser/${email}`, {
      headers: {
        method: "GET",
        "x-access-token": token
      }
    })

    const user = await res.json()

    setId(user._id)
  }
  return (
    <>
      <Link to="/dashboard" className="nav-link-item">
        <div className="nav-link-icon">
          <i class="fa-solid fa-table-columns"></i>
        </div>
        <p className="nav-link-text">Dashboard</p>
      </Link>
      <Link to="/manage/role" className="nav-link-item">
        <div className="nav-link-icon">
          <i class="fa-solid fa-table-columns"></i>
        </div>
        <p className="nav-link-text">Manage Role Assignment</p>
      </Link>
      <Link to="/manage/users" className="nav-link-item">
        <div className="nav-link-icon">
          <i class="fa-solid fa-table-columns"></i>
        </div>
        <p className="nav-link-text">Manage Project Users</p>
      </Link>{" "}
      <Link to="/Projects/index" className="nav-link-item">
        <div className="nav-link-icon">
          <i class="fa-solid fa-table-columns"></i>
        </div>
        <p className="nav-link-text">Manage Projects</p>
      </Link>{" "}
      <Link to={`/myticket/${id}`} className="nav-link-item">
        <div className="nav-link-icon">
          <i class="fa-solid fa-table-columns"></i>
        </div>
        <p className="nav-link-text">My Tickets</p>
      </Link>{" "}
      <Link to="/profile" className="nav-link-item">
        <div className="nav-link-icon">
          <i class="fa-solid fa-table-columns"></i>
        </div>
        <p className="nav-link-text">User Profile</p>
      </Link>
    </>
  )
}

export default SidebarItems
