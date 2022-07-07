import { useNavigate, Link } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
/* user context */
import DispatchContext from "../context/DispatchContext"
import StateContext from "../context/StateContext"

import "./css/Navbar.css"

import { Button, Dropdown, FormControl, InputGroup } from "react-bootstrap"
import DropdownToggle from "react-bootstrap/esm/DropdownToggle"
import DropdownMenu from "react-bootstrap/esm/DropdownMenu"
import DropdownItem from "react-bootstrap/esm/DropdownItem"
import ListGroup from "react-bootstrap/ListGroup"
function Navbar() {
  /* user context  changed through navbar */
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

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

  console.log(appState)
  async function logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("avatar")
    localStorage.removeItem("id")

    appDispatch({ type: "logout" })

    await history("/login")
  }

  useEffect(async () => {
    // try {
    // const res = await fetch("/isUserAuth", {
    //     headers: {
    //       "x-access-token": localStorage.getItem("token")
    //     }
    //   })
    //   const user = await res.json()
    // } catch (error) {
    // }
    //   .then(res => res.json())
    //   .then(data => (data.isLoggedIn ? appDispatch(data.user) : null))
  }, [])

  //expose user object for use in the nav.

  async function searcher(event) {
    console.log("searcher")
    const inputValue = event.target.value
    setSearch(inputValue)

    if (inputValue.length <= 0) {
      return
    }
    const token = localStorage.getItem("token")

    /* call to backend to perfrom search */
    const searchedPosts = await fetch(`/posts/search/${inputValue}`, {
      headers: {
        method: "GET",
        "x-access-token": token
      }
    })

    const res = await searchedPosts.json()

    console.log(res)
    setDropdown(res)

    // go thorugh posts and find post related to words
  }

  const handleDropDown = e => {
    // e.preventDefault()
    console.log(e.target.innerText)

    localStorage.setItem("dropDown", e.target.innerText)
  }
  return (
    <div id="bootstrap-overrides">
      <nav className="navbar">
        <div className="navbar-container ">
          {/* Navbar Logo */}
          <div className="navbar-logo-container ">
            <Link style={{ textDecoration: "none" }} to="/dashboard">
              <i class="fa-solid fa-bug-slash " style={{ color: "white" }}></i>
              <h3 className="navbar-logo-title">Chatter</h3>
            </Link>
          </div>
          <div className="menu-icon" onClick={handleClick}>
            {/* <i id="bars" className={click ? "fas fa-times fa-spin" : "fas fa-bars "}></i> */}
            <div className={click ? "ham-top ham-rotate-down" : "ham-top"}></div>
            <div className={click ? "ham-middle ham-fade" : "ham-middle"}></div>
            <div className={click ? "ham-bottom ham-rotate-up" : "ham-bottom"}></div>
          </div>
          {/* Navbar Links */}
          {/* search for posts : links about site */}
          {/* TODO: style search and dropdowns */}

          {appState.loggedIn ? (
            <>
              <div className="nav-search">
                <InputGroup onChange={e => searcher(e)} size="sm" className="mb-1 nav-search-box">
                  <FormControl placeholder="Search" aria-label="Search" />
                </InputGroup>
                {/* Search View */}
                <ListGroup>
                  {dropdown.map(item => (
                    <ListGroup.Item>{item.title}</ListGroup.Item>
                  ))}
                </ListGroup>

                <div className="nav-search-buttons">
                  <Dropdown onClick={e => handleDropDown(e)} className="nav-search-buttons-item">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      {localStorage.getItem("dropDown") || "General"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="/general">General</Dropdown.Item>
                      <Dropdown.Item href="/engineer">Engineering</Dropdown.Item>
                      <Dropdown.Item href="/product">Product Q&A</Dropdown.Item>
                      <Dropdown.Item href="/support">Support Q&A</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  {/*  <Link to="/leaderboard" className="nav-search-buttons-item nav-search-buttons-item--small">
                      <i class="fa-solid fa-trophy"></i>
                    </Link> */}
                  <Link to="/users" className="nav-search-buttons-item nav-search-buttons-item--small">
                    <i class="fa-solid fa-person"></i>
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <div>
              <ul className="navbar-menu-center">
                <li className="nav-item-center">
                  <Link className="nav-links" to="/comingsoon">
                    About
                  </Link>
                </li>
                <li className="nav-item-center">
                  <Link className="nav-links" to="/comingsoon">
                    Support
                  </Link>
                </li>
                <li className="nav-item-center">
                  <Link className="nav-links" to="/comingsoon">
                    Careers
                  </Link>
                </li>
                <li className="nav-item-center">
                  <Link className="nav-links" to="/comingsoon">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
          )}
          {/* Authentication Links */}
          {appState.loggedIn ? (
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
                    <Dropdown.Item href="#/action-3">Contact Me</Dropdown.Item>
                    <Dropdown.Item onClick={logout}>logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            </ul>
          ) : (
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
          )}
        </div>
      </nav>
    </div>
  )
}

export default Navbar
// TODO: fix profile as it get smaller
