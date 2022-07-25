import React from "react"
import { Link } from "react-router-dom"
import "./css/CenterMenu.css"
function CenterMenu() {
  return (
    <>
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
    </>
  )
}

export default CenterMenu
