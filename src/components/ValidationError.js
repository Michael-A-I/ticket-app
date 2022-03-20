import React from "react"
import { Navbar } from "../components/Navbar"

function ValidationError(prop) {
  return (
    <>
      {/* <Navbar /> */}
      <div>
        <h1>{"Error" + prop.message}</h1>
      </div>
    </>
  )
}

export default ValidationError
