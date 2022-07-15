import React, { useState } from "react"

function Hamburger() {
  const [click, setClick] = useState(false)

  const handleClick = () => {
    setClick(!click)
  }

  return (
    <>
      <div className="menu-icon" onClick={handleClick}>
        {/* <i id="bars" className={click ? "fas fa-times fa-spin" : "fas fa-bars "}></i> */}
        <div className={click ? "ham-top ham-rotate-down" : "ham-top"}></div>
        <div className={click ? "ham-middle ham-fade" : "ham-middle"}></div>
        <div className={click ? "ham-bottom ham-rotate-up" : "ham-bottom"}></div>
      </div>
    </>
  )
}

export default Hamburger
