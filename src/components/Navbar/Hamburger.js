import React, { useState } from "react"
import "./css/Hamburger.css"
function Hamburger(props) {
  const handleClick = () => {
    props.setClick(!props.click)
  }

  return (
    <>
      <div className="menu-icon" onClick={handleClick} style={{ zIndex: "1000000000" }}>
        {/* <i id="bars" className={click ? "fas fa-times fa-spin" : "fas fa-bars "}></i> */}
        <div className={props.click ? "ham-top ham-rotate-down" : "ham-top"}></div>
        <div className={props.click ? "ham-middle ham-fade" : "ham-middle"}></div>
        <div className={props.click ? "ham-bottom ham-rotate-up" : "ham-bottom"}></div>
      </div>
    </>
  )
}

export default Hamburger
