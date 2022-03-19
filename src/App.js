import React from "react"
// import Auth from "./Auth"
import { Routes, BrowserRouter, Route } from "react-router-dom"
import { Register } from "./components/register"
import { Login } from "./components/login"
import { Profile } from "./components/profile"

import Auth from "./Auth"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route element={<Login />} exact path="/" /> */}
        <Route element={<Register />} exact path="/register" />
        <Route element={<Login />} exact path="/login" />
        {/* <Route element={<Profile />} exact path="/u/:userId" /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
/*? component vs element */
