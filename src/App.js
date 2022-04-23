import React, { useContext, useMemo, useState } from "react"
// import Auth from "./Auth"
import { Routes, BrowserRouter, Route } from "react-router-dom"
import { Register } from "./components/Register"
import { Login } from "./components/Login"
import { Profile } from "./components/Profile"
import { CreatePost } from "./components/CreatePost"
import { PostsIndex } from "./components/PostsIndex"
import { Home } from "./components/Home"
import Dashboard from "./components/Dashboard"
import { Post } from "./components/Post"
import Auth from "./Auth"
import "./App.css"
import { UserContext } from "./context/UserContext"

function App() {
  const [user, setUser] = useState(null)

  const value = useMemo(() => ({ user, setUser }), [user, setUser])

  localStorage.setItem("user", user)

  return (
    <>
      <UserContext.Provider value={value}>
        <BrowserRouter>
          <Routes>
            {/* <Route element={<Dashboard />} exact path="/home" /> */}
            <Route element={<Dashboard />} exact path="/" />
            <Route element={<Dashboard />} exact path="/dashboard" />
            <Route element={<Register />} exact path="/register" />
            <Route element={<Login />} exact path="/login" />
            <Route element={<Profile />} exact path="/u/:id" />
            <Route element={<CreatePost />} exact path="/posts/new" />
            <Route element={<PostsIndex />} exact path="/posts/index" />
            <Route element={<Post />} exact path="/posts/:id" />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  )
}

export default App
/*? component vs element */
