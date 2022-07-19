import React, { useContext, useState } from "react"
import { Button, Dropdown } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import DispatchContext from "../../context/DispatchContext"
import StateContext from "../../context/StateContext"

function ProfileDropdown() {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  const [click, setClick] = useState(false)

  const history = useNavigate()

  async function logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("avatar")
    localStorage.removeItem("id")

    appDispatch({ type: "logout" })
    appDispatch({ type: "setToken" })

    await history("/login")
  }

  return (
    <>
      <ul className={click ? "nav-menu active" : "nav-menu"}>
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
