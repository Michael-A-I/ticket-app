import React, { useContext, useState } from "react"
import { Button, Dropdown } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import DispatchContext from "../../context/DispatchContext"
import StateContext from "../../context/StateContext"
import Userfront from "@userfront/core"

function ProfileDropdown(props) {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  const history = useNavigate()

  // Initialize Userfront Core JS
  Userfront.init("pn4qd8qb")

  async function logout() {
    localStorage.clear()
    appDispatch({ type: "logout" })
    Userfront.logout()
  }

  return (
    <>
      <ul className={props.click ? "nav-menu active" : "nav-menu"}>
        <li className="nav-profile">
          <Link className="nav-search-buttons-item nav-search-buttons-item--primary  hide-big" to="/profile">
            Profile
          </Link>
        </li>
        <li>
          <Link className="nav-search-buttons-item nav-search-buttons-item--primary hide-big" to="/post/new">
            Create Posts
          </Link>
        </li>
        <li>
          <Link className="nav-search-buttons-item nav-search-buttons-item--primary  hide-big" to="/post/new">
            View Posts
          </Link>
        </li>
        <li>
          <Link className="nav-search-buttons-item nav-search-buttons-item--primary  hide-big" to="/post/new">
            Search
          </Link>
        </li>
        <li>
          <Link className="nav-search-buttons-item nav-search-buttons-item--primary  hide-big" to="/post/new">
            Create Posts
          </Link>
        </li>
        <li>
          <Button onClick={logout} className="btn-warning nav-search-buttons-item hide-big">
            Logout
          </Button>
        </li>
        <li>
          <Dropdown id="hide-small">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {appState.user.username}
            </Dropdown.Toggle>

            {/* <Dropdown.Toggle variant="success" id="dropdown-basic-md">
              <i class="fa-solid fa-circle-chevron-down"></i>
            </Dropdown.Toggle> */}

            <Dropdown.Menu>
              <Dropdown.Item href="/profile">Profile</Dropdown.Item>
              <Dropdown.Item href={`#/u/${appState.user.id}/notifications`}>Subscription</Dropdown.Item>
              <Dropdown.Item href="/contactme">Contact Me</Dropdown.Item>
              <Dropdown.Item onClick={logout}>logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </li>
      </ul>
    </>
  )
}

export default ProfileDropdown
