import React, { useContext } from "react"
import { Nav } from "react-bootstrap"
import { withRouter } from "react-router"

import "../Sidebar/css/Sidebar.css"
import SidebarProfile from "./SidebarProfile"
import Container from "react-bootstrap/Container"
import SidebarItems from "./SidebarItems"

import DispatchContext from "../../../context/DispatchContext"
import StateContext from "../../../context/StateContext"
const Sidebar = props => {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  return (
    <>
      {console.log(appState.loggedIn)}
      {appState.loggedIn ? (
        <Nav className="col-md-12 d-none d-md-block bg-light sidebar" style={{ width: "300px" }} activeKey="/home" onSelect={selectedKey => alert(`selected ${selectedKey}`)}>
          <div className="sidebar-sticky">
            <SidebarProfile />
          </div>

          <SidebarItems />
        </Nav>
      ) : (
        ""
      )}
    </>
  )
}

//? what does withRouter do?
// const Sidebar = withRouter(Side)
export default Sidebar
