import React from "react"
// import Auth from "./Auth"
import { Routes, BrowserRouter, Route } from "react-router-dom"
import { Register } from "./components/Register"
import { Login } from "./components/Login"
import { Profile } from "./components/Profile"
import { CreatePost } from "./components/CreatePost"
// import { Home } from "./components/Home"
import Dashboard from "./components/Dashboard"
import Auth from "./Auth"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Dashboard />} exact path="/" />
          <Route element={<Dashboard />} exact path="/dashboard" />
          <Route element={<Register />} exact path="/register" />
          <Route element={<Login />} exact path="/login" />
          <Route element={<Profile />} exact path="/u/:userId" />
          <Route element={<CreatePost />} exact path="/posts/new" />
          <Route element={<Posts />} exact path="/posts/" />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
/*? component vs element */
