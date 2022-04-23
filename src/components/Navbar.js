import { useNavigate, Link } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
/* user context */
import { UserContext } from "../context/UserContext"

import "./css/Navbar.css"

import { Dropdown } from "react-bootstrap"
import DropdownToggle from "react-bootstrap/esm/DropdownToggle"
import DropdownMenu from "react-bootstrap/esm/DropdownMenu"
import DropdownItem from "react-bootstrap/esm/DropdownItem"
export function Navbar() {
  const history = useNavigate()
  const [click, setClick] = useState(false)
  const [search, setSearch] = useState("")
  const [dropdown, setDropdown] = useState([])

  const handleClick = () => {
    setClick(!click)
  }
  const closeClick = () => {
    setClick(false)
  }

  /* user context  changed through navbar */
  const { user, setUser } = useContext(UserContext)

  console.log(user)
  async function logout() {
    localStorage.removeItem("token")

    await history("/login")
  }

  useEffect(() => {
    fetch("https://ticket-app-serverside.herokuapp.com/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data => (data.isLoggedIn ? setUser(data.user) : null))
  }, [])

  //expose user object for use in the nav.

  async function searcher(event) {
    console.log("searcher")
    const inputValue = event.target.value
    setSearch(inputValue)

    const token = localStorage.getItem("token")

    /* call to backend to perfrom search */
    const searchedPosts = await fetch(`/search/${inputValue}`, {
      headers: {
        "x-access-token": token
      }
    })

    const res = await searchedPosts.json()

    console.log(res)
    setDropdown(res)

    // go thorugh posts and find post related to words
  }

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
              {/* Search for posts */}
              <li className="search search-hide">
                <input value={search} onChange={event => searcher(event)} className="search search-hide" type="text" name="search" />
                <button className="search-hide" for="Search">
                  Search
                </button>
                {/* TODO: showing as display none */}
                <div className="searchDropDown">
                  {dropdown.length !== 0 ? (
                    <div id="dropdown" className="dropdown-menu" style={{ display: "content" }}>
                      {dropdown.map(item => (
                        <div>
                          <Link class="dropdown-item" to={`/posts/${item._id}`}>
                            {item.title}
                          </Link>

                          <br></br>
                        </div>
                      ))}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </li>

              <li>
                <i class="fa-solid fa-bell"></i>
              </li>
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
