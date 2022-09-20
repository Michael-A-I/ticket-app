import React from "react"
import { Navigate, useLocation } from "react-router"
import Userfront from "@userfront/core"

function RequireAuth({ children }) {
  let location = useLocation()
  if (!Userfront.tokens.accessToken) {
    // Redirect to the /login page
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default RequireAuth
