import React from "react"
import { Dropdown } from "react-bootstrap"
import { Link } from "react-router-dom"
import "./css/Dropdown.css"
function DropDown() {
  const handleDropDown = e => {
    // e.preventDefault()
    console.log(e.target.innerText)

    localStorage.setItem("dropDown", e.target.innerText)
  }

  return (
    <>
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
        {/* <Link to="/leaderboard" className="nav-search-buttons-item nav-search-buttons-item--small">
          <i class="fa-solid fa-trophy"></i>
        </Link> */}
        <Link to="/users" className="nav-search-buttons-item nav-search-buttons-item--small">
          <i class="fa-solid fa-person" style={{ marginTop: "5px" }}></i>
        </Link>
      </div>
    </>
  )
}

export default DropDown
