/* Base imports */
import React, { useContext, useReducer, useState, Suspense } from "react"
import { Routes, BrowserRouter, Route } from "react-router-dom"
import { useImmerReducer } from "use-immer"

/* Components */
import Home from "./components/Home"
import Login from "./components/Login"
import Register from "./components/Register"
import Engineer from "./components/Engineer"
import Support from "./components/Support"
import Product from "./components/Product"
import General from "./components/General"
import ComingSoon from "./components/ComingSoon"
import Profile from "./components/Profile"
import ProfileEdit from "./components/ProfileEdit"
import CreatePost from "./components/CreatePost"
import Dashboard from "./components/Dashboard"
import Post from "./components/Post"
import ProfileEditAvatar from "./components/ProfileEditAvatar"
import LeaderBoard from "./components/LeaderBoard"
import UserIndex from "./components/UserIndex"
import ContactMe from "./components/ContactMe"
import ReactLoading from "react-loading"
/* Styles */
import "./App.css"

/* Context */
import StateContext from "./context/StateContext"
import DispatchContext from "./context/DispatchContext"

/* LazyLoad Components */
// const CreatePost = React.lazy(() => import("./components/CreatePost"))
// const Post = React.lazy(() => import("./components/Post"))
// const Profile = React.lazy(() => import("./components/Profile"))
// const ProfileEdit = React.lazy(() => import("./components/ProfileEdit"))
// const Register = React.lazy(() => import("./components/Register"))
// const ProfileEditAvatar = React.lazy(() => import("./components/ProfileEditAvatar"))
// const UserIndex = React.lazy(() => import("./components/UserIndex"))
// const ComingSoon = React.lazy(() => import("./components/ComingSoon"))

function App() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("token")),
    user: {
      token: localStorage.getItem("token"),
      username: localStorage.getItem("username"),
      email: localStorage.getItem("email"),
      avatar: localStorage.getItem("avatar"),
      id: localStorage.getItem("id"),
      createdAt: localStorage.getItem("createdAt")
    }
  }
  /* set action type and return state */
  function ourReducer(draft, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case "login":
        draft.loggedIn = true
        return
      case "logout":
        draft.loggedIn = false
        return
      case "setToken":
        draft.user.token = localStorage.getItem("token")
        return
      case "setAvatar":
        draft.user.avatar = action.value
        return
      case "setUser":
        draft.user.username = action.value
        return
    }
  }

  /* immer avoids directly muttating state. */

  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

  return (
    <>
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          <BrowserRouter>
            <Suspense
              fallback={
                <div style={{ paddingTop: "25%" }}>
                  <ReactLoading className="loader" type="spinningBubbles" color="#0000FF" height={100} width={50} />
                </div>
              }
            >
              <Routes>
                <Route element={<Home />} exact path="/" />
                <Route element={<Dashboard />} exact path="/dashboard" />
                <Route element={<General />} exact path="/general" />
                <Route element={<Engineer />} exact path="/engineer" />
                <Route element={<Product />} exact path="/product" />
                <Route element={<Support />} exact path="/support" />

                <Route element={<Login />} exact path="/login" />
                <Route element={<Register />} exact path="/register" />
                <Route element={<Profile />} exact path="/profile" />

                <Route element={<CreatePost />} exact path="/post/new" />
                <Route element={<ProfileEdit />} exact path="/profile/edit" />
                <Route element={<ProfileEditAvatar />} exact path="/avatar/edit" />

                <Route element={<ComingSoon />} exact path="/comingsoon" />
                {/* <Route element={<ContactMe />} exact path="/contactme" /> */}

                <Route element={<Post />} exact path="/posts/:id" />

                <Route element={<UserIndex />} exact path="/users" />
                <Route element={<LeaderBoard />} exact path="/leaderboard" />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </DispatchContext.Provider>
      </StateContext.Provider>
    </>
  )
}

export default App
/*? component vs element */
