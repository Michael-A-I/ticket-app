import React, { useState } from "react"
import "./css/Hamburger.css"
function Hamburger() {
  const [click, setClick] = useState(false)

  const handleClick = () => {
    setClick(!click)
  }

  return (
    <>
      <div className="menu-icon" onClick={handleClick} style={{ zIndex: "1000000000" }}>
        {/* <i id="bars" className={click ? "fas fa-times fa-spin" : "fas fa-bars "}></i> */}
        <div className={click ? "ham-top ham-rotate-down" : "ham-top"}></div>
        <div className={click ? "ham-middle ham-fade" : "ham-middle"}></div>
        <div className={click ? "ham-bottom ham-rotate-up" : "ham-bottom"}></div>
      </div>
    </>
  )
}

export default Hamburger
