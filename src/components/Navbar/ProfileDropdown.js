import React, { useContext, useState } from "react"
import { Button, Dropdown } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import DispatchContext from "../../context/DispatchContext"
import StateContext from "../../context/StateContext"
import Userfront from "@userfront/core"
import "./css/ProfileDropdown.css"

function ProfileDropdown(props) {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  const history = useNavigate()

  // Initialize Userfront Core JS
  Userfront.init("pn4qd8qb")

  async function logout() {
    localStorage.clear()
    appDispatch({ type: "logout" })
    appDispatch({ type: "initialLogin", value: true })
    Userfront.logout()
  }

  const handleClick = () => {
    props.setClick(!props.click)
  }

  if (props.click) {
    document.body.style.overflow = "hidden"
  }
  if (!props.click) {
    document.body.style.overflow = "visible"
  }

  return (
    <>
      <ul className={props.click ? "nav-menu active" : "nav-menu"}>
        <li className="nav-profile">
          <Link onClick={handleClick} className="nav-search-buttons-item nav-search-buttons-item--primary  hide-big" to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li>
          <Link onClick={handleClick} className="nav-search-buttons-item nav-search-buttons-item--primary hide-big" to="/manage/role">
            Manage Roles
          </Link>
        </li>
        <li>
          <Link onClick={handleClick} className="nav-search-buttons-item nav-search-buttons-item--primary  hide-big" to="/Projects/index">
            Manage Projects
          </Link>
        </li>
        <li>
          <Link onClick={handleClick} className="nav-search-buttons-item nav-search-buttons-item--primary  hide-big" to="/myticket/:id">
            My Tickets
          </Link>
        </li>
        <li>
          <Link onClick={handleClick} className="nav-search-buttons-item nav-search-buttons-item--primary  hide-big" to="/profile">
            User Profile
          </Link>
        </li>
        <li>
          <Button onClick={logout} className="btn-warning nav-search-buttons-item hide-big">
            Logout
          </Button>
        </li>
        <li>
          <Dropdown id="dropdown-hide-small">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {appState.user.first} {appState.user.last}
            </Dropdown.Toggle>

            {/* <Dropdown.Toggle variant="success" id="dropdown-basic-md">
              <i class="fa-solid fa-circle-chevron-down"></i>
            </Dropdown.Toggle> */}

            <Dropdown.Menu>
              <Dropdown.Item href="/profile">Profile</Dropdown.Item>
              {/* <Dropdown.Item href={`#/u/${appState.user.id}/notifications`}>Subscription</Dropdown.Item>
              <Dropdown.Item href="/contactme">Contact Me</Dropdown.Item> */}
              <Dropdown.Item onClick={logout}>logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </li>
      </ul>
    </>
  )
}

export default ProfileDropdown
