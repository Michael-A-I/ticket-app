import { useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import "./css/Navbar.css"

import { Dropdown } from "react-bootstrap"
import DropdownToggle from "react-bootstrap/esm/DropdownToggle"
import DropdownMenu from "react-bootstrap/esm/DropdownMenu"
import DropdownItem from "react-bootstrap/esm/DropdownItem"
export function Navbar() {
  const history = useNavigate()
  const [click, setClick] = useState(false)
  const handleClick = () => {
    setClick(!click)
  }
  const closeClick = () => {
    setClick(false)
  }
  const [user, setUser] = useState(null)

  console.log(user)
  async function logout() {
    localStorage.removeItem("token")

    await history("/login")
  }

  useEffect(() => {
    fetch("/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data => (data.isLoggedIn ? setUser(data.user) : null))
  }, [])

  //expose user object for use in the nav.

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container hide">
          <Link onClick={closeClick} to="/" className="navbar-logo hide">
            {/* <i className="fa-solid fa-ban-bug hide"></i> */}
            <i class="fa-solid fa-bug-slash hide"></i>
          </Link>

          <div className="menu-icon hide" onClick={handleClick}>
            {/* <i id="bars" className={click ? "fas fa-times fa-spin" : "fas fa-bars "}></i> */}
            <div className={click ? "ham-top ham-rotate-down" : "ham-top"}></div>
            <div className={click ? "ham-middle ham-fade" : "ham-middle"}></div>
            <div className={click ? "ham-bottom ham-rotate-up" : "ham-bottom"}></div>
          </div>

          {user ? (
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item hide">
                <Link className="nav-links" onClick={handleClick} to={"/u/" + user.id}>
                  Profile
                </Link>
              </li>

              <li onClick={handleClick} className="nav-item hide">
                <Link className="nav-links" to="/posts/new">
                  Create Post
                </Link>
              </li>
              <li onClick={handleClick} className="nav-item hide">
                <Link className="nav-links" to="/dashboard">
                  Dashboard
                </Link>
              </li>

              <li>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {user.username}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-3">Settings</Dropdown.Item>
                    <Dropdown.Item href={`/u/${user.id}/notifications`}>Notifications</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Subscriptions</Dropdown.Item>
                    <Dropdown.Item onClick={logout}>logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>

              {/* Drop down */}

              {/* create case form */}
            </ul>
          ) : (
            <div>
              <ul className={click ? "nav-menu active" : "nav-menu"}>
                <li onClick={handleClick} className="nav-item hide">
                  <Link className="nav-links" to="/login">
                    Login
                  </Link>
                </li>
                <li onClick={handleClick} className="nav-item hide">
                  <Link className="nav-links" to="/register">
                    Register
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </div>
  )
}
